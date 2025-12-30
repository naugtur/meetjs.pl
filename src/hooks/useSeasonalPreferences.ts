'use client';

import { useCallback, useEffect, useState } from 'react';
import type { SeasonalThemeMode } from '@/lib/seasonalTheme';

export type SeasonalSnowMode = 'auto' | 'on' | 'off';

type SeasonalPreferences = {
  themeMode: SeasonalThemeMode;
  snowMode: SeasonalSnowMode;
};

const THEME_MODE_KEY = 'meetjs_seasonal_theme_mode';
const SNOW_MODE_KEY = 'meetjs_seasonal_snow_mode';
const CHANGE_EVENT = 'meetjs-seasonal-preferences-changed';

const readThemeMode = (): SeasonalThemeMode => {
  if (typeof window === 'undefined') return 'auto';
  const value = window.localStorage.getItem(THEME_MODE_KEY);
  if (value === 'default' || value === 'christmas' || value === 'auto') {
    return value;
  }
  return 'auto';
};

const readSnowMode = (): SeasonalSnowMode => {
  if (typeof window === 'undefined') return 'auto';
  const value = window.localStorage.getItem(SNOW_MODE_KEY);
  if (value === 'on' || value === 'off' || value === 'auto') {
    return value;
  }
  return 'auto';
};

const emitChange = () => {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new Event(CHANGE_EVENT));
};

export const useSeasonalPreferences = (): SeasonalPreferences & {
  setThemeMode: (mode: SeasonalThemeMode) => void;
  setSnowMode: (mode: SeasonalSnowMode) => void;
} => {
  const [themeMode, setThemeModeState] = useState<SeasonalThemeMode>(() =>
    readThemeMode(),
  );
  const [snowMode, setSnowModeState] = useState<SeasonalSnowMode>(() =>
    readSnowMode(),
  );

  useEffect(() => {
    const sync = () => {
      setThemeModeState(readThemeMode());
      setSnowModeState(readSnowMode());
    };

    const onStorage = (e: StorageEvent) => {
      if (e.key === THEME_MODE_KEY || e.key === SNOW_MODE_KEY) {
        sync();
      }
    };

    window.addEventListener('storage', onStorage);
    window.addEventListener(CHANGE_EVENT, sync);

    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener(CHANGE_EVENT, sync);
    };
  }, []);

  const setThemeMode = useCallback((mode: SeasonalThemeMode) => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(THEME_MODE_KEY, mode);
    setThemeModeState(mode);
    emitChange();
  }, []);

  const setSnowMode = useCallback((mode: SeasonalSnowMode) => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(SNOW_MODE_KEY, mode);
    setSnowModeState(mode);
    emitChange();
  }, []);

  return {
    themeMode,
    snowMode,
    setThemeMode,
    setSnowMode,
  };
};
