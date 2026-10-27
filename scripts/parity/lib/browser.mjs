// Launches Chrome through Puppeteer. Dependency build scripts are blocked in
// this repo, so Puppeteer's own browser download may be missing; fall back to
// the newest Chrome already present in the Puppeteer cache.

import { existsSync, readdirSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';
import puppeteer from 'puppeteer';

const CACHE_DIR =
  process.env.PUPPETEER_CACHE_DIR ?? join(homedir(), '.cache', 'puppeteer');

const BINARIES = [
  [
    'chrome-headless-shell',
    'chrome-headless-shell-linux64/chrome-headless-shell',
  ],
  ['chrome', 'chrome-linux64/chrome'],
  [
    'chrome-headless-shell',
    'chrome-headless-shell-mac-arm64/chrome-headless-shell',
  ],
  [
    'chrome',
    'chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing',
  ],
];

const versionKey = (dir) =>
  (dir.match(/\d+/g) ?? []).map((part) => part.padStart(6, '0')).join('.');

const findCachedChrome = () => {
  const candidates = [];
  for (const [product, binary] of BINARIES) {
    const productDir = join(CACHE_DIR, product);
    if (!existsSync(productDir)) continue;
    for (const versionDir of readdirSync(productDir)) {
      const executable = join(productDir, versionDir, binary);
      if (existsSync(executable)) {
        candidates.push({ executable, key: versionKey(versionDir) });
      }
    }
  }
  candidates.sort((a, b) => b.key.localeCompare(a.key));
  return candidates[0]?.executable;
};

export const launchBrowser = async () => {
  const options = {
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--font-render-hinting=none',
      '--hide-scrollbars',
      '--disable-features=Translate',
    ],
  };

  if (process.env.PUPPETEER_EXECUTABLE_PATH) {
    return puppeteer.launch(options);
  }

  try {
    return await puppeteer.launch(options);
  } catch (error) {
    const executablePath = findCachedChrome();
    if (!executablePath) {
      throw new Error(
        `${error.message}\nInstall a browser with \`pnpm exec puppeteer browsers install chrome-headless-shell\` or set PUPPETEER_EXECUTABLE_PATH.`,
        { cause: error },
      );
    }
    return puppeteer.launch({ ...options, executablePath });
  }
};

/** Runs `worker` over `items` with at most `limit` concurrent calls. */
export const mapConcurrent = async (items, limit, worker) => {
  const results = new Array(items.length);
  let next = 0;
  const run = async () => {
    while (next < items.length) {
      const index = next++;
      results[index] = await worker(items[index], index);
    }
  };
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, run));
  return results;
};
