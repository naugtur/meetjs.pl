import {
  createContext,
  createSignal,
  omit,
  onSettled,
  useContext,
  type Accessor,
  type ParentProps,
} from 'solid-js';
import type { JSX } from '@solidjs/web';
import { Show } from 'solid-js';
import { isServer } from '@solidjs/web';

import { cn } from '@/lib/utils';

// Hand-rolled dropdown menu (Radix DropdownMenu equivalent).
// DropdownMenu provides open state; Trigger toggles it; Content is positioned
// absolutely under the trigger and closes on outside click / Escape.

interface DropdownMenuContextValue {
  open: Accessor<boolean>;
  setOpen: (open: boolean) => void;
  rootRef: (el: HTMLDivElement) => void;
}

const DropdownMenuContext = createContext<DropdownMenuContextValue>();

const useDropdownMenu = () => {
  const ctx = useContext(DropdownMenuContext);
  if (!ctx)
    throw new Error('DropdownMenu components must be used inside DropdownMenu');
  return ctx;
};

const DropdownMenu = (
  props: ParentProps<JSX.HTMLAttributes<HTMLDivElement>>,
) => {
  const [open, setOpenSignal] = createSignal(false);
  const rest = omit(props, 'class', 'children');
  let root!: HTMLDivElement;

  const setOpen = (value: boolean) => setOpenSignal(value);

  const onDocumentClick = (event: MouseEvent) => {
    if (!root.contains(event.target as Node)) setOpenSignal(false);
  };
  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') setOpenSignal(false);
  };

  onSettled(() => {
    if (isServer) return;
    document.addEventListener('click', onDocumentClick);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('click', onDocumentClick);
      document.removeEventListener('keydown', onKeyDown);
    };
  });

  return (
    <DropdownMenuContext
      value={{ open, setOpen, rootRef: (el) => (root = el) }}
    >
      <div ref={root} class={cn('relative', props.class)} {...rest}>
        {props.children}
      </div>
    </DropdownMenuContext>
  );
};

const DropdownMenuTrigger = (
  props: ParentProps<JSX.ButtonHTMLAttributes<HTMLButtonElement>>,
) => {
  const ctx = useDropdownMenu();
  const rest = omit(props, 'onClick', 'children');
  return (
    <button
      type="button"
      aria-haspopup="menu"
      aria-expanded={ctx.open() ? 'true' : 'false'}
      data-state={ctx.open() ? 'open' : 'closed'}
      onClick={(event) => {
        ctx.setOpen(!ctx.open());
        const handler = props.onClick;
        if (typeof handler === 'function') handler(event);
      }}
      {...rest}
    >
      {props.children}
    </button>
  );
};

interface DropdownMenuContentProps extends ParentProps<
  JSX.HTMLAttributes<HTMLDivElement>
> {
  align?: 'start' | 'center' | 'end';
  sideOffset?: number;
}

const DropdownMenuContent = (props: DropdownMenuContentProps) => {
  const ctx = useDropdownMenu();
  const rest = omit(props, 'class', 'children', 'align');
  return (
    <Show when={ctx.open()}>
      <div
        role="menu"
        class={cn(
          'absolute top-full z-50 mt-1 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md',
          props.align === 'end' ? 'right-0' : 'left-0',
          props.class,
        )}
        {...rest}
      >
        {props.children}
      </div>
    </Show>
  );
};

interface DropdownMenuItemProps extends ParentProps<
  JSX.HTMLAttributes<HTMLDivElement>
> {
  disabled?: boolean;
  inset?: boolean;
}

const DropdownMenuItem = (props: DropdownMenuItemProps) => {
  const ctx = useDropdownMenu();
  const rest = omit(props, 'class', 'children', 'disabled', 'inset', 'onClick');
  return (
    <div
      role="menuitem"
      aria-disabled={props.disabled ? 'true' : undefined}
      class={cn(
        'relative flex select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground',
        props.disabled
          ? 'pointer-events-none opacity-50'
          : 'cursor-pointer hover:bg-accent',
        props.inset && 'pl-8',
        props.class,
      )}
      onClick={(event) => {
        if (props.disabled) return;
        ctx.setOpen(false);
        const handler = props.onClick;
        if (typeof handler === 'function') handler(event);
      }}
      {...rest}
    >
      {props.children}
    </div>
  );
};

const DropdownMenuLabel = (
  props: ParentProps<JSX.HTMLAttributes<HTMLDivElement> & { inset?: boolean }>,
) => {
  const rest = omit(props, 'class', 'inset', 'children');
  return (
    <div
      class={cn(
        'px-2 py-1.5 text-sm font-semibold',
        props.inset && 'pl-8',
        props.class,
      )}
      {...rest}
    >
      {props.children}
    </div>
  );
};

const DropdownMenuSeparator = (props: JSX.HTMLAttributes<HTMLDivElement>) => {
  const rest = omit(props, 'class');
  return <div class={cn('-mx-1 my-1 h-px bg-muted', props.class)} {...rest} />;
};

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
};
