'use client';

import { useState } from 'react';

export default function Page() {
	const discountEndDate = new Date('2025-03-31');
	const currentDate = new Date();
	const daysRemaining = Math.ceil(
		(discountEndDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24),
	);

	const [copied, setCopied] = useState(false);

	// Function to copy discount code
	const copyDiscountCode = () => {
		navigator.clipboard.writeText('WDI25RP20');
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<div className="container mx-auto max-w-3xl py-16">
			<div className="mb-8 flex flex-col items-start justify-between md:flex-row md:items-center">
				<h1 className="mb-4 text-4xl font-bold md:mb-0">Warsaw IT Days 2025</h1>
				<a
					href="https://warszawskiedniinformatyki.pl/"
					target="_blank"
					rel="noopener noreferrer"
					className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-2 text-primary-foreground transition-all hover:bg-primary/90"
				>
					Register Now! 🚀
				</a>
			</div>

			<div className="mb-8 border-l-4 border-yellow-400 bg-yellow-50 p-4">
				<p className="font-semibold">Discount ends soon!</p>
				<p>
					Only {daysRemaining} days left to get 20% off with code:{' '}
					<span className="rounded bg-gray-100 px-2 py-1 font-mono">
						WDI25RP20
					</span>
				</p>
			</div>

			<div className="mb-8 space-y-4">
				<p>
					We helped put together the JavaScript track on the Warsaw IT Days on
					April 4th online and April 5th in Warsaw at the Faculty of Mathematics
					and Information Science, Warsaw University of Technology.
				</p>
				<p>
					With 25 tracks and 300 talks, including several selected by the
					meet.js crew, this is one of the largest IT events in Poland this
					year!
				</p>
				<p className="font-semibold">Hope to see you there!</p>
			</div>

			<div className="mb-8">
				<h2 className="mb-4 text-2xl font-semibold">Event Details</h2>
				<ul className="space-y-3">
					<li className="flex items-start">
						<span className="bg-blue-100 mr-3 inline-flex items-center justify-center rounded-full p-1">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="text-blue-600 h-5 w-5"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
								/>
							</svg>
						</span>
						<span>
							<strong>Dates:</strong> April 4th, 2025 (online) and April 5th,
							2025 (in-person)
						</span>
					</li>
					<li className="flex items-start">
						<span className="bg-blue-100 mr-3 inline-flex items-center justify-center rounded-full p-1">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="text-blue-600 h-5 w-5"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
								/>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
								/>
							</svg>
						</span>
						<span>
							<strong>Location:</strong> Faculty of Mathematics and Information
							Science, Warsaw University of Technology
						</span>
					</li>
					<li className="flex items-start">
						<span className="bg-blue-100 mr-3 inline-flex items-center justify-center rounded-full p-1">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="text-blue-600 h-5 w-5"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
								/>
							</svg>
						</span>
						<span>
							<strong>Tracks:</strong> 25 tracks with 300 talks
						</span>
					</li>
				</ul>
			</div>

			<div className="mb-8">
				<h2 className="mb-4 text-2xl font-semibold">Special Discount</h2>
				<div className="bg-blue-50 border-blue-200 rounded-lg border p-6">
					<p className="mb-4">
						Until March 31st, 2025, you can buy a Standard or Executive ticket
						with a 20% discount using a special code from the Program Council:
					</p>
					<div
						className="mb-4 cursor-pointer rounded-md border border-gray-200 bg-white p-3 text-center transition-colors hover:bg-gray-50"
						onClick={copyDiscountCode}
						title="Click to copy"
					>
						<code className="text-blue-600 text-lg font-bold">WDI25RP20</code>
						<div className="mt-1 text-xs text-gray-500">
							{copied ? 'Copied!' : 'Click to copy'}
						</div>
					</div>
					<p className="text-sm text-gray-600">
						This offer is valid only until the end of this month, so don&apos;t
						miss out!
					</p>
				</div>
			</div>

			<div className="mb-8">
				<h2 className="mb-4 text-2xl font-semibold">JavaScript Track</h2>
				<p className="mb-4">
					The meet.js crew has helped curate an exciting JavaScript track
					featuring talks on the latest frameworks, tools, and best practices.
					This is a great opportunity to learn from industry experts and connect
					with the JavaScript community.
				</p>
				<div className="mt-6 text-center">
					<a
						href="https://warszawskiedniinformatyki.pl/"
						target="_blank"
						rel="noopener noreferrer"
						className="mx-auto inline-flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-2 text-primary-foreground transition-all hover:bg-primary/90"
					>
						Join the JavaScript Track! 💻
					</a>
				</div>
			</div>

			<div className="mt-8 text-center">
				<p className="mt-2 text-sm text-gray-600">
					For more information and registration, visit the{' '}
					<a
						href="https://warszawskiedniinformatyki.pl/"
						target="_blank"
						rel="noopener noreferrer"
						className="text-primary hover:underline"
					>
						official website
					</a>
				</p>
			</div>
		</div>
	);
}
