import { PartnersCarousel } from '@/components/PartnersCarousel';

export const PartnersSection = () => {
  return (
    <section className="w-full bg-purple p-12">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-11 px-2 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl font-bold text-white">
          Our partners
        </h2>
        <PartnersCarousel />
      </div>
    </section>
  );
};
