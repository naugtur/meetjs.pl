'use client';

import { useTolgee } from '@tolgee/react';
import { setLanguage } from '@/tolgee/language';
import { ALL_LANGUAGES } from '@/tolgee/shared';

export const LanguageSwitcher = () => {
  const tolgee = useTolgee(['language']);
  const currentLanguage = tolgee.getLanguage();

  const handleLanguageChange = async (locale: string) => {
    await setLanguage(locale);
    window.location.reload(); // Simple reload to apply language change
  };

  return (
    <div className="flex items-center space-x-2">
      {ALL_LANGUAGES.map((lang) => (
        <button
          key={lang}
          onClick={() => handleLanguageChange(lang)}
          className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
            currentLanguage === lang
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {lang.toUpperCase()}
        </button>
      ))}
    </div>
  );
};
