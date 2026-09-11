import { For, Show } from 'solid-js';
import { badgeVariants } from '@/components/ui/badge';
import { CITIES } from '@/content/cities';
import { EventType } from '@/types/event';
import { clsx } from 'clsx';
import { EventsList } from '@/components/EventsList';
import { useTranslate } from '@/i18n';
import { isConferenceEvent } from '@/utils/eventUtils';

interface FilterEventsProps {
  events: EventType[] | null;
  filter: string | null;
}

export const FilterEvents = (props: FilterEventsProps) => {
  const { t } = useTranslate();

  const linkClassNames = (city: string | null) =>
    clsx(
      badgeVariants({
        variant: props.filter === city ? 'default' : 'outline',
      }),
      props.filter === city ? '' : 'bg-transparent',
      'hover:text-black hover:bg-gray-100 hover:border-purple',
    );

  const filteredEvents = () => {
    const events = props.events;
    if (!events) return [];
    if (props.filter === 'summit')
      return events.filter((event) => isConferenceEvent(event.type));
    if (props.filter)
      return events.filter((event) => event.city === props.filter);
    return events;
  };

  return (
    <Show
      when={props.events}
      fallback={<div>{t('events_page.filter.events_not_found')}</div>}
    >
      {(events) => (
        <>
          <div class="flex flex-col gap-2">
            <p class="text-center text-lg">
              {t('events_page.filter.filter_by_city')}
            </p>
            <div class="flex max-w-4xl flex-wrap justify-center gap-2">
              <a href="/events" class={linkClassNames(null)}>
                {t('events_page.filter.all')} ({events().length})
              </a>
              <a href="/events?city=summit" class={linkClassNames('summit')}>
                🎤 Summit (
                {
                  events().filter((event) => isConferenceEvent(event.type))
                    .length
                }
                )
              </a>
              <a href="/events?city=On-line" class={linkClassNames('On-line')}>
                {t('events_page.filter.online')} (
                {events().filter((event) => event.city === 'On-line').length})
              </a>
              <For each={CITIES}>
                {(city) => (
                  <a
                    href={`/events?city=${encodeURIComponent(city.name)}`}
                    class={linkClassNames(city.name)}
                  >
                    {city.name} (
                    {
                      events().filter((event) => event.city === city.name)
                        .length
                    }
                    )
                  </a>
                )}
              </For>
            </div>
          </div>

          <EventsList eventsList={filteredEvents()} />
        </>
      )}
    </Show>
  );
};
