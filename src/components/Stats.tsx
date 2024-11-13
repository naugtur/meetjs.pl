import NumberTicker from '@/components/magicui/number-ticker';
import { CITIES } from '@/content/cities';

export const Stats = () => {
	return (
		<div className="w-full bg-green py-12 md:py-16">
			<div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 sm:px-6 md:grid-cols-3 lg:px-8">
				<div className="text-center">
					<h3 className="text-3xl font-bold sm:text-4xl">
						<NumberTicker value={9} />
					</h3>
					<p className="mt-2 text-lg">summits</p>
				</div>
				<div className="text-center">
					<h3 className="text-3xl font-bold sm:text-4xl">
						<NumberTicker value={2011} />
					</h3>
					<p className="mt-2 text-lg">since</p>
				</div>
				<div className="text-center">
					<h3 className="text-3xl font-bold sm:text-4xl">
						<NumberTicker value={CITIES.length} />
					</h3>
					<p className="mt-2 text-lg">cities</p>
				</div>
			</div>
		</div>
	);
};
