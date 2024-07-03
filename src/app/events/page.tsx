'use client';

import Link from 'next/link';
import { ScriptProps } from 'next/script';
import { useEffect, useState } from 'react';

interface OrgEvent {
	id: string;
	name: string;
	description: string;
	dateStart: string;
	dateEnd: string;
	location: Location;
	organizer: Organizer;
	eventLink: string;
}

interface Location {
	name: string;
	cords: {
		lat: number;
		lon: number;
	};
}

interface Organizer {
	name: string;
	email: string;
}

const Card = (props: ScriptProps) => {
	return <div className="rounded-2xl border border-gray-500 bg-white p-4 text-black">{props.children}</div>;
};

const CardHeader = (props: ScriptProps) => {
	return <div className="">{props.children}</div>;
};

const CardTitle = (props: ScriptProps) => {
	return <div className="text-2xl font-semibold">{props.children}</div>;
};

const CardDescription = (props: ScriptProps) => {
	return <div className="text-gray-400">{props.children}</div>;
};

const CardContent = (props: ScriptProps) => {
	return <div className="mt-6">{props.children}</div>;
};

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
						<div className="flex items-center justify-between">
							<div>
								<div className="text-sm font-medium">June 15, 2023</div>
								<div className="text-sm dark:text-gray-400">6:30 PM - 8:30 PM</div>
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
