import { createMemo, For, Show } from 'solid-js';
import { getSpeakers } from '@/data/queries';
import { useTranslate } from '@/i18n';

export const SpeakerFaces = () => {
  const speakers = createMemo(() => getSpeakers());
  const { t } = useTranslate();

  // Only show speakers that have images, limit to 60
  const speakersWithImages = () =>
    (speakers() ?? []).filter((s) => s.image).slice(0, 60);

  return (
    <Show when={speakersWithImages().length > 0}>
      <section class="w-full py-12 md:py-16">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="text-center">
            <h2 class="mb-2 text-3xl font-bold">
              {t('speakers_page.page_title')}
            </h2>
            <p class="mb-8 text-gray-600">
              {speakers()?.length}+ {t('speaker_faces.community_members')}
            </p>
          </div>

          <div class="flex flex-wrap items-center justify-center gap-2">
            <For each={speakersWithImages()}>
              {(speaker) => (
                <div
                  class="h-12 w-12 overflow-hidden rounded-full ring-2 ring-white transition-transform hover:scale-110 hover:ring-purple sm:h-14 sm:w-14"
                  title={`${speaker.name} ${speaker.surname || ''}`}
                >
                  <img
                    src={speaker.image!}
                    alt={`${speaker.name} ${speaker.surname || ''}`}
                    width={56}
                    height={56}
                    class="h-full w-full object-cover"
                  />
                </div>
              )}
            </For>
          </div>

          <div class="mt-8 text-center">
            <a
              href="/speakers"
              class="inline-flex items-center gap-2 rounded-lg bg-purple px-6 py-3 font-semibold text-white transition-colors hover:bg-purple/80"
            >
              {t('speaker_faces.view_all')}
            </a>
          </div>
        </div>
      </section>
    </Show>
  );
};
