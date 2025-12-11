import { notFound } from 'next/navigation';

interface SpeakersYearPageProps {
  params: Promise<{
    year: string;
  }>;
}

const VALID_YEARS = ['2021', '2022', '2023', '2024', '2025'];

export async function generateStaticParams() {
  return VALID_YEARS.map((year) => ({
    year,
  }));
}

export async function generateMetadata({ params }: SpeakersYearPageProps) {
  const { year } = await params;

  if (!VALID_YEARS.includes(year)) {
    return {
      title: 'Not Found | meet.js',
    };
  }

  return {
    title: `Speakers ${year} | meet.js`,
    description: `Meet the speakers from meet.js events in ${year}`,
  };
}

export default async function SpeakersYearPage({ params }: SpeakersYearPageProps) {
  const { year } = await params;

  if (!VALID_YEARS.includes(year)) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
          🎤 Speakers {year}
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
          Meet the amazing speakers from meet.js events in {year}
        </p>
      </div>

      <div className="mt-12">
        <div className="rounded-lg bg-purple/10 p-8 text-center">
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Coming soon! This page will showcase all the speakers from {year}.
          </p>
        </div>
      </div>
    </div>
  );
}

