import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

interface CityBannerProps {
	city: string;
	background: string;
}

export const CityBanner = ({ city, background }: CityBannerProps) => {
	return (
		<section
			className="flex flex-col items-center justify-center bg-cover bg-center p-28"
			style={{ backgroundImage: `url(${background})` }}
		>
			<h1 className="text-6xl font-bold text-white">{city}</h1>
			<Breadcrumb className="bg-gray-400/50 p-2">
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink href="/" className="text-white">
							Home
						</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator className="text-white" />
					<BreadcrumbItem>
						<BreadcrumbPage className="font-bold text-white">
							{city}
						</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>
		</section>
	);
};
