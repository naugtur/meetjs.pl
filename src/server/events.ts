import 'server-only';
import { EventsSchema } from '@/types/event';
import { changeCityName } from '@/utils/changeCityName';
import { sortEventsByDate } from '@/utils/eventUtils';
import { MOCK_PAST_EVENTS, MOCK_UPCOMING_EVENTS } from '@/utils/eventsMock';
import { isDevelopment } from '@/utils/isDevelopment';

export const fetchUpcomingEvents = async (apiUrl: string) => {
  try {
    const upcomingEventsRes = await fetch(new URL(apiUrl));

    if (!upcomingEventsRes.ok) {
      const body = await upcomingEventsRes.text();
      if (isDevelopment()) {
        console.warn(
          `[fetchUpcomingEvents] API returned ${upcomingEventsRes.status} ${upcomingEventsRes.statusText}, using mock events for development.`,
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
        '[fetchUpcomingEvents] Failed to fetch or parse upcoming events, using mock data for development:',
        error,
      );
      return MOCK_UPCOMING_EVENTS.map(changeCityName);
    }

    console.error('Error fetching upcoming events:', error);
    return null;
  }
};

export const fetchPastEvents = async (apiUrl: string) => {
  try {
    const url = new URL(apiUrl);
    url.searchParams.set('old', '1');
    const pastEventsRes = await fetch(url);

    if (!pastEventsRes.ok) {
      const body = await pastEventsRes.text();
      if (isDevelopment()) {
        console.warn(
          `[fetchPastEvents] API returned ${pastEventsRes.status} ${pastEventsRes.statusText}, using mock past events for development.`,
        );
        return sortEventsByDate(MOCK_PAST_EVENTS.map(changeCityName), false);
      }
      throw new Error(
        `Events API returned ${pastEventsRes.status}: ${pastEventsRes.statusText}\n${body.slice(0, 200)}`,
      );
    }

    const pastEventsJson = await pastEventsRes.json();
    const data = EventsSchema.parse(pastEventsJson);

    const pastEvents = Object.values(data ?? {}).map(changeCityName);
    return sortEventsByDate(pastEvents, false);
  } catch (error) {
    if (isDevelopment()) {
      console.warn(
        '[fetchPastEvents] Failed to fetch or parse past events, using mock data for development:',
        error,
      );
      return sortEventsByDate(MOCK_PAST_EVENTS.map(changeCityName), false);
    }

    console.error('Error fetching past events:', error);
    return [];
  }
};
