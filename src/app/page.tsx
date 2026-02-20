import { AboutSection } from '@/components/AboutSection';
import { Stats } from '@/components/Stats';
import { JavaScript30YearsPromo } from '@/components/JavaScript30YearsPromo';

import { JoinUs } from '@/components/JoinUs';
import { FeaturedEvents } from '@/components/FeaturedEvents';
import { HeroCarousel } from '@/components/HeroCarousel';
import { PartnersSection } from '@/components/PartnersSection';
import { CommunityParticipation } from '@/components/CommunityParticipationServer';
import { YouTubeSubscribeBanner } from '@/components/YouTubeSubscribeBanner';
import { FloatingSummitCTA } from '@/components/FloatingSummitCTA';

export const dynamic = 'force-dynamic';

const Home = () => {
  return (
    <main className="w-full overflow-hidden">
      <HeroCarousel />
      <div className="flex min-h-screen w-full flex-col items-center">
        <FeaturedEvents />
        <JavaScript30YearsPromo />
        <JoinUs />
        <YouTubeSubscribeBanner />
        <CommunityParticipation />
        <div className="w-full">
          <AboutSection />
          <Stats />
        </div>
        <PartnersSection />
      </div>
      <FloatingSummitCTA />
    </main>
  );
};

export default Home;
