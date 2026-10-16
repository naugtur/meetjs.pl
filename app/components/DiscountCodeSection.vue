<script setup lang="ts">
import { Check, Copy } from 'lucide-vue-next';

const props = withDefaults(
  defineProps<{ discountCode: string; variant?: 'event' | 'software' }>(),
  { variant: 'event' },
);

const { copied, copyToClipboard } = useCopyToClipboard();

const variantStyles = {
  event: {
    container:
      'border-purple-100 bg-gradient-to-r from-purple-50 to-pink-50 dark:border-purple-800/30 dark:from-purple-900/20 dark:to-pink-900/20',
    code: 'text-purple-600 dark:text-purple-400',
    button:
      'bg-white text-purple-600 hover:bg-purple-50 dark:bg-gray-700 dark:text-purple-400 dark:hover:bg-gray-600',
  },
  software: {
    container:
      'bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20',
    code: 'text-green-600 dark:text-green-400',
    button:
      'bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600',
  },
};

const styles = computed(() => variantStyles[props.variant]);
</script>

<template>
  <div :class="`mb-6 rounded-lg border p-4 ${styles.container}`">
    <div class="flex items-center justify-between">
      <div class="min-w-0 flex-1">
        <p class="mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
          Discount Code
        </p>
        <p :class="`truncate font-mono text-lg font-bold ${styles.code}`">
          {{ discountCode }}
        </p>
      </div>
      <button
        :class="`ml-3 flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium shadow-sm transition-all duration-200 hover:shadow-md active:scale-95 ${styles.button}`"
        :aria-label="`Copy discount code ${discountCode}`"
        @click="copyToClipboard(discountCode)"
      >
        <Check v-if="copied" class="h-4 w-4" />
        <Copy v-else class="h-4 w-4" />
        {{ copied ? 'Copied!' : 'Copy' }}
      </button>
    </div>
  </div>
</template>
