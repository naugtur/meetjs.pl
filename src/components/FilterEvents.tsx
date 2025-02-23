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
	const linkClassNames = (city: string | null) =>
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

	const filteredEvents = filter
		? events.filter((event) => event.city === filter)
		: events;

	return (
		<>
			<div className="flex flex-col gap-2">
				<p className="text-lg text-center">Filter events by city</p>
				<div className="flex max-w-4xl flex-wrap justify-center gap-2">
					<Link
						href={{ pathname: '/events' }}
						scroll={false}
						replace
						className={linkClassNames(null)}
					>
						All ({events.length})
					</Link>
					<Link
						href={{
							pathname: '/events',
							query: {
								city: 'On-line',
							},
						}}
						replace
						scroll={false}
						className={linkClassNames('On-line')}
					>
						On-line ({events.filter((event) => event.city === 'On-line').length}
						)
					</Link>
					{CITIES.map((city) => {
						return (
							<Link
								href={{
									pathname: '/events',
									query: { city: city.name },
								}}
								replace
								scroll={false}
								className={linkClassNames(city.name)}
								key={city.name}
							>
								{city.name} (
								{events.filter((event) => event.city === city.name).length})
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
