import { FAQQuestion } from '@/components/FAQ';

export const LublinFAQ: FAQQuestion[] = [
  {
    id: '4',
    question: 'How to become Lublin meetup sponsor?',
    answer: `Email organizers and they'll  get back to you with details. You can host us at your office or help us cover the cost of a venue. Or we can organize the meetup outdoors :) We're open to ideas!`,
  },
  {
    id: '2',
    question: 'How to become Lublin speaker?',
    answer: (
      <>
        Go to{' '}
        <a
          href="https://github.com/meetjspl/lublin/issues/"
          className="font-bold hover:underline"
          about="_blank"
        >
          https://github.com/meetjspl/lublin/issues/
        </a>{' '}
        and suggest a topic
      </>
    ),
  },
  {
    id: '3',
    question: 'How to join to our meetup?',
    answer: (
      <>
        Register to upcoming event on{' '}
        <a
          href="https://www.meetup.com/pl-PL/meetjslublin/"
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
        Generally our events are FREE! Only{' '}
        <a href="https://summit.meetjs.pl" about="_blank">
          summit
        </a>{' '}
        is paid event.
        <br />
        We sometimes organize charity events where you can donate to
        participate.
      </>
    ),
  },
];
