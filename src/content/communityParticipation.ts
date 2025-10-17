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
    tags: [
      'React',
      'Conference',
      'Archive',
      'JavaScript',
      'Web Development',
    ],
  },
  {
    id: 'state-of-js-2025',
    title: 'State of JS 2025 Survey',
    description:
      'Help shape the future of JavaScript by sharing your experience with the latest tools, frameworks, and trends in the JS ecosystem.',
    url: 'https://survey.devographics.com/en-US/survey/state-of-js/2025',
    type: 'survey',
    status: 'active',
    startDate: '2025-01-01',
    endDate: '2025-02-28',
    organization: 'Devographics',
    impact:
      'Your input helps developers worldwide understand JS trends and make informed technology decisions.',
    ctaText: 'Take the Survey',
    featured: true,
    image: 'https://assets.devographics.com/surveys/js2025.png',
    tags: ['JavaScript', 'Survey', 'Community', 'Trends', 'Ecosystem'],
  },
];

export const getActiveCommunityItems = (): CommunityItem[] => {
  return COMMUNITY_PARTICIPATION.filter((item) => item.status === 'active');
};

export const getFeaturedCommunityItems = (): CommunityItem[] => {
  return COMMUNITY_PARTICIPATION.filter(
    (item) => item.featured && item.status === 'active',
  );
};

export const getCombinedCommunityItems = async (): Promise<CommunityItem[]> => {
  // Import dynamically to avoid issues with server-only code
  const { fetchDevographicsSurveys } = await import('@/lib/devographics');
  
  const devographicsSurveys = await fetchDevographicsSurveys();
  const manualItems = COMMUNITY_PARTICIPATION;

  // Combine and deduplicate (manual items take precedence)
  const manualIds = new Set(manualItems.map((item) => item.id));
  const autoSurveys = devographicsSurveys.filter(
    (survey) => !manualIds.has(survey.id),
  );

  return [...manualItems, ...autoSurveys];
};

export const getNewestCommunityItems = async (
  limit: number = 3,
): Promise<CommunityItem[]> => {
  const allItems = await getCombinedCommunityItems();
  
  // Sort by start date (newest first), then filter featured
  return allItems
    .filter((item) => item.featured)
    .sort((a, b) => {
      const dateA = new Date(a.startDate || 0).getTime();
      const dateB = new Date(b.startDate || 0).getTime();
      return dateB - dateA; // Newest first
    })
    .slice(0, limit);
};
