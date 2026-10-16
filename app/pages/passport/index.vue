<script setup lang="ts">
import { useTranslate } from '@tolgee/vue';
import IconArrowUpRightFromSquare from '~icons/fa6-solid/arrow-up-right-from-square';
import { ATTENDANCE_RECORDS } from '~~/src/content/passport/attendanceRecords';
import { ELIGIBLE_CITIES } from '~~/src/content/passport/eligibleCities';
import { PARTICIPANTS } from '~~/src/content/passport/participants';
import { BRACKETS } from '~~/src/lib/passport/brackets';
import {
  computeHallOfFame,
  type HallOfFameEntry,
} from '~~/src/lib/passport/hallOfFame';
import type { BracketId, Participant } from '~~/src/types/passport';

const { t } = useTranslate();
const language = useLanguage();
const siteUrl = useSiteUrl();
const bracketLabels = useBracketLabels();

useSiteMeta(() => ({
  title: t.value('passport.hall_of_fame.meta_title'),
  description: t.value('passport.hall_of_fame.meta_description'),
  canonical: siteUrl('/passport'),
}));

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

const bracketsWithEntries = BRACKETS.slice()
  .reverse()
  .filter((bracket) => hallOfFame[bracket.id].length > 0);
</script>

<template>
  <main
    class="mx-auto flex min-h-screen max-w-7xl flex-col items-center gap-6 p-5 px-5 sm:px-6 lg:px-8"
  >
    <section
      class="flex w-full flex-col items-center justify-center gap-6 py-4"
    >
      <span class="text-5xl">🏆</span>
      <h1 class="text-center text-4xl font-bold">
        {{ t('passport.hall_of_fame.page_title') }}
      </h1>
      <p class="max-w-2xl text-center text-lg text-gray-600">
        {{ t('passport.hall_of_fame.subtitle') }}
      </p>
    </section>

    <div v-if="totalParticipants > 0" class="flex w-full flex-col gap-12">
      <section
        v-for="bracket in bracketsWithEntries"
        :key="bracket.id"
        class="w-full"
      >
        <div class="mb-6 flex items-center justify-center gap-3">
          <component
            :is="BRACKET_STYLES[bracket.id].icon"
            class="h-7 w-7 text-gray-700"
          />
          <h2 class="text-2xl font-bold">
            {{ bracketLabels[bracket.id] }}
          </h2>
        </div>
        <div class="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <div
            v-for="entry in hallOfFame[bracket.id]"
            :key="entry.participant.slug"
            class="group relative flex flex-col items-center rounded-lg border border-gray-200 bg-white p-6 shadow-md transition-shadow hover:shadow-lg"
          >
            <NuxtLink
              :to="`/passport/${entry.participant.slug}`"
              class="absolute inset-0 rounded-lg"
              :aria-label="t('passport.hall_of_fame.view_progress')"
            />
            <PassportParticipantAvatar
              :participant="entry.participant"
              :gradient="BRACKET_STYLES[bracket.id].avatarGradient"
              :size="96"
              class="mb-4 h-24 w-24"
            />
            <div class="text-center">
              <h3 class="text-lg font-semibold text-gray-900">
                {{ entry.participant.displayName }}
              </h3>
              <p class="mt-1 text-sm text-purple">
                {{
                  t('passport.achieved_on', {
                    date: formatAchievedAt(entry.achievedAt, language),
                  })
                }}
              </p>
              <div class="relative z-10 mt-2 flex flex-col items-center gap-1">
                <span
                  class="text-xs font-medium text-purple-600 group-hover:underline"
                >
                  {{ t('passport.hall_of_fame.view_progress') }}
                </span>
                <a
                  v-if="entry.participant.profileUrl"
                  :href="entry.participant.profileUrl"
                  target="_blank"
                  rel="noopener"
                  class="inline-flex items-center gap-1 text-xs text-blue hover:text-blue/80"
                >
                  {{ t('speakers_page.view_profile') }}
                  <IconArrowUpRightFromSquare class="h-3 w-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section v-if="startingOutParticipants.length > 0" class="w-full">
        <div class="mb-2 flex items-center justify-center gap-3">
          <component
            :is="STARTING_OUT_STYLE.icon"
            class="h-7 w-7 text-gray-500"
          />
          <h2 class="text-2xl font-bold">
            {{ t('passport.hall_of_fame.starting_out.heading') }}
          </h2>
        </div>
        <p class="mb-6 text-center text-sm text-gray-500">
          {{ t('passport.hall_of_fame.starting_out.subtitle') }}
        </p>
        <div class="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <div
            v-for="participant in startingOutParticipants"
            :key="participant.slug"
            class="group relative flex flex-col items-center rounded-lg border border-gray-200 bg-white p-6 shadow-md transition-shadow hover:shadow-lg"
          >
            <NuxtLink
              :to="`/passport/${participant.slug}`"
              class="absolute inset-0 rounded-lg"
              :aria-label="t('passport.hall_of_fame.view_progress')"
            />
            <PassportParticipantAvatar
              :participant="participant"
              :gradient="STARTING_OUT_STYLE.avatarGradient"
              :size="96"
              class="mb-4 h-24 w-24"
            />
            <div class="text-center">
              <h3 class="text-lg font-semibold text-gray-900">
                {{ participant.displayName }}
              </h3>
              <div class="relative z-10 mt-2 flex flex-col items-center gap-1">
                <span
                  class="text-xs font-medium text-purple-600 group-hover:underline"
                >
                  {{ t('passport.hall_of_fame.view_progress') }}
                </span>
                <a
                  v-if="participant.profileUrl"
                  :href="participant.profileUrl"
                  target="_blank"
                  rel="noopener"
                  class="inline-flex items-center gap-1 text-xs text-blue hover:text-blue/80"
                >
                  {{ t('speakers_page.view_profile') }}
                  <IconArrowUpRightFromSquare class="h-3 w-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    <p v-else class="text-gray-500">
      {{ t('passport.hall_of_fame.empty_state') }}
    </p>
  </main>
</template>
