import { OrgEvent } from '@/models/org-event';
import { useEffect, useState } from 'react';

export const useEvents = () => {
	const [events, setEvents] = useState<OrgEvent[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		getOrgEvents();
	}, []);

	const getOrgEvents = async () => {
		setError(null);
		setLoading(true);
		try {
			const response = await fetch('/events.json');
			const availableEvents: OrgEvent[] = await response.json();
			// TODO: Validate data
			// TODO: Sort events by start date
			setEvents(availableEvents);
		} catch (e: any) {
			console.error(`Failed to fetch events ${e.message ?? e}`);
			setError('List of events is currently unavailable, please try again later.');
		}
		setLoading(false);
	};

	return {
		events,
		loadingEvents: loading,
		loadingEventsError: error,
	};
};
