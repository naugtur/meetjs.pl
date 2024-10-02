import { FAQQuestion } from '@/components/FAQ';

export const WarsawFAQ: FAQQuestion[] = [
	{
		id: '1',
		question: 'How to become Warsaw meetup sponsor?',
		answer: 'contact',
	},
	{
		id: '2',
		question: 'How to become Warsaw speaker?',
		answer: 'Contact local Organizer.',
	},
	{
		id: '3',
		question: 'How to join to our meetup?',
		answer: (
			<>
				Register to upcoming event on{' '}
				<a
					href="https://www.meetup.com/pl-PL/meetjswarsaw/"
					className="font-bold hover:underline"
					about="_blank"
				>
					meetup.com
				</a>
				. Join us on time in venue. It&apos;s easy 🥳
			</>
		),
	},
	{
		id: '4',
		question: 'How is it cost to join event?',
		answer: (
			<>
				Generally our event are FREE! Only{' '}
				<a href="https://summit.meetjs.pl" about="_blank">
					summit
				</a>{' '}
				is paid event.
			</>
		),
	},
];
