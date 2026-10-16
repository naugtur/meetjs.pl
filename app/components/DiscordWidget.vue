<script setup lang="ts">
import { useTranslate } from '@tolgee/vue';
import { Users } from 'lucide-vue-next';

defineProps<{ name: string; membersCount: number; inviteUrl: string }>();

const { t } = useTranslate();
</script>

<template>
  <div class="flex flex-col items-center">
    <div
      class="group relative mb-4 w-full max-w-md overflow-hidden rounded-lg bg-gradient-to-br from-[#2f3136] to-[#1e1f22] p-6 text-white shadow-xl transition-all duration-300 hover:shadow-2xl"
    >
      <div
        class="absolute inset-0 bg-gradient-to-r from-[#5865F2]/10 to-[#5865F2]/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      ></div>

      <div class="relative">
        <div class="mb-4 flex items-center justify-between">
          <div>
            <h4 class="text-lg font-bold">{{ name }}</h4>

            <p class="mt-1 text-sm text-gray-300">
              {{ t('discord_widget.connect_with_developers') }}
            </p>
          </div>

          <div
            v-if="membersCount"
            class="flex items-center gap-1 rounded-full bg-green-500/20 px-2 py-1 text-sm"
          >
            <Users class="h-4 w-4" />
            <span class="text-center">{{ membersCount }} online</span>
          </div>
        </div>

        <DiscordInviteLink :href="inviteUrl" />
      </div>
    </div>
  </div>
</template>
