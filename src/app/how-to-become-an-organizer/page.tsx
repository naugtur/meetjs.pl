import Link from 'next/link';
import Image from 'next/image';
import { 
  Mail, 
  Users, 
  Calendar, 
  Heart, 
  Handshake, 
  BookOpen,
  ExternalLink,
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import { getTranslate } from '@/tolgee/server';

export default async function Page() {
  const t = await getTranslate();

  return (
    <div className="container mx-auto max-w-4xl py-16">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold">{t('organizer.page_title')}</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {t('organizer.page_subtitle')}
        </p>
      </div>

      {/* Hero Image */}
      <div className="mb-12">
        <Image
          src="/about/meetjs-organizers.jpg"
          alt="meet.js organizers community"
          width={1024}
          height={400}
          className="h-64 w-full rounded-lg object-cover shadow-lg"
        />
      </div>

      {/* Quick Start CTA */}
      <div className="mb-12 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 p-8 text-white">
        <div className="text-center">
          <h2 className="mb-4 text-2xl font-bold">{t('organizer.ready_to_start_cta.title')}</h2>
          <p className="mb-6 text-purple-100">
            {t('organizer.ready_to_start_cta.description')}
          </p>
          <a 
            href="mailto:contact@meetjs.pl?subject=meet.js%20YOURCITY"
            className="inline-flex items-center gap-2 rounded-md bg-white px-6 py-3 text-purple-600 transition-colors hover:bg-gray-100"
          >
            <Mail className="h-4 w-4" />
            {t('organizer.contact_heading')} <strong>{t('organizer.contact_email')}</strong>
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>

      {/* Introduction */}
      <section className="mb-12">
        <div className="mb-8 space-y-4">
          <p>{t('organizer.intro_p1')}</p>
          <p>{t('organizer.intro_p2')}</p>
          <p>{t('organizer.intro_p3')}</p>
        </div>
      </section>

      {/* What is Organizer? */}
      <section className="mb-12">
        <h2 className="mb-6 text-3xl font-bold">{t('organizer.what_is_organizer')}</h2>
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-4">
            <p className="text-gray-700">
              {t('organizer.organizer_description')}
            </p>
            <p className="text-gray-700">
              {t('organizer.community_heart_description')}
            </p>
          </div>
          <div className="rounded-lg border bg-blue-50 p-6">
            <h3 className="mb-4 text-xl font-semibold text-blue-800">{t('organizer.organizer_impact')}</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span>{t('organizer.impact_items.build_community')}</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span>{t('organizer.impact_items.connect_developers')}</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span>{t('organizer.impact_items.share_knowledge')}</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span>{t('organizer.impact_items.shape_future')}</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="mb-12">
        <h2 className="mb-6 text-3xl font-bold">{t('organizer.requirements_title')}</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-lg border bg-white p-6 shadow-sm">
            <Users className="mb-4 h-8 w-8 text-blue-600" />
            <h3 className="mb-2 text-lg font-semibold">{t('organizer.requirements_labels.time_commitment')}</h3>
            <p className="text-gray-600">{t('organizer.requirements.time')}</p>
          </div>
          <div className="rounded-lg border bg-white p-6 shadow-sm">
            <Heart className="mb-4 h-8 w-8 text-red-600" />
            <h3 className="mb-2 text-lg font-semibold">{t('organizer.requirements_labels.community_spirit')}</h3>
            <p className="text-gray-600">{t('organizer.requirements.involvement')}</p>
          </div>
          <div className="rounded-lg border bg-white p-6 shadow-sm">
            <Handshake className="mb-4 h-8 w-8 text-green-600" />
            <h3 className="mb-2 text-lg font-semibold">{t('organizer.requirements_labels.non_commercial_approach')}</h3>
            <p className="text-gray-600">{t('organizer.requirements.non_commercial')}</p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="mb-12">
        <h2 className="mb-6 text-3xl font-bold">{t('organizer.benefits_title')}</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-6">
            <div className="flex gap-4">
              <BookOpen className="h-6 w-6 text-purple-600 mt-1" />
              <div>
                <h3 className="font-semibold">{t('organizer.benefits_labels.complete_toolkit')}</h3>
                <p className="text-gray-600">{t('organizer.benefits.access')}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Users className="h-6 w-6 text-blue-600 mt-1" />
              <div>
                <h3 className="font-semibold">{t('organizer.benefits_labels.network_access')}</h3>
                <p className="text-gray-600">{t('organizer.benefits.intro_call')}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Calendar className="h-6 w-6 text-green-600 mt-1" />
              <div>
                <h3 className="font-semibold">{t('organizer.benefits_labels.event_support')}</h3>
                <p className="text-gray-600">{t('organizer.benefits.sponsor_help')}</p>
              </div>
            </div>
          </div>
          <div className="rounded-lg border bg-gray-50 p-6">
            <h3 className="mb-4 font-semibold">{t('organizer.no_benefits_title')}</h3>
            <p className="text-gray-600">{t('organizer.no_benefits.money')}</p>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="mb-12">
        <h2 className="mb-6 text-3xl font-bold">{t('organizer.process_steps.title')}</h2>
        <div className="space-y-6">
          <div className="flex gap-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white font-bold">1</div>
            <div>
              <h3 className="font-semibold">{t('organizer.process_steps.contact_us.title')}</h3>
              <p className="text-gray-600">{t('organizer.process_steps.contact_us.description')}</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white font-bold">2</div>
            <div>
              <h3 className="font-semibold">{t('organizer.process_steps.intro_call.title')}</h3>
              <p className="text-gray-600">{t('organizer.process_steps.intro_call.description')}</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white font-bold">3</div>
            <div>
              <h3 className="font-semibold">{t('organizer.process_steps.get_access.title')}</h3>
              <p className="text-gray-600">{t('organizer.process_steps.get_access.description')}</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white font-bold">4</div>
            <div>
              <h3 className="font-semibold">{t('organizer.process_steps.first_event.title')}</h3>
              <p className="text-gray-600">{t('organizer.process_steps.first_event.description')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <div className="rounded-lg border bg-white p-8 text-center shadow-sm">
        <h2 className="mb-4 text-2xl font-bold">{t('organizer.final_cta.title')}</h2>
        <p className="mb-6 text-gray-600">
          {t('organizer.final_cta.description')}
        </p>
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <a 
            href="mailto:contact@meetjs.pl?subject=meet.js%20YOURCITY"
            className="inline-flex items-center justify-center gap-2 rounded-md bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700"
          >
            <Mail className="h-4 w-4" />
            {t('organizer.contact_heading')} <strong>{t('organizer.contact_email')}</strong>
          </a>
          <Link 
            href="/organizers"
            className="inline-flex items-center justify-center gap-2 rounded-md border border-gray-300 px-6 py-3 text-gray-700 transition-colors hover:bg-gray-50"
          >
            {t('organizer.final_cta.view_resources')}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
