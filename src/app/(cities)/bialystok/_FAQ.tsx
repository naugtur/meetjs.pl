import { FAQQuestion } from '@/components/FAQ';

export const BialystokFAQ: FAQQuestion[] = [
	{
		id: '1',
		question: 'How to become Białystok meetup sponsor or speaker?',
		answer:
			'Feel free to connect with one of the organizers on LinkedIn — we\'d love to chat with you about sponsorship opportunities!',
	},
	{
		id: '2',
		question: 'How to join to our meetup?',
		answer: (
			<>
				It's that easy! Come to the meeting in {' '}
				<a
					href="https://maps.app.goo.gl/JsVjDFjsTSsMvwh47"
					className="font-bold hover:underline"
				>
					Gwint
				</a>
				
			</>
		),
	},
	{
		id: '3',
		question: 'How is it cost to join event?',
		answer: (
			<>
				Generally, our events in Białystok are free!
			</>
		),
	},
];
