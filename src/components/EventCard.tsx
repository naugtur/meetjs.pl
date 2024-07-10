import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { FaClock, FaLocationDot } from 'react-icons/fa6';
import type { EventType } from '@/types/event';

interface EventCardProps {
	event: EventType;
}

export const EventCard = ({ event }: EventCardProps) => {
	return (
		<Card className="max-w-xl">
			<CardHeader>
				<CardTitle>
					<Link href={event.url}>{event.name}</Link>
				</CardTitle>
			</CardHeader>
			<CardFooter className="flex flex-col items-end justify-between gap-4 md:flex-row">
				<div className="flex flex-col gap-4">
					<div className="mt-3 flex items-center gap-2 text-xl font-medium">
						<FaLocationDot />
						<span className="text-sm">
							{event.address ? `${event.address}, ${event.city}` : event.city}
						</span>
					</div>

					<div className="flex items-center gap-2">
						<FaClock />
						<div>
							<div className="text-sm font-medium">{event.date}</div>
							<div className="text-sm dark:text-gray-400">{event.time}</div>
						</div>
					</div>
				</div>
				{event.rsvp && (
					<Link
						href={event.rsvp}
						target="_blank"
						className={buttonVariants({
							size: 'sm',
							className:
								'w-full bg-purple text-black hover:bg-purple/80 md:w-auto dark:bg-green dark:hover:bg-green/80',
						})}
					>
						RSVP
					</Link>
				)}
			</CardFooter>
		</Card>
	);
};
