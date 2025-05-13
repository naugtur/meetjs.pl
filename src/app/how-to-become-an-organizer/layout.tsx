import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'How to become an organizer | meet.js',
	description: 'How to become an organizer for meet.js.',
	openGraph: {
		title: 'How to become an organizer | meet.js',
		description: 'How to become an organizer for meet.js.',
		url: 'https://meetjs.pl/how-to-become-an-organizer',
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

export default function HowToBecomeAnOrganizerLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <>{children}</>;
}
