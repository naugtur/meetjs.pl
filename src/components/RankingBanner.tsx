interface RankingBannerProps {
  href: string;
  text: string;
}

export const RankingBanner = ({ href, text }: RankingBannerProps) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener"
      className="bg-blue absolute top-4 right-4 hidden rotate-2 px-4 py-2 shadow-lg transition-transform hover:scale-105 md:block"
    >
      <p className="text-sm font-bold">{text}</p>
    </a>
  );
};
