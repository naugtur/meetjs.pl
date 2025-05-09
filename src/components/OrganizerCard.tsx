import Image from 'next/image';
import Link from 'next/link';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import {
	Card,
	CardContent,
	CardFooter,
	CardTitle,
} from '@/components/ui/card';
import { Organizer } from './Orginizers'; // Import Organizer type

interface OrganizerCardProps {
	organizer: Organizer;
	showSummitYears?: boolean;
}

export const OrganizerCard = ({ organizer, showSummitYears }: OrganizerCardProps) => {
	return (
		<Card className="w-full overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 ease-in-out">
			<CardContent className="flex items-center justify-center pt-6">
				{organizer.image ? (
					<Image
						src={organizer.image}
						alt={organizer.name}
						width={150}
						height={150}
						className="rounded-md"
					/>
				) : (
					<Image
						src="/avatar-placeholder.png"
						alt={`${organizer.name} placeholder avatar`}
						width={150}
						height={150}
						className="rounded-md"
					/>
				)}
			</CardContent>
			<CardFooter className="flex w-full flex-col items-center justify-center p-4">
				<CardTitle className="text-lg font-semibold text-center mb-2">{organizer.name}</CardTitle>
				
				{/* Display Roles as Tags */}
				<div className="my-2 flex flex-wrap justify-center items-center gap-2 text-xs">
					{organizer.isBrandOwner && (
						<span className="px-2.5 py-0.5 rounded-full bg-yellow-400 text-yellow-900 font-semibold">
							⭐ Brand Owner
						</span>
					)}
					{organizer.role && !organizer.isBrandOwner && (
						<span className="px-2.5 py-0.5 rounded-full bg-indigo-200 text-indigo-800 font-semibold">
							{organizer.role}
						</span>
					)}
				</div>

				{showSummitYears && organizer.summitYears && organizer.summitYears.length > 0 && (
					<p className="text-xs text-gray-500 mt-2 mb-2">
						Summit: {organizer.summitYears.join(', ')}
					</p>
				)}

				<div className="flex items-center justify-center gap-4 mt-2">
					{organizer.email && (
						<Link href={`mailto:${organizer.email}`} target="_blank" className="text-gray-600 hover:text-primary transition-colors" aria-label={`${organizer.name}'s Email`}>
							<span className="sr-only">Email</span>@
						</Link>
					)}
					{organizer.linkedin && (
						<Link href={organizer.linkedin} target="_blank" className="text-gray-600 hover:text-primary transition-colors" aria-label={`${organizer.name}'s LinkedIn`}>
							<span className="sr-only">Linkedin</span>
							<FaLinkedin size="1.3em" />
						</Link>
					)}
					{organizer.gitHub && (
						<Link href={organizer.gitHub} target="_blank" className="text-gray-600 hover:text-primary transition-colors" aria-label={`${organizer.name}'s GitHub`}>
							<span className="sr-only">GitHub</span>
							<FaGithub size="1.3em" />
						</Link>
					)}
				</div>
			</CardFooter>
		</Card>
	);
};
