import { FAQQuestion } from '@/components/FAQ';

export const LodzFAQ: FAQQuestion[] = [
  {
    id: '1',
    question: 'How to become Łódź meetup sponsor?',
    answer: 'Contact local Organizer.',
  },
  {
    id: '2',
    question: 'How to become Łódź speaker?',
    answer: 'Contact local Organizer.',
  },
  {
    id: '3',
    question: 'How to join to our meetup?',
    answer: (
      <>
        Register to upcoming event on{' '}
        <a
          href="https://luma.com/user/meetjs/"
          className="font-bold hover:underline"
          about="_blank"
        >
          luma.com
        </a>
        . Join us on time in venue. It&apos;s easy 🥳
      </>
    ),
  },
  {
    id: '4',
    question: 'What does it cost to join event?',
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
