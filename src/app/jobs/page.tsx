import { Metadata } from 'next';
import Link from 'next/link';
import { JobOfferCard } from '@/components/JobOfferCard';
import { jobOffers } from '@/data/offers';

export const metadata: Metadata = {
  title: 'Junior Developer Jobs - meet.js',
  description:
    'Find junior developer opportunities curated by the meet.js community. Entry-level positions with mentorship and growth opportunities.',
  openGraph: {
    title: 'Junior Developer Jobs | meet.js',
    description:
      'Find the best junior developer positions in the JavaScript ecosystem. Curated job opportunities for aspiring developers.',
  },
};

export default function JobsPage() {
  return (
    <div className="container mx-auto max-w-4xl py-16">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-5xl font-bold tracking-tight">
          💼 Junior Developer Jobs
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          Find your next opportunity in the JavaScript ecosystem. Curated
          positions for aspiring developers.
        </p>
      </div>

      <div className="mb-12">
        <h2 className="mb-6 text-2xl font-semibold">
          🚀 Why Junior Developers?
        </h2>
        <div className="mb-6 space-y-4">
          <p>
            Starting your career in tech can be challenging. We&apos;ve curated this
            list of junior-friendly positions to help you find opportunities
            that value your potential and are committed to your growth.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-lg border border-green-200 bg-gradient-to-br from-green-50 to-green-100 p-6 shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg">
            <h3 className="mb-2 flex items-center gap-2 font-semibold text-green-800">
              👶 Entry-Level Friendly
            </h3>
            <p className="text-sm text-green-700">
              Positions that welcome beginners and provide mentorship.
            </p>
          </div>
          <div className="rounded-lg border border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 p-6 shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg">
            <h3 className="mb-2 flex items-center gap-2 font-semibold text-blue-800">
              📚 Learning Focused
            </h3>
            <p className="text-sm text-blue-700">
              Companies that invest in your growth and development.
            </p>
          </div>
          <div className="rounded-lg border border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100 p-6 shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg">
            <h3 className="mb-2 flex items-center gap-2 font-semibold text-purple-800">
              💼 Real Opportunities
            </h3>
            <p className="text-sm text-purple-700">
              Curated listings from companies actively hiring juniors.
            </p>
          </div>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="mb-4 text-2xl font-semibold">📋 Current Openings</h2>
        <div className="space-y-6">
          {jobOffers.map((offer) => (
            <JobOfferCard key={offer.id} offer={offer} />
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="mb-4 text-sm text-gray-500">
            Updated regularly - check back often for new opportunities
          </p>
          <Link
            href="mailto:contact@meetjs.pl?subject=Junior%20Developer%20Job%20Posting"
            className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Post Your Job Here
          </Link>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="mb-6 text-2xl font-semibold">
          📚 Resources for Junior Developers
        </h2>
        <div>
          <h3 className="mb-4 text-lg font-semibold">Learning Paths</h3>
          <ul className="list-disc space-y-2 pl-6">
            <li>
              <a
                href="https://www.theodinproject.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                The Odin Project
              </a>
            </li>
            <li>
              <a
                href="https://www.freecodecamp.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                freeCodeCamp
              </a>
            </li>
            <li>
              <a
                href="https://javascript.info/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                The Modern JavaScript Tutorial
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">
          📧 Want to post a job here?
        </h2>
        <p className="mb-4">
          We&apos;re happy to help connect you with talented junior developers.
          Contact us to list your position.
        </p>
        <p>
          Reach out to us at{' '}
          <a
            href="mailto:contact@meetjs.pl?subject=Junior%20Developer%20Job%20Posting"
            className="text-blue-600 hover:underline"
          >
            contact@meetjs.pl
          </a>
        </p>
      </div>
    </div>
  );
}
