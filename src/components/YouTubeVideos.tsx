import { For, Show } from 'solid-js';
import { FaBrandsYoutube, FaSolidArrowRight } from 'solid-icons/fa';
import { featuredVideos } from '@/content/youtubeVideos';

export const YouTubeVideos = () => {
  const hasVideos = featuredVideos.length > 0;
  return (
    <section class="w-full bg-gradient-to-b from-white to-gray-50 py-16 dark:from-gray-900 dark:to-gray-800">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div class="mb-12 text-center">
          <div class="mb-4 flex items-center justify-center gap-3">
            <FaBrandsYoutube class="h-10 w-10 text-red-600" />
            <h2 class="text-3xl font-bold text-gray-900 sm:text-4xl dark:text-gray-100">
              📺 Latest from YouTube
            </h2>
          </div>
          <p class="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
            Watch our latest talks, workshops, and community highlights
          </p>
        </div>

        {/* YouTube Content */}
        <div class="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Show
            when={hasVideos}
            fallback={
              <>
                <a
                  href="https://www.youtube.com/@meetjs/videos"
                  target="_blank"
                  rel="noopener"
                  class="group overflow-hidden rounded-lg bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:bg-gray-800"
                >
                  <div class="flex aspect-video items-center justify-center bg-gradient-to-br from-red-500 to-red-700">
                    <div class="text-center text-white">
                      <FaBrandsYoutube class="mx-auto mb-4 h-20 w-20 transition-transform group-hover:scale-110" />
                      <p class="text-lg font-semibold">Latest Videos</p>
                    </div>
                  </div>
                  <div class="p-4">
                    <h3 class="font-semibold text-gray-900 dark:text-gray-100">
                      Watch on YouTube
                    </h3>
                    <p class="mt-1 text-sm text-gray-600 dark:text-gray-300">
                      Click to see our latest uploads
                    </p>
                  </div>
                </a>

                <a
                  href="https://www.youtube.com/@meetjs/playlists"
                  target="_blank"
                  rel="noopener"
                  class="group overflow-hidden rounded-lg bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:bg-gray-800"
                >
                  <div class="flex aspect-video items-center justify-center bg-gradient-to-br from-purple-500 to-purple-700">
                    <div class="text-center text-white">
                      <FaBrandsYoutube class="mx-auto mb-4 h-20 w-20 transition-transform group-hover:scale-110" />
                      <p class="text-lg font-semibold">Playlists</p>
                    </div>
                  </div>
                  <div class="p-4">
                    <h3 class="font-semibold text-gray-900 dark:text-gray-100">
                      Browse Playlists
                    </h3>
                    <p class="mt-1 text-sm text-gray-600 dark:text-gray-300">
                      Organized collections of talks
                    </p>
                  </div>
                </a>

                <a
                  href="https://www.youtube.com/@meetjs/community"
                  target="_blank"
                  rel="noopener"
                  class="group overflow-hidden rounded-lg bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:bg-gray-800"
                >
                  <div class="flex aspect-video items-center justify-center bg-gradient-to-br from-green-500 to-green-700">
                    <div class="text-center text-white">
                      <FaBrandsYoutube class="mx-auto mb-4 h-20 w-20 transition-transform group-hover:scale-110" />
                      <p class="text-lg font-semibold">Community</p>
                    </div>
                  </div>
                  <div class="p-4">
                    <h3 class="font-semibold text-gray-900 dark:text-gray-100">
                      Community Posts
                    </h3>
                    <p class="mt-1 text-sm text-gray-600 dark:text-gray-300">
                      Updates and announcements
                    </p>
                  </div>
                </a>
              </>
            }
          >
            <For each={featuredVideos.slice(0, 3)}>
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
                  <div class="p-4">
                    <h3 class="font-semibold text-gray-900 dark:text-gray-100">
                      {video.title}
                    </h3>
                    <p class="mt-1 text-sm text-gray-600 dark:text-gray-300">
                      {video.description}
                    </p>
                  </div>
                </div>
              )}
            </For>
          </Show>
        </div>

        {/* CTA to YouTube Channel */}
        <div class="text-center">
          <a
            href="/youtube"
            target="_blank"
            rel="noopener"
            class="inline-flex items-center gap-2 rounded-lg bg-red-600 px-6 py-3 font-semibold text-white shadow-md transition-colors duration-200 hover:bg-red-700 hover:shadow-lg"
          >
            <FaBrandsYoutube class="h-5 w-5" />
            Visit our YouTube Channel
            <FaSolidArrowRight class="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
};
