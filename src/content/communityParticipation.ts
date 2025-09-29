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
  tags: string[];
}

export const COMMUNITY_PARTICIPATION: CommunityItem[] = [
  {
    id: 'state-of-js-2025',
    title: 'State of JS 2025 Survey',
    description: 'Help shape the future of JavaScript by sharing your experience with the latest tools, frameworks, and trends in the JS ecosystem.',
    url: 'https://survey.devographics.com/en-US/survey/state-of-js/2025',
    type: 'survey',
    status: 'active',
    startDate: '2025-01-01',
    endDate: '2025-02-28',
    organization: 'Devographics',
    impact: 'Your input helps developers worldwide understand JS trends and make informed technology decisions.',
    ctaText: 'Take the Survey',
    featured: true,
    tags: ['JavaScript', 'Survey', 'Community', 'Trends', 'Ecosystem']
  }
];

export const getActiveCommunityItems = (): CommunityItem[] => {
  return COMMUNITY_PARTICIPATION.filter(item => item.status === 'active');
};

export const getFeaturedCommunityItems = (): CommunityItem[] => {
  return COMMUNITY_PARTICIPATION.filter(item => item.featured && item.status === 'active');
};
