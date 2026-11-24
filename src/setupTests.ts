/* eslint-disable @typescript-eslint/no-empty-object-type, @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
// This file is referenced in vitest.config.ts
// It extends Vitest's expect with jest-dom matchers

import '@testing-library/jest-dom/vitest';
import type { TestingLibraryMatchers } from '@testing-library/jest-dom/matchers';

// jest-dom's bundled vitest.d.ts augments the old single-parameter
// Assertion<T> interface, which no longer merges with Vitest 5's
// Assertion<R, T>. Augment Matchers (which Assertion extends) until
// jest-dom ships compatible types.
/* eslint-disable @typescript-eslint/no-empty-object-type, @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any --
   declaration merging requires an empty body and vitest's exact type params */
declare module 'vitest' {
  interface Matchers<
    R extends void | Promise<void> = void | Promise<void>,
    T = unknown,
  > extends TestingLibraryMatchers<any, R> {}
}
/* eslint-enable @typescript-eslint/no-empty-object-type, @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
