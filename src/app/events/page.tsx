import type { Metadata } from 'next';
import { env } from '@/env';
import { EventsAPIPartner } from '@/components/EventsAPIPartner';
import { FilterEvents } from '@/components/FilterEvents';
import { EventsSchema } from '@/types/event';
import { EmptyEventsAlert } from '@/components/EmptyEventsAlert';
import { EventsList } from '@/components/EventsList';
import { getUpcomingEvents } from '@/utils/getUpcomingEvents';
import { changeCityName } from '@/utils/changeCityName';

export const metadata: Metadata = {
	title: 'All Events | meet.js',
	description: 'All meet.js events in one place.',
};

const getPastEvents = async () => {
	try {
		const pastEventsRes = await fetch(`${env.EVENTS_API_URL}&old=1`, {
			cache: 'force-cache',
		});

		if (!pastEventsRes.ok) {
			throw new Error(`HTTP error! status: ${pastEventsRes.status}`);
		}

		const pastEventsJson = await pastEventsRes.json();
		const data = EventsSchema.parse(pastEventsJson);

		return Object.values(data ?? {}).map(changeCityName);
	} catch (error) {
		console.error('Error fetching past events:', error);
		return [];
	}
};

interface EventsPageProps {
	searchParams: Promise<{ city: string }>;
}

const EventsPage = async ({ searchParams }: EventsPageProps) => {
	const resolvedSearchParams = await searchParams;
	const city = resolvedSearchParams?.city ?? null;
	const upcomingEvents = await getUpcomingEvents();
	const pastEvents = await getPastEvents();

	return (
		<main className="flex min-h-screen flex-col items-center gap-12 p-5">
			<section className="flex flex-col items-center justify-center gap-4">
				<h1 className="text-4xl font-bold">All events</h1>
				<p className="text-center text-lg">
					All meet.js events in one place. Check past and upcoming meetups.
				</p>
				<EventsAPIPartner />
			</section>

			<section className="flex flex-col items-center justify-center gap-12">
				<h2 className="text-2xl font-bold">Upcoming events</h2>
				{upcomingEvents ? (
					<EventsList eventsList={upcomingEvents} />
				) : (
					<EmptyEventsAlert />
				)}
			</section>

			<section className="flex flex-col items-center justify-center gap-12">
				<h2 className="text-2xl font-bold">Past events</h2>
				<FilterEvents events={pastEvents} filter={city} />
			</section>
		</main>
	);
};

export default EventsPage;
