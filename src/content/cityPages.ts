import type { Organizer } from '../types/organizer';

/**
 * Content of the city pages (/bialystok, /warszawa, …), rendered by
 * app/pages/[city].vue. Full pages show events, groups, FAQ and organizers;
 * placeholder pages only ask for organizers.
 */

/** Inline rich text: plain strings, links and line breaks. */
export type RichText = (
  | string
  | { href: string; text: string; className?: string; about?: string }
  | { br: true }
)[];

export interface FAQQuestion {
  id: string;
  question: string;
  answer: RichText;
}

export interface CityPageMetadata {
  title: string;
  description: string;
  keywords?: string;
  /** City name passed to the OG image (/api/og?city=…) */
  ogImageCity?: string;
  /** Whether the page sets its own Twitter card */
  twitter?: boolean;
}

interface CityPageBase {
  slug: string;
  metadata: CityPageMetadata;
}

export interface FullCityPage extends CityPageBase {
  kind: 'full';
  /** Name shown in the banner */
  bannerName: string;
  cover: string;
  /** City name used by Crossweb events (with Polish diacritics) */
  eventsCity: string;
  /** undefined: no section; []: section without links (renders nothing) */
  localGroups?: string[];
  embed?: { src: string; width: number; height: number; title: string };
  faq: FAQQuestion[];
  organizers: { cityLabel: string; people: Organizer[] };
  email?: string;
}

export interface PlaceholderCityPage extends CityPageBase {
  kind: 'placeholder';
  name: string;
}

export type CityPage = FullCityPage | PlaceholderCityPage;

const link = (href: string, text: string, about?: string) => ({
  href,
  text,
  className: 'font-bold hover:underline',
  ...(about ? { about } : {}),
});

const fullMetadata = (
  name: string,
  ogImageCity: string,
  twitter = true,
): CityPageMetadata => ({
  title: `meet.js ${name}`,
  description: `JavaScript meetups in ${name}`,
  keywords: `meet.js, ${name}, JavaScript, meetup`,
  ogImageCity,
  twitter,
});

const placeholder = (slug: string, name: string): PlaceholderCityPage => ({
  kind: 'placeholder',
  slug,
  name,
  metadata: {
    title: `meet.js ${name}`,
    description: `JavaScript meetups in ${name}`,
  },
});

const FREE_EXCEPT_SUMMIT: RichText = [
  'Generally our event are FREE! Only ',
  { href: 'https://summit.meetjs.pl', text: 'summit' },
  ' is paid event.',
];

export const CITY_PAGES: CityPage[] = [
  {
    kind: 'full',
    slug: 'bialystok',
    metadata: fullMetadata('Białystok', 'Białystok'),
    bannerName: 'Białystok',
    cover: '/city/bialystok/cover.jpg',
    eventsCity: 'Białystok',
    faq: [
      {
        id: '1',
        question: 'How to become Białystok meetup sponsor or speaker?',
        answer: [
          "Feel free to connect with one of the organizers on LinkedIn — we'd love to chat with you about sponsorship opportunities!",
        ],
      },
      {
        id: '2',
        question: 'How to join to our meetup?',
        answer: [
          "It's that easy! Come to the meeting in ",
          link('https://maps.app.goo.gl/JsVjDFjsTSsMvwh47', 'Gwint'),
        ],
      },
      {
        id: '3',
        question: 'How is it cost to join event?',
        answer: ['Generally, our events in Białystok are free!'],
      },
    ],
    organizers: {
      cityLabel: 'Białystok',
      people: [
        {
          name: 'Kasia Paszko',
          image: '/city/bialystok/organizers/katarzyna.jpeg',
          linkedin: 'https://www.linkedin.com/in/katarzyna-paszko/',
        },
        {
          name: 'Kacper Lewko',
          image: '/city/bialystok/organizers/kacper.jpeg',
          linkedin: 'https://pl.linkedin.com/in/kacper-lewko-66a165273',
        },
        {
          name: 'Krzysztof Kondracikowski',
          image: '/city/bialystok/organizers/krzysztof.jpeg',
          linkedin:
            'https://www.linkedin.com/in/krzysztof-kondracikowski-87a3491b3/',
        },
        {
          name: 'Mateusz Butkiewicz',
          image: '/city/bialystok/organizers/mateusz.jpeg',
          linkedin: 'https://www.linkedin.com/in/mat-btk/',
        },
      ],
    },
    email: 'hello@meetjs.bialystok.pl',
  },
  {
    kind: 'full',
    slug: 'bielsko-biala',
    metadata: fullMetadata('Bielsko-Biała', 'bielsko-biala', false),
    bannerName: 'Bielsko-Biała',
    cover: '/city/bielsko-biala/cover.jpeg',
    eventsCity: 'Bielsko-Biała',
    localGroups: ['https://www.meetup.com/meet-js-bielsko-biala/'],
    faq: [
      {
        id: '1',
        question: 'How to become Bielsko-Biała meetup sponsor?',
        answer: ['Please contact Dariusz Wylon (d.wylon@selleo.com)'],
      },
      {
        id: '2',
        question: 'How is it cost to join event?',
        answer: FREE_EXCEPT_SUMMIT,
      },
      {
        id: '3',
        question: 'Do I need to register?',
        answer: [
          'Yes, registration is required for each event. You can sign up through our ',
          link(
            'https://www.meetup.com/meet-js-bielsko-biala/',
            'Meetup page',
            '_blank',
          ),
          '.',
        ],
      },
    ],
    organizers: {
      cityLabel: 'Bielsko-Biała',
      people: [
        {
          name: 'Dariusz Wylon',
          image: '/city/bielsko-biala/organizers/dariusz.jpeg',
          email: 'd.wylon@selleo.com',
          linkedin: 'https://www.linkedin.com/in/dariuszwylon/',
        },
        {
          name: 'Dawid Poślinski',
          image: '/city/bielsko-biala/organizers/dawid.jpeg',
          email: 'd.poslinski@selleo.com',
          linkedin: 'https://www.linkedin.com/in/dawid-poslinski/',
        },
        {
          name: 'Maria Nowicka-Pawlik',
          image: '/city/bielsko-biala/organizers/maria.jpeg',
          email: 'm.nowickapawlik@selleo.com',
          linkedin: 'https://www.linkedin.com/in/maria-nowicka-pawlik/',
        },
      ],
    },
    email: 'd.wylon@selleo.com',
  },
  {
    kind: 'full',
    slug: 'gdansk',
    metadata: fullMetadata('Gdańsk', 'Gdansk'),
    bannerName: 'Gdańsk',
    cover: '/city/gdansk/cover.png',
    eventsCity: 'Gdańsk',
    localGroups: [],
    faq: [
      {
        id: '1',
        question: 'Where do the meetups take place?',
        answer: [
          'Our meetups are typically held at various tech company offices in the Tricity area (Gdańsk, Gdynia, Sopot). The specific location for each meetup is announced with the event details.',
        ],
      },
      {
        id: '2',
        question: 'How often do you organize meetups?',
        answer: [
          'We aim to organize meetups every 1-2 months, depending on speaker availability and venue arrangements.',
        ],
      },
      {
        id: '3',
        question: 'How can I give a talk?',
        answer: [
          "We welcome speakers of all experience levels! If you'd like to share your knowledge, please reach out to us at ",
          link('mailto:gdansk@meetjs.pl', 'gdansk@meetjs.pl'),
          ' with your talk proposal.',
        ],
      },
      {
        id: '4',
        question: 'Is there a cost to attend?',
        answer: ['No, all meet.js events are free to attend.'],
      },
      {
        id: '5',
        question: 'Do I need to register?',
        answer: [
          'Yes, registration is required for each event. You can sign up through our ',
          link(
            'https://www.meetup.com/meet-js-trojmiasto/',
            'Meetup page',
            '_blank',
          ),
          '.',
        ],
      },
    ],
    organizers: {
      cityLabel: 'Gdańsk',
      people: [
        {
          name: 'Mateusz Wojczal',
          image: '/city/gdansk/organizers/mateusz.jpeg',
          linkedin: 'https://www.linkedin.com/in/mateusz-wojczal/',
          gitHub: 'https://github.com/mateuszwojczal',
        },
        {
          name: 'Michał Michalczuk',
          image: '/city/gdansk/organizers/michal.jpeg',
          linkedin: 'https://www.linkedin.com/in/michalczukm/',
          gitHub: 'https://github.com/michalczukm',
          email: 'michal@michalczukm.xyz',
        },
      ],
    },
    email: 'gdansk@meetjs.pl',
  },
  {
    kind: 'full',
    slug: 'katowice',
    metadata: fullMetadata('Katowice', 'Katowice'),
    bannerName: 'Katowice',
    cover: '/city/katowice/cover.avif',
    eventsCity: 'Katowice',
    faq: [
      {
        id: '1',
        question: 'How to become Katowice meetup sponsor?',
        answer: [
          "Email organizers and they'll  get back to you with details. You can host us at your office or help us cover the cost of a venue. Or we can organize the meetup outdoors :) We're open to ideas!",
        ],
      },
      {
        id: '2',
        question: 'How to become Katowice speaker?',
        answer: [
          'Go to ',
          link(
            'https://github.com/meetjspl/katowice/issues/',
            'https://github.com/meetjspl/katowice/issues/',
            '_blank',
          ),
          ' and suggest a topic',
        ],
      },
      {
        id: '3',
        question: 'What does it cost to join event?',
        answer: [
          'Generally our events are FREE! Only ',
          { href: 'https://summit.meetjs.pl', text: 'summit', about: '_blank' },
          ' is paid event.',
          { br: true },
          'We sometimes organize charity events where you can donate to participate.',
        ],
      },
    ],
    organizers: {
      cityLabel: 'Katowice',
      people: [
        {
          name: 'Sebastian Mysakowski',
          image: '/city/katowice/organizers/sebastian.jpeg',
          linkedin: 'https://www.linkedin.com/in/smysakowski/',
        },
      ],
    },
  },
  {
    kind: 'full',
    slug: 'krakow',
    metadata: fullMetadata('Krakow', 'Krakow'),
    bannerName: 'Kraków',
    cover: '/city/krakow/cover.jpg',
    eventsCity: 'Kraków',
    localGroups: ['https://www.meetup.com/krakowjs/'],
    faq: [
      {
        id: '4',
        question: 'How to become Krakow meetup sponsor?',
        answer: [
          "Email meetjskrk@gmail.com or directly email organizers and they'll get back to you with details. You can host us at your office or help us cover the cost of a venue. Or we can organize the meetup outdoors :) We're open to ideas!",
        ],
      },
      {
        id: '2',
        question: 'How to become Krakow speaker?',
        answer: ['Write meetjskrk@gmail.com or write directly to organizer.'],
      },
      {
        id: '3',
        question: 'How to join to our meetup?',
        answer: [
          'Register to upcoming event on ',
          link('https://www.meetup.com/krakowjs/', 'meetup.com', '_blank'),
          ". Join us on time in venue. It's easy 🥳",
        ],
      },
      {
        id: '1',
        question: 'What does it cost to join event?',
        answer: ['Meetups are free to join :)'],
      },
    ],
    organizers: {
      cityLabel: 'Krakow',
      people: [
        {
          name: 'Andrzej Fricze',
          image: '/city/krakow/organizers/andrzej.png',
          email: 'andrzej.fricze@gmail.com',
          linkedin: 'https://www.linkedin.com/in/andrzej-fricze/',
          gitHub: 'https://github.com/fricze',
        },
      ],
    },
    email: 'meetjskrk@gmail.com',
  },
  {
    kind: 'full',
    slug: 'lodz',
    metadata: fullMetadata('Łódź', 'Lodz'),
    bannerName: 'Łódź',
    cover: '/city/lodz/cover.jpg',
    eventsCity: 'Łódź',
    localGroups: ['https://luma.com/user/meetjs'],
    faq: [
      {
        id: '1',
        question: 'How to become Łódź meetup sponsor?',
        answer: ['Contact local Organizer.'],
      },
      {
        id: '2',
        question: 'How to become Łódź speaker?',
        answer: ['Contact local Organizer.'],
      },
      {
        id: '3',
        question: 'How to join to our meetup?',
        answer: [
          'Register to upcoming event on ',
          link('https://luma.com/user/meetjs/', 'luma.com', '_blank'),
          ". Join us on time in venue. It's easy 🥳",
        ],
      },
      {
        id: '4',
        question: 'What does it cost to join event?',
        answer: [
          'Generally our event are FREE! Only ',
          { href: 'https://summit.meetjs.pl', text: 'summit', about: '_blank' },
          ' is paid event.',
        ],
      },
    ],
    organizers: {
      cityLabel: 'Lodz',
      people: [
        {
          name: 'Krzysztof Krawiec',
          image: '/city/lodz/organizers/krzysztof.jpeg',
          linkedin: 'https://www.linkedin.com/in/kkrawiec/',
        },
        {
          name: 'Michał Hadrysiak',
          image: '/city/lodz/organizers/hans.jpg',
          linkedin: 'https://www.linkedin.com/in/michal-hadrysiak/',
          gitHub: 'https://github.com/onlyhans-dev',
        },
      ],
    },
    email: 'Lodz@meetjs.pl',
  },
  {
    kind: 'full',
    slug: 'lublin',
    metadata: fullMetadata('Lublin', 'Lublin'),
    bannerName: 'Lublin',
    cover:
      'https://ocdn.eu/pulscms-transforms/1/EDik9kpTURBXy9iYjJhMTIyMGEzY2E2M2YzMjUyNGRmZDBmZWNhMTZhMC5qcGeTlQMAzNbNDvDNCGeTBc0DFM0BvJMJpmQ2NzRmNAbeAAGhMAY/lublin.avif',
    eventsCity: 'Lublin',
    localGroups: ['https://luma.com/user/meetjs'],
    faq: [
      {
        id: '4',
        question: 'How to become Lublin meetup sponsor?',
        answer: [
          "Email organizers and they'll  get back to you with details. You can host us at your office or help us cover the cost of a venue. Or we can organize the meetup outdoors :) We're open to ideas!",
        ],
      },
      {
        id: '2',
        question: 'How to become Lublin speaker?',
        answer: [
          'Go to ',
          link(
            'https://github.com/meetjspl/lublin/issues/',
            'https://github.com/meetjspl/lublin/issues/',
            '_blank',
          ),
          ' and suggest a topic',
        ],
      },
      {
        id: '3',
        question: 'How to join to our meetup?',
        answer: [
          'Register to upcoming event on ',
          link('https://luma.com/user/meetjs', 'luma.com', '_blank'),
          ". Join us on time in venue. It's easy 🥳",
        ],
      },
      {
        id: '1',
        question: 'What does it cost to join event?',
        answer: [
          'Generally our events are FREE! Only ',
          { href: 'https://summit.meetjs.pl', text: 'summit', about: '_blank' },
          ' is paid event.',
          { br: true },
          'We sometimes organize charity events where you can donate to participate.',
        ],
      },
    ],
    organizers: {
      cityLabel: 'Lublin',
      people: [
        {
          name: 'Patryk Omiotek',
          image: '/city/lublin/organizers/patryk.jpeg',
          linkedin: 'https://www.linkedin.com/in/patrykomiotek/',
        },
        {
          name: 'Sebastian Mysakowski',
          image: '/city/lublin/organizers/sebastian.jpeg',
          linkedin: 'https://www.linkedin.com/in/smysakowski/',
        },
      ],
    },
    email: 'lublin@meetjs.pl',
  },
  {
    kind: 'full',
    slug: 'poznan',
    metadata: fullMetadata('Poznań', 'Poznań'),
    bannerName: 'Poznań',
    cover: 'city/poznan/cover.jpg',
    eventsCity: 'Poznań',
    localGroups: [
      'https://crossweb.pl/cykle-wydarzen/meet-js-poznan/',
      'https://github.com/meetjspl/poznan',
    ],
    faq: [
      {
        id: '1',
        question: 'How to become Poznań meetup sponsor?',
        answer: [
          'Feel free to connect with one of the organizers on LinkedIn — we’d love to chat with you about sponsorship opportunities!',
        ],
      },
      {
        id: '2',
        question: 'How to become Poznań speaker?',
        answer: [
          'Create ',
          link('https://github.com/meetjspl/poznan/issues', 'issue on gitHub'),
        ],
      },
      {
        id: '3',
        question: 'How to join to our meetup?',
        answer: [
          'Register to upcoming event on ',
          link(
            'https://crossweb.pl/cykle-wydarzen/meet-js-poznan/',
            'crossweb.pl',
          ),
          ". Join us on time in venue. It's easy 🥳",
        ],
      },
      {
        id: '4',
        question: 'How is it cost to join event?',
        answer: FREE_EXCEPT_SUMMIT,
      },
    ],
    organizers: {
      cityLabel: 'Poznań',
      people: [
        {
          name: 'Agnieszka Konefał',
          image: '/city/poznan/organizers/agnieszka.jpg',
          linkedin: 'https://www.linkedin.com/in/agnieszka-konefał-9a731bb2',
        },
        {
          name: 'Sebastian Pożoga',
          image: '/city/poznan/organizers/sebastian.jpeg',
        },
        {
          name: 'Marcin Owczarzak',
          linkedin: 'https://www.linkedin.com/in/marcinowczarzak/',
          image: '/city/poznan/organizers/marcin.jpeg',
        },
        {
          name: 'Olaf Krawczyk',
          image: '/city/poznan/organizers/olaf.jpeg',
          linkedin: 'https://www.linkedin.com/in/olaf-krawczyk/',
        },
      ],
    },
    email: 'poznan@meetjs.pl',
  },
  {
    kind: 'full',
    slug: 'warszawa',
    metadata: fullMetadata('Warsaw', 'Warsaw'),
    bannerName: 'Warsaw',
    cover: '/city/warszawa/cover.jpg',
    eventsCity: 'Warszawa',
    localGroups: [
      'https://www.meetup.com/meet-js-warsaw/',
      'https://lu.ma/user/usr-eNzoaGXYjizOBQI',
    ],
    embed: {
      src: 'https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7301219840705339392?compact=1',
      width: 710,
      height: 399,
      title: 'meet.js Warsaw at Box Warsaw',
    },
    faq: [
      {
        id: '4',
        question: 'How to become Warsaw meetup sponsor?',
        answer: [
          "Email organizers and they'll  get back to you with details. You can host us at your office or help us cover the cost of a venue. Or we can organize the meetup outdoors :) We're open to ideas!",
        ],
      },
      {
        id: '2',
        question: 'How to become Warsaw speaker?',
        answer: [
          'Go to ',
          link(
            'https://github.com/meetjspl/warsaw/issues/',
            'https://github.com/meetjspl/warsaw/issues/',
            '_blank',
          ),
          ' and suggest a topic',
        ],
      },
      {
        id: '3',
        question: 'How to join to our meetup?',
        answer: [
          'Register to upcoming event on ',
          link(
            'https://www.meetup.com/pl-PL/meetjswarsaw/',
            'meetup.com',
            '_blank',
          ),
          ". Join us on time in venue. It's easy 🥳",
        ],
      },
      {
        id: '1',
        question: 'What does it cost to join event?',
        answer: [
          'Generally our event are FREE! Only ',
          { href: 'https://summit.meetjs.pl', text: 'summit', about: '_blank' },
          ' is paid event.',
          { br: true },
          'We sometimes organize charity events where you can donate to participate.',
        ],
      },
    ],
    organizers: {
      cityLabel: 'Warsaw',
      people: [
        {
          name: 'Zbyszek Tenerowicz',
          image: '/city/warszawa/organizers/zbyszek.jpeg',
          email: 'naugtur@gmail.com',
          linkedin:
            'https://www.linkedin.com/in/zbigniew-tenerowicz-288175165/',
          gitHub: 'https://github.com/naugtur',
        },
        {
          name: 'Kamil Dzieniszewski',
          image: '/city/warszawa/organizers/kamil.jpeg',
          email: 'kamil.dzieniszewski@gmail.com',
          linkedin: 'https://www.linkedin.com/in/dzieniszewski/',
          gitHub: 'https://github.com/dzienisz',
        },
        {
          name: 'Wojtek Jeremi Połowniak',
          image: '/city/warszawa/organizers/wojciech.jpeg',
          email: 'wojciech.polowniak@gmail.com',
          linkedin: 'https://www.linkedin.com/in/wojciech-po%C5%82owniak/',
          gitHub: 'https://github.com/Worie',
        },
      ],
    },
    email: 'warszawa@meetjs.pl',
  },
  {
    kind: 'full',
    slug: 'wroclaw',
    metadata: fullMetadata('Wrocław', 'Wrocław'),
    bannerName: 'Wrocław',
    cover: '/city/wroclaw/cover.jpeg',
    eventsCity: 'Wrocław',
    localGroups: [
      'https://www.meetup.com/meet-js-wroclaw/',
      'https://www.facebook.com/groups/326774397348491',
      'https://lu.ma/user/usr-eNzoaGXYjizOBQI',
    ],
    faq: [
      {
        id: '1',
        question: 'How to become Wrocław meetup sponsor?',
        answer: ['contact'],
      },
      {
        id: '2',
        question: 'Example question',
        answer: ['Example answer'],
      },
      {
        id: '3',
        question: 'How to become Wrocław speaker?',
        answer: [
          'Create ',
          link('https://github.com/meetjspl/wroclaw/issues', 'issue on gitHub'),
        ],
      },
      {
        id: '4',
        question: 'How to join to our meetup?',
        answer: [
          'Register to upcoming event on ',
          link('https://www.meetup.com/pl-PL/meet-js-wroclaw/', 'meetup.com'),
          ". Join us on time in venue. It's easy 🥳",
        ],
      },
      {
        id: '5',
        question: 'What does it cost to join event?',
        answer: FREE_EXCEPT_SUMMIT,
      },
    ],
    organizers: {
      cityLabel: 'Wrocław',
      people: [
        {
          name: 'Cezary Dynak',
          image: '/city/wroclaw/organizers/cezary.png',
          linkedin: 'https://www.linkedin.com/in/cdynak/',
        },
        {
          name: 'Aleksandra Pawlus',
          image: '/city/wroclaw/organizers/aleksandra.jpeg',
          linkedin: 'https://www.linkedin.com/in/aleksandrapawlus/',
        },
        {
          name: 'Stanisław Synowiec',
          image: '/city/wroclaw/organizers/stanislaw.png',
          email: 'meetjs@ssynowiec.dev',
          linkedin: 'https://www.linkedin.com/in/ssynowiecpl/',
          gitHub: 'https://github.com/ssynowiec',
        },
        {
          name: 'Michał Korczak',
          image: '/city/wroclaw/organizers/michal.png',
          linkedin: 'https://www.linkedin.com/in/michal-korczak/',
          gitHub: 'https://github.com/Omikorin',
        },
      ],
    },
    email: 'wroclaw@meetjs.pl',
  },
  placeholder('gliwice', 'Gliwice'),
  placeholder('kielce', 'Kielce'),
  placeholder('olsztyn', 'Olsztyn'),
  placeholder('opole', 'Opole'),
  placeholder('rzeszow', 'Rzeszów'),
  placeholder('szczecin', 'Szczecin'),
  placeholder('torun', 'Toruń'),
  placeholder('zielona-gora', 'Zielona Góra'),
];

export const getCityPage = (slug: string): CityPage | undefined =>
  CITY_PAGES.find((page) => page.slug === slug);
