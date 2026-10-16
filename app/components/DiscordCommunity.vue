<script setup lang="ts">
const DISCORD_INVITE_LINK = 'https://discord.gg/8r9XKTeNW8';

const { data, error } = await useDiscordServer();
</script>

<template>
  <p v-if="error" class="text-red-500">
    Error loading Discord data: {{ error.message }}
  </p>
  <p v-else-if="!data" class="text-gray-500 dark:text-gray-400">
    Loading community information...
  </p>
  <DiscordWidget
    v-else
    :name="data.name || 'MeetJS Community'"
    :members-count="data.member_count || 0"
    :invite-url="data.invite_url || DISCORD_INVITE_LINK"
  />
</template>
