export type SeasonalTheme = {
  logoSrc: string;
  enableSnow: boolean;
};

export type SeasonalThemeMode = 'auto' | 'default' | 'christmas';

const isChristmasSeason = (date: Date) => {
  const month = date.getMonth();
  const day = date.getDate();

  return month === 11 || (month === 0 && day <= 15);
};

export const getSeasonalTheme = (date: Date = new Date()): SeasonalTheme => {
  if (isChristmasSeason(date)) {
    return {
      logoSrc: '/christmas_logo.svg',
      enableSnow: true,
    };
  }

  return {
    logoSrc: '/logo.svg',
    enableSnow: false,
  };
};

export const getSeasonalThemeWithMode = (
  date: Date = new Date(),
  mode: SeasonalThemeMode = 'auto',
): SeasonalTheme => {
  if (mode === 'christmas') {
    return {
      logoSrc: '/christmas_logo.svg',
      enableSnow: true,
    };
  }

  if (mode === 'default') {
    return {
      logoSrc: '/logo.svg',
      enableSnow: false,
    };
  }

  return getSeasonalTheme(date);
};
