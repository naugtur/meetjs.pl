interface CityBannerProps {
  city: string;
  background: string;
}

export const CityBanner = ({ city, background }: CityBannerProps) => {
  return (
    <section
      className="flex flex-col items-center justify-center bg-cover bg-center p-28"
      style={{ backgroundImage: `url(${background})` }}
    >
      <h1 className="text-6xl font-bold text-white drop-shadow-lg">{city}</h1>
    </section>
  );
};
