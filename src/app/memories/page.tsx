import React from 'react';

export default function Page() {

    return (
        <div className="container mx-auto max-w-3xl py-16">
            <h1 className="text-4xl font-bold mb-8">
                Share Your Memories
            </h1>

            <div className="mb-8 space-y-4">
                <p>
                    We would love to hear from you! Share your memories and photos with us to help build the story of our community.
                </p>
                <p>
                    Send your contributions to: <a href="mailto:kamil.dzieniszewski@gmail.com" className="font-semibold">contact@example.com</a>
                </p>
                <p className="text-sm text-gray-500">
                    * By submitting materials, you agree to their free distribution and use for marketing and promotional purposes. You have the right to withdraw your consent at any time.
                </p>

            </div>
            <a
                className="mt-8 text-purple py-2 px-4 rounded bg-green dark:bg-green-500 hover:bg-green-400"
                href="mailto:contact@meetjs.pl"
            >
                Share Your Memory
            </a>
        </div>
    );
};
