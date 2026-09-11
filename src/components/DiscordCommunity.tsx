import { createMemo, Loading, Show } from 'solid-js';

import { getDiscordServerData } from '@/data/queries';
import { DiscordWidget } from './DiscordWidget';

const DISCORD_INVITE_LINK = 'https://discord.gg/8r9XKTeNW8';

export const DiscordCommunity = () => {
  const data = createMemo(async () => {
    try {
      return await getDiscordServerData();
    } catch (e) {
      return {
        error: e instanceof Error ? e.message : 'Failed to load Discord data',
      };
    }
  });

  return (
    <Loading
      fallback={
        <p class="text-gray-500 dark:text-gray-400">
          Loading community information...
        </p>
      }
    >
      <Show when={data()} keyed>
        {(result) =>
          'error' in result ? (
            <p class="text-red-500">
              Error loading Discord data: {result.error}
            </p>
          ) : (
            <DiscordWidget
              name={result.name || 'MeetJS Community'}
              membersCount={result.member_count || 0}
              inviteUrl={result.invite_url || DISCORD_INVITE_LINK}
            />
          )
        }
      </Show>
    </Loading>
  );
};
