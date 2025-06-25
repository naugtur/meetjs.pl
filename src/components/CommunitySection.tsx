'use client';

import { MessagesSquare, Newspaper } from 'lucide-react';
import { DiscordCommunity } from '@/components/DiscordCommunity';
import { SubstackEmbed } from '@/components/SubstackEmbed';

export const CommunitySection = () => {
  return (
    <section
      className="flex w-full snap-y scroll-mt-16 flex-col justify-between bg-slate-50/50 p-12 px-2 lg:px-8 dark:bg-slate-800/10"
      id="community"
    >
      <div className="flex w-full flex-col gap-4 p-4">
        <h2 className="text-center text-3xl font-bold">Join Our Community</h2>
      </div>

      <div className="mx-auto flex w-full max-w-7xl flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/2 p-4">
          <h3 className="mb-4 flex items-center gap-2 text-xl font-semibold">
            <MessagesSquare className="h-5 w-5 text-[#5865F2]" />
            Join our Discord Community
          </h3>
          <DiscordCommunity />
        </div>
        
        <div className="w-full md:w-1/2 p-4">
          <h3 className="mb-4 flex items-center gap-2 text-xl font-semibold">
            <Newspaper className="h-5 w-5 text-[#FF6719]" />
            Subscribe to our Newsletter
          </h3>
          <div className="flex justify-center md:justify-start">
            <iframe 
              src="https://meetjs.substack.com/embed" 
              width="100%" 
              height="320" 
              style={{ border: '1px solid #EEE', background: 'white' }} 
              frameBorder="0" 
              scrolling="no"
              title="meet.js Newsletter"
              className="max-w-[480px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
