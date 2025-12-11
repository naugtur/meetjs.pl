'use client';

import { useTolgee } from '@tolgee/react';
import { setLanguage } from '@/tolgee/language';
import { ALL_LANGUAGES } from '@/tolgee/shared';
import { FaGlobe, FaChevronDown } from 'react-icons/fa6';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface LanguageSwitcherProps {
  variant?: 'desktop' | 'mobile';
  className?: string;
}

export const LanguageSwitcher = ({
  variant = 'desktop',
  className = '',
}: LanguageSwitcherProps) => {
  const tolgee = useTolgee(['language']);
  const currentLanguage = tolgee.getLanguage() || 'en';

  const handleLanguageChange = async (locale: string) => {
    if (locale === currentLanguage) return;
    await setLanguage(locale);
    window.location.reload(); // Simple reload to apply language change
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

  if (variant === 'mobile') {
    return (
      <div className={`flex flex-col space-y-2 ${className}`}>
        <div className="flex items-center text-sm font-medium text-gray-600 dark:text-gray-300">
          <FaGlobe className="mr-2 h-4 w-4" />
          Language
        </div>
        {ALL_LANGUAGES.map((lang) => (
          <button
            key={lang}
            onClick={() => handleLanguageChange(lang)}
            className={`flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors ${
              currentLanguage === lang
                ? 'bg-purple text-white'
                : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
            }`}
          >
            <span className="mr-2">{getLanguageFlag(lang)}</span>
            {getLanguageLabel(lang)}
          </button>
        ))}
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={`flex items-center rounded-md px-3 py-2 font-medium text-white hover:bg-green/80 hover:text-purple ${className}`}
        aria-haspopup="true"
        aria-expanded="false"
      >
        <span className="mr-1">{getLanguageFlag(currentLanguage)}</span>
        {currentLanguage.toUpperCase()}
        <FaChevronDown className="ml-1 h-4 w-4" aria-hidden="true" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        {ALL_LANGUAGES.map((lang) => (
          <DropdownMenuItem
            key={lang}
            onClick={() => handleLanguageChange(lang)}
            className={`flex cursor-pointer items-center ${
              currentLanguage === lang
                ? 'bg-purple/10 font-medium text-purple'
                : ''
            }`}
          >
            <span className="mr-2">{getLanguageFlag(lang)}</span>
            {getLanguageLabel(lang)}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
