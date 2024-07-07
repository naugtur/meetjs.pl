import { useEvents } from '@/hooks/useEvents';
import Link from 'next/link';
import { CiClock1, CiLocationOn } from 'react-icons/ci';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './card';

export const UpcomingEvents = () => {
	const { events, loadingEvents, loadingEventsError } = useEvents();

	const eventCards = () => (
		<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
			{events.map((event) => (
				<Card key={event.id}>
					<CardHeader>
						<CardTitle>{event.name}</CardTitle>
						<CardDescription>{event.description}</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="flex items-end justify-between gap-4">
							<div>
								<div className="flex gap-1">
									<CiClock1 />
									<div>
										<div className="text-sm font-medium">June 15, 2023</div>
										<div className="text-sm dark:text-gray-400">6:30 PM - 8:30 PM</div>
									</div>
								</div>

								<div className="mt-3 flex gap-1 text-xl font-medium">
									<CiLocationOn />
									<span className="text-sm">{event.location.name}</span>
								</div>
							</div>
							{event.eventLink && (
								<Link
									href={event.eventLink}
									className="inline-flex h-8 items-center justify-center rounded-md bg-gray-900 px-4 text-sm font-medium text-white shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
									prefetch={false}
								>
									RSVP
								</Link>
							)}
						</div>
					</CardContent>
				</Card>
			))}
		</div>
	);
	return (
		<section className="w-full py-12 md:py-24 lg:py-32">
			<div className="container mx-auto space-y-6 px-4 md:px-6">
				<div className="mx-auto max-w-3xl space-y-4 text-center">
					<h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Featured Upcoming Events</h2>
					<p className="md:text-xl">Check out some of our upcoming featured events.</p>
				</div>
				{loadingEventsError ? <p className="text-center font-semibold text-red-700">{loadingEventsError}</p> : null}
				{loadingEvents ? 'Getting events...' : eventCards()}
			</div>
		</section>
	);
};
