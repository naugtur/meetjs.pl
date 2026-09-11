import {
  createContext,
  createSignal,
  omit,
  useContext,
  type Accessor,
  type ParentProps,
} from 'solid-js';
import type { JSX } from '@solidjs/web';
import { Dynamic } from '@solidjs/web';
import { Show } from 'solid-js';

// Headless UI Disclosure equivalent for Solid.
// Disclosure provides an `open` signal; DisclosureButton toggles it and
// DisclosurePanel renders its children while open.

interface DisclosureContextValue {
  open: Accessor<boolean>;
  toggle: () => void;
}

const DisclosureContext = createContext<DisclosureContextValue>();

export const useDisclosure = () => useContext(DisclosureContext);

const Disclosure = (
  props: ParentProps<JSX.HTMLAttributes<HTMLElement> & { as?: string }>,
) => {
  const [open, setOpen] = createSignal(false);
  const rest = omit(props, 'as', 'class', 'children');
  return (
    <DisclosureContext value={{ open, toggle: () => setOpen((v) => !v) }}>
      <Dynamic component={props.as ?? 'div'} class={props.class} {...rest}>
        {props.children}
      </Dynamic>
    </DisclosureContext>
  );
};

type DisclosureButtonProps = {
  as?: 'button' | 'a';
  href?: string;
  target?: string;
  rel?: string;
  class?: string;
  type?: string;
  disabled?: boolean;
  'aria-current'?: string;
  'aria-label'?: string;
  'aria-haspopup'?: string;
  onClick?: (event: MouseEvent) => void;
  children?: JSX.Element;
};

const DisclosureButton = (props: DisclosureButtonProps) => {
  const ctx = useContext(DisclosureContext);
  const handleClick = (event: MouseEvent) => {
    ctx?.toggle();
    props.onClick?.(event);
  };
  return (
    <Show
      when={props.as === 'a'}
      fallback={
        <button
          type={(props.type ?? 'button') as 'button'}
          class={props.class}
          aria-expanded={ctx?.open() ? 'true' : 'false'}
          aria-haspopup={props['aria-haspopup'] as 'menu' | undefined}
          aria-label={props['aria-label']}
          disabled={props.disabled}
          onClick={handleClick}
        >
          {props.children}
        </button>
      }
    >
      <a
        href={props.href}
        target={props.target}
        rel={props.rel}
        class={props.class}
        aria-current={props['aria-current'] as 'page' | undefined}
        aria-label={props['aria-label']}
        onClick={handleClick}
      >
        {props.children}
      </a>
    </Show>
  );
};

const DisclosurePanel = (
  props: ParentProps<JSX.HTMLAttributes<HTMLDivElement>>,
) => {
  const ctx = useContext(DisclosureContext);
  const rest = omit(props, 'class', 'children');
  return (
    <Show when={ctx ? ctx.open() : true}>
      <div class={props.class} {...rest}>
        {props.children}
      </div>
    </Show>
  );
};

export { Disclosure, DisclosureButton, DisclosurePanel };
