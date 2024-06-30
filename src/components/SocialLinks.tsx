import Link from 'next/link';
import {
	FaDiscord,
	FaFacebook,
	FaGithub,
	FaLinkedin,
	FaSquareXTwitter,
} from 'react-icons/fa6';

export const SocialLinks = () => {
	return (
		<ul className="flex items-center gap-4 p-4 text-xl md:gap-2">
			<li>
				<Link href="/facebook" target="_blank">
					<FaFacebook />
					<span className="sr-only">Facebook</span>
				</Link>
			</li>
			<li>
				<Link href="/linkedin" target="_blank">
					<FaLinkedin />
					<span className="sr-only">Linkedin</span>
				</Link>
			</li>
			<li>
				<Link href="/x" target="_blank">
					<FaSquareXTwitter />
					<span className="sr-only">X</span>
				</Link>
			</li>
			<li>
				<Link href="/discord" target="_blank">
					<FaDiscord />
					<span className="sr-only">Discord</span>
				</Link>
			</li>
			<li>
				<Link href="/github" target="_blank">
					<FaGithub />
					<span className="sr-only">Github</span>
				</Link>
			</li>
		</ul>
	);
};
