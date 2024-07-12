import { AboutSection } from '@/components/about';
import { Stats } from '@/components/stats';

import { FeaturedEvents } from '@/components/FeaturedEvents';
import { HeroSection } from '@/components/HeroSection';

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
			</main>
		</>
	);
};

export default Home;
