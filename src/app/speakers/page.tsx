import type { Metadata } from 'next';
import Image from 'next/image';
import { FaArrowUpRightFromSquare } from 'react-icons/fa6';
import { getSpeakers } from '@/utils/getSpeakers';
import { getTranslate } from '@/tolgee/server';

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
        <section className="w-full">
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {speakers.map((speaker) => (
              <div
                key={speaker.id}
                className="flex flex-col items-center rounded-lg border border-gray-200 bg-white p-6 shadow-md"
              >
                <div className="mb-4 h-24 w-24 overflow-hidden rounded-full bg-gray-100">
                  {speaker.image ? (
                    <Image
                      src={speaker.image}
                      alt={`${speaker.name} ${speaker.surname}`}
                      width={96}
                      height={96}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-2xl font-bold text-gray-400">
                      {speaker.name.charAt(0)}
                      {speaker.surname?.charAt(0)}
                    </div>
                  )}
                </div>
                <div className="text-center">
                  <h2 className="text-lg font-semibold text-gray-900">
                    {speaker.name} {speaker.surname}
                  </h2>
                  <p className="mt-1 text-sm text-purple">
                    {speaker.events_count}x 🎤
                  </p>
                  <a
                    href={speaker.url}
                    target="_blank"
                    rel="noopener"
                    className="mt-2 inline-flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700"
                  >
                    {t('speakers_page.view_profile')}
                    <FaArrowUpRightFromSquare className="h-3 w-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
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
