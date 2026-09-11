import { Show } from 'solid-js';
import { Users } from '@/lib/lucide';
import { DiscordInviteLink } from './DiscordInviteLink';
import { useTranslate } from '@/i18n';

interface Props {
  name: string;
  membersCount: number;
  inviteUrl: string;
}

export const DiscordWidget = (props: Props) => {
  const { t } = useTranslate();

  return (
    <div class="flex flex-col items-center">
      <div class="group relative mb-4 w-full max-w-md overflow-hidden rounded-lg bg-gradient-to-br from-[#2f3136] to-[#1e1f22] p-6 text-white shadow-xl transition-all duration-300 hover:shadow-2xl">
        <div class="absolute inset-0 bg-gradient-to-r from-[#5865F2]/10 to-[#5865F2]/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

        <div class="relative">
          <div class="mb-4 flex items-center justify-between">
            <div>
              <h4 class="text-lg font-bold">{props.name}</h4>

              <p class="mt-1 text-sm text-gray-300">
                {t('discord_widget.connect_with_developers')}
              </p>
            </div>

            <UsersCount count={props.membersCount} />
          </div>

          <DiscordInviteLink href={props.inviteUrl} />
        </div>
      </div>
    </div>
  );
};

const UsersCount = (props: { count: number }) => (
  <Show when={props.count}>
    <div class="flex items-center gap-1 rounded-full bg-green-500/20 px-2 py-1 text-sm">
      <Users class="h-4 w-4" />
      <span class="text-center">{props.count} online</span>
    </div>
  </Show>
);
