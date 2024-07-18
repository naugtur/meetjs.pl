import { badgeVariants } from '@/components/ui/badge';
import { CITIES } from '@/content/cities';
import { EventType } from '@/types/event';
import { clsx } from 'clsx';
import { Suspense } from 'react';
import { EventsList } from '@/components/EventsList';
import Link from 'next/link';

interface FilterEventsProps {
	events: EventType[] | null;
	filter: string | null;
}

const FilterEventsContent = ({ events, filter }: FilterEventsProps) => {
	const buttonClassNames = (city: string | null) =>
		clsx(
			badgeVariants({
				variant: filter === city ? 'default' : 'outline',
			}),
			filter === city ? '' : 'bg-transparent',
			'hover:text-black hover:bg-gray-100 hover:border-purple',
		);

	if (!events) {
		return <div>Events not found</div>;
	}

	let city;

	switch (filter) {
		case 'Bielsko-Biała':
			city = 'Bielsko Biała';
			break;
		case 'Gdańsk':
			city = 'Trójmiasto';
			break;
		default:
			city = filter;
	}

	const filteredEvents = city
		? events.filter((event) => event.city === city)
		: events;

	return (
		<>
			<div className="flex flex-col gap-2">
				<p>Filter events by city:</p>
				<div className="flex gap-2">
					<Link
						href={{ pathname: '/events' }}
						replace
						className={buttonClassNames(null)}
					>
						All ({events.length})
					</Link>
					{CITIES.map((city) => {
						return (
							<Link
								href={{
									pathname: '/events',
									query: { city: city.name },
								}}
								replace
								className={buttonClassNames(city.name)}
								key={city.name}
							>
								{city.name}
							</Link>
						);
					})}
				</div>
			</div>

			{filteredEvents !== null && <EventsList eventsList={filteredEvents} />}
		</>
	);
};

export const FilterEvents = ({ events, filter }: FilterEventsProps) => {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<FilterEventsContent events={events} filter={filter} />
		</Suspense>
	);
};
