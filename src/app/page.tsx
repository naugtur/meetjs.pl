import { AboutSection } from '@/components/AboutSection';
import { Stats } from '@/components/Stats';

import { JoinUs } from '@/components/JoinUs';
import { FeaturedEvents } from '@/components/FeaturedEvents';
import { HeroSection } from '@/components/HeroSection';
import { PartnersSection } from '@/components/PartnersSection';
import { PromoBanners } from '@/components/PromoBanners';
// import { discounts } from '@/content/discounts';
import { softwareDiscounts } from '@/content/software-discounts';

export const dynamic = 'force-dynamic';

const Home = () => {
	return (
		<>
			{/* <PromoBanners promos={discounts} /> */}
			<PromoBanners promos={softwareDiscounts} />
			<HeroSection />
			<FeaturedEvents />
			<main className="flex min-h-screen flex-col items-center">
				<JoinUs />
				<div className="w-full">
					<AboutSection />
					<Stats />
				</div>
				<PartnersSection />
			</main>
		</>
	);
};

export default Home;
