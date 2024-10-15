import { FAQQuestion } from '@/components/FAQ';

export const PoznanFAQ: FAQQuestion[] = [
	{
		id: '1',
		question: 'How to become Poznań meetup sponsor?',
		answer: 'contact',
	},
	{
		id: '2',
		question: 'Example question',
		answer: 'Example answer',
	},
	{
		id: '3',
		question: 'How to become Poznań speaker?',
		answer: (
			<>
				Create{' '}
				<a
					href="https://github.com/meetjspl/poznan/issues"
					className="font-bold hover:underline"
				>
					issue on gitHub
				</a>
			</>
		),
	},
	{
		id: '4',
		question: 'How to join to our meetup?',
		answer: (
			<>
				Register to upcoming event on{' '}
				<a
					href="https://crossweb.pl/cykle-wydarzen/meet-js-poznan/"
					className="font-bold hover:underline"
				>
					crossweb.pl
				</a>
				. Join us on time in venue. It&apos;s easy 🥳
			</>
		),
	},
	{
		id: '5',
		question: 'How is it cost to join event?',
		answer: (
			<>
				Generally our event are FREE! Only{' '}
				<a href="https://summit.meetjs.pl">summit</a> is paid event.
			</>
		),
	},
];
