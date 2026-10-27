<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import emblaCarouselVue from 'embla-carousel-vue';
import type { EmblaOptionsType, EmblaPluginType } from 'embla-carousel';

const props = withDefaults(
  defineProps<{
    opts?: EmblaOptionsType;
    plugins?: EmblaPluginType[];
    orientation?: 'horizontal' | 'vertical';
    class?: HTMLAttributes['class'];
  }>(),
  { orientation: 'horizontal' },
);

const [carouselRef, api] = emblaCarouselVue(
  { ...props.opts, axis: props.orientation === 'horizontal' ? 'x' : 'y' },
  props.plugins,
);

const canScrollPrev = ref(false);
const canScrollNext = ref(false);

const onSelect = () => {
  if (!api.value) return;
  canScrollPrev.value = api.value.canScrollPrev();
  canScrollNext.value = api.value.canScrollNext();
};

const scrollPrev = () => api.value?.scrollPrev();
const scrollNext = () => api.value?.scrollNext();

const onKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'ArrowLeft') {
    event.preventDefault();
    scrollPrev();
  } else if (event.key === 'ArrowRight') {
    event.preventDefault();
    scrollNext();
  }
};

watch(api, (embla) => {
  if (!embla) return;
  onSelect();
  embla.on('reInit', onSelect);
  embla.on('select', onSelect);
});

provide(CAROUSEL_CONTEXT, {
  carouselRef,
  api,
  orientation: props.orientation,
  scrollPrev,
  scrollNext,
  canScrollPrev,
  canScrollNext,
});
</script>

<template>
  <div
    :class="cn('relative', props.class)"
    role="region"
    aria-roledescription="carousel"
    @keydown.capture="onKeyDown"
  >
    <slot />
  </div>
</template>
