import { Promo } from '@/types/promo';
import { Event } from '@/components/FeaturedEvents';

export function getPromoEvents(promos: Promo[]): Event[] {
  const now = new Date();

  return promos
    .filter((promo): promo is Promo & { city: string; eventLink: string; ticketLink: string } => {
      const isValidPromo = promo.country === 'Poland' &&
        new Date(promo.expiresAt) > now &&
        !!promo.city &&
        !!promo.eventLink &&
        !!promo.ticketLink;

      return isValidPromo;
    })
    .map((promo, index) => {
      const date = new Date(promo.expiresAt);
      const formattedDate = date.toLocaleDateString('pl-PL', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });

      const event: Event = {
        type: 'meetup',
        id: -1 * (index + 1),
        date_add: Math.floor(Date.now() / 1000),
        date: formattedDate,
        time: '19:00',
        name: promo.message.split(':')[0].trim(),
        url: promo.eventLink,
        rsvp: promo.ticketLink,
        city: promo.city,
        address: null,
        image: '',
        serie: 'promo',
        topic: ['conference']
      };

      return event;
    });
}
