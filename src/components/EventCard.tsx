import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { FaClock, FaLocationDot } from 'react-icons/fa6';
import type { EventType } from '@/types/event';
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";

interface EventCardProps {
	event: EventType;
}

export const EventCard = ({ event }: EventCardProps) => {
	const now = new Date();
	const [day, month, year] = event.date.split('.');
	const [hours, minutes] = event.time.split(':');

	// Create date in local timezone
	const eventDate = new Date(
		+year,
		+month - 1,
		+day,
		+hours,
		+minutes
	);
	const isUpcoming = now < eventDate;

	return (
		<Card className="group flex min-h-80 max-w-xl flex-col justify-between transition-all hover:shadow-lg md:min-h-60">
			<CardHeader>
				<div className="flex items-start justify-between gap-2">
					<CardTitle>
						<Link href={event.url} className="hover:text-purple transition-colors">
							{event.name}
						</Link>
					</CardTitle>
				</div>
				<p className="text-sm text-muted-foreground">
					{formatDistanceToNow(eventDate)}
				</p>
			</CardHeader>

			<CardContent className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
				<div className="flex flex-col gap-4">
					<div className="mt-3 flex items-center gap-2 text-xl font-medium">
						<FaLocationDot className="text-purple" />
						<span className="text-sm hover:underline cursor-pointer">
							{event.address && event.city
								? `${event.address}, ${event.city}`
								: event.city || event.address || 'Location TBA'}
						</span>
					</div>

					<div className="flex items-center gap-2">
						<FaClock className="text-purple" />
						<div>
							<div className="text-sm font-medium">{event.date}</div>
							<div className="text-sm text-muted-foreground">{event.time}</div>
						</div>
					</div>
				</div>

				{isUpcoming && event.rsvp && (
					<Link
						href={event.rsvp}
						target="_blank"
						className={cn(
							buttonVariants({
								size: "sm",
							}),
							"w-full bg-purple text-white hover:bg-purple/90 md:w-auto dark:bg-green dark:hover:bg-green/90 transition-colors"
						)}
					>
						RSVP
					</Link>
				)}
			</CardContent>
		</Card>
	);
};
