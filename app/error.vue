<script setup lang="ts">
import type { NuxtError } from '#app';
import IconTriangleExclamation from '~icons/fa6-solid/triangle-exclamation';

const props = defineProps<{ error: NuxtError }>();

useRootHead();
useSiteMeta({ robots: 'noindex' });

const notFound = computed(() => props.error.statusCode === 404);
</script>

<template>
  <NuxtLayout>
    <div
      class="flex flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8"
    >
      <div class="mx-auto flex max-w-3xl flex-col gap-8 text-center">
        <IconTriangleExclamation class="mx-auto h-12 w-12 text-primary" />
        <h1
          class="mt-4 text-5xl font-bold tracking-tight text-foreground sm:text-6xl"
        >
          <template v-if="notFound">404<br />Module not found</template>
          <template v-else
            >{{ error.statusCode }}<br />Something went wrong</template
          >
        </h1>
        <p class="mt-4 text-lg text-muted-foreground">
          <template v-if="notFound">
            Oops, the page you're looking for doesn't exist. It may have been
            moved or deleted.
          </template>
          <template v-else> Please try again later. </template>
        </p>
        <div class="mt-6">
          <NuxtLink to="/" :class="buttonVariants()" :prefetch="false">
            Go to Homepage
          </NuxtLink>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>
