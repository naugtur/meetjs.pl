interface OrgEvent {
	id: string;
	name: string;
	description: string;
	startDateTime: string;
	endDateTime: string;
	location: Location;
	organizer: Organizer;
	eventLink: string;
}

interface Location {
	name: string;
	cords: {
		lat: number;
		lon: number;
	};
}

interface Organizer {
	name: string;
	email: string;
}
