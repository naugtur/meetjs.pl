import { env } from '@/env';
import { EventsSchema } from '@/types/event';
import { changeCityName } from '@/utils/changeCityName';
import { MOCK_UPCOMING_EVENTS } from '@/utils/eventsMock';

const isDevelopment = () => process.env.NODE_ENV !== 'production';

export const getUpcomingEvents = async () => {
  try {
    const upcomingEventsRes = await fetch(new URL(env.EVENTS_API_URL), {
      next: { revalidate: 86400 },
    });

    if (!upcomingEventsRes.ok) {
      const body = await upcomingEventsRes.text();
      if (isDevelopment()) {
        console.warn(
          `[getUpcomingEvents] API returned ${upcomingEventsRes.status} ${upcomingEventsRes.statusText}, using mock events for development.`,
        );
        return MOCK_UPCOMING_EVENTS.map(changeCityName);
      }
      throw new Error(
        `Events API returned ${upcomingEventsRes.status}: ${upcomingEventsRes.statusText}\n${body.slice(0, 200)}`,
      );
    }

    const upcomingEventsJson = await upcomingEventsRes.json();
    const data = EventsSchema.parse(upcomingEventsJson);

    if (!data) {
      return null;
    }

    return Object.values(data).map(changeCityName);
  } catch (error) {
    if (isDevelopment()) {
      console.warn(
        '[getUpcomingEvents] Failed to fetch or parse upcoming events, using mock data for development:',
        error,
      );
      return MOCK_UPCOMING_EVENTS.map(changeCityName);
    }

    console.error('Error fetching upcoming events:', error);
    return null;
  }
};
