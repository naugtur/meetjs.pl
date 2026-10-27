<script setup lang="ts">
import { useTranslate } from '@tolgee/vue';

const { t } = useTranslate();
</script>

<template>
  <div class="flex flex-col items-center justify-center md:flex-row">
    <p>{{ t('events_api_partner.powered_by') }}</p>
    <a href="https://crossweb.pl" class="pl-2" target="_blank">
      <img
        src="/crossweb-logo.svg"
        alt="crossweb where IT meets"
        width="96"
        height="23.34"
        class="h-auto w-24"
      />
    </a>
  </div>
</template>
