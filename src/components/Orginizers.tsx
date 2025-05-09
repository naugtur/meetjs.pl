import React from 'react';

// The Organizer interface needs to be exported so OrganizerCard.tsx can import it.
// And also for src/data/organizers.ts
export interface Organizer {
	name: string;
	image?: string;
	email?: string;
	linkedin?: string;
	gitHub?: string;
	role?: 'Brand Owner' | 'Core Team' | 'City Lead' | 'Organizer';
	summitYears?: number[];
	isBrandOwner?: boolean;
}

import { OrganizerCard } from './OrganizerCard';

interface OrganizersProps {
	city: string;
	organizers: Organizer[];
}

export const Organizers = ({ city, organizers }: OrganizersProps) => {
	return (
		<section className="flex w-full flex-col items-center justify-center gap-4 p-8">
			<h2 className="text-2xl font-bold">{city} organizers</h2>
			<p className="text-center">
				Meet the people who organize meetups in {city}
			</p>
			<div className="flex w-full flex-col justify-center gap-8 px-4 md:flex-row">
				{organizers.map((organizer) => (
					<OrganizerCard key={organizer.name} organizer={organizer} />
				))}
			</div>
		</section>
	);
};
