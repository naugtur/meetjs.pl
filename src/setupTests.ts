// This file is referenced in vitest.config.ts
// It extends Vitest's expect with jest-dom matchers

import '@testing-library/jest-dom/vitest';
import type { TestingLibraryMatchers } from '@testing-library/jest-dom/matchers';

// jest-dom's bundled vitest.d.ts augments the old single-parameter
// Assertion<T> interface, which no longer merges with Vitest 5's
// Assertion<R, T>. Augment Matchers (which Assertion extends) until
// jest-dom ships compatible types.
declare module 'vitest' {
  interface Matchers<
    R extends void | Promise<void> = void | Promise<void>,
    T = unknown,
  > extends TestingLibraryMatchers<any, R> {}
}
