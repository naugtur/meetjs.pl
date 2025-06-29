import { RankingBanner } from '@/components/RankingBanner';
import { AwardNomination } from '@/components/AwardNomination';
import { Instagram, MessagesSquare } from 'lucide-react';

export const HeroSection = () => {
  return (
    <header className="relative grid h-96 bg-[url('/conference.jpg')] bg-cover text-center text-white md:h-[35rem]">
      <div className="col-start-1 row-start-1 h-full w-full bg-gray-800 bg-opacity-70"></div>

      <RankingBanner
        href="https://crossweb.pl/blog/ranking-najpopularniejsze-wydarzenia-podcasty-wideo-cykle-w-crossweb-w-2024/"
        text="🏆 #1 Tech Event Series in Poland (Crossweb 2024)"
      />

      <div className="col-start-1 row-start-1 mx-auto my-auto">
        <h1 className="-rotate-2 bg-blue p-2 text-6xl font-bold">meet.js</h1>
        <h2 className="p-4 text-xl font-medium">
          JavaScript meetups in Poland
        </h2>

        <div className="mt-6 flex justify-center gap-4">
          <a
            href="https://instagram.com/meet.js_poland"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm backdrop-blur-sm transition-all hover:bg-white/30"
          >
            <Instagram className="h-4 w-4" />
            Follow us
          </a>
          <a
            href="https://discord.gg/8r9XKTeNW8"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full bg-[#5865F2] px-4 py-2 text-sm transition-all hover:bg-[#4752C4] hover:shadow-md"
          >
            <MessagesSquare className="h-4 w-4" />
            Join Discord
          </a>
        </div>

        <AwardNomination />
      </div>
    </header>
  );
};
