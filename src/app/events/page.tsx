import events from '@/content/events.json';
import { EventCard } from '@/components/EventCard';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'All Events | meet.js',
	description: 'All meet.js events in one place.',
};

const EventsPage = () => {
	return (
		<main className="flex min-h-screen flex-col items-center gap-12 p-24">
			<section className="flex flex-col items-center justify-center">
				<h1 className="text-4xl font-bold">All events</h1>
				<p className="text-center text-lg">
					All meet.js events in one place. Check past and upcoming meetups.
				</p>
			</section>

			<section className="flex flex-col items-center justify-center gap-12">
				<h2 className="text-2xl font-bold">Upcoming events</h2>
				{events.length === 0 && <p>No upcoming events. Check back later.</p>}
				<ul className="flex flex-col gap-4">
					{events.map((event) => (
						<li key={event.id}>
							<EventCard event={event} key={event.id} />
						</li>
					))}
					g
				</ul>
			</section>

			<section className="flex flex-col items-center justify-center gap-12">
				<h2 className="text-2xl font-bold">Past events</h2>
				<ul className="flex flex-col gap-4">
					{events.map((event) => (
						<li key={event.id}>
							<EventCard event={event} />
						</li>
					))}
				</ul>
			</section>
		</main>
	);
};

export default EventsPage;
