<script setup lang="ts">
import { Check, Copy, ExternalLink } from 'lucide-vue-next';

defineProps<{
  workshopDescription?: string;
  workshopDiscountCode?: string;
  workshopLink?: string;
}>();

const { copied, copyToClipboard } = useCopyToClipboard();
</script>

<template>
  <div
    v-if="workshopDescription"
    class="mb-6 rounded-lg border border-blue-100 bg-gradient-to-r from-blue-50 to-cyan-50 p-4 dark:border-blue-800/30 dark:from-blue-900/20 dark:to-cyan-900/20"
  >
    <div class="mb-2 flex items-center gap-2">
      <div
        class="rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 p-1.5 text-white"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="h-4 w-4"
        >
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2-2V7.5L14.5 2z" />
          <polyline points="14 2 14 8 20 8" />
          <path d="M16 13H8" />
          <path d="M16 17H8" />
          <path d="M10 9H8" />
        </svg>
      </div>
      <h4 class="text-sm font-semibold text-blue-800 dark:text-blue-300">
        Special Workshop Available
      </h4>
    </div>
    <p class="mb-3 text-sm text-gray-700 dark:text-gray-300">
      {{ workshopDescription }}
    </p>
    <div
      v-if="workshopDiscountCode"
      class="mt-3 flex items-center justify-between rounded-md bg-white/50 px-3 py-2 text-sm dark:bg-gray-700/50"
    >
      <span class="font-mono font-medium text-blue-600 dark:text-blue-400">
        {{ workshopDiscountCode }}
      </span>
      <button
        class="flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
        @click="copyToClipboard(workshopDiscountCode)"
      >
        <template v-if="copied">
          <Check class="h-3 w-3" />
          <span>Copied!</span>
        </template>
        <template v-else>
          <Copy class="h-3 w-3" />
          <span>Copy Code</span>
        </template>
      </button>
    </div>
    <div v-if="workshopLink" class="mt-3">
      <a
        :href="workshopLink"
        target="_blank"
        rel="noopener"
        class="inline-flex items-center text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
      >
        Register for Workshop
        <ExternalLink class="ml-1 h-3 w-3" />
      </a>
    </div>
  </div>
</template>
