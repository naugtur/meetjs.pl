import type { DetailedHTMLProps, HTMLAttributes } from 'react';

declare global {
  interface HTMLGeolocationElement extends HTMLElement {
    readonly position: GeolocationPosition | null;
    readonly error: GeolocationPositionError | null;
  }
}

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      geolocation: DetailedHTMLProps<
        HTMLAttributes<HTMLElement> & {
          autolocate?: string;
          watch?: string;
        },
        HTMLGeolocationElement
      >;
    }
  }
}
