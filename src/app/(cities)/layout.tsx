import type { ReactNode } from 'react';

interface CityLayoutProps {
	children: ReactNode;
}

const CityLayout = ({ children }: CityLayoutProps) => {
	return (
		<main className="mx-auto flex max-w-7xl flex-col justify-between md:flex-row lg:px-8">
			<div className="flex w-full flex-col">{children}</div>
		</main>
	);
};

export default CityLayout;
