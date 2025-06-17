'use client';

import { FaUsers, FaMapMarkerAlt, FaCalendarAlt, FaCode } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';

export const SponsorStats = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [counts, setCounts] = useState({
    attendees: 0,
    cities: 0,
    events: 0,
    years: 0,
  });

  const targetCounts = {
    attendees: 5000,
    cities: 18,
    events: 250,
    years: 14,
  };

  useEffect(() => {
    if (inView) {
      const duration = 2000; // 2 seconds for the count animation
      const frameDuration = 1000 / 60; // 60fps
      const totalFrames = Math.round(duration / frameDuration);
      
      let frame = 0;
      const counter = setInterval(() => {
        frame++;
        const progress = frame / totalFrames;
        
        setCounts({
          attendees: Math.floor(targetCounts.attendees * progress),
          cities: Math.floor(targetCounts.cities * progress),
          events: Math.floor(targetCounts.events * progress),
          years: Math.floor(targetCounts.years * progress),
        });
        
        if (frame === totalFrames) {
          clearInterval(counter);
          setCounts(targetCounts);
        }
      }, frameDuration);
      
      return () => clearInterval(counter);
    }
  }, [inView]);

  return (
    <section className="py-16 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">meet.js by the Numbers</h2>
        
        <div 
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          <motion.div 
            className="text-center p-6 bg-gray-800 rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
          >
            <FaUsers className="h-12 w-12 mx-auto mb-4 text-green" />
            <div className="text-4xl font-bold mb-2">{counts.attendees}+</div>
            <p className="text-gray-300">Annual Attendees</p>
          </motion.div>
          
          <motion.div 
            className="text-center p-6 bg-gray-800 rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            <FaMapMarkerAlt className="h-12 w-12 mx-auto mb-4 text-green" />
            <div className="text-4xl font-bold mb-2">{counts.cities}</div>
            <p className="text-gray-300">Polish Cities</p>
          </motion.div>
          
          <motion.div 
            className="text-center p-6 bg-gray-800 rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            <FaCalendarAlt className="h-12 w-12 mx-auto mb-4 text-green" />
            <div className="text-4xl font-bold mb-2">{counts.events}+</div>
            <p className="text-gray-300">Events Organized</p>
          </motion.div>
          
          <motion.div 
            className="text-center p-6 bg-gray-800 rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
          >
            <FaCode className="h-12 w-12 mx-auto mb-4 text-green" />
            <div className="text-4xl font-bold mb-2">{counts.years}</div>
            <p className="text-gray-300">Years of Community</p>
          </motion.div>
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-xl max-w-3xl mx-auto">
            Since 2011, meet.js has grown to be the largest JavaScript community in Poland, 
            connecting developers across the country through high-quality meetups and knowledge sharing.
          </p>
        </div>
      </div>
    </section>
  );
};
