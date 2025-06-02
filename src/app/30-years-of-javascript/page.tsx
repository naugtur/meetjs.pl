import JavaScriptTimeline from '@/components/JavaScriptTimeline';
import Link from 'next/link';

const stats = [
	{
		number: '30',
		label: 'Years of Innovation',
		description: 'From simple scripts to full applications'
	},
	{
		number: '69%',
		label: 'Developer Usage',
		description: 'Most popular programming language worldwide'
	},
	{
		number: '1.8B',
		label: 'Websites',
		description: 'Powered by JavaScript globally'
	},
	{
		number: '∞',
		label: 'Possibilities',
		description: 'Frontend, backend, mobile, desktop, IoT'
	}
];

const funFacts = [
	{
		icon: '⚡',
		title: 'Created in 10 Days',
		description: 'Brendan Eich wrote the first version of JavaScript in just 10 days in May 1995.'
	},
	{
		icon: '🎭',
		title: 'Name Changes',
		description: 'Originally called Mocha, then LiveScript, and finally JavaScript for marketing reasons.'
	},
	{
		icon: '🚀',
		title: 'Not Just Web',
		description: 'JavaScript now runs on servers, mobile apps, desktop applications, and even spacecraft!'
	},
	{
		icon: '📈',
		title: 'Fastest Growing',
		description: 'JavaScript has the largest package ecosystem with over 2 million packages on npm.'
	}
];

export default function JavaScript30Years() {
	return (
		<main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
			{/* Hero Section */}
			<section className="relative bg-gradient-to-br from-yellow-400 via-yellow-500 to-amber-500 py-24 overflow-hidden">
				<div className="absolute inset-0 bg-black/5"></div>
				<div className="absolute top-0 left-0 w-full h-full">
					<div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse"></div>
					<div className="absolute top-32 right-20 w-16 h-16 bg-white/10 rounded-full animate-pulse delay-300"></div>
					<div className="absolute bottom-20 left-1/4 w-12 h-12 bg-white/10 rounded-full animate-pulse delay-700"></div>
					<div className="absolute bottom-32 right-1/3 w-24 h-24 bg-white/10 rounded-full animate-pulse delay-500"></div>
				</div>
				<div className="container mx-auto px-4 text-center relative z-10">
					<div className="mb-6">
						<span className="inline-block text-6xl mb-4 animate-bounce">🎉</span>
					</div>
					<h1 className="mb-6 text-5xl font-bold text-gray-900 md:text-7xl leading-tight">
						30 Years of
						<span className="block bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
							JavaScript
						</span>
					</h1>
					<p className="mx-auto mb-8 max-w-3xl text-xl text-gray-900/90 md:text-2xl leading-relaxed">
						From a 10-day prototype to the world&#39;s most popular programming language.
						<br />
						<span className="font-semibold">Celebrating three decades of innovation.</span>
					</p>
					<div className="flex flex-wrap justify-center gap-4 mb-8">
						<Link
							href="#timeline"
							className="group rounded-full bg-gray-900 px-8 py-4 font-medium text-white transition-all duration-300 hover:bg-gray-800 hover:scale-105 hover:shadow-lg"
						>
							<span className="flex items-center gap-2">
								Explore the Timeline
								<span className="transition-transform group-hover:translate-x-1">→</span>
							</span>
						</Link>
						<a
							href="https://deno.com/blog/history-of-javascript"
							target="_blank"
							rel="noopener noreferrer"
							className="rounded-full bg-white/20 backdrop-blur-sm px-8 py-4 font-medium text-gray-900 transition-all duration-300 hover:bg-white/30 hover:scale-105"
						>
							Read the Full Story
						</a>
					</div>
				</div>
			</section>

			{/* Statistics Section */}
			<section className="py-20 bg-white">
				<div className="container mx-auto px-4">
					<div className="text-center mb-16">
						<h2 className="text-3xl font-bold text-gray-900 md:text-4xl mb-4">
							JavaScript by the Numbers
						</h2>
						<p className="text-lg text-gray-600 max-w-2xl mx-auto">
							The incredible impact of JavaScript on the digital world
						</p>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
						{stats.map((stat, index) => (
							<div
								key={index}
								className="text-center p-6 rounded-2xl bg-gradient-to-br from-yellow-50 to-amber-50 border border-yellow-200 hover:shadow-lg transition-all duration-300 hover:scale-105"
							>
								<div className="text-4xl md:text-5xl font-bold text-yellow-600 mb-2">
									{stat.number}
								</div>
								<div className="text-lg font-semibold text-gray-900 mb-2">
									{stat.label}
								</div>
								<div className="text-sm text-gray-600">
									{stat.description}
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Timeline Section */}
			<section id="timeline" className="bg-gray-50 py-20">
				<div className="container mx-auto px-4">
					<JavaScriptTimeline />
				</div>
			</section>

			{/* Fun Facts Section */}
			<section className="py-20 bg-white">
				<div className="container mx-auto px-4">
					<div className="text-center mb-16">
						<h2 className="text-3xl font-bold text-gray-900 md:text-4xl mb-4">
							Did You Know?
						</h2>
						<p className="text-lg text-gray-600 max-w-2xl mx-auto">
							Fascinating facts about JavaScript&#39;s journey
						</p>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						{funFacts.map((fact, index) => (
							<div
								key={index}
								className="flex items-start gap-4 p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-200 hover:shadow-lg transition-all duration-300 hover:scale-105"
							>
								<div className="text-3xl flex-shrink-0 mt-1">
									{fact.icon}
								</div>
								<div>
									<h3 className="text-xl font-semibold text-gray-900 mb-2">
										{fact.title}
									</h3>
									<p className="text-gray-600 leading-relaxed">
										{fact.description}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Future Section */}
			<section className="py-20 bg-gradient-to-br from-yellow-50 to-amber-50">
				<div className="container mx-auto px-4 text-center">
					<div className="max-w-4xl mx-auto">
						<h2 className="text-3xl font-bold text-gray-900 md:text-4xl mb-6">
							The Next 30 Years
						</h2>
						<p className="text-lg text-gray-600 mb-8 leading-relaxed">
							As JavaScript continues to evolve, we&#39;re seeing exciting developments in 
							WebAssembly integration, AI-powered development tools, edge computing, 
							and new runtime environments. The language that started as a simple 
							scripting tool has become the foundation of modern digital experiences.
						</p>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
							<div className="p-6 bg-white rounded-xl shadow-sm">
								<div className="text-2xl mb-3">🤖</div>
								<h3 className="font-semibold text-gray-900 mb-2">AI Integration</h3>
								<p className="text-sm text-gray-600">JavaScript-powered AI applications and machine learning in the browser</p>
							</div>
							<div className="p-6 bg-white rounded-xl shadow-sm">
								<div className="text-2xl mb-3">🌐</div>
								<h3 className="font-semibold text-gray-900 mb-2">Edge Computing</h3>
								<p className="text-sm text-gray-600">JavaScript running closer to users with edge runtimes and serverless functions</p>
							</div>
							<div className="p-6 bg-white rounded-xl shadow-sm">
								<div className="text-2xl mb-3">🚀</div>
								<h3 className="font-semibold text-gray-900 mb-2">Performance</h3>
								<p className="text-sm text-gray-600">Continued improvements in V8, new JIT optimizations, and WebAssembly synergy</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Join the Celebration */}
			<section className="bg-gradient-to-r from-gray-900 to-gray-800 py-20">
				<div className="container mx-auto px-4 text-center">
					<h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">
						Join the Celebration
					</h2>
					<p className="mx-auto mb-8 max-w-2xl text-lg text-gray-300 leading-relaxed">
						Be part of the JavaScript community and help shape the next 30 years
						of web development. Connect with developers worldwide and share your JavaScript journey.
					</p>
					<div className="flex flex-wrap justify-center gap-4">
						<a
							href="https://discord.gg/8r9XKTeNW8"
							target="_blank"
							rel="noopener noreferrer"
							className="group rounded-full bg-indigo-600 px-8 py-4 font-medium text-white transition-all duration-300 hover:bg-indigo-700 hover:scale-105 hover:shadow-lg"
						>
							<span className="flex items-center gap-2">
								💬 Join Our Discord
								<span className="transition-transform group-hover:translate-x-1">→</span>
							</span>
						</a>
						<a
							href="https://x.com/meetjs"
							target="_blank"
							rel="noopener noreferrer"
							className="group rounded-full bg-blue-500 px-8 py-4 font-medium text-white transition-all duration-300 hover:bg-blue-600 hover:scale-105 hover:shadow-lg"
						>
							<span className="flex items-center gap-2">
								🐦 Share on Twitter
								<span className="transition-transform group-hover:translate-x-1">→</span>
							</span>
						</a>
						<Link
							href="/events"
							className="group rounded-full bg-yellow-500 px-8 py-4 font-medium text-gray-900 transition-all duration-300 hover:bg-yellow-400 hover:scale-105 hover:shadow-lg"
						>
							<span className="flex items-center gap-2">
								📅 Find Events
								<span className="transition-transform group-hover:translate-x-1">→</span>
							</span>
						</Link>
					</div>
				</div>
			</section>
		</main>
	);
}
