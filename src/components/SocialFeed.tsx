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
    <section className="w-full bg-gradient-to-b from-white to-gray-50 py-16 dark:from-gray-900 dark:to-gray-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-gray-100">
            💬 Community Buzz
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
            Latest posts from our community using{' '}
            <span className="font-semibold text-purple dark:text-green">
              #meetjs
            </span>
          </p>
        </div>

        {/* Posts Grid */}
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visiblePosts.map((post) => (
            <SocialPostCard key={`${post.platform}-${post.id}`} post={post} />
          ))}
        </div>

        {/* Show More Button */}
        {hasMore && !showAll && (
          <div className="mb-8 text-center">
            <button
              onClick={() => setShowAll(true)}
              className="inline-flex items-center gap-2 rounded-lg bg-purple px-6 py-3 font-semibold text-black transition-all duration-200 hover:scale-105 hover:bg-purple/80 dark:bg-green dark:hover:bg-green/80"
            >
              Show More Posts ({posts.length - 3} more)
            </button>
          </div>
        )}

        {/* View More Links */}
        <div className="text-center">
          <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
            Search #meetjs on:
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="https://mastodon.social/tags/meetjs"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-purple-100 px-4 py-2 font-medium text-purple-700 transition-all duration-200 hover:bg-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:hover:bg-purple-900/50"
            >
              Mastodon
              <ExternalLink className="h-3 w-3" />
            </a>
            <a
              href="https://bsky.app/search?q=%23meetjs"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-sky-100 px-4 py-2 font-medium text-sky-700 transition-all duration-200 hover:bg-sky-200 dark:bg-sky-900/30 dark:text-sky-300 dark:hover:bg-sky-900/50"
            >
              Bluesky
              <ExternalLink className="h-3 w-3" />
            </a>
            <a
              href="https://twitter.com/search?q=%23meetjs"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2 font-medium text-gray-700 transition-all duration-200 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            >
              X/Twitter
              <ExternalLink className="h-3 w-3" />
            </a>
            <a
              href="https://www.linkedin.com/search/results/content/?keywords=%23meetjs"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-blue-100 px-4 py-2 font-medium text-blue-700 transition-all duration-200 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/50"
            >
              LinkedIn
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function SocialPostCard({ post }: { post: SocialPost }) {
  return (
    <article className="overflow-hidden rounded-lg bg-white shadow-md transition-all duration-200 hover:-translate-y-1 hover:shadow-lg dark:bg-gray-800">
      {/* Author Header */}
      <div className="border-b border-gray-100 p-4 dark:border-gray-700">
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
          <div className="min-w-0 flex-1">
            <a
              href={post.author.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block truncate font-semibold text-gray-900 hover:underline dark:text-gray-100"
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
        <p className="whitespace-pre-wrap break-words text-gray-700 dark:text-gray-300">
          {post.content}
        </p>

        {/* Media Preview */}
        {post.media &&
          post.media.length > 0 &&
          post.media[0].type === 'image' && (
            <div className="mt-3 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-700">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.media[0].previewUrl || post.media[0].url}
                alt="Post media"
                className="h-48 w-full object-cover"
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
      <div className="flex items-center gap-4 px-4 pb-4 text-sm text-gray-500 dark:text-gray-400">
        {post.metrics?.replies !== undefined && (
          <div className="flex items-center gap-1">
            <MessageCircle className="h-4 w-4" />
            <span>{post.metrics.replies}</span>
          </div>
        )}
        {post.metrics?.reblogs !== undefined && (
          <div className="flex items-center gap-1">
            <Repeat2 className="h-4 w-4" />
            <span>{post.metrics.reblogs}</span>
          </div>
        )}
        {post.metrics?.likes !== undefined && (
          <div className="flex items-center gap-1">
            <Heart className="h-4 w-4" />
            <span>{post.metrics.likes}</span>
          </div>
        )}
        <a
          href={post.url}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto flex items-center gap-1 text-purple hover:underline dark:text-green"
        >
          View post
          <ExternalLink className="h-3 w-3" />
        </a>
      </div>
    </article>
  );
}

function PlatformBadge({ platform }: { platform: SocialPost['platform'] }) {
  const badges = {
    mastodon: {
      label: 'Mastodon',
      className:
        'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
    },
    twitter: {
      label: 'X',
      className:
        'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300',
    },
    linkedin: {
      label: 'LinkedIn',
      className:
        'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
    },
    bluesky: {
      label: 'Bluesky',
      className: 'bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300',
    },
  };

  const badge = badges[platform];

  return (
    <span
      className={`rounded px-2 py-1 text-xs font-medium ${badge.className}`}
    >
      {badge.label}
    </span>
  );
}
