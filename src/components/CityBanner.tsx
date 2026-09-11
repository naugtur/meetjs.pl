interface CityBannerProps {
  city: string;
  background: string;
}

export const CityBanner = (props: CityBannerProps) => {
  return (
    <section
      class="flex flex-col items-center justify-center bg-cover bg-center p-28"
      style={{ 'background-image': `url(${props.background})` }}
    >
      <h1 class="text-6xl font-bold text-white drop-shadow-lg">{props.city}</h1>
    </section>
  );
};
