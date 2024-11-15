import Link from 'next/link';

export const Memories = () => {
    return (
        <div className="absolute right-4 top-20 max-w-xs rounded-lg bg-black/80 p-4 text-left backdrop-blur-sm hidden md:block z-10">
            <h2 className="mb-2 text-xl font-bold tracking-tight">Share Your meet.js Memories!</h2>
            <p className="text-sm leading-relaxed text-gray-200">
                We&apos;re collecting photos and stories from past meet.js events.
            </p>
            <p className="mt-2 text-sm leading-relaxed text-gray-200">
                Check out our 👉 <Link href="/memories" className="font-medium text-blue-400 hover:text-blue-300 transition-colors">memories page</Link> for more information.
            </p>
        </div>
    );
};
