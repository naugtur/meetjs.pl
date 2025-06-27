import Link from 'next/link';
import Image from 'next/image';

export const AwardNomination = () => {
	return (
		<Link
			href="/jsnation-award"
			className="mx-auto mt-8 block text-center transition-transform hover:scale-105"
		>
			<Image
				src="/javascript-os-award-2025.png"
				alt="JavaScript OS Award 2025 - Community of the Year"
				width={250}
				height={85}
				className="mx-auto"
			/>
		</Link>
	);
};
