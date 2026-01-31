'use client';

import { useEffect, useState } from 'react';
import { Snow } from '@/components/Snow';
import { getSeasonalThemeWithMode } from '@/lib/seasonalTheme';
import { useSeasonalPreferences } from '@/hooks/useSeasonalPreferences';

type LegacyMediaQueryList = {
  addListener?: (listener: () => void) => void;
  removeListener?: (listener: () => void) => void;
};

export const SeasonalEffects = () => {
  const { themeMode, snowMode } = useSeasonalPreferences();
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const update = () => {
      setPrefersReducedMotion(mediaQuery.matches);
    };

    update();

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', update);
      return () => {
        mediaQuery.removeEventListener('change', update);
      };
    }

    const legacyMediaQuery = mediaQuery as unknown as LegacyMediaQueryList;
    legacyMediaQuery.addListener?.(update);
    return () => {
      legacyMediaQuery.removeListener?.(update);
    };
  }, []);

  const seasonal = getSeasonalThemeWithMode(new Date(), themeMode);

  const enableSnow =
    snowMode === 'on' ? true : snowMode === 'off' ? false : seasonal.enableSnow;

  return <>{!prefersReducedMotion && enableSnow ? <Snow /> : null}</>;
};
