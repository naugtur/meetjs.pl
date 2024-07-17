import { EventCard } from '@/components/EventCard';
import { EventType } from '@/types/event';

interface EventsListProps {
	eventsList: EventType[];
}

export const EventsList = ({ eventsList }: EventsListProps) => {
	return (
		<ul className="flex flex-col gap-4">
			{eventsList.map((event) => {
				return (
					<li key={event.id}>
						<EventCard event={event} />
					</li>
				);
			})}
		</ul>
	);
};
