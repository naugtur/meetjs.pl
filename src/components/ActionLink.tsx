interface Props {
  href: string;
  children: string;
}

export const ActionLink = ({ href, children }: Props) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-2 text-primary-foreground transition-all hover:bg-purple/50"
  >
    {children}
  </a>
);
