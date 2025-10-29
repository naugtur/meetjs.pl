import { SocialPost, MastodonStatus } from '@/types/social';
import { BskyAgent } from '@atproto/api';

/**
 * Social Feed Configuration
 * 
 * Currently Active:
 * - ✅ Mastodon (no API key needed)
 * 
 * To Enable Additional Platforms:
 * - ⏳ Bluesky: Add BLUESKY_HANDLE and BLUESKY_APP_PASSWORD to .env.local
 *   Create app password at https://bsky.app/settings/app-passwords
 * - ⏳ Twitter/X: Add TWITTER_BEARER_TOKEN to .env.local
 * - ⏳ LinkedIn: Add LINKEDIN_ACCESS_TOKEN to .env.local
 * 
 * See docs/SOCIAL_FEED_SETUP.md for detailed setup instructions
 */

const MASTODON_INSTANCES = [
  'mastodon.social',
  'fosstodon.org',
  'mas.to',
];

/**
 * Fetches posts with #meetjs hashtag from all configured social platforms
 */
export async function fetchSocialPosts(limit: number = 6): Promise<SocialPost[]> {
  const allPosts: SocialPost[] = [];

  // Fetch from Mastodon (always available)
  const mastodonPosts = await fetchMastodonPosts(limit);
  allPosts.push(...mastodonPosts);

  // Fetch from Bluesky if credentials are configured
  if (process.env.BLUESKY_HANDLE && process.env.BLUESKY_APP_PASSWORD) {
    const blueskyPosts = await fetchBlueskyPosts(limit);
    allPosts.push(...blueskyPosts);
  }

  // Fetch from Twitter/X if API key is configured
  if (process.env.TWITTER_BEARER_TOKEN) {
    const twitterPosts = await fetchTwitterPosts(limit);
    allPosts.push(...twitterPosts);
  }

  // Fetch from LinkedIn if API key is configured
  if (process.env.LINKEDIN_ACCESS_TOKEN) {
    const linkedInPosts = await fetchLinkedInPosts(limit);
    allPosts.push(...linkedInPosts);
  }

  // Sort by date (newest first) and limit
  return allPosts
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit);
}

/**
 * Fetches posts with #meetjs hashtag from Mastodon instances
 */
async function fetchMastodonPosts(limit: number): Promise<SocialPost[]> {
  const allPosts: SocialPost[] = [];

  try {
    // Fetch from multiple instances in parallel
    const fetchPromises = MASTODON_INSTANCES.map(async (instance) => {
      try {
        const response = await fetch(
          `https://${instance}/api/v1/timelines/tag/meetjs?limit=${Math.ceil(limit / MASTODON_INSTANCES.length)}`,
          {
            next: { revalidate: 300 }, // Cache for 5 minutes
            headers: {
              'Accept': 'application/json',
            },
          }
        );

        if (!response.ok) {
          console.warn(`Failed to fetch from ${instance}: ${response.status}`);
          return [];
        }

        const data: MastodonStatus[] = await response.json();
        return data.map((status) => transformMastodonPost(status));
      } catch (error) {
        console.warn(`Error fetching from ${instance}:`, error);
        return [];
      }
    });

    const results = await Promise.all(fetchPromises);
    allPosts.push(...results.flat());

    return allPosts;
  } catch (error) {
    console.error('Error fetching Mastodon posts:', error);
    return [];
  }
}

/**
 * Fetches posts with #meetjs hashtag from Twitter/X
 * Requires TWITTER_BEARER_TOKEN environment variable
 */
async function fetchTwitterPosts(limit: number): Promise<SocialPost[]> {
  try {
    // TODO: Add Twitter API key to environment variables
    // Get your API key from: https://developer.twitter.com/
    // 
    // Twitter API v2 endpoint for searching tweets:
    // https://api.twitter.com/2/tweets/search/recent?query=%23meetjs
    // 
    // Required headers:
    // Authorization: Bearer YOUR_BEARER_TOKEN
    // 
    // Example implementation:
    // const response = await fetch(
    //   `https://api.twitter.com/2/tweets/search/recent?query=%23meetjs&max_results=${limit}&tweet.fields=created_at,author_id,public_metrics&expansions=author_id,attachments.media_keys&media.fields=url,preview_image_url`,
    //   {
    //     next: { revalidate: 300 },
    //     headers: {
    //       'Authorization': `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
    //     },
    //   }
    // );
    
    console.info('Twitter API key not configured. Add TWITTER_BEARER_TOKEN to .env to enable Twitter posts.');
    return [];
  } catch (error) {
    console.error('Error fetching Twitter posts:', error);
    return [];
  }
}

/**
 * Fetches posts with #meetjs hashtag from Bluesky
 * 
 * IMPORTANT: This searches ALL public posts with #meetjs from ANYONE on Bluesky,
 * not just posts from your account. Authentication is only required because
 * Bluesky's search API requires you to be logged in (any account works).
 * 
 * Uses official @atproto/api SDK with authentication
 * Requires BLUESKY_HANDLE and BLUESKY_APP_PASSWORD environment variables
 */
async function fetchBlueskyPosts(limit: number): Promise<SocialPost[]> {
  // Check if credentials are configured
  if (!process.env.BLUESKY_HANDLE || !process.env.BLUESKY_APP_PASSWORD) {
    console.info('Bluesky credentials not configured. Add BLUESKY_HANDLE and BLUESKY_APP_PASSWORD to .env to enable Bluesky posts.');
    return [];
  }

  try {
    // Create agent and authenticate
    const agent = new BskyAgent({
      service: 'https://bsky.social',
    });

    // Login with app password (needed for search API access)
    // This searches ALL public posts, not just posts from this account
    await agent.login({
      identifier: process.env.BLUESKY_HANDLE,
      password: process.env.BLUESKY_APP_PASSWORD,
    });

    // Search for ALL public posts containing "meetjs" from ANY user
    const response = await agent.app.bsky.feed.searchPosts({
      q: 'meetjs',
      limit: limit,
    });

    if (!response.data.posts || response.data.posts.length === 0) {
      console.info('No Bluesky posts found for #meetjs');
      return [];
    }

    console.info(`Found ${response.data.posts.length} Bluesky posts for #meetjs`);

    return response.data.posts.map((post: any) => ({
      id: post.uri,
      platform: 'bluesky' as const,
      author: {
        name: post.author.displayName || post.author.handle,
        username: `@${post.author.handle}`,
        avatar: post.author.avatar || '',
        profileUrl: `https://bsky.app/profile/${post.author.handle}`,
      },
      content: truncateText(post.record.text || '', 280),
      url: `https://bsky.app/profile/${post.author.handle}/post/${post.uri.split('/').pop()}`,
      createdAt: post.record.createdAt,
      metrics: {
        likes: post.likeCount || 0,
        reblogs: post.repostCount || 0,
        replies: post.replyCount || 0,
      },
      media: post.embed?.images?.map((img: any) => ({
        type: 'image' as const,
        url: img.fullsize,
        previewUrl: img.thumb,
      })),
    }));
  } catch (error) {
    console.error('Error fetching Bluesky posts:', error);
    return [];
  }
}

/**
 * Fetches posts with #meetjs from LinkedIn
 * Requires LINKEDIN_ACCESS_TOKEN environment variable
 */
async function fetchLinkedInPosts(limit: number): Promise<SocialPost[]> {
  try {
    // TODO: Add LinkedIn API token to environment variables
    // Get your API token from: https://www.linkedin.com/developers/
    // 
    // LinkedIn API is more restrictive and requires:
    // 1. A LinkedIn app
    // 2. OAuth 2.0 authentication
    // 3. Approval for specific API access
    // 
    // Note: LinkedIn doesn't have a public hashtag search API like Twitter/Mastodon
    // You would need to fetch posts from your company page or use LinkedIn's
    // Share API with proper permissions.
    
    console.info('LinkedIn API token not configured. Add LINKEDIN_ACCESS_TOKEN to .env to enable LinkedIn posts.');
    return [];
  } catch (error) {
    console.error('Error fetching LinkedIn posts:', error);
    return [];
  }
}

/**
 * Transforms Mastodon API response to our SocialPost format
 */
function transformMastodonPost(status: MastodonStatus): SocialPost {
  // Strip HTML tags from content
  const content = stripHtml(status.content);

  return {
    id: status.id,
    platform: 'mastodon',
    author: {
      name: status.account.display_name || status.account.username,
      username: `@${status.account.username}`,
      avatar: status.account.avatar,
      profileUrl: status.account.url,
    },
    content: truncateText(content, 280),
    url: status.url,
    createdAt: status.created_at,
    metrics: {
      likes: status.favourites_count,
      reblogs: status.reblogs_count,
      replies: status.replies_count,
    },
    media: status.media_attachments?.map((media) => ({
      type: media.type === 'video' ? 'video' : 'image',
      url: media.url,
      previewUrl: media.preview_url,
    })),
  };
}

/**
 * Strips HTML tags from text
 */
function stripHtml(html: string): string {
  return html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n\n')
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .trim();
}

/**
 * Truncates text to specified length with ellipsis
 */
function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
}

/**
 * Formats relative time (e.g., "2h ago", "3d ago")
 */
export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return 'just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 604800)
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  if (diffInSeconds < 2592000)
    return `${Math.floor(diffInSeconds / 604800)}w ago`;

  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}
