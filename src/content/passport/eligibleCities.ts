import type { EligibleCity } from '@/types/passport';

const PLACEHOLDER_ADDED_AT = '2019-01-01';

export const ELIGIBLE_CITIES: EligibleCity[] = [
  { name: 'Białystok', addedAt: PLACEHOLDER_ADDED_AT },
  { name: 'Bielsko-Biała', addedAt: PLACEHOLDER_ADDED_AT },
  { name: 'Gdańsk', addedAt: PLACEHOLDER_ADDED_AT },
  { name: 'Katowice', addedAt: PLACEHOLDER_ADDED_AT },
  { name: 'Kraków', addedAt: PLACEHOLDER_ADDED_AT },
  { name: 'Łódź', addedAt: PLACEHOLDER_ADDED_AT },
  { name: 'Lublin', addedAt: PLACEHOLDER_ADDED_AT },
  { name: 'Poznań', addedAt: PLACEHOLDER_ADDED_AT },
  { name: 'Warszawa', addedAt: PLACEHOLDER_ADDED_AT },
  { name: 'Wrocław', addedAt: PLACEHOLDER_ADDED_AT },
];

export default ELIGIBLE_CITIES;
