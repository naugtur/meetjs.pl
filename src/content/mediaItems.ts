export interface MediaItem {
  id: string;
  title: string;
  description: string;
  url: string;
  source: string;
  date: string;
  type: 'video' | 'article' | 'podcast' | 'interview';
  language: 'pl' | 'en';
  thumbnail?: string;
}

export const mediaItems: MediaItem[] = [
  {
    id: 'pcss-meetjs-summit-2012',
    title: 'Meet.JS Summit 2012',
    description:
      "Materiał z ogólnopolskiej konferencji dla programistów JavaScript i HTML5 – Meet.JS Summit. Impreza jest podsumowaniem otwartych spotkań, tzw. meetup'ów, które w 2011 roku odbywały się w Poznaniu, Warszawie, Krakowie i Wrocławiu. Poznań, 14.01.2012.",
    url: 'https://osrodki.pionier.tv/wideo/pcss/meet-js-summit/',
    source: 'PCSS Pionier TV',
    date: '14 stycznia 2012',
    type: 'video',
    language: 'pl',
    thumbnail: '/media/screenshots/pcss-meetjs-summit-2012.jpg',
  },
  {
    id: 'typeofweb-summit-2017',
    title: 'meet.js Summit 2017: Nasze podsumowanie',
    description:
      'meet.js Summit 2017 to największy meet.js i największa konferencja JavaScript w Polsce! Relacja: Jak przebiegła konferencja i jak wyglądała jej organizacja?',
    url: 'https://pl.typeofweb.com/meet-js-summit-2017-nasze-podsumowanie',
    source: 'Type of Web',
    date: '2017',
    type: 'article',
    language: 'pl',
    thumbnail: '/media/screenshots/typeofweb-summit-2017.jpg',
  },
];
