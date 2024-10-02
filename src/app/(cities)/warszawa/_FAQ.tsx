import { FAQQuestion } from '@/components/FAQ';

export const WarsawFAQ: FAQQuestion[] = [
	{
		id: '4',
		question: 'How to become Warsaw meetup sponsor?',
		answer: `Email organizers and they'll  get back to you with details. You can host us at your office or help us cover the cost of a venue. Or we can organize the meetup outdoors :) We're open to ideas!`,
	},
	{
		id: '2',
		question: 'How to become Warsaw speaker?',
		answer: 'Go to https://github.com/meetjspl/warsaw/issues/ and suggest a topic',
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
		id: '1',
		question: 'What does it cost to join event?',
		answer: (
			<>
				Generally our event are FREE! Only{' '}
				<a href="https://summit.meetjs.pl" about="_blank">
					summit
				</a>{' '}
				is paid event.
				<br/>
				We sometimes organize charity events where you can donate to participate.
			</>
		),
	},
];
