import { getNewestCommunityItems } from '@/content/communityParticipation';
import { CommunityParticipationClient } from './CommunityParticipation';

export function CommunityParticipation() {
  // Show only the 3 newest items on homepage
  const newestItems = getNewestCommunityItems(3);

  if (newestItems.length === 0) {
    return null;
  }

  return <CommunityParticipationClient items={newestItems} showViewAll={true} />;
}
