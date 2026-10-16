import type { DiscordServerData } from '~~/src/types/discord';

export type { DiscordServerData };

// https://discord.com/developers/docs/resources/guild#guild-widget-object
interface DiscordWidgetData {
  id: string;
  name: string;
  instant_invite: string;
  presence_count: number;
}

const ONE_HOUR = 60 * 60;

export const fetchDiscordServerData = async (
  serverId: string,
): Promise<DiscordServerData> => {
  const response = await fetch(
    `https://discord.com/api/guilds/${serverId}/widget.json`,
  );
  if (!response.ok) {
    throw new Error(`Discord Widget API error: ${response.status}`);
  }
  const widget = (await response.json()) as DiscordWidgetData;
  return {
    id: widget.id,
    name: widget.name,
    member_count: widget.presence_count,
    invite_url: widget.instant_invite,
  };
};

const cachedDiscord = defineCachedFunction(
  () => fetchDiscordServerData(useServerEnv().DISCORD_SERVER_ID),
  {
    name: 'discord-widget',
    maxAge: ONE_HOUR,
    swr: true,
    getKey: () => 'widget',
  },
);

/** Discord widget data, or null when the widget API is unavailable. */
export const getDiscordServerData =
  async (): Promise<DiscordServerData | null> => {
    try {
      return await cachedDiscord();
    } catch (error) {
      console.error('Error fetching Discord server data:', error);
      return null;
    }
  };
