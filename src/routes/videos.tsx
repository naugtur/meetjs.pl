import { For } from 'solid-js';
import {
  FaBrandsYoutube,
  FaSolidPlay,
  FaSolidList,
  FaSolidUsers,
} from 'solid-icons/fa';
import { featuredVideos } from '@/content/youtubeVideos';

export default function VideosPage() {
  const hasVideos = featuredVideos.length > 0;

  return (
    <main class="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section class="bg-gradient-to-r from-red-600 via-red-500 to-red-600 py-20 text-white">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="text-center">
            <div class="mb-6 flex items-center justify-center gap-4">
              <FaBrandsYoutube class="h-16 w-16" />
              <h1 class="text-4xl font-bold sm:text-5xl">meet.js Videos</h1>
            </div>
            <p class="mx-auto mb-8 max-w-3xl text-xl text-white/90">
              Watch talks, workshops, and community highlights from meet.js
              events across Poland
            </p>
            <a
              href="https://www.youtube.com/@meetjs"
              target="_blank"
              rel="noopener"
              class="inline-flex items-center gap-2 rounded-lg bg-white px-8 py-4 text-lg font-semibold text-red-600 shadow-lg transition-colors duration-200 hover:bg-gray-100 hover:shadow-xl"
            >
              <FaBrandsYoutube class="h-6 w-6" />
              Subscribe on YouTube
            </a>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section class="py-16">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {hasVideos ? (
            // Featured Videos Section
            <>
              <div class="mb-12">
                <h2 class="mb-2 text-3xl font-bold text-gray-900 dark:text-gray-100">
                  Featured Videos
                </h2>
                <p class="text-gray-600 dark:text-gray-300">
                  Our latest and most popular content
                </p>
              </div>

              <div class="mb-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {
                  <For each={featuredVideos}>
                    {(video) => (
                      <div class="overflow-hidden rounded-lg bg-white shadow-lg transition-shadow duration-300 hover:shadow-xl dark:bg-gray-800">
                        <div class="aspect-video">
                          <iframe
                            class="h-full w-full"
                            src={`https://www.youtube.com/embed/${video.id}`}
                            title={video.title}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen
                          />
                        </div>
                        <div class="p-6">
                          <h3 class="mb-2 text-xl font-semibold text-gray-900 dark:text-gray-100">
                            {video.title}
                          </h3>
                          <p class="text-gray-600 dark:text-gray-300">
                            {video.description}
                          </p>
                        </div>
                      </div>
                    )}
                  </For>
                }
              </div>
            </>
          ) : null}

          {/* Quick Links Section */}
          <div class="mb-12">
            <h2 class="mb-8 text-center text-3xl font-bold text-gray-900 dark:text-gray-100">
              Explore Our Channel
            </h2>
          </div>

          <div class="mb-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Latest Videos */}
            <a
              href="https://www.youtube.com/@meetjs/videos"
              target="_blank"
              rel="noopener"
              class="group overflow-hidden rounded-lg bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:bg-gray-800"
            >
              <div class="flex aspect-video items-center justify-center bg-gradient-to-br from-red-500 to-red-700">
                <div class="text-center text-white">
                  <FaSolidPlay class="mx-auto mb-4 h-20 w-20 transition-transform group-hover:scale-110" />
                  <p class="text-2xl font-bold">Latest Videos</p>
                </div>
              </div>
              <div class="p-6">
                <h3 class="mb-2 text-xl font-semibold text-gray-900 dark:text-gray-100">
                  Recent Uploads
                </h3>
                <p class="text-gray-600 dark:text-gray-300">
                  Watch our newest talks and presentations
                </p>
              </div>
            </a>

            {/* Playlists */}
            <a
              href="https://www.youtube.com/@meetjs/playlists"
              target="_blank"
              rel="noopener"
              class="group overflow-hidden rounded-lg bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:bg-gray-800"
            >
              <div class="flex aspect-video items-center justify-center bg-gradient-to-br from-purple-500 to-purple-700">
                <div class="text-center text-white">
                  <FaSolidList class="mx-auto mb-4 h-20 w-20 transition-transform group-hover:scale-110" />
                  <p class="text-2xl font-bold">Playlists</p>
                </div>
              </div>
              <div class="p-6">
                <h3 class="mb-2 text-xl font-semibold text-gray-900 dark:text-gray-100">
                  Organized Collections
                </h3>
                <p class="text-gray-600 dark:text-gray-300">
                  Browse talks by topic, event, or city
                </p>
              </div>
            </a>

            {/* Community */}
            <a
              href="https://www.youtube.com/@meetjs/community"
              target="_blank"
              rel="noopener"
              class="group overflow-hidden rounded-lg bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:bg-gray-800"
            >
              <div class="flex aspect-video items-center justify-center bg-gradient-to-br from-green-500 to-green-700">
                <div class="text-center text-white">
                  <FaSolidUsers class="mx-auto mb-4 h-20 w-20 transition-transform group-hover:scale-110" />
                  <p class="text-2xl font-bold">Community</p>
                </div>
              </div>
              <div class="p-6">
                <h3 class="mb-2 text-xl font-semibold text-gray-900 dark:text-gray-100">
                  Updates & Posts
                </h3>
                <p class="text-gray-600 dark:text-gray-300">
                  Stay updated with announcements
                </p>
              </div>
            </a>
          </div>

          {/* About Section */}
          <div class="mx-auto max-w-4xl rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800">
            <h2 class="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">
              About Our Videos
            </h2>
            <div class="space-y-4 text-gray-600 dark:text-gray-300">
              <p>
                Our YouTube channel features recordings from meet.js events
                across Poland. We share:
              </p>
              <ul class="ml-4 list-inside list-disc space-y-2">
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
