<script setup lang="ts">
import { useTranslate } from '@tolgee/vue';

const { t } = useTranslate();
</script>

<template>
  <p class="text-center font-bold">{{ t('empty_events_alert.message') }}</p>
</template>
