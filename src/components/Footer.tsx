import { Logo } from '@/components/Logo';
import { SocialLinks } from '@/components/SocialLinks';
import Link from 'next/link';
import { instagramLinksData } from '@/content/socialLinks';
import cities from '@/content/cities.json';
import { menuLinks } from '@/content/menuLinks';
import { FaRegEnvelope } from 'react-icons/fa6';

export const Footer = () => {
	return (
		<footer className="bg-purple text-white">
			<div className="mx-auto flex max-w-7xl flex-col justify-between px-2 sm:px-6 md:flex-row lg:px-8">
				<section className="flex flex-col">
					<Logo />
					<SocialLinks />
					<ul className="flex flex-col items-start justify-center gap-4 px-4 text-xl md:gap-2">
						{instagramLinksData.map((socialLink) => (
							<li key={socialLink.name}>
								<Link
									href={socialLink.url}
									target="_blank"
									className="flex items-center justify-center gap-2"
								>
									{socialLink.icon}
									<span>{socialLink.name}</span>
								</Link>
							</li>
						))}
						<li>
							<Link
								href="mailto:contact@meetjs.pl"
								className="flex items-center justify-center gap-2"
							>
								<FaRegEnvelope />
								contact@meetjs.pl
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
						{cities.map((city) => (
							<li key={city}>{city}</li>
						))}
					</ul>
				</section>
				<section className="p-4">
					<h3 className="pb-4 text-2xl font-bold">Menu</h3>
					<ul className="flex flex-col gap-2">
						{menuLinks.map((link) => (
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
