import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Events | meet.js',
	description: 'Events for the meet.js community.',
	openGraph: {
		title: 'Events | meet.js',
		description: 'Events for the meet.js community.',
		url: 'https://meetjs.pl/events',
		siteName: 'meet.js',
		images: [
			{
				url: 'https://meetjs.pl/og-image.png',
				width: 1200,
				height: 630,
			},
		],
		locale: 'en_US',
		type: 'website',
	},
};

export default function EventsLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <>{children}</>;
}
