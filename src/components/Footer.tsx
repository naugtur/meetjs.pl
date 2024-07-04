import { Logo } from '@/components/Logo';
import { SocialLinks } from '@/components/SocialLinks';
import Link from 'next/link';
import { FaInstagram } from 'react-icons/fa6';

const navigationLinks = [
	{ name: 'events', href: '#', current: false },
	{ name: 'about', href: '#', current: false },
	{ name: 'contact', href: '#', current: false },
];

export const Footer = () => {
	return (
		<footer className="bg-purple">
			<div className="mx-auto flex max-w-7xl flex-col justify-between px-2 sm:px-6 md:flex-row lg:px-8">
				<section className="flex flex-col">
					<Logo />
					<SocialLinks />
					<ul className="flex flex-col items-start justify-center gap-4 px-4 text-xl md:gap-2">
						<li>
							<Link
								href="/instagram-bialystok"
								target="_blank"
								className="flex items-center justify-center gap-2"
							>
								<FaInstagram />
								<span>Białystok</span>
							</Link>
						</li>
						<li>
							<Link
								href="/instagram-poznan"
								target="_blank"
								className="flex items-center justify-center gap-2"
							>
								<FaInstagram />
								<span>Poznań</span>
							</Link>
						</li>
						<li>
							<Link
								href="/instagram-wroclaw"
								target="_blank"
								className="flex items-center justify-center gap-2"
							>
								<FaInstagram />
								<span>Wrocław</span>
							</Link>
						</li>
					</ul>

					<p className="p-4">
						© {new Date().getFullYear()} meet.js. All rights reserved.
					</p>
				</section>
				<section className="p-4">
					<h3 className="pb-4 text-2xl font-bold">Cities</h3>
					<ul className="flex flex-col gap-2">
						<li>Białystok</li>
						<li>Bielsko-Biała</li>
						<li>Gdańsk</li>
						<li>Katowice</li>
						<li>Kielce</li>
						<li>Kraków</li>
						<li>Łódź</li>
						<li>Lublin</li>
						<li>Poznań</li>
						<li>Warszawa</li>
						<li>Wrocław</li>
					</ul>
				</section>
				<section className="p-4">
					<h3 className="pb-4 text-2xl font-bold">Menu</h3>
					<ul className="flex flex-col gap-2">
						{navigationLinks.map((link) => (
							<li key={link.name}>
								<Link href={link.href}>{link.name}</Link>
							</li>
						))}
					</ul>
				</section>
				<section></section>
			</div>
		</footer>
	);
};
