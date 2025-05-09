import Link from 'next/link';
import { getAllOrganizers, CityOrganizers } from '@/data/organizers'; 
import { OrganizerCard } from '@/components/OrganizerCard';

export default function TeamPage() {
  const allCityOrganizers = getAllOrganizers();
  const numberOfCities = allCityOrganizers.length;
  const totalOrganizers = allCityOrganizers.reduce((acc, city) => acc + city.organizers.length, 0);
  
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-16 p-8 rounded-lg bg-slate-100 shadow-sm">
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-6 text-slate-800">Meet Our Awesome Team</h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
            Meet the amazing individuals who dedicate their time and passion to bring meet.js events to life across Poland. Our community thrives because of them!
          </p>
          <div className="flex flex-wrap justify-center gap-8 text-center">
            <div>
              <p className="text-4xl font-bold text-blue-600">{totalOrganizers}</p>
              <p className="text-sm text-slate-500">Passionate Organizers</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-blue-600">{numberOfCities}</p>
              <p className="text-sm text-slate-500">Cities Involved</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-blue-600">Poznań</p>
              <p className="text-sm text-slate-500">First Meetup City (2011)</p>
            </div>
          </div>
        </div>
      </div>

      {allCityOrganizers.map((cityData) => (
        <section key={cityData.citySlug} className="py-10 border-b-2 border-slate-200 last:mb-0 last:border-b-0">
          <div className="flex flex-col items-center justify-center mb-10">
            <h2 className="text-3xl font-bold text-slate-700">Meet the {cityData.city} Team</h2>
            <Link 
              href={`/${cityData.citySlug}`} 
              className="inline-block bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium py-2 px-4 rounded-md transition-colors duration-150 mt-3"
            >
              Visit {cityData.city} Page
            </Link>
          </div>

          {cityData.organizers.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
              {cityData.organizers.map((organizer) => (
                <OrganizerCard 
                  key={`${cityData.citySlug}-${organizer.name}`}
                  organizer={organizer} 
                  showSummitYears={true} 
                />
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-600 py-8">
              <p className="mb-2">
                {cityData.city} currently has no active organizers. Want to help?
              </p>
              <Link href="/how-to-become-an-organizer" className="text-blue-600 hover:underline font-semibold">
                Learn how to become an organizer
              </Link>
            </div>
          )}
        </section>
      ))}
    </main>
  );
}
