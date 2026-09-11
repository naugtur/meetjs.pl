import {
  Mail,
  Users,
  Calendar,
  Heart,
  Handshake,
  BookOpen,
  ExternalLink,
  CheckCircle,
  ArrowRight,
} from '@/lib/lucide';
import { useTranslate } from '@/i18n';

export default function Page() {
  const { t } = useTranslate();

  return (
    <div class="container mx-auto max-w-4xl py-16">
      <div class="mb-12 text-center">
        <h1 class="mb-4 text-4xl font-bold">{t('organizer.page_title')}</h1>
        <p class="mx-auto max-w-2xl text-lg text-gray-600">
          {t('organizer.page_subtitle')}
        </p>
      </div>

      {/* Hero Image */}
      <div class="mb-12">
        <img
          src="/about/meetjs-organizers.jpg"
          alt="meet.js organizers community"
          width={1024}
          height={400}
          class="h-64 w-full rounded-lg object-cover shadow-lg"
        />
      </div>

      {/* Quick Start CTA */}
      <div class="mb-12 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 p-8 text-white">
        <div class="text-center">
          <h2 class="mb-4 text-2xl font-bold">
            {t('organizer.ready_to_start_cta.title')}
          </h2>
          <p class="mb-6 text-purple-100">
            {t('organizer.ready_to_start_cta.description')}
          </p>
          <a
            href="mailto:contact@meetjs.pl?subject=meet.js%20YOURCITY"
            class="inline-flex items-center gap-2 rounded-md bg-white px-6 py-3 text-purple-600 transition-colors hover:bg-gray-100"
          >
            <Mail class="h-4 w-4" />
            {t('organizer.contact_heading')}{' '}
            <strong>{t('organizer.contact_email')}</strong>
            <ExternalLink class="h-4 w-4" />
          </a>
        </div>
      </div>

      {/* Introduction */}
      <section class="mb-12">
        <div class="mb-8 space-y-4">
          <p>{t('organizer.intro_p1')}</p>
          <p>{t('organizer.intro_p2')}</p>
          <p>{t('organizer.intro_p3')}</p>
        </div>
      </section>

      {/* What is Organizer? */}
      <section class="mb-12">
        <h2 class="mb-6 text-3xl font-bold">
          {t('organizer.what_is_organizer')}
        </h2>
        <div class="grid gap-8 md:grid-cols-2">
          <div class="space-y-4">
            <p class="text-gray-700">{t('organizer.organizer_description')}</p>
            <p class="text-gray-700">
              {t('organizer.community_heart_description')}
            </p>
          </div>
          <div class="rounded-lg border bg-blue-50 p-6">
            <h3 class="mb-4 text-xl font-semibold text-blue-800">
              {t('organizer.organizer_impact')}
            </h3>
            <ul class="space-y-2">
              <li class="flex items-center gap-2">
                <CheckCircle class="h-5 w-5 text-green-600" />
                <span>{t('organizer.impact_items.build_community')}</span>
              </li>
              <li class="flex items-center gap-2">
                <CheckCircle class="h-5 w-5 text-green-600" />
                <span>{t('organizer.impact_items.connect_developers')}</span>
              </li>
              <li class="flex items-center gap-2">
                <CheckCircle class="h-5 w-5 text-green-600" />
                <span>{t('organizer.impact_items.share_knowledge')}</span>
              </li>
              <li class="flex items-center gap-2">
                <CheckCircle class="h-5 w-5 text-green-600" />
                <span>{t('organizer.impact_items.shape_future')}</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section class="mb-12">
        <h2 class="mb-6 text-3xl font-bold">
          {t('organizer.requirements_title')}
        </h2>
        <div class="grid gap-6 md:grid-cols-3">
          <div class="rounded-lg border bg-white p-6 shadow-sm">
            <Users class="mb-4 h-8 w-8 text-blue-600" />
            <h3 class="mb-2 text-lg font-semibold">
              {t('organizer.requirements_labels.time_commitment')}
            </h3>
            <p class="text-gray-600">{t('organizer.requirements.time')}</p>
          </div>
          <div class="rounded-lg border bg-white p-6 shadow-sm">
            <Heart class="mb-4 h-8 w-8 text-red-600" />
            <h3 class="mb-2 text-lg font-semibold">
              {t('organizer.requirements_labels.community_spirit')}
            </h3>
            <p class="text-gray-600">
              {t('organizer.requirements.involvement')}
            </p>
          </div>
          <div class="rounded-lg border bg-white p-6 shadow-sm">
            <Handshake class="mb-4 h-8 w-8 text-green-600" />
            <h3 class="mb-2 text-lg font-semibold">
              {t('organizer.requirements_labels.non_commercial_approach')}
            </h3>
            <p class="text-gray-600">
              {t('organizer.requirements.non_commercial')}
            </p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section class="mb-12">
        <h2 class="mb-6 text-3xl font-bold">{t('organizer.benefits_title')}</h2>
        <div class="grid gap-6 md:grid-cols-2">
          <div class="space-y-6">
            <div class="flex gap-4">
              <BookOpen class="mt-1 h-6 w-6 text-purple-600" />
              <div>
                <h3 class="font-semibold">
                  {t('organizer.benefits_labels.complete_toolkit')}
                </h3>
                <p class="text-gray-600">{t('organizer.benefits.access')}</p>
              </div>
            </div>
            <div class="flex gap-4">
              <Users class="mt-1 h-6 w-6 text-blue-600" />
              <div>
                <h3 class="font-semibold">
                  {t('organizer.benefits_labels.network_access')}
                </h3>
                <p class="text-gray-600">
                  {t('organizer.benefits.intro_call')}
                </p>
              </div>
            </div>
            <div class="flex gap-4">
              <Calendar class="mt-1 h-6 w-6 text-green-600" />
              <div>
                <h3 class="font-semibold">
                  {t('organizer.benefits_labels.event_support')}
                </h3>
                <p class="text-gray-600">
                  {t('organizer.benefits.sponsor_help')}
                </p>
              </div>
            </div>
          </div>
          <div class="rounded-lg border bg-gray-50 p-6">
            <h3 class="mb-4 font-semibold">
              {t('organizer.no_benefits_title')}
            </h3>
            <p class="text-gray-600">{t('organizer.no_benefits.money')}</p>
          </div>
        </div>
      </section>

      {/* Process */}
      <section class="mb-12">
        <h2 class="mb-6 text-3xl font-bold">
          {t('organizer.process_steps.title')}
        </h2>
        <div class="space-y-6">
          <div class="flex gap-4">
            <div class="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
              1
            </div>
            <div>
              <h3 class="font-semibold">
                {t('organizer.process_steps.contact_us.title')}
              </h3>
              <p class="text-gray-600">
                {t('organizer.process_steps.contact_us.description')}
              </p>
            </div>
          </div>
          <div class="flex gap-4">
            <div class="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
              2
            </div>
            <div>
              <h3 class="font-semibold">
                {t('organizer.process_steps.intro_call.title')}
              </h3>
              <p class="text-gray-600">
                {t('organizer.process_steps.intro_call.description')}
              </p>
            </div>
          </div>
          <div class="flex gap-4">
            <div class="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
              3
            </div>
            <div>
              <h3 class="font-semibold">
                {t('organizer.process_steps.get_access.title')}
              </h3>
              <p class="text-gray-600">
                {t('organizer.process_steps.get_access.description')}
              </p>
            </div>
          </div>
          <div class="flex gap-4">
            <div class="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
              4
            </div>
            <div>
              <h3 class="font-semibold">
                {t('organizer.process_steps.first_event.title')}
              </h3>
              <p class="text-gray-600">
                {t('organizer.process_steps.first_event.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <div class="rounded-lg border bg-white p-8 text-center shadow-sm">
        <h2 class="mb-4 text-2xl font-bold">
          {t('organizer.final_cta.title')}
        </h2>
        <p class="mb-6 text-gray-600">{t('organizer.final_cta.description')}</p>
        <div class="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <a
            href="mailto:contact@meetjs.pl?subject=meet.js%20YOURCITY"
            class="inline-flex items-center justify-center gap-2 rounded-md bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700"
          >
            <Mail class="h-4 w-4" />
            {t('organizer.contact_heading')}{' '}
            <strong>{t('organizer.contact_email')}</strong>
          </a>
          <a
            href="/organizers"
            class="inline-flex items-center justify-center gap-2 rounded-md border border-gray-300 px-6 py-3 text-gray-700 transition-colors hover:bg-gray-50"
          >
            {t('organizer.final_cta.view_resources')}
            <ArrowRight class="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
