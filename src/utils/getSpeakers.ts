import { env } from '@/env';
import { SpeakersSchema, SpeakerType } from '@/types/speaker';

export const getSpeakers = async (): Promise<SpeakerType[]> => {
  try {
    const res = await fetch(env.SPEAKERS_API_URL, {
      headers: {
        Authorization: `Basic ${env.SPEAKERS_API_TOKEN}`,
      },
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const json = await res.json();
    return SpeakersSchema.parse(json);
  } catch (error) {
    console.error('Error fetching speakers:', error);
    return [];
  }
};
