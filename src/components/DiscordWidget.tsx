'use client';

import { Users } from 'lucide-react';
import { DiscordInviteLink } from './DiscordInviteLink';
import { useTranslate } from '@tolgee/react';

interface Props {
  name: string;
  membersCount: number;
  inviteUrl: string;
}

export const DiscordWidget = ({ name, membersCount, inviteUrl }: Props) => {
  const { t } = useTranslate();
  
  return (
    <div className="flex flex-col items-center">
      <div className="group relative mb-4 w-full max-w-md overflow-hidden rounded-lg bg-gradient-to-br from-[#2f3136] to-[#1e1f22] p-6 text-white shadow-xl transition-all duration-300 hover:shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-[#5865F2]/10 to-[#5865F2]/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

        <div className="relative">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h4 className="text-lg font-bold">{name}</h4>

              <p className="mt-1 text-sm text-gray-300">
                {t('discord_widget.connect_with_developers')}
              </p>
            </div>

            <UsersCount count={membersCount} />
          </div>

          <DiscordInviteLink href={inviteUrl} />
        </div>
      </div>
    </div>
  );
};

const UsersCount = ({ count }: { count: number }) =>
  !count ? null : (
    <div className="flex items-center gap-1 rounded-full bg-green-500/20 px-2 py-1 text-sm">
      <Users className="h-4 w-4" />
      <span className="text-center">{count} online</span>
    </div>
  );
