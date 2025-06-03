import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Promos & Marketing Events | meet.js',
	description:
		'Special offers, discounts, and marketing events for the meet.js community.',
	openGraph: {
		title: 'Promos & Marketing Events | meet.js',
		description:
			'Special offers, discounts, and marketing events for the meet.js community.',
		url: 'https://meetjs.pl/promos',
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

export default function PromosLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <>{children}</>;
}
