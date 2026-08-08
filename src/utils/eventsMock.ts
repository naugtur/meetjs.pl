import { EventType } from '@/types/event';

const formatDate = (date: Date): string =>
  `${String(date.getDate()).padStart(2, '0')}.${String(date.getMonth() + 1).padStart(2, '0')}.${date.getFullYear()}`;

const now = new Date();
const upcomingDate1 = new Date(now.getFullYear(), now.getMonth() + 1, 15);
const upcomingDate2 = new Date(now.getFullYear(), now.getMonth() + 1, 22);
const pastDate1 = new Date(now.getFullYear(), now.getMonth() - 3, 15);
const pastDate2 = new Date(now.getFullYear(), now.getMonth() - 3, 22);

const baseEvent = {
  type: 'Meetup' as EventType['type'],
  date_add: 0,
  time: '18:00',
  url: 'https://meetjs.pl',
  rsvp: 'https://meetjs.pl',
  address: null,
  image: '',
  serie: 'mock.js',
  topic: ['JavaScript'],
};

export const MOCK_UPCOMING_EVENTS: EventType[] = [
  {
    ...baseEvent,
    id: 900_001,
    date: formatDate(upcomingDate1),
    name: `mock.js ${upcomingDate1.toLocaleString('default', { month: 'long' })}`,
    city: 'Wrocław',
  },
  {
    ...baseEvent,
    id: 900_002,
    date: formatDate(upcomingDate2),
    name: `mock.js ${upcomingDate2.toLocaleString('default', { month: 'long' })}`,
    city: 'Gdańsk',
  },
];

export const MOCK_PAST_EVENTS: EventType[] = [
  {
    ...baseEvent,
    id: 900_003,
    date: formatDate(pastDate1),
    name: `mock.js ${pastDate1.toLocaleString('default', { month: 'long' })}`,
    city: 'Kraków',
  },
  {
    ...baseEvent,
    id: 900_004,
    date: formatDate(pastDate2),
    name: `mock.js ${pastDate2.toLocaleString('default', { month: 'long' })}`,
    city: 'Poznań',
  },
];
