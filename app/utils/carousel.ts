import type { InjectionKey, Ref } from 'vue';
import type { EmblaCarouselType } from 'embla-carousel';

export interface CarouselContext {
  carouselRef: Ref<HTMLElement | undefined>;
  api: Ref<EmblaCarouselType | undefined>;
  orientation: 'horizontal' | 'vertical';
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: Ref<boolean>;
  canScrollNext: Ref<boolean>;
}

export const CAROUSEL_CONTEXT: InjectionKey<CarouselContext> =
  Symbol('carousel');

export const useCarousel = () => {
  const context = inject(CAROUSEL_CONTEXT, null);
  if (!context) throw new Error('useCarousel must be used within <UiCarousel>');
  return context;
};
