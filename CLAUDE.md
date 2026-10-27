# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Setup

```bash
pnpm install           # Install dependencies (dependency lifecycle/build scripts are blocked, see Security)
pnpm prepare           # Setup git hooks (husky + lint-staged)
cp .env.example .env   # Copy environment variables
```

### Development Server

```bash
pnpm dev              # Nuxt dev server (Vite) on http://localhost:3000
```

### Building

```bash
pnpm build            # Production build into .output/ (Nitro; the Vercel preset is picked automatically on Vercel)
pnpm preview          # Run the production build locally
pnpm start            # node .output/server/index.mjs
```

### Code Quality

```bash
pnpm lint             # nuxt prepare + ESLint (@nuxt/eslint flat config + prettier)
pnpm lint:fix         # Fix ESLint issues automatically
pnpm prettier         # Format all files with Prettier
pnpm typecheck        # nuxt prepare + nuxt typecheck (vue-tsc)
```

`nuxt prepare` generates `.nuxt/` (tsconfigs, auto-import types, the ESLint config), which `eslint.config.mjs`, `tsconfig.json` and Vitest depend on.

### Testing

```bash
pnpm test             # Run Vitest once (projects "unit" and "nuxt")
pnpm test:watch       # Run Vitest in watch mode
```

### Internationalization (Tolgee)

```bash
pnpm tolgee:pull      # Pull translations from Tolgee into messages/
pnpm tolgee:push      # Push translations to Tolgee (only `en` is pushed, see .tolgeerc)
pnpm tolgee:sync      # Sync keys extracted from app/**/*.{vue,ts} with the Tolgee project
```

### Parity Tooling (Next.js → Nuxt migration)

```bash
pnpm parity:fixtures       # Fixture server for Crossweb events/speakers (port 3999)
pnpm parity:next-baseline  # Build and start the last Next.js commit in a worktree (port 3100)
pnpm parity:run            # Capture two running sites at the same time and compare them
pnpm parity:snapshot       # Capture one site (HTTP, SEO tags, content, runtime errors, screenshots)
pnpm parity:compare        # Compare two snapshots (HTML + Markdown report in .parity/reports/)
pnpm parity:functional     # Run the functional scenarios (navigation, filters, clipboard, …)
```

See `scripts/parity/README.md`. Output goes to `.parity/` (gitignored).

### Other

```bash
pnpm screenshots:generate  # Puppeteer: capture thumbnails of src/content/mediaItems.ts URLs into public/media/screenshots/
```

## Architecture Overview

### Tech Stack

- **Nuxt 4.6** (Vue 3.5, Nitro 2.13, vue-router 5 with typed pages), server-side rendering on every request
- **TypeScript 5.9** with strict configuration (Nuxt 4 defaults incl. `noUncheckedIndexedAccess`)
- **Tailwind CSS 3.4** (via Nuxt's PostCSS config) + `tailwindcss-animate`; shadcn-style UI components in `app/components/ui/` (Reka UI dropdown menu, Embla carousel)
- **Tolgee 7** (`@tolgee/vue`) for i18n (English & Polish)
- **Zod 3** for runtime validation of env and external API responses (passport types are Zod schemas too, used for typing only)
- **Vitest 5** + `@nuxt/test-utils` + Testing Library (Vue) + happy-dom + `fast-check` (property-based tests)
- **@nuxt/image** (`<AppImage>`), **@nuxt/fonts** (Montserrat), **unplugin-icons** (Font Awesome), `lucide-vue-next`
- **@vercel/og** (satori) for OG images
- **Vercel** Analytics & Speed Insights (Nuxt modules)
- Other: `embla-carousel-vue` (+ autoplay), `reka-ui`, `date-fns`, `class-variance-authority`, `clsx`, `tailwind-merge`

### Project Structure

```
app/                            # Nuxt app (srcDir)
├── app.vue                     # <NuxtLayout><NuxtPage/>, root head (useRootHead)
├── error.vue                   # 404 / error page
├── layouts/default.vue         # Navigation + page + Footer
├── pages/                      # File-based routes (see Routes)
├── components/                 # Vue components (auto-imported; subfolders prefix the name:
│   │                           #   ui/Card.vue → <UiCard>, city/CityFaq.vue → <CityFaq>)
│   ├── ui/                     # shadcn-style primitives (Card, Badge, Carousel, DropdownMenu…)
│   ├── city/                   # City page sections
│   ├── js30/                   # /30-years-of-javascript sections
│   └── passport/               # Passport avatar
├── composables/                # useSiteMeta, useRootHead, useLanguage/useLocale, useMenuLinks,
│                               #   useSiteData (API fetches), useRenderNow, useCopyToClipboard, …
├── plugins/                    # tolgee.ts (i18n), scroll-behavior.client.ts
├── utils/                      # cn(), cva variants, image widths, OG/JSON-LD helpers, confetti engine
├── types/                      # Ambient types (geolocation element)
└── assets/css/main.css         # Tailwind layers + shadcn CSS variables + font fallback
server/                         # Nitro
├── api/                        # /api/events, /api/speakers, /api/discord, /api/og, /api/mocked/crossweb
├── routes/                     # /robots.txt, /sitemap.xml, /discounts/opengraph-image.png
├── plugins/env.ts              # Validates the environment at startup
└── utils/                      # crossweb.ts, discord.ts (cached fetchers), env.ts, og.ts
src/                            # Framework-agnostic code shared by app/ and server/ (import via ~~/src/…)
├── content/                    # Site content as typed TS data (see Content Management)
│   └── passport/               # Passport participants, attendance records, eligible cities
├── lib/passport/               # Passport logic (brackets, achievements, hall of fame) + tests
├── lib/utils.ts                # cn() (clsx + tailwind-merge)
├── types/                      # Zod schemas (event, speaker, passport) + TS types (promo, organizer, discord)
├── utils/                      # Event utils, promos, mocks, changeCityName, isDevelopment
└── setupTests.ts               # jest-dom matchers for Vitest

messages/{en,pl}.json           # Static translations (bundled; synced with Tolgee)
public/                         # Static assets: city/<slug>/ (covers, organizers), partners/, assets/brand/,
                                #   brand/wallpapers/, media/screenshots/, og-image.png, llms.txt, favicon.ico
nuxt.config.ts                  # Modules, runtime config, redirects, image/font config
scripts/                        # generate-media-screenshots.cjs (Puppeteer), parity/ (migration tooling)
docs/                           # Screenshots + social-media promo campaigns
```

Code in `src/` uses relative imports and no framework APIs. `app/` and `server/` import it as `~~/src/…`.

### Rendering & Caching Model

- Every page is server-rendered on demand by Nitro and hydrated in the browser. The language comes from the request (cookie / `Accept-Language`), so pages are not prerendered.
- External data is fetched on the server only (`server/utils/crossweb.ts`, `server/utils/discord.ts`) with Nitro `defineCachedFunction` (stale-while-revalidate; failures are not cached, a failed refresh keeps serving the previous data). The cache storage is memory locally and `vercel-runtime-cache` on Vercel (`nitro.storage`).
- Pages and components read that data through internal API routes with `useFetch` (`app/composables/useSiteData.ts`: `useUpcomingEvents`, `usePastEvents`, `useSpeakers`, `useDiscordServer`). Fixed keys make several components on one page share one request and one payload entry.
- Time-dependent filtering (upcoming events, expired promos) runs per request, never from the cache. Components use `useRenderNow()` so the server time is reused during hydration (no mismatches); values resolved on the server (promo ticker order, newest community items, the random 2026 prediction) are kept in `useState`.
- `routeRules` in `nuxt.config.ts` hold the redirects.

### Internationalization with Tolgee

- `app/plugins/tolgee.ts` creates the Tolgee instance (`@tolgee/vue`, `FormatSimple`, `DevTools`, static data from `messages/*.json`) on the server per request and once on the client; `enableSSR` keeps server and client markup identical (in-context-editing markers are only added after `onNuxtReady`, i.e. after hydration).
- **Components**: `const { t } = useTranslate()` from `@tolgee/vue`; in templates `{{ t('key') }}`, in script code `t.value('key')` (e.g. inside `useSiteMeta(() => ({ … }))` getters, so metadata follows language changes).
- **Language resolution** (`app/composables/useLanguage.ts`): `NEXT_LOCALE` cookie → `Accept-Language` header (first entry, like Tolgee's detector) → `en`, resolved on the server and hydrated via `useState('language')`. URLs have no locale prefix — both languages are served from the same URLs. The cookie name is kept from the Next.js site.
- **Switching**: `LanguageSwitcher.vue` writes the cookie and updates the language state; Tolgee switches without a page reload.
- **Translation keys**: namespaced by section (e.g. `navigation.menu_items.speakers`, `events_page.meta_title`). Keep keys static (`t('a.b')`), so `tolgee:sync` can extract them.
- **Static data**: `messages/en.json`, `messages/pl.json` (always bundled; see External Integrations → Tolgee)
- **In-context editing**: hold Alt + click on text (development with a Tolgee API key)
- City pages and several campaign pages contain hardcoded English copy (see the Copy column in Routes).

### SEO & Head

- `useSiteMeta(input)` (`app/composables/useSiteMeta.ts`) reproduces the Next.js Metadata API: root defaults (title, description, keywords, `og:*`, `twitter:*`, canonical) + a shallow per-page override — a page that sets `openGraph` or `twitter` replaces the whole object, `canonical` is inherited unless set. Tags are emitted in the same order as before. Call it once per page; pass a getter for translated values.
- `useRootHead()` (`app.vue`, `error.vue`) sets `<html lang>`, `scroll-smooth`, author/creator/publisher, robots + googlebot, format detection, icons and the Organization JSON-LD.
- `/robots.txt` and `/sitemap.xml` are Nitro routes (`server/routes/`); the sitemap is hand-maintained main pages + `CITIES`, `lastmod` = build date (`runtimeConfig.buildDate`).

### Content Management

All content is plain, typed TypeScript data in `src/content/` — no CMS and no runtime validation (passport data is validated by tests):

| File                                                                    | Used by                                                                                                        |
| ----------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `events-discounts.ts`, `software-discounts.ts`, `learning-discounts.ts` | `/discounts`, homepage promo ticker, `/discounts` OG image                                                     |
| `additionalEvents.ts`                                                   | Events not on Crossweb, merged into event lists                                                                |
| `communityParticipation.ts`                                             | Homepage community section, `/community`                                                                       |
| `cities.ts`                                                             | `CITIES` (map, nav, footer, events filter, stats, sitemap, nearest city), `UNMAPPED_CITY_PAGES` (nearest city) |
| `cityPages.ts`                                                          | City page content (`/[city]`): banner, events city, local groups, FAQ, organizers, metadata                    |
| `partners.ts`                                                           | Homepage partners carousel                                                                                     |
| `partnerships.ts`                                                       | `/community-partnerships` (icons as data: image or Lucide icon name)                                           |
| `mediaItems.ts`                                                         | `/media`, screenshot script                                                                                    |
| `youtubeVideos.ts`                                                      | `/videos`                                                                                                      |
| `socialLinks.ts`                                                        | Navigation/footer social icons (icon names, links use the redirect short URLs)                                 |
| `passport/*`                                                            | `/passport`, `/passport/[slug]`                                                                                |

Navigation and footer items live in `app/composables/useMenuLinks.ts`.

Expired promos (past `expiresAt`) are filtered out at render time — `getActivePromos` in `src/utils/promos.ts` (homepage ticker), `filterActivePromos` in the `/discounts` page, `EventDiscountSection.vue` and the `/discounts` OG image.

### Environment Variables

| Variable                     | Required  | Read in                                                | Purpose                                                |
| ---------------------------- | --------- | ------------------------------------------------------ | ------------------------------------------------------ |
| `EVENTS_API_URL`             | yes (URL) | `server/utils/env.ts` (runtime)                        | Crossweb events API (locally: `/api/mocked/crossweb`)  |
| `SITE_URL`                   | yes (URL) | `server/utils/env.ts` + `runtimeConfig.public` (build) | Canonical URLs, sitemap/robots, OG images              |
| `DISCORD_SERVER_ID`          | yes       | `server/utils/env.ts` (runtime)                        | Discord widget                                         |
| `SPEAKERS_API_URL`           | no (URL)  | `server/utils/env.ts` (runtime)                        | Crossweb speakers API                                  |
| `SPEAKERS_API_TOKEN`         | no        | `server/utils/env.ts` (runtime)                        | Basic auth token for the speakers API                  |
| `NEXT_PUBLIC_TOLGEE_API_KEY` | no        | `nuxt.config.ts` (build, development only)             | Tolgee API key (live translations, in-context editing) |
| `NEXT_PUBLIC_TOLGEE_API_URL` | no        | `nuxt.config.ts` (build)                               | Tolgee API URL                                         |
| `TOLGEE_API_KEY`             | no        | Tolgee CLI only (CI)                                   | Locally use `pnpm tolgee login` instead                |

- `server/plugins/env.ts` validates the server variables with Zod at startup (fails fast, like `@t3-oss/env-nextjs` did). The names are those of the Next.js site; `NUXT_*` runtime config variables (`NUXT_EVENTS_API_URL`, …) work as a fallback.
- `SITE_URL` is also read at build time as the default of `runtimeConfig.public.siteUrl` (`useSiteUrl()`, canonical and OG URLs), so set it for the build too (or `NUXT_PUBLIC_SITE_URL` at runtime).
- The Tolgee API key is only used by `nuxt dev`; production builds never include it.
- `NODE_ENV !== 'production'` (`src/utils/isDevelopment.ts`) enables the mock fallbacks for events and speakers.

### Styling Approach

- Tailwind CSS 3 (`tailwind.config.ts`, content: `app/**/*.{vue,ts}` + `src/content/**/*.ts`): brand colors (`purple` #2b1932, `green` #bcd35d, `blue` #219eab), shadcn CSS variables (`main.css`, `.dark` variant), custom animations (`marquee`, `pulse-scale`, accordion)
- `cn()` (`src/lib/utils.ts`, auto-imported through `app/utils/cn.ts`) and `classNames()` (`app/utils/classNames.ts`); component variants with `cva` in `app/utils/variants.ts` (`buttonVariants`, `badgeVariants`)
- No safelist: class strings stored in data (e.g. promo `gradient`) work because Tailwind's `content` globs include `src/content/**/*.ts` — keep full class names as string literals there
- Montserrat (variable font) comes from `@nuxt/fonts` (Google, self-hosted at build time) and is exposed as `--font-montserrat` (`font-sans`), with a size-adjusted `Montserrat Fallback` (Arial) to avoid layout shift
- Icons: Font Awesome via unplugin-icons (`import IconX from '~icons/fa6-solid/x'`, collections `fa6-solid`, `fa6-regular`, `fa6-brands`, `fa-solid`; 1em × 1em like react-icons) and Lucide via `lucide-vue-next`

### Images

- `<AppImage>` (`app/components/AppImage.vue`) replaces `next/image` with the same props and markup (srcset widths, `fill`, `priority`, lazy loading, SVGs unoptimized); URLs come from `@nuxt/image` — IPX locally, the Vercel image optimizer on Vercel (31-day cache).
- Remote images must be listed in `image.domains` in `nuxt.config.ts`.
- IPX rotates photos by their EXIF orientation (`image.ipx.sharpOptions.autoOrient`), like the Vercel optimizer.

### Pre-commit Hooks

- Husky `pre-commit` runs `pnpm exec lint-staged`
- lint-staged (`.lintstagedrc`) runs `prettier --write` on `*.{js,mjs,cjs,ts,vue,css,md,json,yml,yaml}` (ESLint is not run on commit)

## Routes

### Pages

40 page routes. Copy: `i18n` = Tolgee keys, `EN` = hardcoded English.

| Route                               | Source (`app/pages/…`)                 | Copy | Data / notes                                                                                                                                        |
| ----------------------------------- | -------------------------------------- | ---- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/`                                 | `index.vue`                            | i18n | Promo ticker (all promos), Crossweb events (carousel + map), nearest-city geolocation, Discord widget, community items, Crossweb speakers, partners |
| `/about`                            | `about.vue`                            | i18n |                                                                                                                                                     |
| `/events`                           | `events.vue`                           | i18n | Crossweb upcoming + past events + `ADDITIONAL_EVENTS`; `?city=<name>` filters on the server (also `summit` = conferences, `On-line`)                |
| `/speakers`                         | `speakers.vue`                         | i18n | Crossweb speakers API                                                                                                                               |
| `/organizers`                       | `organizers.vue`                       | i18n | Organizer hub (links, tools, assets)                                                                                                                |
| `/how-to-become-an-organizer`       | `how-to-become-an-organizer/index.vue` | i18n |                                                                                                                                                     |
| `/how-to-become-an-organizer/tools` | `how-to-become-an-organizer/tools.vue` | i18n | Link to the external assets generator                                                                                                               |
| `/brand`                            | `brand.vue`                            | i18n | Files from `public/assets/brand/` and `public/brand/wallpapers/`                                                                                    |
| `/30-years-of-javascript`           | `30-years-of-javascript.vue`           | EN   | Own JSON-LD, scroll animations, sections hydrated when visible                                                                                      |
| `/discounts`                        | `discounts.vue`                        | i18n | `*-discounts.ts`; anchors `#events`, `#software`, `#learning`; own OG image                                                                         |
| `/community`                        | `community.vue`                        | i18n | All `communityParticipation.ts` items (archive)                                                                                                     |
| `/community-partnerships`           | `community-partnerships.vue`           | i18n | `content/partnerships.ts`                                                                                                                           |
| `/media`                            | `media.vue`                            | i18n | `content/mediaItems.ts`                                                                                                                             |
| `/videos`                           | `videos.vue`                           | EN   | YouTube embeds from `content/youtubeVideos.ts`                                                                                                      |
| `/open-source`                      | `open-source.vue`                      | i18n |                                                                                                                                                     |
| `/passport`                         | `passport/index.vue`                   | i18n | Hall of fame from `content/passport/*`                                                                                                              |
| `/passport/[slug]`                  | `passport/[slug].vue`                  | i18n | Participant progress; unknown slug → 404 (`definePageMeta({ validate })`)                                                                           |
| `/jsnation-award`                   | `jsnation-award.vue`                   | EN   | YouTube embed                                                                                                                                       |
| `/futureconf`                       | `futureconf.vue`                       | EN   | FutureConf 2025 partnership                                                                                                                         |
| `/wdi`                              | `wdi.vue`                              | EN   | Warsaw IT Days 2026                                                                                                                                 |
| `/14-birthday`                      | `14-birthday.vue`                      | EN   | Confetti (`ConfettiCanvas.client.vue`, port of react-confetti in `app/utils/confetti.ts`)                                                           |
| `/2025-review`                      | `2025-review.vue`                      | EN   | Random 2026 prediction (resolved on the server)                                                                                                     |

City pages — `[city].vue` with content from `src/content/cityPages.ts` (unknown slug → 404), hardcoded English copy:

- **Full (10)**: `/bialystok`, `/bielsko-biala`, `/gdansk`, `/katowice`, `/krakow`, `/lodz`, `/lublin`, `/poznan`, `/warszawa`, `/wroclaw` — `CityBanner`, `CityEventSection` (Crossweb events for the city), `CityLocalGroups`, `CityFaq`, `CityOrganizers`, `CityEmail` (subset varies per city); OG image via `/api/og?city=…`; `/warszawa` also embeds a LinkedIn post
- **Placeholder (8)**: `/gliwice`, `/kielce`, `/olsztyn`, `/opole`, `/rzeszow`, `/szczecin`, `/torun`, `/zielona-gora` — static "looking for organizers" text

Also: `app/error.vue` renders the 404 page. The navigation lists `/team` and `/sponsors` as `disabled: true` items — those routes do not exist.

### Redirects

Defined as `routeRules` in `nuxt.config.ts` (`statusCode: 308`):

- `/facebook`, `/instagram`, `/instagram-bialystok`, `/instagram-poznan`, `/instagram-wroclaw`, `/linkedin`, `/x`, `/discord`, `/github`, `/youtube` → external social profiles (these short URLs are what `content/socialLinks.ts` links to)
- `/promos` → `/discounts`

### Endpoints

- **`GET /api/events?when=upcoming|past[&additional=0]`** — `server/api/events.get.ts`. Upcoming: Crossweb events + `ADDITIONAL_EVENTS` (unless `additional=0`), filtered to today … +6 months with in-progress events first; past: newest first. Used by the pages via `useFetch`.
- **`GET /api/speakers`**, **`GET /api/discord`** — `server/api/*.get.ts`. Crossweb speakers (`[]` when unavailable) and the Discord widget summary (`null` when unavailable).
- **`GET /api/og?city=<name>`** — `server/api/og.get.ts`. 1200×630 PNG via `@vercel/og` (same renderer and version as `next/og` before): the city name (default "Poland", max 100 chars) in white. The background `<img>` (`${SITE_URL}/assets/og-image-city.png`) has string `width`/`height`, which satori ignores, so — as before — it is not drawn. Used by the full city pages' metadata.
- **`GET /discounts/opengraph-image.png`** — `server/routes/discounts/opengraph-image.png.get.ts`. `/discounts` OG image with the number of active deals at request time (rendering cached per count for 1 h). The logo is read from the `og` server assets (`public/logo.svg`).
- **`GET /api/mocked/crossweb`** (`?old=1` for past events) — `server/api/mocked/crossweb.get.ts`. Mock of the Crossweb events API (dates relative to now); default `EVENTS_API_URL` in `.env.example`. Development only (404 in production builds).
- **`GET /sitemap.xml`**, **`GET /robots.txt`** — `server/routes/`. Same output as before: allows all agents (explicit rules for GPTBot, Anthropic-AI, CCBot, Google-Extended, Bingbot), links the sitemap. Not in the sitemap: `/speakers`, `/passport`, `/community`, `/open-source`, `/futureconf`, `/wdi`, `/14-birthday`, `/2025-review`, `/how-to-become-an-organizer/tools`, `UNMAPPED_CITY_PAGES`.

Files in `public/` are served from the site root (e.g. `/llms.txt`, `/og-image.png`, `/logo.svg`).

## External Integrations

### Server-side APIs (Nitro)

**Crossweb – events** (`server/utils/crossweb.ts`: `fetchCrosswebEvents`, `getEvents('upcoming' | 'past')`)

- Requests: `GET {EVENTS_API_URL}` (upcoming), `GET {EVENTS_API_URL}?old=1` (past); no auth; cached 24 h (SWR)
- Validation: `EventsSchema` (`src/types/event.ts`). Fallback on HTTP error or invalid payload: dev → `src/utils/eventsMock.ts`; prod → no events
- Consumers (via `/api/events`): homepage `FeaturedEvents` + `JoinUs`, `/events`, `CityEventSection` on city pages
- Payload: object keyed by string ids (`Record<string, Event> | null`); `date` is `DD.MM.YYYY`, `time` is `HH:MM` or `HH:MM-HH:MM`; `type` ∈ `Spotkanie | Konferencja | Meetup | Conference | Webinar | Warsztaty`.
- `changeCityName` (`src/utils/changeCityName.ts`) maps Crossweb city names (`Bielsko Biała` → `Bielsko-Biała`, `Trójmiasto` → `Gdańsk`).
- Merged with static `ADDITIONAL_EVENTS` on `/events`, city pages and the homepage map (`JoinUs`) — not in the homepage carousel (`FeaturedEvents`).
- `filterUpcomingEvents` (`src/utils/eventUtils.ts`) keeps today → +6 months, in-progress events first; past events are sorted newest first.
- `CityEventSection` matches `event.city` against its `city` prop exactly (Polish names with diacritics).
- The production `EVENTS_API_URL` is configured in the hosting environment, not in the repo.

**Crossweb – speakers** (`server/utils/crossweb.ts`: `fetchCrosswebSpeakers`, `getSpeakers()`)

- Request: `GET {SPEAKERS_API_URL}` with `Authorization: Basic {SPEAKERS_API_TOKEN}` (both env vars optional); cached 1 h (SWR)
- Validation: `SpeakersSchema` (`src/types/speaker.ts`). Fallback on missing/placeholder config, HTTP error or invalid payload: dev → `src/utils/speakersMock.ts`; prod → `[]` (sections hide)
- Consumers (via `/api/speakers`): `/speakers`, homepage `SpeakerFaces` (up to 60 avatars); images come from `crossweb.pl` through `<AppImage>`

**Discord guild widget** (`server/utils/discord.ts`)

- Request: `GET https://discord.com/api/guilds/{DISCORD_SERVER_ID}/widget.json` (public, the server widget must be enabled); cached 1 h (SWR)
- No runtime validation (TS interface only). Fallback: `null` → placeholder text
- Consumer (via `/api/discord`): homepage `JoinUs` → `DiscordCommunity` → `DiscordWidget` (server name, online count from `presence_count`, invite link)

### Tolgee (i18n service)

- `app/plugins/tolgee.ts` configures `@tolgee/vue` with `NEXT_PUBLIC_TOLGEE_API_URL` (https://app.tolgee.io) and, in development only, `NEXT_PUBLIC_TOLGEE_API_KEY`; `FormatSimple`, `DevTools`, and `staticData` from `messages/{en,pl}.json`.
- With an API key in development, translations load live from Tolgee and in-context editing works. Production renders the bundled `messages/*.json`.
- CLI (`.tolgeerc`): project `20172`, format `JSON_TOLGEE`, keys extracted from `./app/**/*.{vue,ts}`, push `en` only, pull into `./messages`.

### Client-side Services and Embeds

- **Vercel Analytics** (`@vercel/analytics/nuxt`; custom event `click_discord_invite` via `trackClientEvent` in `app/utils/analytics.ts`) and **Vercel Speed Insights** (`@vercel/speed-insights/nuxt`) — the site is hosted on Vercel (no `vercel.json` in the repo).
- **YouTube** iframes (`youtube.com/embed/…`): `/videos`, `/jsnation-award`.
- **LinkedIn** post iframe: `/warszawa`.
- **Browser Geolocation** (`<geolocation>` element with `navigator.geolocation` fallback) in `NearestCity.vue`; the nearest city is computed locally from `CITIES[].geo` + `UNMAPPED_CITY_PAGES` (no geocoding API). `geolocation` is registered as a custom element in `nuxt.config.ts`.
- **Remote images** via `<AppImage>` must match `image.domains` in `nuxt.config.ts` (Crossweb, GitHub avatars, LinkedIn media, partner/conference sites).
- **Google Fonts**: Montserrat via `@nuxt/fonts` (downloaded at build time and self-hosted).
- **JSON-LD** structured data: Organization schema in `useRootHead()` and an ItemList on `/30-years-of-javascript`.

### Tooling Only (not part of the runtime)

- `scripts/generate-media-screenshots.cjs` — Puppeteer visits every `mediaItems` URL.
- `scripts/parity/` — migration parity tooling (Puppeteer, pixelmatch); `next-baseline.sh` checks out the last Next.js commit into `.parity/next-baseline`.
- `docs/social-media/*/generate-graphics.mjs` — `@vercel/og`; downloads fonts from Google Fonts into `.fonts/`.
- Tolgee CLI (`pnpm tolgee:*`).

## Important Development Notes

### Security

- `ignore-scripts=true` in `.npmrc`; `allowBuilds` in `pnpm-workspace.yaml` blocks dependency build scripts (sharp works with its prebuilt `@img/*` binaries)
- `@lavamoat/preinstall-always-fail` fails the install if lifecycle scripts run anyway
- `overrides` in `pnpm-workspace.yaml` pins `@vercel/og`'s sharp to the version used by IPX (two sharp versions break libvips loading in the Nitro output)
- Socket.dev warnings enabled on PRs

### Hydration

- Anything that depends on the current time or randomness must render the same on the server and during hydration: use `useRenderNow()` for "now" and `useState` for values computed on the server.
- Browser-only components use the `.client.vue` suffix (e.g. `ConfettiCanvas.client.vue`) or `onMounted`.
- Vue templates condense whitespace differently than JSX: text followed by a newline and an inline element keeps a space. Glue text to inline elements (`text<span>…`) where no space is wanted, and use `{{ ' ' }}` between two elements where one is.

### Node Version

- Node 24 (`engines.node: 24.x`, `.nvmrc`: 24.14.0)
- pnpm 12 (`packageManager: pnpm@12.4.1`)

### Adding New Discounts/Promotions

Edit the appropriate content file and add an object to the exported array:

- `src/content/events-discounts.ts` - Anything with a specific date: conferences, live workshops, meetups
- `src/content/software-discounts.ts` - Software tools
- `src/content/learning-discounts.ts` - Self-paced/evergreen content: online courses, learning platforms, newsletters

Rule of thumb: a scheduled live event (even an online workshop) goes to events; self-paced educational content goes to learning.

Required fields (`Promo` in `src/types/promo.ts`): `id`, `name`, `message`, `cta`, `ticketLink`, `expiresAt` (ISO 8601), `gradient` (Tailwind classes)
Optional: `description`, `eventLink`, `country`, `city`, `icon`, `emojiLeft`, `emojiRight`, `image`, `textColor`, `discountCode`, `workshopLink`, `workshopDescription`, `workshopDiscountCode`

In the homepage ticker (`getActivePromos`), promos with `eventLink`, `country` or `city` count as events and are listed first.

### Adding Community Participation Items

Edit `src/content/communityParticipation.ts` and add to the `COMMUNITY_PARTICIPATION` array.

- Homepage: the 3 newest items with `featured: true` whose `endDate` hasn't passed (`getNewestCommunityItems`; `pinned: true` sorts first; `status` is not checked)
- `/community`: all items, including completed ones

### Generating Promo Graphics (Social Media)

Promo materials (copy + graphics) live in `docs/social-media/<campaign-name>/`.
See `docs/social-media/cyberfolks-meetjs/` as the reference implementation.

To generate graphics, write a Node script using `@vercel/og` (satori) —
do NOT hand-position elements in raw SVG:

```js
const { ImageResponse } = await import('@vercel/og');
```

Key conventions:

- **Layout**: flexbox via satori element trees (plain objects `{ type, props: { style, children } }`, no JSX needed)
- **Fonts**: Montserrat (brand font, weights 500/800) + JetBrains Mono for discount codes; fetch from Google Fonts and cache in `.fonts/` (gitignored)
- **Brand colors**: purple `#2b1932`, green `#bcd25f`, blue `#239eab`, card `#241329`
- **Brand style**: reuse the "ticket" motif from `server/routes/discounts/opengraph-image.png.get.ts` (rotated card, gradient border, dashed perforation, code pill). Avoid fake cut-out notches — satori has no masking, they clash with gradient backgrounds
- **Formats**: LinkedIn/Facebook 1200×630, IG feed 1080×1080, IG story 1080×1920 (keep content within ~250px top / 280px bottom safe zone)
- **Assets**: inline images as base64 data URIs (satori fetches remote `<img>` at render time)
- Run: `node docs/social-media/<campaign>/generate-graphics.mjs`, output PNGs to `graphics/`

### Adding New Cities

1. Add the city to `CITIES` in `src/content/cities.ts` (`geo` coordinates, map `pointPosition`/`textPosition`, `status`: `'active'`, `'paused'`, `'coming-soon'` or `'new'`) — or to `UNMAPPED_CITY_PAGES` if it should not appear on the map
2. Add the page content to `CITY_PAGES` in `src/content/cityPages.ts` (`kind: 'full'` or `'placeholder'`; copy an existing entry); put cover and organizer photos in `public/city/<slug>/`
3. Set `eventsCity` to the exact Crossweb city name (extend `changeCityName` if Crossweb spells it differently)
4. `sitemap.xml` only includes `CITIES`; for passport eligibility also add the city to `src/content/passport/eligibleCities.ts`

### Working with Translations

- Always add translation keys to both `messages/en.json` and `messages/pl.json`
- Use descriptive, namespaced keys (e.g., `hero.title`, not just `title`), written as static strings
- Components: `const { t } = useTranslate()` from `@tolgee/vue`; `{{ t('key') }}` in templates, `t.value('key')` in script code

### Testing

- Vitest projects (`vitest.config.ts`): **unit** — `src/**/*.test.ts` and `server/**/*.test.ts` in Node (Nitro auto-imports such as `defineCachedFunction` and `useServerEnv` are stubbed with `vi.stubGlobal`, see `server/utils/crossweb.test.ts`); **nuxt** — `app/**/*.test.ts` in a Nuxt environment (happy-dom, auto-imports, plugins, bundled translations), components rendered with `renderSuspended` from `@nuxt/test-utils/runtime`
- `src/setupTests.ts` adds the jest-dom matchers
- Property-based tests use `fast-check` (arbitraries in `src/lib/passport/testing/`)
- Use `vi.useFakeTimers({ toFake: ['Date'] })` in component tests (the Nuxt test app needs real timers)

### Remote Image Domains

When using external images, add the domain to `nuxt.config.ts` under `image.domains`.
