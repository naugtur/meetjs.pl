import { getDiscordServerData } from '@/lib/discord';
import { MessagesSquare, Users } from 'lucide-react';

interface DiscordCommunityProps {
	discordData?: {
		name?: string;
		approximate_presence_count?: number;
		invite_url?: string;
	} | null;
	error?: string;
}

export const DiscordWidget = async () => {
	const { data, error } = await getDiscordServerData()
		.then((data) => ({ data, error: null }))
		.catch((e) => ({
			data: null,
			error: e instanceof Error ? e.message : 'Failed to load Discord data',
		}));

	if (error) return <ErrorMessage msg={error} />;
	if (!data) return <Loader />;

	return (
		<div className="flex flex-col items-center">
			<div className="group relative mb-4 w-full max-w-md overflow-hidden rounded-lg bg-gradient-to-br from-[#2f3136] to-[#1e1f22] p-6 text-white shadow-xl transition-all duration-300 hover:shadow-2xl">
				<div className="absolute inset-0 bg-gradient-to-r from-[#5865F2]/10 to-[#5865F2]/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

				<div className="relative z-10">
					<div className="mb-4 flex items-center justify-between">
						<div>
							<h4 className="text-lg font-bold">
								{data.name || 'MeetJS Community'}
							</h4>
							<p className="mt-1 text-sm text-gray-300">
								Connect with JavaScript developers
							</p>
						</div>
						{data.approximate_presence_count && (
							<div className="bg-green-500/20 flex items-center gap-1 rounded-full px-2 py-1 text-sm">
								<Users className="h-4 w-4" />
								<span>{data.approximate_presence_count} online</span>
							</div>
						)}
					</div>

					<a
						href={data.invite_url || 'https://discord.gg/C6hEh2R4'}
						target="_blank"
						rel="noopener noreferrer"
						className="block w-full transform rounded-md bg-gradient-to-r from-[#5865F2] to-[#4752C4] py-3 text-center font-medium text-white shadow-md transition-all duration-300 hover:scale-[1.02] hover:from-[#4752C4] hover:to-[#3a45a5]"
					>
						Join Server
					</a>
				</div>
			</div>
		</div>
	);
};

const ErrorMessage = ({ msg }: { msg: string }) => (
	<p className="text-red-500">Error loading Discord data: {msg}</p>
);

const Loader = () => (
	<p className="text-gray-500 dark:text-gray-400">
		Loading community information...
	</p>
);
