import { Event } from '@/components/FeaturedEvents';

export const isEventUpcoming = (event: Event) => {
  const now = new Date();
  const [day, month, year] = event.date.split('.');
  const [hours, minutes] = event.time.split(':');
  const eventDate = new Date(+year, +month - 1, +day, +hours, +minutes);
  return now < eventDate;
}; 