import { z } from 'zod';

const ServerEnvSchema = z.object({
  EVENTS_API_URL: z.string().url(),
  SITE_URL: z.string().url(),
  DISCORD_SERVER_ID: z.string().min(1),
  SPEAKERS_API_URL: z.string().url().optional(),
  SPEAKERS_API_TOKEN: z.string().optional(),
});

export type ServerEnv = z.infer<typeof ServerEnvSchema>;

let serverEnv: ServerEnv | undefined;

/**
 * Validated server configuration. The variable names of the Next.js site are
 * read at runtime (like process.env reads in Next.js); `NUXT_*` runtime config
 * values act as fallback.
 */
export const useServerEnv = (): ServerEnv => {
  if (serverEnv) return serverEnv;
  const config = useRuntimeConfig();
  const pick = (...values: (string | undefined)[]) =>
    values.find((value) => value !== undefined && value !== '');
  serverEnv = ServerEnvSchema.parse({
    EVENTS_API_URL: pick(process.env.EVENTS_API_URL, config.eventsApiUrl),
    SITE_URL: pick(process.env.SITE_URL, config.public.siteUrl),
    DISCORD_SERVER_ID: pick(
      process.env.DISCORD_SERVER_ID,
      config.discordServerId,
    ),
    SPEAKERS_API_URL: pick(process.env.SPEAKERS_API_URL, config.speakersApiUrl),
    SPEAKERS_API_TOKEN: pick(
      process.env.SPEAKERS_API_TOKEN,
      config.speakersApiToken,
    ),
  });
  return serverEnv;
};
