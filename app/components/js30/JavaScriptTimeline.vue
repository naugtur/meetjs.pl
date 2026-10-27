<script setup lang="ts">
const timelineEvents = [
  {
    year: '1995',
    title: 'Birth of JavaScript',
    description:
      'Brendan Eich creates JavaScript in just 10 days at Netscape. Originally named Mocha, then LiveScript, it was later renamed to JavaScript.',
    icon: '🚀',
  },
  {
    year: '1996',
    title: 'JavaScript 1.0',
    description:
      'First official release of JavaScript with Netscape Navigator 2.0.',
    icon: '📦',
  },
  {
    year: '1997',
    title: 'ECMAScript 1',
    description:
      'JavaScript is standardized as ECMAScript by Ecma International.',
    icon: '📋',
  },
  {
    year: '1999',
    title: 'ECMAScript 3',
    description:
      'Major update introducing regular expressions, try/catch, and more robust error handling.',
    icon: '🔧',
  },
  {
    year: '2005',
    title: 'AJAX Revolution',
    description:
      "Google Maps and Gmail popularize AJAX, showcasing JavaScript's potential for rich web applications.",
    icon: '🌐',
  },
  {
    year: '2006',
    title: 'jQuery Released',
    description:
      'John Resig releases jQuery, simplifying DOM manipulation and cross-browser compatibility.',
    icon: '💎',
  },
  {
    year: '2008',
    title: 'V8 Engine',
    description:
      'Google releases the V8 JavaScript engine with Chrome, dramatically improving performance.',
    icon: '⚡',
  },
  {
    year: '2009',
    title: 'Node.js',
    description:
      'Ryan Dahl creates Node.js, bringing JavaScript to server-side development.',
    icon: '🖥️',
  },
  {
    year: '2010',
    title: 'AngularJS',
    description:
      'Google releases AngularJS, popularizing the MV* pattern in frontend development.',
    icon: '🅰️',
  },
  {
    year: '2012',
    title: 'TypeScript',
    description:
      'Microsoft introduces TypeScript, adding static typing to JavaScript.',
    icon: '📘',
  },
  {
    year: '2013',
    title: 'React',
    description:
      'Facebook introduces React, changing how we think about building UIs with its virtual DOM.',
    icon: '⚛️',
  },
  {
    year: '2014',
    title: 'Vue.js',
    description:
      'Evan You creates Vue.js, offering a progressive framework for building user interfaces.',
    icon: '💚',
  },
  {
    year: '2015',
    title: 'ES6 / ES2015',
    description:
      'Major update to JavaScript with classes, modules, arrow functions, and more.',
    icon: '🎯',
  },
  {
    year: '2016',
    title: 'Angular 2',
    description:
      'Complete rewrite of AngularJS using TypeScript, introducing component-based architecture.',
    icon: '🔺',
  },
  {
    year: '2016',
    title: 'Svelte',
    description:
      'Rich Harris creates Svelte, a compiler that turns components into highly efficient imperative code at build time.',
    icon: '🔥',
  },
  {
    year: '2016',
    title: 'Next.js',
    description:
      'Vercel releases Next.js, a React framework for server-side rendering and static site generation.',
    icon: '▲',
  },
  {
    year: '2017',
    title: 'WebAssembly',
    description:
      'WebAssembly becomes a web standard, allowing near-native performance in browsers.',
    icon: '🔥',
  },
  {
    year: '2018',
    title: 'React Hooks',
    description:
      'React introduces Hooks, revolutionizing state management in functional components.',
    icon: '🪝',
  },
  {
    year: '2018',
    title: 'Deno',
    description:
      'Ryan Dahl releases Deno, a secure runtime for JavaScript and TypeScript, addressing Node.js design flaws.',
    icon: '🦕',
  },
  {
    year: '2020',
    title: 'JavaScript Everywhere',
    description:
      "JavaScript dominates web development with frameworks like React, Vue, and Angular. Node.js powers backend services, and JavaScript runs on mobile, desktop, and IoT devices. It's truly everywhere in the tech stack.",
    icon: '🌐',
  },
  {
    year: '2021',
    title: 'ES2021',
    description:
      'New features including logical assignment operators, numeric separators, and Promise.any().',
    icon: '✨',
  },
  {
    year: '2022',
    title: 'Bun Runtime',
    description:
      'Bun is released as a fast all-in-one JavaScript runtime, bundler, and package manager.',
    icon: '🍞',
  },
  {
    year: '2025',
    title: 'JavaScript at 30',
    description:
      'JavaScript celebrates 30 years of powering the web and beyond! From simple scripts to full-stack applications.',
    highlight: true,
    icon: '🎉',
  },
];

const activeIndex = ref(timelineEvents.length - 1);
const filter = ref('all');
const focusedFilterIndex = ref(0);

const filters = [
  {
    key: 'all',
    label: 'All Events',
    description: 'Show all JavaScript milestones',
  },
  {
    key: 'early',
    label: 'Early Years',
    description: 'JavaScript from 1995-2005',
  },
  {
    key: 'frameworks',
    label: 'Frameworks Era',
    description: 'Major frameworks and tools',
  },
  {
    key: 'modern',
    label: 'Modern JS',
    description: 'JavaScript from 2015 onwards',
  },
];

const filteredEvents = computed(() =>
  timelineEvents.filter((event) => {
    if (filter.value === 'all') return true;
    if (filter.value === 'early' && parseInt(event.year) <= 2005) return true;
    if (
      filter.value === 'frameworks' &&
      ['2006', '2010', '2013', '2014', '2016', '2018'].includes(event.year)
    )
      return true;
    if (filter.value === 'modern' && parseInt(event.year) >= 2015) return true;
    return false;
  }),
);

const selectFilter = (index: number) => {
  focusedFilterIndex.value = index;
  filter.value = filters[index]!.key;
};

const handleKeyDown = (e: KeyboardEvent, filterIndex: number) => {
  switch (e.key) {
    case 'ArrowRight':
      e.preventDefault();
      selectFilter((filterIndex + 1) % filters.length);
      break;
    case 'ArrowLeft':
      e.preventDefault();
      selectFilter((filterIndex - 1 + filters.length) % filters.length);
      break;
    case 'Enter':
    case ' ':
      e.preventDefault();
      filter.value = filters[filterIndex]!.key;
      break;
  }
};
</script>

<template>
  <div :class="$style.timelineContainer">
    <div :class="$style.header">
      <h2 :class="$style.title">30 Years of JavaScript Evolution</h2>
      <p :class="$style.subtitle">
        From a 10-day prototype to the world's most popular programming language
      </p>

      <div
        :class="$style.filterButtons"
        role="tablist"
        aria-label="Filter timeline events"
      >
        <button
          v-for="(filterItem, index) in filters"
          :key="filterItem.key"
          :class="`${$style.filterBtn} ${filter === filterItem.key ? $style.active : ''}`"
          role="tab"
          :aria-selected="filter === filterItem.key"
          aria-controls="timeline-events"
          :aria-describedby="`filter-${filterItem.key}-desc`"
          :tabindex="focusedFilterIndex === index ? 0 : -1"
          @click="selectFilter(index)"
          @keydown="handleKeyDown($event, index)"
        >
          {{ filterItem.label }}
          <span :id="`filter-${filterItem.key}-desc`" class="sr-only">
            {{ filterItem.description }}
          </span>
        </button>
      </div>
    </div>

    <div
      id="timeline-events"
      :class="$style.timeline"
      role="region"
      aria-label="JavaScript timeline events"
    >
      <div
        v-for="(event, index) in filteredEvents"
        :key="`${event.year}-${event.title}`"
        :class="`${$style.timelineItem} ${activeIndex === index ? $style.active : ''} ${event.highlight ? $style.highlight : ''}`"
        role="article"
        :aria-label="`${event.year}: ${event.title}`"
        tabindex="0"
        @click="activeIndex = index"
        @keydown.enter.prevent="activeIndex = index"
        @keydown.space.prevent="activeIndex = index"
      >
        <div :class="$style.timelineDot">
          <span :class="$style.icon" aria-hidden="true">
            {{ event.icon }}
          </span>
        </div>
        <div :class="$style.timelineContent">
          <h3 :class="$style.year">{{ event.year }}</h3>
          <h4 :class="$style.eventTitle">{{ event.title }}</h4>
          <p :class="$style.eventDescription">{{ event.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style module>
/* Screen reader only utility */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* Performance optimizations */
.timelineItem {
  will-change: transform;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

/* Mobile optimizations - disable glassmorphism effects */
@media (max-width: 768px) {
  .timelineItem {
    backdrop-filter: none;
    background: rgba(255, 255, 255, 0.95);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  }

  .timelineItem:hover {
    transform: none;
  }

  .timelineItem.active {
    background: rgba(247, 223, 30, 0.1);
    border: 2px solid #f7df1e;
  }
}

/* Respect user preferences for reduced motion */
@media (prefers-reduced-motion: reduce) {
  .timelineItem,
  .timelineItem:hover,
  .timelineItem.active,
  .filterBtn,
  .filterBtn:hover,
  .filterBtn.active {
    transform: none;
    transition: none;
    animation: none;
  }
}

.header {
  text-align: center;
  margin-bottom: 60px;
}

.title {
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: #333;
  position: relative;
  display: inline-block;
}

.title::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, #f7df1e, #f1b31c);
  border-radius: 2px;
}

.subtitle {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 40px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
}

.filterButtons {
  display: flex;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 20px;
}

.filterBtn {
  padding: 10px 20px;
  border: 2px solid #f7df1e;
  background: white;
  color: #333;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
  font-size: 0.9rem;
}

.filterBtn:hover {
  background: #f7df1e;
  color: #333;
  transform: translateY(-2px);
}

.filterBtn.active {
  background: #f7df1e;
  color: #333;
  box-shadow: 0 4px 12px rgba(247, 223, 30, 0.3);
}

.timeline {
  position: relative;
  max-width: 1000px;
  margin: 0 auto;
}

.timeline::before {
  content: '';
  position: absolute;
  width: 4px;
  background: linear-gradient(to bottom, #f7df1e, #f1b31c, #f7df1e);
  top: 0;
  bottom: 0;
  left: 50%;
  margin-left: -2px;
  border-radius: 2px;
  box-shadow: 0 0 10px rgba(247, 223, 30, 0.3);
  z-index: 0;
}

.timelineItem {
  padding: 10px 40px;
  position: relative;
  width: 50%;
  box-sizing: border-box;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 30px;
  z-index: 2;
}

.timelineItem:hover {
  transform: translateY(-5px);
}

.timelineItem:nth-child(odd) {
  left: 0;
  padding-right: 20px;
  text-align: right;
}

.timelineItem:nth-child(even) {
  left: 50%;
  padding-left: 20px;
  text-align: left;
}

.timelineItem.active .timelineDot {
  background-color: #f7df1e;
  transform: scale(1.2);
  box-shadow: 0 0 20px rgba(247, 223, 30, 0.6);
}

.timelineItem.highlight .timelineDot {
  background-color: #ff5252;
  box-shadow: 0 0 20px rgba(255, 82, 82, 0.6);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

.timelineDot {
  position: absolute;
  top: 30px;
  width: 60px;
  height: 60px;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  z-index: 2;
  transition: all 0.3s ease;
}

.timelineItem:nth-child(odd) .timelineDot {
  right: -30px;
  border: 4px solid #f7df1e;
}

.timelineItem:nth-child(even) .timelineDot {
  left: -30px;
  border: 4px solid #3b82f6;
}

.timelineItem:hover .timelineDot {
  transform: scale(1.1);
  box-shadow: 0 6px 30px rgba(0, 0, 0, 0.2);
}

.timelineItem.active .timelineDot {
  transform: scale(1.2);
  border-color: #10b981;
  background: #f0fdf4;
}

.icon {
  font-size: 1.8rem;
  line-height: 1;
}

.year {
  font-size: 1.8rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 8px;
  background: linear-gradient(135deg, #f7df1e, #f1b31c);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.eventTitle {
  font-size: 1.3rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 12px;
  line-height: 1.3;
}

.eventDescription {
  font-size: 1rem;
  color: #6b7280;
  line-height: 1.6;
  margin: 0;
}

/* Staggered animation delays */
.timelineItem:nth-child(1) {
  animation-delay: 0.1s;
}
.timelineItem:nth-child(2) {
  animation-delay: 0.2s;
}
.timelineItem:nth-child(3) {
  animation-delay: 0.3s;
}
.timelineItem:nth-child(4) {
  animation-delay: 0.4s;
}
.timelineItem:nth-child(5) {
  animation-delay: 0.5s;
}
.timelineItem:nth-child(6) {
  animation-delay: 0.6s;
}
.timelineItem:nth-child(7) {
  animation-delay: 0.7s;
}
.timelineItem:nth-child(8) {
  animation-delay: 0.8s;
}
.timelineItem:nth-child(9) {
  animation-delay: 0.9s;
}
.timelineItem:nth-child(10) {
  animation-delay: 1s;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive Design */
@media screen and (max-width: 768px) {
  .title {
    font-size: 2rem;
  }

  .subtitle {
    font-size: 1rem;
    padding: 0 20px;
  }

  .filterButtons {
    padding: 0 20px;
    gap: 8px;
  }

  .filterBtn {
    padding: 8px 16px;
    font-size: 0.8rem;
  }

  .timeline::before {
    left: 31px;
  }

  .timelineItem {
    width: 100%;
    padding-left: 80px;
    padding-right: 25px;
    text-align: left !important;
    margin-bottom: 20px;
  }

  .timelineItem:nth-child(even) {
    left: 0;
  }

  .timelineItem:nth-child(odd)::after,
  .timelineItem:nth-child(even)::after {
    left: 21px;
  }

  .timelineItem .timelineDot {
    left: 6px !important;
    width: 40px;
    height: 40px;
  }

  .icon {
    font-size: 1.2rem;
  }

  .year {
    font-size: 1.4rem;
  }

  .eventTitle {
    font-size: 1.1rem;
  }

  .eventDescription {
    font-size: 0.9rem;
  }
}
</style>
