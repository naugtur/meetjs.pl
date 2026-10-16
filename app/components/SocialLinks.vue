<script setup lang="ts">
import { socialLinksData } from '~~/src/content/socialLinks';
</script>

<template>
  <ul class="flex items-center gap-4 p-4 text-xl text-white md:gap-2">
    <li v-for="socialLink in socialLinksData" :key="socialLink.name">
      <a :href="socialLink.url" target="_blank">
        <SocialIcon :name="socialLink.icon" />
        <span class="sr-only">{{ socialLink.name }}</span>
      </a>
    </li>
  </ul>
</template>
