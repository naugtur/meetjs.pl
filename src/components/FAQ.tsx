import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
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
      <Accordion type="single" collapsible className="w-full">
        {questions.map((question) => (
          <AccordionItem key={question.id} value={`item-${question.id}`}>
            <AccordionTrigger>{question.question}</AccordionTrigger>
            <AccordionContent>
              <p>{question.answer}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};
