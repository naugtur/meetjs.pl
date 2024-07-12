import { AboutSection } from '@/components/AboutSection';
import { Stats } from '@/components/stats';

import { FeaturedEvents } from '@/components/FeaturedEvents';
import { HeroSection } from '@/components/HeroSection';
import { PartnersSection } from '@/components/PartnersSection';

const Home = () => {
	return (
		<>
			<HeroSection />
			<main className="flex min-h-screen flex-col items-center">
				<FeaturedEvents />
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
