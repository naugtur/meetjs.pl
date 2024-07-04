import events from '@/content/events.json';
import { EventCard } from '@/components/EventCard';

const EventsPage = () => {
	return (
		<main className="flex min-h-screen flex-col items-center justify-between">
			<h1>All events</h1>
			{events.map((event) => (
				<EventCard event={event} key={event.id} />
			))}
		</main>
	);
};

export default EventsPage;
