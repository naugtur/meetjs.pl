import { cache } from 'react';
import { z } from 'zod';
import { env } from '@/env';

const ONE_HOUR = 3_600;
const DISCORD_TIMEOUT_MS = 5_000;

// https://discord.com/developers/docs/resources/guild#guild-widget-object
const DiscordWidgetSchema = z.object({
  id: z.string(),
  name: z.string(),
  instant_invite: z.string().nullable().optional(),
  presence_count: z.number(),
});

export interface DiscordServerData {
  id: string;
  name: string;
  member_count: number;
  invite_url: string | null;
}

export const getDiscordServerData = cache(
  async (): Promise<DiscordServerData | null> => {
    try {
      const serverId = env.DISCORD_SERVER_ID;

      const response = await fetch(
        `https://discord.com/api/guilds/${serverId}/widget.json`,
        {
          next: { revalidate: ONE_HOUR },
          signal: AbortSignal.timeout(DISCORD_TIMEOUT_MS),
        },
      );

      if (!response.ok) {
        throw new Error(`Discord Widget API error: ${response.status}`);
      }

      const json: unknown = await response.json();
      const widgetData = DiscordWidgetSchema.parse(json);

      return {
        id: widgetData.id,
        name: widgetData.name,
        member_count: widgetData.presence_count,
        invite_url: widgetData.instant_invite ?? null,
      };
    } catch (error) {
      console.error('Error fetching Discord server data:', error);
      return null;
    }
  },
);
