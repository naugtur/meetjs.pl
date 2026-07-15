import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MapPin } from 'lucide-react';
import { FaArrowUpRightFromSquare } from 'react-icons/fa6';
import { getTranslate } from '@/tolgee/server';
import { getLanguage } from '@/tolgee/language';
import { PARTICIPANTS } from '@/content/passport/participants';
import { ATTENDANCE_RECORDS } from '@/content/passport/attendanceRecords';
import { ELIGIBLE_CITIES } from '@/content/passport/eligibleCities';
import { computeParticipantProgress } from '@/lib/passport/progress';
import { Badge } from '@/components/ui/badge';
import {
  BRACKET_STYLES,
  formatAchievedAt,
  ParticipantAvatar,
} from '../_presentation';

interface PassportProgressPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslate();

  return {
    title: t('passport.progress.meta_title'),
  };
}

function parseEventDate(dateStr: string): Date {
  const [day, month, year] = dateStr.split('.').map(Number);
  return new Date(year, month - 1, day);
}

export default async function PassportProgressPage({
  params,
}: PassportProgressPageProps) {
  const { slug } = await params;
  const t = await getTranslate();
  const language = await getLanguage();

  const participant = PARTICIPANTS.find((p) => p.slug === slug);

  if (!participant) {
    notFound();
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
    <main className="mx-auto flex min-h-screen max-w-4xl flex-col items-center gap-6 p-5 px-5 sm:px-6 lg:px-8">
      <section className="flex w-full flex-col items-center justify-center gap-4 py-4">
        <ParticipantAvatar
          participant={participant}
          gradient={bestStyle?.avatarGradient ?? 'from-gray-300 to-gray-500'}
          size={112}
          className="h-28 w-28"
        />
        <h1 className="text-center text-3xl font-bold">
          {t('passport.progress.heading', { name: participant.displayName })}
        </h1>
        {bestBracket && bestStyle && BestIcon && (
          <Badge
            variant="default"
            className={`flex items-center gap-1.5 px-3 py-1.5 ${bestStyle.badgeClass}`}
          >
            <BestIcon className="h-4 w-4" />
            {t(`passport.brackets.${bestBracket.bracketId}`)} &middot;{' '}
            {t('passport.achieved_on', {
              date: formatAchievedAt(bestBracket.achievedAt!, language),
            })}
          </Badge>
        )}
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
      </section>

      <section className="grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {progress.brackets.map((bracket) => {
          const style = BRACKET_STYLES[bracket.bracketId];
          const Icon = style.icon;
          const achieved = bracket.achievedAt !== null;

          return (
            <div
              key={bracket.bracketId}
              className={`flex items-center gap-3 rounded-lg border p-4 text-left shadow-sm ${
                achieved ? style.cardHighlightClass : 'border-gray-200 bg-white'
              }`}
            >
              <Icon
                className={`h-6 w-6 shrink-0 ${achieved ? '' : 'text-gray-400'}`}
              />
              <div>
                <h2 className="font-semibold text-gray-900">
                  {t(`passport.brackets.${bracket.bracketId}`)}
                </h2>
                {achieved ? (
                  <p className="text-xs text-muted-foreground">
                    {t('passport.achieved_on', {
                      date: formatAchievedAt(bracket.achievedAt!, language),
                    })}
                  </p>
                ) : (
                  <p className="text-xs text-gray-500">
                    {t('passport.cities_needed', {
                      count: bracket.citiesNeeded,
                    })}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </section>

      <section className="w-full">
        <div className="mb-4 flex items-center gap-2">
          <MapPin className="h-5 w-5 text-gray-700" />
          <h2 className="text-xl font-bold">
            {t('passport.progress.cities_visited_heading')}
          </h2>
        </div>
        {cities.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2">
            {cities.map((city) => (
              <div
                key={city}
                className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
              >
                <h3 className="mb-2 font-semibold text-purple-600">{city}</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {progress.activeRecordsByCity[city].map((record) => (
                    <li key={`${record.participantSlug}-${record.eventId}`}>
                      <span className="mb-0.5 block font-semibold text-blue">
                        {record.eventDate}
                      </span>
                      {record.eventName}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">
            {t('passport.progress.no_attendance')}
          </p>
        )}
      </section>

      {progress.revokedRecords.length > 0 && (
        <section className="w-full">
          <h2 className="mb-4 text-xl font-bold">
            {t('passport.progress.revoked_heading')}
          </h2>
          <ul className="space-y-2 rounded-lg border border-gray-200 bg-white p-4 text-sm text-muted-foreground shadow-sm">
            {progress.revokedRecords.map((record) => (
              <li key={`${record.participantSlug}-${record.eventId}`}>
                <span className="font-medium text-foreground">
                  {record.eventName} &mdash; {record.eventCity}
                </span>
                <br />
                {t('passport.revoked_label', {
                  reason: record.revokedReason ?? '',
                })}
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}
