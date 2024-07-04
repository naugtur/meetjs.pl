import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { FaClock, FaLocationDot } from 'react-icons/fa6';
import type { Event } from '@/types/event';

interface EventCardProps {
	event: Event;
}

export const EventCard = ({ event }: EventCardProps) => {
	return (
		<Card className="max-w-xl">
			<CardHeader>
				<CardTitle>{event.name}</CardTitle>
				{/*<CardDescription>{event.description}</CardDescription>*/}
			</CardHeader>
			<CardContent>{event.description}</CardContent>
			<CardFooter className="flex flex-col items-end justify-between gap-4 md:flex-row">
				<div className="flex flex-col gap-4">
					<div className="mt-3 flex items-center gap-2 text-xl font-medium">
						<FaLocationDot />
						<span className="text-sm">{event.location.name}</span>
					</div>

					<div className="flex items-center gap-2">
						<FaClock />
						<div>
							<div className="text-sm font-medium">June 15, 2023</div>
							<div className="text-sm dark:text-gray-400">
								6:30 PM - 8:30 PM
							</div>
						</div>
					</div>
				</div>
				{event.eventLink && (
					<Link
						href={event.eventLink}
						target="_blank"
						className={buttonVariants({
							size: 'sm',
							className: 'w-full md:w-auto',
						})}
					>
						RSVP
					</Link>
				)}
			</CardFooter>
		</Card>
	);
};
