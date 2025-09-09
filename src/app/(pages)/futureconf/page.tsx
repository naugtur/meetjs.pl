import Link from 'next/link';
import Image from 'next/image';
import { Calendar, MapPin, ExternalLink, Star } from 'lucide-react';

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
                className="inline-flex items-center rounded-lg bg-white px-8 py-4 text-lg font-semibold text-purple-600 transition-all hover:scale-105 hover:bg-purple-50"
              >
                Get Group Discount
                <ExternalLink className="ml-2 h-5 w-5" />
              </a>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-300">
                  Up to 50% OFF
                </div>
                <div className="text-sm text-purple-100">
                  with group discount system
                </div>
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
                <strong>
                  International Cultural Centre on the Main Square
                </strong>
                . The theme of Future 2025 is{' '}
                <strong>&ldquo;AI in Production&rdquo;</strong>.
              </p>
              <p>
                The agenda features a mix of topics: from ML/AI to security and
                practical AI production use cases. This is your chance to learn
                from industry experts and discover tools that can transform your
                work.
              </p>
              <p>
                Future is not just about technology talks — it&apos;s an
                opportunity to network with people who really matter in the
                industry and discover tools that can change your way of working.
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
                <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-purple-600 font-bold text-white">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Visit the Special Link
                  </h3>
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
                <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-purple-600 font-bold text-white">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Buy Your Ticket
                  </h3>
                  <p className="text-gray-600">Purchase your Future ticket</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-purple-600 font-bold text-white">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Share with Friends
                  </h3>
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

        {/* Hero Image Section */}
        <div className="mt-16">
          <div className="relative overflow-hidden rounded-2xl">
            <Image
              src="https://futureconf.tech/assets/rozek.webp"
              alt="FutureConf 2024 Conference Atmosphere"
              width={1200}
              height={320}
              className="h-64 w-full object-cover sm:h-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            <div className="absolute bottom-6 left-6 text-white">
              <p className="text-lg font-semibold">Experience the Energy</p>
              <p className="text-sm opacity-90">
                Join hundreds of AI enthusiasts in Kraków
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
              {
                name: 'Vladimir Alekseichenko',
                role: 'ML/AI Trainer & Mentor',
                company: 'DataWorkshop',
                image: 'https://futureconf.tech/assets/speakers/vladimir.jpeg',
              },
              {
                name: 'Mateusz Chrobok',
                role: 'AI & Security Specialist',
                company: 'www.chrobok.eu',
                image: 'https://futureconf.tech/assets/speakers/mateusz.webp',
              },
              {
                name: 'Sacha Bron',
                role: 'Founding AI Software Engineer',
                company: 'Llamaindex',
                image: 'https://futureconf.tech/assets/speakers/sacha.jpeg',
              },
              {
                name: 'Merve Noyan',
                role: 'Open-sourceress',
                company: '🤗 Hugging Face',
                image: 'https://futureconf.tech/assets/speakers/merve.jpg',
              },
              {
                name: 'Kacper Milan',
                role: 'ML & NLP Engineer',
                company: 'Co-creator PLLuM & Bielik',
                image: 'https://futureconf.tech/assets/speakers/kacper-milan.jpeg',
              },
              {
                name: 'Bartosz Pampuch',
                role: 'C-level Manager, 17+ years experience',
                company: 'Infinity CEO, Ex-Microsoft MVP',
                image: 'https://futureconf.tech/assets/speakers/bartosz.jpeg',
              },
              {
                name: 'Kacper Łukawski',
                role: 'Developer Advocate',
                company: 'Qdrant, AI Embassy Founder',
                image: 'https://futureconf.tech/assets/speakers/kacper-lukawski.jpeg',
              },
              {
                name: 'Ziemowit Dworakowski',
                role: 'PhD, Academic Lecturer',
                company: 'AGH University of Science and Technology',
                image: 'https://futureconf.tech/assets/speakers/ziemowit.webp',
              },
              {
                name: 'Zbigniew Tenerowicz',
                role: 'Sr Staff Security Engineer & Security Lab Team Lead',
                company: 'Consensys, meet.js Poland Organizer',
                image: 'https://futureconf.tech/assets/speakers/zbigniew.jpeg',
              },
              {
                name: 'Artur Skowroński',
                role: 'Head of Java & Kotlin Engineering',
                company: 'VirtusLab',
                image: 'https://futureconf.tech/assets/speakers/artur.webp',
              },
              {
                name: 'Mateusz Jarzębowski-Bownik',
                role: 'Software Engineer',
                company: 'Box',
                image: 'https://futureconf.tech/assets/speakers/mateusz-jarzebowski-bownik.webp',
              },
              {
                name: 'Przemek Smyrdek',
                role: 'Lead Front-End Engineer, Co-founder, Educator',
                company: 'Przeprogramowani',
                image: 'https://futureconf.tech/assets/speakers/smyrdek.webp',
              },
              {
                name: 'Marcin Czarkowski',
                role: 'Front-End Tech Lead, Co-founder, Educator',
                company: 'Przeprogramowani',
                image: 'https://futureconf.tech/assets/speakers/czarkowski.webp',
              },
              {
                name: 'Paweł Gronowski',
                role: 'Senior Software Engineer',
                company: 'Docker',
                image: 'https://futureconf.tech/assets/speakers/gronowski.jpg',
              },
              {
                name: 'Jakub Banaszkiewicz',
                role: 'Data & AI Solutions Advisor',
                company: 'APN Promise',
                image: 'https://futureconf.tech/assets/speakers/kuba_b.webp',
              },
              {
                name: 'Mateusz Zapart',
                role: 'Solution Advisor in Data',
                company: 'APN Promise',
                image: 'https://futureconf.tech/assets/speakers/mateusz_z.webp',
              },
            ].map((speaker, index) => (
              <div
                key={index}
                className="rounded-lg bg-white p-6 shadow-md transition-all hover:scale-105 hover:shadow-lg"
              >
                <div className="mb-4 flex justify-center">
                  <Image
                    src={speaker.image}
                    alt={speaker.name}
                    width={80}
                    height={80}
                    className="h-20 w-20 rounded-full object-cover"
                  />
                </div>
                <div className="text-center">
                  <div className="mb-2 text-lg font-semibold text-gray-900">
                    {speaker.name}
                  </div>
                  <div className="mb-1 text-sm text-purple-600">
                    {speaker.role}
                  </div>
                  <div className="text-xs text-gray-500">{speaker.company}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center text-gray-600">
            <p>
              Plus specialists from Przeprogramowani, VirtusLab, APN Promise,
              and more!
            </p>
          </div>
        </div>

        {/* Photo Gallery Preview */}
        <div className="mt-16">
          <h2 className="mb-8 text-center text-3xl font-bold text-gray-900">
            FutureConf 2024 Highlights
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="relative overflow-hidden rounded-lg">
              <Image
                src="https://futureconf.tech/assets/photobooth/uczestnik2.webp"
                alt="Conference Speakers"
                width={400}
                height={192}
                className="h-48 w-full object-cover transition-transform hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              <div className="absolute bottom-3 left-3 text-sm font-medium text-white">
                Inspiring Speakers
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg">
              <Image
                src="https://futureconf.tech/assets/photobooth/uczestnik.webp"
                alt="Conference Attendees"
                width={400}
                height={192}
                className="h-48 w-full object-cover transition-transform hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              <div className="absolute bottom-3 left-3 text-sm font-medium text-white">
                Engaged Community
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg">
              <Image
                src="https://futureconf.tech/assets/ludzie-10.webp"
                alt="Networking"
                width={400}
                height={192}
                className="h-48 w-full object-cover transition-transform hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              <div className="absolute bottom-3 left-3 text-sm font-medium text-white">
                Networking Opportunities
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-600 p-8 text-center text-white">
          <h2 className="mb-4 text-3xl font-bold">
            Ready to Join FutureConf 2025?
          </h2>
          <p className="mb-6 text-lg text-purple-100">
            Don&apos;t miss this opportunity to learn about AI in production from
            industry experts
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href="https://futureconf.tech/meetjs/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-lg bg-white px-8 py-4 text-lg font-semibold text-purple-600 transition-all hover:scale-105 hover:bg-purple-50"
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
