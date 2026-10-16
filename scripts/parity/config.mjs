// Route inventory and capture settings for the parity tooling.
// Keep in sync with the "Routes" section of CLAUDE.md.

/** Canonical production origin; absolute URLs on it are normalized to `{SITE}`. */
export const SITE_ORIGIN = 'https://meetjs.pl';

export const LOCALES = ['en', 'pl'];

export const ACCEPT_LANGUAGE = {
  en: 'en-US,en;q=0.9',
  pl: 'pl-PL,pl;q=0.9',
};

export const VIEWPORTS = {
  desktop: { width: 1440, height: 900, deviceScaleFactor: 1 },
  mobile: {
    width: 390,
    height: 844,
    deviceScaleFactor: 1,
    isMobile: true,
    hasTouch: true,
  },
};

export const TIMEZONE = 'Europe/Warsaw';

/** Screenshots are clipped to this height (Chrome cannot capture taller pages reliably). */
export const MAX_SCREENSHOT_HEIGHT = 16_000;

/** Visual thresholds used by compare.mjs. */
export const VISUAL = {
  pixelThreshold: 0.1, // pixelmatch per-pixel color distance (0–1)
  maxMismatchPercent: 0.5, // full page / block passes at or below this
  maxHeightDeltaPx: 4,
};

/**
 * Regions excluded from pixel comparison. Each snapshot stores the rectangles
 * of every mask; compare.mjs paints the enabled categories on both images.
 *
 * Categories:
 *  - motion: moves on its own (autoplay carousel, random content)
 *  - embed: third-party iframes (YouTube, LinkedIn)
 *  - data: rendered from live external data (Crossweb events/speakers,
 *    Discord); comparable only when both sides use the same data source
 */
export const MASKS = {
  partnersCarousel: {
    category: 'motion',
    selector: 'section.bg-purple.p-12 [aria-roledescription="carousel"]',
  },
  iframes: { category: 'embed', selector: 'iframe' },
  discordWidget: {
    category: 'data',
    selector: '#joinus [class*="from-[#2f3136]"]',
  },
  homeEventsCarousel: {
    category: 'data',
    selector: '#events [aria-roledescription="carousel"]',
  },
  homeMap: { category: 'data', selector: '#joinus svg' },
  speakerFaces: {
    category: 'data',
    selector: 'main section:has(a[href="/speakers"])',
  },
  cityEvents: {
    category: 'data',
    selector: 'main section.gap-12.pt-12',
  },
};

/** Elements hidden (visibility: hidden) before screenshots on both sides. */
export const HIDE = {
  confetti: 'canvas',
};

/**
 * Random text replaced with a fixed string on both sides before the content
 * is read and the screenshots are taken (a mask cannot hide a different
 * line count).
 */
export const RANDOM_TEXT = {
  prediction2026: {
    selector: 'p.italic.text-white',
    text: '“A fixed prediction used for the comparison”',
  },
};

const page = (path, options = {}) => ({ path, ...options });

const FULL_CITY_PAGES = [
  'bialystok',
  'bielsko-biala',
  'gdansk',
  'katowice',
  'krakow',
  'lodz',
  'lublin',
  'poznan',
  'warszawa',
  'wroclaw',
];

const PLACEHOLDER_CITY_PAGES = [
  'gliwice',
  'kielce',
  'olsztyn',
  'opole',
  'rzeszow',
  'szczecin',
  'torun',
  'zielona-gora',
];

/**
 * All page routes. `data` lists the live data sources a page renders — such
 * pages are reported as informational when the two snapshots use different
 * data sources (e.g. production vs fixtures).
 */
export const PAGES = [
  page('/', {
    data: ['events', 'speakers', 'discord'],
    masks: [
      'partnersCarousel',
      'discordWidget',
      'homeEventsCarousel',
      'homeMap',
      'speakerFaces',
    ],
  }),
  page('/about'),
  page('/events', { data: ['events'] }),
  page('/events?city=summit', { data: ['events'] }),
  page('/speakers', { data: ['speakers'] }),
  page('/organizers'),
  page('/how-to-become-an-organizer'),
  page('/how-to-become-an-organizer/tools'),
  page('/brand'),
  page('/30-years-of-javascript'),
  page('/discounts'),
  page('/community'),
  page('/community-partnerships'),
  page('/media'),
  page('/videos', { masks: ['iframes'] }),
  page('/open-source'),
  page('/passport'),
  page('/passport/adrian-romanski'),
  page('/passport/michal-hadrysiak'),
  page('/jsnation-award', { masks: ['iframes'] }),
  page('/futureconf'),
  page('/wdi'),
  page('/14-birthday', { hide: ['confetti'] }),
  page('/2025-review', { randomText: ['prediction2026'] }),
  ...FULL_CITY_PAGES.map((slug) =>
    page(`/${slug}`, {
      data: ['events'],
      masks: ['cityEvents', 'iframes'],
    }),
  ),
  ...PLACEHOLDER_CITY_PAGES.map((slug) => page(`/${slug}`)),
];

export const REDIRECTS = [
  ['/facebook', 'https://www.facebook.com/meetjspl'],
  ['/instagram', 'https://www.instagram.com/meet.js_poland'],
  ['/instagram-bialystok', 'https://www.instagram.com/meet.js_bialystok'],
  ['/instagram-poznan', 'https://www.instagram.com/meet.js_poznan'],
  ['/instagram-wroclaw', 'https://www.instagram.com/meetjs_wroclaw'],
  ['/linkedin', 'https://www.linkedin.com/company/meetjs'],
  ['/x', 'https://x.com/meetjs'],
  ['/discord', 'https://discord.gg/8r9XKTeNW8'],
  ['/github', 'https://github.com/meetjspl'],
  ['/youtube', 'https://www.youtube.com/@meetjs'],
  ['/promos', '/discounts'],
].map(([path, location]) => ({ path, location }));

/** Paths that must return 404. */
export const NOT_FOUND = [
  '/__parity-missing__',
  '/passport/__parity-missing__',
  '/city/wroclaw',
  '/team',
];

/** Files served from `public/` or metadata routes, compared by content. */
export const STATIC_FILES = [
  { path: '/robots.txt', compare: 'text' },
  { path: '/sitemap.xml', compare: 'sitemap' },
  { path: '/llms.txt', compare: 'text' },
  { path: '/favicon.ico', compare: 'hash' },
  { path: '/og-image.png', compare: 'hash' },
  { path: '/logo.svg', compare: 'hash' },
  { path: '/christmas_logo.svg', compare: 'hash' },
  { path: '/conference.jpg', compare: 'hash' },
  { path: '/assets/og-image-city.png', compare: 'hash' },
  {
    path: '/assets/brand/logo/light-default/meetjs_logo_color_light.svg',
    compare: 'hash',
  },
  { path: '/brand/wallpapers/meetjs-wallpaper-1920x1080.png', compare: 'hash' },
  { path: '/city/warszawa/cover.jpg', compare: 'hash' },
];

/** Endpoints checked over HTTP (`image` responses are also pixel-compared). */
export const ENDPOINTS = [
  { path: '/api/mocked/crossweb', compare: 'status' },
  { path: '/api/og?city=Warszawa', compare: 'image' },
  { path: '/api/og', compare: 'image' },
];

/** Requests whose failure is expected outside Vercel (analytics, insights). */
export const IGNORED_FAILED_REQUESTS = [/\/_vercel\//];

/** File-system friendly id of a route, e.g. `/events?city=summit` → `events_city_summit`. */
export const routeId = (path) =>
  path === '/'
    ? 'home'
    : path
        .replace(/^\//, '')
        .replace(/[^a-z0-9]+/gi, '_')
        .replace(/_+$/, '');
