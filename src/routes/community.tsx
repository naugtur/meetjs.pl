import { PageMeta } from '@/components/PageMeta';
import { getCombinedCommunityItems } from '@/content/communityParticipation';
import { CommunityParticipationClient } from '@/components/CommunityParticipation';

export default function CommunityPage() {
  const allItems = getCombinedCommunityItems();

  return (
    <main>
      <PageMeta
        title="Community Participation - meet.js"
        description="Join our community initiatives, surveys, and collaborations. Help shape the future of JavaScript development."
        path="/community"
      />
      <CommunityParticipationClient items={allItems} />
    </main>
  );
}
