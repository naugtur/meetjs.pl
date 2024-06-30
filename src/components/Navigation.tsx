import { Logo } from '@/components/Logo';
import Link from 'next/link';
import { SocialLinks } from '@/components/SocialLinks';

export const Navigation = () => {
	return (
		<nav className="sticky top-0 bg-purple">
			<div className="mx-auto flex max-w-7xl items-center justify-between">
				<Link href="/">
					<Logo />
				</Link>

				<ul className="flex justify-between gap-4">
					<li>
						<Link href="/#events">events</Link>
					</li>
					<li>
						<Link href="/#about">about</Link>
					</li>
					<li>
						<Link href="/#contact">contact</Link>
					</li>
				</ul>

				<SocialLinks />
			</div>
		</nav>
	);
};
