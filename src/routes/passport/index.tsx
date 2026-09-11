import { For, Show } from 'solid-js';
import { FaSolidArrowUpRightFromSquare } from 'solid-icons/fa';
import { useTranslate, useLocale } from '@/i18n';
import { ELIGIBLE_CITIES } from '@/content/passport/eligibleCities';
import { PARTICIPANTS } from '@/content/passport/participants';
import { ATTENDANCE_RECORDS } from '@/content/passport/attendanceRecords';
import {
  computeHallOfFame,
  type HallOfFameEntry,
} from '@/lib/passport/hallOfFame';
import { BRACKETS } from '@/lib/passport/brackets';
import type { BracketId } from '@/types/passport';
import type { Participant } from '@/types/passport';
import {
  BRACKET_STYLES,
  STARTING_OUT_STYLE,
  formatAchievedAt,
  ParticipantAvatar,
} from '@/components/passport/Presentation';

function toBestAchievementOnly(
  hallOfFame: Record<BracketId, HallOfFameEntry[]>,
): Record<BracketId, HallOfFameEntry[]> {
  const bestBracketBySlug = new Map<string, BracketId>();

  for (const bracket of BRACKETS) {
    for (const entry of hallOfFame[bracket.id]) {
      bestBracketBySlug.set(entry.participant.slug, bracket.id);
    }
  }

  const result: Record<BracketId, HallOfFameEntry[]> = {
    two_city: [],
    four_city: [],
    six_city: [],
    all_city: [],
  };

  for (const bracket of BRACKETS) {
    result[bracket.id] = hallOfFame[bracket.id].filter(
      (entry) => bestBracketBySlug.get(entry.participant.slug) === bracket.id,
    );
  }

  return result;
}

export default function PassportPage() {
  const { t } = useTranslate();
  const i18n = useLocale();

  const fullHallOfFame = computeHallOfFame(
    PARTICIPANTS,
    ATTENDANCE_RECORDS,
    ELIGIBLE_CITIES,
  );
  const hallOfFame = toBestAchievementOnly(fullHallOfFame);

  const achievedSlugs = new Set(
    BRACKETS.flatMap((bracket) =>
      fullHallOfFame[bracket.id].map((entry) => entry.participant.slug),
    ),
  );
  const startingOutParticipants: Participant[] = PARTICIPANTS.filter(
    (participant) => !achievedSlugs.has(participant.slug),
  );

  const totalParticipants =
    BRACKETS.reduce((sum, bracket) => sum + hallOfFame[bracket.id].length, 0) +
    startingOutParticipants.length;

  return (
    <main class="mx-auto flex min-h-screen max-w-7xl flex-col items-center gap-6 p-5 px-5 sm:px-6 lg:px-8">
      <section class="flex w-full flex-col items-center justify-center gap-6 py-4">
        <span class="text-5xl">🏆</span>
        <h1 class="text-center text-4xl font-bold">
          {t('passport.hall_of_fame.page_title')}
        </h1>
        <p class="max-w-2xl text-center text-lg text-gray-600">
          {t('passport.hall_of_fame.subtitle')}
        </p>
      </section>

      {totalParticipants > 0 ? (
        <div class="flex w-full flex-col gap-12">
          <For each={BRACKETS.slice().reverse()}>
            {(bracket) => {
              const entries = hallOfFame[bracket.id];
              if (entries.length === 0) return null;

              const style = BRACKET_STYLES[bracket.id];
              const Icon = style.icon;

              return (
                <section class="w-full">
                  <div class="mb-6 flex items-center justify-center gap-3">
                    <Icon class="h-7 w-7 text-gray-700" />
                    <h2 class="text-2xl font-bold">
                      {t(`passport.brackets.${bracket.id}`)}
                    </h2>
                  </div>
                  <div class="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    <For each={entries}>
                      {(entry) => (
                        <div class="group relative flex flex-col items-center rounded-lg border border-gray-200 bg-white p-6 shadow-md transition-shadow hover:shadow-lg">
                          <a
                            href={`/passport/${entry.participant.slug}`}
                            class="absolute inset-0 rounded-lg"
                            aria-label={t(
                              'passport.hall_of_fame.view_progress',
                            )}
                          />
                          <ParticipantAvatar
                            participant={entry.participant}
                            gradient={style.avatarGradient}
                            size={96}
                            class="mb-4 h-24 w-24"
                          />
                          <div class="text-center">
                            <h3 class="text-lg font-semibold text-gray-900">
                              {entry.participant.displayName}
                            </h3>
                            <p class="mt-1 text-sm text-purple">
                              {t('passport.achieved_on', {
                                date: formatAchievedAt(
                                  entry.achievedAt,
                                  i18n.language,
                                ),
                              })}
                            </p>
                            <div class="relative z-10 mt-2 flex flex-col items-center gap-1">
                              <span class="text-xs font-medium text-purple-600 group-hover:underline">
                                {t('passport.hall_of_fame.view_progress')}
                              </span>
                              {entry.participant.profileUrl && (
                                <a
                                  href={entry.participant.profileUrl}
                                  target="_blank"
                                  rel="noopener"
                                  class="inline-flex items-center gap-1 text-xs text-blue hover:text-blue/80"
                                >
                                  {t('speakers_page.view_profile')}
                                  <FaSolidArrowUpRightFromSquare class="h-3 w-3" />
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </For>
                  </div>
                </section>
              );
            }}
          </For>

          {startingOutParticipants.length > 0 && (
            <section class="w-full">
              <div class="mb-2 flex items-center justify-center gap-3">
                <STARTING_OUT_STYLE.icon class="h-7 w-7 text-gray-500" />
                <h2 class="text-2xl font-bold">
                  {t('passport.hall_of_fame.starting_out.heading')}
                </h2>
              </div>
              <p class="mb-6 text-center text-sm text-gray-500">
                {t('passport.hall_of_fame.starting_out.subtitle')}
              </p>
              <div class="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {
                  <For each={startingOutParticipants}>
                    {(participant) => (
                      <div class="group relative flex flex-col items-center rounded-lg border border-gray-200 bg-white p-6 shadow-md transition-shadow hover:shadow-lg">
                        <a
                          href={`/passport/${participant.slug}`}
                          class="absolute inset-0 rounded-lg"
                          aria-label={t('passport.hall_of_fame.view_progress')}
                        />
                        <ParticipantAvatar
                          participant={participant}
                          gradient={STARTING_OUT_STYLE.avatarGradient}
                          size={96}
                          class="mb-4 h-24 w-24"
                        />
                        <div class="text-center">
                          <h3 class="text-lg font-semibold text-gray-900">
                            {participant.displayName}
                          </h3>
                          <div class="relative z-10 mt-2 flex flex-col items-center gap-1">
                            <span class="text-xs font-medium text-purple-600 group-hover:underline">
                              {t('passport.hall_of_fame.view_progress')}
                            </span>
                            {participant.profileUrl && (
                              <a
                                href={participant.profileUrl}
                                target="_blank"
                                rel="noopener"
                                class="inline-flex items-center gap-1 text-xs text-blue hover:text-blue/80"
                              >
                                {t('speakers_page.view_profile')}
                                <FaSolidArrowUpRightFromSquare class="h-3 w-3" />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </For>
                }
              </div>
            </section>
          )}
        </div>
      ) : (
        <p class="text-gray-500">{t('passport.hall_of_fame.empty_state')}</p>
      )}
    </main>
  );
}
