import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';
import { Montserrat } from 'next/font/google';
import './globals.css';
import type { ReactNode } from 'react';
import { ThemeProvider } from '@/components/theme-provider';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { env } from '@/env';

const montserrat = Montserrat({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-montserrat',
});

export const metadata: Metadata = {
	metadataBase: new URL(env.SITE_URL),
	title: 'meet.js',
	description: 'JavaScript meetups in Poland',
	openGraph: {
		title: 'meet.js',
		description: 'JavaScript meetups in Poland',
		type: 'website',
		locale: 'en_US',
		url: env.SITE_URL,
		siteName: 'meet.js',
		images: [
			{
				url: `${env.SITE_URL}/og-image.png`,
				width: 1200,
				height: 630,
				alt: 'meet.js | JavaScript meetups in Poland',
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		site: '@meetjs',
		title: 'meet.js',
		description: 'JavaScript meetups in Poland',
		images: [
			{
				url: `${env.SITE_URL}/og-image.png`,
				width: 1200,
				height: 630,
				alt: 'meet.js | JavaScript meetups in Poland',
			},
		],
	},
};

const RootLayout = ({
	children,
}: Readonly<{
	children: ReactNode;
}>) => {
	return (
		<html
			lang="en"
			className={`${montserrat.variable} scroll-smooth`}
			suppressHydrationWarning
		>
			<body>
				<ThemeProvider
					attribute="class"
					defaultTheme="light"
					enableSystem
					disableTransitionOnChange
				>
					<Navigation />
					{children}
					<Footer />
				</ThemeProvider>
				<Analytics />
			</body>
		</html>
	);
};

export default RootLayout;
