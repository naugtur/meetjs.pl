import Link from 'next/link';
import { getTranslate } from '@/tolgee/server';

export default async function OrganizerToolsPage() {
  const t = await getTranslate();

  return (
    <div className="container mx-auto max-w-3xl py-16">
      <h1 className="mb-4 text-4xl font-bold">
        {t('organizer.tools_page_title')}
      </h1>
      <p className="mb-8 text-lg text-gray-700">{t('organizer.tools_intro')}</p>

      <section className="mb-12 rounded-lg border bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center gap-3">
          <span className="text-3xl">🖼️</span>
          <h2 className="text-2xl font-semibold">
            {t('organizer.generator_title')}
          </h2>
        </div>
        <p className="mb-6 text-gray-600">
          {t('organizer.generator_description')}
        </p>
        <a
          href="https://meetjspl.github.io/assets-generator/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
        >
          {t('organizer.generator_cta')}
        </a>
      </section>

      <div className="text-sm text-gray-600">
        <span>{t('organizer.back_to_main')}</span>{' '}
        <Link
          href="/how-to-become-an-organizer"
          className="underline hover:no-underline"
        >
          {t('organizer.back_to_main_link')}
        </Link>
      </div>
    </div>
  );
}
