import { getCombinedCommunityItems } from '@/content/communityParticipation';
import { CommunityParticipationClient } from '@/components/CommunityParticipation';

export const metadata = {
  title: 'Community Participation - meet.js',
  description:
    'Join our community initiatives, surveys, and collaborations. Help shape the future of JavaScript development.',
};

export default function CommunityPage() {
  const allItems = getCombinedCommunityItems();

  return (
    <main>
      <CommunityParticipationClient items={allItems} />
    </main>
  );
}
