import { CITIES } from "@/content/cities";
import { PolandMap } from "./PolandMap";
import { getUpcomingEvents } from "@/utils/getUpcomingEvents";
import { Event } from "@/components/FeaturedEvents";

export const JoinUs = async () => {
	const events: Event[] | null = await getUpcomingEvents();

	return (
		<section
			className="flex w-full p-12 snap-y scroll-mt-16 flex-col justify-between px-2 lg:px-8 bg-slate-100/50 dark:bg-slate-700/10"
			id="joinus"
		>
			<div className="flex w-full flex-col gap-4 p-4">
				<h2 className="text-center text-3xl font-bold">Join Us</h2>
			</div>

			<div className="flex w-full flex-col p-4 md:flex-row max-w-7xl mx-auto">
				<div className="w-full md:w-1/2">
					<PolandMap cities={CITIES} events={events ?? []} />
				</div>
				<div className="w-full md:w-1/2 p-4">
					<p className="pb-6">
						<strong>meet.js</strong> is a family of local meetups all around Poland. They&apos;re for-community and by-community, non-commercial and organized by passionate individuals. Free to attend or for-charity. With the main goal of getting the Web Developers community together and facilitating knowledge exchange and camraderie.
					</p>
					<p className="pb-6">
						<strong>Click your city</strong> to learn how to join your local event as an attendee, spekaer or sponsor.
					</p>
					<p className="pb-6">
						If you don&apos;t see your city on the map, consider starting a local meet.js!
					</p>
				</div>
			</div>
		</section>
	);
};
