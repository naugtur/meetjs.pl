import { fileURLToPath } from 'node:url';
import { defineVitestProject } from '@nuxt/test-utils/config';
import { defaultExclude, defineConfig } from 'vitest/config';

const rootDir = fileURLToPath(new URL('.', import.meta.url)).replace(/\/$/, '');
const exclude = [
  ...defaultExclude,
  '.kilo/**',
  '.nuxt/**',
  '.output/**',
  '.parity/**',
];

export default defineConfig({
  test: {
    projects: [
      // Framework-agnostic code (src/) and server utilities, in Node
      {
        resolve: {
          alias: [{ find: /^~~\//, replacement: `${rootDir}/` }],
        },
        test: {
          name: 'unit',
          environment: 'node',
          include: ['src/**/*.test.ts', 'server/**/*.test.ts'],
          exclude,
        },
      },
      // Vue components, in a Nuxt app (auto-imports, plugins, Tolgee)
      await defineVitestProject({
        test: {
          name: 'nuxt',
          environment: 'nuxt',
          include: ['app/**/*.test.ts'],
          exclude,
          setupFiles: ['./src/setupTests.ts'], // jest-dom matchers
          environmentOptions: {
            nuxt: {
              domEnvironment: 'happy-dom',
              // Bundled translations only (no Tolgee API calls in tests)
              overrides: {
                runtimeConfig: { public: { tolgeeApiKey: '' } },
              },
            },
          },
        },
      }),
    ],
  },
});
