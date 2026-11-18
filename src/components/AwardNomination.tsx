import Link from 'next/link';
import Image from 'next/image';

export const AwardNomination = () => {
  return (
    <Link
      href="/jsnation-award"
      className="block rounded-2xl text-center transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 motion-safe:hover:scale-105"
    >
      <Image
        src="/javascript-os-award-2025.png"
        alt="JavaScript OS Award 2025 - Community of the Year"
        width={250}
        height={85}
        className="mx-auto"
      />
    </Link>
  );
};
