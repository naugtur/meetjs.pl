import { EventsType } from '@/types/event';

export const GET = async (request: Request) =>
  new URL(request.url).searchParams.get('old') === '1'
    ? Response.json(pastEventsJson)
    : Response.json(upcomingEventsJson);

const upcomingEventsJson: EventsType = {
  '1': {
    id: 60579,
    date_add: 1733499629,
    date: '17.12.2024',
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
};

const pastEventsJson: EventsType = {
  '1': {
    id: 60467,
    date_add: 1732708798,
    date: '5.12.2024',
    time: '18:00',
    name: 'meet.js Łódź 2024/12',
    type: 'Spotkanie',
    url: 'https://crossweb.pl/wydarzenia/meet-js-lodz-2024-12/',
    rsvp: 'https://www.meetup.com/meet-js-lodz/events/304685998/',
    city: 'Łódź',
    address: 'ul. Piotrkowska 157/A, 90-440 Łódź',
    image: 'https://crossweb.pl/upload/gallery/event/60467/840x320/meet.avif',
    serie: 'meet.js',
    topic: ['programowanie', 'JavaScript'],
  },
  '2': {
    id: 60079,
    date_add: 1730377768,
    date: '28.11.2024',
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
    date_add: 1729589331,
    date: '18.11.2024',
    time: '18:00',
    name: 'meet.js #Poznań #11.2024 #58',
    type: 'Spotkanie',
    url: 'https://crossweb.pl/wydarzenia/meet-js-poznan-11-2024-58/',
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
    date_add: 1731070397,
    date: '13.11.2024',
    time: '18:00',
    name: 'meet.js Wrocław 2024-11-13 x airSlate',
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
};
