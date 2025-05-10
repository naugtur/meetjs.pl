# Official [meet.js](https://meetjs.pl) website repository

Website for meet.js community.

## Stack

- [Next.js 15 (app router)](https://nextjs.org/docs)
- [React 19](https://react.dev/) with [React Compiler RC](https://react.dev/blog/2025/04/21/react-compiler-rc)
- [TypeScript](https://www.typescriptlang.org/docs)
- [Tailwindcss](https://tailwindcss.com/docs)

## Development

1. Clone the repository `git clone git@github.com:naugtur/meetjs.pl.git`
2. Enter the repository `cd meetjs.pl`
3. Install dependencies `pnpm install`
4. Setup env variables `cp .env.example .env`
5. Run development server `pnpm dev`
6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Security

- For basic security all lifecycle scripts are disabled in .npmrc (also supported by pnpm) and in case the setting is not respected, `preinstall-always-fail` will error out to warn you.
- Socket.dev warnings on PRs are enabled for the repo.

## City Status Configuration

The meet.js community is present in multiple cities across Poland. Each city status can be configured in:

```
src/content/cities.tsx
```

City statuses include:
- **active**: Currently organizing meetups (Białystok, Gdańsk, Kraków, Łódź, Lublin, Poznań, Warszawa, Wrocław)
- **coming-soon**: Planning to start meetups soon (Katowice)
- **paused**: Temporarily inactive (Bielsko-Biała, Kielce, Szczecin, Toruń)
- **typescript**: Special marker for TypeScript events (Gdańsk)

## Promo Banners: How to Add or Edit a Promo

To add, edit, or remove promotional banners (e.g., for events or discounts), edit the file:

```
src/content/promos.ts
```

Below is an example of how multiple promo banners appear on the site:

![Example of multiple promo banners in meet.js website navigation, showing CityJS Athens, JSConf CFP, and Crossweb 2024 banners](docs/promo-banners-example.png)

Each promo is an object in the exported `promos` array. Example of a current promo:

```ts
import { Promo } from '../components/PromoBanners';

export const promos: Promo[] = [
	{
		id: 'react-universe-2025', // Unique string identifier
		message: 'React Universe Conf 2025: 10% off with code meet.js10!', // Banner message
		cta: '👉 Get Discount', // Call-to-action text
		link: 'https://ti.to/RUC/react-universe-conf-2025/discount/meet.js10', // Link for CTA
		eventLink: 'https://react-universe.org', // Link to event website
		expiresAt: '2025-09-02T23:59:59+02:00', // Expiry date (ISO format)
		description: 'React Universe is the largest React conference in Central Europe...', // Full description
		gradient: 'bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500', // Optional Tailwind gradient class
		icon: '🪐', // Optional emoji or icon (left side)
		emojiRight: '🇵🇱', // Optional emoji (right side)
		country: 'Poland', // Event country
		city: 'Wrocław', // Event city
	},
	// Add more promos as needed
];
```

**Field descriptions:**

- `id` (string): Unique identifier for the promo (required)
- `message` (string): The text shown in the banner (required)
- `cta` (string): The call-to-action button text (required)
- `link` (string): URL for the CTA button (required)
- `expiresAt` (string): Expiration date/time in ISO 8601 format (required)
- `gradient` (string): Tailwind CSS gradient class for background (optional)
- `icon` (string): Emoji or icon on the left (optional)
- `emojiRight` (string): Emoji or icon on the right (optional)

**After editing promos.ts, save and reload the page to see your changes.**
