import Link from 'next/link';
import { FaArrowUpRightFromSquare } from 'react-icons/fa6';
import { getTranslate } from '@/tolgee/server';
import { getLanguage } from '@/tolgee/language';
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
} from './_presentation';

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

export default async function PassportPage() {
  const t = await getTranslate();
  const language = await getLanguage();

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
    <main className="mx-auto flex min-h-screen max-w-7xl flex-col items-center gap-6 p-5 px-5 sm:px-6 lg:px-8">
      <section className="flex w-full flex-col items-center justify-center gap-6 py-4">
        <span className="text-5xl">🏆</span>
        <h1 className="text-center text-4xl font-bold">
          {t('passport.hall_of_fame.page_title')}
        </h1>
        <p className="max-w-2xl text-center text-lg text-gray-600">
          {t('passport.hall_of_fame.subtitle')}
        </p>
      </section>

      {totalParticipants > 0 ? (
        <div className="flex w-full flex-col gap-12">
          {BRACKETS.slice()
            .reverse()
            .map((bracket) => {
              const entries = hallOfFame[bracket.id];
              if (entries.length === 0) return null;

              const style = BRACKET_STYLES[bracket.id];
              const Icon = style.icon;

              return (
                <section key={bracket.id} className="w-full">
                  <div className="mb-6 flex items-center justify-center gap-3">
                    <Icon className="h-7 w-7 text-gray-700" />
                    <h2 className="text-2xl font-bold">
                      {t(`passport.brackets.${bracket.id}`)}
                    </h2>
                  </div>
                  <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {entries.map((entry) => (
                      <div
                        key={entry.participant.slug}
                        className="group relative flex flex-col items-center rounded-lg border border-gray-200 bg-white p-6 shadow-md transition-shadow hover:shadow-lg"
                      >
                        <Link
                          href={`/passport/${entry.participant.slug}`}
                          className="absolute inset-0 rounded-lg"
                          aria-label={t('passport.hall_of_fame.view_progress')}
                        />
                        <ParticipantAvatar
                          participant={entry.participant}
                          gradient={style.avatarGradient}
                          size={96}
                          className="mb-4 h-24 w-24"
                        />
                        <div className="text-center">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {entry.participant.displayName}
                          </h3>
                          <p className="mt-1 text-sm text-purple">
                            {t('passport.achieved_on', {
                              date: formatAchievedAt(
                                entry.achievedAt,
                                language,
                              ),
                            })}
                          </p>
                          <div className="relative z-10 mt-2 flex flex-col items-center gap-1">
                            <span className="text-xs font-medium text-purple-600 group-hover:underline">
                              {t('passport.hall_of_fame.view_progress')}
                            </span>
                            {entry.participant.profileUrl && (
                              <a
                                href={entry.participant.profileUrl}
                                target="_blank"
                                rel="noopener"
                                className="inline-flex items-center gap-1 text-xs text-blue hover:text-blue/80"
                              >
                                {t('speakers_page.view_profile')}
                                <FaArrowUpRightFromSquare className="h-3 w-3" />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              );
            })}

          {startingOutParticipants.length > 0 && (
            <section className="w-full">
              <div className="mb-2 flex items-center justify-center gap-3">
                <STARTING_OUT_STYLE.icon className="h-7 w-7 text-gray-500" />
                <h2 className="text-2xl font-bold">
                  {t('passport.hall_of_fame.starting_out.heading')}
                </h2>
              </div>
              <p className="mb-6 text-center text-sm text-gray-500">
                {t('passport.hall_of_fame.starting_out.subtitle')}
              </p>
              <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {startingOutParticipants.map((participant) => (
                  <div
                    key={participant.slug}
                    className="group relative flex flex-col items-center rounded-lg border border-gray-200 bg-white p-6 shadow-md transition-shadow hover:shadow-lg"
                  >
                    <Link
                      href={`/passport/${participant.slug}`}
                      className="absolute inset-0 rounded-lg"
                      aria-label={t('passport.hall_of_fame.view_progress')}
                    />
                    <ParticipantAvatar
                      participant={participant}
                      gradient={STARTING_OUT_STYLE.avatarGradient}
                      size={96}
                      className="mb-4 h-24 w-24"
                    />
                    <div className="text-center">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {participant.displayName}
                      </h3>
                      <div className="relative z-10 mt-2 flex flex-col items-center gap-1">
                        <span className="text-xs font-medium text-purple-600 group-hover:underline">
                          {t('passport.hall_of_fame.view_progress')}
                        </span>
                        {participant.profileUrl && (
                          <a
                            href={participant.profileUrl}
                            target="_blank"
                            rel="noopener"
                            className="inline-flex items-center gap-1 text-xs text-blue hover:text-blue/80"
                          >
                            {t('speakers_page.view_profile')}
                            <FaArrowUpRightFromSquare className="h-3 w-3" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      ) : (
        <p className="text-gray-500">
          {t('passport.hall_of_fame.empty_state')}
        </p>
      )}
    </main>
  );
}
