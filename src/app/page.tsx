import { AboutSection } from '@/components/AboutSection';
import { Stats } from '@/components/Stats';

import { JoinUs } from '@/components/JoinUs';
import { FeaturedEvents } from '@/components/FeaturedEvents';
import { HeroSection } from '@/components/HeroSection';
import { PartnersSection } from '@/components/PartnersSection';
import { CommunityParticipation } from '@/components/CommunityParticipationServer';
import { YouTubeSubscribeBanner } from '@/components/YouTubeSubscribeBanner';
import SocialFeed from '@/components/SocialFeed';
import { fetchSocialPosts } from '@/lib/social';

export const dynamic = 'force-dynamic';

const Home = async () => {
  // Fetch social posts from all configured platforms
  // Limit to 6 posts total (show 3, expand to 6 with "Show More")
  const socialPosts = await fetchSocialPosts(6);

  return (
    <main>
      <HeroSection />
      <div className="flex min-h-screen flex-col items-center">
        <FeaturedEvents />
        <YouTubeSubscribeBanner />
        <SocialFeed posts={socialPosts} />
        <JoinUs />
        <CommunityParticipation />
        <div className="w-full">
          <AboutSection />
          <Stats />
        </div>
        <PartnersSection />
      </div>
    </main>
  );
};

export default Home;
