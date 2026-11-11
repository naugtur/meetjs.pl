import { eventsDiscounts } from './events-discounts';
import { learningDiscounts } from './learning-discounts';
import { softwareDiscounts } from './software-discounts';

const activePromos = [
  ...eventsDiscounts,
  ...learningDiscounts,
  ...softwareDiscounts,
].filter((promo) => new Date(promo.expiresAt).getTime() > Date.now());

const links = activePromos.flatMap((promo) =>
  (['ticketLink', 'eventLink', 'workshopLink'] as const)
    .map((field) => ({ id: promo.id, field, url: promo[field] }))
    .filter((link): link is typeof link & { url: string } => !!link.url),
);

describe('active promo links', () => {
  it.each(links)('$id $field has utm_source', ({ url }) => {
    expect(new URL(url).searchParams.has('utm_source')).toBe(true);
  });
});
