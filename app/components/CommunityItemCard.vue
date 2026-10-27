<script setup lang="ts">
import { Calendar, ExternalLink, TrendingUp, Users } from 'lucide-vue-next';
import type { CommunityItem } from '~~/src/content/communityParticipation';

const props = defineProps<{ item: CommunityItem }>();

const TYPE_ICONS = {
  survey: TrendingUp,
  initiative: Users,
  research: TrendingUp,
  collaboration: Users,
} satisfies Record<CommunityItem['type'], unknown>;

const TYPE_GRADIENTS: Record<CommunityItem['type'], string> = {
  survey: 'from-blue-500 to-cyan-500',
  initiative: 'from-green-500 to-emerald-500',
  research: 'from-purple-500 to-pink-500',
  collaboration: 'from-orange-500 to-red-500',
};

const TYPE_BADGE_COLORS: Record<CommunityItem['type'], string> = {
  survey:
    'bg-blue-500/10 text-blue-700 border-blue-200 dark:bg-blue-500/20 dark:text-blue-300 dark:border-blue-800',
  initiative:
    'bg-green-500/10 text-green-700 border-green-200 dark:bg-green-500/20 dark:text-green-300 dark:border-green-800',
  research:
    'bg-purple-500/10 text-purple-700 border-purple-200 dark:bg-purple-500/20 dark:text-purple-300 dark:border-purple-800',
  collaboration:
    'bg-orange-500/10 text-orange-700 border-orange-200 dark:bg-orange-500/20 dark:text-orange-300 dark:border-orange-800',
};

const typeIcon = computed(() => TYPE_ICONS[props.item.type] ?? Users);
const typeGradient = computed(
  () => TYPE_GRADIENTS[props.item.type] ?? 'from-gray-500 to-gray-600',
);
const typeBadgeColor = computed(
  () =>
    TYPE_BADGE_COLORS[props.item.type] ??
    'bg-gray-500/10 text-gray-700 border-gray-200 dark:bg-gray-500/20 dark:text-gray-300 dark:border-gray-800',
);

const endDateLabel = computed(() =>
  props.item.endDate
    ? new Date(props.item.endDate).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      })
    : '',
);
</script>

<template>
  <div
    class="group relative h-full overflow-hidden rounded-3xl border border-white/20 bg-white/60 shadow-xl backdrop-blur-xl transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl dark:border-gray-700/50 dark:bg-gray-800/60"
  >
    <!-- Animated gradient background -->
    <div
      :class="`absolute inset-0 bg-gradient-to-br ${typeGradient} opacity-0 transition-opacity duration-500 group-hover:opacity-10`"
    />

    <div class="relative flex h-full flex-col">
      <!-- Top Section - Image & Badge -->
      <div class="relative p-6 pb-4">
        <div v-if="item.image" class="mb-4 flex items-center justify-between">
          <div
            class="relative h-28 w-28 overflow-hidden rounded-2xl bg-white shadow-lg ring-2 ring-white/50 transition-all duration-500 group-hover:rotate-3 group-hover:scale-110 dark:ring-gray-700/50"
          >
            <AppImage
              :src="item.image"
              :alt="item.title"
              fill
              sizes="112px"
              class="object-contain p-4"
              priority
            />
          </div>
          <UiBadge
            :class="`flex items-center gap-1.5 rounded-full border-0 px-3 py-1.5 font-semibold shadow-md ${typeBadgeColor}`"
          >
            <component :is="typeIcon" class="h-5 w-5" />
            <span class="text-xs">
              {{ item.type.charAt(0).toUpperCase() + item.type.slice(1) }}
            </span>
          </UiBadge>
        </div>

        <!-- Title -->
        <h3
          class="mb-2 text-2xl font-black leading-tight text-gray-900 dark:text-white"
        >
          {{ item.title }}
        </h3>

        <!-- Organization & Date -->
        <div class="flex items-center justify-between text-xs">
          <div
            class="flex items-center gap-1.5 text-gray-600 dark:text-gray-400"
          >
            <Users class="h-3.5 w-3.5" />
            <span class="font-medium">{{ item.organization }}</span>
          </div>
          <div
            v-if="item.endDate"
            class="flex items-center gap-1 text-gray-500 dark:text-gray-500"
          >
            <Calendar class="h-3.5 w-3.5" />
            <span>{{ endDateLabel }}</span>
          </div>
        </div>
      </div>

      <!-- Divider -->
      <div
        class="mx-6 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent dark:via-gray-600"
      />

      <!-- Middle Section - Content -->
      <div class="flex-1 space-y-3 p-6">
        <!-- Tags - Visual Focus -->
        <div class="flex flex-wrap gap-1.5">
          <span
            v-for="tag in item.tags.slice(0, 3)"
            :key="tag"
            class="rounded-lg bg-gray-900/5 px-2.5 py-1 text-xs font-semibold text-gray-700 backdrop-blur-sm dark:bg-white/5 dark:text-gray-300"
          >
            #{{ tag }}
          </span>
          <span
            v-if="item.tags.length > 3"
            class="rounded-lg bg-gray-900/5 px-2.5 py-1 text-xs font-semibold text-gray-500 dark:bg-white/5 dark:text-gray-400"
          >
            +{{ item.tags.length - 3 }}
          </span>
        </div>

        <!-- Description - 2-3 lines -->
        <p
          class="line-clamp-3 text-sm leading-relaxed text-gray-600 dark:text-gray-400"
        >
          {{ item.description }}
        </p>
      </div>

      <!-- Bottom Section - CTA -->
      <div class="p-6 pt-0">
        <a
          :href="item.url"
          target="_blank"
          rel="noopener"
          :class="`group/btn flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r ${typeGradient} px-6 py-3.5 font-bold text-white shadow-lg transition-all duration-300 hover:shadow-2xl hover:brightness-110`"
        >
          <span>{{ item.ctaText }}</span>
          <ExternalLink class="h-4 w-4" />
        </a>
      </div>
    </div>
  </div>
</template>
