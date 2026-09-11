import { For } from 'solid-js';
import type { JSX } from '@solidjs/web';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export interface FAQQuestion {
  id: string;
  question: string;
  answer: JSX.Element | string;
}

interface FAQProps {
  questions: FAQQuestion[];
}

export const FAQ = (props: FAQProps) => {
  return (
    <section class="p-8">
      <h2 class="text-center text-2xl font-bold">FAQ</h2>
      <Accordion class="w-full">
        <For each={props.questions}>
          {(question) => (
            <AccordionItem value={`item-${question.id}`}>
              <AccordionTrigger>{question.question}</AccordionTrigger>
              <AccordionContent>
                <p>{question.answer}</p>
              </AccordionContent>
            </AccordionItem>
          )}
        </For>
      </Accordion>
    </section>
  );
};
