import { FAQQuestion } from '@/components/FAQ';

export const KrakowFAQ: FAQQuestion[] = [
  {
    id: '4',
    question: 'How to become Krakow meetup sponsor?',
    answer: `Email meetjskrk@gmail.com or directly email organizers and they'll get back to you with details. You can host us at your office or help us cover the cost of a venue. Or we can organize the meetup outdoors :) We're open to ideas!`,
  },
  {
    id: '2',
    question: 'How to become Krakow speaker?',
    answer: 'Write meetjskrk@gmail.com or write directly to organizer.',
  },
  {
    id: '3',
    question: 'How to join to our meetup?',
    answer: (
      <>
        Register to upcoming event on{' '}
        <a
          href="https://www.meetup.com/krakowjs/"
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
    answer: <>Meetups are free to join :)</>,
  },
];
