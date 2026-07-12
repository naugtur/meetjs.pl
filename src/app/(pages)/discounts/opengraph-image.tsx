import { ImageResponse } from 'next/og';
import { eventsDiscounts } from '@/content/events-discounts';
import { softwareDiscounts } from '@/content/software-discounts';
import { learningDiscounts } from '@/content/learning-discounts';
import type { Promo } from '@/types/promo';

export const alt = 'Exclusive discounts for the meet.js community';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const countActivePromos = (promos: Promo[]): number => {
  const now = new Date();
  return promos.filter((promo) => new Date(promo.expiresAt) >= now).length;
};

export default async function Image() {
  const activeDeals = countActivePromos([
    ...eventsDiscounts,
    ...softwareDiscounts,
    ...learningDiscounts,
  ]);

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        backgroundColor: '#2b1932',
        backgroundImage:
          'radial-gradient(circle at 85% 15%, rgba(35, 158, 171, 0.4), transparent 50%), radial-gradient(circle at 5% 95%, rgba(188, 210, 95, 0.3), transparent 45%)',
        fontFamily: 'sans-serif',
        position: 'relative',
      }}
    >
      {/* Decorative percent signs */}
      <div
        style={{
          position: 'absolute',
          top: -40,
          right: 340,
          fontSize: 220,
          fontWeight: 700,
          color: 'rgba(255, 255, 255, 0.04)',
        }}
      >
        %
      </div>
      <div
        style={{
          position: 'absolute',
          bottom: -60,
          left: 420,
          fontSize: 280,
          fontWeight: 700,
          color: 'rgba(255, 255, 255, 0.04)',
        }}
      >
        %
      </div>

      {/* Left column */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px 0 64px 72px',
          width: 720,
        }}
      >
        {/* Wordmark */}
        <div style={{ display: 'flex', alignItems: 'baseline' }}>
          <span style={{ fontSize: 52, fontWeight: 700, color: '#ffffff' }}>
            meet
          </span>
          <div
            style={{
              width: 14,
              height: 14,
              backgroundColor: '#bcd25f',
              marginLeft: 4,
              marginRight: 4,
            }}
          />
          <span style={{ fontSize: 52, fontWeight: 700, color: '#239eab' }}>
            js
          </span>
        </div>

        {/* Headline */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span
            style={{
              fontSize: 84,
              fontWeight: 700,
              color: '#ffffff',
              lineHeight: 1.05,
            }}
          >
            Exclusive
          </span>
          <span
            style={{
              fontSize: 84,
              fontWeight: 700,
              lineHeight: 1.05,
              backgroundImage: 'linear-gradient(90deg, #bcd25f, #239eab)',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            Discounts
          </span>
          <span
            style={{
              fontSize: 28,
              color: 'rgba(255, 255, 255, 0.75)',
              marginTop: 24,
              lineHeight: 1.4,
            }}
          >
            Conference tickets, dev tools & learning platforms — free perks for
            the Polish JavaScript community.
          </span>
        </div>

        {/* Bottom row: badge + url */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {activeDeals > 0 && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                border: '2px solid rgba(188, 210, 95, 0.6)',
                borderRadius: 999,
                padding: '10px 24px',
                fontSize: 26,
                color: '#bcd25f',
                marginRight: 28,
              }}
            >
              🎟 {activeDeals} {activeDeals === 1 ? 'deal' : 'deals'} live now
            </div>
          )}
          <span style={{ fontSize: 26, color: 'rgba(255, 255, 255, 0.5)' }}>
            meetjs.pl/discounts
          </span>
        </div>
      </div>

      {/* Right column: ticket */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 480,
        }}
      >
        <div
          style={{
            display: 'flex',
            transform: 'rotate(6deg)',
            backgroundImage: 'linear-gradient(135deg, #bcd25f, #239eab)',
            borderRadius: 28,
            padding: 4,
            boxShadow: '0 30px 60px rgba(0, 0, 0, 0.5)',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: '#241329',
              borderRadius: 24,
              width: 340,
              position: 'relative',
            }}
          >
            {/* Ticket top */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '36px 32px 28px',
              }}
            >
              <span
                style={{
                  fontSize: 20,
                  letterSpacing: 6,
                  color: 'rgba(255, 255, 255, 0.6)',
                }}
              >
                COMMUNITY PERK
              </span>
              <span
                style={{
                  fontSize: 150,
                  fontWeight: 700,
                  lineHeight: 1,
                  marginTop: 12,
                  backgroundImage: 'linear-gradient(180deg, #bcd25f, #239eab)',
                  backgroundClip: 'text',
                  color: 'transparent',
                }}
              >
                %
              </span>
            </div>

            {/* Perforation */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                position: 'relative',
                height: 0,
                borderTop: '3px dashed rgba(255, 255, 255, 0.25)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                left: -18,
                top: 262,
                width: 32,
                height: 32,
                borderRadius: 999,
                backgroundColor: '#2b1932',
              }}
            />
            <div
              style={{
                position: 'absolute',
                right: -18,
                top: 262,
                width: 32,
                height: 32,
                borderRadius: 999,
                backgroundColor: '#2b1932',
              }}
            />

            {/* Ticket bottom */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '28px 32px 36px',
              }}
            >
              <div
                style={{
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
                }}
              >
                CODE: MEETJS
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    size,
  );
}
