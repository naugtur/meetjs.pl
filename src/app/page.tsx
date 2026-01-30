import { AboutSection } from '@/components/AboutSection';
import { Stats } from '@/components/Stats';
import { JavaScript30YearsPromo } from '@/components/JavaScript30YearsPromo';

import { JoinUs } from '@/components/JoinUs';
import { FeaturedEvents } from '@/components/FeaturedEvents';
import { HeroSection } from '@/components/HeroSection';
import { PartnersSection } from '@/components/PartnersSection';
import { CommunityParticipation } from '@/components/CommunityParticipationServer';
import { YouTubeSubscribeBanner } from '@/components/YouTubeSubscribeBanner';
import { Summit2026Banner } from '@/components/Summit2026Banner';
import { FloatingSummitCTA } from '@/components/FloatingSummitCTA';

export const dynamic = 'force-dynamic';

const Home = () => {
  return (
    <main>
      <HeroSection />
      <Summit2026Banner />
      <div className="flex min-h-screen flex-col items-center">
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
