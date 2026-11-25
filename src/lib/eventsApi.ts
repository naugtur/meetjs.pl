import { ADDITIONAL_EVENTS } from '@/content/additionalEvents';
import type { EventType } from '@/types/event';
import { normalizeFilterValue } from '@/utils/eventsFeed';
import { filterUpcomingEvents, isConferenceEvent } from '@/utils/eventUtils';
import { getUpcomingEvents } from '@/utils/getUpcomingEvents';

export { normalizeFilterValue };

export const PUBLIC_API_HEADERS: Record<string, string> = {
  'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
  'Access-Control-Allow-Origin': '*',
};

export const filterEventsByQuery = (
  events: EventType[],
  searchParams: URLSearchParams,
): { events: EventType[]; cityParam: string | null } => {
  const cityParam = searchParams.get('city')?.trim() || null;
  const typeParam = searchParams.get('type')?.trim() || null;

  let filtered = events;

  if (cityParam) {
    const normalizedCity = normalizeFilterValue(cityParam);
    if (normalizedCity === 'summit') {
      filtered = filtered.filter((event) => isConferenceEvent(event.type));
    } else {
      filtered = filtered.filter(
        (event) => normalizeFilterValue(event.city) === normalizedCity,
      );
    }
  }

  if (typeParam) {
    const normalizedType = normalizeFilterValue(typeParam);
    filtered = filtered.filter(
      (event) => normalizeFilterValue(event.type) === normalizedType,
    );
  }

  return { events: filtered, cityParam };
};

export const getPublicUpcomingEvents = async (
  searchParams: URLSearchParams,
): Promise<{ events: EventType[]; cityParam: string | null }> => {
  const apiEvents = await getUpcomingEvents();
  const merged = [...(apiEvents || []), ...ADDITIONAL_EVENTS];
  const upcoming = filterUpcomingEvents(merged);

  // Deduplicate by id in case an event exists in both sources
  const seen = new Set<number>();
  const uniqueUpcoming = upcoming.filter((event) => {
    if (seen.has(event.id)) return false;
    seen.add(event.id);
    return true;
  });

  return filterEventsByQuery(uniqueUpcoming, searchParams);
};
