import { getPublicUpcomingEvents, PUBLIC_API_HEADERS } from '@/lib/eventsApi';

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const { events } = await getPublicUpcomingEvents(searchParams);

  return Response.json(
    {
      updatedAt: new Date().toISOString(),
      count: events.length,
      events,
    },
    {
      headers: PUBLIC_API_HEADERS,
    },
  );
};
