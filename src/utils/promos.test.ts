import { getActivePromos, isPromoExpired } from './promos';
import type { Promo } from '@/types/promo';

const makePromo = (overrides: Partial<Promo>): Promo => ({
  id: 'promo',
  name: 'Promo',
  message: 'Message',
  cta: 'CTA',
  ticketLink: 'https://example.com',
  expiresAt: '2099-12-31T23:59:59+01:00',
  gradient: '',
  ...overrides,
});

describe('isPromoExpired', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-06-01T12:00:00Z'));
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns true for past dates and false for future ones', () => {
    expect(
      isPromoExpired(makePromo({ expiresAt: '2026-05-31T23:59:59Z' })),
    ).toBe(true);
    expect(
      isPromoExpired(makePromo({ expiresAt: '2026-06-02T00:00:00Z' })),
    ).toBe(false);
  });
});

describe('getActivePromos', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-06-01T12:00:00Z'));
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it('filters out expired promos', () => {
    const promos = [
      makePromo({ id: 'active', expiresAt: '2026-07-01T00:00:00Z' }),
      makePromo({ id: 'expired', expiresAt: '2026-05-01T00:00:00Z' }),
    ];
    expect(getActivePromos(promos).map((p) => p.id)).toEqual(['active']);
  });

  it('sorts events first, then by soonest expiry', () => {
    const promos = [
      makePromo({ id: 'software', expiresAt: '2026-06-05T00:00:00Z' }),
      makePromo({
        id: 'event-later',
        expiresAt: '2026-08-01T00:00:00Z',
        eventLink: 'https://conf.example',
      }),
      makePromo({
        id: 'event-sooner',
        expiresAt: '2026-07-01T00:00:00Z',
        city: 'Warsaw',
      }),
    ];
    expect(getActivePromos(promos).map((p) => p.id)).toEqual([
      'event-sooner',
      'event-later',
      'software',
    ]);
  });
});
