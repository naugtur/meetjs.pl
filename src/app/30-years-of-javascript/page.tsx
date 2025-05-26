import JavaScriptTimeline from '@/components/JavaScriptTimeline';
import Link from 'next/link';

export default function JavaScript30Years() {
	return (
		<main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
			<section className="bg-gradient-to-r from-yellow-400 to-yellow-500 py-20">
				<div className="container mx-auto px-4 text-center">
					<h1 className="mb-6 text-5xl font-bold text-gray-900 md:text-7xl">
						30 Years of JavaScript
					</h1>
					<p className="mx-auto mb-8 max-w-3xl text-xl text-gray-900/90 md:text-2xl">
						Celebrating three decades of the language that powers the web
					</p>
					<div className="flex flex-wrap justify-center gap-4">
						<Link
							href="#timeline"
							className="rounded-full bg-gray-900 px-8 py-3 font-medium text-white transition-colors hover:bg-gray-800"
						>
							Explore the Timeline
						</Link>
						<a
							href="https://deno.com/blog/history-of-javascript"
							target="_blank"
							rel="noopener noreferrer"
							className="rounded-full bg-white/20 px-8 py-3 font-medium text-gray-900 transition-colors hover:bg-white/30"
						>
							Read the Full Story
						</a>
					</div>
				</div>
			</section>

			<section id="timeline" className="bg-white py-20">
				<div className="container mx-auto px-4">
					<JavaScriptTimeline />
				</div>
			</section>

			<section className="bg-gray-50 py-20">
				<div className="container mx-auto px-4 text-center">
					<h2 className="mb-6 text-3xl font-bold text-gray-900 md:text-4xl">
						Join the Celebration
					</h2>
					<p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600">
						Be part of the JavaScript community and help shape the next 30 years
						of web development
					</p>
					<div className="flex flex-wrap justify-center gap-4">
						<a
							href="https://discord.gg/8r9XKTeNW8"
							target="_blank"
							rel="noopener noreferrer"
							className="rounded-full bg-indigo-600 px-8 py-3 font-medium text-white transition-colors hover:bg-indigo-700"
						>
							Join Our Discord
						</a>
						<a
							href="https://x.com/meetjs"
							target="_blank"
							rel="noopener noreferrer"
							className="rounded-full bg-blue-500 px-8 py-3 font-medium text-white transition-colors hover:bg-blue-600"
						>
							Share on Twitter
						</a>
					</div>
				</div>
			</section>
		</main>
	);
}
