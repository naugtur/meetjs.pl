import 'server-only';

export interface DiscordServerData {
  id: string;
  name: string;
  member_count: number;
  invite_url: string;
}

export const fetchDiscordServerData = async (
  serverId: string,
): Promise<DiscordServerData | null> => {
  try {
    const response = await fetch(
      `https://discord.com/api/guilds/${serverId}/widget.json`,
    );

    if (!response.ok) {
      throw new Error(`Discord Widget API error: ${response.status}`);
    }

    const widgetData: DiscordWidgetData = await response.json();

    return {
      id: widgetData.id,
      name: widgetData.name,
      member_count: widgetData.presence_count,
      invite_url: widgetData.instant_invite,
    };
  } catch (error) {
    console.error('Error fetching Discord server data:', error);
    return null;
  }
};

// https://discord.com/developers/docs/resources/guild#guild-widget-object
interface DiscordWidgetData {
  id: string; // Server ID
  name: string; // Server name
  instant_invite: string; // Invite URL
  presence_count: number; // Online members count
  members: DiscordMemeber[];
  channels: DiscordChannel[];
}

interface DiscordMemeber {
  id: string;
  username: string;
  status: string;
  avatar?: string;
  avatar_url?: string;
  game?: { name: string };
}

interface DiscordChannel {
  id: string;
  name: string;
  position: number;
}
