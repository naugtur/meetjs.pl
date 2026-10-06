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
pnpm dev              # Start Next.js dev server (Turbopack is the default bundler in Next.js 16)
pnpm dev:webpack      # Start with webpack instead of Turbopack
```

### Building

```bash
pnpm build            # Production build with Turbopack (default)
pnpm build:webpack    # Production build with webpack
pnpm start            # Start production server
```

`pnpm build` prints the route table (ƒ dynamic / ○ static) — the quickest way to verify the route list below.

### Code Quality

```bash
pnpm lint             # Run ESLint (flat config: next core-web-vitals + typescript + prettier)
pnpm lint:fix         # Fix ESLint issues automatically
pnpm prettier         # Format all files with Prettier
pnpm typegen          # Generate Next.js route types (next typegen) and run tsc --noEmit
```

### Testing

```bash
pnpm test             # Run Vitest tests once
pnpm test:watch       # Run Vitest in watch mode
```

### Internationalization (Tolgee)

```bash
pnpm tolgee:pull      # Pull translations from Tolgee into messages/
pnpm tolgee:push      # Push translations to Tolgee (only `en` is pushed, see .tolgeerc)
pnpm tolgee:sync      # Sync keys extracted from src/**/*.ts(x) with the Tolgee project
```

### Other

```bash
pnpm screenshots:generate  # Puppeteer: capture thumbnails of src/content/mediaItems.ts URLs into public/media/screenshots/
```

## Architecture Overview

### Tech Stack

- **Next.js 16.3** (App Router), Turbopack as the default bundler
- **React 19.2** with **React Compiler 1.0** (enabled globally)
- **TypeScript 5.9** with strict configuration
- **Tailwind CSS 3.4** + `tailwindcss-animate`; **shadcn/ui** (Radix UI) components
- **MDX** via `@next/mdx` (city pages)
- **Tolgee 7** for i18n (English & Polish)
- **Zod 3** for runtime validation of env and external API responses (passport types are Zod schemas too, used for typing only)
- **Vitest 5** + React Testing Library + `fast-check` (property-based tests)
- **Vercel** Analytics & Speed Insights
- UI libraries: `@headlessui/react` (navigation), `embla-carousel-react` (+ autoplay), `motion`, `lucide-react`, `react-icons`, `react-confetti`, `date-fns`

### Project Structure

```
src/
├── app/                        # Next.js App Router
│   ├── layout.tsx              # Root layout: Montserrat font, Tolgee provider, Navigation/Footer,
│   │                           #   Vercel Analytics + Speed Insights, JSON-LD (SchemaMarkup)
│   ├── page.tsx                # Homepage
│   ├── not-found.tsx           # 404 page
│   ├── sitemap.ts, robots.ts   # Metadata routes (/sitemap.xml, /robots.txt)
│   ├── globals.css             # Tailwind layers + shadcn CSS variables (incl. .dark)
│   ├── (pages)/                # Route group: special/campaign pages (no URL segment)
│   ├── (cities)/               # Route group: city pages in MDX (+ per-city _FAQ.tsx, _Organizers.tsx)
│   ├── api/                    # Route handlers (/api/og, /api/mocked/crossweb)
│   └── about/ brand/ events/ organizers/ speakers/
│       how-to-become-an-organizer/ 30-years-of-javascript/
├── components/                 # React components (Server Components unless 'use client')
│   ├── Navigation/             # Desktop/mobile navigation parts
│   ├── ui/                     # shadcn/ui primitives
│   └── magicui/                # number-ticker
├── content/                    # Site content as typed TS data (see Content Management)
│   └── passport/               # Passport participants, attendance records, eligible cities
├── hooks/                      # useTranslatedMenuLinks (nav + footer items), useLocale, useCopyToClipboard
├── lib/
│   ├── discord.ts              # Discord widget API client
│   ├── analytics.ts            # Vercel Analytics custom events
│   ├── passport/               # Passport logic (brackets, achievements, hall of fame) + tests
│   └── utils.ts                # cn() helper
├── tolgee/                     # i18n: shared.ts, server.tsx, client.tsx, language.ts (server actions)
├── types/                      # Zod schemas (event, speaker, passport) + TS types (promo, organizer, menu)
├── utils/                      # API fetchers (getUpcomingEvents, getSpeakers), event utils, mocks, OG helper
├── env.ts                      # Environment variable validation (T3 Env)
└── setupTests.ts               # Vitest jest-dom setup

messages/{en,pl}.json           # Static translations (bundled; synced with Tolgee)
public/                         # Static assets: city/<slug>/ (covers, organizers), partners/, assets/brand/,
                                #   brand/wallpapers/, media/screenshots/, og-image.png, llms.txt
mdx-components.tsx              # Global MDX element mapping (required by @next/mdx)
scripts/                        # generate-media-screenshots.js (Puppeteer)
docs/                           # Screenshots + social-media promo campaigns
```

### Rendering & Caching Model

- No middleware/proxy, no `pages/` directory, no edge runtime, no `generateStaticParams`.
- The root layout resolves the language from cookies/headers, so **every page is server-rendered on demand** (ƒ in the build output). Only `/robots.txt`, `/sitemap.xml` and the `/discounts` OG image are prerendered at build time.
- Caching happens per `fetch` (`next: { revalidate }`, see External Integrations). `app/page.tsx` additionally sets `dynamic = 'force-dynamic'`; `experimental.staleTimes.dynamic = 30` tunes the client router cache.
- Async Server Components fetch their own data (`FeaturedEvents`, `JoinUs`, `DiscordCommunity`, `SpeakerFaces`, `EventSection`), so one render can request the same API several times; Next's fetch memoization/Data Cache (and React `cache()` for Discord) deduplicates it.
- Most route `layout.tsx` files are pass-through wrappers that only export `metadata` (client-component pages such as `/14-birthday` and `/2025-review` cannot export it themselves).

### Internationalization with Tolgee

- **Server Components**: `const t = await getTranslate()` from `@/tolgee/server`
- **Client Components**: `const { t } = useTranslate()` from `@tolgee/react`
- **Language resolution** (`src/tolgee/language.ts`): `NEXT_LOCALE` cookie → `Accept-Language` header → `en`. URLs have no locale prefix — both languages are served from the same URLs.
- **Switching**: `LanguageSwitcher` calls the `setLanguage()` server action, then reloads the page.
- **Translation keys**: namespaced by section (e.g. `navigation.menu_items.speakers`, `events_page.meta_title`)
- **Static data**: `messages/en.json`, `messages/pl.json` (always bundled; see External Integrations → Tolgee)
- **In-context editing**: hold Alt + click on text (development with a Tolgee API key)
- City MDX pages and several campaign pages contain hardcoded English copy (see the Copy column in Routes).

### Content Management

All content is plain, typed TypeScript data in `src/content/` — no CMS and no runtime validation (passport data is validated by tests):

| File                                                                    | Used by                                                                                                        |
| ----------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `events-discounts.ts`, `software-discounts.ts`, `learning-discounts.ts` | `/discounts`, homepage promo ticker, `/discounts` OG image                                                     |
| `additionalEvents.ts`                                                   | Events not on Crossweb, merged into event lists                                                                |
| `communityParticipation.ts`                                             | Homepage community section, `/community`                                                                       |
| `cities.tsx`                                                            | `CITIES` (map, nav, footer, events filter, stats, sitemap, nearest city), `UNMAPPED_CITY_PAGES` (nearest city) |
| `partners.tsx`                                                          | Homepage partners carousel                                                                                     |
| `partnerships.tsx`                                                      | `/community-partnerships` (contains JSX)                                                                       |
| `mediaItems.ts`                                                         | `/media`, screenshot script                                                                                    |
| `youtubeVideos.ts`                                                      | `/videos`                                                                                                      |
| `socialLinks.tsx`                                                       | Navigation/footer social icons (JSX icons, links use the redirect short URLs)                                  |
| `menuLinks.tsx`                                                         | Menu types only — nav/footer items live in `src/hooks/useTranslatedMenuLinks.ts`                               |
| `passport/*`                                                            | `/passport`, `/passport/[slug]`                                                                                |

Expired promos (past `expiresAt`) are filtered out at render time — separately in `src/utils/promos.ts` (homepage ticker), `filterActivePromos` in the `/discounts` page, `EventDiscountSection` (client) and the `/discounts` OG image.

### Environment Variables

| Variable                     | Required  | Defined in                                     | Purpose                                                   |
| ---------------------------- | --------- | ---------------------------------------------- | --------------------------------------------------------- |
| `EVENTS_API_URL`             | yes (URL) | `src/env.ts` (server)                          | Crossweb events API (locally: `/api/mocked/crossweb`)     |
| `SITE_URL`                   | yes (URL) | `src/env.ts` (server)                          | `metadataBase`, canonical URLs, sitemap/robots, OG images |
| `DISCORD_SERVER_ID`          | yes       | `src/env.ts` (server)                          | Discord widget                                            |
| `SPEAKERS_API_URL`           | no (URL)  | `src/env.ts` (server)                          | Crossweb speakers API                                     |
| `SPEAKERS_API_TOKEN`         | no        | `src/env.ts` (server)                          | Basic auth token for the speakers API                     |
| `NEXT_PUBLIC_TOLGEE_API_KEY` | no        | `src/tolgee/shared.ts` (`process.env`, no Zod) | Tolgee API key (development)                              |
| `NEXT_PUBLIC_TOLGEE_API_URL` | no        | `src/tolgee/shared.ts` (`process.env`, no Zod) | Tolgee API URL                                            |
| `TOLGEE_API_KEY`             | no        | Tolgee CLI only (CI)                           | Locally use `pnpm tolgee login` instead                   |

`src/env.ts` uses `@t3-oss/env-nextjs`; `NODE_ENV !== 'production'` (`src/utils/isDevelopment.ts`) enables the mock fallbacks for events and speakers.

### Styling Approach

- Tailwind CSS 3 (`tailwind.config.ts`): brand colors (`purple` #2b1932, `green` #bcd35d, `blue` #219eab), shadcn CSS variables (`globals.css`, `.dark` variant), custom animations (`marquee`, `pulse-scale`, accordion)
- shadcn/ui components in `src/components/ui/` (config: `components.json`)
- `cn()` in `src/lib/utils.ts` (`clsx` + `tailwind-merge`); older `classNames()` in `src/utils/classNames.tsx`
- No safelist: class strings stored in data (e.g. promo `gradient`) work because Tailwind's `content` globs include `src/content/**/*.{ts,tsx}` — keep full class names as string literals there
- Montserrat (`next/font/google`) is exposed as `--font-montserrat` and used as `font-sans`

### Pre-commit Hooks

- Husky `pre-commit` runs `pnpm exec lint-staged`
- lint-staged (`.lintstagedrc`) runs `prettier --write` on `*.{js,mjs,ts,tsx,css,md,json,yml,yaml}` (ESLint is not run on commit)

## Routes

### Pages

40 page routes. Copy: `i18n` = Tolgee keys, `EN` = hardcoded English.

| Route                               | Source (`src/app/…`)                        | Copy | Data / notes                                                                                                                                        |
| ----------------------------------- | ------------------------------------------- | ---- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/`                                 | `page.tsx`                                  | i18n | Promo ticker (all promos), Crossweb events (carousel + map), nearest-city geolocation, Discord widget, community items, Crossweb speakers, partners |
| `/about`                            | `about/page.tsx`                            | i18n |                                                                                                                                                     |
| `/events`                           | `events/page.tsx`                           | i18n | Crossweb upcoming + past events + `ADDITIONAL_EVENTS`; `?city=<name>` filters server-side (also `summit` = conferences, `On-line`)                  |
| `/speakers`                         | `speakers/page.tsx`                         | i18n | Crossweb speakers API                                                                                                                               |
| `/organizers`                       | `organizers/page.tsx`                       | i18n | Organizer hub (links, tools, assets)                                                                                                                |
| `/how-to-become-an-organizer`       | `how-to-become-an-organizer/page.tsx`       | i18n |                                                                                                                                                     |
| `/how-to-become-an-organizer/tools` | `how-to-become-an-organizer/tools/page.tsx` | i18n | Link to the external assets generator                                                                                                               |
| `/brand`                            | `brand/page.tsx`                            | i18n | Files from `public/assets/brand/` and `public/brand/wallpapers/`                                                                                    |
| `/30-years-of-javascript`           | `30-years-of-javascript/page.tsx`           | EN   | Own JSON-LD, scroll animations                                                                                                                      |
| `/discounts`                        | `(pages)/discounts/page.tsx`                | i18n | `*-discounts.ts`; anchors `#events`, `#software`, `#learning`; own OG image                                                                         |
| `/community`                        | `(pages)/community/page.tsx`                | i18n | All `communityParticipation.ts` items (archive)                                                                                                     |
| `/community-partnerships`           | `(pages)/community-partnerships/page.tsx`   | i18n | `content/partnerships.tsx`                                                                                                                          |
| `/media`                            | `(pages)/media/page.tsx`                    | i18n | `content/mediaItems.ts`                                                                                                                             |
| `/videos`                           | `(pages)/videos/page.tsx`                   | EN   | YouTube embeds from `content/youtubeVideos.ts`                                                                                                      |
| `/open-source`                      | `(pages)/open-source/page.tsx`              | i18n |                                                                                                                                                     |
| `/passport`                         | `(pages)/passport/page.tsx`                 | i18n | Hall of fame from `content/passport/*`                                                                                                              |
| `/passport/[slug]`                  | `(pages)/passport/[slug]/page.tsx`          | i18n | Participant progress; unknown slug → `notFound()`. The only dynamic segment in the app                                                              |
| `/jsnation-award`                   | `(pages)/jsnation-award/page.tsx`           | EN   | YouTube embed                                                                                                                                       |
| `/futureconf`                       | `(pages)/futureconf/page.tsx`               | EN   | FutureConf 2025 partnership                                                                                                                         |
| `/wdi`                              | `(pages)/wdi/page.tsx`                      | EN   | Warsaw IT Days 2026                                                                                                                                 |
| `/14-birthday`                      | `(pages)/14-birthday/page.tsx`              | EN   | Client component; `react-confetti` via `next/dynamic` (`ssr: false`)                                                                                |
| `/2025-review`                      | `(pages)/2025-review/page.tsx`              | EN   | Client component                                                                                                                                    |

City pages — `(cities)/<slug>/page.mdx`, wrapped by `(cities)/layout.tsx`, hardcoded English copy:

- **Full (10)**: `/bialystok`, `/bielsko-biala`, `/gdansk`, `/katowice`, `/krakow`, `/lodz`, `/lublin`, `/poznan`, `/warszawa`, `/wroclaw` — `CityBanner`, `EventSection` (Crossweb events for the city), `LocalGroups`, `FAQ` (`_FAQ.tsx`), `Organizers` (`_Organizers.tsx`), `CityEmail` (subset varies per city); OG image via `/api/og?city=…`; `/warszawa` also embeds a LinkedIn post
- **Placeholder (8)**: `/gliwice`, `/kielce`, `/olsztyn`, `/opole`, `/rzeszow`, `/szczecin`, `/torun`, `/zielona-gora` — static "looking for organizers" text

Also: `not-found.tsx` renders the 404 page. The navigation lists `/team` and `/sponsors` as `disabled: true` items — those routes do not exist.

### Redirects

Defined in `next.config.ts` (`permanent: true` → HTTP 308):

- `/facebook`, `/instagram`, `/instagram-bialystok`, `/instagram-poznan`, `/instagram-wroclaw`, `/linkedin`, `/x`, `/discord`, `/github`, `/youtube` → external social profiles (these short URLs are what `content/socialLinks.tsx` links to)
- `/promos` → `/discounts`

### Endpoints

- **`GET /api/og?city=<name>`** — `src/app/api/og/route.tsx`. 1200×630 PNG via `next/og` `ImageResponse`: city name over `${SITE_URL}/assets/og-image-city.png` (fetched over HTTP at render time). `city` defaults to "Poland", max 100 chars. Used by the full city pages' metadata.
- **`GET /api/mocked/crossweb`** (`?old=1` for past events) — `src/app/api/mocked/crossweb/route.ts`. Mock of the Crossweb events API (dates relative to now); default `EVENTS_API_URL` in `.env.example`. Not env-guarded — also deployed in production.
- **`GET /discounts/opengraph-image-<hash>`** — `src/app/(pages)/discounts/opengraph-image.tsx`. `/discounts` OG image with the active-deals count; prerendered at build time, so the count reflects the last deploy.
- **`GET /sitemap.xml`** — `src/app/sitemap.ts`. Hand-maintained main pages + `CITIES` (`lastModified` = build date). Not listed: `/speakers`, `/passport`, `/community`, `/open-source`, `/futureconf`, `/wdi`, `/14-birthday`, `/2025-review`, `/how-to-become-an-organizer/tools`, `UNMAPPED_CITY_PAGES`.
- **`GET /robots.txt`** — `src/app/robots.ts`. Allows all agents (explicit rules for GPTBot, Anthropic-AI, CCBot, Google-Extended, Bingbot); links the sitemap.
- **Server Action `setLanguage(locale)`** — `src/tolgee/language.ts` (`'use server'`). Sets the `NEXT_LOCALE` cookie; called by `LanguageSwitcher`, followed by a full page reload.

Files in `public/` are served from the site root (e.g. `/llms.txt`, `/og-image.png`, `/logo.svg`).

## External Integrations

### Server-side APIs (called from Server Components)

**Crossweb – events** (`src/utils/getUpcomingEvents.ts`, `getPastEvents()` in `src/app/events/page.tsx`)

- Requests: `GET {EVENTS_API_URL}` (upcoming), `GET {EVENTS_API_URL}?old=1` (past); no auth; `revalidate: 86400` (24 h)
- Validation: `EventsSchema` (`src/types/event.ts`). Fallback on HTTP error or invalid payload: dev → `src/utils/eventsMock.ts`; prod → no events
- Consumers: homepage `FeaturedEvents` + `JoinUs`, `/events`, `EventSection` on city pages
- Payload: object keyed by string ids (`Record<string, Event> | null`); `date` is `DD.MM.YYYY`, `time` is `HH:MM` or `HH:MM-HH:MM`; `type` ∈ `Spotkanie | Konferencja | Meetup | Conference | Webinar | Warsztaty`.
- `changeCityName` (`src/utils/changeCityName.tsx`) maps Crossweb city names (`Bielsko Biała` → `Bielsko-Biała`, `Trójmiasto` → `Gdańsk`).
- Merged with static `ADDITIONAL_EVENTS` on `/events`, city pages and the homepage map (`JoinUs`) — not in the homepage carousel (`FeaturedEvents`).
- `filterUpcomingEvents` (`src/utils/eventUtils.ts`) keeps today → +6 months, in-progress events first; past events are sorted newest first.
- `EventSection` matches `event.city` against its `city` prop exactly (Polish names with diacritics).
- The production `EVENTS_API_URL` is configured in the hosting environment, not in the repo.

**Crossweb – speakers** (`src/utils/getSpeakers.ts`)

- Request: `GET {SPEAKERS_API_URL}` with `Authorization: Basic {SPEAKERS_API_TOKEN}` (both env vars optional); `revalidate: 3600` (1 h)
- Validation: `SpeakersSchema` (`src/types/speaker.ts`). Fallback on missing config, HTTP error or invalid payload: dev → `src/utils/speakersMock.ts`; prod → `[]` (sections hide)
- Consumers: `/speakers`, homepage `SpeakerFaces` (up to 60 avatars); images come from `crossweb.pl` through `next/image`

**Discord guild widget** (`src/lib/discord.ts`)

- Request: `GET https://discord.com/api/guilds/{DISCORD_SERVER_ID}/widget.json` (public, the server widget must be enabled); `revalidate: 3600` + React `cache()`
- No runtime validation (TS interface only). Fallback: `null` → placeholder text
- Consumer: homepage `JoinUs` → `DiscordCommunity` → `DiscordWidget` (server name, online count from `presence_count`, invite link)

### Tolgee (i18n service)

- `src/tolgee/shared.ts` configures `@tolgee/web` with `NEXT_PUBLIC_TOLGEE_API_URL` (https://app.tolgee.io) and `NEXT_PUBLIC_TOLGEE_API_KEY`, `FormatSimple`, `DevTools`, and `staticData` from `messages/{en,pl}.json`. Used on both server (`createServerInstance`) and client (`TolgeeProvider`).
- With an API key in development, translations load live from Tolgee and in-context editing works. `DevTools` is a no-op in `@tolgee/web`'s production build, so production renders the bundled `messages/*.json`. `NEXT_PUBLIC_*` values are inlined into the client bundle.
- CLI (`.tolgeerc`): project `20172`, format `JSON_TOLGEE`, keys extracted from `./src/**/*.ts?(x)`, push `en` only, pull into `./messages`.

### Client-side Services and Embeds

- **Vercel Analytics** (`<Analytics />` in the root layout; custom event `click_discord_invite` via `trackClientEvent` in `src/lib/analytics.ts`) and **Vercel Speed Insights** — the site is hosted on Vercel (no `vercel.json` in the repo).
- **YouTube** iframes (`youtube.com/embed/…`): `/videos`, `/jsnation-award`.
- **LinkedIn** post iframe: `/warszawa`.
- **Browser Geolocation** (`<geolocation>` element with `navigator.geolocation` fallback) in `NearestCity`; the nearest city is computed locally from `CITIES[].geo` + `UNMAPPED_CITY_PAGES` (no geocoding API).
- **Remote images** via `next/image` must match `images.remotePatterns` in `next.config.ts` (Crossweb, GitHub avatars, LinkedIn media, partner/conference sites).
- **Google Fonts**: Montserrat via `next/font/google` (downloaded at build time and self-hosted).
- **JSON-LD** structured data: `SchemaMarkup` (root layout) and `/30-years-of-javascript`.

### Tooling Only (not part of the runtime)

- `scripts/generate-media-screenshots.js` — Puppeteer visits every `mediaItems` URL.
- `docs/social-media/*/generate-graphics.mjs` — downloads fonts from Google Fonts into `.fonts/`.
- Tolgee CLI (`pnpm tolgee:*`).

## Next.js-Specific APIs in Use

Framework-coupled code to account for when porting away from Next.js:

- **Routing conventions**: route groups `(pages)`/`(cities)`, private `_`-prefixed files (`_FAQ.tsx`, `_Organizers.tsx`, `_presentation.tsx`, `_icons/`), metadata-only `layout.tsx` files, `not-found.tsx`
- **Metadata API**: `metadata` / `generateMetadata` (titles translated with Tolgee), `metadataBase`, `sitemap.ts`, `robots.ts`, `opengraph-image.tsx`
- **`next/og` `ImageResponse`** (satori): `/api/og`, `/discounts/opengraph-image`
- **MDX pages** via `@next/mdx` (`pageExtensions` includes `md`/`mdx`, `mdx-components.tsx`); MDX files `export const metadata` and import React components via relative paths
- **Server Components** with data fetching, **Server Actions** (`src/tolgee/language.ts`), `next/headers` (`cookies()`, `headers()`)
- **Caching**: `fetch(…, { next: { revalidate } })`, `export const dynamic`, `experimental.staleTimes`, React `cache()`
- **`next/image`** (`remotePatterns`, `minimumCacheTTL` 31 days, `qualities: [75]`), **`next/font/google`**, **`next/link`** with typed routes (`typedRoutes: true`, `as Route` casts), **`next/dynamic`** (`ssr: false`), **`next/navigation`** (`useRouter().refresh()`, `notFound()`)
- **Config**: `redirects()` in `next.config.ts`, `@t3-oss/env-nextjs` + `experimental.typedEnv`, `reactCompiler`
- **React-only packages**: `@tolgee/react`, shadcn/ui (Radix), `@headlessui/react`, `embla-carousel-react`, `motion`, `react-icons`, `lucide-react`, `react-confetti`, `@vercel/analytics/react`, `@vercel/speed-insights/next`
- **JSX inside data files**: `src/content/partnerships.tsx`, `src/content/socialLinks.tsx`, `(cities)/*/_FAQ.tsx`

## Important Development Notes

### Security

- `ignore-scripts=true` in `.npmrc`; `allowBuilds` in `pnpm-workspace.yaml` blocks dependency build scripts
- `@lavamoat/preinstall-always-fail` fails the install if lifecycle scripts run anyway
- Socket.dev warnings enabled on PRs

### React Compiler

- Enabled globally: `reactCompiler: true` in `next.config.ts` (`babel-plugin-react-compiler` 1.0) in the default `infer` mode — components and hooks are memoized automatically, no `"use memo"` directives needed (opt out with `"use no memo"`)

### Node Version

- Node 24 (`engines.node: 24.x`, `.nvmrc`: 24.9.0)
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

To generate graphics, write a Node script using `@vercel/og` (satori) bundled with Next.js —
do NOT hand-position elements in raw SVG:

```js
const { ImageResponse } =
  await import('next/dist/compiled/@vercel/og/index.node.js');
```

Key conventions:

- **Layout**: flexbox via satori element trees (plain objects `{ type, props: { style, children } }`, no JSX needed)
- **Fonts**: Montserrat (brand font, weights 500/800) + JetBrains Mono for discount codes; fetch from Google Fonts and cache in `.fonts/` (gitignored)
- **Brand colors**: purple `#2b1932`, green `#bcd25f`, blue `#239eab`, card `#241329`
- **Brand style**: reuse the "ticket" motif from `src/app/(pages)/discounts/opengraph-image.tsx` (rotated card, gradient border, dashed perforation, code pill). Avoid fake cut-out notches — satori has no masking, they clash with gradient backgrounds
- **Formats**: LinkedIn/Facebook 1200×630, IG feed 1080×1080, IG story 1080×1920 (keep content within ~250px top / 280px bottom safe zone)
- **Assets**: inline images as base64 data URIs (satori fetches remote `<img>` at render time)
- Run: `node docs/social-media/<campaign>/generate-graphics.mjs`, output PNGs to `graphics/`

### Adding New Cities

1. Add the city to `CITIES` in `src/content/cities.tsx` (`geo` coordinates, map `pointPosition`/`textPosition`, `status`: `'active'`, `'paused'`, `'coming-soon'` or `'new'`) — or to `UNMAPPED_CITY_PAGES` if it should not appear on the map
2. Create `src/app/(cities)/<slug>/page.mdx` (copy a full or placeholder city page); put cover and organizer photos in `public/city/<slug>/`
3. Pass the exact Crossweb city name to `<EventSection city="…" />` (extend `changeCityName` if Crossweb spells it differently)
4. `sitemap.ts` only includes `CITIES`; for passport eligibility also add the city to `src/content/passport/eligibleCities.ts`

### Working with Translations

- Always add translation keys to both `messages/en.json` and `messages/pl.json`
- Use descriptive, namespaced keys (e.g., `hero.title`, not just `title`)
- Server components: `const t = await getTranslate(); t('key')`
- Client components: `const { t } = useTranslate(); t('key')`

### Testing Components

- Tests use Vitest with React Testing Library (`jsdom` environment, globals enabled)
- Configuration in `vitest.config.ts`
- Setup file: `src/setupTests.ts` for jest-dom matchers
- Property-based tests use `fast-check` (arbitraries in `src/lib/passport/testing/`)
- Path alias `@/` resolves to `src/`

### Remote Image Domains

When using external images, add the domain to `next.config.ts` under `images.remotePatterns`.
