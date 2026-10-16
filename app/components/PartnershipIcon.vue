<script setup lang="ts">
import {
  Bot,
  BookOpen,
  Code,
  Shield,
  Sun,
  TestTube,
  Users,
} from 'lucide-vue-next';
import type { PartnershipIcon } from '~~/src/content/partnerships';

defineProps<{ icon: PartnershipIcon }>();

const LUCIDE_ICONS = { Bot, BookOpen, Code, Shield, Sun, TestTube, Users };
</script>

<template>
  <AppImage
    v-if="icon.type === 'image'"
    :src="icon.src"
    :alt="icon.alt"
    :width="icon.width"
    :height="icon.height"
    :class="icon.className"
  />
  <component :is="LUCIDE_ICONS[icon.name]" v-else :class="icon.className" />
</template>
