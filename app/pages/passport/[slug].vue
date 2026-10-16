<script setup lang="ts">
import { useTranslate } from '@tolgee/vue';
import { MapPin } from 'lucide-vue-next';
import IconArrowUpRightFromSquare from '~icons/fa6-solid/arrow-up-right-from-square';
import { ATTENDANCE_RECORDS } from '~~/src/content/passport/attendanceRecords';
import { ELIGIBLE_CITIES } from '~~/src/content/passport/eligibleCities';
import { PARTICIPANTS } from '~~/src/content/passport/participants';
import { computeParticipantProgress } from '~~/src/lib/passport/progress';

definePageMeta({
  validate: (route) => {
    const slug = 'slug' in route.params ? route.params.slug : undefined;
    return PARTICIPANTS.some((participant) => participant.slug === slug);
  },
});

const { t } = useTranslate();
const language = useLanguage();
const siteUrl = useSiteUrl();
const route = useRoute('passport-slug');
const bracketLabels = useBracketLabels();

useSiteMeta(() => ({
  title: t.value('passport.progress.meta_title'),
  description: t.value('passport.hall_of_fame.meta_description'),
  canonical: siteUrl('/passport'),
}));

function parseEventDate(dateStr: string): Date {
  const [day, month, year] = dateStr.split('.').map(Number);
  return new Date(year!, month! - 1, day);
}

const participant = computed(
  () => PARTICIPANTS.find((item) => item.slug === route.params.slug)!,
);

const progress = computed(() =>
  computeParticipantProgress(
    participant.value,
    ATTENDANCE_RECORDS,
    ELIGIBLE_CITIES,
  ),
);

const cities = computed(() =>
  Object.keys(progress.value.activeRecordsByCity).sort((a, b) => {
    const records = progress.value.activeRecordsByCity;
    const earliestA = Math.min(
      ...records[a]!.map((r) => parseEventDate(r.eventDate).getTime()),
    );
    const earliestB = Math.min(
      ...records[b]!.map((r) => parseEventDate(r.eventDate).getTime()),
    );
    return earliestA - earliestB;
  }),
);

const bestBracket = computed(() => {
  const achieved = progress.value.brackets.filter((b) => b.achievedAt);
  return achieved[achieved.length - 1] ?? null;
});
const bestStyle = computed(() =>
  bestBracket.value ? BRACKET_STYLES[bestBracket.value.bracketId] : null,
);
</script>

<template>
  <main
    class="mx-auto flex min-h-screen max-w-4xl flex-col items-center gap-6 p-5 px-5 sm:px-6 lg:px-8"
  >
    <section
      class="flex w-full flex-col items-center justify-center gap-4 py-4"
    >
      <PassportParticipantAvatar
        :participant="participant"
        :gradient="bestStyle?.avatarGradient ?? 'from-gray-300 to-gray-500'"
        :size="112"
        class="h-28 w-28"
      />
      <h1 class="text-center text-3xl font-bold">
        {{ t('passport.progress.heading', { name: participant.displayName }) }}
      </h1>
      <UiBadge
        v-if="bestBracket && bestStyle"
        variant="default"
        :class="`flex items-center gap-1.5 px-3 py-1.5 ${bestStyle.badgeClass}`"
      >
        <component :is="bestStyle.icon" class="h-4 w-4" />
        {{ bracketLabels[bestBracket.bracketId] }} &middot;
        {{
          t('passport.achieved_on', {
            date: formatAchievedAt(bestBracket.achievedAt!, language),
          })
        }}
      </UiBadge>
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
    </section>

    <section class="grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <div
        v-for="bracket in progress.brackets"
        :key="bracket.bracketId"
        :class="`flex items-center gap-3 rounded-lg border p-4 text-left shadow-sm ${
          bracket.achievedAt !== null
            ? BRACKET_STYLES[bracket.bracketId].cardHighlightClass
            : 'border-gray-200 bg-white'
        }`"
      >
        <component
          :is="BRACKET_STYLES[bracket.bracketId].icon"
          :class="`h-6 w-6 shrink-0 ${bracket.achievedAt !== null ? '' : 'text-gray-400'}`"
        />
        <div>
          <h2 class="font-semibold text-gray-900">
            {{ bracketLabels[bracket.bracketId] }}
          </h2>
          <p
            v-if="bracket.achievedAt !== null"
            class="text-xs text-muted-foreground"
          >
            {{
              t('passport.achieved_on', {
                date: formatAchievedAt(bracket.achievedAt, language),
              })
            }}
          </p>
          <p v-else class="text-xs text-gray-500">
            {{ t('passport.cities_needed', { count: bracket.citiesNeeded }) }}
          </p>
        </div>
      </div>
    </section>

    <section class="w-full">
      <div class="mb-4 flex items-center gap-2">
        <MapPin class="h-5 w-5 text-gray-700" />
        <h2 class="text-xl font-bold">
          {{ t('passport.progress.cities_visited_heading') }}
        </h2>
      </div>
      <div v-if="cities.length > 0" class="grid gap-4 sm:grid-cols-2">
        <div
          v-for="city in cities"
          :key="city"
          class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
        >
          <h3 class="mb-2 font-semibold text-purple-600">{{ city }}</h3>
          <ul class="space-y-2 text-sm text-muted-foreground">
            <li
              v-for="record in progress.activeRecordsByCity[city]"
              :key="`${record.participantSlug}-${record.eventId}`"
            >
              <span class="mb-0.5 block font-semibold text-blue">
                {{ record.eventDate }}
              </span>
              {{ record.eventName }}
            </li>
          </ul>
        </div>
      </div>
      <p v-else class="text-gray-500">
        {{ t('passport.progress.no_attendance') }}
      </p>
    </section>

    <section v-if="progress.revokedRecords.length > 0" class="w-full">
      <h2 class="mb-4 text-xl font-bold">
        {{ t('passport.progress.revoked_heading') }}
      </h2>
      <ul
        class="space-y-2 rounded-lg border border-gray-200 bg-white p-4 text-sm text-muted-foreground shadow-sm"
      >
        <li
          v-for="record in progress.revokedRecords"
          :key="`${record.participantSlug}-${record.eventId}`"
        >
          <span class="font-medium text-foreground">
            {{ record.eventName }} &mdash; {{ record.eventCity }}
          </span>
          <br />
          {{
            t('passport.revoked_label', { reason: record.revokedReason ?? '' })
          }}
        </li>
      </ul>
    </section>
  </main>
</template>
