import Link from 'next/link';
import { jobOffers } from '@/data/offers';
import { JobOfferCard } from '@/components/JobOfferCard';

export const JobsSection = () => {
  // Show up to 2 most recent job offers
  const featuredJobs = jobOffers.slice(0, 2);

  return (
    <section className="w-full bg-gradient-to-br from-slate-50 to-gray-100 py-16">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="mb-8 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900">
            💼 Junior Developer Opportunities
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Discover entry-level positions from companies that invest in junior developers
          </p>
        </div>

        {featuredJobs.length > 0 ? (
          <>
            <div className="mb-8 space-y-6">
              {featuredJobs.map((offer) => (
                <JobOfferCard key={offer.id} offer={offer} />
              ))}
            </div>
            
            <div className="text-center">
              <Link
                href="/jobs"
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
              >
                View All Opportunities
                <span>→</span>
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center">
            <div className="mx-auto mb-6 max-w-md rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
              <div className="mb-4 text-4xl">🚀</div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900">
                Looking for Junior Developers?
              </h3>
              <p className="mb-4 text-gray-600">
                We help connect talented junior developers with companies that provide mentorship and growth opportunities.
              </p>
              <div className="space-y-3">
                <Link
                  href="/jobs"
                  className="block rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-blue-700"
                >
                  Explore Jobs Page
                </Link>
                <a
                  href="mailto:contact@meetjs.pl"
                  className="block rounded-lg border border-gray-300 px-4 py-2 font-semibold text-gray-700 transition-colors hover:bg-gray-50"
                >
                  Post a Job
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
