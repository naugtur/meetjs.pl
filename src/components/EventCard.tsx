import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { FaClock, FaLocationDot } from 'react-icons/fa6';
import type { EventType } from '@/types/event';

interface EventCardProps {
	event: EventType;
}

export const EventCard = ({ event }: EventCardProps) => {
	const nowTimestamp = Date.now();

	const eventDateTimeStamp = new Date(
		event.date.split('.').reverse().join(','),
	).getTime();

	return (
		<Card className="flex min-h-80 max-w-xl flex-col justify-between md:min-h-60">
			<CardHeader>
				<CardTitle>
					<Link href={event.url}>{event.name}</Link>
				</CardTitle>
			</CardHeader>
			<CardContent className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
				<div className="flex flex-col gap-4">
					<div className="mt-3 flex items-center gap-1 text-xl font-medium">
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
				{nowTimestamp < eventDateTimeStamp && event.rsvp && (
					<Link
						href={event.rsvp}
						target="_blank"
						className={buttonVariants({
							size: 'sm',
							className:
								'w-full bg-purple text-black hover:bg-purple/80 md:w-auto dark:bg-green dark:hover:bg-green/80',
						})}
						aria-label={`RSVP for ${event.name}`}
					>
						RSVP
					</Link>
				)}
			</CardContent>
		</Card>
	);
};
