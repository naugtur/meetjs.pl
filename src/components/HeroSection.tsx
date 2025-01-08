import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { RankingBanner } from '@/components/RankingBanner';

export const HeroSection = () => {
	return (
		<header className="relative grid h-96 bg-[url('/conference.jpg')] bg-cover text-center text-white md:h-[35rem]">
			<div className="col-start-1 row-start-1 h-full w-full bg-gray-800 bg-opacity-70"></div>

			<RankingBanner
				href="https://crossweb.pl/blog/ranking-najpopularniejsze-wydarzenia-podcasty-wideo-cykle-w-crossweb-w-2024/"
				text="🏆 #1 Tech Event Series in Poland (Crossweb 2024)"
			/>

			<div className="col-start-1 row-start-1 mx-auto my-auto">
				<p className="-rotate-2 bg-blue p-2 text-6xl font-bold">meet.js</p>
				<h1 className="p-4 text-xl font-medium">
					JavaScript meetups in Poland
				</h1>
				<Link
					href="/#joinus"
					className={buttonVariants({
						className: 'text-purple dark:bg-green dark:hover:bg-green/80',
						size: 'lg',
					})}
				>
					Join us
				</Link>
			</div>
		</header>
	);
};
