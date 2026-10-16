<script setup lang="ts">
defineProps<{ city: string; background: string }>();
</script>

<template>
  <section
    class="flex flex-col items-center justify-center bg-cover bg-center p-28"
    :style="{ backgroundImage: `url(${background})` }"
  >
    <h1 class="text-6xl font-bold text-white drop-shadow-lg">{{ city }}</h1>
  </section>
</template>
