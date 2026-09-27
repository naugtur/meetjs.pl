import { AboutSection } from '@/components/AboutSection';
import { Stats } from '@/components/Stats';
import { JavaScript30YearsPromo } from '@/components/JavaScript30YearsPromo';

import { JoinUs } from '@/components/JoinUs';
import { FeaturedEvents } from '@/components/FeaturedEvents';
import { HeroSection } from '@/components/HeroSection';
import { PromoTicker } from '@/components/PromoTicker';
import { eventsDiscounts } from '@/content/events-discounts';
import { softwareDiscounts } from '@/content/software-discounts';
import { learningDiscounts } from '@/content/learning-discounts';
import { PartnersSection } from '@/components/PartnersSection';
import { CommunityParticipation } from '@/components/CommunityParticipationServer';
import { YouTubeSubscribeBanner } from '@/components/YouTubeSubscribeBanner';
import { SpeakerFaces } from '@/components/SpeakerFaces';

export const dynamic = 'force-dynamic';

const Home = () => {
  return (
    <main>
      <HeroSection />
      <PromoTicker
        promos={[
          ...eventsDiscounts,
          ...softwareDiscounts,
          ...learningDiscounts,
        ]}
      />
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
        <SpeakerFaces />
        <PartnersSection />
      </div>
      {/*<FloatingSummitCTA />*/}
    </main>
  );
};

export default Home;
