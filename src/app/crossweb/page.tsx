import Image from 'next/image';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';

const benefits = [
  {
    icon: "💠",
    text: "Proste zapisy na wydarzenia"
  },
  {
    icon: "💠",
    text: "Sprawdzenie listy uczestników dla lepszego networkingu"
  },
  {
    icon: "💠",
    text: "Automatyczne powiadomienia o kolejnych edycjach"
  },
  {
    icon: "💠",
    text: "Łatwe przeglądanie podobnych wydarzeń"
  }
];

export default function CrosswebPage() {
  return (
    <div className="min-h-scree">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-8">
            Kolejny solidny transfer! 🎉
          </h1>
          <h2 className="text-2xl md:text-3xl text-center">
            meet.js Warszawa przenosi zapisy do Crossweb
          </h2>
        </div>
      </div>

      <main className="container mx-auto px-4 pb-12">
        <div className="max-w-4xl mx-auto">
          {/* Announcement Image */}
          <div className="mb-12 rounded-lg overflow-hidden shadow-xl">
            <Image
              src="/crossweb-transfer.jpeg"
              alt="meet.js Warszawa przenosi zapisy do Crossweb"
              width={800}
              height={400}
              className="w-full"
            />
          </div>

          {/* About meet.js */}
          <div className="prose max-w-none mb-12">
            <p className="text-lg mb-8 text-gray-800">
              meet.js to jedna z najaktywniejszych społeczności technologicznych w Polsce.
              Zorganizowali już grubo ponad 400 wydarzeń w 12 miastach. Teraz, z dumą ogłaszamy
              przeniesienie systemu zapisów i obsługi uczestników do platformy Crossweb!
            </p>
          </div>

          {/* Benefits Section */}
          <section className="mb-12">
            <h3 className="text-2xl font-semibold mb-6 text-gray-900">
              Co oznacza ten transfer dla użytkowników?
            </h3>
            <div className="grid gap-4">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-6 rounded-lg shadow-md border border-gray-100"
                >
                  <span className="text-2xl">{benefit.icon}</span>
                  <p className="text-lg text-gray-800">{benefit.text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="bg-blue-50 rounded-xl p-8 text-center">
            <h4 className="text-2xl font-semibold mb-4 text-gray-900">
              Najbliższe spotkanie meet.js Warszawa
            </h4>
            <p className="text-lg mb-6 text-gray-800">
              Dołącz do nas już 15 kwietnia!
            </p>
            <Link
              href="https://crossweb.pl/wydarzenia/meetjs-warsaw-with-sii-polska-kwiecien-2025/"
              className={buttonVariants({
                className: "bg-blue-500 hover:bg-blue-60 px-8 py-4"
              })}
              target="_blank"
              rel="noopener noreferrer"
            >
              Zapisz się na wydarzenie
            </Link>
          </section>
        </div>
      </main>
    </div>
  );
}