'use client';

import Image from 'next/image';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';

export const AboutSection = () => {
	return (
		<section
			className="mx-auto flex w-full p-12 max-w-7xl snap-y scroll-mt-16 flex-col items-center justify-between px-2 md:flex-row lg:px-8"
			id="about"
		>
			<div className="w-full md:w-1/2">
				<Image
					src="/conference.jpg"
					alt="meet.js conference"
					width={2000}
					height={1333}
					priority={false}
					className="rounded-lg shadow-lg"
				/>
			</div>
			<div className="w-full md:w-1/2 p-8 md:p-12">
				<h2 className="text-3xl font-bold mb-6">About meet.js</h2>
				<div className="flex flex-col gap-4">
					<p>
						meet.js is Poland&apos;s largest and longest-running JavaScript community,
						bringing together developers and enthusiasts since 2011.
					</p>
					<ul className="list-disc pl-6 space-y-2 mb-6">
						<li>100% Non-Commercial & Free</li>
						<li>Regular meetups across Poland</li>
						<li>Semi-annual meet.js Summit conference</li>
					</ul>
					<div className="flex justify-center md:justify-start">
						<Link
							href="/about"
							className={buttonVariants({
								className:
									'w-fit bg-purple text-black hover:bg-purple/80 dark:bg-green dark:hover:bg-green/80 px-8 py-4 text-center',
							})}
						>
							Learn more about us
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
};
