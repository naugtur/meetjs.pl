import Link from 'next/link';
import Image from 'next/image';
import crosswebImag3 from '../../public/crossweb-logo.svg';

export const EventsAPIPartner = () => {
	return (
		<div className="flex flex-col items-center justify-center md:flex-row">
			<p>Events API powered by</p>
			<Link href="https://crossweb.pl" className="pl-2" target="_blank">
				<Image
					src={crosswebImag3}
					alt="crossweb where IT meets"
					width={96}
					height={23.34}
				/>
			</Link>
		</div>
	);
};
