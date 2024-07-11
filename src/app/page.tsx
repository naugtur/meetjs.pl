import { AboutSection } from '@/components/about';
import { Stats } from '@/components/stats';

import { FeaturedEvents } from '@/components/FeaturedEvents';

const Home = () => {
	return (
		<main className="flex min-h-screen flex-col items-center justify-between">
			Hello world meet.js!
			<FeaturedEvents />
			<div className="w-full">
				<AboutSection />
				<Stats />
			</div>
		</main>
	);
};

export default Home;
