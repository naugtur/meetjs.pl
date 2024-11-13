import { Logo } from '@/components/Logo';
import { SocialLinks } from '@/components/SocialLinks';
import Link from 'next/link';
import { instagramLinksData } from '@/content/socialLinks';
import { CITIES } from '@/content/cities';
import { menuLinks } from '@/content/menuLinks';
import { FaRegEnvelope } from 'react-icons/fa6';

export const Footer = () => {
	return (
		<footer className="bg-purple text-white">
			<div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
				<div className="grid grid-cols-1 gap-8 md:grid-cols-3">
					{/* First column */}
					<div className="space-y-8">
						<Logo />
						<SocialLinks />
						<ul className="space-y-4">
							{instagramLinksData.map((socialLink) => (
								<li key={socialLink.name}>
									<a href={socialLink.url} target="_blank" className="flex items-center gap-2 hover:text-gray-300">
										{socialLink.icon}
										<span>{socialLink.name}</span>
									</a>
								</li>
							))}
							<li>
								<Link href="mailto:contact@meetjs.pl" className="flex items-center gap-2 hover:text-gray-300">
									<FaRegEnvelope />
									contact@meetjs.pl
								</Link>
							</li>
						</ul>
					</div>

					{/* Cities column */}
					<div>
						<h3 className="text-xl font-semibold">Cities</h3>
						<ul className="mt-4 space-y-2">
							{CITIES.map((city) => (
								<li key={city.name}>
									<Link href={city.href} className="hover:text-gray-300">{city.name}</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Menu column */}
					<div>
						<h3 className="text-xl font-semibold">Menu</h3>
						<ul className="mt-4 space-y-2">
							{menuLinks.map((link) => (
								<li key={link.name}>
									<Link href={link.href} className="hover:text-gray-300">{link.name}</Link>
								</li>
							))}
							<li>
								<Link href="https://berlincodeofconduct.org/" className="hover:text-gray-300">
									code of conduct
								</Link>
							</li>
						</ul>
					</div>
				</div>

				{/* Copyright */}
				<div className="mt-12 border-t border-white/10 pt-8">
					<p className="text-center">© {new Date().getFullYear()} meet.js. All rights reserved.</p>
				</div>
			</div>
		</footer>
	);
};
