import { env } from '@/env';

export function SchemaMarkup() {
	const schema = {
		'@context': 'https://schema.org',
		'@type': 'Organization',
		name: 'meet.js',
		alternateName: 'meetjs',
		url: env.SITE_URL,
		logo: `${env.SITE_URL}/logo.png`,
		description:
			'The largest JavaScript community in Poland organizing regular meetups, conferences, and knowledge sharing events since 2011.',
		foundingDate: '2011',
		sameAs: [
			'https://github.com/meetjspl',
			'https://twitter.com/meetjs',
			'https://www.facebook.com/meetjspl',
			'https://www.linkedin.com/company/meetjs',
		],
		knowsAbout: [
			'JavaScript',
			'TypeScript',
			'React',
			'Node.js',
			'Web Development',
			'Frontend Development',
			'Programming',
			'Tech Community',
			'Web Frameworks',
			'JavaScript Ecosystem',
		],
		areaServed: {
			'@type': 'Country',
			name: 'Poland',
		},
		subOrganization: [
			{
				'@type': 'Organization',
				name: 'meet.js Poznań',
				foundingDate: '2011',
				description: 'The first meet.js chapter, founded in 2011 in Poznań',
			},
			{
				'@type': 'Organization',
				name: 'meet.js Warsaw',
				description: 'JavaScript community in Warsaw',
			},
			{
				'@type': 'Organization',
				name: 'meet.js Wrocław',
				description: 'JavaScript community in Wrocław',
			},
			{
				'@type': 'Organization',
				name: 'meet.js Kraków',
				description: 'JavaScript community in Kraków',
			},
			{
				'@type': 'Organization',
				name: 'meet.js Katowice',
				description: 'JavaScript community in Katowice',
			},
			{
				'@type': 'Organization',
				name: 'meet.js Łódź',
				description: 'JavaScript community in Łódź',
			},
			{
				'@type': 'Organization',
				name: 'meet.js Gdańsk',
				description: 'JavaScript community in Gdańsk',
			},
			{
				'@type': 'Organization',
				name: 'meet.js Lublin',
				description: 'JavaScript community in Lublin',
			},
			{
				'@type': 'Organization',
				name: 'meet.js Szczecin',
				description: 'JavaScript community in Szczecin',
			},
		],
		award: {
			'@type': 'Award',
			name: 'JSNation Community Award',
			description:
				'Recognition for outstanding contribution to the JavaScript community',
			url: `${env.SITE_URL}/jsnation-award`,
		},
		events: [
			{
				'@type': 'EventSeries',
				name: 'meet.js Meetups',
				description: 'Regular JavaScript community meetups across Poland',
				url: `${env.SITE_URL}/events`,
			},
			{
				'@type': 'Event',
				name: 'meet.js Summit',
				description:
					'Annual JavaScript conference organized by the meet.js community',
				url: `${env.SITE_URL}/events`,
			},
		],
		offers: [
			{
				'@type': 'Offer',
				name: 'Sponsorship Opportunities',
				description:
					'Partner with meet.js to reach the JavaScript community in Poland',
				url: `${env.SITE_URL}/sponsors`,
			},
			{
				'@type': 'Offer',
				name: 'Community Discounts',
				description:
					'Exclusive discounts on software tools and event tickets for the meet.js community',
				url: `${env.SITE_URL}/discounts`,
			},
		],
		memberOf: {
			'@type': 'Organization',
			name: 'Global JavaScript Community',
			description: 'Part of the worldwide JavaScript ecosystem',
		},
		specialty: 'JavaScript community building and knowledge sharing',
		slogan: 'JavaScript Meetups in Poland',
	};

	// For server components, we need to use dangerouslySetInnerHTML
	return (
		<script
			id="schema-markup"
			type="application/ld+json"
			dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
		/>
	);
}
