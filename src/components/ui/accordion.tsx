import {
  createContext,
  createSignal,
  omit,
  useContext,
  type Accessor,
  type ParentProps,
} from 'solid-js';
import type { JSX } from '@solidjs/web';
import { ChevronDown } from '@/lib/lucide';

import { cn } from '@/lib/utils';

// Hand-rolled single-open accordion (the Radix Accordion equivalent).
// An AccordionItem takes a `value`; the Accordion context tracks which value
// is open, and trigger/content pair through a per-item context.

interface AccordionContextValue {
  openItem: Accessor<string | undefined>;
  toggle: (value: string) => void;
}

const AccordionContext = createContext<AccordionContextValue>();

interface AccordionItemContextValue {
  value: string;
  isOpen: Accessor<boolean>;
}

const AccordionItemContext = createContext<AccordionItemContextValue>();

const Accordion = (props: ParentProps<JSX.HTMLAttributes<HTMLDivElement>>) => {
  const [openItem, setOpenItem] = createSignal<string>();
  const toggle = (value: string) =>
    setOpenItem((current) => (current === value ? undefined : value));
  const rest = omit(props, 'class', 'children');
  return (
    <AccordionContext value={{ openItem, toggle }}>
      <div class={props.class} {...rest}>
        {props.children}
      </div>
    </AccordionContext>
  );
};

interface AccordionItemProps extends JSX.HTMLAttributes<HTMLDivElement> {
  value: string;
  children?: JSX.Element;
}

const AccordionItem = (props: AccordionItemProps) => {
  const ctx = useContext(AccordionContext);
  if (!ctx) throw new Error('AccordionItem must be used inside Accordion');
  const rest = omit(props, 'value', 'class', 'children');
  const isOpen = () => ctx.openItem() === props.value;
  return (
    <AccordionItemContext value={{ value: props.value, isOpen }}>
      <div
        class={cn('border-b', props.class)}
        data-state={isOpen() ? 'open' : 'closed'}
        {...rest}
      >
        {props.children}
      </div>
    </AccordionItemContext>
  );
};

const AccordionTrigger = (
  props: ParentProps<JSX.ButtonHTMLAttributes<HTMLButtonElement>>,
) => {
  const accordion = useContext(AccordionContext);
  const item = useContext(AccordionItemContext);
  if (!accordion || !item)
    throw new Error('AccordionTrigger must be used inside AccordionItem');
  const rest = omit(props, 'class', 'children', 'onClick');
  return (
    <h3 class="flex">
      <button
        type="button"
        class={cn(
          'flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180',
          props.class,
        )}
        aria-expanded={item.isOpen() ? 'true' : 'false'}
        data-state={item.isOpen() ? 'open' : 'closed'}
        onClick={(event) => {
          accordion.toggle(item.value);
          const handler = props.onClick;
          if (typeof handler === 'function') handler(event);
        }}
        {...rest}
      >
        {props.children}
        <ChevronDown class="h-4 w-4 shrink-0 transition-transform duration-200" />
      </button>
    </h3>
  );
};

const AccordionContent = (
  props: ParentProps<JSX.HTMLAttributes<HTMLDivElement>>,
) => {
  const item = useContext(AccordionItemContext);
  if (!item)
    throw new Error('AccordionContent must be used inside AccordionItem');
  const rest = omit(props, 'class', 'children');
  return (
    <div
      class="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
      data-state={item.isOpen() ? 'open' : 'closed'}
      hidden={!item.isOpen()}
      {...rest}
    >
      <div class={cn('pb-4 pt-0', props.class)}>{props.children}</div>
    </div>
  );
};

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
