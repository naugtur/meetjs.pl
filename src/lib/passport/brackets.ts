import type { BracketId, EligibleCity } from '@/types/passport';

export interface BracketDefinition {
  id: BracketId;
  requiredCityCount: (asOfDate: Date, roster: EligibleCity[]) => number;
}

function toLocalIsoDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getRosterSizeAsOf(
  asOfDate: Date,
  roster: EligibleCity[],
): number {
  const asOfIso = toLocalIsoDate(asOfDate);
  return roster.filter((city) => city.addedAt <= asOfIso).length;
}

export const BRACKETS: BracketDefinition[] = [
  { id: 'two_city', requiredCityCount: () => 2 },
  { id: 'four_city', requiredCityCount: () => 4 },
  { id: 'six_city', requiredCityCount: () => 6 },
  { id: 'all_city', requiredCityCount: getRosterSizeAsOf },
];
