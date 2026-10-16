<script setup lang="ts">
import IconYoutube from '~icons/fa6-brands/youtube';
import IconArrowRight from '~icons/fa6-solid/arrow-right';
</script>

<template>
  <section
    class="w-full bg-gradient-to-r from-red-600 via-red-500 to-red-600 py-12"
  >
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col items-center justify-between gap-6 md:flex-row">
        <!-- Left side - Icon and text -->
        <div class="flex items-center gap-4 text-white">
          <div class="rounded-full bg-white/10 p-4 backdrop-blur-sm">
            <IconYoutube class="h-12 w-12" />
          </div>
          <div>
            <h3 class="mb-1 text-2xl font-bold">
              Subscribe to our YouTube Channel
            </h3>
            <p class="text-white/90">
              Watch talks, workshops, and community highlights
            </p>
          </div>
        </div>

        <!-- Right side - CTA buttons -->
        <div class="flex flex-col gap-3 sm:flex-row">
          <a
            href="/youtube"
            target="_blank"
            rel="noopener"
            class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-white px-6 py-3 font-semibold text-red-600 shadow-lg transition-colors duration-200 hover:bg-gray-100 hover:shadow-xl"
          >
            <IconYoutube class="h-5 w-5" />
            Subscribe Now
          </a>
          <NuxtLink
            to="/videos"
            class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg border-2 border-white/30 bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur-sm transition-colors duration-200 hover:bg-white/20"
          >
            Browse Videos
            <IconArrowRight class="h-4 w-4" />
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>
