<script setup lang="ts">
import type { RichText } from '~~/src/content/cityPages';

defineProps<{ content: RichText }>();
</script>

<template>
  <template v-for="(part, index) in content" :key="index">
    <template v-if="typeof part === 'string'">{{ part }}</template>
    <br v-else-if="'br' in part" />
    <a v-else :href="part.href" :class="part.className" :about="part.about">{{
      part.text
    }}</a>
  </template>
</template>
