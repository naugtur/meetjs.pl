import { For, Show } from 'solid-js';
import { useParams } from '@solidjs/router';
import { Title } from '@solidjs/meta';
import { MapPin } from '@/lib/lucide';
import { FaSolidArrowUpRightFromSquare } from 'solid-icons/fa';
import { useTranslate, useLocale } from '@/i18n';
import { PARTICIPANTS } from '@/content/passport/participants';
import { ATTENDANCE_RECORDS } from '@/content/passport/attendanceRecords';
import { ELIGIBLE_CITIES } from '@/content/passport/eligibleCities';
import { computeParticipantProgress } from '@/lib/passport/progress';
import { Badge } from '@/components/ui/badge';
import {
  BRACKET_STYLES,
  formatAchievedAt,
  ParticipantAvatar,
} from '@/components/passport/Presentation';

function parseEventDate(dateStr: string): Date {
  const [day, month, year] = dateStr.split('.').map(Number);
  return new Date(year, month - 1, day);
}

export default function PassportProgressPage() {
  const params = useParams<{ slug: string }>();
  const { t } = useTranslate();
  const i18n = useLocale();

  const participant = PARTICIPANTS.find((p) => p.slug === params.slug);

  if (!participant) {
    return (
      <main class="mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center gap-4 p-5">
        <Title>Participant not found | meet.js</Title>
        <h1 class="text-3xl font-bold">Participant not found</h1>
        <a href="/passport" class="text-blue hover:underline">
          Back to Hall of Fame
        </a>
      </main>
    );
  }

  const progress = computeParticipantProgress(
    participant,
    ATTENDANCE_RECORDS,
    ELIGIBLE_CITIES,
  );

  const cities = Object.keys(progress.activeRecordsByCity).sort((a, b) => {
    const earliestA = Math.min(
      ...progress.activeRecordsByCity[a].map((r) =>
        parseEventDate(r.eventDate).getTime(),
      ),
    );
    const earliestB = Math.min(
      ...progress.activeRecordsByCity[b].map((r) =>
        parseEventDate(r.eventDate).getTime(),
      ),
    );
    return earliestA - earliestB;
  });

  const achievedBrackets = progress.brackets.filter((b) => b.achievedAt);
  const bestBracket = achievedBrackets[achievedBrackets.length - 1] ?? null;
  const bestStyle = bestBracket ? BRACKET_STYLES[bestBracket.bracketId] : null;
  const BestIcon = bestStyle?.icon;

  return (
    <main class="mx-auto flex min-h-screen max-w-4xl flex-col items-center gap-6 p-5 px-5 sm:px-6 lg:px-8">
      <Title>{t('passport.progress.meta_title')}</Title>
      <section class="flex w-full flex-col items-center justify-center gap-4 py-4">
        <ParticipantAvatar
          participant={participant}
          gradient={bestStyle?.avatarGradient ?? 'from-gray-300 to-gray-500'}
          size={112}
          class="h-28 w-28"
        />
        <h1 class="text-center text-3xl font-bold">
          {t('passport.progress.heading', { name: participant.displayName })}
        </h1>
        {bestBracket && bestStyle && BestIcon && (
          <Badge
            variant="default"
            class={`flex items-center gap-1.5 px-3 py-1.5 ${bestStyle.badgeClass}`}
          >
            <BestIcon class="h-4 w-4" />
            {t(`passport.brackets.${bestBracket.bracketId}`)} &middot;{' '}
            {t('passport.achieved_on', {
              date: formatAchievedAt(bestBracket.achievedAt!, i18n.language),
            })}
          </Badge>
        )}
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
      </section>

      <section class="grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {
          <For each={progress.brackets}>
            {(bracket) => {
              const style = BRACKET_STYLES[bracket.bracketId];
              const Icon = style.icon;
              const achieved = bracket.achievedAt !== null;

              return (
                <div
                  class={`flex items-center gap-3 rounded-lg border p-4 text-left shadow-sm ${
                    achieved
                      ? style.cardHighlightClass
                      : 'border-gray-200 bg-white'
                  }`}
                >
                  <Icon
                    class={`h-6 w-6 shrink-0 ${achieved ? '' : 'text-gray-400'}`}
                  />
                  <div>
                    <h2 class="font-semibold text-gray-900">
                      {t(`passport.brackets.${bracket.bracketId}`)}
                    </h2>
                    {achieved ? (
                      <p class="text-xs text-muted-foreground">
                        {t('passport.achieved_on', {
                          date: formatAchievedAt(
                            bracket.achievedAt!,
                            i18n.language,
                          ),
                        })}
                      </p>
                    ) : (
                      <p class="text-xs text-gray-500">
                        {t('passport.cities_needed', {
                          count: bracket.citiesNeeded,
                        })}
                      </p>
                    )}
                  </div>
                </div>
              );
            }}
          </For>
        }
      </section>

      <section class="w-full">
        <div class="mb-4 flex items-center gap-2">
          <MapPin class="h-5 w-5 text-gray-700" />
          <h2 class="text-xl font-bold">
            {t('passport.progress.cities_visited_heading')}
          </h2>
        </div>
        {cities.length > 0 ? (
          <div class="grid gap-4 sm:grid-cols-2">
            {
              <For each={cities}>
                {(city) => (
                  <div class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                    <h3 class="mb-2 font-semibold text-purple-600">{city}</h3>
                    <ul class="space-y-2 text-sm text-muted-foreground">
                      <For each={progress.activeRecordsByCity[city]}>
                        {(record) => (
                          <li>
                            <span class="mb-0.5 block font-semibold text-blue">
                              {record.eventDate}
                            </span>
                            {record.eventName}
                          </li>
                        )}
                      </For>
                    </ul>
                  </div>
                )}
              </For>
            }
          </div>
        ) : (
          <p class="text-gray-500">{t('passport.progress.no_attendance')}</p>
        )}
      </section>

      {progress.revokedRecords.length > 0 && (
        <section class="w-full">
          <h2 class="mb-4 text-xl font-bold">
            {t('passport.progress.revoked_heading')}
          </h2>
          <ul class="space-y-2 rounded-lg border border-gray-200 bg-white p-4 text-sm text-muted-foreground shadow-sm">
            {
              <For each={progress.revokedRecords}>
                {(record) => (
                  <li>
                    <span class="font-medium text-foreground">
                      {record.eventName} &mdash; {record.eventCity}
                    </span>
                    <br />
                    {t('passport.revoked_label', {
                      reason: record.revokedReason ?? '',
                    })}
                  </li>
                )}
              </For>
            }
          </ul>
        </section>
      )}
    </main>
  );
}
