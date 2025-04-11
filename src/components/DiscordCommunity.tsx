import { MessagesSquare, Users } from 'lucide-react';

interface DiscordCommunityProps {
  discordData?: {
    name?: string;
    approximate_presence_count?: number;
    invite_url?: string;
  } | null;
  error?: string;
}

export function DiscordCommunity({ discordData, error }: DiscordCommunityProps) {
  if (error) {
    return (
      <div className="mt-4 border-t pt-6">
        <h3 className="mb-4 flex items-center gap-2 text-xl font-semibold">
          <MessagesSquare className="h-5 w-5 text-[#5865F2]" />
          Join our Discord Community
        </h3>
        <p className="text-red-500">Error loading Discord data: {error}</p>
      </div>
    );
  }

  if (!discordData) {
    return (
      <div className="mt-4 border-t pt-6">
        <h3 className="mb-4 flex items-center gap-2 text-xl font-semibold">
          <MessagesSquare className="h-5 w-5 text-[#5865F2]" />
          Join our Discord Community
        </h3>
        <p className="text-gray-500 dark:text-gray-400">Loading community information...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <div className="relative overflow-hidden bg-gradient-to-br from-[#2f3136] to-[#1e1f22] text-white rounded-lg shadow-xl p-6 w-full max-w-md mb-4 transition-all duration-300 hover:shadow-2xl group">
        <div className="absolute inset-0 bg-gradient-to-r from-[#5865F2]/10 to-[#5865F2]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="font-bold text-lg">{discordData.name || 'MeetJS Community'}</h4>
              <p className="text-sm text-gray-300 mt-1">Connect with JavaScript developers</p>
            </div>
            {discordData.approximate_presence_count && (
              <div className="flex items-center gap-1 text-sm bg-green-500/20 px-2 py-1 rounded-full">
                <Users className="h-4 w-4" />
                <span>{discordData.approximate_presence_count} online</span>
              </div>
            )}
          </div>
          
          <a 
            href={discordData.invite_url || "https://discord.gg/C6hEh2R4"}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-gradient-to-r from-[#5865F2] to-[#4752C4] hover:from-[#4752C4] hover:to-[#3a45a5] text-white text-center py-3 rounded-md transition-all duration-300 font-medium transform hover:scale-[1.02] shadow-md"
          >
            Join Server
          </a>
        </div>
      </div>
    </div>
  );
}
