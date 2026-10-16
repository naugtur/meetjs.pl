<script setup lang="ts">
const siteUrl = useSiteUrl();

const description =
  'WDI is a free, open-source, and community-driven initiative to support women in the field of JavaScript.';
useSiteMeta({
  title: 'WDI | meet.js',
  description,
  canonical: siteUrl('/wdi'),
  openGraph: {
    title: 'WDI | meet.js',
    description,
    url: 'https://meetjs.pl/wdi',
    siteName: 'meet.js',
    images: [DEFAULT_OG_IMAGE],
    locale: 'en_US',
    type: 'website',
  },
});

const DISCOUNT_CODE = 'WID26RP20';
const DISCOUNT_END_DATE = new Date('2026-03-20');

// Icon paths (24×24 outline icons, stroke-width 2)
const details = [
  {
    name: 'Dates',
    description: 'March 19th, 2026 (online) and March 20th, 2026 (in-person)',
    paths: [
      'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
    ],
  },
  {
    name: 'Location',
    description: 'PGE Narodowy, Warsaw',
    paths: [
      'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z',
      'M15 11a3 3 0 11-6 0 3 3 0 016 0z',
    ],
  },
  {
    name: 'Tracks',
    description: '25 tracks with 300 talks',
    paths: [
      'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10',
    ],
  },
] as const;

const getDaysRemainingToDate = (target: Date, now: Date) =>
  Math.ceil((target.getTime() - now.getTime()) / (1_000 * 60 * 60 * 24));

const daysRemaining = getDaysRemainingToDate(DISCOUNT_END_DATE, useRenderNow());
</script>

<template>
  <div class="container mx-auto max-w-3xl py-16">
    <div
      class="mb-8 flex flex-col items-start justify-between md:flex-row md:items-center"
    >
      <h1 class="mb-4 text-4xl font-bold md:mb-0">Warsaw IT Days 2026</h1>
      <ActionLink href="https://warszawskiedniinformatyki.pl/">
        Register Now! 🚀
      </ActionLink>
    </div>

    <Banner variant="warning">
      <template v-if="daysRemaining >= 0">
        <p class="font-semibold">Discount ends soon!</p>
        <p>
          Only {{ daysRemaining }} days left to get 20% off with code:
          <span class="rounded bg-gray-100 px-2 py-1 font-mono">{{
            DISCOUNT_CODE
          }}</span>
        </p>
        {{ ' ' }}
      </template>
      <template v-else>
        <p class="font-semibold">The discount has ended!</p>
        <p>
          Thank you for participating in this year’s edition — we’ll see you in
          <span class="rounded bg-gray-100 px-2 py-1 font-mono">{{
            DISCOUNT_END_DATE.getFullYear() + 1
          }}</span
          >!
        </p>
      </template>
    </Banner>

    <div class="mb-8 space-y-4">
      <p>
        We helped put together the JavaScript track on the Warsaw IT Days on
        March 19th online and March 20th in Warsaw at PGE Narodowy.
      </p>
      <p>
        With 25+ tracks and 300+ talks, including several selected by the
        meet.js crew, this is one of the largest IT events in Poland this year!
        The 17th edition brings together over 10,000 IT & Data Science
        professionals.
      </p>
      <p class="font-semibold">Hope to see you there!</p>
    </div>

    <div class="mb-8">
      <h2 class="mb-4 text-2xl font-semibold">Event Details</h2>
      <ul class="space-y-3">
        <li
          v-for="{ name, paths, description: text } in details"
          :key="name"
          class="flex items-start"
        >
          <span
            class="mr-3 inline-flex items-center justify-center rounded-full bg-blue-100 p-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              class="h-5 w-5 text-blue-600"
            >
              <path
                v-for="d in paths"
                :key="d"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                :d="d"
              />
            </svg>
          </span>
          <span>
            <strong>{{ name }}:</strong> {{ text }}
          </span>
        </li>
      </ul>
    </div>

    <div class="mb-8">
      <h2 class="mb-4 text-2xl font-semibold">Special Discount</h2>
      <div class="space-y-4 rounded-lg border border-blue-200 bg-blue-50 p-6">
        <p>
          Until March 20th, 2026, you can buy a Standard or Executive ticket
          with a 20% discount using a special code from the Program Council:
        </p>

        <ClickToCopy :text-to-copy="DISCOUNT_CODE" />

        <p class="text-sm text-gray-600">
          This offer is valid only until the end of this month, so don't miss
          out!
        </p>
      </div>
    </div>

    <div class="mb-8">
      <h2 class="mb-4 text-2xl font-semibold">JavaScript Track</h2>
      <p class="mb-4">
        The meet.js crew has helped curate an exciting JavaScript track
        featuring talks on the latest frameworks, tools, and best practices.
        This is a great opportunity to learn from industry experts and connect
        with the JavaScript community.
      </p>
      <div class="mt-6 text-center">
        <ActionLink href="https://warszawskiedniinformatyki.pl/">
          Join the JavaScript Track! 💻
        </ActionLink>
      </div>
    </div>

    <div class="mt-8 text-center">
      <p class="mt-2 text-sm text-gray-600">
        For more information and registration, visit the
        <a
          href="https://warszawskiedniinformatyki.pl/"
          target="_blank"
          rel="noopener"
          class="text-primary hover:underline"
        >
          official website
        </a>
      </p>
    </div>
  </div>
</template>
