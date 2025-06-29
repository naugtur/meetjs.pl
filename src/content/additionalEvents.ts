// Additional one-time or manually managed events for the map and event sections
// Extend this array as needed for other cities/events

import type { Event } from '@/components/FeaturedEvents';

export const ADDITIONAL_EVENTS: Event[] = [
  {
    type: 'Meetup',
    id: 99999, // unique id
    date_add: Date.now(),
    date: '15.05.2025',
    time: '17:30',
    name: 'Gdańsk TypeScript Meetup',
    url: 'https://www.meetup.com/gdansk-typescript/events/307232721/',
    rsvp: 'https://www.meetup.com/gdansk-typescript/events/307232721/',
    city: 'Gdańsk',
    address: 'DevOne Hub, Aleja Grunwaldzka 411',
    image: '',
    serie: 'TypeScript',
    topic: ['TypeScript', 'JavaScript'],
  },
];
