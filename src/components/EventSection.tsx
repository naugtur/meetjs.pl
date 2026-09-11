import { createMemo, Show } from 'solid-js';
import { getUpcomingEvents } from '@/data/queries';
import { EventsList } from './EventsList';
import { ADDITIONAL_EVENTS } from '@/content/additionalEvents';
import { filterUpcomingEvents } from '@/utils/eventUtils';
import { useTranslate } from '@/i18n';

interface EventSectionProps {
  city: string;
}

export function EventSection(props: EventSectionProps) {
  const { t } = useTranslate();

  const apiEvents = createMemo(() => getUpcomingEvents());

  const cityEvents = () => {
    const allEvents = [...(apiEvents() || []), ...ADDITIONAL_EVENTS];
    return filterUpcomingEvents(allEvents).filter(
      (event) => event.city === props.city,
    );
  };

  return (
    <section class="flex flex-col items-center justify-center gap-12 pt-12">
      <h2 class="text-2xl font-bold">
        {t('events.upcoming_in_city')} {props.city}
      </h2>
      <Show
        when={cityEvents().length > 0}
        fallback={<p>{t('events.no_events', { city: props.city })}</p>}
      >
        <EventsList eventsList={cityEvents()} />
      </Show>
    </section>
  );
}
