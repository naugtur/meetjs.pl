import NumberTicker from '@/components/magicui/number-ticker';

export const Stats = () => {
	return (
		<div className="flex w-full flex-col items-center justify-center gap-4 bg-green py-4">
			<div className="mx-auto flex w-full max-w-7xl flex-col justify-evenly px-2 text-center sm:px-6 md:flex-row lg:px-8">
				<div className="w-full p-8 xl:w-1/4">
					<h3 className="text-2xl font-bold">
						<NumberTicker value={382} />+
					</h3>
					<p>meetups</p>
				</div>
				<div className="w-full p-8 xl:w-1/4">
					<h3 className="text-2xl font-bold">
						~<NumberTicker value={800} />
					</h3>
					<p>speakers</p>
				</div>
				<div className="w-full p-8 xl:w-1/4">
					<h3 className="text-2xl font-bold">
						<NumberTicker value={11} />
					</h3>
					<p>cities</p>
				</div>
				<div className="w-full p-8 xl:w-1/4">
					<h3 className="text-2xl font-bold">ileś</h3>
					<p>czegoś</p>
				</div>
			</div>
		</div>
	);
};
