<script setup lang="ts">
defineProps<{ email: string }>();
</script>

<template>
  <section
    class="flex w-full flex-col items-center justify-center gap-4 bg-green p-8"
  >
    <h2 class="text-center font-medium">
      For more information, please contact us at
    </h2>
    <a :href="`mailto:${email}`" class="text-2xl font-bold hover:underline">
      {{ email }}
    </a>
  </section>
</template>
