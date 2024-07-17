'use client';

import { useQueryState } from 'nuqs';
import { badgeVariants } from '@/components/ui/badge';
import { CITIES } from '@/content/cities';
import { EventCard } from '@/components/EventCard';
import { Button } from '@/components/ui/button';
import { EventsType } from '@/types/event';
import { clsx } from 'clsx';
import { Suspense } from 'react';

interface FilterEventsProps {
	events: EventsType;
}

const FilterEventsContent = ({ events }: FilterEventsProps) => {
	const [cityFilter, setCity] = useQueryState('city');

	return (
		<>
			<div className="flex flex-col gap-2">
				<p>Filter events by city:</p>
				<div className="flex gap-2">
					<Button
						size="sm"
						className={clsx(badgeVariants({ variant: 'default' }))}
						onClick={() => setCity(null)}
					>
						All ({events !== null ? Object.keys(events).length : 0})
					</Button>
					{CITIES.map((city) => {
						return (
							<Button
								size="sm"
								className={clsx(
									badgeVariants({
										variant: cityFilter === city.name ? 'default' : 'outline',
									}),
									cityFilter === city.name ? '' : 'bg-transparent',
								)}
								key={city.name}
								onClick={() => setCity(city.name)}
							>
								{city.name}
							</Button>
						);
					})}
				</div>
			</div>

			{events !== null && (
				<ul className="flex flex-col gap-4">
					{Object.keys(events).map((key) => {
						const event = events[key];

						if (cityFilter && event.city !== cityFilter) {
							return null;
						}

						return (
							<li key={event.id}>
								<EventCard event={event} />
							</li>
						);
					})}
				</ul>
			)}
		</>
	);
};

export const FilterEvents = ({ events }: FilterEventsProps) => {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<FilterEventsContent events={events} />
		</Suspense>
	);
};
