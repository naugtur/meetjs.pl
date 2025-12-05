'use client';

import { useState } from 'react';
import styles from './JavaScriptTimeline.module.css';

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
      'Google Maps and Gmail popularize AJAX, showcasing JavaScript&#39;s potential for rich web applications.',
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
      'JavaScript dominates web development with frameworks like React, Vue, and Angular. Node.js powers backend services, and JavaScript runs on mobile, desktop, and IoT devices. It&#39;s truly everywhere in the tech stack.',
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

const JavaScriptTimeline = () => {
  const [activeIndex, setActiveIndex] = useState(timelineEvents.length - 1);
  const [filter, setFilter] = useState('all');
  const [focusedFilterIndex, setFocusedFilterIndex] = useState(0);

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

  const filteredEvents = timelineEvents.filter((event) => {
    if (filter === 'all') return true;
    if (filter === 'early' && parseInt(event.year) <= 2005) return true;
    if (
      filter === 'frameworks' &&
      ['2006', '2010', '2013', '2014', '2016', '2018'].includes(event.year)
    )
      return true;
    if (filter === 'modern' && parseInt(event.year) >= 2015) return true;
    return false;
  });

  const handleKeyDown = (e: React.KeyboardEvent, filterIndex: number) => {
    switch (e.key) {
      case 'ArrowRight':
        e.preventDefault();
        const nextIndex = (filterIndex + 1) % filters.length;
        setFocusedFilterIndex(nextIndex);
        setFilter(filters[nextIndex].key);
        break;
      case 'ArrowLeft':
        e.preventDefault();
        const prevIndex = (filterIndex - 1 + filters.length) % filters.length;
        setFocusedFilterIndex(prevIndex);
        setFilter(filters[prevIndex].key);
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        setFilter(filters[filterIndex].key);
        break;
    }
  };

  return (
    <div className={styles.timelineContainer}>
      <div className={styles.header}>
        <h2 className={styles.title}>30 Years of JavaScript Evolution</h2>
        <p className={styles.subtitle}>
          From a 10-day prototype to the world&#39;s most popular programming
          language
        </p>

        <div
          className={styles.filterButtons}
          role="tablist"
          aria-label="Filter timeline events"
        >
          {filters.map((filterItem, index) => (
            <button
              key={filterItem.key}
              className={`${styles.filterBtn} ${filter === filterItem.key ? styles.active : ''}`}
              onClick={() => {
                setFilter(filterItem.key);
                setFocusedFilterIndex(index);
              }}
              onKeyDown={(e) => handleKeyDown(e, index)}
              role="tab"
              aria-selected={filter === filterItem.key}
              aria-controls="timeline-events"
              aria-describedby={`filter-${filterItem.key}-desc`}
              tabIndex={focusedFilterIndex === index ? 0 : -1}
            >
              {filterItem.label}
              <span id={`filter-${filterItem.key}-desc`} className="sr-only">
                {filterItem.description}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div
        className={styles.timeline}
        role="region"
        aria-label="JavaScript timeline events"
        id="timeline-events"
      >
        {filteredEvents.map((event, index) => (
          <div
            key={event.year}
            className={`${styles.timelineItem} ${activeIndex === index ? styles.active : ''} ${event.highlight ? styles.highlight : ''}`}
            onClick={() => setActiveIndex(index)}
            role="article"
            aria-label={`${event.year}: ${event.title}`}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setActiveIndex(index);
              }
            }}
          >
            <div className={styles.timelineDot}>
              <span className={styles.icon} aria-hidden="true">
                {event.icon}
              </span>
            </div>
            <div className={styles.timelineContent}>
              <h3 className={styles.year}>{event.year}</h3>
              <h4 className={styles.eventTitle}>{event.title}</h4>
              <p className={styles.eventDescription}>{event.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JavaScriptTimeline;
