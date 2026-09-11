import { ChevronDown } from 'lucide-react';
import { JSX } from 'react';

export interface FAQQuestion {
  id: string;
  question: string;
  answer: JSX.Element | string;
}

interface FAQProps {
  questions: FAQQuestion[];
}

export const FAQ = ({ questions }: FAQProps) => {
  return (
    <section className="p-8">
      <h2 className="text-center text-2xl font-bold">FAQ</h2>
      <div className="w-full">
        {questions.map((question) => (
          <details key={question.id} name="faq" className="group border-b">
            <summary className="flex cursor-pointer list-none items-center justify-between py-4 font-medium transition-all hover:underline [&::-webkit-details-marker]:hidden">
              {question.question}
              <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200 group-open:rotate-180" />
            </summary>
            <div className="pb-4 text-sm">
              <p>{question.answer}</p>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
};
