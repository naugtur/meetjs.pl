import Link from 'next/link';
import { socialLinksData } from '@/content/socialLinks';

export const SocialLinks = () => {
	return (
		<ul className="flex items-center gap-4 p-4 text-xl md:gap-2">
			{socialLinksData.map((socialLink) => (
				<li key={socialLink.name}>
					<Link href={socialLink.url} target="_blank">
						{socialLink.icon}
						<span className="sr-only">{socialLink.name}</span>
					</Link>
				</li>
			))}
		</ul>
	);
};
