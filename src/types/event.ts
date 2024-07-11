import { z } from 'zod';

const EventSchema = z.object({
	id: z.number(),
	date_add: z.number(),
	date: z.string(),
	time: z.string(),
	name: z.string(),
	type: z.string(),
	url: z.string(),
	rsvp: z.string(),
	city: z.string(),
	address: z.string(),
	serie: z.string(),
});

export const EventsSchema = z.record(z.string(), EventSchema).nullable();

export type EventType = z.infer<typeof EventSchema>;
