import { Tv, ExternalLink, Calendar, Video, FileText, Mic } from '@/lib/lucide';
import { For, Show } from 'solid-js';
import { mediaItems } from '@/content/mediaItems';
import { useTranslate } from '@/i18n';
import { PageMeta } from '@/components/PageMeta';

const typeIcons = {
  video: Video,
  article: FileText,
  podcast: Mic,
  interview: Tv,
};

const typeColors = {
  video: 'from-red-500 to-pink-500',
  article: 'from-blue-500 to-cyan-500',
  podcast: 'from-purple-500 to-indigo-500',
  interview: 'from-green-500 to-emerald-500',
};

export default function MediaPage() {
  const { t } = useTranslate();

  return (
    <div class="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <PageMeta
        title="Media - meet.js"
        description="Videos, articles, podcasts, and interviews featuring the meet.js community."
        path="/media"
      />
      {/* Hero Section */}
      <section class="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 py-20">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="text-center">
            <Tv class="mx-auto mb-6 h-16 w-16 text-white" />
            <h1 class="text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
              {t('media.page_title')}
            </h1>
            <p class="mx-auto mt-6 max-w-3xl text-xl text-purple-100">
              {t('media.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section class="py-16">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Media Items Grid */}
          <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <For each={mediaItems}>
              {(item) => {
                const Icon = typeIcons[item.type];
                const gradient = typeColors[item.type];

                return (
                  <div class="group overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl dark:bg-gray-800">
                    {/* Type Badge */}
                    <div class={`bg-gradient-to-r ${gradient} p-4`}>
                      <div class="flex items-center justify-between text-white">
                        <div class="flex items-center gap-2">
                          <Icon class="h-5 w-5" />
                          <span class="text-sm font-semibold uppercase tracking-wide">
                            {t(`media.type.${item.type}`)}
                          </span>
                        </div>
                        <span class="text-xl">
                          {item.language === 'pl' ? '🇵🇱' : '🇬🇧'}
                        </span>
                      </div>
                    </div>

                    {/* Thumbnail */}
                    <Show when={item.thumbnail}>
                      <div class="relative h-48 w-full overflow-hidden bg-gray-100 dark:bg-gray-700">
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          class="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                    </Show>

                    {/* Content */}
                    <div class="p-6">
                      <div class="mb-3 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                        <Calendar class="h-4 w-4" />
                        <span>{item.date}</span>
                        <span class="mx-2">•</span>
                        <span class="font-medium text-gray-700 dark:text-gray-300">
                          {item.source}
                        </span>
                      </div>

                      <h3 class="mb-3 text-xl font-bold text-gray-900 dark:text-gray-100">
                        {item.title}
                      </h3>

                      <p class="mb-6 text-gray-600 dark:text-gray-300">
                        {item.description}
                      </p>

                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        class={`inline-flex items-center gap-2 rounded-lg bg-gradient-to-r ${gradient} px-6 py-3 font-semibold text-white transition-all duration-200 hover:scale-105`}
                      >
                        {t('media.view_material')}
                        <ExternalLink class="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                );
              }}
            </For>
          </div>

          {/* Empty State (if no items) */}
          <Show when={mediaItems.length === 0}>
            <div class="rounded-xl bg-white p-12 text-center shadow-lg dark:bg-gray-800">
              <Tv class="mx-auto mb-4 h-16 w-16 text-gray-400" />
              <h3 class="mb-2 text-xl font-semibold text-gray-900 dark:text-gray-100">
                {t('media.empty_title')}
              </h3>
              <p class="text-gray-600 dark:text-gray-300">
                {t('media.empty_description')}
              </p>
            </div>
          </Show>
        </div>
      </section>

      {/* Call to Action */}
      <section class="bg-gray-900 py-16 dark:bg-gray-950">
        <div class="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 class="mb-4 text-3xl font-bold text-white">
            {t('media.cta_title')}
          </h2>
          <p class="mx-auto mb-8 max-w-2xl text-xl text-gray-300">
            {t('media.cta_description')}
          </p>
          <a
            href="mailto:hello@meetjs.pl"
            class="inline-flex items-center gap-2 rounded-lg bg-purple-600 px-8 py-4 text-lg font-semibold text-white transition-colors duration-200 hover:bg-purple-700"
          >
            {t('media.cta_button')}
          </a>
        </div>
      </section>
    </div>
  );
}
