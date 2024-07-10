import { z } from 'zod';

export interface Event {
	id: number;
	date_add: number;
	date: string;
	time: string;
	name: string;
	type: string;
	url: string;
	rsvp: string;
	city: string;
	address: string;
	serie: string;
}

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

export const EventsSchema = z.record(z.string(), EventSchema);
