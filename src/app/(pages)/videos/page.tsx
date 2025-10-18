'use client';

import { FaYoutube, FaPlay, FaList, FaUsers } from 'react-icons/fa6';
import { featuredVideos } from '@/content/youtubeVideos';

export default function VideosPage() {
  const hasVideos = featuredVideos.length > 0;

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-600 via-red-500 to-red-600 text-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-4 mb-6">
              <FaYoutube className="h-16 w-16" />
              <h1 className="text-4xl font-bold sm:text-5xl">
                meet.js Videos
              </h1>
            </div>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
              Watch talks, workshops, and community highlights from meet.js
              events across Poland
            </p>
            <a
              href="https://www.youtube.com/@meetjs"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-red-600 hover:bg-gray-100 font-semibold px-8 py-4 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl text-lg"
            >
              <FaYoutube className="h-6 w-6" />
              Subscribe on YouTube
            </a>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {hasVideos ? (
            // Featured Videos Section
            <>
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                  Featured Videos
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Our latest and most popular content
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                {featuredVideos.map((video) => (
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
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                        {video.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {video.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : null}

          {/* Quick Links Section */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">
              Explore Our Channel
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* Latest Videos */}
            <a
              href="https://www.youtube.com/@meetjs/videos"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="aspect-video bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center">
                <div className="text-center text-white">
                  <FaPlay className="h-20 w-20 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <p className="text-2xl font-bold">Latest Videos</p>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Recent Uploads
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Watch our newest talks and presentations
                </p>
              </div>
            </a>

            {/* Playlists */}
            <a
              href="https://www.youtube.com/@meetjs/playlists"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="aspect-video bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center">
                <div className="text-center text-white">
                  <FaList className="h-20 w-20 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <p className="text-2xl font-bold">Playlists</p>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Organized Collections
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Browse talks by topic, event, or city
                </p>
              </div>
            </a>

            {/* Community */}
            <a
              href="https://www.youtube.com/@meetjs/community"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="aspect-video bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center">
                <div className="text-center text-white">
                  <FaUsers className="h-20 w-20 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <p className="text-2xl font-bold">Community</p>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Updates & Posts
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Stay updated with announcements
                </p>
              </div>
            </a>
          </div>

          {/* About Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              About Our Videos
            </h2>
            <div className="space-y-4 text-gray-600 dark:text-gray-300">
              <p>
                Our YouTube channel features recordings from meet.js events
                across Poland. We share:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Technical talks on JavaScript and web development</li>
                <li>Workshops and hands-on tutorials</li>
                <li>Panel discussions and Q&A sessions</li>
                <li>Community highlights and event recaps</li>
                <li>Lightning talks from community members</li>
              </ul>
              <p>
                All content is created by our community members and speakers.
                Subscribe to stay updated with new videos from our events!
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
