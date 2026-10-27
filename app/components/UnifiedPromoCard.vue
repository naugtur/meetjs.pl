<script setup lang="ts">
import { Calendar, ExternalLink, MapPin } from 'lucide-vue-next';
import type { Promo } from '~~/src/types/promo';

type PromoVariant = 'event' | 'software' | 'learning';

interface VariantConfig {
  iconBg: string;
  defaultIcon: string;
  discountVariant: 'event' | 'software';
  ctaGradient: string;
  ctaTextColor?: string;
  linkColor: string;
  websiteLabel: string;
}

const props = withDefaults(
  defineProps<{ promo: Promo; variant?: PromoVariant }>(),
  { variant: 'software' },
);

const variantConfigs: Record<PromoVariant, VariantConfig> = {
  event: {
    iconBg: 'bg-gradient-to-br from-purple-500 to-pink-600',
    defaultIcon: '🎟️',
    discountVariant: 'event',
    ctaGradient:
      'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700',
    linkColor:
      'text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300',
    websiteLabel: 'Website',
  },
  software: {
    iconBg: 'bg-gradient-to-br from-indigo-500 to-purple-600',
    defaultIcon: '🖥️',
    discountVariant: 'software',
    ctaGradient:
      'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700',
    linkColor:
      'text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300',
    websiteLabel: 'Website',
  },
  learning: {
    iconBg: 'bg-gradient-to-br from-green-500 to-teal-600',
    defaultIcon: '📚',
    discountVariant: 'software',
    ctaGradient:
      'bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700',
    ctaTextColor: 'text-white',
    linkColor:
      'text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300',
    websiteLabel: 'Website',
  },
};

const getDomain = (url: string) => {
  try {
    const domain = new URL(url).hostname;
    return domain.startsWith('www.') ? domain.substring(4) : domain;
  } catch (e) {
    console.error('Failed to extract domain from URL:', e);
    return url;
  }
};

const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

const config = computed(() => variantConfigs[props.variant]);
const isEventVariant = computed(() => props.variant === 'event');
// Use promo-specific gradient and text color if provided, otherwise use variant defaults
const ctaGradient = computed(
  () => props.promo.gradient || config.value.ctaGradient,
);
const ctaTextColor = computed(
  () => props.promo.textColor || config.value.ctaTextColor || 'text-white',
);
</script>

<template>
  <div
    class="group relative block overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-gray-700 dark:bg-gray-800"
  >
    <!-- Header with Logo/Image -->
    <div
      class="flex items-center gap-4 border-b border-gray-100 p-6 dark:border-gray-700"
    >
      <div
        v-if="promo.image"
        class="relative h-20 w-20 overflow-hidden rounded-lg bg-gray-100 ring-2 ring-gray-100 dark:ring-gray-600"
      >
        <AppImage
          :src="promo.image"
          :alt="`${promo.name} logo`"
          fill
          class="object-contain p-3"
        />
      </div>
      <div
        v-else
        :class="`flex h-20 w-20 items-center justify-center rounded-lg text-3xl text-white ${config.iconBg}`"
      >
        {{ promo.icon || config.defaultIcon }}
      </div>

      <div class="flex-1">
        <h3 class="text-xl font-bold text-gray-900 dark:text-white">
          {{ promo.name }}
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          {{ promo.message }}
        </p>
      </div>
    </div>

    <div class="p-6">
      <!-- Description -->
      <div v-if="promo.description" class="mb-6">
        <p class="leading-relaxed text-gray-700 dark:text-gray-300">
          {{ promo.description }}
        </p>
      </div>

      <!-- Workshop Information - Only for events -->
      <WorkshopInfo
        v-if="isEventVariant"
        :workshop-description="promo.workshopDescription"
        :workshop-discount-code="promo.workshopDiscountCode"
        :workshop-link="promo.workshopLink"
      />

      <!-- Discount Code Section -->
      <DiscountCodeSection
        v-if="promo.discountCode"
        :discount-code="promo.discountCode"
        :variant="config.discountVariant"
      />

      <!-- Details Grid - Different for events vs software/learning -->
      <div v-if="isEventVariant" class="mb-6 grid grid-cols-2 gap-4">
        <div class="flex items-start gap-2">
          <Calendar class="mt-0.5 h-4 w-4 flex-shrink-0 text-gray-400" />
          <div class="min-w-0">
            <p class="text-sm font-medium text-gray-500 dark:text-gray-400">
              Valid Until
            </p>
            <p class="text-sm text-gray-900 dark:text-white">
              {{ formatDate(promo.expiresAt) }}
            </p>
          </div>
        </div>
        <div v-if="promo.city && promo.country" class="flex items-start gap-2">
          <MapPin class="mt-0.5 h-4 w-4 flex-shrink-0 text-gray-400" />
          <div class="min-w-0">
            <p class="text-sm font-medium text-gray-500 dark:text-gray-400">
              Location
            </p>
            <p class="text-sm text-gray-900 dark:text-white">
              {{ promo.city }}, {{ promo.country }} {{ promo.emojiRight }}
            </p>
          </div>
        </div>
      </div>
      <div v-else class="mb-6 space-y-3">
        <div
          v-if="promo.eventLink"
          class="flex items-center justify-between rounded-lg border border-gray-200 p-3 dark:border-gray-600"
        >
          <div>
            <p class="text-sm font-medium text-gray-700 dark:text-gray-300">
              {{ config.websiteLabel }}
            </p>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              {{ getDomain(promo.eventLink) }}
            </p>
          </div>
          <a
            :href="promo.eventLink"
            target="_blank"
            rel="noopener"
            :class="config.linkColor"
            @click.stop
          >
            <ExternalLink class="h-4 w-4" />
          </a>
        </div>
      </div>

      <!-- Additional Event Links -->
      <div
        v-if="
          isEventVariant &&
          promo.eventLink &&
          promo.ticketLink &&
          promo.eventLink !== promo.ticketLink
        "
        class="mb-6"
      >
        <div
          class="flex items-center justify-between rounded-lg border border-gray-200 p-3 dark:border-gray-600"
        >
          <div>
            <p class="text-sm font-medium text-gray-700 dark:text-gray-300">
              {{ config.websiteLabel }}
            </p>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              {{ getDomain(promo.eventLink) }}
            </p>
          </div>
          <a
            :href="promo.eventLink"
            target="_blank"
            rel="noopener"
            :class="config.linkColor"
            @click.stop
          >
            <ExternalLink class="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>

    <!-- CTA Button -->
    <div class="border-t border-gray-100 p-6 dark:border-gray-700">
      <a
        v-if="promo.ticketLink"
        :href="promo.ticketLink"
        target="_blank"
        rel="noopener"
        :class="`block w-full rounded-lg py-3 text-center font-semibold shadow transition-all hover:shadow-lg ${ctaTextColor} ${ctaGradient}`"
        @click.stop
      >
        {{ promo.cta }}
      </a>
      <span
        v-else
        :class="`block w-full rounded-lg py-3 text-center font-semibold opacity-60 shadow ${ctaTextColor}/80 ${ctaGradient}`"
      >
        {{ promo.cta }}
      </span>
    </div>
  </div>
</template>
