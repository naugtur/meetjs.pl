<script setup lang="ts">
import { useTranslate } from '@tolgee/vue';
import { BookOpen, Gift, Monitor, Ticket } from 'lucide-vue-next';
import { eventsDiscounts } from '~~/src/content/events-discounts';
import { learningDiscounts } from '~~/src/content/learning-discounts';
import { softwareDiscounts } from '~~/src/content/software-discounts';
import type { Promo } from '~~/src/types/promo';

const { t } = useTranslate();
const siteUrl = useSiteUrl();
const now = useRenderNow();

useSiteMeta(() => ({
  title: t.value('discounts.meta_title'),
  description: t.value('discounts.meta_description'),
  canonical: siteUrl('/discounts'),
  openGraph: {
    title: t.value('discounts.meta_title'),
    description: t.value('discounts.meta_description'),
    url: 'https://meetjs.pl/discounts',
    siteName: 'meet.js',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: siteUrl('/discounts/opengraph-image.png'),
        alt: 'Exclusive discounts for the meet.js community',
        type: 'image/png',
        width: 1200,
        height: 630,
      },
    ],
  },
}));

// Filter out expired promos
const filterActivePromos = (promos: Promo[]): Promo[] =>
  promos.filter((promo) => new Date(promo.expiresAt) >= now);

const activeSoftwareDiscounts = filterActivePromos(softwareDiscounts);
const activeLearningDiscounts = filterActivePromos(learningDiscounts);
</script>

<template>
  <div class="container mx-auto max-w-4xl py-16">
    <div class="mb-12 text-center">
      <h1 class="mb-4 text-5xl font-bold tracking-tight">
        {{ t('discounts.page_title') }}
      </h1>
      <p class="mx-auto max-w-2xl text-lg text-muted-foreground">
        {{ t('discounts.subtitle') }}
      </p>
    </div>

    <UiCard class="mb-12 overflow-hidden border-purple shadow-xl">
      <div
        class="bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 p-1"
      >
        <div class="bg-background p-5">
          <UiCardHeader class="pb-2">
            <div class="flex items-center gap-2">
              <span
                class="rounded-full bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 p-2 text-white"
              >
                <Gift class="h-5 w-5" />
              </span>
              <UiCardTitle class="text-2xl font-bold">
                {{ t('discounts.benefits_card.title') }}
              </UiCardTitle>
            </div>
            <UiCardDescription class="mt-2 text-base">
              {{ t('discounts.benefits_card.description') }}
            </UiCardDescription>
          </UiCardHeader>
          <UiCardContent class="pt-4">
            <div class="grid gap-6 md:grid-cols-3">
              <div class="flex flex-col gap-2">
                <div class="flex items-center gap-2">
                  <Ticket class="h-5 w-5 text-purple-600" />
                  <h3 class="font-semibold">
                    {{ t('discounts.benefits_card.events.title') }}
                  </h3>
                </div>
                <p class="text-sm text-muted-foreground">
                  {{ t('discounts.benefits_card.events.description') }}
                </p>
              </div>
              <div class="flex flex-col gap-2">
                <div class="flex items-center gap-2">
                  <Monitor class="h-5 w-5 text-indigo-600" />
                  <h3 class="font-semibold">
                    {{ t('discounts.benefits_card.software.title') }}
                  </h3>
                </div>
                <p class="text-sm text-muted-foreground">
                  {{ t('discounts.benefits_card.software.description') }}
                </p>
              </div>
              <div class="flex flex-col gap-2">
                <div class="flex items-center gap-2">
                  <BookOpen class="h-5 w-5 text-green-600" />
                  <h3 class="font-semibold">
                    {{ t('discounts.benefits_card.learning.title') }}
                  </h3>
                </div>
                <p class="text-sm text-muted-foreground">
                  {{ t('discounts.benefits_card.learning.description') }}
                </p>
              </div>
            </div>
          </UiCardContent>
        </div>
      </div>
      <UiCardFooter class="bg-muted/50 p-6">
        <p class="text-sm text-muted-foreground">
          <span class="font-semibold">
            {{ t('discounts.benefits_card.note_label') }} </span
          >{{ ' ' }}
          {{ t('discounts.benefits_card.note') }}
        </p>
      </UiCardFooter>
    </UiCard>

    <div id="events" class="mb-8">
      <div class="mb-6 flex items-center gap-3">
        <Ticket class="h-6 w-6 text-purple-600" />
        <h2 class="text-2xl font-bold">
          {{ t('discounts.sections.events') }}
        </h2>
      </div>
      <EventDiscountSection :promos="eventsDiscounts" />
    </div>

    <div id="software" class="mb-8">
      <div class="mb-6 flex items-center gap-3">
        <Monitor class="h-6 w-6 text-indigo-600" />
        <h2 class="text-2xl font-bold">
          {{ t('discounts.sections.software') }}
        </h2>
      </div>
      <div
        v-if="activeSoftwareDiscounts.length > 0"
        class="grid gap-6 md:grid-cols-2 lg:grid-cols-2"
      >
        <UnifiedPromoCard
          v-for="promo in activeSoftwareDiscounts"
          :key="promo.id"
          :promo="promo"
          variant="software"
        />
      </div>
      <EmptyDiscountState v-else type="software" />
    </div>

    <div id="learning" class="mb-8">
      <div class="mb-6 flex items-center gap-3">
        <BookOpen class="h-6 w-6 text-green-600" />
        <h2 class="text-2xl font-bold">
          {{ t('discounts.sections.learning') }}
        </h2>
      </div>
      <div
        v-if="activeLearningDiscounts.length > 0"
        class="grid gap-6 md:grid-cols-2 lg:grid-cols-2"
      >
        <UnifiedPromoCard
          v-for="promo in activeLearningDiscounts"
          :key="promo.id"
          :promo="promo"
          variant="learning"
        />
      </div>
      <EmptyDiscountState v-else type="learning" />
    </div>
  </div>
</template>
