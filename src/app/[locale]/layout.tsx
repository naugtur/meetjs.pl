import type { Metadata } from 'next';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Montserrat } from 'next/font/google';
import '../globals.css';
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
	title: 'meet.js - JavaScript Meetups in Poland',
	description: 'Join the largest JavaScript community in Poland. Regular meetups, expert talks, networking opportunities and knowledge sharing.',
	applicationName: 'meet.js',
	keywords: ['JavaScript', 'meetup', 'Poland', 'programming', 'web development', 'tech events'],
	authors: [{ name: 'meet.js community' }],
	creator: 'meet.js',
	publisher: 'meet.js',
	formatDetection: {
		email: false,
		address: false,
		telephone: false,
	},
	robots: {
		index: true,
		follow: true,
		nocache: true,
		googleBot: {
			index: true,
			follow: true,
			noimageindex: false,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1,
		},
	},
	icons: {
		icon: '/favicon.ico',
		shortcut: '/favicon.ico',
		apple: '/apple-touch-icon.png',
		other: [
			{
				rel: 'apple-touch-icon-precomposed',
				url: '/apple-touch-icon-precomposed.png',
			},
		],
	},
	openGraph: {
		title: 'meet.js - JavaScript Meetups in Poland',
		description: 'Join the largest JavaScript community in Poland. Regular meetups, expert talks, networking opportunities and knowledge sharing.',
		type: 'website',
		locale: 'en_US',
		url: env.SITE_URL,
		siteName: 'meet.js',
		images: [{
				url: `${env.SITE_URL}/og-image.png`,
				width: 1200,
				height: 630,
				alt: 'meet.js | JavaScript meetups in Poland',
				type: 'image/png',
		}],
	},
	twitter: {
		card: 'summary_large_image',
		site: '@meetjs',
		creator: '@meetjs',
		title: 'meet.js - JavaScript Meetups in Poland',
		description: 'Join the largest JavaScript community in Poland. Regular meetups, expert talks, networking opportunities and knowledge sharing.',
		images: [{
				url: `${env.SITE_URL}/og-image.png`,
				width: 1200,
				height: 630,
				alt: 'meet.js | JavaScript meetups in Poland',
		}],
	},
	alternates: {
		canonical: env.SITE_URL,
	},
	verification: {
		google: 'google-site-verification',
		yandex: 'yandex-verification',
		yahoo: 'yahoo-verification',
	},
	category: 'technology',
};

const RootLayout = async ({
	children,
	params,
}: Readonly<{
	children: ReactNode;
	params: Promise<{ locale: string }>;
}>) => {
	const { locale } = await params;
	if (!hasLocale(routing.locales, locale)) {
		notFound();
	}

	const messages = (await import(`../../../messages/${locale}.json`)).default;

	return (
		<html
			lang={locale}
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
					<NextIntlClientProvider locale={locale} messages={messages}>
						{children}
					</NextIntlClientProvider>
					<Footer />
				</ThemeProvider>
				<Analytics />
				<SpeedInsights />
			</body>
		</html>
	);
};

export default RootLayout;
