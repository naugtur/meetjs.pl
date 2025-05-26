'use client';

import { useState } from 'react';
import styles from './JavaScriptTimeline.module.css';

const timelineEvents = [
  {
    year: '1995',
    title: 'Birth of JavaScript',
    description: 'Brendan Eich creates JavaScript in just 10 days at Netscape. Originally named Mocha, then LiveScript, it was later renamed to JavaScript.'
  },
  {
    year: '1996',
    title: 'JavaScript 1.0',
    description: 'First official release of JavaScript with Netscape Navigator 2.0.'
  },
  {
    year: '1997',
    title: 'ECMAScript 1',
    description: 'JavaScript is standardized as ECMAScript by Ecma International.'
  },
  {
    year: '2005',
    title: 'AJAX Revolution',
    description: 'Google Maps and Gmail popularize AJAX, showcasing JavaScript\'s potential for rich web applications.'
  },
  {
    year: '2006',
    title: 'jQuery Released',
    description: 'John Resig releases jQuery, simplifying DOM manipulation and cross-browser compatibility.'
  },
  {
    year: '2009',
    title: 'Node.js',
    description: 'Ryan Dahl creates Node.js, bringing JavaScript to server-side development.'
  },
  {
    year: '2010',
    title: 'AngularJS',
    description: 'Google releases AngularJS, popularizing the MV* pattern in frontend development.'
  },
  {
    year: '2013',
    title: 'React',
    description: 'Facebook introduces React, changing how we think about building UIs with its virtual DOM.'
  },
  {
    year: '2015',
    title: 'ES6 / ES2015',
    description: 'Major update to JavaScript with classes, modules, arrow functions, and more.'
  },
  {
    year: '2025',
    title: 'JavaScript at 30',
    description: 'JavaScript celebrates 30 years of powering the web and beyond!',
    highlight: true
  }
];

const JavaScriptTimeline = () => {
  const [activeIndex, setActiveIndex] = useState(timelineEvents.length - 1);

  return (
    <div className={styles.timelineContainer}>
      <h2 className={styles.title}>30 Years of JavaScript</h2>
      <div className={styles.timeline}>
        {timelineEvents.map((event, index) => (
          <div 
            key={event.year}
            className={`${styles.timelineItem} ${activeIndex === index ? styles.active : ''} ${event.highlight ? styles.highlight : ''}`}
            onClick={() => setActiveIndex(index)}
          >
            <div className={styles.timelineDot}></div>
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
