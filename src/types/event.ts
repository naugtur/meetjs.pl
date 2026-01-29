import { z } from 'zod';

// Define the allowed event types
export const EventTypeEnum = z.enum([
  'Spotkanie',
  'Konferencja',
  'Meetup',
  'Conference',
  'Webinar',
  'Warsztaty',
]);

const EventSchema = z.object({
  id: z.number(),
  date_add: z.number(),
  date: z.string(),
  time: z.string().default(''),
  name: z.string(),
  type: EventTypeEnum,
  url: z.string(),
  rsvp: z.string(),
  city: z.string().default(''),
  address: z.string().nullable(),
  image: z.string().default(''),
  serie: z.string(),
  topic: z.array(z.string()).default([]),
});

export const EventsSchema = z.record(z.string(), EventSchema).nullable();

export type EventType = z.infer<typeof EventSchema>;
export type EventsType = z.infer<typeof EventsSchema>;
export type EventTypeName = z.infer<typeof EventTypeEnum>;
