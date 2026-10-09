import { cacheLife } from 'next/cache';
import { getCombinedCommunityItems } from '@/content/communityParticipation';
import { CommunityParticipationClient } from '@/components/CommunityParticipation';

export const metadata = {
  title: 'Community Participation - meet.js',
  description:
    'Join our community initiatives, surveys, and collaborations. Help shape the future of JavaScript development.',
};

export default async function CommunityPage() {
  'use cache';
  // Prerendered; refreshed hourly so finished initiatives drop off
  cacheLife('hours');
  const allItems = getCombinedCommunityItems();

  return (
    <main>
      <CommunityParticipationClient items={allItems} />
    </main>
  );
}
