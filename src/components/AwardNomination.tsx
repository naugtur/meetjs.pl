import Link from 'next/link';
import { Award } from 'lucide-react';

interface AwardNominationProps {
  href: string;
  text: string;
}

export const AwardNomination = ({ href, text }: AwardNominationProps) => {
  return (
    <Link
      href={href}
      className="group absolute bottom-8 left-1/2 flex -translate-x-1/2 transform items-center gap-2 rounded-full bg-green-500/90 px-4 py-2 text-white shadow-lg backdrop-blur-sm transition-all hover:bg-green-600/90 hover:scale-105 md:bottom-12"
    >
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
        <Award className="h-5 w-5 text-white" />
      </div>
      <p className="text-sm font-medium md:text-base">{text}</p>
    </Link>
  );
};
