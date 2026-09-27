import type { Promo } from '@/types/promo';

export const isPromoExpired = (promo: Promo, now = new Date()): boolean =>
  new Date(promo.expiresAt) < now;

// Event promos (conferences) are time-sensitive, so they rank above
// long-running software/learning deals
const categorizePromo = (promo: Promo): 'event' | 'other' =>
  promo.eventLink || promo.country || promo.city ? 'event' : 'other';

export const getActivePromos = (promos: Promo[], now = new Date()): Promo[] =>
  promos
    .filter((promo) => !isPromoExpired(promo, now))
    .sort((a, b) => {
      const catA = categorizePromo(a);
      const catB = categorizePromo(b);
      if (catA !== catB) return catA === 'event' ? -1 : 1;
      return new Date(a.expiresAt).getTime() - new Date(b.expiresAt).getTime();
    });
