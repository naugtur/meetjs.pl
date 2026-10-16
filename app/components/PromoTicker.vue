<script setup lang="ts">
import { useTranslate } from '@tolgee/vue';
import { ArrowRight, TicketPercent } from 'lucide-vue-next';
import type { Promo } from '~~/src/types/promo';
import { getActivePromos } from '~~/src/utils/promos';

const props = defineProps<{ promos: Promo[] }>();

const { t } = useTranslate();

// Resolved on the server (expiry depends on the current time) and hydrated.
const activeIds = useState('promo-ticker-ids', () =>
  getActivePromos(props.promos).map((promo) => promo.id),
);
const activePromos = computed(() =>
  activeIds.value
    .map((id) => props.promos.find((promo) => promo.id === id))
    .filter((promo): promo is Promo => Boolean(promo)),
);

const marqueeDuration = computed(
  () => `${Math.max(activePromos.value.length * 6, 30)}s`,
);
</script>

<template>
  <section
    v-if="activePromos.length > 0"
    :aria-label="t('promo_ticker.label')"
    class="border-y border-white/10 bg-purple text-white"
  >
    <div class="flex items-stretch">
      <NuxtLink
        to="/discounts"
        class="z-10 flex shrink-0 items-center gap-2 border-r border-white/10 bg-purple px-3 py-2 text-xs font-bold uppercase tracking-wider transition-colors hover:bg-white/10 sm:px-4"
      >
        <TicketPercent class="h-4 w-4 text-green" aria-hidden="true" />
        <span class="hidden sm:inline">{{ t('promo_ticker.label') }}</span>
      </NuxtLink>

      <div
        class="group relative flex-1 motion-safe:overflow-hidden motion-safe:[mask-image:linear-gradient(to_right,transparent,black_2rem,black_calc(100%-2rem),transparent)] motion-reduce:overflow-x-auto"
      >
        <div
          class="flex w-max items-center group-focus-within:[animation-play-state:paused] group-hover:[animation-play-state:paused] motion-safe:animate-marquee"
          :style="{ '--marquee-duration': marqueeDuration }"
        >
          <PromoTickerList :promos="activePromos" />
          <PromoTickerList :promos="activePromos" duplicated />
        </div>
      </div>

      <NuxtLink
        to="/discounts"
        class="z-10 hidden shrink-0 items-center gap-1.5 border-l border-white/10 bg-purple px-4 py-2 text-xs font-semibold transition-colors hover:bg-white/10 sm:flex"
      >
        {{ t('promo_ticker.view_all') }}
        <ArrowRight class="h-3.5 w-3.5" aria-hidden="true" />
      </NuxtLink>
    </div>
  </section>
</template>
