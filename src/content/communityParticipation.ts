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
];

const sortByNewest = (items: CommunityItem[]): CommunityItem[] => {
  return items.sort((a, b) => {
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
