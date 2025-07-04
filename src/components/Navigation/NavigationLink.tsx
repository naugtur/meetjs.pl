import Link from 'next/link';
import { FaArrowUpRightFromSquare } from 'react-icons/fa6';
import { classNames } from '@/utils/classNames';

interface NavigationLinkProps {
  name: string;
  href: string;
  current?: boolean;
  external?: boolean;
}

export const NavigationLink = ({
  name,
  href,
  current = false,
  external = false,
}: NavigationLinkProps) => {
  return (
    <Link
      href={href}
      className={classNames(
        current
          ? 'bg-gray-900 text-white'
          : 'text-white hover:bg-green/80 hover:text-purple',
        'rounded-md px-3 py-2 font-medium',
      )}
      aria-current={current ? 'page' : undefined}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      itemProp="url"
      {...(external && {
        'aria-label': `${name} (opens in a new tab)`,
      })}
    >
      <span itemProp="name">{name}</span>
      {external && (
        <FaArrowUpRightFromSquare
          className="mb-1 ml-2 inline-block"
          aria-hidden="true"
        />
      )}
    </Link>
  );
};
