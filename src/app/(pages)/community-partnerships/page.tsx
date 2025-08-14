import Image from 'next/image';
import { ExternalLink, Users, BookOpen, Shield, Camera } from 'lucide-react';
import { partnerships } from '@/content/partnerships';
import { getTranslate } from '@/tolgee/server';

export default async function CommunityPartnershipsPage() {
  const t = await getTranslate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-blue-600 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Users className="mx-auto mb-6 h-16 w-16 text-white" />
            <h1 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
              {t('community_partnerships.page_title')}
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-xl text-purple-100">
              {t('community_partnerships.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">
              {t('community_partnerships.our_partners_title')}
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              {t('community_partnerships.our_partners_description')}
            </p>
          </div>

          <div className="grid gap-8">
            {partnerships.map((partnership) => (
              <div
                key={partnership.name}
                className="overflow-hidden rounded-xl bg-white shadow-lg transition-shadow duration-300 hover:shadow-xl"
              >
                <div className={`bg-gradient-to-r ${partnership.gradient} p-6`}>
                  <div className="flex items-center gap-4">
                    {partnership.icon}
                    <div>
                      <h3 className="text-2xl font-bold text-white">
                        {partnership.name}
                      </h3>
                      <p className="mt-1 text-white/90">
                        {partnership.location}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-8">
                  <p className="mb-6 text-lg text-gray-700">
                    {partnership.description}
                  </p>

                  <div className="grid gap-8 md:grid-cols-2">
                    <div>
                      <h4 className="mb-4 flex items-center gap-2 text-xl font-semibold text-gray-900">
                        <BookOpen className="h-5 w-5 text-blue-500" />
                        {t('community_partnerships.what_they_do')}
                      </h4>
                      <ul className="space-y-2">
                        {partnership.details.map(
                          (detail: string, index: number) => (
                            <li key={index} className="flex items-start gap-2">
                              <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-blue-500" />
                              <span className="text-gray-600">{detail}</span>
                            </li>
                          ),
                        )}
                      </ul>
                    </div>

                    <div>
                      <h4 className="mb-4 flex items-center gap-2 text-xl font-semibold text-gray-900">
                        <Shield className="h-5 w-5 text-green-500" />
                        {t('community_partnerships.their_goals')}
                      </h4>
                      <ul className="space-y-2">
                        {partnership.goals.map(
                          (goal: string, index: number) => (
                            <li key={index} className="flex items-start gap-2">
                              <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-green-500" />
                              <span className="text-gray-600">{goal}</span>
                            </li>
                          ),
                        )}
                      </ul>
                    </div>
                  </div>

                  {partnership.photos && (
                    <div className="mt-8">
                      <h4 className="mb-4 flex items-center gap-2 text-xl font-semibold text-gray-900">
                        <Camera className="h-5 w-5 text-purple-500" />
                        {t('community_partnerships.workshop_photos')}
                      </h4>
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {partnership.photos.map((photo, index: number) => (
                          <div
                            key={index}
                            className="group relative overflow-hidden rounded-lg shadow-md transition-shadow duration-300 hover:shadow-lg"
                          >
                            <Image
                              src={photo.src}
                              alt={photo.alt}
                              width={400}
                              height={300}
                              className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                              <div className="absolute bottom-0 left-0 right-0 p-4">
                                <p className="text-sm font-medium text-white">
                                  {photo.caption}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {partnership.specialOffer && (
                    <div className="mt-8 rounded-lg border border-yellow-200 bg-gradient-to-r from-yellow-50 to-orange-50 p-6">
                      <h4 className="mb-2 text-lg font-semibold text-gray-900">
                        🎟️ {partnership.specialOffer.title}
                      </h4>
                      <p className="mb-4 text-gray-700">
                        {partnership.specialOffer.description}
                      </p>
                      <a
                        href={partnership.specialOffer.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-3 font-semibold text-white transition-all duration-200 hover:from-purple-700 hover:to-blue-700"
                      >
                        {partnership.specialOffer.linkText}
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>
                  )}

                  <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                    <a
                      href={partnership.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-white transition-colors duration-200 hover:bg-blue-700"
                    >
                      {t('community_partnerships.visit_website')}
                      <ExternalLink className="h-4 w-4" />
                    </a>
                    {partnership.contact.includes('@') ? (
                      <a
                        href={`mailto:${partnership.contact}`}
                        className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-6 py-3 text-gray-700 transition-colors duration-200 hover:bg-gray-50"
                      >
                        Contact Project
                      </a>
                    ) : (
                      <a
                        href={partnership.contact}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-6 py-3 text-gray-700 transition-colors duration-200 hover:bg-gray-50"
                      >
                        Learn More
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gray-900 py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-4 text-3xl font-bold text-white">
            {t('community_partnerships.cta_title')}
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-xl text-gray-300">
            {t('community_partnerships.cta_description')}
          </p>
          <a
            href="mailto:hello@meetjs.pl"
            className="inline-flex items-center gap-2 rounded-lg bg-purple-600 px-8 py-4 text-lg font-semibold text-white transition-colors duration-200 hover:bg-purple-700"
          >
            {t('community_partnerships.get_in_touch')}
          </a>
        </div>
      </section>
    </div>
  );
}
