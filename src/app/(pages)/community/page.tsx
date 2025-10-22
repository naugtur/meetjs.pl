import { getCombinedCommunityItems } from '@/content/communityParticipation';
import { CommunityParticipationClient } from '@/components/CommunityParticipation';

export const metadata = {
  title: 'Community Participation - meet.js',
  description:
    'Join our community initiatives, surveys, and collaborations. Help shape the future of JavaScript development.',
};

export default async function CommunityPage() {
  const allItems = await getCombinedCommunityItems();
  const featuredItems = allItems.filter((item) => item.featured);

  return (
    <main>
      <CommunityParticipationClient items={featuredItems} />
    </main>
  );
}
