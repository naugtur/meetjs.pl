import type { JSX } from '@solidjs/web';

import { For, createSignal } from 'solid-js';

const stats = [
  {
    number: '0',
    label: 'New JS Frameworks',
    description: 'Finally, a year of peace! (just kidding, there were 47)',
    emoji: '🎉',
  },
  {
    number: '47',
    label: 'Actually New Frameworks',
    description: 'We lied. The JS ecosystem never sleeps.',
    emoji: '😅',
  },
  {
    number: '∞',
    label: 'node_modules Size',
    description: 'Still heavier than a black hole',
    emoji: '📦',
  },
  {
    number: '99%',
    label: 'Devs Using TypeScript',
    description: 'The 1% are still debugging their any types',
    emoji: '💙',
  },
];

const goodThings = [
  {
    title: 'TypeScript 5.5+ Improvements',
    description:
      'Inferred type predicates, isolated declarations, and faster compilation. TypeScript keeps getting better!',
    emoji: '🚀',
  },
  {
    title: 'React 19 Stable',
    description:
      'Server Components, Actions, and use() hook finally stable. The future is here!',
    emoji: '⚛️',
  },
  {
    title: 'Bun 1.x Maturity',
    description:
      'Bun became a serious contender. npm install in 0.3 seconds? Yes please!',
    emoji: '🥟',
  },
  {
    title: 'CSS Container Queries',
    description:
      'Finally mainstream! Responsive components without JavaScript hacks.',
    emoji: '🎨',
  },
  {
    title: 'AI Coding Assistants',
    description:
      'Copilot, Cursor, Windsurf... We write prompts now, not code. Wait, is that good?',
    emoji: '🤖',
  },
  {
    title: 'Vite Dominance',
    description: 'Webpack who? Vite became the default for everything.',
    emoji: '⚡',
  },
];

const badThings = [
  {
    title: 'npm Package Drama',
    description:
      'Another year, another supply chain attack. Left-pad PTSD intensifies.',
    emoji: '😰',
  },
  {
    title: 'Framework Fatigue',
    description:
      'Do I use Next.js, Remix, Astro, SvelteKit, Nuxt, or... *passes out*',
    emoji: '😵',
  },
  {
    title: 'AI-Generated Bugs',
    description:
      'Copy-pasting AI code without understanding it. What could go wrong?',
    emoji: '🐛',
  },
  {
    title: 'The Great Layoffs',
    description:
      "Tech industry had a rough year. We're all in this together. 💪",
    emoji: '📉',
  },
  {
    title: 'Still No Native Enums in JS',
    description:
      'Year 30 of JavaScript. Still using objects as enums. Cool cool cool.',
    emoji: '🤷',
  },
  {
    title: 'Tailwind vs CSS Debates',
    description:
      'The war continues. Friendships were lost. CSS purists remain salty.',
    emoji: '⚔️',
  },
];

const funnyStats = [
  { stat: '2,847', label: 'Hours spent configuring ESLint', emoji: '⚙️' },
  {
    stat: '156',
    label: 'Times you said "it works on my machine"',
    emoji: '💻',
  },
  { stat: '89', label: 'Abandoned side projects', emoji: '🗑️' },
  { stat: '12', label: 'Times you actually read the docs', emoji: '📚' },
  { stat: '∞', label: 'Console.logs still in production', emoji: '🪲' },
  { stat: '1', label: 'Time you understood regex', emoji: '🧙' },
  { stat: '0', label: 'CSS files without !important', emoji: '🎨' },
  { stat: '42', label: 'Tabs vs Spaces arguments', emoji: '⌨️' },
];

const predictions2026 = [
  'React will release version 20, 21, and 22 in the same week',
  'Someone will create a framework that compiles to another framework',
  'AI will write 90% of code, developers will spend 90% debugging it',
  'TypeScript will add a "super-strict" mode that rejects all code',
  'node_modules will finally exceed the storage capacity of the observable universe',
  'A new JavaScript runtime written in Rust will appear (again)',
  'CSS will get a feature that Sass had 10 years ago',
  'Someone will port Doom to run inside a React component',
];

const shareText = `🎉 2025 Frontend Year in Review!

The year we got 47 new frameworks (we counted), TypeScript hit 99% adoption, and node_modules still weighs more than a black hole.

Check out the full recap at meetjs.pl/2025-review

#JavaScript #TypeScript #Frontend #WebDev #2025Wrapped`;

function ShareButton(props: {
  platform: string;
  onClick: () => void;
  children: JSX.Element;
}) {
  return (
    <button
      onClick={props.onClick}
      class={`rounded-full px-6 py-3 font-semibold text-white transition-all duration-300 hover:scale-105 ${props.platform === 'twitter' ? 'bg-black hover:bg-gray-800' : ''} ${props.platform === 'linkedin' ? 'bg-[#0A66C2] hover:bg-[#004182]' : ''} ${props.platform === 'facebook' ? 'bg-[#1877F2] hover:bg-[#0d65d9]' : ''} `}
    >
      {props.children}
    </button>
  );
}

export default function YearInReview2025() {
  const [randomPrediction, setRandomPrediction] = createSignal(
    predictions2026[Math.floor(Math.random() * predictions2026.length)],
  );

  const shareOnTwitter = () => {
    const url = encodeURIComponent('https://meetjs.pl/2025-review');
    const text = encodeURIComponent(shareText);
    window.open(
      `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      '_blank',
    );
  };

  const shareOnLinkedIn = () => {
    const url = encodeURIComponent('https://meetjs.pl/2025-review');
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      '_blank',
    );
  };

  const shareOnFacebook = () => {
    const url = encodeURIComponent('https://meetjs.pl/2025-review');
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      '_blank',
    );
  };

  return (
    <>
      <main>
        {/* Hero Section */}
        <section class="relative overflow-hidden bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 py-24">
          <div class="absolute inset-0 bg-black/10"></div>
          <div class="absolute left-0 top-0 h-full w-full">
            <div class="absolute left-10 top-10 h-20 w-20 animate-pulse rounded-full bg-white/10"></div>
            <div class="absolute right-20 top-32 h-16 w-16 animate-pulse rounded-full bg-white/10 delay-300"></div>
            <div class="absolute bottom-20 left-1/4 h-12 w-12 animate-pulse rounded-full bg-white/10 delay-700"></div>
            <div class="absolute bottom-32 right-1/3 h-24 w-24 animate-pulse rounded-full bg-white/10 delay-500"></div>
            <div class="absolute right-10 top-1/2 text-6xl opacity-20">🎊</div>
            <div class="absolute left-1/4 top-20 text-4xl opacity-20">✨</div>
            <div class="absolute bottom-10 right-1/4 text-5xl opacity-20">
              🚀
            </div>
          </div>
          <div class="container relative z-10 mx-auto px-4 text-center">
            <div class="mb-6">
              <span class="mb-4 inline-block animate-bounce text-7xl">🎆</span>
            </div>
            <h1 class="mb-6 text-5xl font-bold leading-tight text-white md:text-7xl">
              2025
              <span class="block bg-gradient-to-r from-yellow-300 via-white to-yellow-300 bg-clip-text text-transparent">
                Year in Review
              </span>
            </h1>
            <p class="mx-auto mb-4 max-w-3xl text-xl leading-relaxed text-white/90 md:text-2xl">
              Frontend / JavaScript / TypeScript
            </p>
            <p class="mx-auto mb-8 max-w-2xl text-lg text-white/80">
              The year we survived another framework explosion, embraced AI
              overlords, and still couldn&apos;t center a div without Googling
              it.
            </p>
            <div class="flex flex-wrap justify-center gap-4">
              <a
                href="#stats"
                class="group rounded-full bg-white px-8 py-4 font-medium text-purple-600 transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                <span class="flex items-center gap-2">
                  See the Numbers
                  <span class="transition-transform group-hover:translate-y-1">
                    ↓
                  </span>
                </span>
              </a>
            </div>
          </div>
        </section>

        {/* Main Stats */}
        <section id="stats" class="bg-gray-900 py-20">
          <div class="container mx-auto px-4">
            <div class="mb-16 text-center">
              <h2 class="mb-4 text-3xl font-bold text-white md:text-4xl">
                The Numbers That Matter*
              </h2>
              <p class="text-gray-400">*Totally accurate, trust us</p>
            </div>
            <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              {
                <For each={stats}>
                  {(stat, index) => (
                    <div class="group rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 p-6 text-center transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/20">
                      <div class="mb-2 text-4xl">{stat.emoji}</div>
                      <div class="mb-2 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-5xl font-bold text-transparent">
                        {stat.number}
                      </div>
                      <div class="mb-2 text-lg font-semibold text-white">
                        {stat.label}
                      </div>
                      <p class="text-sm text-gray-400">{stat.description}</p>
                    </div>
                  )}
                </For>
              }
            </div>
          </div>
        </section>

        {/* Your Year in Numbers (Funny) */}
        <section class="bg-gradient-to-br from-blue-900 to-purple-900 py-20">
          <div class="container mx-auto px-4">
            <div class="mb-16 text-center">
              <h2 class="mb-4 text-3xl font-bold text-white md:text-4xl">
                Your 2025 as a Developer
              </h2>
              <p class="text-blue-200">
                Based on extensive research (we made it up)
              </p>
            </div>
            <div class="grid grid-cols-2 gap-4 md:grid-cols-4">
              {
                <For each={funnyStats}>
                  {(item, index) => (
                    <div class="rounded-xl bg-white/10 p-4 text-center backdrop-blur-sm transition-all duration-300 hover:bg-white/20">
                      <div class="mb-2 text-3xl">{item.emoji}</div>
                      <div class="text-2xl font-bold text-white">
                        {item.stat}
                      </div>
                      <div class="text-sm text-blue-200">{item.label}</div>
                    </div>
                  )}
                </For>
              }
            </div>
          </div>
        </section>

        {/* Good Things */}
        <section class="bg-gradient-to-br from-green-50 to-emerald-100 py-20 dark:from-green-900/20 dark:to-emerald-900/20">
          <div class="container mx-auto px-4">
            <div class="mb-16 text-center">
              <span class="mb-4 inline-block text-5xl">🌟</span>
              <h2 class="mb-4 text-3xl font-bold text-gray-900 md:text-4xl dark:text-white">
                The Good Stuff
              </h2>
              <p class="text-gray-600 dark:text-gray-300">
                Things that made us happy in 2025
              </p>
            </div>
            <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {
                <For each={goodThings}>
                  {(item, index) => (
                    <div class="rounded-2xl border border-green-200 bg-white p-6 shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-lg dark:border-green-800 dark:bg-gray-800">
                      <div class="mb-3 text-3xl">{item.emoji}</div>
                      <h3 class="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                        {item.title}
                      </h3>
                      <p class="text-gray-600 dark:text-gray-300">
                        {item.description}
                      </p>
                    </div>
                  )}
                </For>
              }
            </div>
          </div>
        </section>

        {/* Bad Things */}
        <section class="bg-gradient-to-br from-red-50 to-orange-100 py-20 dark:from-red-900/20 dark:to-orange-900/20">
          <div class="container mx-auto px-4">
            <div class="mb-16 text-center">
              <span class="mb-4 inline-block text-5xl">😬</span>
              <h2 class="mb-4 text-3xl font-bold text-gray-900 md:text-4xl dark:text-white">
                The Not-So-Good Stuff
              </h2>
              <p class="text-gray-600 dark:text-gray-300">
                Things we&apos;d rather forget
              </p>
            </div>
            <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {
                <For each={badThings}>
                  {(item, index) => (
                    <div class="rounded-2xl border border-red-200 bg-white p-6 shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-lg dark:border-red-800 dark:bg-gray-800">
                      <div class="mb-3 text-3xl">{item.emoji}</div>
                      <h3 class="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                        {item.title}
                      </h3>
                      <p class="text-gray-600 dark:text-gray-300">
                        {item.description}
                      </p>
                    </div>
                  )}
                </For>
              }
            </div>
          </div>
        </section>

        {/* Framework Counter */}
        <section class="bg-gray-900 py-20">
          <div class="container mx-auto px-4">
            <div class="mx-auto max-w-4xl text-center">
              <h2 class="mb-8 text-3xl font-bold text-white md:text-4xl">
                🏆 Framework of the Year Award
              </h2>
              <div class="mb-8 rounded-2xl bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-500 p-8">
                <div class="text-6xl font-bold text-gray-900">???</div>
                <p class="mt-4 text-xl text-gray-800">
                  We couldn&apos;t decide. There were too many.
                </p>
              </div>
              <div class="grid grid-cols-2 gap-4 md:grid-cols-4">
                <div class="rounded-xl bg-gray-800 p-4">
                  <div class="text-2xl font-bold text-blue-400">React</div>
                  <div class="text-sm text-gray-400">Still king 👑</div>
                </div>
                <div class="rounded-xl bg-gray-800 p-4">
                  <div class="text-2xl font-bold text-green-400">Vue</div>
                  <div class="text-sm text-gray-400">Quietly winning</div>
                </div>
                <div class="rounded-xl bg-gray-800 p-4">
                  <div class="text-2xl font-bold text-orange-400">Svelte</div>
                  <div class="text-sm text-gray-400">The cool kid</div>
                </div>
                <div class="rounded-xl bg-gray-800 p-4">
                  <div class="text-2xl font-bold text-purple-400">Solid</div>
                  <div class="text-sm text-gray-400">Rising star</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2026 Predictions */}
        <section class="bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 py-20">
          <div class="container mx-auto px-4">
            <div class="mx-auto max-w-3xl text-center">
              <span class="mb-4 inline-block text-5xl">🔮</span>
              <h2 class="mb-4 text-3xl font-bold text-white md:text-4xl">
                2026 Prediction
              </h2>
              <p class="mb-8 text-purple-200">Our crystal ball says...</p>
              <div class="rounded-2xl bg-white/10 p-8 backdrop-blur-sm">
                <p class="text-xl italic text-white md:text-2xl">
                  &ldquo;{randomPrediction()}&rdquo;
                </p>
              </div>
              <button
                onClick={() =>
                  setRandomPrediction(
                    predictions2026[
                      Math.floor(Math.random() * predictions2026.length)
                    ],
                  )
                }
                class="mt-6 rounded-full bg-white/20 px-6 py-3 text-white transition-all duration-300 hover:bg-white/30"
              >
                🎲 Get Another Prediction
              </button>
            </div>
          </div>
        </section>

        {/* TypeScript Love */}
        <section class="bg-[#3178c6] py-20">
          <div class="container mx-auto px-4 text-center">
            <div class="mx-auto max-w-3xl">
              <span class="mb-4 inline-block text-6xl">💙</span>
              <h2 class="mb-6 text-3xl font-bold text-white md:text-4xl">
                TypeScript Appreciation Corner
              </h2>
              <p class="mb-8 text-xl text-blue-100">
                Thank you, TypeScript, for catching our bugs before production.
                <br />
                <span class="text-blue-200">Most of them, anyway.</span>
              </p>
              <div class="rounded-xl bg-white/10 p-6 text-left font-mono text-sm text-blue-100">
                <pre>{`// 2025 mood
type Developer = {
  coffee: "always" | "more";
  bugs: number; // always > 0
  imposterSyndrome: true;
  lovesTypeScript: true;
};`}</pre>
              </div>
            </div>
          </div>
        </section>

        {/* Share Section */}
        <section class="bg-gradient-to-r from-gray-900 to-gray-800 py-20">
          <div class="container mx-auto px-4 text-center">
            <h2 class="mb-6 text-3xl font-bold text-white md:text-4xl">
              Share Your 2025! 🎉
            </h2>
            <p class="mx-auto mb-8 max-w-2xl text-lg text-gray-300">
              Survived another year of JavaScript? Share the celebration with
              your fellow devs!
            </p>
            <div class="flex flex-wrap justify-center gap-4">
              <ShareButton platform="twitter" onClick={shareOnTwitter}>
                𝕏 Share on X
              </ShareButton>
              <ShareButton platform="linkedin" onClick={shareOnLinkedIn}>
                Share on LinkedIn
              </ShareButton>
              <ShareButton platform="facebook" onClick={shareOnFacebook}>
                Share on Facebook
              </ShareButton>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section class="bg-gradient-to-br from-yellow-400 via-yellow-500 to-orange-500 py-20">
          <div class="container mx-auto px-4 text-center">
            <h2 class="mb-6 text-3xl font-bold text-gray-900 md:text-4xl">
              Here&apos;s to 2026! 🥂
            </h2>
            <p class="mx-auto mb-8 max-w-2xl text-lg text-gray-800">
              May your builds be fast, your types be strict, and your
              node_modules be... well, let&apos;s not talk about node_modules.
            </p>
            <div class="flex flex-wrap justify-center gap-4">
              <a
                href="/events"
                class="rounded-full bg-gray-900 px-8 py-4 font-medium text-white transition-all duration-300 hover:scale-105 hover:bg-gray-800"
              >
                Find a Meetup Near You
              </a>
              <a
                href="/"
                class="rounded-full bg-white/30 px-8 py-4 font-medium text-gray-900 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-white/50"
              >
                Back to Homepage
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
