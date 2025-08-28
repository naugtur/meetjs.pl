import { AboutSection } from '@/components/AboutSection';
import { Stats } from '@/components/Stats';

import { JoinUs } from '@/components/JoinUs';
import { FeaturedEvents } from '@/components/FeaturedEvents';
import { HeroSection } from '@/components/HeroSection';
import { PartnersSection } from '@/components/PartnersSection';
import { JobsSection } from '@/components/JobsSection';
// import { discounts } from '@/content/discounts';

export const dynamic = 'force-dynamic';

const Home = () => {
  return (
    <main>
      <HeroSection />
      <div className="flex min-h-screen flex-col items-center">
        <FeaturedEvents />
        <JoinUs />
        <JobsSection />
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
