/**
 * Normalizes city/filter strings for diacritic- and punctuation-insensitive matching
 * (e.g. "wroclaw" matches "Wrocław", "online" matches "On-line").
 */
export const normalizeFilterValue = (value: string): string =>
  value
    .trim()
    .toLowerCase()
    .replace(/ł/g, 'l')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[\s-]+/g, '');

export const getIcsFilename = (city?: string | null): string => {
  const safeSlug = city
    ? normalizeFilterValue(city).replace(/[^a-z0-9]/g, '')
    : '';
  return safeSlug ? `meetjs-${safeSlug}-events.ics` : 'meetjs-events.ics';
};
