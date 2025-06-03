import { AboutSection } from '@/components/AboutSection';
import { Stats } from '@/components/Stats';

import { JoinUs } from '@/components/JoinUs';
import { FeaturedEvents } from '@/components/FeaturedEvents';
import { FeaturedBlogPosts } from '@/components/FeaturedBlogPosts';
import { HeroSection } from '@/components/HeroSection';
import { PartnersSection } from '@/components/PartnersSection';
import { PromoBanners } from '@/components/PromoBanners';
import { promos } from '@/content/promos';

export const dynamic = 'force-dynamic';

const Home = () => {
	return (
		<>
			<PromoBanners promos={promos} />
			<HeroSection />
			<FeaturedEvents />
			<main className="flex min-h-screen flex-col items-center">
				<JoinUs />
				<div className="w-full">
					<AboutSection />
					<Stats />
				</div>
				<FeaturedBlogPosts />
				<PartnersSection />
			</main>
		</>
	);
};

export default Home;
