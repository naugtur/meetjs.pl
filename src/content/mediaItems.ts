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
    id: 'invest-wroclaw-summit-2023',
    title:
      'JavaScript programmers will meet in Wrocław - the largest such event in the country',
    description:
      'Meet.js Summit 2023 brings together around 500 web development professionals. The annual conference unites local JavaScript communities from across Poland for workshops, panel discussions, and knowledge exchange.',
    url: 'https://invest-in-wroclaw.pl/javascript-programmers-will-meet-in-wroclaw-this-is-the-largest-such-event-in-the-country',
    source: 'Invest in Wrocław',
    date: 'September 29, 2023',
    type: 'article',
    language: 'en',
    thumbnail: '/media/screenshots/invest-wroclaw-summit-2023.jpg',
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
  {
    id: 'end3r-summit-2017-gdansk',
    title: 'Meet.js Summit 2017 in Gdańsk',
    description:
      'Conference recap from Meet.js Summit 2017 held at the European Solidarity Centre in Gdańsk. Featuring talks about React, machine learning, mobile web performance, GraphQL, Webpack, Vue, Node.js, and A-Frame WebVR.',
    url: 'https://end3r.com/blog/meet-js-summit-2017-in-gdansk',
    source: "End3r's Corner",
    date: 'September 18, 2017',
    type: 'article',
    language: 'en',
    thumbnail: '/media/screenshots/end3r-summit-2017-gdansk.jpg',
  },
  {
    id: 'egnyte-summit-2014',
    title: 'Meet.js and Egnyte Join to Host Event for JavaScript Developers',
    description:
      'Meet.js Summit 2014 in Poznań brought together 350 participants and 16 speakers. Egnyte Poland sponsored the conference and organized the after party for the JavaScript community.',
    url: 'https://www.egnyte.com/blog/post/meet-js-and-egnyte-join-to-host-event-for-javascript-developers/',
    source: 'Egnyte Blog',
    date: 'October 8, 2014',
    type: 'article',
    language: 'en',
    thumbnail: '/media/screenshots/egnyte-summit-2014.jpg',
  },
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
];
