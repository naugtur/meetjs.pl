import type { Metadata } from 'next';
import { getSpeakers } from '@/lib/crossweb';
import { getTranslate } from '@/tolgee/server';
import { SpeakersDirectory } from '@/components/SpeakersDirectory';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslate();

  return {
    title: t('speakers_page.meta_title'),
    description: t('speakers_page.meta_description'),
  };
}

const SpeakersPage = async () => {
  const speakers = await getSpeakers();
  const t = await getTranslate();

  return (
    <main className="mx-auto flex min-h-screen max-w-7xl flex-col items-center gap-6 p-5 px-5 sm:px-6 lg:px-8">
      <section className="flex w-full flex-col items-center justify-center gap-6">
        <h1 className="py-4 text-4xl font-bold">
          {t('speakers_page.page_title')}
        </h1>
        <p className="text-center text-lg text-gray-600">
          {t('speakers_page.subtitle')}
        </p>
      </section>

      {speakers.length > 0 ? (
        <SpeakersDirectory speakers={speakers} />
      ) : (
        <p className="text-gray-500">{t('speakers_page.no_speakers')}</p>
      )}

      <p className="pb-8 text-sm text-gray-400">
        {t('speakers_page.powered_by')}{' '}
        <a
          href="https://crossweb.pl"
          target="_blank"
          rel="noopener"
          className="underline hover:text-gray-600"
        >
          Crossweb
        </a>
      </p>
    </main>
  );
};

export default SpeakersPage;
