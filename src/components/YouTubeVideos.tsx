'use client';

import { FaYoutube, FaArrowRight } from 'react-icons/fa6';
import Link from 'next/link';
import { featuredVideos } from '@/content/youtubeVideos';

export const YouTubeVideos = () => {
  const hasVideos = featuredVideos.length > 0;
  return (
    <section className="w-full bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <FaYoutube className="h-10 w-10 text-red-600" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 sm:text-4xl">
              📺 Latest from YouTube
            </h2>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Watch our latest talks, workshops, and community highlights
          </p>
        </div>

        {/* YouTube Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {hasVideos ? (
            // Show embedded videos when configured
            featuredVideos.slice(0, 3).map((video) => (
              <div
                key={video.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="aspect-video">
                  <iframe
                    className="w-full h-full"
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
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
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
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="aspect-video bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center">
                  <div className="text-center text-white">
                    <FaYoutube className="h-20 w-20 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                    <p className="text-lg font-semibold">Latest Videos</p>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                    Watch on YouTube
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    Click to see our latest uploads
                  </p>
                </div>
              </a>

              <a
                href="https://www.youtube.com/@meetjs/playlists"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="aspect-video bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center">
                  <div className="text-center text-white">
                    <FaYoutube className="h-20 w-20 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                    <p className="text-lg font-semibold">Playlists</p>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                    Browse Playlists
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    Organized collections of talks
                  </p>
                </div>
              </a>

              <a
                href="https://www.youtube.com/@meetjs/community"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="aspect-video bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center">
                  <div className="text-center text-white">
                    <FaYoutube className="h-20 w-20 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                    <p className="text-lg font-semibold">Community</p>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                    Community Posts
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
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
            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
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
