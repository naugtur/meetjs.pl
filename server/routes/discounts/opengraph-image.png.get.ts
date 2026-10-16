import { ImageResponse } from '@vercel/og';
import { eventsDiscounts } from '~~/src/content/events-discounts';
import { learningDiscounts } from '~~/src/content/learning-discounts';
import { softwareDiscounts } from '~~/src/content/software-discounts';
import type { Promo } from '~~/src/types/promo';

const countActivePromos = (promos: Promo[]): number => {
  const now = new Date();
  return promos.filter((promo) => new Date(promo.expiresAt) >= now).length;
};

const percentSign = (style: Record<string, unknown>) =>
  ogNode(
    'div',
    {
      style: {
        position: 'absolute',
        fontWeight: 700,
        color: 'rgba(255, 255, 255, 0.04)',
        ...style,
      },
    },
    '%',
  );

const perforationHole = (side: 'left' | 'right') =>
  ogNode('div', {
    style: {
      position: 'absolute',
      [side]: -18,
      top: 262,
      width: 32,
      height: 32,
      borderRadius: 999,
      backgroundColor: '#2b1932',
    },
  });

const discountsImage = (activeDeals: number, logo: string) =>
  ogNode(
    'div',
    {
      style: {
        width: '100%',
        height: '100%',
        display: 'flex',
        backgroundColor: '#2b1932',
        backgroundImage:
          'radial-gradient(circle at 85% 15%, rgba(35, 158, 171, 0.4), transparent 50%), radial-gradient(circle at 5% 95%, rgba(188, 210, 95, 0.3), transparent 45%)',
        fontFamily: 'sans-serif',
        position: 'relative',
      },
    },
    // Decorative percent signs
    percentSign({ top: -40, right: 340, fontSize: 220 }),
    percentSign({ bottom: -60, left: 420, fontSize: 280 }),

    // Left column
    ogNode(
      'div',
      {
        style: {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px 0 64px 72px',
          width: 720,
        },
      },
      // Logo
      ogNode(
        'div',
        { style: { display: 'flex' } },
        ogNode('img', { src: logo, width: 240, height: 67, alt: '' }),
      ),

      // Headline
      ogNode(
        'div',
        { style: { display: 'flex', flexDirection: 'column' } },
        ogNode(
          'span',
          {
            style: {
              fontSize: 84,
              fontWeight: 700,
              color: '#ffffff',
              lineHeight: 1.05,
            },
          },
          'Exclusive',
        ),
        ogNode(
          'span',
          {
            style: {
              fontSize: 84,
              fontWeight: 700,
              lineHeight: 1.05,
              backgroundImage: 'linear-gradient(90deg, #bcd25f, #239eab)',
              backgroundClip: 'text',
              color: 'transparent',
            },
          },
          'Discounts',
        ),
        ogNode(
          'span',
          {
            style: {
              fontSize: 28,
              color: 'rgba(255, 255, 255, 0.75)',
              marginTop: 24,
              lineHeight: 1.4,
            },
          },
          'Conference tickets, dev tools & learning platforms — free perks for the Polish JavaScript community.',
        ),
      ),

      // Bottom row: badge + url
      ogNode(
        'div',
        { style: { display: 'flex', alignItems: 'center' } },
        activeDeals > 0 &&
          ogNode(
            'div',
            {
              style: {
                display: 'flex',
                alignItems: 'center',
                border: '2px solid rgba(188, 210, 95, 0.6)',
                borderRadius: 999,
                padding: '10px 24px',
                fontSize: 26,
                color: '#bcd25f',
                marginRight: 28,
              },
            },
            // Same text nodes as the former JSX template
            '🎟 ',
            activeDeals,
            ' ',
            activeDeals === 1 ? 'deal' : 'deals',
            ' live now',
          ),
        ogNode(
          'span',
          { style: { fontSize: 26, color: 'rgba(255, 255, 255, 0.5)' } },
          'meetjs.pl/discounts',
        ),
      ),
    ),

    // Right column: ticket
    ogNode(
      'div',
      {
        style: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 480,
        },
      },
      ogNode(
        'div',
        {
          style: {
            display: 'flex',
            transform: 'rotate(6deg)',
            backgroundImage: 'linear-gradient(135deg, #bcd25f, #239eab)',
            borderRadius: 28,
            padding: 4,
            boxShadow: '0 30px 60px rgba(0, 0, 0, 0.5)',
          },
        },
        ogNode(
          'div',
          {
            style: {
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: '#241329',
              borderRadius: 24,
              width: 340,
              position: 'relative',
            },
          },
          // Ticket top
          ogNode(
            'div',
            {
              style: {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '36px 32px 28px',
              },
            },
            ogNode(
              'span',
              {
                style: {
                  fontSize: 20,
                  letterSpacing: 6,
                  color: 'rgba(255, 255, 255, 0.6)',
                },
              },
              'COMMUNITY PERK',
            ),
            ogNode(
              'span',
              {
                style: {
                  fontSize: 150,
                  fontWeight: 700,
                  lineHeight: 1,
                  marginTop: 12,
                  backgroundImage: 'linear-gradient(180deg, #bcd25f, #239eab)',
                  backgroundClip: 'text',
                  color: 'transparent',
                },
              },
              '%',
            ),
          ),

          // Perforation
          ogNode('div', {
            style: {
              display: 'flex',
              alignItems: 'center',
              position: 'relative',
              height: 0,
              borderTop: '3px dashed rgba(255, 255, 255, 0.25)',
            },
          }),
          perforationHole('left'),
          perforationHole('right'),

          // Ticket bottom
          ogNode(
            'div',
            {
              style: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '28px 32px 36px',
              },
            },
            ogNode(
              'div',
              {
                style: {
                  display: 'flex',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  border: '2px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: 12,
                  padding: '12px 24px',
                  fontSize: 26,
                  fontWeight: 700,
                  letterSpacing: 3,
                  color: '#ffffff',
                  whiteSpace: 'nowrap',
                },
              },
              'CODE: MEETJS',
            ),
          ),
        ),
      ),
    ),
  );

// The image only depends on the number of active deals.
const renderDiscountsImage = defineCachedFunction(
  async (activeDeals: number): Promise<string> => {
    const response = new ImageResponse(
      discountsImage(
        activeDeals,
        await getLogoDataUri(),
      ) as unknown as OgElement,
      { width: 1200, height: 630 },
    );
    return Buffer.from(await response.arrayBuffer()).toString('base64');
  },
  {
    name: 'discounts-og-image',
    maxAge: 60 * 60,
    getKey: (activeDeals: number) => String(activeDeals),
  },
);

/**
 * og:image of /discounts (former opengraph-image.tsx, alt "Exclusive discounts
 * for the meet.js community"). The active-deal count is computed per request
 * instead of at build time.
 */
export default defineEventHandler(async (event) => {
  const activeDeals = countActivePromos([
    ...eventsDiscounts,
    ...softwareDiscounts,
    ...learningDiscounts,
  ]);
  const png = Buffer.from(await renderDiscountsImage(activeDeals), 'base64');

  setHeader(event, 'content-type', 'image/png');
  setHeader(event, 'cache-control', 'public, max-age=0, must-revalidate');
  return png;
});
