import { env } from '@/env';
import { EventsSchema } from '@/types/event';

export const getUpcomingEvents = async () => {
	try {
		const upcomingEventsRes = await fetch(env.EVENTS_API_URL, {
			cache: 'force-cache',
		});

		const upcomingEventsJson = await upcomingEventsRes.json();
		const data = EventsSchema.parse(upcomingEventsJson);

		if (!data) {
			return null;
		}

		return Object.values(data);
	} catch (error) {
		console.log(error);
		return null;
	}
};
