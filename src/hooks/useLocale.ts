import { Localization } from '@/utils/eventUtils';
import { useTolgee } from '@tolgee/react';

/**
 * Custom hook to get the current locale in the format expected by date/time formatting functions
 * @returns An object containing the current language code and formatted locale string
 */
export const useLocale = (): {
  language: string;
  locale: Localization;
} => {
  const tolgee = useTolgee(['language']);
  const currentLanguage = tolgee.getLanguage() || 'en';
  const locale = currentLanguage === 'pl' ? 'pl-PL' : 'en-US';

  return {
    language: currentLanguage,
    locale,
  };
};
