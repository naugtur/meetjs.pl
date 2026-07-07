import React from 'react';
import Image from 'next/image';
import {
  Bot,
  BookOpen,
  Code,
  Shield,
  Users,
  TestTube,
  Sun,
} from 'lucide-react';

export interface Partnership {
  name: string;
  website: string;
  description: string;
  details: string[];
  goals: string[];
  location: string;
  contact: string;
  icon: React.ReactElement;
  gradient: string;
  photos?: {
    src: string;
    alt: string;
    caption: string;
  }[];
  specialOffer?: {
    title: string;
    description: string;
    link: string;
    linkText: string;
  };
}

export const partnerships: Partnership[] = [
  {
    name: 'WAWTech+Summer 2026',
    website: 'https://wawtech.io/summer',
    description:
      'Letni festiwal technologiczny dla społeczności IT organizowany przez DOU — 18 lipca 2026 na Torze Służewiec w Warszawie. Oczekiwanych ~5 000 uczestników. meet.js jest oficjalnym Community Partnerem.',
    details: [
      'Prelekcje i panele dyskusyjne z ekspertami branżowymi',
      'Warsztaty i sesje live coding',
      'Strefa expo, networking i job speed dating',
      '5 000+ uczestników ze środowiska IT',
      'Tor Służewiec, Warszawa – 18 lipca 2026',
    ],
    goals: [
      'Łączenie społeczności tech podczas nieformalnego letniego festiwalu',
      'Wzajemna promocja wydarzeń i inicjatyw meet.js',
      'Ekskluzywna 15% zniżka dla społeczności meet.js (kod MEETJS15)',
      '2 darmowe bilety dla organizatorów meet.js',
    ],
    location: 'Warszawa, Tor Służewiec',
    contact: 'anna@wawtech.io',
    icon: <Sun className="h-8 w-8 text-yellow-400" />,
    gradient: 'from-yellow-400 via-orange-500 to-red-500',
    specialOffer: {
      title: '15% zniżki – kod MEETJS15',
      description:
        'Użyj kodu MEETJS15 przy zakupie biletu na WAWTech+Summer 2026 i zaoszczędź 15%!',
      link: 'https://wawtech.io/summer',
      linkText: 'Kup bilet ze zniżką',
    },
  },
  {
    name: 'React Summit 2026',
    website: 'https://reactsummit.com/',
    description:
      "The world's biggest React conference featuring 60+ speakers and thousands of developers, covering everything shaping the React ecosystem right now.",
    details: [
      '60+ world-class speakers including Kitze, Aurora Scharff (Vercel), Dominik Dorfmeister (React Query), Mark Erikson (Redux), Scott Tolinski (Syntax.fm)',
      'Deep dives into AI-Assisted Coding, React Server Components, Full-Stack Architecture, Performance, and Career Growth',
      'Amsterdam boat & walking tours, networking, food trucks, and after-party',
      'Hybrid format: June 12 & 16, 2026 in Amsterdam and online',
      'Social media presence on Bluesky, Twitter (X), Instagram, LinkedIn, and Facebook',
    ],
    goals: [
      'Bringing together the global React community for learning and networking',
      'Showcasing the latest trends and best practices in React development',
      'Providing platform for React experts to share knowledge and experiences',
      'Building connections between React developers worldwide',
    ],
    location: 'Amsterdam, Netherlands & Online',
    contact: 'https://reactsummit.com/',
    icon: (
      <Image
        src="/discounts/RS_Logo_Vertical_Color.png"
        alt="React Summit"
        width={32}
        height={32}
      />
    ),
    gradient: 'from-blue-600 to-cyan-500',
    specialOffer: {
      title: '10% Discount - Code FRIENDS',
      description:
        "Use code FRIENDS for 10% off tickets to the world's biggest React conference",
      link: 'https://ti.to/gitnation/react-summit-2026/discount/FRIENDS',
      linkText: 'Get 10% Off',
    },
  },
  {
    name: 'Testing Ground Conference 2026',
    website: 'https://testingground.pl/',
    description:
      'Największa polska konferencja łącząca świat jakości oprogramowania - testowanie, cyberbezpieczeństwo i dostępność cyfrowa.',
    details: [
      '05-06 października 2026 w Airport Hotel Okęcie w Warszawie',
      'Trzy ścieżki tematyczne: testowanie oprogramowania, cyberbezpieczeństwo, dostępność cyfrowa',
      '35 topowych ekspertów z całej Polski',
      'Blisko 500 uczestników i ponad 100 firm z różnych sektorów',
      'Ponad 200 partnerów wydarzenia',
      'Widoczność logo meet.js na stronie konferencji i materiałach promocyjnych',
      'Możliwość ustawienia rollupa meet.js podczas konferencji',
    ],
    goals: [
      'Promowanie jakości oprogramowania w społeczności developerskiej',
      'Wzajemna promocja - meet.js promuje konferencję, a TGC promuje meet.js',
      'Ekskluzywny rabat 20% dla społeczności meet.js (standard max 15%)',
      'Dostarczenie wartościowej edukacji z obszaru QA, security i accessibility',
    ],
    location: 'Warszawa, Polska',
    contact: 'kontakt@testingground.pl',
    icon: <TestTube className="h-8 w-8 text-emerald-500" />,
    gradient: 'from-emerald-500 to-teal-500',
    specialOffer: {
      title: '20% zniżki dla meet.js',
      description:
        'Ekskluzywny rabat 20% dla społeczności meet.js. Skontaktuj się z kontakt@testingground.pl lub zapytaj lokalnego organizatora o kod.',
      link: 'https://testingground.pl/',
      linkText: 'Sprawdź szczegóły',
    },
  },
  {
    name: 'FutureConf 2025',
    website: 'https://futureconf.tech/',
    description:
      'Two-day AI conference in Kraków focused on "AI in Production" with industry experts and practical use cases.',
    details: [
      'Expert talks on ML/AI, security, and practical AI production use cases',
      'Speakers from Hugging Face, Docker, Qdrant, mBank, and AGH University',
      'Networking opportunities with AI professionals and enthusiasts',
      'Workshops and hands-on sessions on AI implementation',
      'Located at International Cultural Centre on Main Square, Kraków',
    ],
    goals: [
      'Advancing AI knowledge and practical implementation',
      'Building connections in the AI and tech community',
      'Sharing real-world AI production experiences',
      'Supporting the growth of AI expertise in Poland',
    ],
    location: 'Kraków, Poland',
    contact: 'https://futureconf.tech/meetjs/',
    icon: <Bot className="h-8 w-8 text-purple-500" />,
    gradient: 'from-purple-600 to-blue-600',
    photos: [
      {
        src: 'https://futureconf.tech/assets/rozek.webp',
        alt: 'FutureConf 2024 conference atmosphere',
        caption: 'Conference atmosphere with hundreds of AI enthusiasts',
      },
      {
        src: 'https://futureconf.tech/assets/photobooth/uczestnik2.webp',
        alt: 'Conference speakers at FutureConf',
        caption: 'Industry experts sharing AI knowledge',
      },
      {
        src: 'https://futureconf.tech/assets/photobooth/uczestnik.webp',
        alt: 'Conference attendees networking',
        caption: 'Active networking and knowledge exchange',
      },
      {
        src: 'https://futureconf.tech/assets/ludzie-10.webp',
        alt: 'FutureConf community gathering',
        caption: 'Building the AI community in Poland',
      },
    ],
    specialOffer: {
      title: 'Group Discount System',
      description: 'Up to 50% off through meet.js partnership',
      link: 'https://futureconf.tech/meetjs/',
      linkText: 'Get Group Discount',
    },
  },
  {
    name: 'Młodzi 4IT 2.0',
    website: 'https://www.mlodzi4it.com/',
    description:
      'Educational project focused on digital awareness and safe technology usage for youth and seniors.',
    details: [
      'Free educational workshops in schools, libraries, and cultural centers',
      'Personal data protection and internet privacy education',
      'Responsible AI usage training',
      'Cybercrime prevention (including phone scams and fake messages)',
      'Creating free educational materials (flyers, quizzes, e-books, presentations)',
    ],
    goals: [
      'Building digital awareness among children and seniors',
      'Teaching safe internet usage and data protection',
      'Explaining AI technology and its responsible use',
      'Preventing cybercrime through education',
    ],
    location: 'Bielsko-Biała and surrounding areas',
    contact: 'mlodzi4it@gmail.com',
    icon: <BookOpen className="h-8 w-8 text-blue-500" />,
    gradient: 'from-blue-500 to-purple-600',
    photos: [
      {
        src: '/partnerships/mlodzi4it-workshop-1.jpg',
        alt: 'Młodzi 4IT workshop with students in classroom',
        caption: 'Educational workshop on digital awareness and cybersecurity',
      },
      {
        src: '/partnerships/mlodzi4it-workshop-2.jpg',
        alt: 'Interactive presentation about AI and technology',
        caption: 'Teaching responsible AI usage to young students',
      },
      {
        src: '/partnerships/mlodzi4it-workshop-3.jpg',
        alt: 'Students participating in cybersecurity training',
        caption: 'Hands-on cybersecurity education session',
      },
      {
        src: '/partnerships/mlodzi4it-workshop-4.jpg',
        alt: 'Group activity during digital literacy workshop',
        caption: 'Interactive learning about internet safety',
      },
      {
        src: '/partnerships/mlodzi4it-workshop-5.jpg',
        alt: 'Młodzi 4IT team presenting educational materials',
        caption: 'Presenting educational materials and resources',
      },
    ],
  },
  {
    name: 'Civil42 – Obrona Cywilna Przyszłości',
    website: 'https://civil42.pl/',
    description:
      'Największe w Polsce wydarzenie łączące technologie Dual Use z realnymi wyzwaniami bezpieczeństwa ludności. Konferencja skupia programistów, elektroników, służby mundurowe, ekspertów cyberbezpieczeństwa i organizacje pozarządowe wokół tematyki obrony cywilnej i odporności społecznej. Patronat Honorowy Kancelarii Prezydenta RP.',
    details: [
      'HACKATHON 11-12.04.2026 – Fermentownia No.2 (Tytonie), Lublin: ponad 24h kodowania systemów wczesnego ostrzegania, aplikacji ratunkowych i analizy OSINT',
      'Tematy hackathonu: łączność, AI, hardware, drony',
      'KONFERENCJA 23.04.2026 – Lubelskie Centrum Konferencyjne, Lublin: spotkanie praktyków ze służb mundurowych, inżynierów i decydentów',
      'Debaty o odporności państwa, schronach i cyberbezpieczeństwie infrastruktury krytycznej',
      'Prezentacja najlepszych rozwiązań opracowanych na hackathonie',
    ],
    goals: [
      'Budowanie odporności społecznej i świadomości obronnej',
      'Tworzenie technologii ratujących życie – systemy wczesnego ostrzegania i aplikacje ratunkowe',
      'Edukacja w zakresie obrony cywilnej i cyberbezpieczeństwa',
      'Integracja środowisk IT, służb mundurowych i organizacji pozarządowych',
    ],
    location: 'Lublin, Polska',
    contact: 'https://civil42.pl/',
    icon: <Shield className="h-8 w-8 text-green-400" />,
    gradient: 'from-green-700 to-emerald-500',
    specialOffer: {
      title: 'Weź udział w hackathonie',
      description:
        'Zarejestruj się na hackathon (11-12.04.2026) lub konferencję (23.04.2026) w Lublinie.',
      link: 'https://civil42.pl/',
      linkText: 'Zarejestruj się',
    },
  },
  {
    name: 'Women in Tech Summit 2026',
    website: 'https://summit.perspektywy.org/2026/',
    description:
      'Największe wydarzenie technologiczne dla kobiet w Europie – 10-11 czerwca 2026 w Warszawie (EXPO XXI) pod hasłem "Unleash New Energy". meet.js jest oficjalnym Community Partnerem.',
    details: [
      '10 000+ uczestniczek i uczestników, 500+ ekspertów, 100 największych firm technologicznych',
      '150 inspirujących prelegentek i prelegentów z całego świata',
      'Tematy: AI, Robotyka, Biotechnologia, Vibe coding, Przyszłość pracy, Odpowiedzialna AI',
      'Targi kariery, warsztaty, sesje mentoringowe i networking',
      '5 darmowych biletów dla meet.js + pula biletów 50% zniżki dla społeczności',
    ],
    goals: [
      'Wspieranie kobiet w technologii i budowanie inkluzywnej społeczności',
      'Łączenie developerów z ekspertkami i liderkami branży tech',
      'Promowanie różnorodności i innowacji w Polsce i Europie',
      'Wzajemna promocja wydarzeń i inicjatyw społecznościowych',
    ],
    location: 'Warszawa, EXPO XXI',
    contact: 'p.ceglarska@perspektywy.pl',
    icon: <Users className="h-8 w-8 text-pink-500" />,
    gradient: 'from-pink-500 to-purple-600',
    specialOffer: {
      title: '50% zniżki – kod MEETJS_SUMMIT',
      description:
        'Użyj kodu MEETJS_SUMMIT przy zakupie biletu. Limit 500 biletów ze zniżką 50%!',
      link: 'https://go.womenintechsummit.pl/buy',
      linkText: 'Kup bilet ze zniżką',
    },
  },
  {
    name: 'Tech Race Summit 2026',
    website:
      'https://techracesummit.com/pl/?utm_source=meetjs-1&utm_medium=media&utm_campaign=tech_race_summit_2026',
    description:
      'Nowa konferencja technologiczna organizowana przez SOFTSWISS (centra rozwoju w Warszawie i Poznaniu). 10 września 2026, Warszawa. meet.js jest oficjalnym patronem medialnym.',
    details: [
      'Eksperci AWS, Google, Oracle, Cloudflare, Fastly, Gcore, ScyllaDB i innych globalnych firm na jednej scenie',
      'Keynote: Andrey Doronichev — były lider Google, założyciel Optic',
      'Trzy ścieżki: Vision Track, Solution Track, Experiment Track',
      'Tematy: AI, infrastruktura IT, cyberbezpieczeństwo, strategia technologiczna, nowoczesne systemy cyfrowe',
      'Oczekiwanych ~1000 uczestników',
    ],
    goals: [
      'Łączenie liderów technologicznych i inżynierów budujących systemy na dużą skalę',
      'Dzielenie się praktyczną wiedzą o infrastrukturze i architekturze systemów',
      'Promocja Polski jako centrum innowacji technologicznych w Europie',
      'Wzajemna promocja wydarzeń i inicjatyw społeczności tech',
    ],
    location: 'Warszawa, Polska',
    contact:
      'https://techracesummit.com/pl/?utm_source=meetjs-1&utm_medium=media&utm_campaign=tech_race_summit_2026',
    icon: (
      <Image
        src="/partners/tech-race_vert_color on black_small_no descr.svg"
        alt="Tech Race Summit"
        width={48}
        height={48}
      />
    ),
    gradient: 'from-gray-900 to-gray-800',
    specialOffer: {
      title: 'Kup bilet',
      description:
        'Dołącz do Tech Race Summit 2026 — konferencji dla inżynierów i architektów systemów działających na globalną skalę.',
      link: 'https://techracesummit.com/pl/?utm_source=meetjs-1&utm_medium=media&utm_campaign=tech_race_summit_2026',
      linkText: 'Kup bilet',
    },
  },
  {
    name: 'HackYeah 2025',
    website: 'https://hackyeah.pl/',
    description:
      "Europe's largest in-person hackathon bringing together hundreds of programmers, designers, and tech enthusiasts for 24 hours of coding and innovation.",
    details: [
      '24-hour hackathon with challenges in biohacking, travel, defense, and real-world solutions',
      'Parallel tech conference with IT experts and industry leaders',
      'Mentorship support available on-site and via Discord',
      'Teams of up to 6 people or individual participation welcome',
      'Located at TAURON Arena Kraków with full facilities',
    ],
    goals: [
      'Fostering innovation and creative problem-solving',
      'Building connections between developers, designers, and tech enthusiasts',
      'Providing platform for rapid prototyping and idea validation',
      "Supporting the growth of Poland's tech ecosystem",
    ],
    location: 'Kraków, Poland',
    contact: 'https://hackyeah.pl/',
    icon: <Code className="h-8 w-8 text-orange-500" />,
    gradient: 'from-orange-600 to-pink-600',
    specialOffer: {
      title: 'Free Participation',
      description: 'Completely free to participate - just register early!',
      link: 'https://hackyeah.pl/',
      linkText: 'Register Now',
    },
  },
];
