<script setup lang="ts">
import IconBars from '~icons/fa6-solid/bars';
import IconX from '~icons/fa6-solid/x';

defineProps<{ open: boolean; controls?: string }>();
defineEmits<{ toggle: [] }>();
</script>

<template>
  <div class="inset-y-0 flex items-center p-4 sm:hidden">
    <button
      type="button"
      class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
      :aria-expanded="open"
      :aria-controls="open ? controls : undefined"
      @click="$emit('toggle')"
    >
      <span class="absolute -inset-0.5" />
      <span class="sr-only">Open main menu</span>
      <IconX v-if="open" class="block h-6 w-6" aria-hidden="true" />
      <IconBars v-else class="block h-6 w-6" aria-hidden="true" />
    </button>
  </div>
</template>
