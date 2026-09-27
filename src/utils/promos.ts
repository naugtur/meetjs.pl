import type { Promo } from '@/types/promo';

export const isPromoExpired = (promo: Promo): boolean =>
  new Date(promo.expiresAt) < new Date();

// Event promos (conferences) are time-sensitive, so they rank above
// long-running software/learning deals
const categorizePromo = (promo: Promo): 'event' | 'other' =>
  promo.eventLink || promo.country || promo.city ? 'event' : 'other';

export const getActivePromos = (promos: Promo[]): Promo[] =>
  promos
    .filter((promo) => !isPromoExpired(promo))
    .sort((a, b) => {
      const catA = categorizePromo(a);
      const catB = categorizePromo(b);
      if (catA !== catB) return catA === 'event' ? -1 : 1;
      return new Date(a.expiresAt).getTime() - new Date(b.expiresAt).getTime();
    });
