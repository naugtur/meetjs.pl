import JavaScriptTimeline from '@/components/JavaScriptTimeline';
import { SkipNavigation } from '@/components/SkipNavigation';
import { AnimatedSection, AnimatedStats } from '@/components/ScrollAnimations';
import { lazy, Suspense } from 'react';
import Link from 'next/link';

// Lazy load components below the fold for better performance
const JavaScriptEvolution = lazy(() =>
  import('@/components/JavaScriptEvolution').then((module) => ({
    default: module.JavaScriptEvolution,
  })),
);
const JavaScriptPerformance = lazy(() =>
  import('@/components/JavaScriptPerformance').then((module) => ({
    default: module.JavaScriptPerformance,
  })),
);

const stats = [
  {
    number: '30',
    label: 'Years of Innovation',
    description: 'From simple scripts to full applications',
  },
  {
    number: '98%',
    label: 'Website Usage',
    description: 'Nearly all websites use JavaScript',
  },
  {
    number: '22M',
    label: 'Developers',
    description: 'Millions of developers worldwide',
  },
  {
    number: '∞',
    label: 'Possibilities',
    description: 'Frontend, backend, mobile, desktop, IoT',
  },
];

// Structured data for SEO - JavaScript timeline events
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: '30 Years of JavaScript Evolution',
  description:
    'A comprehensive timeline of JavaScript milestones from 1995 to 2025',
  numberOfItems: 22,
  itemListElement: [
    {
      '@type': 'Event',
      name: 'Birth of JavaScript',
      startDate: '1995',
      description:
        'Brendan Eich creates JavaScript in just 10 days at Netscape.',
      location: {
        '@type': 'Place',
        name: 'Netscape Communications',
      },
    },
    {
      '@type': 'Event',
      name: 'JavaScript 1.0',
      startDate: '1996',
      description:
        'First official release of JavaScript with Netscape Navigator 2.0.',
    },
    {
      '@type': 'Event',
      name: 'ECMAScript 1',
      startDate: '1997',
      description:
        'JavaScript is standardized as ECMAScript by Ecma International.',
    },
    {
      '@type': 'Event',
      name: 'ECMAScript 3',
      startDate: '1999',
      description:
        'Major update introducing regular expressions, try/catch, and error handling.',
    },
    {
      '@type': 'Event',
      name: 'AJAX Revolution',
      startDate: '2005',
      description:
        'Google Maps and Gmail popularize AJAX, showcasing rich web applications.',
    },
    {
      '@type': 'Event',
      name: 'jQuery Released',
      startDate: '2006',
      description: 'John Resig releases jQuery, simplifying DOM manipulation.',
    },
    {
      '@type': 'Event',
      name: 'V8 Engine',
      startDate: '2008',
      description:
        'Google releases the V8 JavaScript engine with Chrome, improving performance.',
    },
    {
      '@type': 'Event',
      name: 'Node.js',
      startDate: '2009',
      description:
        'Ryan Dahl creates Node.js, bringing JavaScript to server-side development.',
    },
    {
      '@type': 'Event',
      name: 'AngularJS',
      startDate: '2010',
      description: 'Google releases AngularJS, popularizing the MV* pattern.',
    },
    {
      '@type': 'Event',
      name: 'TypeScript',
      startDate: '2012',
      description:
        'Microsoft introduces TypeScript, adding static typing to JavaScript.',
    },
    {
      '@type': 'Event',
      name: 'React',
      startDate: '2013',
      description:
        'Facebook introduces React, changing UI development with virtual DOM.',
    },
    {
      '@type': 'Event',
      name: 'Vue.js',
      startDate: '2014',
      description:
        'Evan You creates Vue.js, offering progressive framework for UI.',
    },
    {
      '@type': 'Event',
      name: 'ES6 / ES2015',
      startDate: '2015',
      description:
        'Major update with classes, modules, arrow functions, and more.',
    },
    {
      '@type': 'Event',
      name: 'Angular 2',
      startDate: '2016',
      description:
        'Complete rewrite using TypeScript with component-based architecture.',
    },
    {
      '@type': 'Event',
      name: 'Svelte',
      startDate: '2016',
      description:
        'Rich Harris creates Svelte, a compiler for efficient imperative code.',
    },
    {
      '@type': 'Event',
      name: 'Next.js',
      startDate: '2016',
      description:
        'Vercel releases Next.js, React framework for SSR and static generation.',
    },
    {
      '@type': 'Event',
      name: 'WebAssembly',
      startDate: '2017',
      description:
        'WebAssembly becomes standard, allowing near-native browser performance.',
    },
    {
      '@type': 'Event',
      name: 'React Hooks',
      startDate: '2018',
      description:
        'React introduces Hooks, revolutionizing functional component state management.',
    },
    {
      '@type': 'Event',
      name: 'Deno',
      startDate: '2018',
      description:
        'Ryan Dahl releases Deno, secure runtime addressing Node.js design flaws.',
    },
    {
      '@type': 'Event',
      name: 'JavaScript Everywhere',
      startDate: '2020',
      description: 'JavaScript dominates web development across all platforms.',
    },
    {
      '@type': 'Event',
      name: 'ES2021',
      startDate: '2021',
      description:
        'New features including logical assignment operators and Promise.any().',
    },
    {
      '@type': 'Event',
      name: 'Bun Runtime',
      startDate: '2022',
      description:
        'Bun released as fast all-in-one JavaScript runtime and bundler.',
    },
  ],
};

const funFacts = [
  {
    icon: '⚡',
    title: 'Created in 10 Days',
    description:
      'Brendan Eich wrote the first version of JavaScript in just 10 days in May 1995.',
  },
  {
    icon: '🎭',
    title: 'Name Changes',
    description:
      'Originally called Mocha, then LiveScript, and finally JavaScript for marketing reasons.',
  },
  {
    icon: '📅',
    title: 'Born December 4, 1995',
    description:
      'Netscape and Sun officially announced JavaScript to the world with 28 industry endorsements.',
  },
  {
    icon: '🤝',
    title: '28 Industry Giants',
    description:
      'Apple, AT&T, Borland, HP, Oracle, and many others endorsed JavaScript on day one.',
  },
  {
    icon: '🚀',
    title: 'Not Just Web',
    description:
      'JavaScript now runs on servers, mobile apps, desktop applications, and even spacecraft!',
  },
  {
    icon: '📈',
    title: 'Fastest Growing',
    description:
      'JavaScript has the largest package ecosystem with over 2 million packages on npm.',
  },
];

export default function JavaScript30Years() {
  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-yellow-400 via-yellow-500 to-amber-500 py-24">
          <div className="absolute inset-0 bg-black/5"></div>
          <div className="absolute left-0 top-0 h-full w-full">
            <div className="absolute left-10 top-10 h-20 w-20 animate-pulse rounded-full bg-white/10"></div>
            <div className="absolute right-20 top-32 h-16 w-16 animate-pulse rounded-full bg-white/10 delay-300"></div>
            <div className="absolute bottom-20 left-1/4 h-12 w-12 animate-pulse rounded-full bg-white/10 delay-700"></div>
            <div className="absolute bottom-32 right-1/3 h-24 w-24 animate-pulse rounded-full bg-white/10 delay-500"></div>
          </div>
          <div className="container relative z-10 mx-auto px-4 text-center">
            <div className="mb-6">
              <span className="mb-4 inline-block animate-bounce text-6xl">
                🎉
              </span>
            </div>
            <h1 className="mb-6 text-5xl font-bold leading-tight text-gray-900 md:text-7xl">
              30 Years of
              <span className="block bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                JavaScript
              </span>
            </h1>
            <p className="mx-auto mb-8 max-w-3xl text-xl leading-relaxed text-gray-900/90 md:text-2xl">
              From a 10-day prototype to the world&#39;s most popular
              programming language.
              <br />
              <span className="font-semibold">
                Celebrating three decades of innovation.
              </span>
            </p>
            <div className="mb-8 flex flex-wrap justify-center gap-4">
              <Link
                href="#timeline"
                className="group rounded-full bg-gray-900 px-8 py-4 font-medium text-white transition-all duration-300 hover:scale-105 hover:bg-gray-800 hover:shadow-lg"
              >
                <span className="flex items-center gap-2">
                  Explore the Timeline
                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </Link>
              <a
                href="https://deno.com/blog/history-of-javascript"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-white/20 px-8 py-4 font-medium text-gray-900 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-white/30"
              >
                Read the Full Story
              </a>
            </div>
          </div>
        </section>

        {/* Skip Navigation */}
        <div className="container mx-auto px-4">
          <SkipNavigation />
        </div>

        {/* Statistics Section */}
        <section id="stats" className="bg-white py-20">
          <div className="container mx-auto px-4">
            <AnimatedSection animation="fade-in-up">
              <div className="mb-16 text-center">
                <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
                  JavaScript by the Numbers
                </h2>
                <p className="mx-auto max-w-2xl text-lg text-gray-600">
                  The incredible impact of JavaScript on the digital world
                </p>
              </div>
            </AnimatedSection>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat, index) => (
                <AnimatedStats key={index} index={index}>
                  <div className="rounded-2xl border border-yellow-200 bg-gradient-to-br from-yellow-50 to-amber-50 p-6 text-center transition-all duration-300 hover:scale-105 hover:shadow-lg">
                    <div className="mb-2 text-4xl font-bold text-yellow-600 md:text-5xl">
                      {stat.number}
                    </div>
                    <div className="mb-1 text-lg font-semibold text-gray-900">
                      {stat.label}
                    </div>
                    <p className="text-sm text-gray-600">{stat.description}</p>
                  </div>
                </AnimatedStats>
              ))}
            </div>
          </div>
        </section>

        {/* Historical Announcement Section */}
        <section className="bg-gradient-to-br from-gray-900 to-gray-800 py-20">
          <div className="container mx-auto px-4">
            <div className="mb-16 text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-yellow-500/20 px-4 py-2 text-sm font-medium text-yellow-400">
                <span>📅</span>
                <span>December 4, 1995</span>
              </div>
              <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">
                The Birth of JavaScript
              </h2>
              <p className="mx-auto max-w-4xl text-lg leading-relaxed text-gray-300">
                On this historic day, Netscape Communications Corporation and
                Sun Microsystems, Inc. announced JavaScript to the world,
                marking the beginning of a revolution in web development.
              </p>
            </div>

            <div className="mx-auto max-w-4xl rounded-2xl bg-white/10 p-8 backdrop-blur-sm">
              <h3 className="mb-4 text-2xl font-bold text-yellow-400">
                &ldquo;NETSCAPE AND SUN ANNOUNCE JAVASCRIPT, THE OPEN,
                CROSS-PLATFORM OBJECT SCRIPTING LANGUAGE FOR ENTERPRISE NETWORKS
                AND THE INTERNET&rdquo;
              </h3>
              <p className="mb-6 leading-relaxed text-gray-300">
                JavaScript was introduced as an open, cross-platform object
                scripting language designed for creating and customizing
                applications on enterprise networks and the Internet. The
                language complemented Java, making it accessible to HTML page
                authors and enterprise application developers for dynamic
                scripting of client and server behavior.
              </p>

              <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="rounded-xl bg-white/5 p-6">
                  <h4 className="mb-3 text-lg font-semibold text-yellow-400">
                    Vision Statement
                  </h4>
                  <p className="mb-3 italic text-gray-300">
                    &ldquo;JavaScript will be the most effective method to
                    connect HTML-based content to Java applets.&rdquo;
                  </p>
                  <p className="text-sm text-gray-400">
                    — Bill Joy, Co-founder and VP of Research, Sun Microsystems
                  </p>
                </div>
                <div className="rounded-xl bg-white/5 p-6">
                  <h4 className="mb-3 text-lg font-semibold text-yellow-400">
                    Revolutionary Goal
                  </h4>
                  <p className="mb-3 italic text-gray-300">
                    &ldquo;JavaScript is analogous to Visual Basic in that it
                    can be used by people with little or no programming
                    experience to quickly construct complex applications.&rdquo;
                  </p>
                  <p className="text-sm text-gray-400">
                    — From the original press release
                  </p>
                </div>
              </div>

              <div className="text-center">
                <a
                  href="https://web.archive.org/web/20070916144913/http://wp.netscape.com/newsref/pr/newsrelease67.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-yellow-500 px-6 py-3 font-medium text-gray-900 transition-all duration-300 hover:scale-105 hover:bg-yellow-400"
                >
                  <span>📜</span>
                  <span>View Original Press Release</span>
                  <span>→</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Industry Endorsements */}
        {/* Timeline Section */}
        <section id="timeline" className="bg-gray-50 py-20">
          <div className="container mx-auto px-4">
            <JavaScriptTimeline />
          </div>
        </section>

        {/* JavaScript Evolution Section */}
        <section id="evolution" className="bg-white">
          <Suspense
            fallback={
              <div className="container mx-auto px-4 py-20">
                <div className="mb-16 text-center">
                  <h2 className="mx-auto mb-4 h-10 w-64 animate-pulse rounded bg-gray-200 text-3xl font-bold text-gray-900 md:text-4xl"></h2>
                  <p className="mx-auto h-6 w-96 animate-pulse rounded bg-gray-200 text-lg text-gray-600"></p>
                </div>
                <div className="mx-auto max-w-4xl">
                  <div className="mb-8 grid grid-cols-2 gap-4">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <div
                        key={i}
                        className="h-12 animate-pulse rounded bg-gray-200"
                      ></div>
                    ))}
                  </div>
                  <div className="rounded-xl border border-gray-200 bg-gray-50 p-8">
                    <div className="mb-4 h-6 w-32 animate-pulse rounded bg-gray-300"></div>
                    <div className="h-64 animate-pulse rounded bg-gray-200"></div>
                  </div>
                </div>
              </div>
            }
          >
            <JavaScriptEvolution />
          </Suspense>
        </section>

        {/* JavaScript Performance Section */}
        <section id="performance" className="bg-gray-900">
          <Suspense
            fallback={
              <div className="container mx-auto px-4 py-20">
                <div className="mb-16 text-center">
                  <h2 className="mx-auto mb-4 h-10 w-80 animate-pulse rounded bg-gray-700 text-3xl font-bold text-white md:text-4xl"></h2>
                  <p className="mx-auto h-6 w-96 animate-pulse rounded bg-gray-700 text-lg text-gray-300"></p>
                </div>
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="rounded-2xl bg-gray-800 p-6">
                      <div className="mb-4 h-6 w-32 animate-pulse rounded bg-gray-700"></div>
                      <div className="mb-6 space-y-3">
                        {[1, 2, 3, 4].map((j) => (
                          <div key={j} className="flex justify-between">
                            <div className="h-4 w-16 animate-pulse rounded bg-gray-700"></div>
                            <div className="h-4 w-20 animate-pulse rounded bg-gray-700"></div>
                          </div>
                        ))}
                      </div>
                      <div className="h-2 animate-pulse rounded bg-gray-700"></div>
                    </div>
                  ))}
                </div>
              </div>
            }
          >
            <JavaScriptPerformance />
          </Suspense>
        </section>

        {/* Fun Facts Section */}
        <section id="fun-facts" className="bg-white py-20">
          <div className="container mx-auto px-4">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
                Did You Know?
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-600">
                Fascinating facts about JavaScript&#39;s journey
              </p>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {funFacts.map((fact, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 rounded-2xl border border-gray-200 bg-gradient-to-br from-gray-50 to-white p-6 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  <div className="mt-1 flex-shrink-0 text-3xl">{fact.icon}</div>
                  <div>
                    <h3 className="mb-2 text-xl font-semibold text-gray-900">
                      {fact.title}
                    </h3>
                    <p className="leading-relaxed text-gray-600">
                      {fact.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Future Section */}
        <section
          id="future"
          className="bg-gradient-to-br from-yellow-50 to-amber-50 py-20"
        >
          <div className="container mx-auto px-4 text-center">
            <div className="mx-auto max-w-4xl">
              <h2 className="mb-6 text-3xl font-bold text-gray-900 md:text-4xl">
                The Next 30 Years
              </h2>
              <p className="mb-8 text-lg leading-relaxed text-gray-600">
                As JavaScript continues to evolve, we&#39;re seeing exciting
                developments in WebAssembly integration, AI-powered development
                tools, edge computing, and new runtime environments. The
                language that started as a simple scripting tool has become the
                foundation of modern digital experiences.
              </p>
              <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-3">
                <div className="rounded-xl bg-white p-6 shadow-sm">
                  <div className="mb-3 text-2xl">🤖</div>
                  <h3 className="mb-2 font-semibold text-gray-900">
                    AI Integration
                  </h3>
                  <p className="text-sm text-gray-600">
                    JavaScript-powered AI applications and machine learning in
                    the browser
                  </p>
                </div>
                <div className="rounded-xl bg-white p-6 shadow-sm">
                  <div className="mb-3 text-2xl">🌐</div>
                  <h3 className="mb-2 font-semibold text-gray-900">
                    Edge Computing
                  </h3>
                  <p className="text-sm text-gray-600">
                    JavaScript running closer to users with edge runtimes and
                    serverless functions
                  </p>
                </div>
                <div className="rounded-xl bg-white p-6 shadow-sm">
                  <div className="mb-3 text-2xl">🚀</div>
                  <h3 className="mb-2 font-semibold text-gray-900">
                    Performance
                  </h3>
                  <p className="text-sm text-gray-600">
                    Continued improvements in V8, new JIT optimizations, and
                    WebAssembly synergy
                  </p>
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
            <p className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-gray-300">
              Be part of the JavaScript community and help shape the next 30
              years of web development. Connect with developers worldwide and
              share your JavaScript journey.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://discord.gg/8r9XKTeNW8"
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-full bg-indigo-600 px-8 py-4 font-medium text-white transition-all duration-300 hover:scale-105 hover:bg-indigo-700 hover:shadow-lg"
              >
                <span className="flex items-center gap-2">
                  💬 Join Our Discord
                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </a>
              <a
                href="https://x.com/meetjs"
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-full bg-blue-500 px-8 py-4 font-medium text-white transition-all duration-300 hover:scale-105 hover:bg-blue-600 hover:shadow-lg"
              >
                <span className="flex items-center gap-2">
                  🐦 Share on Twitter
                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </a>
              <Link
                href="/events"
                className="group rounded-full bg-yellow-500 px-8 py-4 font-medium text-gray-900 transition-all duration-300 hover:scale-105 hover:bg-yellow-400 hover:shadow-lg"
              >
                <span className="flex items-center gap-2">
                  📅 Find Events
                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
