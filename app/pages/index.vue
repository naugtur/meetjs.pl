<script setup lang="ts">
import {
  COMMUNITY_PARTICIPATION,
  getNewestCommunityItems,
} from '~~/src/content/communityParticipation';
import { eventsDiscounts } from '~~/src/content/events-discounts';
import { learningDiscounts } from '~~/src/content/learning-discounts';
import { softwareDiscounts } from '~~/src/content/software-discounts';

useSiteMeta();

const promos = [...eventsDiscounts, ...softwareDiscounts, ...learningDiscounts];

// Show only the 3 newest items on homepage (depends on the current date, so
// resolved on the server and hydrated).
const newestCommunityIds = useState('newest-community-ids', () =>
  getNewestCommunityItems(3).map((item) => item.id),
);
const newestCommunityItems = computed(() =>
  newestCommunityIds.value
    .map((id) => COMMUNITY_PARTICIPATION.find((item) => item.id === id))
    .filter((item) => item !== undefined),
);
</script>

<template>
  <main>
    <HeroSection />
    <PromoTicker :promos="promos" />
    <div class="flex min-h-screen flex-col items-center">
      <FeaturedEvents />
      <JavaScript30YearsPromo />
      <JoinUs />
      <YouTubeSubscribeBanner />
      <CommunityParticipation
        v-if="newestCommunityItems.length > 0"
        :items="newestCommunityItems"
        show-view-all
      />
      <div class="w-full">
        <AboutSection />
        <Stats />
      </div>
      <SpeakerFaces />
      <PartnersSection />
    </div>
  </main>
</template>
