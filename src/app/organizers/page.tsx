import { Metadata } from 'next';
import {
  Users,
  Calendar,
  FileText,
  Download,
  Mail,
  ExternalLink,
  Image as ImageIcon,
  CalendarDays,
  Heart,
} from 'lucide-react';
import { getTranslate } from '@/tolgee/server';

export const metadata: Metadata = {
  title: 'Organizer Resources | meet.js',
  description: 'Tools, assets, and resources for meet.js organizers',
};

export default async function OrganizersPage() {
  const t = await getTranslate();

  return (
    <div className="container mx-auto max-w-6xl py-16">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold">
          {t('organizer.hub_page_title')}
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-gray-600">
          {t('organizer.hub_page_subtitle')}
        </p>
      </div>

      {/* Quick Actions */}
      <div className="mb-16 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <a
          href="/how-to-become-an-organizer"
          className="rounded-lg border bg-blue-50 p-4 text-center transition-colors hover:bg-blue-100"
        >
          <Users className="mx-auto mb-2 h-6 w-6 text-blue-600" />
          <p className="font-medium text-blue-800">
            {t('organizer.quick_actions.become_organizer')}
          </p>
        </a>
        <a
          href="/events"
          className="rounded-lg border bg-green-50 p-4 text-center transition-colors hover:bg-green-100"
        >
          <Calendar className="mx-auto mb-2 h-6 w-6 text-green-600" />
          <p className="font-medium text-green-800">
            {t('organizer.quick_actions.browse_events')}
          </p>
        </a>
        <a
          href="https://discord.gg/8r9XKTeNW8"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg border bg-purple-50 p-4 text-center transition-colors hover:bg-purple-100"
        >
          <ExternalLink className="mx-auto mb-2 h-6 w-6 text-purple-600" />
          <p className="font-medium text-purple-800">
            {t('organizer.quick_actions.join_discord')}
          </p>
        </a>
        <a
          href="mailto:contact@meetjs.pl"
          className="rounded-lg border bg-orange-50 p-4 text-center transition-colors hover:bg-orange-100"
        >
          <Mail className="mx-auto mb-2 h-6 w-6 text-orange-600" />
          <p className="font-medium text-orange-800">
            {t('organizer.quick_actions.get_help')}
          </p>
        </a>
      </div>

      {/* Tools Section */}
      <section id="tools" className="mb-16">
        <div className="mb-8 text-center">
          <h2 className="mb-4 text-3xl font-bold">
            {t('organizer.tools_section.title')}
          </h2>
          <p className="text-gray-600">
            {t('organizer.tools_section.subtitle')}
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-lg border bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-3">
              <ImageIcon className="h-6 w-6 text-purple-600" />
              <h3 className="text-xl font-semibold">
                {t('organizer.tools_section.image_generator.title')}
              </h3>
            </div>
            <p className="mb-4 text-gray-600">
              {t('organizer.tools_section.image_generator.description')}
            </p>
            <a
              href="https://meetjspl.github.io/assets-generator/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-purple-600 px-4 py-2 text-white transition-colors hover:bg-purple-700"
            >
              <Download className="h-4 w-4" />
              {t('organizer.tools_section.image_generator.cta')}
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>

          <div className="rounded-lg border bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-3">
              <CalendarDays className="h-6 w-6 text-blue-600" />
              <h3 className="text-xl font-semibold">
                {t('organizer.tools_section.event_management.title')}
              </h3>
            </div>
            <p className="mb-4 text-gray-600">
              {t('organizer.tools_section.event_management.description')}
            </p>
            <div className="space-y-2">
              <a
                href="/how-to-become-an-organizer"
                className="block text-blue-600 hover:underline"
              >
                {t(
                  'organizer.tools_section.event_management.event_planning_guide',
                )}{' '}
                →
              </a>
              <a href="/about" className="block text-blue-600 hover:underline">
                {t('organizer.tools_section.event_management.about_meetjs')} →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Assets Section */}
      <section id="assets" className="mb-16">
        <div className="mb-8 text-center">
          <h2 className="mb-4 text-3xl font-bold">
            {t('organizer.assets_section.title')}
          </h2>
          <p className="text-gray-600">
            {t('organizer.assets_section.subtitle')}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-3">
              <FileText className="h-6 w-6 text-green-600" />
              <h3 className="text-lg font-semibold">
                {t('organizer.assets_section.current_logos.title')}
              </h3>
            </div>
            <p className="mb-4 text-sm text-gray-600">
              {t('organizer.assets_section.current_logos.description')}
            </p>
            <div className="space-y-2 text-sm">
              <p className="text-gray-500">
                {t('organizer.assets_section.current_logos.available_formats')}
              </p>
              <ul className="list-disc pl-4 text-gray-600">
                <li>SVG format</li>
                <li>PNG format</li>
                <li>Multiple colors</li>
                <li>Square variants</li>
              </ul>
            </div>
          </div>

          <div className="rounded-lg border bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-3">
              <Heart className="h-6 w-6 text-red-600" />
              <h3 className="text-lg font-semibold">
                {t('organizer.assets_section.legacy_assets.title')}
              </h3>
            </div>
            <p className="mb-4 text-sm text-gray-600">
              {t('organizer.assets_section.legacy_assets.description')}
            </p>
            <div className="space-y-2 text-sm">
              <p className="text-gray-500">
                {t('organizer.assets_section.legacy_assets.includes')}
              </p>
              <ul className="list-disc pl-4 text-gray-600">
                <li>Purple logo variants</li>
                <li>Summit specific logos</li>
                <li>Print materials</li>
                <li>Historical branding</li>
              </ul>
            </div>
          </div>

          <div className="rounded-lg border bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-3">
              <ImageIcon className="h-6 w-6 text-blue-600" />
              <h3 className="text-lg font-semibold">
                {t('organizer.assets_section.wallpapers.title')}
              </h3>
            </div>
            <p className="mb-4 text-sm text-gray-600">
              {t('organizer.assets_section.wallpapers.description')}
            </p>
            <div className="space-y-2 text-sm">
              <p className="text-gray-500">
                {t('organizer.assets_section.wallpapers.available')}
              </p>
              <ul className="list-disc pl-4 text-gray-600">
                <li>1920x1080 resolution</li>
                <li>Meet.js cover images</li>
                <li>Various themes</li>
                <li>Social media ready</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Cities Section */}
      <section id="cities" className="mb-16">
        <div className="mb-8 text-center">
          <h2 className="mb-4 text-3xl font-bold">
            {t('organizers_hub.cities_section.title')}
          </h2>
          <p className="text-gray-600">
            {t('organizers_hub.cities_section.subtitle')}
          </p>
        </div>

        <div className="rounded-lg border bg-white p-8">
          <p className="mb-6 text-center text-gray-600">
            {t('organizers_hub.cities_section.description')}
          </p>
          <div className="text-center">
            <a
              href="/events"
              className="inline-flex items-center rounded-md bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700"
            >
              {t('organizers_hub.cities_section.browse_cities')}
            </a>
          </div>
        </div>
      </section>

      {/* New Organizer CTA */}
      <div className="rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white">
        <div className="text-center">
          <h2 className="mb-4 text-2xl font-bold">
            {t('organizers_hub.cta_section.title')}
          </h2>
          <p className="mx-auto mb-6 max-w-2xl text-blue-100">
            {t('organizers_hub.cta_section.description')}
          </p>
          <a
            href="/how-to-become-an-organizer"
            className="inline-flex items-center rounded-md bg-white px-6 py-3 text-blue-600 transition-colors hover:bg-gray-100"
          >
            {t('organizers_hub.cta_section.start_journey')}
            <ExternalLink className="ml-2 h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
