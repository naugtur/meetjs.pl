// Additional one-time or manually managed events for the map and event sections
// Extend this array as needed for other cities/events

import type { Event } from '@/components/FeaturedEvents';

export const ADDITIONAL_EVENTS: Event[] = [
  {
    type: 'Meetup',
    id: 99998, // unique id
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
  {
    type: 'Meetup',
    id: 99999, // unique id
    date_add: Date.now(),
    date: '02.09.2025',
    time: '18:00',
    name: 'AI Meetup in Wroclaw with Callstack & Vercel',
    url: 'https://www.callstack.com/events/ai-meetup-in-wroclaw-first-edition',
    rsvp: 'https://www.callstack.com/events/ai-meetup-in-wroclaw-first-edition',
    city: 'Wrocław',
    address: 'Concordia Design',
    image: '',
    serie: 'AI',
    topic: ['AI', 'React Native', 'JavaScript', 'React'],
  },
  {
    type: 'Conference',
    id: 100000, // unique id
    date_add: Date.now(),
    date: '27.10.2025',
    time: '8:30',
    name: 'FutureConf 2025',
    url: 'https://futureconf.tech/',
    rsvp: 'https://futureconf.tech/',
    city: 'Kraków',
    address: 'Międzynarodowe Centrum Kultury\nRynek Główny 25',
    image: '',
    serie: 'AI & Future Tech',
    topic: ['AI', 'Machine Learning', 'JavaScript', 'Future Technologies'],
  },
  {
    type: 'Meetup',
    id: 100001, // unique id
    date_add: Date.now(),
    date: '17.09.2025',
    time: '17:00',
    name: 'AI Miners',
    url: 'https://aiminers.pl',
    rsvp: 'https://luma.com/35s646kw',
    city: 'Katowice',
    address: 'Rawa.Ink',
    image: '',
    serie: 'AI',
    topic: ['AI', 'Machine Learning', 'Business', 'Networking'],
  },
];
