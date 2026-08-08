import { env } from '@/env';
import { EventsSchema } from '@/types/event';
import { changeCityName } from '@/utils/changeCityName';

export const getUpcomingEvents = async () => {
  try {
    const upcomingEventsRes = await fetch(new URL(env.EVENTS_API_URL), {
      next: { revalidate: 86400 },
    });

    if (!upcomingEventsRes.ok) {
      throw new Error(
        `Events API returned ${upcomingEventsRes.status}: ${upcomingEventsRes.statusText}`,
      );
    }

    const upcomingEventsJson = await upcomingEventsRes.json();
    const data = EventsSchema.parse(upcomingEventsJson);

    if (!data) {
      return null;
    }

    return Object.values(data).map(changeCityName);
  } catch (error) {
    console.error('Error fetching upcoming events:', error);
    return null;
  }
};
