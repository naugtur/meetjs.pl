import type { DetailedHTMLProps, HTMLAttributes } from 'react';

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      geolocation: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- T is required for interface merging
  interface ButtonHTMLAttributes<T> {
    autolocate?: string;
  }
}
