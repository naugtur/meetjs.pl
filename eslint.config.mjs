import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';
import prettierConfig from 'eslint-config-prettier';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTypescript,
  prettierConfig,
  globalIgnores([
    '.next/**',
    'out/**',
    'dist/**',
    'build/**',
    '.vercel/**',
    'next-env.d.ts',
  ]),
]);

export default eslintConfig;
