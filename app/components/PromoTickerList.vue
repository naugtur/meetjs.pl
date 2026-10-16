<script setup lang="ts">
import type { Promo } from '~~/src/types/promo';

withDefaults(defineProps<{ promos: Promo[]; duplicated?: boolean }>(), {
  duplicated: false,
});

const iconIsUrl = (promo: Promo) =>
  typeof promo.icon === 'string' && /^(https?:\/\/|\/)/.test(promo.icon);

const imageSrc = (promo: Promo) =>
  promo.image || (iconIsUrl(promo) ? promo.icon : undefined);
</script>

<template>
  <ul
    :aria-hidden="duplicated || undefined"
    :class="`flex items-center ${duplicated ? 'motion-reduce:hidden' : ''}`"
  >
    <li v-for="promo in promos" :key="promo.id" class="shrink-0">
      <a
        :href="promo.ticketLink"
        target="_blank"
        rel="noopener"
        :tabindex="duplicated ? -1 : undefined"
        class="mx-1 flex items-center gap-2 whitespace-nowrap rounded-full px-3 py-1 text-xs transition-colors hover:bg-white/15 sm:text-sm"
      >
        <AppImage
          v-if="imageSrc(promo)"
          :src="imageSrc(promo)!"
          alt=""
          :width="20"
          :height="20"
          class="h-4 w-4 object-contain sm:h-5 sm:w-5"
        />
        <span v-else-if="promo.icon" class="text-base sm:text-lg">{{
          promo.icon
        }}</span>
        <span
          v-else-if="promo.emojiLeft"
          class="text-base sm:text-lg"
          role="img"
          aria-label="emoji"
          >{{ promo.emojiLeft }}</span
        >
        <span class="font-semibold">{{ promo.name }}</span>
        <span class="hidden max-w-64 truncate text-white/75 md:inline">
          {{ promo.message }}
        </span>
        <code
          v-if="promo.discountCode"
          class="rounded bg-green/20 px-1.5 py-0.5 font-mono text-[11px] font-semibold text-green"
        >
          {{ promo.discountCode }}
        </code>
      </a>
    </li>
  </ul>
</template>
