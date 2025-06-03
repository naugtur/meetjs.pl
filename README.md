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

## Discount Banners & Special Offers: How to Add or Edit

To add, edit, or remove promotional banners and discount offers, edit the appropriate files:

**For Software & Tools Discounts:**
```
src/content/software-discounts.ts
```

**For Events & Conferences Discounts:**
```
src/content/discounts.ts
```

Below is an example of how multiple discount banners appear on the site:

![Example of multiple discount banners in meet.js website navigation, showing CityJS Athens, JSConf CFP, and Crossweb 2024 banners](docs/promo-banners-example.png)

Each discount is an object in the exported `discounts` or `softwareDiscounts` array. Example of a current discount:

```ts
import { Promo } from '@/types/promo';

export const discounts: Promo[] = [
	{
		id: 'react-universe-2025', // Unique string identifier
		message: 'React Universe Conf 2025: 10% off with code meet.js10!', // Banner message
		cta: '👉 Get Discount', // Call-to-action text
		ticketLink: 'https://ti.to/RUC/react-universe-conf-2025/discount/meet.js10', // Link for CTA
		eventLink: 'https://react-universe.org', // Link to event website
		expiresAt: '2025-09-02T23:59:59+02:00', // Expiry date (ISO format)
		description:
			'React Universe is the largest React conference in Central Europe...', // Full description
		gradient: 'bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500', // Optional Tailwind gradient class
		icon: '🪐', // Optional emoji or icon (left side)
		emojiRight: '🇵🇱', // Optional emoji (right side)
		country: 'Poland', // Event country
		city: 'Wrocław', // Event city
		discountCode: 'meet.js10', // Optional discount code
	},
	// Add more discounts as needed
];
```

**Field descriptions:**

- `id` (string): Unique identifier for the discount (required)
- `message` (string): The text shown in the banner (required)
- `cta` (string): The call-to-action button text (required)
- `ticketLink` (string): URL for the CTA button (required)
- `expiresAt` (string): Expiration date/time in ISO 8601 format (required)
- `gradient` (string): Tailwind CSS gradient class for background (optional)
- `icon` (string): Emoji or icon on the left (optional)
- `emojiRight` (string): Emoji or icon on the right (optional)

### Contact for Discounts

If you're organizing an event, conference, or offering software tools and would like to provide discounts to the meet.js community, please reach out to us at **contact@meetjs.pl**. We're always happy to feature relevant offers that benefit our developer community.

**After editing discounts.ts or software-discounts.ts, save and reload the page to see your changes.**

## Brand Assets and Wallpapers

The website includes a dedicated section for brand assets and wallpapers that can be easily downloaded and used by the community.

You can access the brand assets page at:

```
https://meetjs.pl/brand
```

### Official Brand Assets Repository

The complete collection of meet.js brand assets is available in the official GitHub repository:

```
https://github.com/meetjspl/brand-assets
```

This repository contains:

- Multiple logo variants (SVG, PNG)
- Monochrome versions (black, white)
- Square logo variants
- Logos with tagline
- High-resolution print versions
- Wallpapers in various resolutions
- Social media assets

### Adding Assets to the Website

To add or update brand assets on the website:

1. Place new logo files in `public/brand/logos/`
2. Place new wallpaper files in `public/brand/wallpapers/`
3. Update the assets list in `src/app/brand/page.tsx`

Each asset should include:

- Name
- File path
- Description
- Dimensions (for wallpapers)
- File size

### Brand Colors

#### Current Colors (Post-2023)

The current official meet.js brand colors are:

- Purple: `#2B1932` / rgb(43, 25, 50) - Primary background color
- Green: `#BCD35D` / rgb(188, 211, 93) - Accent color for highlights and CTAs
- Blue: `#219EAB` / rgb(33, 158, 171) - Secondary accent color

#### Original Colors

The original meet.js brand colors were:

- Purple: `#2B1C34` / rgb(43, 28, 52) - Primary background color
- Green: `#BDDB59` / rgb(189, 219, 89) - Accent color for highlights and CTAs
- Blue: `#249FAB` / rgb(36, 159, 171) - Secondary accent color
