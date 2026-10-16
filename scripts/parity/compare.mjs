#!/usr/bin/env node
// Compares two parity snapshots and writes an HTML + Markdown report.
//
//   node scripts/parity/compare.mjs --baseline prod --candidate local
//
// Options: --out <dir> (default .parity/reports/<baseline>-vs-<candidate>)
// --routes /,/about  --locales en  --areas http,head,content,runtime,visual
// --masks motion,embed,data (default: motion,embed + data when the data
// sources differ)  --snapshots <dir> (default .parity/snapshots)
// Exit code 1 when unexpected differences are found.

import { existsSync } from 'node:fs';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { PAGES, routeId, VISUAL } from './config.mjs';
import { fail, listArg, parseArgs } from './lib/args.mjs';
import { canonicalJson, listDiff } from './lib/diff.mjs';
import {
  crop,
  diffImages,
  flatten,
  paintRects,
  readPng,
  writePng,
} from './lib/image.mjs';
import { renderHtml, renderMarkdown } from './lib/report.mjs';
import { findKnownDifference } from './known-differences.mjs';

const args = parseArgs();
if (!args.baseline || !args.candidate) {
  fail('Usage: compare.mjs --baseline <snapshot> --candidate <snapshot>');
}

const snapshotsDir = args.snapshots ?? '.parity/snapshots';
const snapshotDir = (name) =>
  existsSync(join(name, 'snapshot.json')) ? name : join(snapshotsDir, name);

const load = async (name) => {
  const dir = snapshotDir(name);
  const file = join(dir, 'snapshot.json');
  if (!existsSync(file)) fail(`Snapshot not found: ${file}`);
  return { dir: resolve(dir), ...JSON.parse(await readFile(file, 'utf8')) };
};

const baseline = await load(args.baseline);
const candidate = await load(args.candidate);
const outDir = resolve(
  args.out ??
    join('.parity/reports', `${baseline.meta.name}-vs-${candidate.meta.name}`),
);
await mkdir(join(outDir, 'img'), { recursive: true });

const areas = listArg(args.areas) ?? [
  'http',
  'head',
  'content',
  'runtime',
  'visual',
];
const routesFilter = listArg(args.routes);
const localesFilter = listArg(args.locales);
const sameData =
  baseline.meta.dataSource === candidate.meta.dataSource &&
  baseline.meta.dataSource !== 'unknown';
const maskCategories = listArg(args.masks) ?? [
  'motion',
  'embed',
  ...(sameData ? [] : ['data']),
];

const pageConfig = new Map(PAGES.map((page) => [page.path, page]));
const routeSelected = (route) => !routesFilter || routesFilter.includes(route);
const localeSelected = (locale) =>
  !localesFilter || !locale || localesFilter.includes(locale);

const diffs = [];
const visuals = [];

const classify = (diff) => {
  const rule = findKnownDifference(diff);
  if (rule) return { status: 'expected', rule: `${rule.id}: ${rule.reason}` };
  const dataDriven = (pageConfig.get(diff.route)?.data ?? []).length > 0;
  if (!sameData && dataDriven && ['content', 'visual'].includes(diff.area)) {
    return { status: 'info', rule: 'data-driven page, different data sources' };
  }
  return { status: 'unexpected' };
};

const push = (diff) => {
  if (!routeSelected(diff.route) || !localeSelected(diff.locale)) return;
  diffs.push({ ...diff, ...classify(diff) });
};

const changed = (base, key, before, after) => {
  if (canonicalJson(before) !== canonicalJson(after)) {
    push({ ...base, key, op: 'changed', baseline: before, candidate: after });
  }
};

const listChanged = (base, key, before, after, limit = 80) => {
  const { removed, added } = listDiff(before ?? [], after ?? []);
  for (const value of removed.slice(0, limit)) {
    push({ ...base, key, op: 'removed', value });
  }
  for (const value of added.slice(0, limit)) {
    push({ ...base, key, op: 'added', value });
  }
  const hidden =
    Math.max(0, removed.length - limit) + Math.max(0, added.length - limit);
  if (hidden > 0) {
    push({
      ...base,
      key,
      op: 'added',
      value: `… ${hidden} more differences in ${key}`,
    });
  }
};

// ---------------------------------------------------------------- HTTP
const compareHttp = async () => {
  const area = 'http';
  for (const [route, byLocale] of Object.entries(baseline.http.pages)) {
    for (const [locale, before] of Object.entries(byLocale)) {
      const after = candidate.http.pages[route]?.[locale];
      if (!after) continue;
      const base = { area, route, locale };
      changed(base, 'http.status', before.status, after.status);
      changed(base, 'http.contentType', before.contentType, after.contentType);
    }
  }
  for (const [route, before] of Object.entries(baseline.http.redirects)) {
    const after = candidate.http.redirects[route];
    if (!after) continue;
    changed({ area, route }, 'http.status', before.status, after.status);
    changed({ area, route }, 'http.location', before.location, after.location);
  }
  for (const [route, before] of Object.entries(baseline.http.notFound)) {
    const after = candidate.http.notFound[route];
    if (after)
      changed({ area, route }, 'http.status', before.status, after.status);
  }
  for (const group of ['files', 'endpoints']) {
    for (const [route, before] of Object.entries(baseline.http[group])) {
      const after = candidate.http[group][route];
      if (!after) continue;
      const base = { area, route };
      changed(base, 'http.status', before.status, after.status);
      changed(base, 'http.contentType', before.contentType, after.contentType);
      if (before.body !== undefined || after.body !== undefined) {
        listChanged(
          base,
          'http.body',
          (before.body ?? '').split('\n'),
          (after.body ?? '').split('\n'),
        );
      }
      if (before.file && after.file) {
        await compareImages(base, before, after);
      } else if (before.sha256 !== after.sha256 && !before.file) {
        changed(base, 'http.sha256', before.sha256, after.sha256);
      }
    }
  }
  for (const [url, before] of Object.entries(baseline.http.ogImages ?? {})) {
    const after = candidate.http.ogImages?.[url];
    if (!after || before.external) continue;
    const base = { area, route: url };
    changed(base, 'http.status', before.status, after.status);
    changed(base, 'http.contentType', before.contentType, after.contentType);
    if (before.file && after.file) await compareImages(base, before, after);
  }
};

const compareImages = async (base, before, after) => {
  const a = readPng(join(baseline.dir, before.file));
  const b = readPng(join(candidate.dir, after.file));
  // OG images may be transparent (e.g. white text only): compare them on a
  // black and on a white background so no content blends in.
  const result = [
    [0, 0, 0],
    [255, 255, 255],
  ]
    .map((background) =>
      diffImages(flatten(a, background), flatten(b, background), {
        threshold: VISUAL.pixelThreshold,
      }),
    )
    .reduce((worst, next) => (next.percent > worst.percent ? next : worst));
  if (result.percent > VISUAL.maxMismatchPercent) {
    const id = routeId(base.route).slice(0, 80);
    writePng(result.diff, join(outDir, 'img', `${id}.diff.png`));
    push({
      ...base,
      key: 'http.image',
      op: 'visual',
      percent: result.percent,
      baselineHeight: a.height,
      candidateHeight: b.height,
    });
  }
};

// ---------------------------------------------------------------- pages
const comparePages = async () => {
  for (const [route, byLocale] of Object.entries(baseline.pages)) {
    if (!routeSelected(route)) continue;
    for (const [locale, before] of Object.entries(byLocale)) {
      if (!localeSelected(locale)) continue;
      const after = candidate.pages[route]?.[locale];
      if (!after) continue;
      if (before.error || after.error) {
        push({
          area: 'runtime',
          route,
          locale,
          key: 'capture.error',
          op: 'changed',
          baseline: before.error ?? null,
          candidate: after.error ?? null,
        });
        continue;
      }
      if (areas.includes('head')) compareHead(route, locale, before, after);
      if (areas.includes('content'))
        compareContent(route, locale, before, after);
      if (areas.includes('runtime'))
        compareRuntime(route, locale, before, after);
      if (areas.includes('visual'))
        await compareVisual(route, locale, before, after);
    }
  }
};

const compareHead = (route, locale, before, after) => {
  const base = { area: 'head', route, locale };
  changed(base, 'html[lang]', before.head.lang, after.head.lang);
  changed(base, 'title', before.head.title, after.head.title);
  for (const group of ['meta', 'links']) {
    const keys = new Set([
      ...Object.keys(before.head[group]),
      ...Object.keys(after.head[group]),
    ]);
    for (const key of keys) {
      const a = before.head[group][key] ?? [];
      const b = after.head[group][key] ?? [];
      if (a.length <= 1 && b.length <= 1) {
        changed(base, key, a[0] ?? null, b[0] ?? null);
      } else {
        listChanged(base, key, [...a].sort(), [...b].sort());
      }
    }
  }
  listChanged(
    base,
    'jsonld',
    before.head.jsonld.map(canonicalJson).sort(),
    after.head.jsonld.map(canonicalJson).sort(),
  );
};

const compareContent = (route, locale, before, after) => {
  const base = { area: 'content', route, locale };
  for (const key of [
    'headings',
    'navLinks',
    'footerLinks',
    'links',
    'images',
    'buttons',
    'iframes',
    'icons',
    'text',
  ]) {
    // Fields added to the tooling later are skipped for older snapshots.
    if (before.content[key] === undefined) continue;
    listChanged(
      base,
      `content.${key}`,
      before.content[key],
      after.content[key],
    );
  }
  changed(
    base,
    'content.details',
    before.content.details,
    after.content.details,
  );
  changed(
    base,
    'content.overflowX',
    before.content.overflowX,
    after.content.overflowX,
  );
};

const compareRuntime = (route, locale, before, after) => {
  const base = { area: 'runtime', route, locale };
  for (const key of ['consoleErrors', 'pageErrors', 'failedRequests']) {
    const known = new Set(before.runtime?.[key] ?? []);
    for (const value of after.runtime?.[key] ?? []) {
      if (!known.has(value))
        push({ ...base, key: `runtime.${key}`, op: 'added', value });
    }
  }
  for (const value of after.runtime?.consoleWarnings ?? []) {
    if (/hydrat/i.test(value)) {
      push({ ...base, key: 'runtime.hydration', op: 'added', value });
    }
  }
  if (
    after.content.hydrated.lang !== after.head.lang ||
    after.content.hydrated.title !== after.head.title
  ) {
    push({
      ...base,
      key: 'runtime.hydratedHead',
      op: 'changed',
      baseline: { lang: after.head.lang, title: after.head.title },
      candidate: after.content.hydrated,
    });
  }
};

const maskRects = (visual) =>
  (visual.masks ?? [])
    .filter((mask) => maskCategories.includes(mask.category))
    .flatMap((mask) => mask.rects);

const compareVisual = async (route, locale, before, after) => {
  for (const viewport of Object.keys(before.visual ?? {})) {
    const a = before.visual[viewport];
    const b = after.visual?.[viewport];
    if (!b) continue;
    const imageA = readPng(join(baseline.dir, a.file));
    const imageB = readPng(join(candidate.dir, b.file));
    const rects = [...maskRects(a), ...maskRects(b)];
    paintRects(imageA, rects);
    paintRects(imageB, rects);

    const page = diffImages(imageA, imageB, {
      threshold: VISUAL.pixelThreshold,
    });
    const heightDelta = Math.abs(a.fullHeight - b.fullHeight);
    const base = { area: 'visual', route, locale };

    const blockResults = [];
    const blocksB = new Map(
      (b.blocks ?? []).map((block) => [block.key, block]),
    );
    for (const blockA of a.blocks ?? []) {
      const blockB = blocksB.get(blockA.key);
      blocksB.delete(blockA.key);
      if (!blockB) {
        blockResults.push({
          key: blockA.key,
          percent: null,
          note: 'missing in candidate',
        });
        continue;
      }
      if (blockA.y >= imageA.height || blockB.y >= imageB.height) continue;
      const result = diffImages(crop(imageA, blockA), crop(imageB, blockB), {
        threshold: VISUAL.pixelThreshold,
      });
      blockResults.push({ key: blockA.key, percent: result.percent });
    }
    for (const key of blocksB.keys()) {
      blockResults.push({ key, percent: null, note: 'only in candidate' });
    }

    const failed =
      page.percent > VISUAL.maxMismatchPercent ||
      heightDelta > VISUAL.maxHeightDeltaPx;
    const visualDiff = {
      ...base,
      key: `visual.${viewport}`,
      op: 'visual',
      percent: page.percent,
      baselineHeight: a.fullHeight,
      candidateHeight: b.fullHeight,
    };
    const status = failed ? classify(visualDiff).status : 'ok';
    for (const block of blockResults) {
      block.status =
        block.percent === null || block.percent > VISUAL.maxMismatchPercent
          ? classify({ ...base, key: `visual.${viewport}.block` }).status
          : 'ok';
    }
    if (failed) push(visualDiff);
    for (const block of blockResults.filter((item) => item.status !== 'ok')) {
      push({
        ...base,
        key: `visual.${viewport}.block`,
        op: 'block',
        value: block.key,
        percent: block.percent,
        note: block.note,
      });
    }

    const id = `${routeId(route)}.${locale}.${viewport}`;
    const images = {};
    if (failed || blockResults.some((block) => block.status !== 'ok')) {
      writePng(imageA, join(outDir, 'img', `${id}.baseline.png`));
      writePng(imageB, join(outDir, 'img', `${id}.candidate.png`));
      writePng(page.diff, join(outDir, 'img', `${id}.diff.png`));
      images.baseline = `img/${id}.baseline.png`;
      images.candidate = `img/${id}.candidate.png`;
      images.diff = `img/${id}.diff.png`;
    }
    visuals.push({
      route,
      locale,
      viewport,
      percent: page.percent,
      baselineHeight: a.fullHeight,
      candidateHeight: b.fullHeight,
      status,
      blocks: blockResults.filter((block) => block.status !== 'ok'),
      images,
    });
  }
};

// ---------------------------------------------------------------- run
if (areas.includes('http')) await compareHttp();
await comparePages();

const report = { baseline, candidate, diffs, visuals };
await writeFile(join(outDir, 'index.html'), renderHtml(report));
const markdown = renderMarkdown(report);
await writeFile(join(outDir, 'summary.md'), markdown);
await writeFile(
  join(outDir, 'diffs.json'),
  JSON.stringify({ diffs, visuals }, null, 2),
);

const unexpected = diffs.filter((diff) => diff.status === 'unexpected').length;
const expected = diffs.filter((diff) => diff.status === 'expected').length;
const info = diffs.filter((diff) => diff.status === 'info').length;
console.log(
  `${unexpected === 0 ? '✔' : '✖'} ${baseline.meta.name} → ${candidate.meta.name}: ${unexpected} unexpected, ${expected} expected, ${info} informational (masks: ${maskCategories.join(', ') || 'none'})`,
);
console.log(`  Report: ${join(outDir, 'index.html')}`);
process.exit(unexpected === 0 ? 0 : 1);
