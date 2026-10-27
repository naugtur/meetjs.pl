#!/usr/bin/env node
// Captures a parity snapshot of a running site: HTTP checks, SEO tags,
// rendered content, runtime errors and (optionally) screenshots.
//
//   node scripts/parity/snapshot.mjs --base https://meetjs.pl --name prod --screenshots
//
// Options: --name, --out (default .parity/snapshots), --screenshots,
// --routes /,/about  --locales en,pl  --viewports desktop,mobile
// --concurrency 3  --data-source production|fixtures|mocks
// --site-url <origin> (an extra origin treated as the site, e.g. SITE_URL)

import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import {
  ENDPOINTS,
  LOCALES,
  NOT_FOUND,
  PAGES,
  REDIRECTS,
  routeId,
  SITE_ORIGIN,
  STATIC_FILES,
  VIEWPORTS,
} from './config.mjs';
import { fail, listArg, parseArgs } from './lib/args.mjs';
import { launchBrowser, mapConcurrent } from './lib/browser.mjs';
import { checkFile, checkRoute } from './lib/http.mjs';
import { normalizeText, normalizeUrl } from './lib/normalize.mjs';
import {
  extractContent,
  extractHead,
  measurePage,
  openPage,
  screenshotPage,
  settlePage,
} from './lib/page.mjs';

const args = parseArgs();
if (!args.base) fail('--base <url> is required');
const base = new URL(args.base).href;
const name = args.name ?? new URL(base).host.replace(/[^a-z0-9.-]/gi, '_');
const outDir = join(args.out ?? '.parity/snapshots', name);
const withScreenshots = Boolean(args.screenshots);
const locales = listArg(args.locales) ?? LOCALES;
const viewports = listArg(args.viewports) ?? Object.keys(VIEWPORTS);
const concurrency = Number(args.concurrency ?? 3);
const selectedRoutes = listArg(args.routes);
const pages = selectedRoutes
  ? PAGES.filter((page) => selectedRoutes.includes(page.path))
  : PAGES;
const origins = [base, SITE_ORIGIN, args.siteUrl].filter(Boolean);
const dataSource =
  args.dataSource ??
  (new URL(base).origin === SITE_ORIGIN ? 'production' : 'unknown');

if (pages.length === 0) fail(`No routes match ${args.routes}`);

const url = (value) => normalizeUrl(value, { base, origins });

const URL_META =
  /(og:url|og:image|twitter:image|og:image:url|og:image:secure_url)$/;

const normalizeHead = (head) => ({
  lang: head.lang,
  title: head.title === null ? null : normalizeText(head.title),
  meta: Object.fromEntries(
    Object.entries(head.meta)
      .filter(([key]) => key !== 'meta[name=next-size-adjust]')
      .map(([key, values]) => [
        key,
        values.map((value) =>
          URL_META.test(key.replace(/\]$/, '')) ? url(value) : value,
        ),
      ]),
  ),
  links: Object.fromEntries(
    Object.entries(head.links).map(([key, values]) => [
      key,
      values.map((value) => {
        const [href, ...attrs] = value.split(' ');
        return [url(href), ...attrs].join(' ');
      }),
    ]),
  ),
  jsonld: JSON.parse(
    JSON.stringify(head.jsonld, (_, value) =>
      typeof value === 'string' && /^https?:\/\//.test(value)
        ? url(value)
        : value,
    ),
  ),
});

const linkEntry = ({ href, target, text }) =>
  `${url(href)}${target ? ` [${target}]` : ''} ${text}`.trim();

const normalizeContent = (content) => ({
  headings: content.headings,
  links: content.links.map(linkEntry),
  navLinks: content.navLinks.map(linkEntry),
  footerLinks: content.footerLinks.map(linkEntry),
  images: content.images.map(
    ({ src, alt, width, height, loading }) =>
      `${url(src)} alt="${alt ?? ''}"${width && height ? ` ${width}x${height}` : ''}${loading ? ` loading=${loading}` : ''}`,
  ),
  buttons: content.buttons,
  iframes: content.iframes.map(url),
  icons: content.icons,
  details: content.details,
  text: content.text,
  overflowX: content.overflowX,
  hydrated: { lang: content.lang, title: normalizeText(content.title) },
});

const log = (message) => process.stdout.write(`${message}\n`);

const captureHttp = async () => {
  log(`→ HTTP checks against ${base}`);
  const http = {
    pages: {},
    redirects: {},
    notFound: {},
    files: {},
    endpoints: {},
    ogImages: {},
  };
  await mapConcurrent(
    pages.flatMap((page) => locales.map((locale) => [page.path, locale])),
    6,
    async ([path, locale]) => {
      (http.pages[path] ??= {})[locale] = await checkRoute(base, path, {
        locale,
      });
    },
  );
  await mapConcurrent(REDIRECTS, 6, async ({ path }) => {
    http.redirects[path] = await checkRoute(base, path);
  });
  await mapConcurrent(NOT_FOUND, 6, async (path) => {
    http.notFound[path] = await checkRoute(base, path);
  });
  const dir = outDir;
  await mapConcurrent(STATIC_FILES, 6, async (file) => {
    http.files[file.path] = await checkFile(base, file, { origins, dir });
  });
  await mapConcurrent(ENDPOINTS, 3, async (file) => {
    http.endpoints[file.path] = await checkFile(base, file, { origins, dir });
  });
  return http;
};

const captureRoute = async (browser, page, locale) => {
  const started = Date.now();
  const result = { visual: {} };
  const desktop = await openPage(browser, {
    base,
    path: page.path,
    locale,
    viewport: 'desktop',
  });
  try {
    result.status = desktop.response?.status() ?? 0;
    const html = (await desktop.response?.text()) ?? '';
    result.head = normalizeHead(await extractHead(desktop.page, html));
    await settlePage(desktop.page, page);
    result.content = normalizeContent(await extractContent(desktop.page));
    if (withScreenshots && viewports.includes('desktop')) {
      result.visual.desktop = await captureVisual(
        desktop.page,
        page,
        locale,
        'desktop',
      );
    }
    result.runtime = desktop.runtime;
  } finally {
    await desktop.context.close();
  }

  if (withScreenshots) {
    for (const viewport of viewports.filter((name) => name !== 'desktop')) {
      const opened = await openPage(browser, {
        base,
        path: page.path,
        locale,
        viewport,
      });
      try {
        await settlePage(opened.page, page);
        result.visual[viewport] = await captureVisual(
          opened.page,
          page,
          locale,
          viewport,
        );
      } finally {
        await opened.context.close();
      }
    }
  }

  log(
    `  ✓ ${page.path} [${locale}] ${result.status} ${((Date.now() - started) / 1000).toFixed(1)}s`,
  );
  return result;
};

const captureVisual = async (browserPage, page, locale, viewport) => {
  const measured = await measurePage(browserPage, page.masks ?? []);
  const file = `screens/${routeId(page.path)}.${locale}.${viewport}.png`;
  const shot = await screenshotPage(browserPage, join(outDir, file), measured);
  return {
    file,
    ...shot,
    fullHeight: measured.height,
    blocks: measured.blocks,
    masks: measured.masks,
  };
};

const captureOgImages = async (snapshot) => {
  const urls = new Set();
  for (const byLocale of Object.values(snapshot.pages)) {
    for (const entry of Object.values(byLocale)) {
      for (const key of [
        'meta[property=og:image]',
        'meta[name=twitter:image]',
      ]) {
        for (const value of entry.head?.meta?.[key] ?? []) urls.add(value);
      }
    }
  }
  log(`→ ${urls.size} OG image URLs`);
  await mapConcurrent([...urls], 3, async (value) => {
    const path = value.startsWith('{SITE}')
      ? value.slice('{SITE}'.length) || '/'
      : value;
    snapshot.http.ogImages[value] = /^https?:/.test(path)
      ? { external: true }
      : await checkFile(
          base,
          { path, compare: 'image' },
          { origins, dir: outDir },
        );
  });
};

const main = async () => {
  await mkdir(join(outDir, 'screens'), { recursive: true });
  await mkdir(join(outDir, 'files'), { recursive: true });

  const snapshot = {
    meta: {
      name,
      base,
      dataSource,
      createdAt: new Date().toISOString(),
      screenshots: withScreenshots ? viewports : [],
      locales,
    },
    http: await captureHttp(),
    pages: {},
  };

  const browser = await launchBrowser();
  snapshot.meta.browser = await browser.version();
  log(
    `→ Capturing ${pages.length} routes × ${locales.length} locales${withScreenshots ? ` (screenshots: ${viewports.join(', ')})` : ''}`,
  );
  try {
    await mapConcurrent(
      pages.flatMap((page) => locales.map((locale) => [page, locale])),
      concurrency,
      async ([page, locale]) => {
        let entry;
        try {
          entry = await captureRoute(browser, page, locale);
        } catch (error) {
          entry = { error: String(error.message ?? error) };
          log(`  ✗ ${page.path} [${locale}] ${entry.error}`);
        }
        (snapshot.pages[page.path] ??= {})[locale] = entry;
      },
    );
  } finally {
    await browser.close();
  }

  await captureOgImages(snapshot);
  await writeFile(
    join(outDir, 'snapshot.json'),
    JSON.stringify(snapshot, null, 2),
  );
  log(`✔ Snapshot written to ${join(outDir, 'snapshot.json')}`);
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
