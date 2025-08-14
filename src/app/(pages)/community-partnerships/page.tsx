import Link from 'next/link';
import Image from 'next/image';
import { ExternalLink, Users, BookOpen, Shield, Camera } from 'lucide-react';
import { getTranslate } from '@/tolgee/server';
import { getPartnerships } from '@/content/partnerships';


export default async function CommunityPartnershipsPage() {
  const t = await getTranslate();
  const partnerships = getPartnerships(t);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-blue-600 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Users className="mx-auto h-16 w-16 text-white mb-6" />
            <h1 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
              {t('community_partnerships.page_title')}
            </h1>
            <p className="mt-6 text-xl text-purple-100 max-w-3xl mx-auto">
              {t('community_partnerships.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t('community_partnerships.our_partners_title')}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('community_partnerships.our_partners_description')}
            </p>
          </div>

          <div className="grid gap-8">
            {partnerships.map((partnership) => (
              <div
                key={partnership.name}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className={`bg-gradient-to-r ${partnership.gradient} p-6`}>
                  <div className="flex items-center gap-4">
                    {partnership.icon}
                    <div>
                      <h3 className="text-2xl font-bold text-white">
                        {partnership.name}
                      </h3>
                      <p className="text-white/90 mt-1">
                        {partnership.location}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-8">
                  <p className="text-lg text-gray-700 mb-6">
                    {partnership.description}
                  </p>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <BookOpen className="h-5 w-5 text-blue-500" />
                        {t('community_partnerships.what_they_do')}
                      </h4>
                      <ul className="space-y-2">
                        {partnership.details.map((detail: string, index: number) => (
                          <li key={index} className="flex items-start gap-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                            <span className="text-gray-600">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <Shield className="h-5 w-5 text-green-500" />
                        {t('community_partnerships.their_goals')}
                      </h4>
                      <ul className="space-y-2">
                        {partnership.goals.map((goal: string, index: number) => (
                          <li key={index} className="flex items-start gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                            <span className="text-gray-600">{goal}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {partnership.photos && (
                    <div className="mt-8">
                      <h4 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <Camera className="h-5 w-5 text-purple-500" />
                        {t('community_partnerships.workshop_photos')}
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {partnership.photos.map((photo, index: number) => (
                          <div key={index} className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                            <Image
                              src={photo.src}
                              alt={photo.alt}
                              width={400}
                              height={300}
                              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <div className="absolute bottom-0 left-0 right-0 p-4">
                                <p className="text-white text-sm font-medium">
                                  {photo.caption}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mt-8 flex flex-col sm:flex-row gap-4">
                    <Link
                      href={partnership.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                    >
                      {t('community_partnerships.visit_website')}
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                    <Link
                      href={`mailto:${partnership.contact}`}
                      className="inline-flex items-center gap-2 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                    >
                      {t('community_partnerships.contact_project')}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gray-900 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            {t('community_partnerships.cta_title')}
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            {t('community_partnerships.cta_description')}
          </p>
          <Link
            href="mailto:hello@meetjs.pl"
            className="inline-flex items-center gap-2 bg-purple-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-purple-700 transition-colors duration-200"
          >
            {t('community_partnerships.get_in_touch')}
          </Link>
        </div>
      </section>
    </div>
  );
}
