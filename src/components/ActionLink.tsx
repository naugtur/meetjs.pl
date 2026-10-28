interface Props {
  href: string;
  children: string;
}

export const ActionLink = ({ href, children }: Props) => (
  <a
    href={href}
    target="_blank"
    rel="noopener"
    className="bg-primary text-primary-foreground hover:bg-purple/50 inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 transition-all"
  >
    {children}
  </a>
);
