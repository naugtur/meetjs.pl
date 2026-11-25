import { getPublicUpcomingEvents, PUBLIC_API_HEADERS } from '@/lib/eventsApi';
import { buildEventsIcal } from '@/lib/ical';
import { getIcsFilename } from '@/utils/eventsFeed';

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const { events, cityParam } = await getPublicUpcomingEvents(searchParams);

  const calendarName = cityParam
    ? `meet.js ${cityParam} Events`
    : 'meet.js Poland Events';
  const filename = getIcsFilename(cityParam);

  const body = buildEventsIcal(events, { calendarName });

  return new Response(body, {
    headers: {
      ...PUBLIC_API_HEADERS,
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': `inline; filename="${filename}"`,
    },
  });
};
