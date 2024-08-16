import { FaFacebook, FaMeetup } from 'react-icons/fa6';
import Link from 'next/link';
import Image from 'next/image';

interface LocalGroupProps {
	localGroups: string[];
}

const detectIcon = (link: string) => {
	if (link.includes('meetup.com')) {
		return (
			<>
				<span className="sr-only">Meetup group</span>
				<FaMeetup className="h-12 w-12" />
			</>
		);
	}

	if (link.includes('lu.ma')) {
		return (
			<>
				<span className="sr-only">Luma group</span>
				<Image src="/luma.svg" alt="Luma logo" width={50} height={50} />
			</>
		);
	}

	if (link.includes('facebook.com')) {
		return (
			<>
				<span className="sr-only">Facebook group</span>
				<FaFacebook className="h-10 w-10" />
			</>
		);
	}
};

export const LocalGroups = ({ localGroups }: LocalGroupProps) => {
	return (
		<section className="flex flex-col items-center justify-center gap-4 p-8">
			<h2 className="text-center text-2xl font-bold">Join our local groups</h2>
			<div className="flex gap-2">
				{localGroups.map((localGroup) => (
					<Link
						href={localGroup}
						key={localGroup}
						className="flex items-center justify-center gap-1"
					>
						{detectIcon(localGroup)}
					</Link>
				))}
			</div>
		</section>
	);
};
