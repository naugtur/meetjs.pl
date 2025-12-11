'use client';

import { FaYoutube, FaArrowRight } from 'react-icons/fa6';
import Link from 'next/link';
import { featuredVideos } from '@/content/youtubeVideos';

export const YouTubeVideos = () => {
  const hasVideos = featuredVideos.length > 0;
  return (
    <section className="w-full bg-gradient-to-b from-white to-gray-50 py-16 dark:from-gray-900 dark:to-gray-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <FaYoutube className="h-10 w-10 text-red-600" />
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl dark:text-gray-100">
              📺 Latest from YouTube
            </h2>
          </div>
          <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
            Watch our latest talks, workshops, and community highlights
          </p>
        </div>

        {/* YouTube Content */}
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {hasVideos ? (
            // Show embedded videos when configured
            featuredVideos.slice(0, 3).map((video) => (
              <div
                key={video.id}
                className="overflow-hidden rounded-lg bg-white shadow-lg transition-shadow duration-300 hover:shadow-xl dark:bg-gray-800"
              >
                <div className="aspect-video">
                  <iframe
                    className="h-full w-full"
                    src={`https://www.youtube.com/embed/${video.id}`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                    {video.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                    {video.description}
                  </p>
                </div>
              </div>
            ))
          ) : (
            // Show clickable cards when no videos configured
            <>
              <a
                href="https://www.youtube.com/@meetjs/videos"
                target="_blank"
                rel="noopener noreferrer"
                className="group overflow-hidden rounded-lg bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:bg-gray-800"
              >
                <div className="flex aspect-video items-center justify-center bg-gradient-to-br from-red-500 to-red-700">
                  <div className="text-center text-white">
                    <FaYoutube className="mx-auto mb-4 h-20 w-20 transition-transform group-hover:scale-110" />
                    <p className="text-lg font-semibold">Latest Videos</p>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                    Watch on YouTube
                  </h3>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                    Click to see our latest uploads
                  </p>
                </div>
              </a>

              <a
                href="https://www.youtube.com/@meetjs/playlists"
                target="_blank"
                rel="noopener noreferrer"
                className="group overflow-hidden rounded-lg bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:bg-gray-800"
              >
                <div className="flex aspect-video items-center justify-center bg-gradient-to-br from-purple-500 to-purple-700">
                  <div className="text-center text-white">
                    <FaYoutube className="mx-auto mb-4 h-20 w-20 transition-transform group-hover:scale-110" />
                    <p className="text-lg font-semibold">Playlists</p>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                    Browse Playlists
                  </h3>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                    Organized collections of talks
                  </p>
                </div>
              </a>

              <a
                href="https://www.youtube.com/@meetjs/community"
                target="_blank"
                rel="noopener noreferrer"
                className="group overflow-hidden rounded-lg bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:bg-gray-800"
              >
                <div className="flex aspect-video items-center justify-center bg-gradient-to-br from-green-500 to-green-700">
                  <div className="text-center text-white">
                    <FaYoutube className="mx-auto mb-4 h-20 w-20 transition-transform group-hover:scale-110" />
                    <p className="text-lg font-semibold">Community</p>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                    Community Posts
                  </h3>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                    Updates and announcements
                  </p>
                </div>
              </a>
            </>
          )}
        </div>

        {/* CTA to YouTube Channel */}
        <div className="text-center">
          <Link
            href="/youtube"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-6 py-3 font-semibold text-white shadow-md transition-colors duration-200 hover:bg-red-700 hover:shadow-lg"
          >
            <FaYoutube className="h-5 w-5" />
            Visit our YouTube Channel
            <FaArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
