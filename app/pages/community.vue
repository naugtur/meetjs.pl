<script setup lang="ts">
import { getCombinedCommunityItems } from '~~/src/content/communityParticipation';

useSiteMeta({
  title: 'Community Participation - meet.js',
  description:
    'Join our community initiatives, surveys, and collaborations. Help shape the future of JavaScript development.',
});

const allItems = getCombinedCommunityItems();
</script>

<template>
  <main>
    <CommunityParticipation :items="allItems" />
  </main>
</template>
