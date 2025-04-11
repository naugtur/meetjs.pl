import { cache } from 'react'

interface DiscordWidgetData {
  id: string;                // Server ID
  name: string;              // Server name
  instant_invite: string;    // Invite URL
  presence_count: number;    // Online members count
  members: Array<{           // Online members list
    id: string;
    username: string;
    status: string;
    avatar?: string;
    avatar_url?: string;
    game?: { name: string };
  }>;
  channels: Array<{
    id: string;
    name: string;
    position: number;
  }>;
}

interface DiscordServerData {
  approximate_presence_count?: number; // Online members
  approximate_member_count?: number;   // Total members
  name?: string;                       // Server name
  id?: string;                         // Server ID
  invite_url?: string;                 // Invite URL
}

/**
 * Gets Discord server information including member counts
 * 
 * This implementation uses the Discord Widget API to get real-time data.
 * The widget is enabled for the meet.js server.
 */
export const getDiscordServerData = cache(async (): Promise<DiscordServerData | null> => {
  try {
    const serverId = process.env.DISCORD_SERVER_ID;
    
    console.log('Fetching Discord widget data for server:', serverId);
    
    // Use the Discord Widget API to get server information
    const response = await fetch(`https://discord.com/api/guilds/${serverId}/widget.json`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });
    
    if (!response.ok) {
      throw new Error(`Discord Widget API error: ${response.status}`);
    }
    
    const widgetData: DiscordWidgetData = await response.json();
    
    return {
      id: widgetData.id,
      name: widgetData.name,
      approximate_presence_count: widgetData.presence_count,
      invite_url: widgetData.instant_invite,
    };
  } catch (error) {
    console.error('Error fetching Discord server data:', error);
    return null;
  }
});
