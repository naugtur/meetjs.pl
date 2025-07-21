import Image from 'next/image';
import { Button } from '@/components/ui/button'; // Use @ alias for consistency
import type { Metadata } from 'next';

// Add page-specific metadata
export const metadata: Metadata = {
  title: "JavaScript Fun Facts &amp; Quirks | meet.js",
  description: "Explore the fun side of JavaScript – its unofficial logo, the Vanilla JS joke, the Deno vs. Oracle dispute, and why it's the magic behind interactive websites.",
};

export default function JavascriptPage() {
	return (
		<div className="container mx-auto max-w-3xl py-16">
			<h1 className="mb-8 text-center text-4xl font-bold text-yellow-500">
				JavaScript: Not Just Java&apos;s Weird Cousin!
			</h1>

			<div className="mb-8 space-y-4">
				<p>
					Ah, JavaScript! The magical pixie dust that makes websites wiggle,
					giggle, and occasionally throw a tantrum (we call those &apos;bugs&apos;, but
					&apos;unexpected features&apos; sounds nicer, right?).
				</p>
			</div>

			{/* JS Logo Section */}
			<div className="mb-8 space-y-4">
				<h2 className="mb-4 text-2xl font-semibold text-yellow-600">
					What&apos;s with the Yellow Square?
				</h2>
				<p>
					You&apos;ve probably seen it around: a bright yellow square with bold,
					black &quot;JS&quot; letters. Is that the official logo? Nope! JavaScript
					technically doesn&apos;t have an official logo mandated by the standards
					body (ECMA International).
				</p>
				{/* Add the actual JS logo image */}
				<div className="my-6 text-center">
					<Image
						src="/javascript/javascript-logo.png"
						alt="Unofficial JavaScript Logo"
						width={150}
						height={150}
						className="mx-auto"
					/>
				</div>
				<p>
					However, this yellow square has become the{' '}
					<span className="italic">de facto</span>, community-adopted symbol for
					JavaScript. It&apos;s simple, recognizable, and pops up everywhere –
					tutorials, stickers, conference banners. So, while not &quot;official&quot;,
					it&apos;s the logo most developers associate with the language.
				</p>
			</div>

			{/* Wrap image placeholder in a div with margin */}

			<div className="mb-8 space-y-4">
				<h2 className="text-blue-600 mb-4 text-2xl font-semibold">
					What is it, really?
				</h2>
				<p>
					Imagine your website is a house. HTML is the structure – the walls,
					the roof. CSS is the interior design – the paint colors, the fancy
					curtains. JavaScript? It&apos;s the electricity, the plumbing, the robot
					butler that brings you snacks! It makes things{' '}
					<span className="italic">happen</span>.
				</p>

				<div className="mb-12 text-center">
					{/* Add the confused coder image */}
					<Image
						src="/javascript/confused-coder.png"
						alt="Funny image of a confused coder staring at screen"
						width={500}
						height={300}
						className="mx-auto rounded-lg shadow-md"
					/>
				</div>
				<p>
					It started life wanting to be a simple scripting language for
					browsers, but like a Pokémon, it evolved! Now it runs everywhere:
					servers, phones, robots, maybe even your smart toaster (if it&apos;s
					feeling ambitious).
				</p>
			</div>

			{/* Add section about Vanilla JS */}
			<div className="mb-8 space-y-4">
				<h2 className="mb-4 text-2xl font-semibold text-teal-600">
					Ever Heard of Vanilla JS?
				</h2>
				<p>
					You might hear developers talk about the &quot;Vanilla JS framework&quot;.
					Sounds fancy, right? Maybe a super-fast, cutting-edge library?
				</p>
				<p>
					Plot twist!{' '}
					<span className="font-bold">
						Vanilla JS is just plain, regular, standard JavaScript.
					</span>{' '}
					That&apos;s it! No frameworks, no libraries, just the raw language provided
					by your browser.
				</p>
				<p>
					It&apos;s a running joke in the community. Why &quot;vanilla&quot;? Like vanilla ice
					cream, it&apos;s the basic, unadorned original. Sometimes, you don&apos;t need
					fancy sprinkles (frameworks) – the plain version works perfectly fine,
					is super lightweight, and has zero dependencies!
				</p>
				<div className="mt-4 flex justify-center">
					<Button asChild>
						<a href="/vanilla.js" download>
							Download Vanilla.js framework here!
						</a>
					</Button>
				</div>
				<p>
					So next time someone boasts about their super-performant Vanilla JS
					app, just nod knowingly and appreciate the joke (and maybe their clean
					code!).
				</p>
			</div>

			<div className="mb-12">
				<Image 
					src="/javascript/house-analogy.png" 
					alt="Diagram illustrating HTML as structure, CSS as design, and JS as functionality of a house"
					width={600} 
					height={250} 
					className="mx-auto rounded-lg shadow-md"
				/>
			</div>

			<div className="mb-8 space-y-4">
				<h2 className="text-green-600 mb-4 text-2xl font-semibold">
					Why the weird name?
				</h2>
				<p>
					Good question! Back in the day (the internet equivalent of the
					Jurassic period), Java was the cool kid on the block. So, the creators
					of JavaScript thought, &quot;Hey, let&apos;s ride those coattails!&quot; It&apos;s like
					naming your pet hamster &quot;Dwayne &apos;The Rock&apos; Hamsterson&quot; – mostly for
					marketing. They aren&apos;t closely related, despite the name!
				</p>
			</div>

			{/* New Section: Deno vs Oracle */}
			<div className="mb-8 space-y-4">
				<h2 className="mb-4 text-2xl font-semibold text-orange-600">
					Deno vs. Oracle: The Battle for &quot;JavaScript&quot;
				</h2>
				<p>
					You might be surprised to hear that Oracle (yes,{' '}
					<span className="italic">that</span> Oracle) technically owns the
					trademark for the word &quot;JavaScript&quot;! Even though they haven&apos;t really
					done anything with JavaScript itself in ages.
				</p>
				<p>
					Recently, the folks behind Deno (another JavaScript runtime, like
					Node.js) decided to challenge this. Here&apos;s the lowdown:
				</p>
				<ul className="list-disc space-y-2 pl-6">
					<li>
						Deno asked for the trademark to be cancelled, saying &quot;JavaScript&quot; is
						a generic term now and Oracle isn&apos;t using it properly in business.
					</li>
					<li>
						Oracle&apos;s response? They apparently sent in a screenshot of Node.js
						(which they definitely don&apos;t own) as proof they&apos;re using the name.
						🤔
					</li>
					<li>
						Things are heating up! If Deno&apos;s claim of fraud moves forward,
						Oracle might have some explaining to do about that screenshot.
					</li>
				</ul>
				<p>
					Why care? This could actually affect how freely everyone can use the
					word &quot;JavaScript&quot; in things like conference names, products, or
					developer tools. Deno is pushing to #FreeJavaScript, and many
					developers are watching to see what happens.
				</p>
				<p>
					You can read more about the details{' '}
					<a
						href="https://deno.com/blog/deno-v-oracle3?utm_source=substack&utm_medium=email"
						target="_blank"
						rel="noopener noreferrer"
						className="text-blue-600 hover:underline"
					>
						here on Deno&apos;s blog
					</a>
					.
				</p>
			</div>

			<div className="mb-8">
				<h2 className="text-purple-600 mb-4 text-2xl font-semibold">
					Things JavaScript Lets You Do:
				</h2>
				<ul className="list-disc space-y-2 pl-6">
					<li>
						Make buttons actually <span className="font-bold">do</span>{' '}
						something when clicked (Mind-blowing, I know!).
					</li>
					<li>Show pop-up messages (Use this power wisely, young Padawan).</li>
					<li>Change content on a page without reloading (Like magic!).</li>
					<li>Validate forms so people don&apos;t enter gibberish (Mostly...).</li>
					<li>
						Create cool animations and games (Prepare for procrastination!).
					</li>
					<li>
						Talk to servers to fetch new data (So your site isn	&apos;t stuck in the
						past).
					</li>
				</ul>
			</div>

			<div className="mb-8 space-y-4">
				<h2 className="mb-4 text-2xl font-semibold text-red-600">
					The Funny Parts (aka Debugging)
				</h2>
				<p>
					Ah, debugging JavaScript. It&apos;s a rite of passage. It&apos;s where you stare
					intensely at your code, convinced it&apos;s perfect, while the browser
					insists
					<code>undefined is not a function</code>. It&apos;s like arguing with a
					toddler who just keeps saying &quot;No!&quot; for no reason. But the feeling
					when you finally squash that bug? Pure. Bliss. (Or relief. Mostly
					relief).
				</p>
				<p>
					Remember: The semicolon <code>;</code> is sometimes optional,
					sometimes vital. It likes to keep things interesting. And don&apos;t even
					get me started on
					<code>this</code> keyword... it&apos;s... an adventure.
				</p>
			</div>

			{/* New Section: Resources */}
			<div className="mb-8 space-y-4">
				<h2 className="mb-4 text-2xl font-semibold text-indigo-600">
					Want to Learn More?
				</h2>
				<p>
					Dive deeper into the world of JavaScript with these fantastic resources:
				</p>
				<ul className="list-disc space-y-2 pl-6">
					<li>
						<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
							MDN Web Docs (JavaScript)
						</a> - The ultimate reference guide.
					</li>
					<li>
						<a href="https://javascript.info" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
							JavaScript.info
						</a> - A modern tutorial from basics to advanced topics.
					</li>
					<li>
						<a href="https://tc39.es/ecma262/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
							ECMAScript Specification
						</a> - The official language standard (very technical!).
					</li>
					<li>
						<a href="https://stackoverflow.com/questions/tagged/javascript" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
							Stack Overflow (JavaScript Tag)
						</a> - Find answers to specific coding problems.
					</li>
				</ul>
			</div>

			<div className="mb-8">
				<p className="pt-4 text-center text-xl font-bold">
					So, welcome to the wild, wonderful world of JavaScript! It&apos;s quirky,
					powerful, sometimes frustrating, but ultimately, pretty awesome.
				</p>
			</div>
		</div>
	);
}
