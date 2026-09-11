import { createMemo, For, Show } from 'solid-js';
import { Meta, Title } from '@solidjs/meta';
import { FaSolidArrowUpRightFromSquare } from 'solid-icons/fa';
import { getSpeakers } from '@/data/queries';
import { useTranslate } from '@/i18n';

const SpeakersPage = () => {
  const speakers = createMemo(() => getSpeakers());
  const { t } = useTranslate();

  return (
    <main class="mx-auto flex min-h-screen max-w-7xl flex-col items-center gap-6 p-5 px-5 sm:px-6 lg:px-8">
      <Title>{t('speakers_page.meta_title')}</Title>
      <Meta name="description" content={t('speakers_page.meta_description')} />
      <section class="flex w-full flex-col items-center justify-center gap-6">
        <h1 class="py-4 text-4xl font-bold">{t('speakers_page.page_title')}</h1>
        <p class="text-center text-lg text-gray-600">
          {t('speakers_page.subtitle')}
        </p>
      </section>

      <Show
        when={speakers() && speakers()!.length > 0}
        fallback={<p class="text-gray-500">{t('speakers_page.no_speakers')}</p>}
      >
        <section class="w-full">
          <div class="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <For each={speakers()}>
              {(speaker) => (
                <div class="flex flex-col items-center rounded-lg border border-gray-200 bg-white p-6 shadow-md">
                  <div class="mb-4 h-24 w-24 overflow-hidden rounded-full bg-gray-100">
                    <Show
                      when={speaker.image}
                      fallback={
                        <div class="flex h-full w-full items-center justify-center text-2xl font-bold text-gray-400">
                          {speaker.name.charAt(0)}
                          {speaker.surname?.charAt(0)}
                        </div>
                      }
                    >
                      <img
                        src={speaker.image!}
                        alt={`${speaker.name} ${speaker.surname}`}
                        width={96}
                        height={96}
                        class="h-full w-full object-cover"
                      />
                    </Show>
                  </div>
                  <div class="text-center">
                    <h2 class="text-lg font-semibold text-gray-900">
                      {speaker.name} {speaker.surname}
                    </h2>
                    <p class="mt-1 text-sm text-purple">
                      {speaker.events_count}x 🎤
                    </p>
                    <a
                      href={speaker.url}
                      target="_blank"
                      rel="noopener"
                      class="mt-2 inline-flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700"
                    >
                      {t('speakers_page.view_profile')}
                      <FaSolidArrowUpRightFromSquare class="h-3 w-3" />
                    </a>
                  </div>
                </div>
              )}
            </For>
          </div>
        </section>
      </Show>

      <p class="pb-8 text-sm text-gray-400">
        {t('speakers_page.powered_by')}{' '}
        <a
          href="https://crossweb.pl"
          target="_blank"
          rel="noopener"
          class="underline hover:text-gray-600"
        >
          Crossweb
        </a>
      </p>
    </main>
  );
};

export default SpeakersPage;
