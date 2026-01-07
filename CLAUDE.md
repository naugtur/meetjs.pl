# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Setup
```bash
pnpm install           # Install dependencies
pnpm prepare          # Setup git hooks (husky + lint-staged)
cp .env.example .env  # Copy environment variables
```

### Development Server
```bash
pnpm dev              # Start Next.js development server with Turbopack (default)
pnpm dev:webpack      # Start with webpack instead of Turbopack
```

### Building
```bash
pnpm build            # Production build with Turbopack (default)
pnpm build:webpack    # Production build with webpack
pnpm start            # Start production server
```

### Code Quality
```bash
pnpm lint             # Run ESLint
pnpm lint:fix         # Fix ESLint issues automatically
pnpm prettier         # Format all files with Prettier
pnpm typegen          # Generate Next.js typed routes and run TypeScript compiler
```

### Testing
```bash
pnpm test             # Run Vitest tests once
pnpm test:watch       # Run Vitest in watch mode
```

### Internationalization (Tolgee)
```bash
pnpm tolgee:pull      # Pull translations from Tolgee
pnpm tolgee:push      # Push translations to Tolgee
pnpm tolgee:sync      # Sync translations bidirectionally
```

## Architecture Overview

### Tech Stack
- **Next.js 15** (App Router) with Turbopack
- **React 19** with React Compiler RC
- **TypeScript** with strict configuration
- **Tailwind CSS** for styling
- **Tolgee** for i18n (English & Polish)
- **Vitest** for testing
- **Zod** for runtime validation

### Project Structure

```
src/
├── app/                       # Next.js App Router pages
│   ├── (pages)/              # Route group for main pages
│   ├── (cities)/             # Route group for city-specific pages
│   ├── layout.tsx            # Root layout with Tolgee provider
│   └── page.tsx              # Homepage
├── components/               # React components
│   ├── Navigation/           # Navigation components
│   └── ui/                   # shadcn/ui components
├── content/                  # Content configuration files
│   ├── cities.tsx           # City definitions and map positions
│   ├── events-discounts.ts  # Conference/event discount data
│   ├── software-discounts.ts # Software tool discount data
│   ├── learning-discounts.ts # Learning platform discount data
│   ├── communityParticipation.ts # Community surveys/initiatives
│   ├── additionalEvents.ts  # Static event data
│   └── partners.tsx         # Partner/sponsor data
├── tolgee/                   # Tolgee i18n configuration
│   ├── shared.ts            # Base Tolgee config
│   ├── server.tsx           # Server-side instance
│   ├── client.tsx           # Client-side provider
│   └── language.ts          # Language management
├── types/                    # TypeScript type definitions
├── utils/                    # Utility functions
├── hooks/                    # Custom React hooks
└── env.ts                    # Environment variable validation (T3 Env)

messages/
├── en.json                   # English translations
└── pl.json                   # Polish translations
```

### Key Architectural Patterns

#### Next.js App Router Structure
- **Route Groups**: `(pages)` and `(cities)` group routes without affecting URLs
- **Server Components by default**: Most components are Server Components for better performance
- **Client Components**: Marked with `'use client'` directive (e.g., interactive forms, animations)
- **Typed Routes**: Enabled via `typedRoutes: true` in next.config.ts

#### Internationalization with Tolgee
- **Server Components**: Use `await getTranslate()` from `@/tolgee/server`
- **Client Components**: Use `useTranslate()` hook from `@tolgee/react`
- **Translation keys**: Organized by section (e.g., `navigation.home`, `hero.title`)
- **Static data fallback**: Translation files in `messages/` for development without API key
- **In-context editing**: Hold Alt + click on text to edit translations

#### Content Management
All promotional content, discounts, and community initiatives are configured via TypeScript files in `src/content/`:
- Discount banners automatically hide after expiry date
- Type-safe with Zod schemas
- Support for gradients, icons, and metadata

#### Events Data Flow
1. Events fetched from external API (configured via `EVENTS_API_URL`)
2. Validated with Zod schema (`EventsSchema`)
3. Cached for 1 hour (`revalidate: 3600`)
4. Merged with static additional events
5. Rendered in `EventCard` components

#### Environment Variables
- Validated using `@t3-oss/env-nextjs` in `src/env.ts`
- Runtime validation with Zod schemas
- Server-only variables: `EVENTS_API_URL`, `SITE_URL`, `DISCORD_SERVER_ID`
- Public variables: `NEXT_PUBLIC_TOLGEE_API_KEY`, `NEXT_PUBLIC_TOLGEE_API_URL`

#### Styling Approach
- Tailwind CSS with custom configuration
- shadcn/ui components in `src/components/ui/`
- Utility function `cn()` for conditional class merging (`clsx` + `tailwind-merge`)
- Safelist for dynamic gradient classes (see `tailwind.config.ts`)

#### Pre-commit Hooks
- Husky runs lint-staged on commit
- Prettier formats staged files automatically
- Configured in `.lintstagedrc`

## Important Development Notes

### Security
- Lifecycle scripts disabled in `.npmrc`
- `preinstall-always-fail` package prevents accidental script execution
- Socket.dev warnings enabled on PRs

### React Compiler
- Enabled in "annotation" mode (`reactCompiler.compilationMode: 'annotation'`)
- Only compiles functions/components with `"use memo"` or `"use forget"` directives

### Node Version
- Minimum: Node 22+, npm 10.8+, pnpm 9.4+
- Managed via `.tool-versions` (asdf) and `.nvmrc`

### Adding New Discounts/Promotions
Edit the appropriate content file and add an object to the exported array:
- `src/content/events-discounts.ts` - Conferences/events
- `src/content/software-discounts.ts` - Software tools
- `src/content/learning-discounts.ts` - Learning platforms

Required fields: `id`, `message`, `cta`, `ticketLink`, `expiresAt`
Optional: `gradient`, `icon`, `emojiRight`, `discountCode`

### Adding Community Participation Items
Edit `src/content/communityParticipation.ts` and add to `COMMUNITY_PARTICIPATION` array.
Set `status: 'active'` and `featured: true` to display on homepage.

### Adding New Cities
Edit `src/content/cities.tsx`:
1. Add city object to `CITIES` array with map coordinates
2. Create corresponding route folder in `src/app/(cities)/city-name/`
3. Set status: `'active'`, `'paused'`, `'coming-soon'`, or `'new'`

### Working with Translations
- Always add translation keys to both `messages/en.json` and `messages/pl.json`
- Use descriptive, namespaced keys (e.g., `hero.title`, not just `title`)
- Server components: `const t = await getTranslate(); t('key')`
- Client components: `const { t } = useTranslate(); t('key')`

### Testing Components
- Tests use Vitest with React Testing Library
- Configuration in `vitest.config.ts`
- Setup file: `src/setupTests.ts` for jest-dom matchers
- Path alias `@/` resolves to `src/`

### Remote Image Domains
When using external images, add the domain to `next.config.ts` under `images.remotePatterns`.
