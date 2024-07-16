import type { ReactNode } from 'react';

interface CityLayoutProps {
	children: ReactNode;
}

const CityLayout = ({ children }: CityLayoutProps) => {
	return (
		<main className="mx-auto flex max-w-7xl flex-col justify-between px-2 sm:px-6 md:flex-row lg:px-8">
			<div className="p-4">{children}</div>
		</main>
	);
};

export default CityLayout;
