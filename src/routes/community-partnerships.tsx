import { For } from 'solid-js';
import { ExternalLink, Users, BookOpen, Shield, Camera } from '@/lib/lucide';
import { partnerships } from '@/content/partnerships';
import { useTranslate } from '@/i18n';

export default function CommunityPartnershipsPage() {
  const { t } = useTranslate();

  return (
    <div class="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section class="bg-gradient-to-r from-purple-600 to-blue-600 py-20">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="text-center">
            <Users class="mx-auto mb-6 h-16 w-16 text-white" />
            <h1 class="text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
              {t('community_partnerships.page_title')}
            </h1>
            <p class="mx-auto mt-6 max-w-3xl text-xl text-purple-100">
              {t('community_partnerships.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section class="py-16">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="mb-12 text-center">
            <h2 class="mb-4 text-3xl font-bold text-gray-900">
              {t('community_partnerships.our_partners_title')}
            </h2>
            <p class="mx-auto max-w-2xl text-lg text-gray-600">
              {t('community_partnerships.our_partners_description')}
            </p>
          </div>

          <div class="grid gap-8">
            {
              <For each={partnerships}>
                {(partnership) => (
                  <div class="overflow-hidden rounded-xl bg-white shadow-lg transition-shadow duration-300 hover:shadow-xl">
                    <div class={`bg-gradient-to-r ${partnership.gradient} p-6`}>
                      <div class="flex items-center gap-4">
                        {partnership.icon}
                        <div>
                          <h3 class="text-2xl font-bold text-white">
                            {partnership.name}
                          </h3>
                          <p class="mt-1 text-white/90">
                            {partnership.location}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div class="p-8">
                      <p class="mb-6 text-lg text-gray-700">
                        {partnership.description}
                      </p>

                      <div class="grid gap-8 md:grid-cols-2">
                        <div>
                          <h4 class="mb-4 flex items-center gap-2 text-xl font-semibold text-gray-900">
                            <BookOpen class="h-5 w-5 text-blue-500" />
                            {t('community_partnerships.what_they_do')}
                          </h4>
                          <ul class="space-y-2">
                            <For each={partnership.details}>
                              {(detail) => (
                                <li class="flex items-start gap-2">
                                  <div class="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-blue-500" />
                                  <span class="text-gray-600">{detail}</span>
                                </li>
                              )}
                            </For>
                          </ul>
                        </div>

                        <div>
                          <h4 class="mb-4 flex items-center gap-2 text-xl font-semibold text-gray-900">
                            <Shield class="h-5 w-5 text-green-500" />
                            {t('community_partnerships.their_goals')}
                          </h4>
                          <ul class="space-y-2">
                            <For each={partnership.goals}>
                              {(goal) => (
                                <li class="flex items-start gap-2">
                                  <div class="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-green-500" />
                                  <span class="text-gray-600">{goal}</span>
                                </li>
                              )}
                            </For>
                          </ul>
                        </div>
                      </div>

                      {partnership.photos && (
                        <div class="mt-8">
                          <h4 class="mb-4 flex items-center gap-2 text-xl font-semibold text-gray-900">
                            <Camera class="h-5 w-5 text-purple-500" />
                            {t('community_partnerships.workshop_photos')}
                          </h4>
                          <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                            <For each={partnership.photos}>
                              {(photo) => (
                                <div class="group relative overflow-hidden rounded-lg shadow-md transition-shadow duration-300 hover:shadow-lg">
                                  <img
                                    src={photo.src}
                                    alt={photo.alt}
                                    width={400}
                                    height={300}
                                    class="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                  />
                                  <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                    <div class="absolute bottom-0 left-0 right-0 p-4">
                                      <p class="text-sm font-medium text-white">
                                        {photo.caption}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </For>
                          </div>
                        </div>
                      )}

                      {partnership.specialOffer && (
                        <div class="mt-8 rounded-lg border border-yellow-200 bg-gradient-to-r from-yellow-50 to-orange-50 p-6">
                          <h4 class="mb-2 text-lg font-semibold text-gray-900">
                            🎟️ {partnership.specialOffer.title}
                          </h4>
                          <p class="mb-4 text-gray-700">
                            {partnership.specialOffer.description}
                          </p>
                          <a
                            href={partnership.specialOffer.link}
                            target="_blank"
                            rel="noopener"
                            class="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-3 font-semibold text-white transition-all duration-200 hover:from-purple-700 hover:to-blue-700"
                          >
                            {partnership.specialOffer.linkText}
                            <ExternalLink class="h-4 w-4" />
                          </a>
                        </div>
                      )}

                      <div class="mt-8 flex flex-col gap-4 sm:flex-row">
                        <a
                          href={partnership.website}
                          target="_blank"
                          rel="noopener"
                          class="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-white transition-colors duration-200 hover:bg-blue-700"
                        >
                          {t('community_partnerships.visit_website')}
                          <ExternalLink class="h-4 w-4" />
                        </a>
                        {partnership.contact.includes('@') ? (
                          <a
                            href={`mailto:${partnership.contact}`}
                            class="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-6 py-3 text-gray-700 transition-colors duration-200 hover:bg-gray-50"
                          >
                            Contact Project
                          </a>
                        ) : (
                          <a
                            href={partnership.contact}
                            target="_blank"
                            rel="noopener"
                            class="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-6 py-3 text-gray-700 transition-colors duration-200 hover:bg-gray-50"
                          >
                            Learn More
                            <ExternalLink class="h-4 w-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </For>
            }
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section class="bg-gray-900 py-16">
        <div class="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 class="mb-4 text-3xl font-bold text-white">
            {t('community_partnerships.cta_title')}
          </h2>
          <p class="mx-auto mb-8 max-w-2xl text-xl text-gray-300">
            {t('community_partnerships.cta_description')}
          </p>
          <a
            href="mailto:hello@meetjs.pl"
            class="inline-flex items-center gap-2 rounded-lg bg-purple-600 px-8 py-4 text-lg font-semibold text-white transition-colors duration-200 hover:bg-purple-700"
          >
            {t('community_partnerships.get_in_touch')}
          </a>
        </div>
      </section>
    </div>
  );
}
