import type { MaybeRefOrGetter } from 'vue';

export interface MetaImage {
  url: string;
  width?: number;
  height?: number;
  alt?: string;
  type?: string;
}

export interface OpenGraphMetadata {
  title?: string;
  description?: string;
  url?: string;
  siteName?: string;
  locale?: string;
  type?: string;
  images?: MetaImage[];
}

export interface TwitterMetadata {
  card?: string;
  site?: string;
  creator?: string;
  title?: string;
  description?: string;
  images?: MetaImage[];
}

/**
 * Page metadata with the semantics of the Next.js Metadata API used by the
 * previous version of the site: top-level fields override the root defaults
 * shallowly, so a page that sets `openGraph` replaces the whole object.
 */
export interface PageMetadata {
  title?: string;
  description?: string;
  keywords?: string | string[];
  canonical?: string;
  openGraph?: OpenGraphMetadata;
  twitter?: TwitterMetadata;
  /** Additional robots directive, e.g. `noindex` for error pages. */
  robots?: string;
}

export const SITE_TITLE = 'meet.js - JavaScript Meetups in Poland';
export const SITE_DESCRIPTION =
  'Join the largest JavaScript community in Poland. Regular meetups, expert talks, networking opportunities and knowledge sharing.';

/** Default OG image used by most pages (absolute URL on production). */
export const DEFAULT_OG_IMAGE: MetaImage = {
  url: 'https://meetjs.pl/og-image.png',
  width: 1200,
  height: 630,
};

/** Root metadata from the former src/app/layout.tsx. */
export const rootMetadata = (
  siteUrl: string,
): Required<Omit<PageMetadata, 'robots'>> => {
  const image = {
    url: `${siteUrl}/og-image.png`,
    width: 1200,
    height: 630,
    alt: 'meet.js | JavaScript meetups in Poland',
  };
  return {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    keywords: [
      'JavaScript',
      'meetup',
      'Poland',
      'programming',
      'web development',
      'tech events',
    ],
    canonical: siteUrl,
    openGraph: {
      title: SITE_TITLE,
      description: SITE_DESCRIPTION,
      type: 'website',
      locale: 'en_US',
      url: siteUrl,
      siteName: 'meet.js',
      images: [{ ...image, type: 'image/png' }],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@meetjs',
      creator: '@meetjs',
      title: SITE_TITLE,
      description: SITE_DESCRIPTION,
      images: [image],
    },
  };
};

type MetaTag =
  | { name: string; content: string; key?: string }
  | { property: string; content: string; key?: string };

const imageTags = (
  prefix: string,
  image: MetaImage,
  attribute: 'property' | 'name',
) => {
  const tag = (key: string, content: string | number | undefined) =>
    content === undefined
      ? []
      : [
          {
            [attribute]: `${prefix}${key}`,
            content: String(content),
          } as MetaTag,
        ];
  return attribute === 'property'
    ? [
        ...tag('', image.url),
        ...tag(':type', image.type),
        ...tag(':width', image.width),
        ...tag(':height', image.height),
        ...tag(':alt', image.alt),
      ]
    : [
        ...tag('', image.url),
        ...tag(':alt', image.alt),
        ...tag(':width', image.width),
        ...tag(':height', image.height),
      ];
};

/** Resolves page metadata against the root defaults and emits head tags. */
export const resolveMetaTags = (page: PageMetadata, siteUrl: string) => {
  const metadata = { ...rootMetadata(siteUrl), ...page };
  const meta: MetaTag[] = [];
  const add = (tag: MetaTag | null) => {
    if (tag && tag.content !== undefined && tag.content !== '') meta.push(tag);
  };

  add(
    metadata.description
      ? { name: 'description', content: metadata.description }
      : null,
  );
  add(
    metadata.keywords
      ? {
          name: 'keywords',
          content: Array.isArray(metadata.keywords)
            ? metadata.keywords.join(',')
            : metadata.keywords,
        }
      : null,
  );
  if (page.robots) {
    meta.push({ name: 'robots', content: page.robots, key: 'robots-page' });
  }

  const og = metadata.openGraph;
  if (og) {
    const property = (key: string, content?: string) =>
      add(content ? { property: `og:${key}`, content } : null);
    property('title', og.title);
    property('description', og.description);
    property('url', og.url);
    property('site_name', og.siteName);
    property('locale', og.locale);
    for (const image of og.images ?? []) {
      meta.push(...imageTags('og:image', image, 'property'));
    }
    property('type', og.type);
  }

  const twitter = metadata.twitter;
  if (twitter) {
    const name = (key: string, content?: string) =>
      add(content ? { name: `twitter:${key}`, content } : null);
    name('card', twitter.card);
    name('site', twitter.site);
    name('creator', twitter.creator);
    name('title', twitter.title);
    name('description', twitter.description);
    for (const image of twitter.images ?? []) {
      meta.push(...imageTags('twitter:image', image, 'name'));
    }
  }

  return {
    title: metadata.title,
    meta,
    link: metadata.canonical
      ? [{ rel: 'canonical' as const, href: metadata.canonical }]
      : [],
  };
};

/**
 * Sets the page title, description, canonical URL, Open Graph and Twitter
 * tags. Call it once per page; the getter form keeps translated values
 * reactive when the language changes.
 */
export const useSiteMeta = (input: MaybeRefOrGetter<PageMetadata> = {}) => {
  const siteUrl = useRuntimeConfig().public.siteUrl;
  useHead(() => resolveMetaTags(toValue(input), siteUrl));
};

/** Absolute URL on the configured site origin. */
export const useSiteUrl = () => {
  const siteUrl = useRuntimeConfig().public.siteUrl;
  return (path = '') => `${siteUrl}${path}`;
};
