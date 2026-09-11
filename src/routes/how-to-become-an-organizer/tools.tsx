import { useTranslate } from '@/i18n';

export default function OrganizerToolsPage() {
  const { t } = useTranslate();

  return (
    <div class="container mx-auto max-w-3xl py-16">
      <h1 class="mb-4 text-4xl font-bold">{t('organizer.tools_page_title')}</h1>
      <p class="mb-8 text-lg text-gray-700">{t('organizer.tools_intro')}</p>

      <section class="mb-12 rounded-lg border bg-white p-6 shadow-sm">
        <div class="mb-4 flex items-center gap-3">
          <span class="text-3xl">🖼️</span>
          <h2 class="text-2xl font-semibold">
            {t('organizer.generator_title')}
          </h2>
        </div>
        <p class="mb-6 text-gray-600">{t('organizer.generator_description')}</p>
        <a
          href="https://meetjspl.github.io/assets-generator/"
          target="_blank"
          rel="noopener"
          class="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
        >
          {t('organizer.generator_cta')}
        </a>
      </section>

      <div class="text-sm text-gray-600">
        <span>{t('organizer.back_to_main')}</span>{' '}
        <a
          href="/how-to-become-an-organizer"
          class="underline hover:no-underline"
        >
          {t('organizer.back_to_main_link')}
        </a>
      </div>
    </div>
  );
}
