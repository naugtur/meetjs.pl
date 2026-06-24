import { Tv, ExternalLink, Calendar, Video, FileText, Mic } from 'lucide-react';
import Image from 'next/image';
import { mediaItems } from '@/content/mediaItems';
import { getTranslate } from '@/tolgee/server';

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

export default async function MediaPage() {
  const t = await getTranslate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Tv className="mx-auto mb-6 h-16 w-16 text-white" />
            <h1 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
              {t('media.page_title')}
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-xl text-purple-100">
              {t('media.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Media Items Grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {mediaItems.map((item) => {
              const Icon = typeIcons[item.type];
              const gradient = typeColors[item.type];

              return (
                <div
                  key={item.id}
                  className="group overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl dark:bg-gray-800"
                >
                  {/* Type Badge */}
                  <div className={`bg-gradient-to-r ${gradient} p-4`}>
                    <div className="flex items-center justify-between text-white">
                      <div className="flex items-center gap-2">
                        <Icon className="h-5 w-5" />
                        <span className="text-sm font-semibold uppercase tracking-wide">
                          {t(`media.type.${item.type}`)}
                        </span>
                      </div>
                      <span className="text-xl">
                        {item.language === 'pl' ? '🇵🇱' : '🇬🇧'}
                      </span>
                    </div>
                  </div>

                  {/* Thumbnail */}
                  {item.thumbnail && (
                    <div className="relative h-48 w-full overflow-hidden bg-gray-100 dark:bg-gray-700">
                      <Image
                        src={item.thumbnail}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-6">
                    <div className="mb-3 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                      <Calendar className="h-4 w-4" />
                      <span>{item.date}</span>
                      <span className="mx-2">•</span>
                      <span className="font-medium text-gray-700 dark:text-gray-300">
                        {item.source}
                      </span>
                    </div>

                    <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-gray-100">
                      {item.title}
                    </h3>

                    <p className="mb-6 text-gray-600 dark:text-gray-300">
                      {item.description}
                    </p>

                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 rounded-lg bg-gradient-to-r ${gradient} px-6 py-3 font-semibold text-white transition-all duration-200 hover:scale-105`}
                    >
                      {t('media.view_material')}
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Empty State (if no items) */}
          {mediaItems.length === 0 && (
            <div className="rounded-xl bg-white p-12 text-center shadow-lg dark:bg-gray-800">
              <Tv className="mx-auto mb-4 h-16 w-16 text-gray-400" />
              <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-gray-100">
                {t('media.empty_title')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {t('media.empty_description')}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gray-900 py-16 dark:bg-gray-950">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-4 text-3xl font-bold text-white">
            {t('media.cta_title')}
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-xl text-gray-300">
            {t('media.cta_description')}
          </p>
          <a
            href="mailto:hello@meetjs.pl"
            className="inline-flex items-center gap-2 rounded-lg bg-purple-600 px-8 py-4 text-lg font-semibold text-white transition-colors duration-200 hover:bg-purple-700"
          >
            {t('media.cta_button')}
          </a>
        </div>
      </section>
    </div>
  );
}
