import { readFileSync } from 'fs';
import { join } from 'path';

/**
 * Inline the meet.js logo as a data URI so OG images render without
 * network access (satori fetches <img> sources at render time).
 */
export const getLogoDataUri = (): string => {
  const svg = readFileSync(join(process.cwd(), 'public', 'logo.svg'), 'utf8');
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
};
