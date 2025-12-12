import type { RecursivePartial, IOptions } from '@tsparticles/engine';

const snowConfig: RecursivePartial<IOptions> = {
  background: {
    color: 'transparent',
  },
  particles: {
    color: {
      value: '#fff',
    },
    move: {
      direction: 'bottom' as const,
      enable: true,
      outModes: 'out' as const,
      speed: 2,
    },
    number: {
      density: {
        enable: true,
      },
      value: 400,
    },
    opacity: {
      value: 0.7,
    },
    shape: {
      type: 'circle' as const,
    },
    size: {
      value: 5,
    },
    wobble: {
      enable: true,
      distance: 10,
      speed: 10,
    },
    zIndex: {
      value: {
        min: 0,
        max: 100,
      },
    },
  },
};

export default snowConfig;
