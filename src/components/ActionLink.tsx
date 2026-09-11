import type { JSX } from '@solidjs/web';

interface Props {
  href: string;
  children: JSX.Element;
}

export const ActionLink = (props: Props) => (
  <a
    href={props.href}
    target="_blank"
    rel="noopener"
    class="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-2 text-primary-foreground transition-all hover:bg-purple/50"
  >
    {props.children}
  </a>
);
