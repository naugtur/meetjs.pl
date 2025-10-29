'use client';

import { SocialPost } from '@/types/social';
import { formatRelativeTime } from '@/lib/social';
import { MessageCircle, Repeat2, Heart, ExternalLink } from 'lucide-react';
import { useState } from 'react';

interface SocialFeedProps {
  posts: SocialPost[];
}

export default function SocialFeed({ posts }: SocialFeedProps) {
  const [showAll, setShowAll] = useState(false);
  
  if (posts.length === 0) {
    return null;
  }

  // Show 3 posts initially, all when "Show More" is clicked
  const visiblePosts = showAll ? posts : posts.slice(0, 3);
  const hasMore = posts.length > 3;

  return (
    <section className="w-full py-16 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            💬 Community Buzz
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Latest posts from our community using{' '}
            <span className="font-semibold text-purple dark:text-green">#meetjs</span>
          </p>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {visiblePosts.map((post) => (
            <SocialPostCard key={`${post.platform}-${post.id}`} post={post} />
          ))}
        </div>

        {/* Show More Button */}
        {hasMore && !showAll && (
          <div className="text-center mb-8">
            <button
              onClick={() => setShowAll(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-purple text-black hover:bg-purple/80 dark:bg-green dark:hover:bg-green/80 rounded-lg font-semibold transition-all duration-200 hover:scale-105"
            >
              Show More Posts ({posts.length - 3} more)
            </button>
          </div>
        )}

        {/* View More Links */}
        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Search #meetjs on:
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="https://mastodon.social/tags/meetjs"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 hover:bg-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:hover:bg-purple-900/50 rounded-lg font-medium transition-all duration-200"
            >
              Mastodon
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href="https://bsky.app/search?q=%23meetjs"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-sky-100 text-sky-700 hover:bg-sky-200 dark:bg-sky-900/30 dark:text-sky-300 dark:hover:bg-sky-900/50 rounded-lg font-medium transition-all duration-200"
            >
              Bluesky
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href="https://twitter.com/search?q=%23meetjs"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 rounded-lg font-medium transition-all duration-200"
            >
              X/Twitter
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href="https://www.linkedin.com/search/results/content/?keywords=%23meetjs"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/50 rounded-lg font-medium transition-all duration-200"
            >
              LinkedIn
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function SocialPostCard({ post }: { post: SocialPost }) {
  return (
    <article className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-1 overflow-hidden">
      {/* Author Header */}
      <div className="p-4 border-b border-gray-100 dark:border-gray-700">
        <div className="flex items-start gap-3">
          <a
            href={post.author.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.author.avatar}
              alt={post.author.name}
              width={48}
              height={48}
              className="rounded-full"
              loading="lazy"
            />
          </a>
          <div className="flex-1 min-w-0">
            <a
              href={post.author.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-gray-900 dark:text-gray-100 hover:underline block truncate"
            >
              {post.author.name}
            </a>
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="truncate">{post.author.username}</span>
              <span>•</span>
              <time dateTime={post.createdAt}>
                {formatRelativeTime(post.createdAt)}
              </time>
            </div>
          </div>
          <PlatformBadge platform={post.platform} />
        </div>
      </div>

      {/* Post Content */}
      <div className="p-4">
        <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap break-words">
          {post.content}
        </p>

        {/* Media Preview */}
        {post.media && post.media.length > 0 && post.media[0].type === 'image' && (
          <div className="mt-3 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.media[0].previewUrl || post.media[0].url}
              alt="Post media"
              className="w-full h-48 object-cover"
              loading="lazy"
              onError={(e) => {
                // Hide image if it fails to load
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
        )}
      </div>

      {/* Metrics Footer */}
      <div className="px-4 pb-4 flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
        {post.metrics?.replies !== undefined && (
          <div className="flex items-center gap-1">
            <MessageCircle className="w-4 h-4" />
            <span>{post.metrics.replies}</span>
          </div>
        )}
        {post.metrics?.reblogs !== undefined && (
          <div className="flex items-center gap-1">
            <Repeat2 className="w-4 h-4" />
            <span>{post.metrics.reblogs}</span>
          </div>
        )}
        {post.metrics?.likes !== undefined && (
          <div className="flex items-center gap-1">
            <Heart className="w-4 h-4" />
            <span>{post.metrics.likes}</span>
          </div>
        )}
        <a
          href={post.url}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto text-purple dark:text-green hover:underline flex items-center gap-1"
        >
          View post
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </article>
  );
}

function PlatformBadge({ platform }: { platform: SocialPost['platform'] }) {
  const badges = {
    mastodon: {
      label: 'Mastodon',
      className: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
    },
    twitter: {
      label: 'X',
      className: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300',
    },
    linkedin: {
      label: 'LinkedIn',
      className: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
    },
    bluesky: {
      label: 'Bluesky',
      className: 'bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300',
    },
  };

  const badge = badges[platform];

  return (
    <span
      className={`px-2 py-1 text-xs font-medium rounded ${badge.className}`}
    >
      {badge.label}
    </span>
  );
}
