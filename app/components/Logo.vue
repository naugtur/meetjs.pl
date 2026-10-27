<script setup lang="ts">
import { useTranslate } from '@tolgee/vue';

withDefaults(defineProps<{ clickable?: boolean }>(), { clickable: true });

const { t } = useTranslate();
const showContextMenu = ref(false);
const contextMenuPosition = reactive({ x: 0, y: 0 });

const handleRightClick = (event: MouseEvent) => {
  event.preventDefault();
  event.stopPropagation();
  contextMenuPosition.x = event.clientX;
  contextMenuPosition.y = event.clientY;
  showContextMenu.value = true;
};

const handleClickOutside = () => {
  showContextMenu.value = false;
};

const now = new Date();
const isChristmasSeason =
  now.getMonth() === 11 || (now.getMonth() === 0 && now.getDate() <= 15);
const logoSrc = isChristmasSeason ? '/christmas_logo.svg' : '/logo.svg';
</script>

<template>
  <NuxtLink v-if="clickable" to="/" class="flex items-center">
    <AppImage
      :src="logoSrc"
      alt="meet.js Logo"
      :width="150"
      :height="40"
      class="p-4"
      :style="{ userSelect: 'none' }"
      @contextmenu="handleRightClick"
    />
  </NuxtLink>
  <AppImage
    v-else
    :src="logoSrc"
    alt="meet.js Logo"
    :width="150"
    :height="40"
    class="p-4"
    :style="{ userSelect: 'none' }"
    @contextmenu="handleRightClick"
  />

  <template v-if="showContextMenu">
    <div class="fixed inset-0 z-[60]" @click="handleClickOutside" />
    <div
      class="fixed z-[70] min-w-[200px] rounded-lg border border-gray-200 bg-white py-2 shadow-lg"
      :style="{
        left: `${contextMenuPosition.x}px`,
        top: `${contextMenuPosition.y}px`,
      }"
    >
      <div class="border-b border-gray-100 px-4 py-2 text-sm text-gray-700">
        <div class="font-medium">
          {{ t('logo_component.context_menu_title') }}
        </div>
        <div class="mt-1 text-xs text-gray-500">
          {{ t('logo_component.context_menu_subtitle') }}
        </div>
      </div>
      <NuxtLink
        to="/brand"
        class="block w-full cursor-pointer px-4 py-2 text-left text-sm text-gray-700 transition-colors hover:bg-gray-50"
        @click="handleClickOutside"
      >
        📦 {{ t('logo_component.go_to_brand_assets') }}
      </NuxtLink>
    </div>
  </template>
</template>
