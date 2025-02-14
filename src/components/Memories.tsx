'use client';

import { useState } from 'react';
import Link from 'next/link';

export const Memories = () => {
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) return null;

    return (
        <div
            className="fixed bottom-0 left-0 right-0 mx-4 mb-4 max-w-full rounded-lg bg-black/80 p-4 text-left backdrop-blur-sm md:fixed md:bottom-0 md:left-0 md:right-0 md:mx-0 md:mb-0 md:rounded-none md:px-8 md:py-4 z-10 hover:bg-black/90 transition-colors"
            role="complementary"
            aria-label="Memories invitation"
        >
            <button
                onClick={() => setIsVisible(false)}
                className="absolute right-2 top-2 p-1 text-gray-400 hover:text-white transition-colors md:right-4 md:top-1/2 md:-translate-y-1/2"
                aria-label="Close memories box"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
            </button>
            <div className="md:container md:mx-auto md:flex md:items-center md:justify-between">
                <h2 className="mb-2 text-xl font-bold tracking-tight md:mb-0">Share Your meet.js Memories!</h2>
                <p className="text-sm leading-relaxed text-gray-200 md:ml-4">
                    We&apos;re collecting photos and stories from past meet.js events. Check out our 👉{' '}
                    <Link href="/memories" className="font-medium text-blue-400 hover:text-blue-300 transition-colors">
                        memories page
                    </Link>{' '}
                    for more information.
                </p>
            </div>
        </div>
    );
};
