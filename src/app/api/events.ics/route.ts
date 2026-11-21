import {
  getPublicUpcomingEvents,
  normalizeFilterValue,
  PUBLIC_API_HEADERS,
} from '@/lib/eventsApi';
import { buildEventsIcal } from '@/lib/ical';

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const { events, cityParam } = await getPublicUpcomingEvents(searchParams);

  const safeSlug = cityParam
    ? normalizeFilterValue(cityParam).replace(/[^a-z0-9]/g, '')
    : '';
  const calendarName = cityParam
    ? `meet.js ${cityParam} Events`
    : 'meet.js Poland Events';
  const filename = safeSlug
    ? `meetjs-${safeSlug}-events.ics`
    : 'meetjs-events.ics';

  const body = buildEventsIcal(events, { calendarName });

  return new Response(body, {
    headers: {
      ...PUBLIC_API_HEADERS,
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': `inline; filename="${filename}"`,
    },
  });
};
