import { FAQQuestion } from '@/components/FAQ';

export const GdanskFAQ: FAQQuestion[] = [
  {
    id: '1',
    question: 'Where do the meetups take place?',
    answer: `Our meetups are typically held at various tech company offices in the Tricity area (Gdańsk, Gdynia, Sopot). The specific location for each meetup is announced with the event details.`,
  },
  {
    id: '2',
    question: 'How often do you organize meetups?',
    answer: `We aim to organize meetups every 1-2 months, depending on speaker availability and venue arrangements.`,
  },
  {
    id: '3',
    question: 'How can I give a talk?',
    answer: (
      <>
        We welcome speakers of all experience levels! If you&apos;d like to
        share your knowledge, please reach out to us at{' '}
        <a href="mailto:gdansk@meetjs.pl" className="font-bold hover:underline">
          gdansk@meetjs.pl
        </a>{' '}
        with your talk proposal.
      </>
    ),
  },
  {
    id: '4',
    question: 'Is there a cost to attend?',
    answer: `No, all meet.js events are free to attend.`,
  },
  {
    id: '5',
    question: 'Do I need to register?',
    answer: (
      <>
        Yes, registration is required for each event. You can sign up through
        our{' '}
        <a
          href="https://www.meetup.com/meet-js-trojmiasto/"
          className="font-bold hover:underline"
          about="_blank"
        >
          Meetup page
        </a>
        .
      </>
    ),
  },
];
