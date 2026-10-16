<script setup lang="ts">
import IconGithub from '~icons/fa6-brands/github';
import IconLinkedin from '~icons/fa6-brands/linkedin';
import type { Organizer } from '~~/src/types/organizer';

defineProps<{ city: string; organizers: Organizer[] }>();
</script>

<template>
  <section class="flex w-full flex-col items-center justify-center gap-4 p-8">
    <h2 class="text-2xl font-bold">{{ city }} organizers</h2>
    <p class="text-center">
      Meet the people who organize meetups in {{ city }}
    </p>
    <div class="flex w-full flex-col justify-center gap-8 px-4 md:flex-row">
      <UiCard
        v-for="organizer in organizers"
        :key="organizer.name"
        class="w-full max-w-[15rem] overflow-hidden text-2xl font-bold md:w-1/3"
      >
        <UiCardContent class="flex items-center justify-center pt-6">
          <AppImage
            :src="organizer.image || '/avatar-placeholder.png'"
            :alt="organizer.name"
            :width="150"
            :height="150"
            class="rounded-md"
          />
        </UiCardContent>
        <UiCardFooter
          class="flex w-full flex-col items-center justify-center gap-1"
        >
          <UiCardTitle class="text-center">{{ organizer.name }}</UiCardTitle>
          <div class="flex items-center justify-center gap-1">
            <a
              v-if="organizer.email"
              :href="`mailto:${organizer.email}`"
              target="_blank"
              rel="noopener"
              ><span class="sr-only">Email</span>@</a
            >
            <a
              v-if="organizer.linkedin"
              :href="organizer.linkedin"
              target="_blank"
              rel="noopener"
            >
              <span class="sr-only">Linkedin</span>
              <IconLinkedin />
            </a>
            <a
              v-if="organizer.gitHub"
              :href="organizer.gitHub"
              target="_blank"
              rel="noopener"
            >
              <span class="sr-only">GitHub</span>
              <IconGithub />
            </a>
          </div>
        </UiCardFooter>
      </UiCard>
    </div>
  </section>
</template>
