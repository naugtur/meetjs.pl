import { CITIES } from '~~/src/content/cities';

type ChangeFrequency = 'daily' | 'weekly' | 'monthly';

const MAIN_PAGES: [path: string, ChangeFrequency, priority: number][] = [
  ['', 'weekly', 1],
  ['/about', 'monthly', 0.8],
  ['/events', 'daily', 0.9],
  ['/videos', 'weekly', 0.8],
  ['/discounts', 'weekly', 0.8],
  ['/30-years-of-javascript', 'monthly', 0.6],
  ['/how-to-become-an-organizer', 'monthly', 0.6],
  ['/brand', 'monthly', 0.5],
  ['/jsnation-award', 'monthly', 0.6],
  ['/community-partnerships', 'monthly', 0.7],
  ['/media', 'monthly', 0.7],
  ['/organizers', 'monthly', 0.7],
];

// Same entries and format as the former src/app/sitemap.ts
export default defineEventHandler((event) => {
  const { SITE_URL } = useServerEnv();
  const { buildDate } = useRuntimeConfig(event);

  const pages = [
    ...MAIN_PAGES,
    ...CITIES.map(
      (city) => [city.href, 'monthly', 0.8] as (typeof MAIN_PAGES)[number],
    ),
  ];
  const urls = pages.map(
    ([path, changeFrequency, priority]) =>
      `<url>\n<loc>${SITE_URL}${path}</loc>\n<lastmod>${buildDate}</lastmod>\n<changefreq>${changeFrequency}</changefreq>\n<priority>${priority}</priority>\n</url>\n`,
  );

  setHeader(event, 'content-type', 'application/xml');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('')}</urlset>\n`;
});
