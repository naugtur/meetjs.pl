<script setup lang="ts">
import { useTranslate } from '@tolgee/vue';
import { MessagesSquare } from 'lucide-vue-next';
import { CITIES } from '~~/src/content/cities';

const { t } = useTranslate();
const { data: events } = await useUpcomingEvents();
</script>

<template>
  <section
    id="joinus"
    class="flex w-full snap-y scroll-mt-16 flex-col justify-between bg-slate-100/50 p-12 px-2 lg:px-8 dark:bg-slate-700/10"
  >
    <div class="flex w-full flex-col gap-4 p-4">
      <h2 class="text-center text-3xl font-bold">{{ t('join_us.title') }}</h2>
    </div>

    <div class="mx-auto flex w-full max-w-7xl flex-col p-4 md:flex-row">
      <div class="w-full md:w-1/2">
        <PolandMap :cities="CITIES" :events="events" />
        <NearestCity />
      </div>
      <div class="w-full p-4 md:w-1/2">
        <p class="pb-6">{{ t('join_us.description') }}</p>
        <p class="pb-6">{{ t('join_us.click_city') }}</p>
        <p class="pb-6">{{ t('join_us.start_local') }}</p>

        <div class="mt-4 border-t pt-6">
          <h3 class="mb-4 flex items-center gap-2 text-xl font-semibold">
            <MessagesSquare class="h-5 w-5 text-[#5865F2]" />
            {{ t('join_us.discord_title') }}
          </h3>

          <DiscordCommunity />
        </div>
      </div>
    </div>
  </section>
</template>
