import Link from 'next/link';
import { FaArrowUpRightFromSquare } from 'react-icons/fa6';
import { classNames } from '@/utils/classNames';
import type { Route } from 'next';

type InternalNavLinkProps = {
  name: string;
  href: Route;
  current?: boolean;
  external?: false;
  highlight?: boolean;
};

type ExternalNavLinkProps = {
  name: string;
  href: string;
  current?: boolean;
  external: true;
  highlight?: boolean;
};

type NavigationLinkProps = InternalNavLinkProps | ExternalNavLinkProps;

export const NavigationLink = ({
  name,
  href,
  current = false,
  external,
  highlight = false,
}: NavigationLinkProps) => {
  const baseClasses = highlight
    ? 'bg-[#bcd35d] text-black hover:bg-[#bcd35d]/90 shadow-lg hover:shadow-xl hover:shadow-[#bcd35d]/20 hover:scale-105 transition-all duration-300 font-bold'
    : current
      ? 'bg-gray-900 text-white'
      : 'text-white hover:bg-green/80 hover:text-purple';

  return external ? (
    <a
      href={href}
      className={classNames(baseClasses, 'rounded-md px-3 py-2 font-medium')}
      aria-current={current ? 'page' : undefined}
      target="_blank"
      rel="noopener noreferrer"
      itemProp="url"
      aria-label={`${name} (opens in a new tab)`}
    >
      <span itemProp="name">{name}</span>
      <FaArrowUpRightFromSquare
        className="mb-1 ml-2 inline-block"
        aria-hidden="true"
      />
    </a>
  ) : (
    <Link
      href={href}
      className={classNames(baseClasses, 'rounded-md px-3 py-2 font-medium')}
      aria-current={current ? 'page' : undefined}
      itemProp="url"
    >
      <span itemProp="name">{name}</span>
    </Link>
  );
};
