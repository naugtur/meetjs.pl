import { FAQQuestion } from '@/components/FAQ';

export const BielskoBialaFAQ: FAQQuestion[] = [
  {
    id: '1',
    question: 'How to become Bielsko-Biała meetup sponsor?',
    answer: 'Please contact Dariusz Wylon (d.wylon@selleo.com)',
  },
  {
    id: '2',
    question: 'How is it cost to join event?',
    answer: (
      <>
        Generally our event are FREE! Only{' '}
        <a href="https://summit.meetjs.pl">summit</a> is paid event.
      </>
    ),
  },
  {
    id: '3',
    question: 'Do I need to register?',
    answer: (
      <>
        Yes, registration is required for each event. You can sign up through
        our{' '}
        <a
          href="https://www.meetup.com/meet-js-bielsko-biala/"
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
