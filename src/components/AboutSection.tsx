'use client';

import Image from 'next/image';
import dynamic from 'next/dynamic';

const MDXContent = dynamic(() => import('@/content/about.mdx'));

export const AboutSection = () => {
	return (
		<section
			className="mx-auto flex w-full p-12 max-w-7xl snap-y scroll-mt-16 flex-col items-center justify-between px-2 md:flex-row lg:px-8"
			id="about"
		>
			<div className="w-full md:w-1/2">
				<Image
					src="/conference.jpg"
					alt=""
					width={2000}
					height={1333}
					priority={false}
				/>
			</div>
			<div className="w-full md:w-1/2 p-4">
				{/* <h2 className="text-center text-3xl font-bold">About meet.js</h2> */}
				<div className="flex flex-col gap-4 p-4">
					<MDXContent />
				</div>
			</div>
		</section>
	);
};
