'use client';

import { useMemo } from 'react';
import { Settings2 } from 'lucide-react';
import { useSeasonalPreferences } from '@/hooks/useSeasonalPreferences';
import type { SeasonalThemeMode } from '@/lib/seasonalTheme';
import type { SeasonalSnowMode } from '@/hooks/useSeasonalPreferences';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const SeasonalControls = () => {
  const { themeMode, setThemeMode, snowMode, setSnowMode } =
    useSeasonalPreferences();

  const themeLabel = useMemo(() => {
    if (themeMode === 'christmas') return 'Christmas';
    if (themeMode === 'default') return 'Default';
    return 'Auto';
  }, [themeMode]);

  const snowLabel = useMemo(() => {
    if (snowMode === 'on') return 'On';
    if (snowMode === 'off') return 'Off';
    return 'Auto';
  }, [snowMode]);

  return (
    <div className="fixed bottom-4 right-4 z-[120]">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 shadow-lg transition-colors hover:bg-gray-50"
            aria-label="Seasonal settings"
          >
            <Settings2 className="h-4 w-4" />
            <span className="hidden sm:inline">Theme: {themeLabel}</span>
            <span className="hidden sm:inline">Snow: {snowLabel}</span>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" sideOffset={8}>
          <DropdownMenuLabel>Seasonal settings</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuLabel className="text-xs font-medium opacity-80">
            Theme
          </DropdownMenuLabel>
          <DropdownMenuRadioGroup
            value={themeMode}
            onValueChange={(v) => setThemeMode(v as SeasonalThemeMode)}
          >
            <DropdownMenuRadioItem value="auto">Auto</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="default">
              Default
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="christmas">
              Christmas
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
          <DropdownMenuSeparator />
          <DropdownMenuLabel className="text-xs font-medium opacity-80">
            Snow
          </DropdownMenuLabel>
          <DropdownMenuRadioGroup
            value={snowMode}
            onValueChange={(v) => setSnowMode(v as SeasonalSnowMode)}
          >
            <DropdownMenuRadioItem value="auto">Auto</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="on">On</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="off">Off</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
