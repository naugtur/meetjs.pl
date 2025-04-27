'use client';
import { trackClientEvent } from '@/lib/analytics';

interface Props {
	href: string;
}

const trackDiscordInviteClick = () => trackClientEvent('click_discord_invite');

export const DiscordInviteLink = ({ href }: Props) => (
	<a
		onClick={trackDiscordInviteClick}
		href={href}
		target="_blank"
		rel="noopener noreferrer"
		className="block w-full transform rounded-md bg-gradient-to-r from-[#5865F2] to-[#4752C4] py-3 text-center font-medium text-white shadow-md transition-all duration-300 hover:scale-[1.02] hover:from-[#4752C4] hover:to-[#3a45a5]"
	>
		Join Server
	</a>
);
