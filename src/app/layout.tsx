import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import type { ReactNode } from 'react';
import { ThemeProvider } from '@/components/theme-provider';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';

const montserrat = Montserrat({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-montserrat',
});

export const metadata: Metadata = {
	metadataBase: new URL('https://meetjs.pl'),
	title: 'meet.js',
	description: 'JavaScript meetups in Poland',
	openGraph: {
		title: 'meet.js',
		description: 'JavaScript meetups in Poland',
		type: 'website',
		locale: 'en_US',
		url: 'https://meetjs.pl',
		siteName: 'meet.js',
		images: [
			{
				url: 'https://meetjs.pl/og-image.png',
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
				url: 'https://meetjs.pl/og-image.png',
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
			</body>
		</html>
	);
};

export default RootLayout;
