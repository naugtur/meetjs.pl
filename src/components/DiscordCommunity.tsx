import { getDiscordServerData } from '@/lib/discord';
import { DiscordWidget } from './DiscordWidget';

const DISCORD_INVITE_LINK = 'https://discord.gg/C6hEh2R4';

export const DiscordCommunity = async () => {
	const { data, error } = await getDiscordServerData()
		.then((data) => ({ data, error: null }))
		.catch((e) => ({
			data: null,
			error: e instanceof Error ? e.message : 'Failed to load Discord data',
		}));

	if (error)
		return <p className="text-red-500">Error loading Discord data: {error}</p>;

	if (!data)
		return (
			<p className="text-gray-500 dark:text-gray-400">
				Loading community information...
			</p>
		);

	return (
		<DiscordWidget
			name={data.name || 'MeetJS Community'}
			membersCount={data.member_count || 0}
			inviteUrl={data.invite_url || DISCORD_INVITE_LINK}
		/>
	);
};
