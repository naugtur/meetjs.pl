import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { FaGithub, FaLinkedin } from 'react-icons/fa6';

interface Organizer {
	name: string;
	image?: string;
	email?: string;
	linkedin?: string;
	gitHub?: string;
}

interface OrganizersProps {
	city: string;
	organizers: Organizer[];
}

export const Organizers = ({ city, organizers }: OrganizersProps) => {
	return (
		<section className="flex w-full flex-col items-center justify-center gap-4 p-8">
			<h2 className="text-2xl font-bold">{city} organizers</h2>
			<p>Meet the people who organize meetups in {city}</p>
			<div className="flex flex-col gap-8 md:flex-row">
				{organizers.map((organizer) => (
					<Card
						key={organizer.name}
						className="w-full overflow-hidden text-2xl font-bold md:w-1/3"
					>
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
									alt={organizer.name}
									width={150}
									height={150}
									className="rounded-md"
								/>
							)}
						</CardContent>
						<CardFooter className="flex w-full flex-col items-center justify-center gap-1">
							<CardTitle className="text-center">{organizer.name}</CardTitle>
							<div className="flex items-center justify-center gap-1">
								{organizer.email && (
									<Link href={`mailto:${organizer.email}`} target="_blank">
										<span className="sr-only">Email</span>@
									</Link>
								)}
								{organizer.linkedin && (
									<Link href={organizer.linkedin} target="_blank">
										<span className="sr-only">Linkedin</span>
										<FaLinkedin />
									</Link>
								)}
								{organizer.gitHub && (
									<Link href={organizer.gitHub} target="_blank">
										<span className="sr-only">GitHub</span>
										<FaGithub />
									</Link>
								)}
							</div>
						</CardFooter>
					</Card>
				))}
			</div>
		</section>
	);
};
