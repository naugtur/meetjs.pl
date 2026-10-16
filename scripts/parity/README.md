# Parity tooling

Checks that two deployments of the site — typically the Next.js production site and the Nuxt port — are visually and functionally the same. Built for the migration described in [`plan.md`](../../plan.md), usable for any later refactor.

Everything runs locally with Puppeteer (Chrome is taken from the Puppeteer cache when the bundled download is missing, or from `PUPPETEER_EXECUTABLE_PATH`). Output goes to `.parity/` (gitignored).

## What is checked

| Area      | Per route × locale (`en`, `pl`)                                                                                                                                                                                         |
| --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `http`    | Status and content type of every page, 11 redirects (status + `Location`), 404 probes, `robots.txt`, `sitemap.xml`, `llms.txt`, selected `public/` files, `/api/og`, OG images referenced by meta tags (pixel-compared) |
| `head`    | `<html lang>`, `<title>`, every `<meta name>` / `<meta property>` (incl. `og:*`, `twitter:*`, robots), canonical/icon links, JSON-LD — read from the server-rendered HTML                                               |
| `content` | Headings, navigation links, footer links, all links (href + target + text), images (original source, alt, size, loading), buttons, iframes, visible text, horizontal overflow                                           |
| `runtime` | Console errors, uncaught exceptions, failed same-origin requests, hydration warnings, head changed by hydration (candidate only)                                                                                        |
| `visual`  | Full-page screenshots (desktop 1440 px, mobile 390 px) and per-section crops (outermost `header`/`section`/`footer`), pixel diff with masks                                                                             |

Framework artefacts are normalized: `/_next/image`, `/_ipx`, `/_vercel/image` URLs are decoded to the source image; absolute URLs on the site origin become `{SITE}/…`; Next's `next-size-adjust` meta is ignored.

Pages are captured deterministically: `NEXT_LOCALE` cookie + `Accept-Language`, time zone `Europe/Warsaw`, `prefers-reduced-motion: reduce`, CSS animations/transitions disabled, the page is scrolled through to load lazy content, then fonts, images and the network settle (images that failed or hang are retried once — a local image optimizer fetches remote images on every request).

Masks (`config.mjs` → `MASKS`) cover regions that differ between two captures of the _same_ site (autoplay carousel, iframes) and regions rendered from live data (events, speakers, Discord). Data masks are applied automatically when the two snapshots use different data sources. Random text whose length changes the layout (the `/2025-review` prediction) is replaced with a fixed string on both sides instead (`RANDOM_TEXT`), and the confetti canvas is hidden (`HIDE`).

OG images are compared on a black and on a white background, so transparent images (e.g. white text only) cannot hide differences.

Intentional differences (fixed bugs, framework conventions) live in `known-differences.mjs` and are reported as _expected_.

## Commands

```bash
# Snapshot a site (add --screenshots for the visual check)
pnpm parity:snapshot --base https://meetjs.pl --name prod --screenshots
pnpm parity:snapshot --base http://localhost:3000 --name nuxt --screenshots --data-source fixtures

# Compare two snapshots → .parity/reports/<a>-vs-<b>/index.html (exit 1 on unexpected differences)
pnpm parity:compare --baseline prod --candidate nuxt

# Both in one go: capture two sites at the same time, then compare
# (snapshots <name>-baseline / <name>-candidate; keeps "starts in N days" etc. in sync)
pnpm parity:run --baseline https://meetjs.pl --candidate http://localhost:3000 --name prod --screenshots

# Review one block or region of a page: baseline, candidate and diff stacked
node scripts/parity/inspect.mjs --baseline prod --candidate nuxt --route / --locale en --viewport mobile --block 'section "About'

# Functional scenarios against one or more sites
pnpm parity:functional --bases https://meetjs.pl,http://localhost:3000
```

Useful options: `--routes /,/about`, `--locales en`, `--viewports desktop`, `--concurrency 3` (snapshot); `--areas http,head,content,runtime,visual`, `--masks motion,embed,data` (compare); `--only lang-switch-desktop,events-filter-city` (functional).

## Deterministic comparison with the Next.js version

Production renders live Crossweb/Discord data, which a local build cannot reproduce. For data-driven pages (`/`, `/events`, `/speakers`, city pages) compare against the last Next.js commit running on the same fixture data:

```bash
pnpm parity:fixtures                       # terminal 1: fake Crossweb events + speakers on :3999
pnpm parity:next-baseline 8625d93 3100     # terminal 2: Next.js from git (worktree in .parity/next-baseline)

# terminal 3: the Nuxt app on the same fixtures (the production server does not read .env)
export EVENTS_API_URL=http://127.0.0.1:3999/crossweb/events \
  SPEAKERS_API_URL=http://127.0.0.1:3999/crossweb/speakers SPEAKERS_API_TOKEN=fixture \
  SITE_URL=http://localhost:3000 DISCORD_SERVER_ID=735954756169760768
pnpm build && pnpm start

# terminal 4
pnpm parity:run --baseline http://localhost:3100 --candidate http://localhost:3000 \
  --name local --screenshots --data-source fixtures
pnpm parity:functional --bases http://localhost:3100,http://localhost:3000
```

The last full run of the migration (2026-10-13, all 42 routes × 2 locales × 2 viewports) had 0 unexpected differences; the largest visual mismatch was 0.06 % (anti-aliasing).

## Files

| File                              | Purpose                                                                  |
| --------------------------------- | ------------------------------------------------------------------------ |
| `config.mjs`                      | Route inventory, viewports, masks, thresholds                            |
| `known-differences.mjs`           | Intentional differences with reasons                                     |
| `snapshot.mjs`                    | Captures one site                                                        |
| `compare.mjs`                     | Compares two snapshots, writes the report                                |
| `run.mjs`                         | Captures two sites at the same time and compares them                    |
| `inspect.mjs`                     | Stacked baseline/candidate/diff crop of one block or region              |
| `functional.mjs`, `scenarios.mjs` | Functional scenarios and their runner                                    |
| `fixtures-server.mjs`             | Deterministic Crossweb events/speakers API                               |
| `next-baseline.sh`                | Builds and starts the Next.js version from a git ref                     |
| `lib/`                            | Browser, page preparation, extraction, HTTP, normalization, diff, report |
