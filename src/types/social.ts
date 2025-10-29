export type SocialPlatform = 'mastodon' | 'twitter' | 'linkedin' | 'bluesky';

export interface SocialPost {
  id: string;
  platform: SocialPlatform;
  author: {
    name: string;
    username: string;
    avatar: string;
    profileUrl: string;
  };
  content: string;
  url: string;
  createdAt: string;
  metrics?: {
    likes?: number;
    reblogs?: number;
    replies?: number;
  };
  media?: {
    type: 'image' | 'video';
    url: string;
    previewUrl?: string;
  }[];
}

export interface MastodonStatus {
  id: string;
  created_at: string;
  content: string;
  url: string;
  account: {
    display_name: string;
    username: string;
    avatar: string;
    url: string;
  };
  favourites_count: number;
  reblogs_count: number;
  replies_count: number;
  media_attachments?: {
    type: string;
    url: string;
    preview_url?: string;
  }[];
}
