import { fileURLToPath } from 'node:url';
import Icons from 'unplugin-icons/nuxt';
import { IMAGE_WIDTHS } from './app/utils/images';

const REDIRECTS: Record<string, string> = {
  '/facebook': 'https://www.facebook.com/meetjspl',
  '/instagram': 'https://www.instagram.com/meet.js_poland',
  '/instagram-bialystok': 'https://www.instagram.com/meet.js_bialystok',
  '/instagram-poznan': 'https://www.instagram.com/meet.js_poznan',
  '/instagram-wroclaw': 'https://www.instagram.com/meetjs_wroclaw',
  '/linkedin': 'https://www.linkedin.com/company/meetjs',
  '/x': 'https://x.com/meetjs',
  '/discord': 'https://discord.gg/8r9XKTeNW8',
  '/github': 'https://github.com/meetjspl',
  '/youtube': 'https://www.youtube.com/@meetjs',
  '/promos': '/discounts',
};

export default defineNuxtConfig({
  compatibilityDate: '2026-10-01',

  modules: [
    // Font Awesome icons as compile-time SVG components (`~icons/fa6-solid/…`),
    // sized 1em like react-icons.
    [
      Icons,
      {
        scale: 1,
        // react-icons renders every icon in a 1em × 1em box
        iconCustomizer: (
          _collection: string,
          _icon: string,
          props: Record<string, string>,
        ) => {
          props.width = '1em';
          props.height = '1em';
        },
      },
    ],
    '@nuxt/image',
    '@nuxt/fonts',
    '@nuxt/eslint',
    '@vercel/analytics/nuxt',
    '@vercel/speed-insights/nuxt',
  ],

  devtools: { enabled: true },

  css: ['~/assets/css/main.css'],

  postcss: {
    plugins: {
      tailwindcss: {},
    },
  },

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    },
  },

  // Server-only values are read at runtime from the existing variable names
  // (see server/utils/env.ts); `NUXT_*` variables override these defaults.
  runtimeConfig: {
    // `lastmod` of every sitemap entry (the sitemap used to be generated at
    // build time).
    buildDate: new Date().toISOString().split('T')[0],
    eventsApiUrl: '',
    discordServerId: '',
    speakersApiUrl: '',
    speakersApiToken: '',
    public: {
      siteUrl: process.env.SITE_URL ?? '',
      // Tolgee in-context editing is development-only; production renders
      // the bundled messages/*.json, so the key never reaches production.
      tolgeeApiKey:
        process.env.NODE_ENV === 'production'
          ? ''
          : (process.env.NEXT_PUBLIC_TOLGEE_API_KEY ?? ''),
      tolgeeApiUrl: process.env.NEXT_PUBLIC_TOLGEE_API_URL ?? '',
    },
  },

  routeRules: Object.fromEntries(
    Object.entries(REDIRECTS).map(([path, to]) => [
      path,
      { redirect: { to, statusCode: 308 } },
    ]),
  ),

  vue: {
    compilerOptions: {
      // Experimental HTML element used by NearestCity.vue
      isCustomElement: (tag) => tag === 'geolocation',
    },
  },

  experimental: {
    typedPages: true,
  },

  nitro: {
    // Shared across Vercel functions; memory elsewhere.
    storage: process.env.VERCEL
      ? { cache: { driver: 'vercel-runtime-cache' } }
      : {},
    // The logo is inlined into OG images (satori fetches <img> URLs).
    serverAssets: [
      {
        baseName: 'og',
        dir: fileURLToPath(new URL('./public', import.meta.url)),
        pattern: 'logo.svg',
      },
    ],
  },

  typescript: {
    strict: true,
    // jest-dom matchers for the component tests in app/
    tsConfig: { include: ['../src/setupTests.ts'] },
  },

  image: {
    quality: 75,
    format: ['webp'],
    screens: Object.fromEntries(
      IMAGE_WIDTHS.map((width) => [`w${width}`, width]),
    ),
    domains: [
      'avatars.githubusercontent.com',
      'media.licdn.com',
      'futureconf.tech',
      'piccalil.li',
      'aiminers.pl',
      'ng-poland.pl',
      'js-poland.pl',
      'ai-poland.pl',
      'assets.devographics.com',
      'conf.react.dev',
      'survey.stateofreactnative.com',
      'nextjs.org',
      'github.githubassets.com',
      'www.uczmnie.pl',
      'cdn.prod.website-files.com',
      'adventofcode.com',
      'crossweb.pl',
      'dzienprogramisty.pl',
      'thehacksummit.com',
    ],
    // Rotate photos by their EXIF orientation like the Next.js and Vercel
    // optimizers do (e.g. public/IMG_0093.JPG on /14-birthday).
    ipx: {
      sharpOptions: { autoOrient: true },
    },
    vercel: {
      minimumCacheTTL: 2_678_400, // 31 days - images rarely change
      formats: ['image/webp'],
    },
  },

  fonts: {
    families: [
      {
        name: 'Montserrat',
        provider: 'google',
        weights: ['100 900'],
        styles: ['normal'],
        subsets: [
          'cyrillic-ext',
          'cyrillic',
          'vietnamese',
          'latin-ext',
          'latin',
        ],
        global: true,
      },
    ],
  },
});
