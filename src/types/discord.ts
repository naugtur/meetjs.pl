/** Summary of the Discord guild widget returned by GET /api/discord. */
export interface DiscordServerData {
  id: string;
  name: string;
  member_count: number;
  invite_url: string;
}
