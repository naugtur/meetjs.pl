#!/usr/bin/env node
// Writes a stacked image (baseline on top, candidate below, diff at the
// bottom) of one block or region of a page, for reviewing a visual difference.
//
//   node scripts/parity/inspect.mjs --baseline next-fixtures --candidate nuxt \
//     --route / --locale en --viewport desktop --block 'header\[role=banner\]'
//
// Instead of --block, --region x,y,width,height crops page coordinates.
// Output: .parity/inspect/<route>.<locale>.<viewport>.<block>.png

import { mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { PNG } from 'pngjs';
import { routeId, VISUAL } from './config.mjs';
import { fail, parseArgs } from './lib/args.mjs';
import { crop, diffImages, padTo, readPng, writePng } from './lib/image.mjs';

const args = parseArgs();
const {
  baseline,
  candidate,
  route = '/',
  locale = 'en',
  viewport = 'desktop',
} = args;
if (!baseline || !candidate || (!args.block && !args.region)) {
  fail(
    'Usage: inspect.mjs --baseline <name> --candidate <name> --route / --block <regex> | --region x,y,w,h',
  );
}

const load = (name) => {
  const dir = join(args.snapshots ?? '.parity/snapshots', name);
  const snapshot = JSON.parse(readFileSync(join(dir, 'snapshot.json'), 'utf8'));
  const visual = snapshot.pages[route]?.[locale]?.visual?.[viewport];
  if (!visual)
    fail(`No ${viewport} screenshot of ${route} [${locale}] in ${name}`);
  const area = args.region
    ? (([x, y, width, height]) => ({ x, y, width, height }))(
        args.region.split(',').map(Number),
      )
    : visual.blocks.find((block) => new RegExp(args.block).test(block.key));
  if (!area) {
    fail(
      `No block matching /${args.block}/ in ${name}. Blocks:\n  ${visual.blocks.map((block) => block.key).join('\n  ')}`,
    );
  }
  return crop(readPng(join(dir, visual.file)), area);
};

const a = load(baseline);
const b = load(candidate);
const width = Math.max(a.width, b.width);
const height = Math.max(a.height, b.height);
const { diff, percent } = diffImages(a, b, {
  threshold: VISUAL.pixelThreshold,
});

const gap = 8;
const out = new PNG({ width, height: height * 3 + gap * 2 });
out.data.fill(255);
PNG.bitblt(padTo(a, width, height), out, 0, 0, width, height, 0, 0);
PNG.bitblt(padTo(b, width, height), out, 0, 0, width, height, 0, height + gap);
PNG.bitblt(diff, out, 0, 0, width, height, 0, (height + gap) * 2);

mkdirSync('.parity/inspect', { recursive: true });
const name =
  `${routeId(route)}.${locale}.${viewport}.${String(args.block ?? args.region).replace(/[^a-z0-9]+/gi, '_')}`.slice(
    0,
    120,
  );
const file = join('.parity/inspect', `${name}.png`);
writePng(out, file);
console.log(
  `${percent.toFixed(2)}% differ · baseline ${a.width}×${a.height}, candidate ${b.width}×${b.height} → ${file}`,
);
