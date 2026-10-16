<script setup lang="ts">
import IconFacebook from '~icons/fa6-brands/facebook';
import IconGithub from '~icons/fa6-brands/github';
import IconMeetup from '~icons/fa6-brands/meetup';

defineProps<{ localGroups?: string[] }>();

type GroupKind = 'meetup' | 'luma' | 'facebook' | 'crossweb' | 'github';

const detectKind = (link: string): GroupKind | undefined => {
  if (link.includes('meetup.com')) return 'meetup';
  if (link.includes('lu.ma')) return 'luma';
  if (link.includes('facebook.com')) return 'facebook';
  if (link.includes('crossweb.pl')) return 'crossweb';
  if (link.includes('github.com')) return 'github';
  return undefined;
};
</script>

<template>
  <section
    v-if="localGroups?.length"
    class="flex flex-col items-center justify-center gap-4 p-8"
  >
    <h2 class="text-center text-2xl font-bold">Join our local groups</h2>
    <div class="flex gap-2">
      <a
        v-for="localGroup in localGroups"
        :key="localGroup"
        :href="localGroup"
        class="flex items-center justify-center gap-1"
        target="_blank"
        rel="noopener"
      >
        <template v-if="detectKind(localGroup) === 'meetup'">
          <span class="sr-only">Meetup group</span>
          <IconMeetup class="h-12 w-12" />
        </template>
        <template v-else-if="detectKind(localGroup) === 'luma'">
          <span class="sr-only">Luma group</span>
          <AppImage src="/luma.svg" alt="Luma logo" :width="50" :height="50" />
        </template>
        <template v-else-if="detectKind(localGroup) === 'facebook'">
          <span class="sr-only">Facebook group</span>
          <IconFacebook class="h-10 w-10" />
        </template>
        <template v-else-if="detectKind(localGroup) === 'crossweb'">
          <span class="sr-only">Crossweb group</span>
          <AppImage
            src="/crossweb-favicon.png"
            alt="Crossweb logo"
            :width="50"
            :height="50"
          />
        </template>
        <template v-else-if="detectKind(localGroup) === 'github'">
          <span class="sr-only">Github group</span>
          <IconGithub class="h-10 w-10" />
        </template>
      </a>
    </div>
  </section>
</template>
