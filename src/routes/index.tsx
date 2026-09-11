import { PageMeta } from '@/components/PageMeta';
import { AboutSection } from '@/components/AboutSection';
import { Stats } from '@/components/Stats';
import { JavaScript30YearsPromo } from '@/components/JavaScript30YearsPromo';

import { JoinUs } from '@/components/JoinUs';
import { FeaturedEvents } from '@/components/FeaturedEvents';
import { HeroSection } from '@/components/HeroSection';
import { PartnersSection } from '@/components/PartnersSection';
import { CommunityParticipation } from '@/components/CommunityParticipationServer';
import { YouTubeSubscribeBanner } from '@/components/YouTubeSubscribeBanner';
import { SpeakerFaces } from '@/components/SpeakerFaces';

const Home = () => {
  return (
    <main>
      <PageMeta
        title="meet.js - JavaScript Meetups in Poland"
        description="The largest JavaScript community in Poland. Regular meetups in 18 cities, annual summit, and a vibrant community of developers."
        path="/"
      />
      <HeroSection />
      <div class="flex min-h-screen flex-col items-center">
        <FeaturedEvents />
        <JavaScript30YearsPromo />
        <JoinUs />
        <YouTubeSubscribeBanner />
        <CommunityParticipation />
        <div class="w-full">
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
