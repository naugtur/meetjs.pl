import { For } from 'solid-js';
import { FaSolidChevronDown, FaSolidGlobe } from 'solid-icons/fa';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ALL_LANGUAGES } from '@/i18n/messages';
import { setLanguage, useTranslate } from '@/i18n';

interface LanguageSwitcherProps {
  variant?: 'desktop' | 'mobile';
  class?: string;
}

export const LanguageSwitcher = (props: LanguageSwitcherProps) => {
  const { language: locale } = useTranslate();

  const handleLanguageChange = (lang: string) => {
    if (lang === locale()) return;
    setLanguage(lang);
    window.location.reload();
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

  if (props.variant === 'mobile') {
    return (
      <div class={`flex flex-col space-y-2 ${props.class ?? ''}`}>
        <div class="flex items-center text-sm font-medium text-gray-600 dark:text-gray-300">
          <FaSolidGlobe class="mr-2 h-4 w-4" />
          Language
        </div>
        <For each={ALL_LANGUAGES}>
          {(lang) => (
            <button
              onClick={() => handleLanguageChange(lang)}
              class={`flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                locale() === lang
                  ? 'bg-purple text-white'
                  : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              <span class="mr-2">{getLanguageFlag(lang)}</span>
              {getLanguageLabel(lang)}
            </button>
          )}
        </For>
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        class={`flex items-center rounded-md px-3 py-2 font-medium text-white hover:bg-green/80 hover:text-purple ${props.class ?? ''}`}
        aria-haspopup="true"
      >
        <span class="mr-1">{getLanguageFlag(locale())}</span>
        {locale().toUpperCase()}
        <FaSolidChevronDown class="ml-1 h-4 w-4" aria-hidden="true" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" class="w-40">
        <For each={ALL_LANGUAGES}>
          {(lang) => (
            <DropdownMenuItem
              onClick={() => handleLanguageChange(lang)}
              class={`flex cursor-pointer items-center ${
                locale() === lang ? 'bg-purple/10 font-medium text-purple' : ''
              }`}
            >
              <span class="mr-2">{getLanguageFlag(lang)}</span>
              {getLanguageLabel(lang)}
            </DropdownMenuItem>
          )}
        </For>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
