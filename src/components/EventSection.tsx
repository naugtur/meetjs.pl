import { getUpcomingEvents } from '@/utils/getUpcomingEvents';
import { EventsList } from './EventsList';
import { ADDITIONAL_EVENTS } from '@/content/additionalEvents';
import { getTranslate } from '@/tolgee/server';

interface EventSectionProps {
  city: string;
}

export async function EventSection({ city }: EventSectionProps) {
  const events = await getUpcomingEvents();
  const t = await getTranslate();
  
  // Merge API events with additional events for this city
  const extraEvents = ADDITIONAL_EVENTS.filter((event) => event.city === city);
  const cityEvents = [
    ...(events?.filter((event) => event.city === city) || []),
    ...extraEvents,
  ];

  return (
    <section className="flex flex-col items-center justify-center gap-12 pt-12">
      <h2 className="text-2xl font-bold">{t('events.upcoming_in_city')} {city}</h2>
      {cityEvents && cityEvents.length > 0 ? (
        <EventsList eventsList={cityEvents} />
      ) : (
        <p>{t('events.no_events', { city })}</p>
      )}
    </section>
  );
}
