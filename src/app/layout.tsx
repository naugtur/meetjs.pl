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
	title: 'meet.js',
	description: 'Official website of meet.js',
};

const RootLayout = ({
	children,
}: Readonly<{
	children: ReactNode;
}>) => {
	return (
		<html lang="en" className={montserrat.variable} suppressHydrationWarning>
			<body>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
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
