<script setup lang="ts">
defineProps<{ href: string; text: string }>();
</script>

<template>
  <a
    :href="href"
    target="_blank"
    rel="noopener"
    class="absolute right-4 top-4 hidden rotate-2 bg-blue px-4 py-2 shadow-lg transition-transform hover:scale-105 md:block"
  >
    <p class="text-sm font-bold">{{ text }}</p>
  </a>
</template>
