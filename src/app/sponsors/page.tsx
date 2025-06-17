import { HeroSection } from '@/components/HeroSection';
import { SponsorShowcase } from '@/components/SponsorShowcase';
import { SponsorBenefits } from '@/components/SponsorBenefits';
import { SponsorTestimonials } from '@/components/SponsorTestimonials';
import { SponsorCTA } from '@/components/SponsorCTA';
import { SponsorStats } from '@/components/SponsorStats';

export default function SponsorsPage() {
  return (
    <main>
      <HeroSection
        title="Sponsor meet.js"
        subtitle="Reach, engage, and strengthen your brand with the largest JavaScript community in Poland"
        className="bg-gradient-to-r from-purple to-purple-700"
        showSocial={false}
        showAwards={false}
      />
      
      <SponsorStats />
      <SponsorShowcase />
      <SponsorBenefits />
      <SponsorTestimonials />
      <SponsorCTA />
    </main>
  );
}
