# Migration Plan: Next.js → Nuxt

> **Status:** draft for discussion · **Prepared:** 2026-10-06 · **Baseline:** `main` @ `dbc1549` (Next.js 16.3.6, React 19.2.8, Node 24, pnpm 12.4.1)
>
> The full inventory of the current app (routes, endpoints, external integrations, Next.js-specific APIs) lives in [CLAUDE.md](CLAUDE.md). This document describes how to move it to Nuxt.

## 1. Summary

Rewrite the meet.js website from Next.js (React, App Router) to Nuxt 4 (Vue 3, Nitro), keeping URLs, SEO output, i18n behavior and Vercel hosting unchanged. This is a **parity migration**: no redesign, no URL changes, no Tailwind upgrade. Improvements are collected as follow-ups (§11).

Shape of the work:

- **~4.5k LOC move almost as-is** — framework-agnostic data and logic: `src/content` (3.3k), `src/lib/passport`, most of `src/utils`, `src/types`.
- **~15.7k LOC are rewritten as Vue SFCs** — `src/app` (8.3k incl. MDX), `src/components` (7.0k), hooks and Tolgee glue (0.4k). About **4.2k LOC of that are campaign pages** and their exclusive components (decision D7).
- **Surface to preserve:** 40 pages, 11 redirects, 5 Next.js-specific endpoints, 3 server-side APIs (Crossweb events, Crossweb speakers, Discord widget), Tolgee translations (493 keys × EN/PL).

Rough effort: **25–37 person-days** (≈5–7 weeks for one full-time developer), see §9.

## 2. Goals and Non-goals

**Goals** (verified by the checklist in §10):

- Same public URLs: 40 pages, 11 redirects, `robots.txt`, `sitemap.xml`, files in `public/`.
- Same or better SEO output per page: title, description, canonical, Open Graph/Twitter tags, JSON-LD, sitemap coverage.
- Same i18n behavior: EN/PL served from the same URLs; language from the `NEXT_LOCALE` cookie → `Accept-Language` → `en`; existing users keep their language.
- Same data and caching behavior for Crossweb and Discord, including the development mocks.
- Same hosting (Vercel) with continuous analytics history (Web Analytics, Speed Insights, the `click_discord_invite` event).
- Unchanged content workflow: discounts, events, community items and cities stay plain TypeScript data files.
- Tests ported and green; lint and typecheck in place.

**Non-goals** (see §11): changing the i18n URL strategy, hreflang, Tailwind CSS 4, design changes, translating English-only pages, introducing a CMS.

## 3. Target Stack

Versions and module capabilities verified on 2026-10-06 (sources in §12).

| Concern            | Today (Next.js)                                                                                                      | Target (Nuxt)                                                                                                                             |
| ------------------ | -------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| Framework          | Next.js 16.3, React 19.2, React Compiler 1.0                                                                         | **Nuxt 4.5+** (Vue 3, Nitro). Nuxt 5 (Nitro v3, h3 v2) is expected in Q4 2026 and can be tested with `future.compatibilityVersion: 5`     |
| Rendering          | React Server Components; every page server-rendered on demand                                                        | Universal SSR + hydration; `.server.vue` islands and lazy hydration (`hydrate-never`, `hydrate-on-visible`) for static-heavy parts        |
| Routing            | `src/app`, route groups, `typedRoutes`                                                                               | `app/pages`, layouts via `definePageMeta({ layout })`, `experimental.typedPages`                                                          |
| i18n               | Tolgee (`@tolgee/react`, server instance, `FormatSimple`)                                                            | **`@nuxtjs/i18n` v10** (vue-i18n v11), `strategy: 'no_prefix'`, cookie `NEXT_LOCALE`; Tolgee CLI keeps syncing the JSON files (D3)        |
| Data fetching      | async Server Components + `fetch(…, { next: { revalidate } })`                                                       | Nitro server routes + `defineCachedFunction`, consumed with `useFetch` / `useAsyncData`                                                   |
| Server cache       | Next.js Data Cache on Vercel                                                                                         | Nitro `cache` storage on the unstorage driver `vercel-runtime-cache` (memory in development)                                              |
| Env vars           | `@t3-oss/env-nextjs`                                                                                                 | `runtimeConfig` + Zod validation in a Nitro plugin (alternative: `@t3-oss/env-nuxt`)                                                      |
| Styling            | Tailwind 3.4 + shadcn/ui (Radix)                                                                                     | Tailwind 3.4 via `@nuxtjs/tailwindcss` 6.14 + **shadcn-vue** (Reka UI) via `shadcn-nuxt`                                                  |
| Icons              | `react-icons` (fa6), `lucide-react`                                                                                  | `@nuxt/icon` with Iconify collections (`fa6-brands`, `fa6-solid`, `lucide`); `@lucide/vue` if components are preferred                    |
| Images             | `next/image` + `remotePatterns`                                                                                      | `@nuxt/image` (`<NuxtImg>`, Vercel provider) + `image.domains`                                                                            |
| Fonts              | `next/font/google` (Montserrat)                                                                                      | `@nuxt/fonts`                                                                                                                             |
| SEO                | Metadata API, `sitemap.ts`, `robots.ts`, hand-written JSON-LD                                                        | `useSeoMeta` / `useHead`; Nuxt SEO modules `@nuxtjs/sitemap`, `@nuxtjs/robots`, `nuxt-schema-org`                                         |
| OG images          | `next/og` `ImageResponse` (satori)                                                                                   | **`nuxt-og-image` v6**: `defineOgImage('Name', props)` + `components/OgImage/Name.takumi.vue` (Takumi renderer; fonts from `@nuxt/fonts`) |
| City pages         | 18 MDX pages via `@next/mdx`                                                                                         | One data-driven page `app/pages/[city].vue` (D4)                                                                                          |
| Analytics          | `@vercel/analytics/react`, `@vercel/speed-insights/next`                                                             | `@vercel/analytics/nuxt`, `@vercel/speed-insights/nuxt`                                                                                   |
| React-only UI libs | `@headlessui/react` (Disclosure), `embla-carousel-react` + autoplay, `motion` (number ticker only), `react-confetti` | Reka UI Collapsible, `embla-carousel-vue` + `embla-carousel-autoplay`, VueUse `useTransition`, `canvas-confetti`                          |
| Kept as-is         | `zod`, `date-fns`, `clsx`, `tailwind-merge`, `class-variance-authority`, `fast-check`                                | same                                                                                                                                      |
| Tests              | Vitest 5 + React Testing Library                                                                                     | Vitest + `@nuxt/test-utils` + `@testing-library/vue`                                                                                      |
| Lint/format        | `eslint-config-next` + Prettier                                                                                      | `@nuxt/eslint` + Prettier (+ `prettier-plugin-tailwindcss`)                                                                               |
| Hosting            | Vercel, Next.js preset                                                                                               | Vercel, Nuxt preset (zero-config)                                                                                                         |

## 4. Decisions to Make Before Starting

| #   | Decision                                                                                                                                      | Options                                                                     | Recommendation                                                                                                                                                                                                                                                                        |
| --- | --------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| D1  | Nuxt version                                                                                                                                  | 4.x now / wait for 5.0                                                      | Start on 4.x. Test `future.compatibilityVersion: 5` on a side branch before cutover; upgrade once 5.0 and the modules used here are stable.                                                                                                                                           |
| D2  | i18n URL strategy                                                                                                                             | `no_prefix` + cookie (parity) / `prefix_except_default` (`/pl/...`)         | `no_prefix` during the migration. Prefixes would make pages cacheable per locale (ISR) and Polish pages indexable (hreflang), but they change URLs — do it as a separate project afterwards.                                                                                          |
| D3  | Translation runtime                                                                                                                           | `@nuxtjs/i18n` + Tolgee CLI / `@tolgee/vue` runtime                         | `@nuxtjs/i18n` + Tolgee CLI. Production already renders the bundled `messages/*.json` (Tolgee's `DevTools` is a no-op in production builds); the only loss is dev-time Alt+click in-context editing. If translators rely on it, use `@tolgee/vue` (supports SSR via `staticData`).    |
| D4  | City pages                                                                                                                                    | One data-driven route / `@nuxt/content` v3 (MDC)                            | Data-driven route: the 10 full city pages share one template and the 8 placeholders are identical. Nuxt Content adds a SQLite-backed content layer (on Vercel in `/tmp`) for little gain here.                                                                                        |
| D5  | Server-side caching                                                                                                                           | Nitro cache + `vercel-runtime-cache` / ISR on API routes / external Redis   | Nitro cache with `vercel-runtime-cache`. ISR on API routes would not help: during SSR Nuxt calls its own API routes in-process, bypassing the CDN.                                                                                                                                    |
| D6  | Repo and deploy strategy                                                                                                                      | Long-lived branch in the same Vercel project / separate project / strangler | Branch `migration/nuxt` in the same Vercel project with `{ "framework": "nuxtjs" }` in the branch's `vercel.json` → a preview per push; cutover = merge to `main`; rollback = Vercel Instant Rollback; one analytics history. Land work as small PRs into the branch (one per batch). |
| D7  | Campaign pages: `/30-years-of-javascript`, `/2025-review`, `/14-birthday`, `/jsnation-award`, `/futureconf`, `/wdi` (English-only, ~4.2k LOC) | Port all / archive or redirect some                                         | Decide per page (several promote past events). Porting them is the last, lowest-priority batch; every page dropped saves 0.5–1 day.                                                                                                                                                   |
| D8  | Next.js-specific URLs                                                                                                                         | Keep `/api/og` and `/api/mocked/crossweb`                                   | Drop `/api/og` (only our own meta tags reference it; nuxt-og-image serves its own URLs). Keep `/api/mocked/crossweb`, but development-only.                                                                                                                                           |

## 5. Inventory Snapshot

Details in [CLAUDE.md](CLAUDE.md) (sections _Routes_ and _External Integrations_). Facts that shape the plan:

- **Components:** 74 files in `src/components` (incl. 6 shadcn/ui primitives); 33 are `'use client'`, the rest are Server Components. 9 are unused (Phase 0.2).
- **Tests:** 26. 13 are framework-agnostic (`lib/passport`, `getSpeakers`, `getUpcomingEvents`, `promos`); 13 are React Testing Library tests (`EventCard`, `LocalGroups`) that need rewriting.
- **Translations:** 493 keys per locale; ~97 are not referenced in `src/` (44 of them under `community_partnerships`). Placeholders (`{city}`, `{count}`, `{date}`, `{name}`, `{reason}`) work as vue-i18n named interpolation, but vue-i18n treats `@ $ | { }` as syntax: `|` appears in 8 meta titles (`"Brand Assets | meet.js"` would be parsed as a plural form) and `@` in 4 messages (e-mail addresses).
- **JSX inside data:** `src/content/partnerships.tsx` (uses `next/image`), `src/content/socialLinks.tsx` (icon elements), `src/app/(cities)/*/_FAQ.tsx` (answers with links). `Promo.icon` is typed `ReactNode | string`, but all 55 values are strings.
- **Alias:** 23 framework-agnostic modules import via `@/…`, which in Nuxt points to `app/` instead of `src/`.
- **Custom element:** `NearestCity` renders the experimental `<geolocation>` element, which Vue must be told is a native element.

## 6. Mapping Reference

### 6.1 Pages

| Route                               | Next.js source (`src/app/…`)                                        | Nuxt target (`app/pages/…`)            | Notes                                                                                |
| ----------------------------------- | ------------------------------------------------------------------- | -------------------------------------- | ------------------------------------------------------------------------------------ |
| `/`                                 | `page.tsx`                                                          | `index.vue`                            | Largest page: hero, promo ticker, events carousel, map, Discord, community, speakers |
| `/about`                            | `about/page.tsx` + `layout.tsx`                                     | `about.vue`                            |                                                                                      |
| `/events`                           | `events/page.tsx` + `layout.tsx`                                    | `events.vue`                           | `?city=` (incl. `summit`, `On-line`) from `useRoute().query`                         |
| `/speakers`                         | `speakers/page.tsx`                                                 | `speakers.vue`                         |                                                                                      |
| `/organizers`                       | `organizers/page.tsx`                                               | `organizers.vue`                       |                                                                                      |
| `/how-to-become-an-organizer`       | `how-to-become-an-organizer/page.tsx` + `layout.tsx`                | `how-to-become-an-organizer/index.vue` |                                                                                      |
| `/how-to-become-an-organizer/tools` | `how-to-become-an-organizer/tools/page.tsx`                         | `how-to-become-an-organizer/tools.vue` |                                                                                      |
| `/brand`                            | `brand/page.tsx` + `layout.tsx`                                     | `brand.vue`                            |                                                                                      |
| `/discounts`                        | `(pages)/discounts/page.tsx` + `layout.tsx` + `opengraph-image.tsx` | `discounts.vue`                        | OG image component (§6.2)                                                            |
| `/community`                        | `(pages)/community/page.tsx`                                        | `community.vue`                        |                                                                                      |
| `/community-partnerships`           | `(pages)/community-partnerships/…`                                  | `community-partnerships.vue`           |                                                                                      |
| `/media`                            | `(pages)/media/…`                                                   | `media.vue`                            |                                                                                      |
| `/videos`                           | `(pages)/videos/…`                                                  | `videos.vue`                           | YouTube iframes                                                                      |
| `/open-source`                      | `(pages)/open-source/…`                                             | `open-source.vue`                      |                                                                                      |
| `/passport`                         | `(pages)/passport/page.tsx` + `layout.tsx`                          | `passport/index.vue`                   |                                                                                      |
| `/passport/[slug]`                  | `(pages)/passport/[slug]/page.tsx`                                  | `passport/[slug].vue`                  | Unknown slug → 404 via `definePageMeta({ validate })`                                |
| `/30-years-of-javascript`           | `30-years-of-javascript/…`                                          | `30-years-of-javascript.vue`           | D7; `React.lazy` sections → `Lazy*` + `hydrate-on-visible`                           |
| `/jsnation-award`                   | `(pages)/jsnation-award/…`                                          | `jsnation-award.vue`                   | D7                                                                                   |
| `/futureconf`                       | `(pages)/futureconf/…`                                              | `futureconf.vue`                       | D7                                                                                   |
| `/wdi`                              | `(pages)/wdi/…`                                                     | `wdi.vue`                              | D7                                                                                   |
| `/14-birthday`                      | `(pages)/14-birthday/…`                                             | `14-birthday.vue`                      | D7; confetti inside `<ClientOnly>`                                                   |
| `/2025-review`                      | `(pages)/2025-review/…`                                             | `2025-review.vue`                      | D7                                                                                   |
| 18 city pages                       | `(cities)/<slug>/page.mdx` + `_FAQ.tsx`, `_Organizers.tsx`          | `[city].vue` (layout `city`)           | Data from Phase 0.4; unknown slug → 404 via `validate`                               |
| 404                                 | `not-found.tsx`                                                     | `app/error.vue`                        |                                                                                      |

Metadata from the pass-through `layout.tsx` files moves into each page (`useSeoMeta`).

### 6.2 Endpoints, Metadata Routes and Redirects

| Today                                    | Source                                          | Nuxt                                                                                       | Notes                                                                                     |
| ---------------------------------------- | ----------------------------------------------- | ------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------- |
| `GET /api/og?city=<name>`                | `src/app/api/og/route.tsx`                      | `app/components/OgImage/City.takumi.vue` + `defineOgImage('City', { city })` on city pages | Old URL dropped (D8)                                                                      |
| `GET /api/mocked/crossweb[?old=1]`       | `src/app/api/mocked/crossweb/route.ts`          | `server/api/mocked/crossweb.get.ts`                                                        | Returns 404 unless `import.meta.dev`                                                      |
| `GET /discounts/opengraph-image-<hash>`  | `src/app/(pages)/discounts/opengraph-image.tsx` | `app/components/OgImage/Discounts.takumi.vue` + `defineOgImage` on `/discounts`            | Rendered on request and cached, so the active-deals count no longer freezes at build time |
| `GET /sitemap.xml`                       | `src/app/sitemap.ts`                            | `@nuxtjs/sitemap`                                                                          | Pages are discovered automatically; add city and passport URLs                            |
| `GET /robots.txt`                        | `src/app/robots.ts`                             | `@nuxtjs/robots`                                                                           | Same rules: all agents + GPTBot, Anthropic-AI, CCBot, Google-Extended, Bingbot            |
| Server Action `setLanguage(locale)`      | `src/tolgee/language.ts`                        | `useI18n().setLocale()`                                                                    | No endpoint needed                                                                        |
| 11 redirects (`/facebook`, `/promos`, …) | `next.config.ts`                                | `routeRules: { '/x': { redirect: { to, statusCode: 308 } } }`                              | Same targets and status                                                                   |
| —                                        | —                                               | New: `GET /api/events?when=upcoming\|past`, `GET /api/speakers`, `GET /api/discord`        | Data endpoints for `useFetch`; public read-only JSON, secrets stay server-side            |

### 6.3 Next.js / React APIs → Nuxt / Vue

| Next.js / React                                             | Nuxt / Vue                                                                                  |
| ----------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| `metadata` / `generateMetadata`, `title.template`           | `useSeoMeta()` / `useHead()` with `useI18n().t`; `titleTemplate`                            |
| async Server Component fetching data                        | `useFetch('/api/…')` / `useAsyncData()` in `<script setup>`                                 |
| `fetch(url, { next: { revalidate } })`                      | `defineCachedFunction(fn, { maxAge })` in `server/utils/`                                   |
| React `cache()`                                             | `defineCachedFunction` (across requests) or a shared `useAsyncData` key (per request)       |
| `export const dynamic = 'force-dynamic'`                    | Default behavior (SSR per request); exceptions via `routeRules`                             |
| `cookies()` / `headers()` from `next/headers`               | `useCookie()` / `useRequestHeaders()` (language handled by `@nuxtjs/i18n`)                  |
| Server Actions (`'use server'`)                             | Server route + `$fetch` (POST); for the language: `setLocale()`                             |
| `notFound()`                                                | `throw createError({ statusCode: 404, fatal: true })` or `definePageMeta({ validate })`     |
| `useRouter().refresh()`                                     | `refreshNuxtData()`                                                                         |
| `next/link` + typed `Route` casts                           | `<NuxtLink>` + `experimental.typedPages`                                                    |
| `next/image`, `images.remotePatterns`                       | `<NuxtImg>`, `image.domains`                                                                |
| `next/font/google`                                          | `@nuxt/fonts`                                                                               |
| `next/dynamic(…, { ssr: false })`                           | `<ClientOnly>` or a `*.client.vue` component                                                |
| `React.lazy` + `Suspense`                                   | `Lazy*` components (`hydrate-on-visible`) or `defineAsyncComponent`                         |
| `'use client'`                                              | Not needed — every component hydrates; use `hydrate-never` / `.server.vue` for static parts |
| `ImageResponse` (`next/og`)                                 | `nuxt-og-image` (`defineOgImage`, `components/OgImage/*.takumi.vue`)                        |
| `sitemap.ts`, `robots.ts`                                   | `@nuxtjs/sitemap`, `@nuxtjs/robots`                                                         |
| JSON-LD via `dangerouslySetInnerHTML`                       | `useSchemaOrg()` (`nuxt-schema-org`) or `useHead({ script: [...] })`                        |
| `not-found.tsx`                                             | `app/error.vue`                                                                             |
| Route groups `(pages)`, `(cities)`                          | Not needed; layouts in `app/layouts/` + `definePageMeta({ layout })`                        |
| Private `_FAQ.tsx`, `_presentation.tsx` next to pages       | Must live outside `app/pages/` — every file there becomes a route                           |
| `redirects()` in `next.config.ts`                           | `routeRules` with `redirect`                                                                |
| `@t3-oss/env-nextjs`                                        | `runtimeConfig` + Zod                                                                       |
| JSX typing for `<geolocation>` (`geolocation-element.d.ts`) | `vue.compilerOptions.isCustomElement: (tag) => tag === 'geolocation'`                       |
| `@/` = `src/`                                               | `~` / `@` = `app/`, `~~` = repository root                                                  |

### 6.4 Data Layer

```
server/
  utils/crossweb.ts           # fetch + EventsSchema/SpeakersSchema + changeCityName + dev mocks
  utils/discord.ts            # widget.json fetch
  api/events.get.ts           # ?when=upcoming|past → merged with ADDITIONAL_EVENTS, filtered, sorted
  api/speakers.get.ts
  api/discord.get.ts
  api/mocked/crossweb.get.ts  # development only
  plugins/env.ts              # Zod validation of runtimeConfig at startup
```

Framework-agnostic modules (`src/content`, `src/types`, `src/lib/passport`, `src/utils/{eventUtils,promos,changeCityName}`) stay where they are during the migration and are imported from both apps (`~~/src/…` in Nuxt), so content PRs merged into `main` keep applying cleanly. They move to `shared/` in Phase 8.

```ts
// server/utils/crossweb.ts
export const getCrosswebEvents = defineCachedFunction(
  async (when: 'upcoming' | 'past') => {
    /* fetch EVENTS_API_URL (?old=1 for past), EventsSchema.parse, changeCityName */
  },
  { name: 'crossweb-events', maxAge: 60 * 60 * 24, getKey: (when) => when },
);

// nuxt.config.ts
export default defineNuxtConfig({
  nitro: {
    storage: { cache: { driver: 'vercel-runtime-cache' } },
    devStorage: { cache: { driver: 'memory' } },
  },
});
```

TTLs stay as today: events 24 h, speakers 1 h, Discord 1 h. Rules:

- **Cache raw upstream data only.** Time-dependent logic (`filterUpcomingEvents`, in-progress events, promo expiry) runs per request on the server — inside the API route or `useAsyncData` — never in client-side `computed`. Otherwise "today" goes stale and hydration mismatches appear.
- **Secrets stay server-side:** `SPEAKERS_API_TOKEN` lives in private `runtimeConfig`.
- **Same fallbacks:** dev → mocks; production → no events / empty speakers / Discord placeholder.

### 6.5 i18n

```ts
// nuxt.config.ts
i18n: {
  strategy: 'no_prefix',
  defaultLocale: 'en',
  locales: [
    { code: 'en', language: 'en-US', file: 'en.json' },
    { code: 'pl', language: 'pl-PL', file: 'pl.json' },
  ],
  detectBrowserLanguage: {
    useCookie: true,
    cookieKey: 'NEXT_LOCALE', // existing users keep their language
    fallbackLocale: 'en',
  },
},
```

- Point the module at the existing `messages/*.json`, or move them to the module's locales directory and update `push.filesTemplate` / `pull.path` in `.tolgeerc`.
- `useI18n().t` replaces both `getTranslate()` (server, ~70 occurrences) and `useTranslate()` (client, ~30 occurrences); it works during SSR and on the client.
- `LanguageSwitcher` calls `setLocale()` — no server action and no full reload.
- `join_us.how_it_works_body` contains a literal `<geolocation>`; set vue-i18n's `warnHtmlMessage: false` (in `i18n.config.ts`) or rephrase the message.

### 6.6 Component Conversion Conventions

- One React component → one SFC with `<script setup lang="ts">`; props via `defineProps<…>()`, `children` → `<slot>`.
- `className` → `class`; conditional classes → `:class="cn(…)"`; copy Tailwind classes verbatim.
- `useState` → `ref`; `useMemo` → `computed`; `useEffect` → `onMounted` / `watch` (+ cleanup in `onBeforeUnmount`); DOM `useRef` → template ref; `useCallback` → plain function.
- Browser-only code (geolocation, `window`, clipboard, confetti) goes in `onMounted` or `<ClientOnly>`.
- Server data only via `useFetch` / `useAsyncData` → server routes; never import from `server/` in components.
- Static, text-heavy sections (campaign pages, timelines) → `hydrate-never` or `.server.vue` islands so they don't ship JS.
- Dates: format with an explicit locale and `timeZone: 'Europe/Warsaw'` so server and client output match.

## 7. Phases

### Phase 0 — Prepare the Next.js Codebase (3–5 days)

Shrink and stabilize what has to be migrated and build the safety net. Everything here ships to production on Next.js, independently of the migration.

1. **Fix bugs instead of porting them:**
   - `/warszawa` canonical and `og:url` point to `/warsaw` (404).
   - `og:url` of Białystok, Bielsko-Biała, Poznań and Wrocław points to `/city/<slug>` (404).
   - `NEXT_LOCALE` cookie `maxAge` is given in milliseconds; it must be seconds.
   - `/api/mocked/crossweb` is public in production; make it development-only.
   - `public/llms.txt` links to `/team#…` (404).
2. **Remove dead code:**
   - Unused components: `AISyncLogo`, `BirthdayBanner`, `BirthdayConfetti`, `FloatingSummitCTA`, `SpecialPromoBanners` (+ `PromoCard`, used only there), `Summit2026Banner`, `The5ContestBanner`, `YouTubeVideos`.
   - Unused helpers `getActiveCommunityItems`, `getFeaturedCommunityItems`; duplicate `src/types/menuLinks.tsx`; legacy `classNames()` → `cn()`.
   - Translation keys not referenced in `src/` (~97) — verify, then delete in Tolgee and in the JSON files.
   - `docs/promo-banners-example.png` (no longer referenced).
3. **Make content plain data (no JSX, no React types):**
   - `src/content/partnerships.tsx` → `.ts` with plain fields (image paths, texts).
   - `src/content/socialLinks.tsx` → Iconify icon names (e.g. `fa6-brands:discord`) instead of React elements.
   - `Promo.icon`: `ReactNode | string` → `string`.
4. **Consolidate city pages:** move each city's banner, local groups, FAQ (Markdown or plain strings with links as data), organizers, e-mail, LinkedIn embed and metadata into one typed `src/content/cityPages.ts` rendered by a single component. The MDX files become thin, and the Nuxt port becomes one page plus data.
5. **i18n compatibility with vue-i18n:**
   - Drop the `" | meet.js"` suffix from the 8 affected title messages and add it in code (`title.template` now, `titleTemplate` in Nuxt).
   - Pass e-mail addresses to the 4 affected messages as parameters (`{email}`).
   - Add a unit test that fails on unescaped `@ $ |` and on braces other than `{param}` in `messages/*.json`.
6. **Framework-agnostic data layer:**
   - Split `getUpcomingEvents`, `getPastEvents` (now inside `src/app/events/page.tsx`), `getSpeakers` and `getDiscordServerData` into pure functions (fetch + Zod validation + normalization, config passed in) and thin Next.js wrappers that add `next: { revalidate }`.
   - Replace `@/…` imports in `src/content`, `src/types`, `src/lib/passport` and `src/utils` with relative imports so both apps resolve them.
7. **Parity harness** (`scripts/parity-check.mjs`):
   - For every page, redirect and endpoint, request with `NEXT_LOCALE=en` and `NEXT_LOCALE=pl`. Record status, `Location`, `<html lang>`, `<title>`, meta description, canonical, `og:*` / `twitter:*`, JSON-LD types and nav/footer links.
   - Commit a snapshot of current production as the baseline.
   - Extend the Puppeteer setup (already a devDependency) to capture desktop and mobile screenshots of every page in EN and PL.
8. **Working agreement:** content PRs keep landing on `main` in the same data files; the migration branch merges `main` at least weekly; new React-only features need a note in this plan.

**Exit:** fixes live in production, content data is JSX-free, the baseline snapshot is committed.

### Phase 1 — Nuxt Skeleton (2–3 days)

1. **Scaffold** Nuxt 4 at the repository root on the `migration/nuxt` branch: `app/`, `server/`, `nuxt.config.ts`; `public/` is reused as-is.
2. **Scripts:** `dev` / `build` / `preview` / `typecheck` via `nuxt`.
   - Nuxt starters run `nuxt prepare` as `postinstall`. Don't rely on it here (the repo's policy is to block lifecycle scripts); call `nuxt prepare` explicitly before `typecheck`, `lint` and `test`.
   - Observed on 2026-10-06: `pnpm install` (pnpm 12.4.1) ran the root `prepare` script even though `.npmrc` sets `ignore-scripts=true`. Re-check how the script policy behaves before relying on lifecycle scripts either way.
3. **Dependency policy:** audit every new package for install scripts against `allowBuilds` in `pnpm-workspace.yaml`; avoid native dependencies; keep `@lavamoat/preinstall-always-fail` and Socket.dev checks.
4. **Modules:** `@nuxtjs/i18n`, `@nuxtjs/tailwindcss`, `shadcn-nuxt`, `@nuxt/icon`, `@nuxt/image`, `@nuxt/fonts`, `@nuxtjs/sitemap`, `@nuxtjs/robots`, `nuxt-schema-org`, `nuxt-og-image`, `@nuxt/eslint`, `@nuxt/test-utils`.
5. **Tailwind and fonts:**
   - Reuse `tailwind.config.ts`. Update `content` globs to `app/**/*.{vue,ts}` and keep `src/content/**/*.ts`, otherwise promo `gradient` classes disappear.
   - Move `globals.css` variables to `app/assets/css/main.css`.
   - Montserrat via `@nuxt/fonts`, exposed as `--font-montserrat` for `font-sans`.
6. **App shell:**
   - `app/app.vue`: `<NuxtLayout>`, `<Analytics />`, `<SpeedInsights />`.
   - `app/layouts/default.vue`: navigation and footer; `app/layouts/city.vue`: city wrapper.
   - `app/error.vue`: 404 copy from `not-found.tsx`.
   - `vue.compilerOptions.isCustomElement` for `<geolocation>`.
7. **i18n** as in §6.5, with `<html lang>` set from the current locale.
8. **Env vars:**
   - Map the existing names in `nuxt.config.ts`: `EVENTS_API_URL`, `SITE_URL`, `DISCORD_SERVER_ID`, `SPEAKERS_API_URL`, `SPEAKERS_API_TOKEN` → private/public `runtimeConfig`.
   - Values are read at build time, which matches Vercel, where env changes require a redeploy anyway.
   - Validate with Zod in `server/plugins/env.ts`.
9. **Vercel:** `vercel.json` with `{ "framework": "nuxtjs" }` on the branch only. Check that Preview env vars are set.

**Exit:** a preview deployment renders navigation and footer in EN and PL; switching language persists via `NEXT_LOCALE`.

### Phase 2 — Data Layer (2–3 days)

1. Import the framework-agnostic modules from `~~/src/…` — no copies.
2. Implement the server utilities and routes from §6.4 with caching, the development-only mock route and per-request time-dependent logic.
3. Port the 13 framework-agnostic tests; add tests for the API handlers.

**Exit:** `/api/events?when=upcoming|past`, `/api/speakers` and `/api/discord` return the same data as the Next.js app; `pnpm dev` works with `.env.example` (mock events and speakers).

### Phase 3 — UI Foundation (3–4 days)

1. **shadcn-vue primitives** (button, badge, card, accordion, dropdown-menu, carousel on `embla-carousel-vue`). Port the `cva` variants from `src/components/ui/*` so visuals match.
2. **Icons:** prefer one system — `@nuxt/icon` with local Iconify collections (`@iconify-json/fa6-brands`, `fa6-solid`, `lucide`).
3. **Layout components:**
   - Navigation (desktop/mobile, dropdowns, city list with status dots; Headless UI `Disclosure` → Reka UI Collapsible).
   - Footer (menus, cities, status legend), `LanguageSwitcher`, `SocialLinks`, `Logo`, `SkipNavigation`.
   - Port `useTranslatedMenuLinks` to a composable.
4. **Analytics:** `trackClientEvent` with `track` from `@vercel/analytics`.
5. **Component tests:** set up `@nuxt/test-utils` + `@testing-library/vue`; port the `EventCard` and `LocalGroups` tests along with the components.

**Exit:** navigation, footer and language switch match production screenshots.

### Phase 4 — Pages (8–12 days)

Port in batches, one PR per batch into `migration/nuxt`. For every page: metadata via `useSeoMeta`, translations, `<NuxtImg>`, then run the parity harness for that route.

| Batch | Pages                                                                                                                                                                 | Notes                                                                                                                                                                      |
| ----- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| A     | `/about`, `/organizers`, `/how-to-become-an-organizer`, `/how-to-become-an-organizer/tools`, `/open-source`, `/brand`, `/media`, `/community-partnerships`, `/videos` | Static, translated — warm-up for the conventions                                                                                                                           |
| B     | `/discounts` (+ promo ticker), `/community`, `/passport`, `/passport/[slug]`                                                                                          | Content-driven                                                                                                                                                             |
| C     | `/events`, `/speakers`, `/`                                                                                                                                           | External data; homepage last (Hero, PromoTicker, FeaturedEvents, JoinUs with PolandMap + NearestCity + Discord, Stats with number ticker, SpeakerFaces, partners carousel) |
| D     | 18 city pages via `[city].vue`                                                                                                                                        | Data from Phase 0.4; LinkedIn embed for Warszawa; per-city OG image                                                                                                        |
| E     | Campaign pages per D7                                                                                                                                                 | Static-heavy: `hydrate-never` / islands; confetti in `<ClientOnly>`                                                                                                        |

**Exit:** all 40 routes pass the parity harness (status, title, description, canonical, OG tags).

### Phase 5 — SEO and Metadata (2–3 days)

1. **Site config:** URL from `SITE_URL`, name "meet.js"; canonical URLs without trailing slash (as today); `titleTemplate: '%s | meet.js'`; default OG image `/og-image.png`.
2. **OG images:** `OgImage/City.takumi.vue` (background `/assets/og-image-city.png`, Montserrat) and `OgImage/Discounts.takumi.vue` (active deals counted at request time).
3. **Sitemap:** `@nuxtjs/sitemap` with automatic page discovery plus city and passport URLs. This fixes today's gaps (`/speakers`, `/passport`, `/community`, unmapped cities…); decide whether campaign pages stay listed.
4. **Robots:** `@nuxtjs/robots` with the same groups and a sitemap link.
5. **JSON-LD:** `nuxt-schema-org` Organization (from `SchemaMarkup`) and the page-level JSON-LD of `/30-years-of-javascript`.
6. **Redirects:** the 11 redirects as `routeRules` (308).

**Exit:** parity harness shows equal or intentionally improved SEO tags on all routes; sitemap and robots validated.

### Phase 6 — QA (3–5 days)

1. Parity harness and visual diffs (EN/PL, desktop/mobile) against the Phase 0 baseline.
2. **Functional checks:**
   - Language switch, and an existing `NEXT_LOCALE` cookie still honored.
   - `/events` filters incl. `summit` and `On-line`; 404 for unknown passport and city slugs.
   - Nearest city (geolocation element + fallback), Discord online count.
   - Discount code copy, carousels with autoplay, mobile menu, confetti, `dark:` styles.
3. No hydration warnings or console errors on any page.
4. **Performance:** Lighthouse on `/`, `/events`, a city page and `/30-years-of-javascript` versus the baseline; check shipped JS; Speed Insights on the preview.
5. **Analytics:** page views and `click_discord_invite` recorded for the preview deployment.

**Exit:** the definition of done (§10) is met on the final preview.

### Phase 7 — Cutover (0.5–1 day + monitoring)

1. Short content freeze; merge `main` into `migration/nuxt`; rerun the parity harness on the final preview.
2. Tag the last Next.js production commit (`last-nextjs`).
3. Merge `migration/nuxt` into `main` → production builds Nuxt.
4. **Rollback:** Vercel Instant Rollback to the last Next.js deployment.
5. **Monitor for 1–2 weeks:** 404/5xx in Vercel logs, Search Console (coverage, canonicals), Speed Insights, request volume to Crossweb and Discord.

### Phase 8 — Cleanup (1 day)

1. Remove Next.js/React code and dependencies: `src/app`, `src/components`, `src/tolgee`, `next.config.ts`, `next-env.d.ts`, `mdx-components.tsx`, `next`, `@next/mdx`, `eslint-config-next`, `@t3-oss/env-nextjs`, `react*`, `babel-plugin-react-compiler`, `@tolgee/react`.
2. Move `src/content`, `src/types`, `src/lib/passport` and the shared utils into `shared/`.
3. Switch the Vercel project framework setting to Nuxt and drop `"framework"` from `vercel.json`.
4. Update CLAUDE.md, README.md, `.env.example` and the `.tolgeerc` paths.

## 8. Risks and Mitigations

| Risk                                                                                                                | Impact                                      | Mitigation                                                                                         |
| ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| SEO regressions (titles, canonicals, OG, sitemap, redirects)                                                        | Lost search traffic                         | Parity harness on every preview; Search Console monitoring after cutover                           |
| vue-i18n special characters in translations                                                                         | Truncated or broken texts                   | Phase 0.5 fixes and a test that guards future translations                                         |
| Hydration mismatches from time-dependent rendering (event filters, promo expiry, in-progress events, weekday names) | Console errors, flicker, wrong content      | Compute on the server per request; format dates with an explicit locale and time zone              |
| More client JS than today (Server Components ship no JS; Vue hydrates everything)                                   | Worse INP/LCP on large static pages         | `hydrate-never` / `.server.vue` islands; measure in Phase 6                                        |
| Cache semantics differ (Next.js Data Cache vs Nitro cache; Runtime Cache is not persistent)                         | More upstream calls or stale data           | `vercel-runtime-cache` driver; acceptable for 1–24 h TTLs; monitor Crossweb/Discord request volume |
| Losing Tolgee in-context editing (D3)                                                                               | Translators' workflow changes               | Confirm with translators; fall back to `@tolgee/vue`                                               |
| Parallel development during the migration                                                                           | Merge conflicts, lost content updates       | Shared data stays in place; weekly merges from `main`; freeze only at cutover                      |
| Script policy vs new dependencies (`allowBuilds`, `nuxt prepare` not run on install)                                | Broken installs or missing types            | Audit dependencies; run `nuxt prepare` explicitly                                                  |
| Nuxt 5 released mid-migration; module compatibility                                                                 | Rework                                      | Pin versions; test `compatibilityVersion: 5` before cutover; upgrade afterwards                    |
| Returning users' language preference                                                                                | Wrong language on first visit after cutover | Same cookie name via `detectBrowserLanguage.cookieKey: 'NEXT_LOCALE'`                              |

## 9. Effort Estimate

| Phase                | Person-days |
| -------------------- | ----------- |
| 0 — Prepare Next.js  | 3–5         |
| 1 — Nuxt skeleton    | 2–3         |
| 2 — Data layer       | 2–3         |
| 3 — UI foundation    | 3–4         |
| 4 — Pages            | 8–12        |
| 5 — SEO and metadata | 2–3         |
| 6 — QA               | 3–5         |
| 7 — Cutover          | 0.5–1       |
| 8 — Cleanup          | 1           |
| **Total**            | **~25–37**  |

Assumptions: one developer who knows Vue/Nuxt, AI-assisted component conversion with human review, decisions D1–D8 settled before Phase 1, and all campaign pages ported (each one dropped under D7 saves 0.5–1 day). Volunteer, part-time work stretches the calendar accordingly.

## 10. Definition of Done

- [ ] All 40 pages return 200 under the same URLs; unknown city and passport slugs return 404
- [ ] The 11 redirects return 308 with the same targets
- [ ] `robots.txt`, `sitemap.xml` (including previously missing pages), `llms.txt` and other `public/` files are served
- [ ] Title, description, canonical and OG/Twitter tags match the baseline (or are intentionally improved) in EN and PL
- [ ] OG images render for the homepage, `/discounts` and city pages
- [ ] Language: `NEXT_LOCALE` cookie → `Accept-Language` → `en`; switching works without a full reload; existing cookies are honored
- [ ] Events (upcoming/past, `?city=` incl. `summit` and `On-line`), speakers and Discord data match production; dev mocks work
- [ ] No hydration warnings or console errors
- [ ] Lighthouse / Speed Insights not worse than the baseline on key pages
- [ ] Vercel Analytics records page views and `click_discord_invite`
- [ ] Unit and component tests, lint and typecheck pass
- [ ] CLAUDE.md, README.md and `.env.example` describe the Nuxt app

## 11. Follow-ups After the Migration

- i18n URL prefixes (`/pl/...`) with hreflang and per-locale ISR/CDN caching (D2).
- Upgrade to Nuxt 5 once it and the modules used here are stable.
- Tailwind CSS 4 (`@nuxtjs/tailwindcss` v7 or `@tailwindcss/vite`).
- Translate English-only pages (city pages, campaign pages) or mark them as English.
- Prerender/ISR for pages without per-user content.
- Bring back Tolgee in-context editing if needed (D3).

## 12. References

- Nuxt 4.5 release and the road to Nuxt 5: <https://nuxt.com/blog/v4-5>, <https://nuxt.com/docs/4.x/community/roadmap>
- Typed pages (Nuxt 4.4): <https://nuxt.com/blog/v4-4>
- Server components and lazy hydration: <https://nuxt.com/docs/4.x/guide/concepts/server-components>, <https://nuxt.com/docs/4.x/guide/recipes/mostly-static-sites>
- Nuxt i18n (v10, `no_prefix`, `detectBrowserLanguage`): <https://i18n.nuxtjs.org>
- Nuxt OG Image v6 (`defineOgImage`, renderer suffixes, fonts via `@nuxt/fonts`): <https://nuxtseo.com/og-image/migration-guide/v6>, <https://nuxtseo.com/og-image/renderers/takumi>
- Tolgee with Vue and SSR: <https://docs.tolgee.io/js-sdk/integrations/vue/ssr>
- Nuxt on Vercel (ISR route rules, functions): <https://vercel.com/docs/frameworks/full-stack/nuxt>
- `vercel.json` `framework` override: <https://vercel.com/docs/project-configuration/vercel-json>
- unstorage Vercel Runtime Cache driver: <https://unstorage.unjs.io/drivers/vercel>; Nitro storage: <https://nitro.build/guide/storage>
- Nuxt Content on Vercel (for D4): <https://content.nuxt.com/docs/deploy/vercel>
- Vercel Web Analytics and Speed Insights for Nuxt: <https://vercel.com/docs/analytics/quickstart>, <https://vercel.com/docs/speed-insights/package>
- Nuxt Tailwind module: <https://tailwindcss.nuxtjs.org/getting-started/installation>
- shadcn-vue: <https://www.shadcn-vue.com>
- Lucide for Vue (`@lucide/vue`): <https://lucide.dev/docs/lucide-vue>
