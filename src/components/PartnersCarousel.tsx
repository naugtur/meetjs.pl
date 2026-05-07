'use client';

import Autoplay from 'embla-carousel-autoplay';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { PARTNERS } from '@/content/partners';

export const PartnersCarousel = () => {
  return (
    <Carousel
      opts={{
        loop: true,
      }}
      plugins={[Autoplay({ playOnInit: true, delay: 2000 })]}
    >
      <CarouselContent className="items-center">
        {PARTNERS.map((partner) => (
          <CarouselItem className="basis-full md:basis-1/6" key={partner.alt}>
            <a
              href={partner.href}
              className="flex items-center justify-center"
              target="_blank"
              rel="noopener noreferrer"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={partner.src}
                alt={partner.alt}
                width={114}
                height={48}
                className="h-auto max-h-12 w-auto max-w-[114px] object-contain"
              />
            </a>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};
