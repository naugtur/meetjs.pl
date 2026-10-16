<script setup lang="ts">
import { useTranslate } from '@tolgee/vue';
import { BookOpen, Monitor, Ticket } from 'lucide-vue-next';

type EmptyStateType = 'events' | 'software' | 'learning';

const props = defineProps<{
  type: EmptyStateType;
  title?: string;
  description?: string;
}>();

const { t } = useTranslate();

const CONFIG = {
  events: {
    icon: Ticket,
    iconBg: 'bg-gradient-to-br from-purple-500 to-pink-600',
  },
  software: {
    icon: Monitor,
    iconBg: 'bg-gradient-to-br from-indigo-500 to-purple-600',
  },
  learning: {
    icon: BookOpen,
    iconBg: 'bg-gradient-to-br from-green-500 to-teal-600',
  },
};

// Static keys, so the Tolgee CLI can extract them
const defaultTexts = computed(
  () =>
    ({
      events: {
        title: t.value('discounts.empty.events.title'),
        description: t.value('discounts.empty.events.description'),
      },
      software: {
        title: t.value('discounts.empty.software.title'),
        description: t.value('discounts.empty.software.description'),
      },
      learning: {
        title: t.value('discounts.empty.learning.title'),
        description: t.value('discounts.empty.learning.description'),
      },
    })[props.type],
);

const config = computed(() => CONFIG[props.type]);
const titleText = computed(() => props.title ?? defaultTexts.value.title);
const descriptionText = computed(
  () => props.description ?? defaultTexts.value.description,
);
</script>

<template>
  <div
    class="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800"
  >
    <div class="p-12 text-center">
      <div
        :class="`mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full shadow-md ${config.iconBg}`"
      >
        <component :is="config.icon" class="h-10 w-10 text-white" />
      </div>
      <h3 class="mb-3 text-lg font-semibold text-gray-900 dark:text-white">
        {{ titleText }}
      </h3>
      <p
        class="mx-auto max-w-md text-sm leading-relaxed text-gray-600 dark:text-gray-400"
      >
        {{ descriptionText }}
      </p>
    </div>
  </div>
</template>
