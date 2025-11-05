import Link from 'next/link';
import { getTranslate } from '@/tolgee/server';

export default async function Page() {
  const t = await getTranslate();

  return (
    <div className="container mx-auto max-w-3xl py-16">
      <h1 className="mb-8 text-4xl font-bold">{t('organizer.page_title')}</h1>

      <div className="mb-8 space-y-4">
        <p>
          {t('organizer.intro_p1')}
        </p>
        <p>
          {t('organizer.intro_p2')}
        </p>
        <p>
          {t('organizer.intro_p3')}
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold">
          {t('organizer.contact_heading')}{' '}
          <a href="mailto:contact@meetjs.pl?subject=meet.js%20YOURCITY">
            <strong>{t('organizer.contact_email')}</strong>
          </a>{' '}
          {t('organizer.contact_subject')}
        </h2>
      </div>

      <div className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">{t('organizer.requirements_title')}</h2>
        <ul className="list-disc space-y-2 pl-6">
          <li>{t('organizer.requirements.time')}</li>
          <li>
            {t('organizer.requirements.non_commercial')}
          </li>
          <li>
            {t('organizer.requirements.involvement')}
          </li>
        </ul>
      </div>

      <div className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">{t('organizer.benefits_title')}</h2>
        <ul className="list-disc space-y-2 pl-6">
          <li>{t('organizer.benefits.access')}</li>
          <li>
            {t('organizer.benefits.intro_call')}
          </li>
          <li>{t('organizer.benefits.sponsor_help')}</li>
          <li>{t('organizer.benefits.brand_access')}</li>
          <li>
            {t('organizer.benefits.network')}
          </li>
        </ul>
      </div>

      <div>
        <h2 className="mb-4 text-2xl font-semibold">
          {t('organizer.no_benefits_title')}
        </h2>
        <ul className="list-disc space-y-2 pl-6">
          <li>{t('organizer.no_benefits.money')}</li>
        </ul>
      </div>

      <div className="mt-12 rounded-lg border bg-white p-6 shadow-sm">
        <h2 className="mb-2 text-2xl font-semibold">{t('organizer.tools_page_title')}</h2>
        <p className="mb-4 text-gray-700">{t('organizer.tools_intro')}</p>
        <Link href="/how-to-become-an-organizer/tools" className="inline-block rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700">
          {t('organizer.tools_page_title')}
        </Link>
      </div>
    </div>
  );
}
