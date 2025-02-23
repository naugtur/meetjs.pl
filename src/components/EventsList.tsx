import { EventCard } from '@/components/EventCard';
import { EventType } from '@/types/event';

interface EventsListProps {
	eventsList: EventType[];
}

export const EventsList = ({ eventsList }: EventsListProps) => {
	return (
		<ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 w-full">
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
