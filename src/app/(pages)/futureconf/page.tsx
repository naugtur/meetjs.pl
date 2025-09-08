import Link from 'next/link';
import { Calendar, MapPin, Users, Zap, ExternalLink, Star } from 'lucide-react';

export default function FutureConfPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-600 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-6 inline-flex items-center rounded-full bg-white/20 px-4 py-2 text-sm font-medium backdrop-blur-sm">
              <Star className="mr-2 h-4 w-4" />
              meet.js Partnership
            </div>
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-6xl">
              FutureConf 2025
            </h1>
            <p className="mb-8 text-xl text-purple-100 sm:text-2xl">
              AI in Production
            </p>
            <div className="mb-8 flex flex-wrap justify-center gap-6 text-lg">
              <div className="flex items-center">
                <Calendar className="mr-2 h-5 w-5" />
                October 27-28, 2025
              </div>
              <div className="flex items-center">
                <MapPin className="mr-2 h-5 w-5" />
                Kraków, Poland
              </div>
            </div>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a
                href="https://futureconf.tech/meetjs/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-lg bg-white px-8 py-4 text-lg font-semibold text-purple-600 transition-all hover:bg-purple-50 hover:scale-105"
              >
                Get Group Discount
                <ExternalLink className="ml-2 h-5 w-5" />
              </a>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-300">Up to 50% OFF</div>
                <div className="text-sm text-purple-100">with group discount system</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* About the Conference */}
          <div>
            <h2 className="mb-6 text-3xl font-bold text-gray-900">
              About FutureConf 2025
            </h2>
            <div className="prose prose-lg text-gray-600">
              <p>
                A two-day conference in the heart of Kraków at the{' '}
                <strong>International Cultural Centre on the Main Square</strong>. 
                The theme of Future 2025 is <strong>"AI in Production"</strong>.
              </p>
              <p>
                The agenda features a mix of topics: from ML/AI to security and 
                practical AI production use cases. This is your chance to learn 
                from industry experts and discover tools that can transform your work.
              </p>
              <p>
                Future is not just about technology talks — it's an opportunity 
                to network with people who really matter in the industry and 
                discover tools that can change your way of working.
              </p>
            </div>
          </div>

          {/* How Group Discount Works */}
          <div className="rounded-2xl bg-gradient-to-br from-purple-100 to-indigo-100 p-8">
            <h2 className="mb-6 text-3xl font-bold text-gray-900">
              How to Get Up to 50% Off
            </h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-purple-600 text-white font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Visit the Special Link</h3>
                  <p className="text-gray-600">
                    Go to{' '}
                    <a 
                      href="https://futureconf.tech/meetjs/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-purple-600 hover:underline"
                    >
                      futureconf.tech/meetjs/
                    </a>
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-purple-600 text-white font-bold">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Buy Your Ticket</h3>
                  <p className="text-gray-600">Purchase your Future ticket</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-purple-600 text-white font-bold">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Share with Friends</h3>
                  <p className="text-gray-600">
                    Send the page to your friends. Each person who buys a ticket 
                    increases your discount up to 50%!
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-6 rounded-lg bg-yellow-100 p-4">
              <p className="text-sm text-yellow-800">
                <strong>💡 Pro tip:</strong> Buy tickets as soon as possible. 
                Prices increase month by month!
              </p>
            </div>
          </div>
        </div>

        {/* Speakers Section */}
        <div className="mt-16">
          <h2 className="mb-8 text-center text-3xl font-bold text-gray-900">
            Featured Speakers
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { name: 'Mateusz Chrobok', role: 'AI Expert' },
              { name: 'Vladimir Alekseichenko', role: 'ML Specialist' },
              { name: 'Ziemowit Dworakowski', role: 'AGH University' },
              { name: 'Merve Noyan', role: 'Hugging Face' },
              { name: 'Sacha Bron', role: 'Llamaindex' },
              { name: 'Kacper Milan', role: 'mBank' },
            ].map((speaker, index) => (
              <div
                key={index}
                className="rounded-lg bg-white p-6 shadow-md transition-shadow hover:shadow-lg"
              >
                <div className="mb-2 text-lg font-semibold text-gray-900">
                  {speaker.name}
                </div>
                <div className="text-purple-600">{speaker.role}</div>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center text-gray-600">
            <p>Plus specialists from Docker, Qdrant, Box, and more!</p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-600 p-8 text-center text-white">
          <h2 className="mb-4 text-3xl font-bold">Ready to Join FutureConf 2025?</h2>
          <p className="mb-6 text-lg text-purple-100">
            Don't miss this opportunity to learn about AI in production from industry experts
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href="https://futureconf.tech/meetjs/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-lg bg-white px-8 py-4 text-lg font-semibold text-purple-600 transition-all hover:bg-purple-50 hover:scale-105"
            >
              Get Group Discount Now
              <ExternalLink className="ml-2 h-5 w-5" />
            </a>
            <Link
              href="/discounts"
              className="inline-flex items-center text-purple-100 hover:text-white"
            >
              View All Discounts
              <ExternalLink className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
