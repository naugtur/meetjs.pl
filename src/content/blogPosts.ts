export interface BlogPost {
	id: string;
	title: string;
	excerpt: string;
	date: string;
	author: string;
	authorImage: string;
	tags: string[];
	image: string;
	readTime: string;
	content: string;
	featured?: boolean;
}

export const BLOG_POSTS: BlogPost[] = [
	{
		id: 'javascript-performance-optimization-techniques',
		title: 'JavaScript Performance Optimization Techniques for 2025',
		excerpt:
			'Learn the latest techniques to optimize your JavaScript applications for maximum performance.',
		date: '2025-05-15',
		author: 'Kamil Dzieniszewski',
		authorImage: '/city/warszawa/organizers/kamil.jpeg',
		tags: ['javascript', 'performance', 'optimization', 'web-development'],
		image: '/conference.jpg',
		readTime: '6 min read',
		featured: true,
		content: `
      <p>As web applications become increasingly complex, optimizing JavaScript performance has never been more critical. In this article, we'll explore the most effective techniques for optimizing JavaScript performance in 2025.</p>

      <h2>1. Use Modern JavaScript Features</h2>
      <p>Modern JavaScript features can significantly improve performance. Take advantage of:</p>
      <ul>
        <li><strong>Optional Chaining</strong> - Simplifies null checks and improves readability</li>
        <li><strong>Nullish Coalescing</strong> - Provides better default values</li>
        <li><strong>Array Methods</strong> - Methods like map, filter, and reduce are highly optimized</li>
      </ul>

      <pre><code>// Instead of:
if (user && user.profile && user.profile.preferences) {
  // do something
}

// Use:
if (user?.profile?.preferences) {
  // do something
}</code></pre>

      <h2>2. Implement Code Splitting</h2>
      <p>Code splitting is essential for large applications. It allows you to:</p>
      <ul>
        <li>Load only the code needed for the current view</li>
        <li>Reduce initial load time</li>
        <li>Improve time-to-interactive metrics</li>
      </ul>

      <pre><code>// Using dynamic imports in React
const LazyComponent = React.lazy(() => import('./LazyComponent'));

function MyComponent() {
  return (
    <React.Suspense fallback={<Loading />}>
      <LazyComponent />
    </React.Suspense>
  );
}</code></pre>

      <h2>3. Optimize DOM Manipulation</h2>
      <p>DOM operations are expensive. Minimize them by:</p>
      <ul>
        <li>Batching DOM updates</li>
        <li>Using document fragments</li>
        <li>Implementing virtualization for long lists</li>
      </ul>

      <pre><code>// Instead of:
for (let i = 0; i < 1000; i++) {
  container.appendChild(document.createElement('div'));
}

// Use:
const fragment = document.createDocumentFragment();
for (let i = 0; i < 1000; i++) {
  fragment.appendChild(document.createElement('div'));
}
container.appendChild(fragment);</code></pre>

      <h2>4. Leverage Web Workers</h2>
      <p>Move CPU-intensive tasks off the main thread using Web Workers:</p>

      <pre><code>// main.js
const worker = new Worker('worker.js');
worker.postMessage({ data: complexData });
worker.onmessage = function(e) {
  console.log('Result:', e.data.result);
};

// worker.js
self.onmessage = function(e) {
  const result = performComplexCalculation(e.data.data);
  self.postMessage({ result });
};</code></pre>

      <h2>5. Implement Proper Caching Strategies</h2>
      <p>Use caching to avoid redundant operations:</p>
      <ul>
        <li>Memoize expensive function calls</li>
        <li>Cache API responses</li>
        <li>Implement service workers for offline support</li>
      </ul>

      <pre><code>// Simple memoization
function memoize(fn) {
  const cache = new Map();
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}

const expensiveCalculation = memoize((a, b) => {
  // Complex calculation here
  return a * b;
});</code></pre>

      <h2>Conclusion</h2>
      <p>Implementing these optimization techniques will significantly improve your JavaScript application's performance. Remember that optimization should be data-driven—always measure performance before and after making changes to ensure your optimizations are effective.</p>

      <p>Join us at the next meet.js event where we'll be diving deeper into these techniques with practical examples!</p>
    `,
	},
	{
		id: 'getting-started-with-meetjs',
		title: 'Getting Started with meet.js: A Guide for New Attendees',
		excerpt:
			'New to meet.js? This guide will help you make the most of your first meetup experience.',
		date: '2025-01-15',
		author: 'Kamil Dzieniszewski',
		authorImage: '/city/warszawa/organizers/kamil.jpeg',
		tags: ['community', 'beginners', 'meetups'],
		image: '/conference.jpg',
		readTime: '5 min read',
		featured: true,
		content: `
      <p>Welcome to meet.js! If you're reading this, you're probably considering attending your first JavaScript meetup in Poland. That's great news! The meet.js community has been bringing together JavaScript developers since 2011, and we're excited to have you join us.</p>

      <h2>What is meet.js?</h2>
      <p>meet.js is Poland's largest JavaScript community, organizing regular meetups in cities across the country. Our events are 100% non-commercial and free to attend, focusing on knowledge sharing and community building.</p>

      <h2>Before the Meetup</h2>
      <p>Here are some tips to prepare for your first meet.js event:</p>
      <ul>
        <li><strong>Register early</strong> - Popular meetups fill up quickly!</li>
        <li><strong>Join our Discord</strong> - Connect with the community before the event</li>
        <li><strong>Check the agenda</strong> - Come prepared with questions for the speakers</li>
        <li><strong>Bring business cards</strong> - Great for networking opportunities</li>
      </ul>

      <h2>During the Meetup</h2>
      <p>Make the most of your experience:</p>
      <ul>
        <li><strong>Arrive early</strong> - Use the time to network and find a good seat</li>
        <li><strong>Participate actively</strong> - Ask questions during Q&A sessions</li>
        <li><strong>Take notes</strong> - You'll hear about many new tools and concepts</li>
        <li><strong>Network</strong> - The breaks between talks are perfect for meeting fellow developers</li>
      </ul>

      <h2>After the Meetup</h2>
      <p>The value of meet.js extends beyond the event itself:</p>
      <ul>
        <li><strong>Follow up</strong> - Connect with people you met on LinkedIn or GitHub</li>
        <li><strong>Review your notes</strong> - Research topics that interested you</li>
        <li><strong>Provide feedback</strong> - Organizers appreciate hearing your thoughts</li>
        <li><strong>Consider speaking</strong> - Have knowledge to share? Propose a talk for a future meetup!</li>
      </ul>

      <h2>Conclusion</h2>
      <p>meet.js is more than just a series of technical talks—it's a community of passionate JavaScript developers eager to learn and share. Your first meetup is just the beginning of what we hope will be a rewarding journey with the Polish JavaScript community.</p>

      <p>We look forward to seeing you at the next meet.js event!</p>
    `,
	},
	{
		id: 'typescript-best-practices-2025',
		title: 'TypeScript Best Practices for 2025',
		excerpt:
			'Discover the latest TypeScript patterns and practices that will make your code more maintainable.',
		date: '2025-02-20',
		author: 'Zbyszek Tenerowicz',
		authorImage: '/city/warszawa/organizers/zbyszek.jpeg',
		tags: ['typescript', 'best-practices', 'development'],
		image: '/conference.jpg',
		readTime: '8 min read',
		featured: true,
		content: `
      <p>TypeScript continues to evolve, and as we move into 2025, several best practices have emerged that can significantly improve your code quality and developer experience. This article covers the most important patterns and practices you should adopt in your TypeScript projects.</p>

      <h2>1. Use Strict Type Checking</h2>
      <p>Always enable strict type checking in your tsconfig.json:</p>
      <pre><code>{
  "compilerOptions": {
    "strict": true,
    // Other options...
  }
}</code></pre>
      <p>This enables a suite of strict type checking options that catch more potential errors at compile time.</p>

      <h2>2. Leverage Type Inference</h2>
      <p>TypeScript's type inference is powerful. Don't add type annotations when they're unnecessary:</p>
      <pre><code>// Good - TypeScript infers the type
const numbers = [1, 2, 3];

// Unnecessary
const numbers: number[] = [1, 2, 3];</code></pre>

      <h2>3. Use Discriminated Unions</h2>
      <p>For complex types that can take different forms, use discriminated unions:</p>
      <pre><code>type Success = {
  status: 'success';
  data: User[];
};

type Error = {
  status: 'error';
  message: string;
};

type Response = Success | Error;

function handleResponse(response: Response) {
  if (response.status === 'success') {
    // TypeScript knows response is Success type here
    return response.data;
  } else {
    // TypeScript knows response is Error type here
    console.error(response.message);
  }
}</code></pre>

      <h2>4. Prefer Interfaces for Public APIs</h2>
      <p>Use interfaces for public APIs and type aliases for complex types or unions:</p>
      <pre><code>// Public API - use interface
interface User {
  id: number;
  name: string;
  email: string;
}

// Complex type - use type alias
type UserState = 'active' | 'inactive' | 'banned';</code></pre>

      <h2>5. Use Readonly for Immutability</h2>
      <p>Enforce immutability with readonly properties and arrays:</p>
      <pre><code>interface Config {
  readonly apiKey: string;
  readonly endpoints: readonly string[];
}</code></pre>

      <p>These practices will help you write more maintainable TypeScript code in 2025 and beyond.</p>
    `,
	},
	{
		id: 'react-19-features',
		title: "What's New in React 19: Features You Should Know",
		excerpt:
			'React 19 brings exciting new features. Learn how to leverage them in your projects.',
		date: '2025-03-10',
		author: 'Michał Michalczuk',
		authorImage: '/city/gdansk/organizers/michal.jpeg',
		tags: ['react', 'javascript', 'frontend'],
		image: '/conference.jpg',
		readTime: '7 min read',
		content: `
      <p>React 19 has arrived with several game-changing features that will transform how we build React applications. Let's explore the most significant additions and how you can use them in your projects.</p>

      <h2>1. Enhanced Server Components</h2>
      <p>React 19 takes Server Components to the next level with improved data fetching capabilities and better integration with streaming SSR:</p>
      <pre><code>// Server Component with built-in data fetching
async function ProductPage({ id }) {
  const product = await fetchProduct(id);

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <ClientComponent initialData={product.clientData} />
    </div>
  );
}</code></pre>

      <h2>2. Improved Suspense</h2>
      <p>Suspense now works seamlessly with more patterns and has better error handling:</p>
      <pre><code>function App() {
  return (
    <Suspense
      fallback={<Loading />}
      errorBoundary={<ErrorDisplay />}
    >
      <DataComponent />
    </Suspense>
  );
}</code></pre>

      <h2>3. New Hooks</h2>
      <p>React 19 introduces several new hooks that simplify common patterns:</p>
      <pre><code>// useFormState for form handling
function LoginForm() {
  const [formState, formAction] = useFormState(loginAction, {
    status: 'idle',
    error: null
  });

  return (
    <form action={formAction}>
      {/* Form fields */}
      {formState.status === 'error' && (
        <p>{formState.error}</p>
      )}
    </form>
  );
}</code></pre>

      <h2>4. Asset Loading Optimization</h2>
      <p>React 19 includes built-in asset loading optimization:</p>
      <pre><code>// Automatic image optimization
function Gallery() {
  return (
    <div>
      <img
        src="/large-image.jpg"
        loading="lazy"
        sizes="(max-width: 768px) 100vw, 50vw"
        // React 19 automatically optimizes this
      />
    </div>
  );
}</code></pre>

      <h2>5. Improved Developer Experience</h2>
      <p>The developer experience has been significantly enhanced with better error messages, debugging tools, and performance insights built into React DevTools.</p>

      <p>These features represent just a portion of what React 19 offers. Start experimenting with these capabilities to build faster, more maintainable React applications.</p>
    `,
	},
	{
		id: 'meetjs-summit-2025-recap',
		title: 'meet.js Summit 2025: Event Recap and Highlights',
		excerpt:
			"Missed the meet.js Summit? Here's a comprehensive recap of the talks, workshops, and networking opportunities.",
		date: '2025-04-05',
		author: 'Wojtek Jeremi Połowniak',
		authorImage: '/city/warszawa/organizers/wojciech.jpeg',
		tags: ['events', 'summit', 'conference'],
		image: '/conference.jpg',
		readTime: '10 min read',
		content: `
      <p>The meet.js Summit 2025 has concluded, and it was our biggest and most successful event yet! Over 800 JavaScript enthusiasts gathered in Warsaw for two days of inspiring talks, hands-on workshops, and valuable networking. Here's a recap of the highlights for those who couldn't attend.</p>

      <h2>Keynote: The Future of JavaScript</h2>
      <p>The summit kicked off with a keynote from Sarah Drasner, who shared her vision for the future of JavaScript and web development. She discussed the evolving landscape of web technologies and how JavaScript continues to expand beyond the browser.</p>

      <h2>Popular Talks</h2>
      <p>Some of the most well-received talks included:</p>
      <ul>
        <li><strong>"Building AI-Powered JavaScript Applications"</strong> by Tomasz Łakomy</li>
        <li><strong>"Performance Optimization in the Age of Core Web Vitals"</strong> by Bartosz Szczeciński</li>
        <li><strong>"The State of React in 2025"</strong> by Michał Miszczyszyn</li>
        <li><strong>"TypeScript: Beyond the Basics"</strong> by Krzysztof Kula</li>
        <li><strong>"Web Components: The Renaissance"</strong> by Natalia Kiselev</li>
      </ul>

      <h2>Workshops</h2>
      <p>The hands-on workshops were a huge success, with participants gaining practical skills in:</p>
      <ul>
        <li>Building full-stack applications with Next.js</li>
        <li>Advanced TypeScript patterns</li>
        <li>Testing strategies for modern JavaScript applications</li>
        <li>WebAssembly and JavaScript integration</li>
      </ul>

      <h2>Community Showcase</h2>
      <p>The community showcase featured impressive projects from the Polish JavaScript community, including:</p>
      <ul>
        <li>An open-source design system built with React</li>
        <li>A JavaScript-powered IoT platform for smart homes</li>
        <li>An accessibility testing tool for web applications</li>
      </ul>

      <h2>Networking and Social Events</h2>
      <p>The evening social events provided excellent opportunities for attendees to connect with speakers and fellow developers. The JavaScript quiz night was particularly popular, with teams competing for prizes and bragging rights.</p>

      <h2>Looking Forward</h2>
      <p>Based on the overwhelmingly positive feedback, we're already planning the meet.js Summit 2026. Mark your calendars for next April, and stay tuned for early bird ticket announcements!</p>

      <p>All talk recordings will be available on our YouTube channel in the coming weeks. Follow us on social media for updates.</p>

      <p>Thank you to all attendees, speakers, sponsors, and volunteers who made the meet.js Summit 2025 an unforgettable event!</p>
    `,
	},
];

// Helper function to get all unique tags from blog posts
export const getAllTags = (): string[] => {
	return Array.from(new Set(BLOG_POSTS.flatMap((post) => post.tags))).sort();
};

// Helper function to get featured posts
export const getFeaturedPosts = (): BlogPost[] => {
	return BLOG_POSTS.filter((post) => post.featured);
};

// Helper function to get related posts
export const getRelatedPosts = (
	currentPostId: string,
	limit: number = 2,
): BlogPost[] => {
	const currentPost = BLOG_POSTS.find((post) => post.id === currentPostId);

	if (!currentPost) return [];

	// Find posts with matching tags, excluding the current post
	return BLOG_POSTS.filter((post) => post.id !== currentPostId)
		.sort((a, b) => {
			// Count matching tags
			const aMatchingTags = a.tags.filter((tag) =>
				currentPost.tags.includes(tag),
			).length;
			const bMatchingTags = b.tags.filter((tag) =>
				currentPost.tags.includes(tag),
			).length;

			// Sort by number of matching tags (descending)
			return bMatchingTags - aMatchingTags;
		})
		.slice(0, limit);
};

// Helper function to format date
export const formatBlogDate = (dateString: string): string => {
	const date = new Date(dateString);
	return date.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});
};
