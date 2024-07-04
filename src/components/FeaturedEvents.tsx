import {
	Carousel,
	CarouselContent,
	CarouselItem,
} from '@/components/ui/carousel';
import { buttonVariants } from '@/components/ui/button';
import { EventCard } from '@/components/EventCard';
import events from '@/content/events.json';
import Link from 'next/link';

export const FeaturedEvents = () => {
	return (
		<section
			className="mx-auto flex w-full max-w-7xl snap-y scroll-mt-16 flex-col justify-between px-2 lg:px-8"
			id="events"
		>
			<div className="flex w-full flex-col gap-4 p-4">
				<h2 className="text-center text-3xl font-bold">
					Featured Upcoming Events
				</h2>
				<p className="text-center">
					Check out some of our upcoming featured events.
				</p>
				<Carousel>
					<CarouselContent>
						{events.map((event) => (
							<CarouselItem
								className="basis-full md:basis-1/2 lg:basis-1/3"
								key={event.id}
							>
								<EventCard event={event} />
							</CarouselItem>
						))}
					</CarouselContent>
				</Carousel>
				<div className="mx-auto">
					<Link href="/events" className={buttonVariants()}>
						All events
					</Link>
				</div>
			</div>
		</section>
	);
};
