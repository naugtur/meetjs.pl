export interface Event {
	id: string;
	name: string;
	description: string;
	startDateTime: string;
	endDateTime: string;
	location: {
		name: string;
		cords: {
			lat: number;
			lon: number;
		};
	};
	organizer: {
		name?: string;
		email?: string;
	};
	eventLink?: string;
}
