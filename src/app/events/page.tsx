import { EventCard } from '@/components/EventCard';
import type { Metadata } from 'next';
import { env } from '@/env';
import { EventsSchema } from '@/types/event';
import { EventsAPIPartner } from '@/components/EventsAPIPartner';

export const metadata: Metadata = {
	title: 'All Events | meet.js',
	description: 'All meet.js events in one place.',
};

const getUpcomingEvents = async () => {
	try {
		const upcomingEventsRes = await fetch(env.EVENTS_API_URL);

		const upcomingEventsJson = await upcomingEventsRes.json();

		return EventsSchema.parse(upcomingEventsJson);
	} catch (error) {
		console.log(error);
		return null;
	}
};

const getPastEvents = async () => {
	try {
		const pastEventsRes = await fetch(`${env.EVENTS_API_URL}&old=1`);

		const pastEventsJson = await pastEventsRes.json();

		return EventsSchema.parse(pastEventsJson);
	} catch (error) {
		console.log(error);
		return null;
	}
};

const EventsPage = async () => {
	const upcomingEvents = await getUpcomingEvents();
	const pastEvents = await getPastEvents();

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
				{upcomingEvents === null && (
					<p className="text-center font-bold">
						No found upcoming events :( Check back later.
					</p>
				)}
				{upcomingEvents !== null && (
					<ul className="flex flex-col gap-4">
						{Object.keys(upcomingEvents).map((key) => {
							const event = upcomingEvents[key];
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
				{pastEvents !== null && (
					<ul className="flex flex-col gap-4">
						{Object.keys(pastEvents).map((key) => {
							const event = pastEvents[key];
							return (
								<li key={event.id}>
									<EventCard event={event} />
								</li>
							);
						})}
					</ul>
				)}
			</section>
		</main>
	);
};

export default EventsPage;
