'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/card';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { CiLocationOn, CiClock1 } from 'react-icons/ci';

const Events = () => {
	const [events, setEvents] = useState<OrgEvent[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		getOrgEvents();
	}, []);

	const getOrgEvents = async () => {
		setError(null);
		setLoading(true);
		try {
			const response = await fetch('/events.json');
			const availableEvents: OrgEvent[] = await response.json();
			setEvents(availableEvents);
		} catch (e: any) {
			console.error(`Failed to fetch events ${e.message ?? e}`);
			setError('List of events is currently unavailable, please try again later.');
		}
		setLoading(false);
	};

	const eventCards = () => (
		<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
			{events.map((event) => (
				<Card>
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
									className="hover:bg-primary/90 focus-visible:ring-ring inline-flex h-8 items-center justify-center rounded-md bg-gray-900 px-4 text-sm font-medium text-white shadow transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50"
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
				{error ? <p className="text-center font-semibold text-red-700">{error}</p> : null}
				{loading ? 'Getting events...' : eventCards()}
			</div>
		</section>
	);
};

export default Events;
