import { cacheLife } from 'next/cache';

// Read on the server inside a cache scope (pages are prerendered), so the
// logo matches between the prerendered HTML and hydration.
export async function isChristmasSeason() {
  'use cache';
  cacheLife('days');
  const now = new Date();
  return now.getMonth() === 11 || (now.getMonth() === 0 && now.getDate() <= 15);
}
