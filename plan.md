# Execution Plan: Next.js → Nuxt

> **Branch:** `migration/nuxt` (from `8625d93`) · **Prepared:** 2026-10-13 · **Input:** [migration.md](migration.md) (strategy, inventory, risks) and [CLAUDE.md](CLAUDE.md) (route/integration inventory)
>
> `migration.md` explains _why_ and _what_. This file lists the concrete steps, in execution order, with a verification gate after each step. Checkboxes track progress on this branch.
>
> **Status (2026-10-13):** Steps 1–8 are done on this branch (not committed yet). Step 9 (cutover) is for the maintainers. Deviations from the original plan are marked _Implemented as…_ below.

## 1. Principles

1. **Parity migration.** Same URLs, same markup and styling (Tailwind classes copied verbatim), same SEO tags, same i18n behaviour, same data and caching. No redesign, no Tailwind 4, no URL changes.
2. **Tooling before code.** No application code is changed before the parity tooling exists and a baseline of the current site has been captured (Step 1).
3. **Two references:**
   - **Production** — <https://meetjs.pl> (Next.js 16.3.6). The source of truth for SEO tags, static pages, navigation, translations.
   - **Local Next.js baseline** — the last Next.js commit built in a git worktree and fed with the same deterministic fixture data as the Nuxt app. Needed because production shows live Crossweb/Discord data that the local app cannot reproduce (the Crossweb API is behind Cloudflare and needs the production configuration).
4. **Every difference is either fixed or explained.** Intentional differences (bug fixes, framework artefacts) are listed in `scripts/parity/known-differences.mjs` and in §10, and are reported as "expected", not as failures.

## 2. Final Decisions

| #   | Topic                     | Decision                                                                                                                                                                                                                                             | vs `migration.md`                                                                                                                                                                                                                                                                                                           |
| --- | ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| D1  | Framework                 | Nuxt **4.6** (latest stable; Nuxt 5 is not released yet), Vue 3.5, Nitro 2                                                                                                                                                                           | same                                                                                                                                                                                                                                                                                                                        |
| D2  | i18n URLs                 | No prefixes. Language: `NEXT_LOCALE` cookie → `Accept-Language` → `en`                                                                                                                                                                               | same                                                                                                                                                                                                                                                                                                                        |
| D3  | Translation runtime       | **Keep Tolgee**: `@tolgee/vue` 7 with `FormatSimple` + `DevTools`, `messages/*.json` unchanged. A small Nuxt plugin resolves the language (cookie → header) and sets `<html lang>`. Switching sets the cookie and calls `changeLanguage` (no reload) | **Changed** (was: `@nuxtjs/i18n`). Keeps all 493×2 messages byte-identical (no vue-i18n escaping of `\|`, `@`, `<geolocation>`), the same formatter, and Alt+click in-context editing; `.tolgeerc` only needs new globs                                                                                                     |
| D4  | City pages                | One page `app/pages/[city].vue` + typed data `src/content/cityPages.ts` (banner, groups, FAQ as rich-text data, organizers, e-mail, embed, metadata). Unknown slug → 404                                                                             | same                                                                                                                                                                                                                                                                                                                        |
| D5  | Server data + cache       | Nitro `defineCachedFunction` (stale-while-revalidate), TTLs unchanged (events 24 h, speakers 1 h, Discord 1 h). Cache storage: unstorage `vercel-runtime-cache` on Vercel, memory elsewhere. Time-dependent filtering runs per request               | same                                                                                                                                                                                                                                                                                                                        |
| D6  | Repo / deploy             | Branch `migration/nuxt`; `vercel.json` with `"framework": "nuxtjs"`; preview per push; cutover = merge (Step 9, done by maintainers)                                                                                                                 | same                                                                                                                                                                                                                                                                                                                        |
| D7  | Campaign pages            | Port all six (static, English-only) so no URL disappears                                                                                                                                                                                             | decided: port all                                                                                                                                                                                                                                                                                                           |
| D8  | Next-specific URLs        | Keep `GET /api/og?city=` (re-implemented with `@vercel/og`, the same satori renderer `next/og` uses, so images and meta tags stay identical). `/api/mocked/crossweb` → development only. `/discounts` OG image at a stable URL, rendered per request | **Changed** (was: drop `/api/og`, use `nuxt-og-image`). Fewer dependencies, identical images, unchanged `og:image` URLs. _Implemented as:_ `@vercel/og@0.11.1` (the copy bundled by Next 16.3.6; 1.0.x fails in plain Node ESM) with its sharp overridden to IPX's version — OG PNGs are byte-identical to the Next.js ones |
| D9  | Icons                     | Lucide → `lucide-vue-next@0.525.0` (same version as `lucide-react`, identical SVGs). Font Awesome (`react-icons`) → `@nuxt/icon` in SVG mode with local `@iconify-json/*` collections (paths verified against `react-icons`)                         | refined. _Implemented as:_ `unplugin-icons` (compile-time SVG components, `~icons/fa6-solid/…`) with every icon in a 1em × 1em box like `react-icons`; no runtime icon API. `lucide-vue-next` is deprecated in favour of `@lucide/vue` (follow-up)                                                                          |
| D10 | Images                    | `@nuxt/image` (IPX locally, Vercel provider on Vercel) behind an `<AppImage>` wrapper that mirrors `next/image` props and output (lazy/async, 1x/2x `srcset`, `fill` styles, SVGs unoptimized, `remotePatterns` → `image.domains`)                   | refined                                                                                                                                                                                                                                                                                                                     |
| D11 | SEO tags, robots, sitemap | A `useSiteMeta()` composable that reproduces Next.js metadata merging (root defaults + shallow per-page override) and tag format. `robots.txt` and `sitemap.xml` as Nitro routes with the current output. JSON-LD via `useHead`                      | **Changed** (was: `@nuxtjs/sitemap`, `@nuxtjs/robots`, `nuxt-schema-org`). Byte-level parity, fewer deps; the modules stay a follow-up                                                                                                                                                                                      |
| D12 | Styling / UI kit          | Tailwind 3.4 through PostCSS with the existing `tailwind.config.ts` (content globs updated); shadcn primitives re-written as Vue SFCs on `reka-ui` (dropdown) and `embla-carousel-vue` (carousel); same `cva` variants                               | same (without the `shadcn-nuxt` module, which only adds a generator)                                                                                                                                                                                                                                                        |
| D13 | Fonts                     | `@nuxt/fonts`, Montserrat variable font (100–900, normal style only — same as `next/font` default), exposed as `--font-montserrat`                                                                                                                   | same                                                                                                                                                                                                                                                                                                                        |
| D14 | Tests / lint / types      | Vitest (existing pure tests kept, server-util tests rewritten, component tests via `@nuxt/test-utils` + `@testing-library/vue`), `@nuxt/eslint` + Prettier, `nuxt typecheck` (`vue-tsc`)                                                             | same                                                                                                                                                                                                                                                                                                                        |
| D15 | Runtime / packaging       | Node 24.14 (`.nvmrc`; Nuxt 4.6 warns on 24.9), `"type": "module"` in `package.json` (the Puppeteer screenshot script became `.cjs`)                                                                                                                  | added during implementation                                                                                                                                                                                                                                                                                                 |

## 3. Step 1 — Parity Tooling (before any code change)

Location: `scripts/parity/`. Output: `.parity/` (gitignored). Browser: Puppeteer (already a dev dependency) with automatic discovery of an installed Chrome; image diff: `pixelmatch` + `pngjs` (pure JS, no install scripts).

| Check               | What is compared (per route × locale `en`/`pl`)                                                                                                                                                                                                           | Tool                                         |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| HTTP                | Status, redirect `Location`, content type for 40 pages, 11 redirects, 404s, `robots.txt`, `sitemap.xml` (normalized body), `llms.txt`, favicon, OG images, selected `public/` files                                                                       | `snapshot.mjs` → `compare.mjs`               |
| SEO                 | `<html lang>`, `<title>`, description, canonical, robots/googlebot, keywords, every `og:*` and `twitter:*`, icons, JSON-LD (parsed)                                                                                                                       | `snapshot.mjs` → `compare.mjs`               |
| Content / structure | Headings (h1–h6), navigation and footer links, all links (normalized href + text), images (original `src` + `alt`, framework image URLs decoded), buttons, iframes, visible text                                                                          | `snapshot.mjs` → `compare.mjs`               |
| Runtime health      | Console errors/warnings (incl. hydration mismatches), uncaught exceptions, failed same-origin requests                                                                                                                                                    | `snapshot.mjs`                               |
| Visual              | Full-page screenshots, desktop 1440 px + mobile 390 px, both locales; animations frozen, lazy content loaded, dynamic regions masked; pixel diff + mismatch % + height delta; HTML report side by side                                                    | `snapshot.mjs --screenshots` → `compare.mjs` |
| Functional          | ~20 scenarios: language detection and switch, desktop dropdowns, mobile menu, client-side navigation, events filter, 404s, redirects, copy-to-clipboard, FAQ, nearest city (mocked geolocation), carousels, logo context menu, passport, campaign widgets | `functional.mjs`                             |

Files:

- `config.mjs` — route inventory (pages, redirects, 404 probes, static files), viewports, per-route masks/waits, flags for data-driven pages.
- `known-differences.mjs` — intentional differences (§10) with a reason each; matched differences are reported as "expected".
- `lib/` — browser launch, page preparation (cookie, timezone `Europe/Warsaw`, reduced motion, frozen animations, scroll-to-load), DOM extraction, URL normalization (`/_next/image`, `/_ipx`, `/_vercel/image` → original source), diff and report rendering.
- `snapshot.mjs` — captures one base URL into `.parity/snapshots/<name>/`.
- `compare.mjs` — compares two snapshots, writes `.parity/reports/<a>-vs-<b>/index.html` + `summary.md`, exit code ≠ 0 on unexpected differences.
- `functional.mjs` — runs the scenarios against one or more base URLs and prints a pass/fail matrix.
- `fixtures-server.mjs` — deterministic Crossweb events (`?old=1` for past) and speakers API on `127.0.0.1:3999`, dates relative to today.
- `next-baseline.sh` — builds a git ref of the Next.js app in `.parity/next-baseline` (git worktree) and starts it on port 3100 against the fixtures.

- `run.mjs` — captures the baseline and the candidate at the same time and compares them (keeps time-dependent content such as "starts in N days" in sync). _Added during implementation._
- `inspect.mjs` — stacked baseline/candidate/diff crop of one block or region, for reviewing a difference.

Package scripts: `parity:snapshot`, `parity:compare`, `parity:run`, `parity:functional`, `parity:fixtures`, `parity:next-baseline`.

Determinism measures added while porting: scenarios wait for the network to go idle after `load` (hydration can end after `load`; React replays clicks made before it, Vue does not), random text replaced with a fixed string on both sides after the page settled (`RANDOM_TEXT`, the `/2025-review` prediction), failed/hanging images retried once (local IPX fetches remote images on every request), OG images compared on black and white backgrounds (they can be transparent).

Steps:

- [x] 1.1 Implement the tooling and document it in `scripts/parity/README.md`
- [x] 1.2 Self-check: production vs production → 0 unexpected differences (flakiness check of masks and waits)
- [x] 1.3 Capture the production baseline (`.parity/snapshots/prod`). _Implemented as:_ kept local, not committed (2.4 MB of JSON; production can be re-captured until the cutover and the Next.js baseline rebuilt any time with `next-baseline.sh`)
- [x] 1.4 Build the local Next.js baseline (`8625d93`) against fixtures; run the functional suite against production and the local baseline (both must pass — this validates the scenarios themselves)

**Gate:** tools are stable (self-compare clean), baselines captured, functional suite green on both references.

## 4. Step 2 — Nuxt Skeleton

- [x] 2.1 Dependencies: add `nuxt`, `vue`, `vue-router`, `@tolgee/vue`, `@nuxt/image`, `@nuxt/fonts`, `@nuxt/icon` + `@iconify-json/{fa6-solid,fa6-regular,fa6-brands,fa-solid}`, `lucide-vue-next@0.525.0`, `reka-ui`, `embla-carousel-vue`, `@vercel/og`, `@vueuse/core`, `canvas-confetti`; dev: `@nuxt/eslint`, `@nuxt/test-utils`, `@testing-library/vue`, `@vue/test-utils`, `happy-dom`, `vue-tsc`. Audit install scripts and extend `allowBuilds` (deny by default), keep `@lavamoat/preinstall-always-fail`. _Implemented as:_ `unplugin-icons` instead of `@nuxt/icon`, no `@vueuse/core`, react-confetti ported instead of `canvas-confetti` (same animation); `allowBuilds` gained `sharp: false`
- [x] 2.2 `nuxt.config.ts`: modules, `css`, PostCSS (`tailwindcss` with the existing config), `runtimeConfig` (`EVENTS_API_URL`, `SITE_URL`, `DISCORD_SERVER_ID`, `SPEAKERS_API_URL`, `SPEAKERS_API_TOKEN` private; Tolgee key/URL public, read from the existing `NEXT_PUBLIC_*` names), `routeRules` redirects (308), `vue.compilerOptions.isCustomElement` for `<geolocation>`, `image` config (domains from `remotePatterns`, quality 75, 31-day cache), `fonts`, `icon`, Nitro cache storage, `experimental.typedPages`
- [x] 2.3 Scripts: `dev`, `build`, `preview`/`start`, `generate` removed, `typecheck` (`nuxt prepare && nuxt typecheck`), `lint`, `test` (call `nuxt prepare` explicitly; lifecycle scripts stay disabled)
- [x] 2.4 `tsconfig.json` → Nuxt project references; `tailwind.config.ts` content globs → `app/**/*.{vue,ts}`, `src/content/**/*.ts`; `app/assets/css/main.css` from `globals.css`
- [x] 2.5 `app/app.vue` (layout, `<Analytics />`, `<SpeedInsights />`, JSON-LD), `app/layouts/default.vue` (Navigation + page + Footer), `app/layouts/city.vue`, `app/error.vue` (404 copy, rendered inside the default layout, `noindex`), `app/router.options.ts` (instant scroll on navigation, smooth for hash links — like Next's `data-scroll-behavior`). _Implemented as:_ no `city` layout (`[city].vue` renders the former city layout itself); the scroll behaviour lives in `app/plugins/scroll-behavior.client.ts`
- [x] 2.6 Plugins: `server/plugins/env.ts` (Zod validation of runtime config at startup), `app/plugins/tolgee.ts` (per-request Tolgee instance on the server, language in the payload, client instance hydrated with the same language), `useLanguage()` composable
- [x] 2.7 `public/favicon.ico` (moved from `src/app/favicon.ico`), `vercel.json` with `"framework": "nuxtjs"`

**Gate:** `pnpm dev` and `pnpm build && pnpm start` serve a page with `<html lang>` from the cookie/header; typecheck passes.

## 5. Step 3 — Shared Code and Data Layer

- [x] 3.1 Framework-agnostic modules stay in `src/` (`content`, `types`, `lib/passport`, `lib/utils.ts`, `utils/{eventUtils,promos,changeCityName,eventsMock,speakersMock}`); `@/…` imports inside them become relative; Nuxt imports them via `~~/src/…`
- [x] 3.2 Content without JSX: `partnerships.tsx` → `.ts` (icon as data), `socialLinks.tsx` → `.ts` (icon names), `Promo.icon: string`, new `src/content/cityPages.ts` (18 cities, FAQ answers as rich-text segments)
- [x] 3.3 `server/utils/crossweb.ts` (events upcoming/past + speakers: fetch, Zod, `changeCityName`, dev mocks, cached), `server/utils/discord.ts` (cached); `server/api/events.get.ts` (`?when=upcoming|past`, merges `ADDITIONAL_EVENTS`, filters/sorts per request), `server/api/speakers.get.ts`, `server/api/discord.get.ts`, `server/api/mocked/crossweb.get.ts` (404 unless dev)
- [x] 3.4 Tests: keep passport/promos tests, rewrite `getUpcomingEvents`/`getSpeakers` tests for the server utils, add API handler tests

**Gate:** `/api/events?when=upcoming|past`, `/api/speakers`, `/api/discord` return the same data the Next.js helpers return for the fixtures; `pnpm test` green.

## 6. Step 4 — UI Foundation

- [x] 4.1 UI primitives (`app/components/ui/`): `Button` + `buttonVariants`, `Badge` + `badgeVariants`, `Card*`, `DropdownMenu*` (reka-ui), `Carousel*` (embla); same classes and variants as `src/components/ui/*`
- [x] 4.2 Helpers: `<AppImage>`, `<FaIcon>`/`<Icon>` usage, `cn()`, composables `useCopyToClipboard`, `useLocaleFormat`, `useMenuLinks`, `useServerNow`/`useState`-based time-dependent values. _Implemented as:_ `useLocale`, `useRenderNow` (server time reused during hydration); icons are imported components
- [x] 4.3 `useSiteMeta()` — root metadata from `src/app/layout.tsx` + per-page overrides, emitted like Next.js (title, description, keywords, author/creator/publisher, robots + googlebot, format-detection, category, canonical, `og:*`, `twitter:*`, icons)
- [x] 4.4 Layout components: Navigation (desktop dropdowns, mobile disclosure, city list with status dots, highlight link), Footer, Logo (Christmas variant + context menu), SocialLinks, LanguageSwitcher, SchemaMarkup
- [x] 4.5 Component tests: `EventCard`, `LocalGroups` ported to Vue

**Gate:** nav/footer structure diff = 0 on all routes in both locales; nav/footer screenshots match; language switch scenario passes.

## 7. Step 5 — Pages

Port batch by batch; after each batch run `parity:snapshot` for the batch routes, `parity:compare` against production and against the local baseline, and the related functional scenarios.

| Batch | Routes                                                                                                                                                                | Components                                                                                                                                                                                                                                                                                                                                                                                                                      |
| ----- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| A     | `/about`, `/organizers`, `/how-to-become-an-organizer`, `/how-to-become-an-organizer/tools`, `/open-source`, `/brand`, `/media`, `/community-partnerships`, `/videos` | —                                                                                                                                                                                                                                                                                                                                                                                                                               |
| B     | `/discounts`, `/community`, `/passport`, `/passport/[slug]`                                                                                                           | `EventDiscountSection`, `PromoFilters`, `UnifiedPromoCard`, `WorkshopInfo`, `DiscountCodeSection`, `EmptyDiscountState`, `CommunityParticipation`, `CommunityItemCard`, passport presentation                                                                                                                                                                                                                                   |
| C     | `/events`, `/speakers`, `/`                                                                                                                                           | `EventCard`, `EventsList`, `FilterEvents`, `EventsAPIPartner`, `EmptyEventsAlert`, Hero (+ `RankingBanner`, `AwardNomination`), `PromoTicker`, `FeaturedEvents`, `JavaScript30YearsPromo`, `JoinUs`, `PolandMap`, `NearestCity`, Discord (`DiscordCommunity`, `DiscordWidget`, `DiscordInviteLink`), `YouTubeSubscribeBanner`, `AboutSection`, `Stats` + `NumberTicker`, `SpeakerFaces`, `PartnersSection` + `PartnersCarousel` |
| D     | 18 city pages via `[city].vue`                                                                                                                                        | `CityBanner`, `EventSection`, `LocalGroups`, `FAQ`, `Organizers`, `CityEmail`, LinkedIn embed (Warszawa), placeholder layout                                                                                                                                                                                                                                                                                                    |
| E     | `/30-years-of-javascript`, `/2025-review`, `/14-birthday`, `/jsnation-award`, `/futureconf`, `/wdi`                                                                   | `JavaScriptTimeline` (CSS module → `<style module>`), `JavaScriptEvolution`, `JavaScriptPerformance` (lazy), `ScrollAnimations`, `SkipNavigation`, confetti (`<ClientOnly>`), `Banner`, `ActionLink`, `ClickToCopy`                                                                                                                                                                                                             |

- [x] Batch A · [x] Batch B · [x] Batch C · [x] Batch D · [x] Batch E

Conversion rules: one React component → one SFC (`<script setup lang="ts">`); classes copied verbatim; `useState`→`ref`, `useMemo`→`computed`, `useEffect`→`onMounted`/`watch` with cleanup; server data only through `useFetch`/`useAsyncData`; browser-only code in `onMounted`/`<ClientOnly>`; time-dependent values computed once on the server and hydrated from the payload; internal links keep their element type (`next/link` → `NuxtLink`, plain `<a>` stays `<a>`).

**Gate:** all 40 routes: status, SEO tags and structure equal to the baseline (or listed in §10); visual diff below threshold or reviewed.

## 8. Step 6 — SEO Endpoints and OG Images

- [x] 6.1 `server/routes/robots.txt.ts`, `server/routes/sitemap.xml.ts` (same URLs, priorities, `lastmod` = build date)
- [x] 6.2 `server/api/og.get.ts` (`?city=`, default "Poland", max 100 chars) and the `/discounts` OG image (active-deal count at request time, cached 1 h)
- [x] 6.3 JSON-LD: Organization (all pages), ItemList (`/30-years-of-javascript`)
- [x] 6.4 Redirects (11 × 308) verified by the HTTP check

**Gate:** HTTP + SEO parity for every route; OG image URLs from meta tags return `image/png`.

## 9. Step 7 — QA Loop

- [x] 7.1 Full run vs production: HTTP, SEO, structure, visual (EN/PL × desktop/mobile) — head/SEO: 0 unexpected; content/visual differences only on `/discounts` and `/community`, where production already shows content added after `8625d93` (2 promos, 2 community items) → resolved by merging `main` before the cutover
- [x] 7.2 Full run vs the local Next.js baseline with fixtures (deterministic data, data-driven sections included) — 0 unexpected, 103 expected (§12), largest visual mismatch 0.06 %
- [x] 7.3 Functional suite green on Nuxt (and still green on both references)
- [x] 7.4 No console errors or hydration warnings on any route — production build: none on all 42 routes × 2 locales; `nuxt dev` with a Tolgee API key showed mismatches from the in-context-editing markers (Tolgee left SSR mode on `app:mounted`, before the asynchronously hydrated pages finished) → fixed with `onNuxtReady`
- [x] 7.5 Unit/component tests, `lint`, `typecheck`, production build pass
- [x] 7.6 Performance spot check (Lighthouse/JS size) on `/`, `/events`, a city page, `/30-years-of-javascript` — same compression on both sides: JS 243–253 KB gzip (Next.js 290–331 KB), HTML 12–25 KB gzip (Next.js 40–55 KB, no RSC payload); more, smaller chunks (44–50 vs 14–16 requests). The Node server does not compress responses itself — Vercel's CDN does

## 10. Step 8 — Cleanup

- [x] 8.1 Remove Next.js/React code: `src/app`, `src/components`, `src/tolgee`, `src/hooks`, `src/env.ts`, `src/setupTests.ts` (if unused), `src/types/geolocation-element.d.ts`, `src/types/menuLinks.tsx`, React-specific `src/utils`/`src/lib` modules, `next.config.ts`, `next-env.d.ts`, `mdx-components.tsx`, `postcss.config.mjs` (moved to `nuxt.config.ts`), `components.json`
- [x] 8.2 Remove dependencies: `next`, `@next/mdx`, `@mdx-js/*`, `react*`, `@types/react*`, `@headlessui/react`, `@radix-ui/*`, `@t3-oss/env-nextjs`, `@tolgee/react`, `embla-carousel-react`, `lucide-react`, `react-icons`, `react-confetti`, `motion`, `@vitejs/plugin-react`, `babel-plugin-react-compiler`, `eslint-config-next`, `eslint-plugin-react-hooks`, `@testing-library/react`, `@types/mdx` (+ `jsdom`)
- [x] 8.3 Update `CLAUDE.md`, `README.md`, `.env.example`, `.tolgeerc` (extract from `app/**/*.{vue,ts}`), `.gitignore` (`.nuxt`, `.output`, `.parity`), `.lintstagedrc` (add `vue`), `.prettierignore`
- [x] 8.4 Final parity run after cleanup

## 11. Step 9 — Cutover (maintainers, after review)

1. Push `migration/nuxt`, check the Vercel preview (env vars for Preview: `EVENTS_API_URL`, `SITE_URL`, `DISCORD_SERVER_ID`, `SPEAKERS_API_*`).
2. Run the parity tooling against the preview URL: `pnpm parity:snapshot --base <preview> --name preview` and compare with `prod`.
3. Short content freeze, merge `main` into the branch, re-run the parity check, tag the last Next.js commit (`last-nextjs`), merge.
4. Rollback: Vercel Instant Rollback to the last Next.js deployment.
5. Monitor 404/5xx, Search Console, Speed Insights, Crossweb/Discord request volume for 1–2 weeks.

## 12. Intentional Differences (fixed bugs and framework artefacts)

| Where                                                 | Production today                                               | Nuxt                                                |
| ----------------------------------------------------- | -------------------------------------------------------------- | --------------------------------------------------- |
| `/warszawa` canonical, `og:url`                       | `/warsaw` (404)                                                | `/warszawa`                                         |
| `og:url` of Białystok, Bielsko-Biała, Poznań, Wrocław | `/city/<slug>` (404)                                           | `/<slug>`                                           |
| `/jsnation-award` "Learn more about meet.js Wrocław"  | `/city/wroclaw` (404)                                          | `/wroclaw`                                          |
| `NEXT_LOCALE` cookie                                  | `max-age` in milliseconds (~31 700 years)                      | one year in seconds                                 |
| `/api/mocked/crossweb`                                | public in production                                           | 404 outside development                             |
| `/discounts` OG image                                 | `/discounts/opengraph-image-<hash>`, count frozen at build     | `/discounts/opengraph-image.png`, count per request |
| Language switch                                       | server action + full reload                                    | cookie + reactive switch, no reload                 |
| Framework artefacts                                   | `/_next/*` assets and image URLs, RSC payload                  | `/_nuxt/*`, `/_ipx`/`/_vercel/image`, Nuxt payload  |
| `<link rel="icon">`                                   | hashed `/favicon.ico?favicon.<hash>.ico` added by Next.js      | `/favicon.ico`                                      |
| `/2025-review` prediction                             | picked again in the browser (hydration mismatch)               | picked on the server and kept                       |
| `favicon.ico` content type (local `next start` only)  | `image/x-icon` (production/Vercel: `image/vnd.microsoft.icon`) | `image/vnd.microsoft.icon`                          |

## 13. Definition of Done

- [x] All 40 pages return 200 under the same URLs; unknown city and passport slugs return 404
- [x] 11 redirects return 308 with the same targets
- [x] `robots.txt`, `sitemap.xml`, `llms.txt` and other `public/` files are served with the same content
- [x] Title, description, canonical, robots, OG/Twitter tags and JSON-LD equal to production in EN and PL (except §12)
- [x] OG images render for the homepage, `/discounts` and city pages (byte-identical to the Next.js ones)
- [x] Language: cookie → `Accept-Language` → `en`; switching works and persists; existing cookies are honoured
- [x] Events (upcoming/past, `?city=` incl. `summit` and `On-line`), speakers and Discord data equal to the local Next.js baseline on fixtures; dev mocks work with `.env.example`
- [x] Visual diff below threshold (or reviewed) for every route × locale × viewport
- [x] Functional suite green (31 scenarios, on the Next.js baseline and on Nuxt); no console errors or hydration warnings
- [x] Unit/component tests, lint, typecheck and production build pass
- [x] Next.js code and dependencies removed; CLAUDE.md, README.md, `.env.example`, `.tolgeerc` describe the Nuxt app

## 14. File Mapping

| Next.js                                                                                     | Nuxt                                                                                                |
| ------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| `src/app/layout.tsx` (metadata, html attrs, providers)                                      | `app/app.vue`, `app/layouts/default.vue`, `app/composables/useSiteMeta.ts`, `app/plugins/tolgee.ts` |
| `src/app/page.tsx`, `src/app/**/page.tsx` + metadata layouts                                | `app/pages/**/*.vue` (metadata via `useSiteMeta`)                                                   |
| `src/app/(cities)/*/page.mdx`, `_FAQ.tsx`, `_Organizers.tsx`                                | `app/pages/[city].vue` + `src/content/cityPages.ts`                                                 |
| `src/app/(cities)/layout.tsx`                                                               | `app/pages/[city].vue` (wrapper markup)                                                             |
| `src/app/not-found.tsx`                                                                     | `app/error.vue`                                                                                     |
| `src/app/api/og/route.tsx`                                                                  | `server/api/og.get.ts`                                                                              |
| `src/app/api/mocked/crossweb/route.ts`                                                      | `server/api/mocked/crossweb.get.ts`                                                                 |
| `src/app/(pages)/discounts/opengraph-image.tsx`                                             | `server/routes/discounts/opengraph-image.png.get.ts`                                                |
| `src/app/robots.ts`, `src/app/sitemap.ts`                                                   | `server/routes/robots.txt.ts`, `server/routes/sitemap.xml.ts`                                       |
| `next.config.ts` (`redirects`, `images`)                                                    | `nuxt.config.ts` (`routeRules`, `image`)                                                            |
| `src/env.ts`                                                                                | `nuxt.config.ts` `runtimeConfig` + `server/plugins/env.ts`                                          |
| `src/tolgee/*`, `src/hooks/useLocale.ts`                                                    | `app/plugins/tolgee.ts`, `app/composables/useLanguage.ts`                                           |
| `src/hooks/useTranslatedMenuLinks.ts`                                                       | `app/composables/useMenuLinks.ts`                                                                   |
| `src/utils/getUpcomingEvents.ts`, `getPastEvents()`, `getSpeakers.ts`, `src/lib/discord.ts` | `server/utils/crossweb.ts`, `server/utils/discord.ts`, `server/api/*.get.ts`                        |
| `src/components/**/*.tsx`                                                                   | `app/components/**/*.vue` (same names; unused components not ported)                                |
| `src/components/ui/*.tsx`                                                                   | `app/components/ui/**/*.vue`                                                                        |
| `src/app/globals.css`                                                                       | `app/assets/css/main.css`                                                                           |
| `src/utils/getUpcomingEvents.test.ts`, `getSpeakers.test.ts`, `src/components/*.test.tsx`   | `server/utils/crossweb.test.ts`, `server/api/events.test.ts`, `app/components/**/*.test.ts`         |

Not ported (unused today): `AISyncLogo`, `BirthdayBanner`, `BirthdayConfetti`, `FloatingSummitCTA`, `SpecialPromoBanners`, `PromoCard`, `Summit2026Banner`, `The5ContestBanner`, `YouTubeVideos`, `ui/accordion`, `classNames()`, `getActiveCommunityItems`, `getFeaturedCommunityItems`. Their translation keys (`summit_2026.*`) and `events_page.filter.loading` (a React `Suspense` fallback) stay in `messages/*.json` but are no longer referenced in code — `tolgee sync` reports them as unused.

## 15. Follow-ups

- `lucide-vue-next` → `@lucide/vue` (the package is deprecated; kept at 0.525.0 for identical SVGs)
- Optional: `@nuxtjs/sitemap` / `@nuxtjs/robots` instead of the hand-written routes
- Optional: `devServer.host: 'localhost'` — `nuxt dev`, like `next dev` before, listens on all interfaces
