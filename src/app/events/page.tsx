import type { Metadata } from 'next';
import { env } from '@/env';
import { EventsAPIPartner } from '@/components/EventsAPIPartner';
import { FilterEvents } from '@/components/FilterEvents';
import { EventsSchema } from '@/types/event';
import { EmptyEventsAlert } from '@/components/EmptyEventsAlert';
import { EventsList } from '@/components/EventsList';
import { getUpcomingEvents } from '@/utils/getUpcomingEvents';
import { changeCityName } from '@/utils/changeCityName';
import { ADDITIONAL_EVENTS } from '@/content/additionalEvents';

export const metadata: Metadata = {
	title: 'All Events | meet.js',
	description: 'All meet.js events in one place.',
};

const getPastEvents = async () => {
	try {
		const url = new URL(env.EVENTS_API_URL);
		url.searchParams.set('old', '1');

		const pastEventsRes = await fetch(url, {
			next: { revalidate: 3600 }
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

	// Merge additional events with upcomingEvents
	const allUpcomingEvents = [
		...(upcomingEvents || []),
		...ADDITIONAL_EVENTS,
	];

	return (
		<main className="flex min-h-screen flex-col items-center gap-6 p-5 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
			<section className="flex flex-col items-center justify-center gap-6 w-full">
				<h1 className="text-4xl font-bold py-4">All events</h1>
				<p className="text-center text-lg">
					All meet.js events in one place. Check past and upcoming meetups.
				</p>
				<EventsAPIPartner />
			</section>

			<section className="flex flex-col items-center justify-center gap-6 w-full">
				<h2 className="text-2xl font-bold">Upcoming events</h2>
				{allUpcomingEvents.length > 0 ? (
					<FilterEvents events={allUpcomingEvents} filter={city} />
				) : (
					<EmptyEventsAlert />
				)}
			</section>

			<section className="flex flex-col items-center justify-center gap-6 w-full">
				<h2 className="text-2xl font-bold">Past events</h2>
				<FilterEvents events={pastEvents} filter={city} />
			</section>
		</main>
	);
};

export default EventsPage;
