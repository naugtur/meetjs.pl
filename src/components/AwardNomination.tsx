import Link from 'next/link';

interface AwardNominationProps {
	href: string;
	text: string;
}

export const AwardNomination = ({ href, text }: AwardNominationProps) => {
	return (
		<Link
			href={href}
			className="group absolute bottom-6 left-1/2 flex w-11/12 max-w-[320px] -translate-x-1/2 transform items-center gap-2 rounded-full bg-amber-500/90 px-4 py-2 text-white shadow-lg backdrop-blur-sm transition-all hover:scale-105 hover:bg-amber-600/90 md:bottom-12 md:w-auto md:max-w-none"
		>
			<div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
				<span className="text-lg">🏆</span>
			</div>
			<p className="text-sm font-medium md:text-base">{text}</p>
		</Link>
	);
};
