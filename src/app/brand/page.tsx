import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { FaGithub, FaDownload } from 'react-icons/fa6';

export const metadata: Metadata = {
	title: 'Brand Assets | meet.js',
	description:
		'Download meet.js brand assets, logos, and wallpapers for your use.',
};

type AssetItem = {
	name: string;
	path: string;
	description?: string;
	dimensions?: string;
	fileSize?: string;
};

type ColorItem = {
	name: string;
	hex: string;
	rgb: string;
	description?: string;
};

const BrandPage = () => {
	const currentLogos: AssetItem[] = [
		// Bold Variants
		{
			name: 'meet.js Bold Logo (Color SVG)',
			path: '/assets/brand/logo/bold/meetjs_logo_color_bold.svg',
			description: 'Bold variant with color for digital use',
			fileSize: '2.5 KB',
		},
		{
			name: 'meet.js Bold Logo (White SVG)',
			path: '/assets/brand/logo/bold/meetjs_logo_white_bold.svg',
			description: 'Bold variant with white text for dark backgrounds',
			fileSize: '2.5 KB',
		},
		{
			name: 'meet.js Bold Logo (White Alt SVG)',
			path: '/assets/brand/logo/bold/meetjs_logo_white2_bold.svg',
			description: 'Alternative bold variant with white text',
			fileSize: '2.4 KB',
		},
		{
			name: 'meet.js Bold Logo (Color PNG)',
			path: '/assets/brand/logo/bold/logo_meetjs_color_bold.png',
			description: 'Bold variant with color in PNG format',
			fileSize: '24 KB',
		},
		{
			name: 'meet.js Bold Logo (White PNG)',
			path: '/assets/brand/logo/bold/logo_meetjs_white_bold.png',
			description: 'Bold variant with white text in PNG format',
			fileSize: '24 KB',
		},
		{
			name: 'meet.js Bold Logo (White Alt PNG)',
			path: '/assets/brand/logo/bold/logo_meetjs_white2_bold.png',
			description: 'Alternative bold variant with white text in PNG format',
			fileSize: '23 KB',
		},

		// Light/Default Variants
		{
			name: 'meet.js Light Logo (Color SVG)',
			path: '/assets/brand/logo/light-default/meetjs_logo_color_light.svg',
			description: 'Light variant with color for digital use',
			fileSize: '2.4 KB',
		},
		{
			name: 'meet.js Light Logo (White SVG)',
			path: '/assets/brand/logo/light-default/meetjs_logo_white_light.svg',
			description: 'Light variant with white text for dark backgrounds',
			fileSize: '2.4 KB',
		},
		{
			name: 'meet.js Light Logo (White Alt SVG)',
			path: '/assets/brand/logo/light-default/meetjs_logo_white2_light.svg',
			description: 'Alternative light variant with white text',
			fileSize: '2.3 KB',
		},
		{
			name: 'meet.js Light Logo (Color PNG)',
			path: '/assets/brand/logo/light-default/logo_meetjs_color_light.png',
			description: 'Light variant with color in PNG format',
			fileSize: '24 KB',
		},
		{
			name: 'meet.js Light Logo (White PNG)',
			path: '/assets/brand/logo/light-default/logo_meetjs_white_light.png',
			description: 'Light variant with white text in PNG format',
			fileSize: '23 KB',
		},
		{
			name: 'meet.js Light Logo (White Alt PNG)',
			path: '/assets/brand/logo/light-default/logo_meetjs_white2_light.png',
			description: 'Alternative light variant with white text in PNG format',
			fileSize: '22 KB',
		},

		// Square Variants
		{
			name: 'meet.js Square Logo (Light Variant 1)',
			path: '/assets/brand/logo/square m.js varant/meetjs_logo_color_Light_XS-01.svg',
			description: 'Square light variant for small spaces and icons',
			fileSize: '1.4 KB',
		},
		{
			name: 'meet.js Square Logo (Light Variant 2)',
			path: '/assets/brand/logo/square m.js varant/meetjs_logo_color_Light_XS-02.svg',
			description: 'Alternative square light variant',
			fileSize: '1.5 KB',
		},
		{
			name: 'meet.js Square Logo (Bold Variant 1)',
			path: '/assets/brand/logo/square m.js varant/meetjs_logo_color_bold_XS-01.svg',
			description: 'Square bold variant for small spaces and icons',
			fileSize: '1.6 KB',
		},
		{
			name: 'meet.js Square Logo (Bold Variant 2)',
			path: '/assets/brand/logo/square m.js varant/meetjs_logo_color_bold_XS-02.svg',
			description: 'Alternative square bold variant',
			fileSize: '1.7 KB',
		},
	];

	const legacyLogos: AssetItem[] = [
		// Pre-2023 Variants
		{
			name: 'meet.js Legacy Logo (Purple SVG)',
			path: '/assets/brand/pre-2023/logo/meetjs-logo-purple.svg',
			description: 'Original pre-2023 logo with purple background',
			fileSize: '3 KB',
		},
		{
			name: 'meet.js Legacy Logo (White SVG)',
			path: '/assets/brand/pre-2023/logo/meetjs-logo-white.svg',
			description: 'Original pre-2023 logo with white background',
			fileSize: '3 KB',
		},
		{
			name: 'meet.js Legacy Logo (Purple PNG)',
			path: '/assets/brand/pre-2023/logo/meetjs-logo-purple.png',
			description:
				'Original pre-2023 logo with purple background in PNG format',
			fileSize: '27 KB',
		},
		{
			name: 'meet.js Legacy Logo (White PNG)',
			path: '/assets/brand/pre-2023/logo/meetjs-logo-white.png',
			description: 'Original pre-2023 logo with white background in PNG format',
			fileSize: '25 KB',
		},
	];

	const wallpapers: AssetItem[] = [
		{
			name: 'meet.js Desktop Wallpaper',
			path: '/brand/wallpapers/meetjs-wallpaper-1920x1080.png',
			description: 'Desktop wallpaper with meet.js branding',
			dimensions: '1920 × 1080',
			fileSize: '42 KB',
		},
		{
			name: 'meet.js Cover Image',
			path: '/brand/wallpapers/meetjs_cover.jpeg',
			description: 'Cover image for social media and presentations',
			dimensions: 'Widescreen',
			fileSize: '268 KB',
		},
	];

	const currentColors: ColorItem[] = [
		{
			name: 'Purple',
			hex: '#2B1932',
			rgb: 'rgb(43, 25, 50)',
			description: 'Primary background color',
		},
		{
			name: 'Green',
			hex: '#BCD35D',
			rgb: 'rgb(188, 211, 93)',
			description: 'Accent color for highlights and CTAs',
		},
		{
			name: 'Blue',
			hex: '#219EAB',
			rgb: 'rgb(33, 158, 171)',
			description: 'Secondary accent color',
		},
	];

	const originalColors: ColorItem[] = [
		{
			name: 'Purple',
			hex: '#2B1C34',
			rgb: 'rgb(43, 28, 52)',
			description: 'Primary background color',
		},
		{
			name: 'Green',
			hex: '#BDDB59',
			rgb: 'rgb(189, 219, 89)',
			description: 'Accent color for highlights and CTAs',
		},
		{
			name: 'Blue',
			hex: '#249FAB',
			rgb: 'rgb(36, 159, 171)',
			description: 'Secondary accent color',
		},
	];

	return (
		<div className="container mx-auto px-4 py-12">
			<div className="mb-12 text-center">
				<h1 className="mb-4 text-4xl font-bold">meet.js Brand Assets</h1>
				<p className="mx-auto mb-6 max-w-3xl text-xl">
					Download official meet.js logos, wallpapers, and other brand assets
					for your use. Feel free to use these assets when referencing meet.js
					in your content.
				</p>
				<div className="flex justify-center">
					<a
						href="https://github.com/meetjspl/brand-assets"
						target="_blank"
						rel="noopener noreferrer"
						className="flex items-center gap-2 rounded-md bg-purple px-6 py-3 text-white transition-colors hover:bg-purple/90"
					>
						<FaGithub className="text-xl" />
						<span>View all assets on GitHub</span>
					</a>
				</div>
			</div>

			<section className="mb-16">
				<h2 className="mb-6 border-b pb-2 text-3xl font-bold">Brand Colors</h2>

				<h3 className="mb-4 text-2xl font-bold">Current Colors (Post 2023)</h3>
				<div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-3">
					{currentColors.map((color) => (
						<div
							key={color.name}
							className="overflow-hidden rounded-lg border shadow-sm transition-shadow hover:shadow-md"
						>
							<div
								className="h-32"
								style={{ backgroundColor: color.hex }}
							></div>
							<div className="p-4">
								<h3 className="text-lg font-bold">{color.name}</h3>
								<p className="mt-1 text-gray-600">{color.description}</p>
								<div className="mt-2 space-y-1">
									<p className="font-mono text-sm">HEX: {color.hex}</p>
									<p className="font-mono text-sm">RGB: {color.rgb}</p>
								</div>
							</div>
						</div>
					))}
				</div>

				<div className="mb-6 rounded-lg bg-gray-50 p-4">
					<details>
						<summary className="cursor-pointer text-lg font-medium">
							Original Colors (Obsolete)
						</summary>
						<div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
							{originalColors.map((color) => (
								<div
									key={color.name}
									className="overflow-hidden rounded-lg border bg-white shadow-sm"
								>
									<div
										className="h-24"
										style={{ backgroundColor: color.hex }}
									></div>
									<div className="p-3">
										<h3 className="text-base font-medium">{color.name}</h3>
										<div className="mt-1 space-y-1 text-sm">
											<p className="font-mono">HEX: {color.hex}</p>
											<p className="font-mono">RGB: {color.rgb}</p>
										</div>
									</div>
								</div>
							))}
						</div>
					</details>
				</div>
			</section>

			<section className="mb-16">
				<h2 className="mb-6 border-b pb-2 text-3xl font-bold">Logos</h2>
				<h3 className="mb-4 text-2xl font-bold">Current Logos (Post 2023)</h3>
				<div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
					{currentLogos.map((logo) => (
						<div
							key={logo.name}
							className="overflow-hidden rounded-lg border shadow-sm transition-shadow hover:shadow-md"
						>
							<div className="flex h-48 items-center justify-center bg-gray-100 p-6">
								<Image
									src={logo.path}
									alt={logo.name}
									width={200}
									height={100}
									className="max-h-full w-auto"
								/>
							</div>
							<div className="p-4">
								<div className="flex items-center justify-between">
									<h3 className="text-lg font-bold">{logo.name}</h3>
									<span className={`ml-2 rounded px-2 py-0.5 text-xs font-bold ${logo.path.toLowerCase().endsWith('.svg') ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
										{logo.path.toLowerCase().endsWith('.svg') ? 'SVG' : 'PNG'}
									</span>
								</div>
								{logo.description && (
									<p className="mt-1 text-gray-600">{logo.description}</p>
								)}
								{logo.fileSize && (
									<p className="mt-1 text-sm text-gray-500">
										Size: {logo.fileSize}
									</p>
								)}
								<a
									href={logo.path}
									download
									className="mt-3 inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
								>
									<FaDownload />
									<span>Download</span>
								</a>
							</div>
						</div>
					))}
				</div>

				<div className="mb-6 rounded-lg bg-gray-50 p-4">
					<details>
						<summary className="cursor-pointer text-lg font-medium">
							Legacy Logos (Obsolete)
						</summary>
						<div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
							{legacyLogos.map((logo) => (
								<div
									key={logo.name}
									className="overflow-hidden rounded-lg border bg-white shadow-sm"
								>
									<div className="flex h-40 items-center justify-center bg-gray-100 p-4">
										<Image
											src={logo.path}
											alt={logo.name}
											width={160}
											height={80}
											className="max-h-full w-auto"
										/>
									</div>
									<div className="p-3">
										<div className="flex items-center justify-between">
											<h3 className="text-base font-medium">{logo.name}</h3>
											<span className={`ml-2 rounded px-1.5 py-0.5 text-xs font-bold ${logo.path.toLowerCase().endsWith('.svg') ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
												{logo.path.toLowerCase().endsWith('.svg') ? 'SVG' : 'PNG'}
											</span>
										</div>
										{logo.description && (
											<p className="mt-1 text-sm text-gray-600">
												{logo.description}
											</p>
										)}
										{logo.fileSize && (
											<p className="mt-1 text-xs text-gray-500">
												Size: {logo.fileSize}
											</p>
										)}
										<a
											href={logo.path}
											download
											className="mt-2 inline-flex items-center gap-1 rounded-md bg-blue-600 px-3 py-1 text-sm text-white transition-colors hover:bg-blue-700"
										>
											<FaDownload className="text-xs" />
											<span>Download</span>
										</a>
									</div>
								</div>
							))}
						</div>
					</details>
				</div>
				<div className="mt-8 rounded-lg bg-gray-100 p-6">
					<h3 className="mb-3 text-xl font-bold">Additional Logo Variants</h3>
					<p className="mb-4">
						The complete collection of meet.js logo variants is available in the
						GitHub repository, including:
					</p>
					<ul className="mb-4 list-disc space-y-2 pl-5">
						<li>Standard logo (SVG, PNG)</li>
						<li>Monochrome versions (black, white)</li>
						<li>Square logo variants</li>
						<li>Logo with tagline</li>
						<li>High-resolution print versions</li>
					</ul>
					<a
						href="https://github.com/meetjspl/brand-assets"
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center gap-2 rounded-md bg-purple px-4 py-2 text-white transition-colors hover:bg-purple/90"
					>
						<FaGithub />
						<span>Get all logo variants</span>
					</a>
				</div>
			</section>

			<section className="mb-16">
				<h2 className="mb-6 border-b pb-2 text-3xl font-bold">Wallpapers</h2>
				<div className="grid grid-cols-1 gap-8 md:grid-cols-2">
					{wallpapers.map((wallpaper) => (
						<div
							key={wallpaper.name}
							className="overflow-hidden rounded-lg border shadow-sm transition-shadow hover:shadow-md"
						>
							<div className="relative flex h-64 items-center justify-center bg-gray-100 p-4">
								<Image
									src={wallpaper.path}
									alt={wallpaper.name}
									fill
									className="object-contain"
								/>
							</div>
							<div className="p-4">
								<div className="flex items-center justify-between">
									<h3 className="text-lg font-bold">{wallpaper.name}</h3>
									<span className={`ml-2 rounded px-2 py-0.5 text-xs font-bold ${wallpaper.path.toLowerCase().endsWith('.png') ? 'bg-blue-100 text-blue-800' : wallpaper.path.toLowerCase().endsWith('.jpeg') || wallpaper.path.toLowerCase().endsWith('.jpg') ? 'bg-yellow-100 text-yellow-800' : 'bg-purple-100 text-purple-800'}`}>
										{wallpaper.path.toLowerCase().endsWith('.png') ? 'PNG' : 
										 wallpaper.path.toLowerCase().endsWith('.jpeg') || wallpaper.path.toLowerCase().endsWith('.jpg') ? 'JPEG' : 
										 wallpaper.path.split('.').pop()?.toUpperCase()}
									</span>
								</div>
								{wallpaper.description && (
									<p className="mt-1 text-gray-600">{wallpaper.description}</p>
								)}
								{wallpaper.dimensions && (
									<p className="mt-1 text-sm text-gray-500">
										Dimensions: {wallpaper.dimensions}
									</p>
								)}
								{wallpaper.fileSize && (
									<p className="mt-1 text-sm text-gray-500">
										Size: {wallpaper.fileSize}
									</p>
								)}
								<a
									href={wallpaper.path}
									download
									className="mt-3 inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
								>
									<FaDownload />
									<span>Download</span>
								</a>
							</div>
						</div>
					))}
				</div>
			</section>

			<section className="mb-16">
				<h2 className="mb-6 border-b pb-2 text-3xl font-bold">
					Usage Guidelines
				</h2>
				<div className="prose max-w-none">
					<p>
						When using meet.js brand assets, please follow these guidelines:
					</p>
					<ul>
						<li>Do not modify the logo or change its colors</li>
						<li>Maintain adequate spacing around the logo</li>
						<li>
							Do not use the meet.js logo to represent your product or service
						</li>
						<li>
							Do not use meet.js brand assets for merchandise without permission
						</li>
					</ul>
					<p className="mt-4">
						For questions about brand usage or to request additional assets,
						please contact us via{' '}
						<Link
							href="https://github.com/naugtur/meetjs.pl"
							className="text-blue-600 hover:underline"
						>
							GitHub
						</Link>
						.
					</p>
				</div>
			</section>
		</div>
	);
};

export default BrandPage;
