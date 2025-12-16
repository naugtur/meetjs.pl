export interface CommunityItem {
  id: string;
  title: string;
  description: string;
  url: string;
  type: 'survey' | 'initiative' | 'research' | 'collaboration';
  status: 'active' | 'upcoming' | 'completed';
  startDate?: string;
  endDate?: string;
  organization: string;
  impact: string;
  ctaText: string;
  featured?: boolean;
  image?: string;
  tags: string[];
  pinned?: boolean;
}

export const COMMUNITY_PARTICIPATION: CommunityItem[] = [
  {
    id: 'react-conf',
    title: 'React Conference 2025',
    description:
      'The official React Conference took place on October 7-8, 2025. Watch the recordings to learn about the latest React developments, best practices, and future roadmap.',
    url: 'https://conf.react.dev/',
    type: 'collaboration',
    status: 'completed',
    startDate: '2025-10-07',
    endDate: '2025-10-08',
    organization: 'React Team',
    impact:
      'Learn directly from the React core team and community experts about the future of React.',
    ctaText: 'Watch Recordings',
    featured: true,
    image: 'https://conf.react.dev/logo.svg',
    tags: ['React', 'Conference', 'Archive', 'JavaScript', 'Web Development'],
  },
  {
    id: 'nextjs-conf-2025',
    title: 'Next.js Conf 2025',
    description:
      'Watch the recordings from Next.js Conf 2025. Learn about the latest Next.js features, best practices, and the future of React development from the Vercel team and community experts.',
    url: 'https://nextjs.org/conf',
    type: 'collaboration',
    status: 'completed',
    startDate: '2025-10-24',
    endDate: '2025-10-24',
    organization: 'Vercel',
    impact:
      'Learn about the future of Next.js and React development directly from the core team and community leaders.',
    ctaText: 'Watch Recordings',
    featured: true,
    image: '/nextjs-logo.svg',
    tags: [
      'Next.js',
      'Conference',
      'Archive',
      'React',
      'Web Development',
      'Vercel',
    ],
  },
  {
    id: 'state-of-js-2025',
    title: 'State of JS 2025 Survey',
    description:
      'The State of JS 2025 survey has concluded. Results are being compiled and will be published soon. Check back to see the latest trends and insights from the JavaScript community.',
    url: 'https://survey.devographics.com/en-US/survey/state-of-js/2025',
    type: 'survey',
    status: 'completed',
    startDate: '2025-08-01',
    endDate: '2025-11-11',
    organization: 'Devographics',
    impact:
      'Your input helps developers worldwide understand JS trends and make informed technology decisions.',
    ctaText: 'View Survey',
    featured: false,
    image: 'https://assets.devographics.com/surveys/js2025.png',
    tags: ['JavaScript', 'Survey', 'Community', 'Trends', 'Ecosystem'],
  },
  {
    id: 'state-of-html-2025-results',
    title: 'State of HTML 2025 Survey Results',
    description:
      'The State of HTML 2025 survey results are now available. The release took a bit longer due to the large amount of data collected, which enabled new ways of processing and browsing big question datasets.',
    url: 'https://survey.devographics.com/en-US/survey/state-of-html/2025',
    type: 'survey',
    startDate: '2025-12-16',
    endDate: '2025-12-16',
    status: 'completed',
    organization: 'Devographics',
    impact:
      'Browse the results to learn about HTML pain points and trends—and help spread the word so the community can benefit from the insights.',
    ctaText: 'View Results',
    featured: false,
    image: 'https://assets.devographics.com/surveys/html2025.png',
    tags: ['HTML', 'Survey', 'Results', 'Community', 'Web Platform'],
  },
  {
    id: 'state-of-react-2025',
    title: 'State of React 2025 Survey',
    description:
      'Share your experience with React, its ecosystem, and the latest tools and patterns. Help the community understand how React is being used in 2025.',
    url: 'https://survey.devographics.com/en-US/survey/state-of-react/2025',
    type: 'survey',
    status: 'active',
    startDate: '2025-11-01',
    endDate: '2025-11-30',
    organization: 'Devographics',
    impact:
      'Your insights help React developers worldwide understand trends and make informed decisions about tools and practices.',
    ctaText: 'Take the Survey',
    featured: true,
    image: 'https://assets.devographics.com/surveys/react2025.png',
    tags: ['React', 'Survey', 'Community', 'Trends', 'Ecosystem'],
  },
  {
    id: 'skkp-2025',
    title: 'Świąteczny Kalendarz Kariery Programisty 2025',
    description:
      'Darmowa wiedza przez 24 dni, każdego dnia przez innego eksperta z branży. Działamy przy tym charytatywnie.',
    url: 'https://kalendarzprogramisty.pl',
    type: 'initiative',
    status: 'active',
    startDate: '2025-12-01',
    endDate: '2025-12-24',
    organization: 'Kalendarz Programisty',
    impact: 'Promocja wiedzy i wsparcie charytatywne.',
    ctaText: 'Dołącz do akcji',
    featured: true,
    image: '/partners/skkp.png',
    tags: ['Christmas', 'Education', 'Charity', 'Community'],
  },
  {
    id: 'the5-live-initiative',
    title: 'THE 5. LIVE – Kup książkę i wesprzyj polskie lasy',
    description:
      'Premiera książki "The 5." już za nami, ale wciąż możesz dołączyć do misji ratowania polskich lasów. Cały zysk ze sprzedaży trafia na projekt Połączona Puszcza Polska.',
    url: 'https://the5.live?r=5VqoY',
    type: 'initiative',
    status: 'completed',
    startDate: '2025-12-10',
    endDate: '2025-12-10',
    organization: 'The 5. / BRAVE.courses',
    impact:
      'Kupując książkę wspierasz działania na rzecz ochrony polskich lasów i rozwój przedsiębiorczości w Polsce.',
    ctaText: 'Kup książkę i wspieraj lasy',
    featured: false,
    image: '/partners/the5.png',
    tags: [
      'Entrepreneurship',
      'Charity',
      'Book Launch',
      'Business',
      'Polish Market',
      'Forest Protection',
    ],
  },
  {
    id: 'advent-of-code-2025',
    title: 'Advent of Code 2025',
    description:
      'Join the annual Advent of Code programming challenge! Starting this year, there will be 12 days of puzzles in December. Solve daily puzzles, improve your problem-solving skills, and compete with developers worldwide.',
    url: 'https://adventofcode.com/2025',
    type: 'collaboration',
    status: 'active',
    startDate: '2025-12-01',
    endDate: '2025-12-12',
    organization: 'Advent of Code',
    impact:
      'Sharpen your programming skills with daily algorithmic challenges and join a global community of developers solving puzzles together.',
    ctaText: 'Start Solving',
    featured: true,
    image: 'https://adventofcode.com/favicon.png',
    tags: [
      'Programming',
      'Algorithms',
      'Challenge',
      'Community',
      'Daily Puzzles',
      'Problem Solving',
    ],
  },
  {
    id: 'ugotit-contest-2025',
    title: 'Konkurs technologiczny UGotIT',
    description:
      'Masz pomysł na projekt technologiczny? UGotIT to konkurs dla entuzjastów IT, biznesu i AI z pulą nagród 42 000 zł. Stwórz PoC, zmierz się z realnymi wyzwaniami biznesowymi i skorzystaj ze wsparcia mentorów oraz AWS.',
    url: 'https://www.ugotit.pl',
    type: 'initiative',
    status: 'active',
    startDate: '2025-11-24',
    endDate: '2026-03-26',
    organization: 'UGotIT',
    impact:
      'Możliwość wdrożenia projektu, nagrody finansowe i rozwój kompetencji chmurowych oraz biznesowych.',
    ctaText: 'Zgłoś się',
    featured: true,
    image: 'https://ugotit.pl/static/svg/u-got-it-logo.svg',
    tags: ['Contest', 'AI', 'Business', 'AWS', 'Innovation'],
    pinned: true,
  },
];

const sortByNewest = (items: CommunityItem[]): CommunityItem[] => {
  return items.sort((a, b) => {
    // Check for pinned items first
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;

    const dateA = new Date(a.startDate || 0).getTime();
    const dateB = new Date(b.startDate || 0).getTime();
    return dateB - dateA; // Newest first
  });
};

export const getActiveCommunityItems = (): CommunityItem[] => {
  return sortByNewest(
    COMMUNITY_PARTICIPATION.filter((item) => item.status === 'active'),
  );
};

export const getFeaturedCommunityItems = (): CommunityItem[] => {
  return sortByNewest(
    COMMUNITY_PARTICIPATION.filter(
      (item) => item.featured && item.status === 'active',
    ),
  );
};

export const getCombinedCommunityItems = (): CommunityItem[] => {
  return sortByNewest([...COMMUNITY_PARTICIPATION]);
};

export const getNewestCommunityItems = (limit: number = 3): CommunityItem[] => {
  const allItems = getCombinedCommunityItems();

  // Filter featured items and slice (already sorted by getCombinedCommunityItems)
  return allItems.filter((item) => item.featured).slice(0, limit);
};
