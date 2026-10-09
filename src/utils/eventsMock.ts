import { EventType } from '@/types/event';

const formatDate = (date: Date): string =>
  `${String(date.getDate()).padStart(2, '0')}.${String(date.getMonth() + 1).padStart(2, '0')}.${date.getFullYear()}`;

// Dates are relative to "now", so compute them on call rather than at module
// load (module-level `new Date()` breaks prerendering with Cache Components)
const monthOffsetDate = (months: number, day: number): Date => {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth() + months, day);
};

const baseEvent = {
  type: 'Meetup',
  date_add: 0,
  time: '18:00',
  url: 'https://meetjs.pl',
  rsvp: 'https://meetjs.pl',
  address: null,
  image: '',
  serie: 'mock.js',
  topic: ['JavaScript'],
} as const satisfies Partial<EventType>;

export const getMockUpcomingEvents = (): EventType[] => {
  const upcomingDate1 = monthOffsetDate(1, 15);
  const upcomingDate2 = monthOffsetDate(1, 22);
  return [
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
};

export const getMockPastEvents = (): EventType[] => {
  const pastDate1 = monthOffsetDate(-3, 15);
  const pastDate2 = monthOffsetDate(-3, 22);
  return [
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
};
