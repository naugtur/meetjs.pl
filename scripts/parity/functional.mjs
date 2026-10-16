#!/usr/bin/env node
// Runs the functional scenarios (scenarios.mjs) against one or more sites and
// prints a pass/fail matrix.
//
//   node scripts/parity/functional.mjs --bases https://meetjs.pl,http://localhost:3000
//
// Options: --base <url> | --bases <url,url>  --only <id,id>  --concurrency 3
// Exit code 1 when a scenario fails on any site.

import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fail, listArg, parseArgs } from './lib/args.mjs';
import { launchBrowser, mapConcurrent } from './lib/browser.mjs';
import { SCENARIOS } from './scenarios.mjs';

const args = parseArgs();
const bases = listArg(args.bases) ?? (args.base ? [args.base] : null);
if (!bases) fail('Usage: functional.mjs --base <url> | --bases <url,url>');
const only = listArg(args.only);
const scenarios = only
  ? SCENARIOS.filter((scenario) => only.includes(scenario.id))
  : SCENARIOS;
const concurrency = Number(args.concurrency ?? 3);
const TIMEOUT = 90_000;

const withTimeout = (promise) =>
  Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Scenario timed out')), TIMEOUT),
    ),
  ]);

const browser = await launchBrowser();
const results = {};
try {
  for (const base of bases) {
    results[base] = {};
    await mapConcurrent(scenarios, concurrency, async (scenario) => {
      const started = Date.now();
      try {
        const details = await withTimeout(scenario.run(browser, base));
        results[base][scenario.id] = {
          ok: true,
          details: details ?? '',
          ms: Date.now() - started,
        };
      } catch (error) {
        results[base][scenario.id] = {
          ok: false,
          details: String(error.message ?? error).split('\n')[0],
          ms: Date.now() - started,
        };
      }
    });
  }
} finally {
  await browser.close();
}

const width = Math.max(...scenarios.map((scenario) => scenario.id.length));
console.log(
  `\n${'scenario'.padEnd(width)}  ${bases.map((base, index) => `[${index + 1}]`).join('  ')}`,
);
let failures = 0;
for (const scenario of scenarios) {
  const cells = bases.map((base) => {
    const result = results[base][scenario.id];
    if (!result.ok) failures++;
    return result.ok
      ? result.details.startsWith('skipped')
        ? ' – '
        : ' ✓ '
      : ' ✗ ';
  });
  console.log(`${scenario.id.padEnd(width)}  ${cells.join('  ')}`);
}
console.log('');
bases.forEach((base, index) => console.log(`[${index + 1}] ${base}`));
for (const base of bases) {
  for (const scenario of scenarios) {
    const result = results[base][scenario.id];
    if (!result.ok || result.details) {
      console.log(
        `${result.ok ? '  ' : '✗ '}${scenario.id} @ ${base}: ${result.details}`,
      );
    }
  }
}

const outDir = '.parity/functional';
await mkdir(outDir, { recursive: true });
const file = join(
  outDir,
  `${new Date().toISOString().replace(/[:.]/g, '-')}.json`,
);
await writeFile(file, JSON.stringify(results, null, 2));
console.log(`\n${failures === 0 ? '✔' : '✖'} ${failures} failing · ${file}`);
process.exit(failures === 0 ? 0 : 1);
