<script setup lang="ts">
import { DropdownMenuRoot, DropdownMenuTrigger } from 'reka-ui';
import IconChevronDown from '~icons/fa6-solid/chevron-down';
import IconGlobe from '~icons/fa6-solid/globe';

const props = withDefaults(
  defineProps<{ variant?: 'desktop' | 'mobile'; class?: string }>(),
  { variant: 'desktop', class: '' },
);

const language = useLanguage();
const languageCookie = useLanguageCookie();

// The language switches in place (translations, <html lang>, formatting are
// reactive); the cookie keeps it for the next visit.
const handleLanguageChange = (locale: Language) => {
  if (locale === language.value) return;
  languageCookie.value = locale;
  language.value = locale;
};

const getLanguageLabel = (lang: string) => {
  switch (lang) {
    case 'en':
      return 'English';
    case 'pl':
      return 'Polski';
    default:
      return lang.toUpperCase();
  }
};

const getLanguageFlag = (lang: string) => {
  switch (lang) {
    case 'en':
      return '🇺🇸';
    case 'pl':
      return '🇵🇱';
    default:
      return '🌐';
  }
};
</script>

<template>
  <div
    v-if="variant === 'mobile'"
    :class="`flex flex-col space-y-2 ${props.class}`"
  >
    <div
      class="flex items-center text-sm font-medium text-gray-600 dark:text-gray-300"
    >
      <IconGlobe class="mr-2 h-4 w-4" />
      Language
    </div>
    <button
      v-for="lang in LANGUAGES"
      :key="lang"
      :class="`flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors ${
        language === lang
          ? 'bg-purple text-white'
          : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
      }`"
      @click="handleLanguageChange(lang)"
    >
      <span class="mr-2">{{ getLanguageFlag(lang) }}</span>
      {{ getLanguageLabel(lang) }}
    </button>
  </div>

  <DropdownMenuRoot v-else>
    <DropdownMenuTrigger
      :class="`flex items-center rounded-md px-3 py-2 font-medium text-white hover:bg-green/80 hover:text-purple ${props.class}`"
      aria-haspopup="true"
      aria-expanded="false"
    >
      <span class="mr-1">{{ getLanguageFlag(language) }}</span>
      {{ language.toUpperCase() }}
      <IconChevronDown class="ml-1 h-4 w-4" aria-hidden="true" />
    </DropdownMenuTrigger>
    <UiDropdownMenuContent align="end" class="w-40">
      <UiDropdownMenuItem
        v-for="lang in LANGUAGES"
        :key="lang"
        :class="`flex cursor-pointer items-center ${
          language === lang ? 'bg-purple/10 font-medium text-purple' : ''
        }`"
        @select="handleLanguageChange(lang)"
      >
        <span class="mr-2">{{ getLanguageFlag(lang) }}</span>
        {{ getLanguageLabel(lang) }}
      </UiDropdownMenuItem>
    </UiDropdownMenuContent>
  </DropdownMenuRoot>
</template>
