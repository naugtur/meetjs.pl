import { CommunityItem } from '@/content/communityParticipation';

interface DevographicsSurvey {
  id: string;
  name: string;
  year: number;
  status: string;
  imageUrl?: string;
  domain?: string;
}

const GRAPHQL_ENDPOINT = 'https://api.devographics.com/graphql';

const SURVEYS_QUERY = `
  query GetSurveys {
    surveys {
      id
      name
      year
      status
      imageUrl
      domain
    }
  }
`;

export async function fetchDevographicsSurveys(): Promise<CommunityItem[]> {
  try {
    const response = await fetch(GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: SURVEYS_QUERY,
      }),
      next: {
        revalidate: 86400, // Revalidate once per day (24 hours)
      },
    });

    if (!response.ok) {
      console.error('Failed to fetch Devographics surveys');
      return [];
    }

    const { data } = await response.json();
    const surveys = data?.surveys || [];

    // Filter for active surveys and convert to CommunityItem format
    return surveys
      .filter((survey: DevographicsSurvey) => survey.status === 'open')
      .map((survey: DevographicsSurvey) => ({
        id: `devographics-${survey.id}`,
        title: `${survey.name} ${survey.year} Survey`,
        description: `Help shape the future of ${survey.name.replace('State of ', '')} by sharing your experience with the latest tools, frameworks, and trends.`,
        url: survey.domain
          ? `https://${survey.domain}`
          : `https://survey.devographics.com/en-US/survey/${survey.id}/${survey.year}`,
        type: 'survey' as const,
        status: 'active' as const,
        startDate: `${survey.year}-01-01`,
        endDate: `${survey.year}-12-31`,
        organization: 'Devographics',
        impact:
          'Your input helps developers worldwide understand trends and make informed technology decisions.',
        ctaText: 'Take the Survey',
        featured: true,
        image: survey.imageUrl || `https://assets.devographics.com/surveys/${survey.id}${survey.year}.png`,
        tags: [survey.name.replace('State of ', ''), 'Survey', 'Community', 'Trends'],
      }));
  } catch (error) {
    console.error('Error fetching Devographics surveys:', error);
    return [];
  }
}
