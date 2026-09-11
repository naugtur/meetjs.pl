import { For } from 'solid-js';
import { EventCard } from '@/components/EventCard';
import { EventType } from '@/types/event';

interface EventsListProps {
  eventsList: EventType[];
}

export const EventsList = (props: EventsListProps) => {
  return (
    <ul class="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      <For each={props.eventsList}>
        {(event) => (
          <li>
            <EventCard event={event} />
          </li>
        )}
      </For>
    </ul>
  );
};
