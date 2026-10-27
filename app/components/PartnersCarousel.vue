<script setup lang="ts">
import Autoplay from 'embla-carousel-autoplay';
import { PARTNERS } from '~~/src/content/partners';

const plugins = [Autoplay({ playOnInit: true, delay: 2000 })];
</script>

<template>
  <UiCarousel :opts="{ loop: true }" :plugins="plugins">
    <UiCarouselContent class="items-center">
      <UiCarouselItem
        v-for="partner in PARTNERS"
        :key="partner.alt"
        class="basis-full md:basis-1/6"
      >
        <a
          :href="partner.href"
          class="flex items-center justify-center"
          target="_blank"
          rel="noopener"
        >
          <img
            :src="partner.src"
            :alt="partner.alt"
            width="114"
            height="48"
            class="h-auto max-h-12 w-auto max-w-[114px] object-contain"
          />
        </a>
      </UiCarouselItem>
    </UiCarouselContent>
  </UiCarousel>
</template>
