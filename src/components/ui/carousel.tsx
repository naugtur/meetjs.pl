import {
  createContext,
  createEffect,
  createSignal,
  omit,
  onCleanup,
  onSettled,
  useContext,
  type ParentProps,
} from 'solid-js';
import { isServer } from '@solidjs/web';
import type { JSX } from '@solidjs/web';
import EmblaCarousel from 'embla-carousel';
import type {
  EmblaCarouselType,
  EmblaOptionsType as EmblaOptions,
  EmblaPluginType as EmblaPlugin,
} from 'embla-carousel';
import { ArrowLeft, ArrowRight } from '@/lib/lucide';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

type CarouselApi = EmblaCarouselType;

type CarouselProps = {
  opts?: Partial<EmblaOptions> | (() => Partial<EmblaOptions>);
  plugins?: EmblaPlugin[] | (() => EmblaPlugin[]);
  orientation?: 'horizontal' | 'vertical';
  setApi?: (api: CarouselApi) => void;
};

type CarouselContextProps = {
  carouselRef: (el: HTMLElement | undefined) => void;
  api: () => CarouselApi | undefined;
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: () => boolean;
  canScrollNext: () => boolean;
} & Required<Pick<CarouselProps, 'orientation'>>;

const CarouselContext = createContext<CarouselContextProps>();

function useCarousel() {
  const context = useContext(CarouselContext);
  if (!context) {
    throw new Error('useCarousel must be used within a <Carousel />');
  }
  return context;
}

const Carousel = (
  props: ParentProps<JSX.HTMLAttributes<HTMLDivElement> & CarouselProps>,
) => {
  const rest = omit(
    props,
    'orientation',
    'opts',
    'plugins',
    'setApi',
    'class',
    'children',
  );
  const orientation = () => props.orientation ?? 'horizontal';

  const [api, setApi] = createSignal<CarouselApi>();
  let rootEl: HTMLElement | undefined;
  const carouselRef = (el: HTMLElement | undefined) => {
    rootEl = el;
  };

  onSettled(() => {
    if (isServer || !rootEl) return;
    const embla = EmblaCarousel(
      rootEl,
      {
        ...(typeof props.opts === 'function' ? props.opts() : props.opts),
        axis: orientation() === 'horizontal' ? 'x' : 'y',
      },
      (typeof props.plugins === 'function' ? props.plugins() : props.plugins) ??
        [],
    );
    setApi(() => embla);
    onCleanup(() => embla.destroy());
  });

  const [canScrollPrev, setCanScrollPrev] = createSignal(false);
  const [canScrollNext, setCanScrollNext] = createSignal(false);

  const onSelect = (emblaApi: CarouselApi) => {
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  };

  const scrollPrev = () => api()?.scrollPrev();
  const scrollNext = () => api()?.scrollNext();

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      scrollPrev();
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      scrollNext();
    }
  };

  createEffect(api, (emblaApi) => {
    if (isServer || !emblaApi) return;
    if (props.setApi) props.setApi(emblaApi);
    onSelect(emblaApi);
    emblaApi.on('reInit', onSelect);
    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  });

  return (
    <CarouselContext
      value={{
        carouselRef,
        api,
        orientation: orientation(),
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
      }}
    >
      <div
        onKeyDown={handleKeyDown}
        class={cn('relative', props.class)}
        role="region"
        aria-roledescription="carousel"
        {...rest}
      >
        {props.children}
      </div>
    </CarouselContext>
  );
};

const CarouselContent = (
  props: ParentProps<JSX.HTMLAttributes<HTMLDivElement>>,
) => {
  const { carouselRef, orientation } = useCarousel();
  const rest = omit(props, 'class', 'children');
  return (
    <div ref={carouselRef} class="overflow-hidden">
      <div
        class={cn(
          'flex',
          orientation === 'horizontal' ? '-ml-4' : '-mt-4 flex-col',
          props.class,
        )}
        {...rest}
      >
        {props.children}
      </div>
    </div>
  );
};

const CarouselItem = (
  props: ParentProps<JSX.HTMLAttributes<HTMLDivElement>>,
) => {
  const { orientation } = useCarousel();
  const rest = omit(props, 'class', 'children');
  return (
    <div
      role="group"
      aria-roledescription="slide"
      class={cn(
        'min-w-0 shrink-0 grow-0 basis-full',
        orientation === 'horizontal' ? 'pl-4' : 'pt-4',
        props.class,
      )}
      {...rest}
    >
      {props.children}
    </div>
  );
};

const CarouselPrevious = (
  props: JSX.ButtonHTMLAttributes<HTMLButtonElement>,
) => {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel();
  const rest = omit(props, 'class');
  return (
    <Button
      variant="outline"
      size="icon"
      class={cn(
        'absolute h-8 w-8 rounded-full',
        orientation === 'horizontal'
          ? '-left-12 top-1/2 -translate-y-1/2'
          : '-top-12 left-1/2 -translate-x-1/2 rotate-90',
        props.class,
      )}
      disabled={!canScrollPrev()}
      onClick={scrollPrev}
      {...rest}
    >
      <ArrowLeft class="h-4 w-4" />
      <span class="sr-only">Previous slide</span>
    </Button>
  );
};

const CarouselNext = (props: JSX.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const { orientation, scrollNext, canScrollNext } = useCarousel();
  const rest = omit(props, 'class');
  return (
    <Button
      variant="outline"
      size="icon"
      class={cn(
        'absolute h-8 w-8 rounded-full',
        orientation === 'horizontal'
          ? '-right-12 top-1/2 -translate-y-1/2'
          : '-bottom-12 left-1/2 -translate-x-1/2 rotate-90',
        props.class,
      )}
      disabled={!canScrollNext()}
      onClick={scrollNext}
      {...rest}
    >
      <ArrowRight class="h-4 w-4" />
      <span class="sr-only">Next slide</span>
    </Button>
  );
};

export {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
};
