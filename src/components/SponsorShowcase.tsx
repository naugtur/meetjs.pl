'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { FaFilter } from 'react-icons/fa6';
import { sponsors } from '@/content/sponsors';
import { classNames } from '@/utils/classNames';

export const SponsorShowcase = () => {
  const [filter, setFilter] = useState('all');
  
  const filteredSponsors = filter === 'all' 
    ? sponsors 
    : sponsors.filter(sponsor => sponsor.type === filter);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Our Sponsors</h2>
        
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          <button 
            onClick={() => setFilter('all')}
            className={classNames(
              'px-4 py-2 rounded-full',
              filter === 'all' 
                ? 'bg-purple text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            )}
          >
            All Sponsors
          </button>
          <button 
            onClick={() => setFilter('platinum')}
            className={classNames(
              'px-4 py-2 rounded-full',
              filter === 'platinum' 
                ? 'bg-purple text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            )}
          >
            Platinum
          </button>
          <button 
            onClick={() => setFilter('gold')}
            className={classNames(
              'px-4 py-2 rounded-full',
              filter === 'gold' 
                ? 'bg-purple text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            )}
          >
            Gold
          </button>
          <button 
            onClick={() => setFilter('silver')}
            className={classNames(
              'px-4 py-2 rounded-full',
              filter === 'silver' 
                ? 'bg-purple text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            )}
          >
            Silver
          </button>
          <button 
            onClick={() => setFilter('venue')}
            className={classNames(
              'px-4 py-2 rounded-full',
              filter === 'venue' 
                ? 'bg-purple text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            )}
          >
            Venue Partners
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredSponsors.length > 0 ? (
            filteredSponsors.map((sponsor) => (
              <div 
                key={sponsor.id} 
                className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center hover:shadow-lg transition-shadow"
              >
                <div className="h-32 w-full flex items-center justify-center mb-4">
                  <Image 
                    src={sponsor.logo} 
                    alt={`${sponsor.name} logo`} 
                    width={150} 
                    height={100} 
                    className="max-h-28 object-contain"
                  />
                </div>
                <h3 className="text-xl font-semibold text-center mb-2">{sponsor.name}</h3>
                <p className="text-gray-600 text-center mb-4 text-sm">{sponsor.description}</p>
                <div className="mt-auto">
                  <Link 
                    href={sponsor.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-purple hover:text-purple-700 font-medium"
                  >
                    Visit Website
                  </Link>
                </div>
                {sponsor.type && (
                  <div className={classNames(
                    'mt-4 px-3 py-1 rounded-full text-xs font-medium',
                    sponsor.type === 'platinum' ? 'bg-gray-800 text-white' :
                    sponsor.type === 'gold' ? 'bg-yellow-400 text-gray-900' :
                    sponsor.type === 'silver' ? 'bg-gray-300 text-gray-800' :
                    'bg-blue-100 text-blue-800'
                  )}>
                    {sponsor.type.charAt(0).toUpperCase() + sponsor.type.slice(1)}
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-10">
              <FaFilter className="mx-auto text-4xl text-gray-400 mb-4" />
              <p className="text-gray-500">No sponsors found with the selected filter.</p>
            </div>
          )}
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-lg mb-6">Want to join our sponsors?</p>
          <Link 
            href="#become-sponsor" 
            className="bg-purple hover:bg-purple-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
          >
            Become a Sponsor
          </Link>
        </div>
      </div>
    </section>
  );
};
