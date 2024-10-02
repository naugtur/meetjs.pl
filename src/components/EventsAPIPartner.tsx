import Link from 'next/link';
import Image from 'next/image';

export const EventsAPIPartner = () => {
	return (
		<div className="flex flex-col items-center justify-center md:flex-row">
			<p>Events API powered by</p>
			<Link href="https://crossweb.pl" className="pl-2" target="_blank">
				<Image
					src="/crossweb-logo.svg"
					alt="crossweb where IT meets"
					width={96}
					height={54}
				/>
			</Link>
		</div>
	);
};
