#!/usr/bin/env node
// Captures the baseline and the candidate at the same time, then compares
// them. Capturing both sides together keeps time-dependent content (relative
// dates, "starts in N days", expired promos) in sync.
//
//   node scripts/parity/run.mjs --baseline http://localhost:3100 \
//     --candidate http://localhost:3000 --name local --screenshots \
//     --data-source fixtures
//
// Options: --name (snapshots are written as <name>-baseline and
// <name>-candidate; default "run"), --data-source (applies to both sides),
// --snapshots <dir> (default .parity/snapshots), --report <dir> (default
// .parity/reports/<name>-baseline-vs-<name>-candidate); --routes, --locales,
// --viewports, --concurrency, --screenshots and --site-url are passed to
// snapshot.mjs; --areas and --masks to compare.mjs.

import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { fail, parseArgs } from './lib/args.mjs';

const args = parseArgs();
if (!args.baseline || !args.candidate) {
  fail('--baseline <url> and --candidate <url> are required');
}
const name = args.name ?? 'run';
const dir = fileURLToPath(new URL('.', import.meta.url));

const option = (key, flag) =>
  args[key] === undefined
    ? []
    : args[key] === true
      ? [flag]
      : [flag, String(args[key])];

const snapshotOptions = [
  ...option('routes', '--routes'),
  ...option('locales', '--locales'),
  ...option('viewports', '--viewports'),
  ...option('concurrency', '--concurrency'),
  ...option('screenshots', '--screenshots'),
  ...option('dataSource', '--data-source'),
  ...option('siteUrl', '--site-url'),
  ...option('snapshots', '--out'),
];

const run = (script, scriptArgs, label) =>
  new Promise((resolve) => {
    const child = spawn(process.execPath, [`${dir}${script}`, ...scriptArgs], {
      stdio: ['ignore', 'pipe', 'pipe'],
    });
    const prefix = (chunk) =>
      chunk
        .toString()
        .split('\n')
        .filter(Boolean)
        .map((line) => `[${label}] ${line}\n`)
        .join('');
    child.stdout.on('data', (chunk) => process.stdout.write(prefix(chunk)));
    child.stderr.on('data', (chunk) => process.stderr.write(prefix(chunk)));
    child.on('close', (code) => resolve(code ?? 1));
  });

const sides = [
  ['baseline', args.baseline],
  ['candidate', args.candidate],
];
const codes = await Promise.all(
  sides.map(([side, base]) =>
    run(
      'snapshot.mjs',
      ['--base', base, '--name', `${name}-${side}`, ...snapshotOptions],
      side,
    ),
  ),
);
if (codes.some((code) => code !== 0)) {
  fail(`Snapshot failed (exit codes: ${codes.join(', ')})`);
}

const compareCode = await run(
  'compare.mjs',
  [
    '--baseline',
    `${name}-baseline`,
    '--candidate',
    `${name}-candidate`,
    ...option('areas', '--areas'),
    ...option('masks', '--masks'),
    ...option('snapshots', '--snapshots'),
    ...option('report', '--out'),
  ],
  'compare',
);
process.exit(compareCode);
