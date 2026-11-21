import { getDiscordServerData } from '@/lib/discord';
import { DiscordWidget } from './DiscordWidget';

const DISCORD_INVITE_LINK = 'https://discord.gg/8r9XKTeNW8';
const FALLBACK_SERVER_NAME = 'meet.js Poland';

export const DiscordCommunity = async () => {
  const data = await getDiscordServerData();

  return (
    <DiscordWidget
      name={data?.name || FALLBACK_SERVER_NAME}
      membersCount={data?.member_count || 0}
      inviteUrl={data?.invite_url || DISCORD_INVITE_LINK}
    />
  );
};
