<script setup lang="ts">
import type { HTMLAttributes, StyleValue } from 'vue';

/**
 * Drop-in replacement for next/image: same props, same srcset widths and the
 * same markup (lazy loading, async decoding, `fill` positioning, SVGs served
 * as-is). URLs come from @nuxt/image (IPX locally, Vercel optimizer on Vercel).
 */
const props = withDefaults(
  defineProps<{
    src: string;
    alt: string;
    width?: number | string;
    height?: number | string;
    fill?: boolean;
    sizes?: string;
    priority?: boolean;
    quality?: number;
    unoptimized?: boolean;
    class?: HTMLAttributes['class'];
    style?: StyleValue;
  }>(),
  { quality: 75 },
);

const img = useImage();

const toNumber = (value: number | string | undefined) =>
  value === undefined ? undefined : Number(value);

const sources = computed(() => {
  const isUnoptimized =
    props.unoptimized ||
    /^(data|blob):/.test(props.src) ||
    props.src.split('?', 1)[0]!.endsWith('.svg');
  if (isUnoptimized) {
    return { src: props.src, srcset: undefined, sizes: undefined };
  }

  const { widths, kind } = getImageWidths(
    props.fill ? undefined : toNumber(props.width),
    props.sizes,
  );
  const url = (width: number) =>
    img(props.src, { width, quality: props.quality, format: 'webp' });
  return {
    sizes: !props.sizes && kind === 'w' ? '100vw' : props.sizes,
    srcset: widths
      .map(
        (width, index) =>
          `${url(width)} ${kind === 'w' ? width : index + 1}${kind}`,
      )
      .join(', '),
    src: url(widths[widths.length - 1]!),
  };
});

const FILL_STYLE = {
  position: 'absolute',
  height: '100%',
  width: '100%',
  left: 0,
  top: 0,
  right: 0,
  bottom: 0,
} as const;

const imageStyle = computed<StyleValue>(() => [
  props.fill ? FILL_STYLE : {},
  { color: 'transparent' },
  props.style ?? {},
]);

if (props.priority) {
  useHead(() => ({
    link: [
      sources.value.srcset
        ? {
            rel: 'preload',
            as: 'image',
            imagesrcset: sources.value.srcset,
            imagesizes: sources.value.sizes,
          }
        : { rel: 'preload', as: 'image', href: sources.value.src },
    ],
  }));
}
</script>

<template>
  <img
    :alt="alt"
    :loading="priority ? undefined : 'lazy'"
    :width="fill ? undefined : width"
    :height="fill ? undefined : height"
    decoding="async"
    :data-nimg="fill ? 'fill' : '1'"
    :class="props.class"
    :style="imageStyle"
    :sizes="sources.sizes"
    :srcset="sources.srcset"
    :src="sources.src"
  />
</template>
