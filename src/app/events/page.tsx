import { EventCard } from '@/components/EventCard';
import type { Metadata } from 'next';
import { env } from '@/env';
import { EventsSchema } from '@/types/event';
import { EventsAPIPartner } from '@/components/EventsAPIPartner';

export const metadata: Metadata = {
	title: 'All Events | meet.js',
	description: 'All meet.js events in one place.',
};

const getFeaturedEvents = async () => {
	try {
		const eventsRes = await fetch(env.EVENTS_API_URL);

		const eventsJson = await eventsRes.json();

		return EventsSchema.parse(eventsJson);
	} catch (error) {
		return null;
	}
};

const EventsPage = async () => {
	const events = await getFeaturedEvents();

	return (
		<main className="flex min-h-screen flex-col items-center gap-12 p-24">
			<section className="flex flex-col items-center justify-center gap-4">
				<h1 className="text-4xl font-bold">All events</h1>
				<p className="text-center text-lg">
					All meet.js events in one place. Check past and upcoming meetups.
				</p>
				<EventsAPIPartner />
			</section>

			<section className="flex flex-col items-center justify-center gap-12">
				<h2 className="text-2xl font-bold">Upcoming events</h2>
				{events === null && (
					<p className="text-center font-bold">
						No found upcoming events :( Check back later.
					</p>
				)}
				{events !== null && (
					<ul className="flex flex-col gap-4">
						{Object.keys(events).map((key) => {
							const event = events[key];
							return (
								<li key={event.id}>
									<EventCard event={event} />
								</li>
							);
						})}
					</ul>
				)}
			</section>

			<section className="flex flex-col items-center justify-center gap-12">
				<h2 className="text-2xl font-bold">Past events</h2>
				<ul className="flex flex-col gap-4">
					{/*{events.map((event) => (*/}
					{/*	<li key={event.id}>*/}
					{/*		<EventCard event={event} />*/}
					{/*	</li>*/}
					{/*))}*/}
				</ul>
			</section>
		</main>
	);
};

export default EventsPage;
