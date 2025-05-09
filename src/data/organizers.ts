import { Organizer } from '@/components/Orginizers';

export interface CityOrganizers {
	city: string;
	citySlug: string;
	organizers: Organizer[];
}

// All organizers data centralized in one place
export const allOrganizers: CityOrganizers[] = [
	{
		city: 'Warsaw',
		citySlug: 'warszawa',
		organizers: [
			{
				name: 'Zbyszek Tenerowicz',
				image: 'https://avatars.githubusercontent.com/u/509375?v=4',
				email: 'naugtur@gmail.com',
				linkedin: 'https://www.linkedin.com/in/zbigniew-tenerowicz-288175165/',
				gitHub: 'https://github.com/naugtur',
				role: 'Brand Owner',
				isBrandOwner: true,
				summitYears: [2020, 2021, 2022, 2023],
			},
			{
				name: 'Kamil Dzieniszewski',
				image: 'https://avatars.githubusercontent.com/u/3521624?v=4',
				email: 'kamil.dzieniszewski@gmail.com',
				linkedin: 'https://www.linkedin.com/in/dzieniszewski/',
				gitHub: 'https://github.com/dzienisz',
				role: 'Core Team',
				summitYears: [2022, 2023],
			},
		],
	},
	{
		city: 'Gdańsk',
		citySlug: 'gdansk',
		organizers: [
			{
				name: 'meet.js Tricity Team',
				image:
					'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAM1BMVEXk5ueutLeqsbTn6eqpr7PJzc/j5ebf4eLZ3N2wtrnBxsjN0NLGysy6v8HT1tissra8wMNxTKO9AAAFDklEQVR4nO2d3XqDIAxAlfivoO//tEOZWzvbVTEpic252W3PF0gAIcsyRVEURVEURVEURVEURVEURVEURVEURVEURVEURflgAFL/AirAqzXO9R7XNBVcy9TbuMHmxjN6lr92cNVVLKEurVfK/zCORVvW8iUBnC02dj+Wpu0z0Y6QlaN5phcwZqjkOkK5HZyPAjkIjSO4fIdfcOwFKkJlX4zPu7Ha1tIcwR3wWxyFhRG6g4Je0YpSPDJCV8a2Sv2zd1O1x/2WMDZCwljH+clRrHfWCLGK8REMiql//2si5+DKWKcWeAGcFMzzNrXC/0TUwQ2s6+LhlcwjTMlYsUIQzPOCb7YBiyHopyLXIEKPEkI/TgeuiidK/R9FniUDOjRDpvm0RhqjMyyXNjDhCfIMYl1gGjIMIuYsnGEYRMRZOMMunaLVwpWRW008v6fYKDIzxCwVAeNSO90BJW6emelYBRF/kHpYGVaoxTDAaxOFsfP9y8hpJ4xd7gOcij7JNGQ1EYFgkPJa1jQEiYZXRaRINKxSDUW9n+FT82lSKadkiru9/4XPqSLWOekGPoY05TAvLm9orm+YWuwHoBHkZKijNBJGmeb61eL6Ff/6q7bLr7yvv3vKGhpDRjvgjGaPz+gUg6YgcvpyAR2FIZ9U6nEEyZRTovmEU32KichpGn7C17XrfyH9gK/c0CMP05HZIM2uf9sEveizKveBy9/6Qt7o89ne33D525cfcIMW6ab+TMEukQbQbu+xu7X3A9bChmWaCeAkG17bpntwXgWxHaMzGPmUaR5dQZiKqRVeUZ3047fi3nAu28h4CHxCsZAgmEH8Y27jJAhm8c+5RQzRQNVGhVFSfxOYIjp/pP7RxzjevYXVGf4eLt+BJ1vCuLuLkrgABgCGXZ2wik5uty+oBvNirI6mkzhAf4Gsb58Hcm67Jzd+KwD10BYPLL3e0MjvKrgAULnOfveF/O4N2Xb9BZom3gJes3F9X5Zze8/6Yt09b4CrqsEjUv8oFBaR2rl+6CZr2xVrp24o/WitBKuGrrpl1+bFkmK2qXTON4VpbdfLa7o7y/WdLxG7lm2Lqh2clOwTegbvc/vj2U78CwhA87Bn8G5Nk3eOb0Nsr9flz3sG78UUtue4kpv1xvjg3TMay62BMlTlP+vrOMnJsRmt/ze0jsfkPPYdAH57hK+34PeOyc8XIXu5xT2HsUkdZz+adwg8HGFfQ3K5jtDvbUiO4Di9/ywHGrL88pDizZ++oTp+an+SMX/ndymUCwmHMdO7yuOx83pUx/eEMU0AvxWndwgidAqOZ8ypCwdEfvvEo6D9HwpA8wzvmOJEqAg9ySu8g4x0Hb9hSB/BANEKJ+LbPBU0lzbAJs4xt1AoshKkUGQmiH8/jJ0gdhTTLmSegHlPE0oOdXALnqDjKYh3px//fSgSWG8UqfrrIICzYYSJXRr9BSPbpNzw7gBjKjKOYI7ReIGqQRIap5+5MdjyvuDkExvGeXSlONWZAP3/AZBwJohU7QJRGU+cTVH18ELmRPNBmibW6MT/k1b0XhdkRBvyT6SB6EYv/GvhSmRNpGngRULsAlxMCGNXp7w3FfdEbTEEDdLI9TdIKRUzUesa3I461ER8cpNT7gMRhpKmYVS9ELOgCUQsa4SsulciKiLbY+AnHD8cpuhISsnxpamI84sbDq9qYJgf8wiiOBrC7Ml7M7ZECCqKoiiKoiiKoiiKoijv5AvJxlZRyNWWLwAAAABJRU5ErkJggg==',
				email: 'gdansk@meetjs.pl',
			},
		],
	},
	{
		city: 'Białystok',
		citySlug: 'bialystok',
		organizers: [
			{
				name: 'Kasia Paszko',
				image:
					'https://media.licdn.com/dms/image/v2/C5603AQHH_qKNNVLnpg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1587825233990?e=1737590400&v=beta&t=uLFZefzHs_a4Psr0Gw5PVDLXZL5oNLetkXIvLoTh70o',
				linkedin: 'https://www.linkedin.com/in/katarzyna-paszko/',
			},
			{
				name: 'Kacper Lewko',
				image:
					'https://media.licdn.com/dms/image/v2/D4D03AQFZy4d5hzbDwA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1723033408880?e=1738195200&v=beta&t=XhbH5quWnhjzMXS2DXngrVmNhPOxTqdcOtONydXP1tg',
				linkedin: 'https://pl.linkedin.com/in/kacper-lewko-66a165273',
			},
			{
				name: 'Krzysztof Kondracikowski',
				image:
					'https://media.licdn.com/dms/image/v2/C5603AQFv3ht2Mpp3zQ/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1662368294098?e=1737590400&v=beta&t=wYIudvUPW3nz7BA_6KxN68eJDA2JK9t1Ym7jkzRUSes',
				linkedin:
					'https://www.linkedin.com/in/krzysztof-kondracikowski-87a3491b3/',
			},
			{
				name: 'Mateusz Butkiewicz',
				image:
					'https://media.licdn.com/dms/image/v2/C4E03AQEvThc2J3-nvQ/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1642884417355?e=1737590400&v=beta&t=vjl0p0x8WNJblNWf8p4P-HQwJO3Cp0oyrUuqL-oqY28',
				linkedin: 'https://www.linkedin.com/in/mat-btk/',
			},
		],
	},
	{
		city: 'Bielsko-Biała',
		citySlug: 'bielsko-biala',
		organizers: [],
	},
	{
		city: 'Katowice',
		citySlug: 'katowice',
		organizers: [
			{
				name: 'Sebastian Mysakowski',
				image:
					'https://media.licdn.com/dms/image/v2/D4D03AQHJqYudYW7bdg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1663656658788?e=1748476800&v=beta&t=Q_Sh2y_ZvPOcSfLX2rogHlScXwKaA9VC6A9yEnXUHa8',
				linkedin: 'https://www.linkedin.com/in/smysakowski/',
			},
		],
	},
	{
		city: 'Kielce',
		citySlug: 'kielce',
		organizers: [],
	},
	{
		city: 'Kraków',
		citySlug: 'krakow',
		organizers: [
			{
				name: 'Andrzej Fricze',
				image: 'https://avatars.githubusercontent.com/u/2947293?v=4',
				email: 'andrzej.fricze@gmail.com',
				linkedin: 'https://www.linkedin.com/in/andrzej-fricze/',
				gitHub: 'https://github.com/fricze',
				role: 'Core Team',
			},
		],
	},
	{
		city: 'Łódź',
		citySlug: 'lodz',
		organizers: [
			{
				name: 'Krzysztof Krawiec',
				image: 'https://avatars.githubusercontent.com/u/97393012?v=4',
				email: '',
				linkedin: 'https://www.linkedin.com/in/kkrawiec/',
				gitHub: '',
			},
		],
	},
	{
		city: 'Lublin',
		citySlug: 'lublin',
		organizers: [
			{
				name: 'Patryk Omiotek',
				image:
					'https://media.licdn.com/dms/image/v2/D4D03AQEE4b1f0BdSWA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1726523493093?e=1748476800&v=beta&t=xuOpEwgpOalNS10CWw9v8tLPmOdc5INWvzttkMhXQ-M',
				linkedin: 'https://www.linkedin.com/in/patrykomiotek/',
			},
			{
				name: 'Sebastian Mysakowski',
				image:
					'https://media.licdn.com/dms/image/v2/D4D03AQHJqYudYW7bdg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1663656658788?e=1748476800&v=beta&t=Q_Sh2y_ZvPOcSfLX2rogHlScXwKaA9VC6A9yEnXUHa8',
				linkedin: 'https://www.linkedin.com/in/smysakowski/',
			},
		],
	},
	{
		city: 'Poznań',
		citySlug: 'poznan',
		organizers: [
			{
				name: 'Agnieszka Konefał',
				image: '/city/poznan/organizers/agnieszka.jpg',
				linkedin: 'https://www.linkedin.com/in/agnieszka-konefał-9a731bb2',
			},
			{
				name: 'Sebastian Pożoga',
				image: '/city/poznan/organizers/sebastian.jpeg',
			},
			{
				name: 'Marcin Owczarzak',
				linkedin: 'https://www.linkedin.com/in/marcinowczarzak/',
				image: '/city/poznan/organizers/marcin.jpeg',
			},
			{
				name: 'Olaf Krawczyk',
				image: '/city/poznan/organizers/olaf.jpeg',
				linkedin: 'https://www.linkedin.com/in/olaf-krawczyk/',
			},
		],
	},
	{
		city: 'Szczecin',
		citySlug: 'szczecin',
		organizers: [],
	},
	{
		city: 'Toruń',
		citySlug: 'torun',
		organizers: [],
	},
	{
		city: 'Wrocław',
		citySlug: 'wroclaw',
		organizers: [
			{
				name: 'Cezary Dynak',
				image: 'https://avatars.githubusercontent.com/u/12508532?v=4',
				linkedin: 'https://www.linkedin.com/in/cdynak/',
				role: 'Core Team',
			},
			{
				name: 'Aleksandra Pawlus',
				image: 'https://avatars.githubusercontent.com/u/98127445?v=4',
				linkedin: 'https://www.linkedin.com/in/aleksandrapawlus/',
			},
			{
				name: 'Stanisław Synowiec',
				image: 'https://avatars.githubusercontent.com/u/52856724?v=4',
				email: 'meetjs@ssynowiec.dev',
				linkedin: 'https://www.linkedin.com/in/ssynowiecpl/',
				gitHub: 'https://github.com/ssynowiec',
				role: 'Core Team',
			},
			{
				name: 'Michał Korczak',
				image: 'https://avatars.githubusercontent.com/u/6079265?v=4',
				linkedin: 'https://www.linkedin.com/in/michal-korczak/',
				gitHub: 'https://github.com/Omikorin',
				role: 'Core Team',
			},
		],
	},
];

// Helper function to get organizers for a specific city
export const getOrganizersByCity = (
	citySlug: string,
): CityOrganizers | undefined => {
	return allOrganizers.find((cityData) => cityData.citySlug === citySlug);
};

// Helper function to get all organizers across all cities
export function getAllOrganizers(): CityOrganizers[] {
	return allOrganizers;
}
