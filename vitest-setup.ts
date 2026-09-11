// Registers @testing-library/jest-dom's matchers (toHaveTextContent etc.)
// with vitest's expect, including their types.
import '@testing-library/jest-dom/vitest';
import { afterEach } from 'vitest';
import { cleanup } from '@solidjs/testing-library';

// globals: false disables @solidjs/testing-library's auto-cleanup, so wire it
// explicitly.
afterEach(() => cleanup());
