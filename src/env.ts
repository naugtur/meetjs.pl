import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    EVENTS_API_URL: z.url(),
    SITE_URL: z.url(),
    DISCORD_SERVER_ID: z.string(),
    SPEAKERS_API_URL: z.url().optional(),
    SPEAKERS_API_TOKEN: z.string().optional(),
  },
  runtimeEnv: {
    EVENTS_API_URL: process.env.EVENTS_API_URL,
    SITE_URL: process.env.SITE_URL,
    DISCORD_SERVER_ID: process.env.DISCORD_SERVER_ID,
    SPEAKERS_API_URL: process.env.SPEAKERS_API_URL,
    SPEAKERS_API_TOKEN: process.env.SPEAKERS_API_TOKEN,
  },
});
