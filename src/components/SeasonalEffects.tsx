'use client';

import { Snow } from '@/components/Snow';
import { getSeasonalThemeWithMode } from '@/lib/seasonalTheme';
import { useSeasonalPreferences } from '@/hooks/useSeasonalPreferences';

export const SeasonalEffects = () => {
  const { themeMode, snowMode } = useSeasonalPreferences();
  const seasonal = getSeasonalThemeWithMode(new Date(), themeMode);

  const enableSnow =
    snowMode === 'on' ? true : snowMode === 'off' ? false : seasonal.enableSnow;

  return <>{enableSnow ? <Snow /> : null}</>;
};
