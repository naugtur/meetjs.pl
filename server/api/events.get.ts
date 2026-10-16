import { ADDITIONAL_EVENTS } from '~~/src/content/additionalEvents';
import {
  filterUpcomingEvents,
  sortEventsByDate,
} from '~~/src/utils/eventUtils';

/**
 * GET /api/events?when=upcoming|past[&additional=0]
 *
 * Upcoming: Crossweb events plus ADDITIONAL_EVENTS (unless additional=0),
 * filtered to today … +6 months with in-progress events first. Past:
 * Crossweb past events, newest first. Filtering runs per request, so "today"
 * never comes from the cache.
 */
export default defineEventHandler(async (event) => {
  const { when, additional } = getQuery(event);

  if (when === 'past') {
    return sortEventsByDate((await getEvents('past')) ?? [], false);
  }

  const upcoming = (await getEvents('upcoming')) ?? [];
  return filterUpcomingEvents(
    additional === '0' ? upcoming : [...upcoming, ...ADDITIONAL_EVENTS],
  );
});
