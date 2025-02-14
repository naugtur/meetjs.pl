'use client';

import Link from 'next/link';

export const BirthdayBanner = () => {
    return (
        <div className="bg-gradient-to-r from-pink-500 via-red-500 to-purple-500 relative z-40">
            <div className="container mx-auto px-4 py-3 text-center">
                <Link
                    href="/14-birthday"
                    className="text-white font-medium hover:opacity-90 transition-opacity inline-flex items-center gap-2"
                >
                    🎉 Today is our 14th Birthday! Join the celebration on Valentine&apos;s Day! 💝
                    <span className="underline">Learn more</span>
                </Link>
            </div>
        </div>
    );
};