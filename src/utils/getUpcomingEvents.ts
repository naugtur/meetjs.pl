import { cacheLife } from 'next/cache';
import { env } from '@/env';
import { EventsSchema } from '@/types/event';
import { changeCityName } from '@/utils/changeCityName';
import { getMockUpcomingEvents } from '@/utils/eventsMock';
import { isDevelopment } from '@/utils/isDevelopment';

export const getUpcomingEvents = async () => {
  'use cache';
  const events = await fetchUpcomingEvents();
  // Retry soon after a failed response instead of caching it for a day
  if (events) {
    cacheLife('days');
  } else {
    cacheLife('minutes');
  }
  return events;
};

const fetchUpcomingEvents = async () => {
  try {
    const upcomingEventsRes = await fetch(new URL(env.EVENTS_API_URL));

    if (!upcomingEventsRes.ok) {
      const body = await upcomingEventsRes.text();
      if (isDevelopment()) {
        console.warn(
          `[getUpcomingEvents] API returned ${upcomingEventsRes.status} ${upcomingEventsRes.statusText}, using mock events for development.`,
        );
        return getMockUpcomingEvents().map(changeCityName);
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
      return getMockUpcomingEvents().map(changeCityName);
    }

    console.error('Error fetching upcoming events:', error);
    return null;
  }
};
