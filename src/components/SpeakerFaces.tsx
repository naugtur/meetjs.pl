import Image from 'next/image';
import Link from 'next/link';
import type { Route } from 'next';
import { getSpeakers } from '@/utils/getSpeakers';
import { getTranslate } from '@/tolgee/server';

export const SpeakerFaces = async () => {
  const speakers = await getSpeakers();
  const t = await getTranslate();

  // Only show speakers that have images, limit to 60
  const speakersWithImages = speakers.filter((s) => s.image).slice(0, 60);

  if (speakersWithImages.length === 0) {
    return null;
  }

  return (
    <section className="w-full py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="mb-2 text-3xl font-bold">
            {t('speakers_page.page_title')}
          </h2>
          <p className="mb-8 text-gray-600">
            {speakers.length}+ {t('speaker_faces.community_members')}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2">
          {speakersWithImages.map((speaker) => (
            <div
              key={speaker.id}
              className="h-12 w-12 overflow-hidden rounded-full ring-2 ring-white transition-transform hover:scale-110 hover:ring-purple sm:h-14 sm:w-14"
              title={`${speaker.name} ${speaker.surname || ''}`}
            >
              <Image
                src={speaker.image!}
                alt={`${speaker.name} ${speaker.surname || ''}`}
                width={56}
                height={56}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href={'/speakers' as Route}
            className="inline-flex items-center gap-2 rounded-lg bg-purple px-6 py-3 font-semibold text-white transition-colors hover:bg-purple/80"
          >
            {t('speaker_faces.view_all')}
          </Link>
        </div>
      </div>
    </section>
  );
};
