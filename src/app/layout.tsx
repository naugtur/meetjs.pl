import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import type { ReactNode } from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';

const montserrat = Montserrat({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-montserrat',
});

export const metadata: Metadata = {
	title: 'meet.js',
	description: 'Official website of meet.js',
};

const RootLayout = ({
	children,
}: Readonly<{
	children: ReactNode;
}>) => {
	return (
		<html lang="en" className={montserrat.variable}>
			<body className="font-montserrat">
				<Navigation />
				{children}
				<Footer />
			</body>
		</html>
	);
};

export default RootLayout;
