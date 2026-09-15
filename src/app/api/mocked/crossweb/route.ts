import { EventsType } from '@/types/event';

export const GET = async (request: Request) =>
  new URL(request.url).searchParams.get('old') === '1'
    ? Response.json(pastEventsJson())
    : Response.json(upcomingEventsJson());

const formatDate = (date: Date): string =>
  `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;

// Returns DD.M.YYYY for a day in a month relative to the current one,
// e.g. monthsFromNow(1, 15) = the 15th of next month.
const monthsFromNow = (months: number, day: number): string => {
  const now = new Date();
  return formatDate(new Date(now.getFullYear(), now.getMonth() + months, day));
};

const nowUnix = () => Math.floor(Date.now() / 1000);

const upcomingEventsJson = (): EventsType => ({
  '1': {
    id: 60579,
    date_add: nowUnix(),
    date: monthsFromNow(1, 15),
    time: '18:00',
    name: '#60 meet.js Bia\u0142ystok',
    type: 'Spotkanie',
    url: 'https://crossweb.pl/wydarzenia/60-meet-js-bialystok/',
    rsvp: 'https://crossweb.pl/wydarzenia/60-meet-js-bialystok/',
    city: 'Bia\u0142ystok',
    address: 'Zwierzyniecka 10',
    image:
      'https://crossweb.pl/upload/gallery/event/60579/840x320/469226967_1681239372569204_3996555995980207175_n.jpg',
    serie: 'meet.js Bia\u0142ystok',
    topic: ['JavaScript'],
  },
  '2': {
    id: 60610,
    date_add: nowUnix(),
    date: monthsFromNow(1, 22),
    time: '18:00',
    name: 'meet.js Wrocław x mock',
    type: 'Spotkanie',
    url: 'https://crossweb.pl/wydarzenia/meet-js-wroclaw-mock/',
    rsvp: 'https://www.meetup.com/pl-PL/meet-js-wroclaw/events/304057946/',
    city: 'Wrocław',
    address: 'Włodkowica 5',
    image:
      'https://crossweb.pl/upload/gallery/event/60150/840x320/1920x1080.png',
    serie: 'meet.js',
    topic: ['programowanie', 'JavaScript', 'Angular', 'React', 'TypeScript'],
  },
  '3': {
    id: 60611,
    date_add: nowUnix(),
    date: monthsFromNow(2, 5),
    time: '17:30',
    name: 'meet.js KRK mock',
    type: 'Spotkanie',
    url: 'https://crossweb.pl/wydarzenia/meet-js-krk-mock/',
    rsvp: 'http://www.meetup.com/KrakowJS/events/304294369/',
    city: 'Kraków',
    address: 'Lubicz 23/a',
    image:
      'https://crossweb.pl/upload/gallery/event/60079/840x320/600_524419186.webp',
    serie: 'meet.js',
    topic: ['programowanie', 'JavaScript'],
  },
});

const pastEventsJson = (): EventsType => ({
  '1': {
    id: 60467,
    date_add: nowUnix(),
    date: monthsFromNow(-1, 5),
    time: '18:00',
    name: 'meet.js Łódź mock',
    type: 'Spotkanie',
    url: 'https://crossweb.pl/wydarzenia/meet-js-lodz-mock/',
    rsvp: 'https://www.meetup.com/meet-js-lodz/events/304685998/',
    city: 'Łódź',
    address: 'ul. Piotrkowska 157/A, 90-440 Łódź',
    image: 'https://crossweb.pl/upload/gallery/event/60467/840x320/meet.avif',
    serie: 'meet.js',
    topic: ['programowanie', 'JavaScript'],
  },
  '2': {
    id: 60079,
    date_add: nowUnix(),
    date: monthsFromNow(-1, 28),
    time: '17:30',
    name: 'meet.js KRK [with GPC]',
    type: 'Spotkanie',
    url: 'https://crossweb.pl/wydarzenia/meet-js-krk-with-gpc-listopad-2024/',
    rsvp: 'http://www.meetup.com/KrakowJS/events/304294369/',
    city: 'Kraków',
    address: 'Lubicz 23/a',
    image:
      'https://crossweb.pl/upload/gallery/event/60079/840x320/600_524419186.webp',
    serie: 'meet.js',
    topic: ['programowanie', 'JavaScript'],
  },
  '3': {
    id: 59929,
    date_add: nowUnix(),
    date: monthsFromNow(-2, 18),
    time: '18:00',
    name: 'meet.js #Poznań mock',
    type: 'Spotkanie',
    url: 'https://crossweb.pl/wydarzenia/meet-js-poznan-mock/',
    rsvp: '',
    city: 'Poznań',
    address: 'Wierzbięcice 1B, Poznań',
    image:
      'https://crossweb.pl/upload/gallery/event/59929/840x320/meetjs-58.png',
    serie: 'meet.js Poznań',
    topic: ['programowanie', 'JavaScript', 'Angular', 'React', 'TypeScript'],
  },
  '4': {
    id: 60150,
    date_add: nowUnix(),
    date: monthsFromNow(-3, 13),
    time: '18:00',
    name: 'meet.js Wrocław x airSlate',
    type: 'Spotkanie',
    url: 'https://crossweb.pl/wydarzenia/meet-js-wroclaw-2024-11-13-x-airslate/',
    rsvp: 'https://www.meetup.com/pl-PL/meet-js-wroclaw/events/304057946/',
    city: 'Wrocław',
    address: 'Włodkowica 5',
    image:
      'https://crossweb.pl/upload/gallery/event/60150/840x320/1920x1080.png',
    serie: 'meet.js',
    topic: ['programowanie', 'JavaScript', 'Angular', 'React', 'TypeScript'],
  },
});
