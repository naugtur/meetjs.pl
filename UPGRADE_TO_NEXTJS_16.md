# Next.js 16 Beta Upgrade Summary

## Date
October 10, 2025

## Changes Made

### 1. Package Updates
- **Next.js**: `15.5.4` → `16.0.0-beta.0`
- **@next/mdx**: `15.5.4` → `16.0.0-beta.0`
- **eslint-config-next**: `15.5.4` → `16.0.0-beta.0`
- **Added**: `@eslint/eslintrc@^3.3.1` (for ESLint flat config compatibility)

### 2. Configuration Changes

#### next.config.ts
- **React Compiler**: Moved from `experimental.reactCompiler` to top-level `reactCompiler`
  - In Next.js 16, React Compiler is now stable and no longer experimental
  - Configuration remains the same: `{ compilationMode: 'annotation' }`

#### tsconfig.json
- **JSX Transform**: Updated from `preserve` to `react-jsx`
  - Next.js 16 uses the React automatic runtime by default
  - This change was automatically applied by Next.js during type generation

#### ESLint Configuration Migration
- **Migrated from**: `.eslintrc.json` (legacy format)
- **Migrated to**: `eslint.config.mjs` (ESLint 9 flat config)
- **Why**: ESLint 8 reached end-of-life on October 5, 2024. Next.js 15+ supports ESLint 9.
- **Key changes**:
  - Added proper ignore patterns for generated files (.next, node_modules, etc.)
  - **Using official Next.js approach**: `compat.config({ extends: ['next/core-web-vitals', 'next/typescript', 'prettier'] })`
    - Uses `FlatCompat` from `@eslint/eslintrc` for compatibility
    - Includes React, React Hooks, Next.js, and TypeScript rules
    - Follows the official Next.js documentation pattern
  - Maintained all existing rules and plugins
  - Upgraded `eslint-plugin-react-hooks` to v5.0.0 (comes with Next.js 15+)

#### tailwind.config.ts
- **Import Style**: Changed from `require()` to ES module import
  - Before: `plugins: [require('tailwindcss-animate')]`
  - After: `import tailwindcssAnimate from 'tailwindcss-animate'` and `plugins: [tailwindcssAnimate]`
  - Required for ESLint 9 compatibility

### 3. Verification Steps Completed
✅ Type generation successful (`pnpm typegen`)
✅ Linting passes with no errors (`pnpm lint`)
✅ All tests pass (`pnpm test` - 7/7 tests passing)
✅ Production build successful (`pnpm build`)

### 4. Known Warnings
- Turbopack build warning about dynamic import in `/src/app/api/og/route.tsx`
  - This is a non-critical warning and doesn't affect functionality
  - Related to OG image generation

## Key Features in Next.js 16

Based on the [Next.js 16 beta announcement](https://nextjs.org/blog/next-16-beta):

1. **React Compiler (Stable)**: Now stable and enabled by default in our config
2. **Turbopack**: Improved build performance
3. **Enhanced Developer Experience**: Better error messages and debugging
4. **Performance Improvements**: Faster builds and runtime optimizations
5. **ESLint 9 Support**: Full support for ESLint 9 (ESLint 8 reached EOL on Oct 5, 2024)
   - Next.js provides backwards compatibility with ESLint 8 if needed
   - Automatic `ESLINT_USE_FLAT_CONFIG=false` escape hatch for gradual migration
   - We've fully migrated to the new flat config format

## Breaking Changes Addressed

1. **React Compiler Configuration**: Moved from experimental to stable
2. **ESLint 9 Support**: Migrated to flat config format
3. **JSX Transform**: Updated to use React automatic runtime

## Next Steps

- Monitor the application in development mode for any runtime issues
- Test all critical user flows
- Keep an eye on Next.js 16 beta updates and changelog
- Plan to upgrade to stable Next.js 16 when released

## Important: `next lint` Removed in Next.js 16

**`next lint` has been deprecated in Next.js 15.5 and removed in Next.js 16.**

From the [Next.js 15.5 announcement](https://nextjs.org/blog/next-15-5#next-lint-deprecation):
> Starting with Next.js 15.5, the `next lint` command shows a deprecation warning and will be removed in Next.js 16.

### Migration

We've updated our scripts to use `eslint` directly:

```json
{
  "scripts": {
    "lint": "eslint",      // Instead of "next lint"
    "lint:fix": "eslint --fix"
  }
}
```

This is why the `ignores` array in `eslint.config.mjs` is **mandatory** - there's no `next lint` wrapper to auto-ignore build directories anymore.

## References

- [Next.js 16 Beta Announcement](https://nextjs.org/blog/next-16-beta)
- [Next.js 15.5 - next lint Deprecation](https://nextjs.org/blog/next-15-5#next-lint-deprecation)
- [ESLint Flat Config with Next.js Discussion](https://github.com/vercel/next.js/discussions/49337)
- [ESLint Migration Guide](https://eslint.org/docs/latest/use/configure/migration-guide)
- [Next.js ESLint Plugin PR #82969](https://github.com/vercel/next.js/pull/82969)

## Rollback Instructions

If needed, rollback by:
1. `pnpm add next@15.5.4 @next/mdx@15.5.4 eslint-config-next@15.5.4`
2. Restore `.eslintrc.json` from git history
3. Delete `eslint.config.mjs`
4. Revert `next.config.ts` changes (move reactCompiler back to experimental)
5. Revert `tailwind.config.ts` to use require()
