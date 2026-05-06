import { z } from 'zod';

const SpeakerSchema = z.object({
  id: z.number(),
  name: z.string(),
  surname: z.string().nullable().default(''),
  slug: z.string(),
  image: z.string().optional(),
  events_count: z.number(),
  url: z.string(),
});

export const SpeakersSchema = z.array(SpeakerSchema);

export type SpeakerType = z.infer<typeof SpeakerSchema>;
