<script setup lang="ts">
import IconArrowUpRightFromSquare from '~icons/fa6-solid/arrow-up-right-from-square';

const props = withDefaults(
  defineProps<{
    name: string;
    href: string;
    current?: boolean;
    external?: boolean;
    highlight?: boolean;
  }>(),
  { current: false, external: false, highlight: false },
);

const linkClass = computed(() =>
  classNames(
    props.highlight
      ? 'bg-[#bcd35d] text-black hover:bg-[#bcd35d]/90 shadow-lg hover:shadow-xl hover:shadow-[#bcd35d]/20 hover:scale-105 transition-all duration-300 font-bold'
      : props.current
        ? 'bg-gray-900 text-white'
        : 'text-white hover:bg-green/80 hover:text-purple',
    'whitespace-nowrap rounded-md px-3 py-2 font-medium',
  ),
);
</script>

<template>
  <a
    v-if="external"
    :href="href"
    :class="linkClass"
    :aria-current="current ? 'page' : undefined"
    target="_blank"
    rel="noopener"
    itemprop="url"
    :aria-label="`${name} (opens in a new tab)`"
  >
    <span itemprop="name">{{ name }}</span>
    <IconArrowUpRightFromSquare
      class="mb-1 ml-2 inline-block"
      aria-hidden="true"
    />
  </a>
  <NuxtLink
    v-else
    :to="href"
    :class="linkClass"
    :aria-current="current ? 'page' : undefined"
    itemprop="url"
  >
    <span itemprop="name">{{ name }}</span>
  </NuxtLink>
</template>
