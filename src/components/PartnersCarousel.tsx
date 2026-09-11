import Autoplay from 'embla-carousel-autoplay';
import { For } from 'solid-js';
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
      <CarouselContent class="items-center">
        <For each={PARTNERS}>
          {(partner) => (
            <CarouselItem class="basis-full md:basis-1/6">
              <a
                href={partner.href}
                class="flex items-center justify-center"
                target="_blank"
                rel="noopener"
              >
                <img
                  src={partner.src}
                  alt={partner.alt}
                  width={114}
                  height={48}
                  class="h-auto max-h-12 w-auto max-w-[114px] object-contain"
                />
              </a>
            </CarouselItem>
          )}
        </For>
      </CarouselContent>
    </Carousel>
  );
};
