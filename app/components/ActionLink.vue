<script setup lang="ts">
defineProps<{ href: string }>();
</script>

<template>
  <a
    :href="href"
    target="_blank"
    rel="noopener"
    class="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-2 text-primary-foreground transition-all hover:bg-purple/50"
  >
    <slot />
  </a>
</template>
