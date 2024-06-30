import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import type { ReactNode } from 'react';
import { Navigation } from '@/components/Navigation';

const montserrat = Montserrat({ subsets: ['latin'] });

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
		<html lang="en">
			<body className={montserrat.className}>
				<Navigation />
				{children}
			</body>
		</html>
	);
};

export default RootLayout;
