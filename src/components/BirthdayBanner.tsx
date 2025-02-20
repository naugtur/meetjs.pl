'use client';

import Link from 'next/link';

export const BirthdayBanner = () => {
	return (
		<div className="to-purple-500 relative bg-gradient-to-r from-pink-500 via-red-500">
			<div className="container mx-auto px-4 py-3 text-center">
				<Link
					href="/14-birthday"
					className="inline-flex items-center gap-2 font-medium text-white transition-opacity hover:opacity-90"
				>
					🎉 It&apos;s our 14th Birthday! Join the celebration on
					Valentine&apos;s Day! 💝
					<span className="underline">Learn more</span>
				</Link>
			</div>
		</div>
	);
};
