import { describe, expect, it } from 'vitest';
import { resolveMetaTags } from './useSiteMeta';

const SITE = 'https://meetjs.pl';

const content = (
  tags: ReturnType<typeof resolveMetaTags>,
  key: string,
): string[] =>
  tags.meta
    .filter((tag) => ('name' in tag ? tag.name : tag.property) === key)
    .map((tag) => tag.content);

describe('resolveMetaTags', () => {
  it('uses the root metadata by default', () => {
    const tags = resolveMetaTags({}, SITE);

    expect(tags.title).toBe('meet.js - JavaScript Meetups in Poland');
    expect(tags.link).toEqual([{ rel: 'canonical', href: SITE }]);
    expect(content(tags, 'keywords')).toEqual([
      'JavaScript,meetup,Poland,programming,web development,tech events',
    ]);
    expect(content(tags, 'og:image')).toEqual([`${SITE}/og-image.png`]);
    expect(content(tags, 'og:image:type')).toEqual(['image/png']);
    expect(content(tags, 'twitter:site')).toEqual(['@meetjs']);
  });

  it('replaces nested objects like Next.js (shallow merge)', () => {
    const tags = resolveMetaTags(
      {
        title: 'Page | meet.js',
        openGraph: { title: 'Page', type: 'website' },
      },
      SITE,
    );

    expect(tags.title).toBe('Page | meet.js');
    expect(content(tags, 'og:title')).toEqual(['Page']);
    // Not inherited from the root openGraph
    expect(content(tags, 'og:image')).toEqual([]);
    expect(content(tags, 'og:url')).toEqual([]);
    // Inherited: twitter and canonical were not overridden
    expect(content(tags, 'twitter:title')).toEqual([
      'meet.js - JavaScript Meetups in Poland',
    ]);
    expect(tags.link).toEqual([{ rel: 'canonical', href: SITE }]);
  });

  it('emits Open Graph tags in the Next.js order', () => {
    const tags = resolveMetaTags(
      {
        openGraph: {
          type: 'website',
          title: 'Title',
          url: `${SITE}/page`,
          images: [{ url: `${SITE}/image.png`, width: 1200, height: 630 }],
        },
      },
      SITE,
    );

    expect(
      tags.meta
        .map((tag) => ('property' in tag ? tag.property : ''))
        .filter((property) => property.startsWith('og:')),
    ).toEqual([
      'og:title',
      'og:url',
      'og:image',
      'og:image:width',
      'og:image:height',
      'og:type',
    ]);
  });

  it('adds a page robots directive next to the root one', () => {
    const tags = resolveMetaTags({ robots: 'noindex' }, SITE);

    expect(tags.meta).toContainEqual({
      name: 'robots',
      content: 'noindex',
      key: 'robots-page',
    });
  });
});
