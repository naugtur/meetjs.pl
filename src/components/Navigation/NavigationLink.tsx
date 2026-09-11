import { FaSolidArrowUpRightFromSquare } from 'solid-icons/fa';
import { classNames } from '@/utils/classNames';

type NavigationLinkProps = {
  name: string;
  href: string;
  current?: boolean;
  external?: boolean;
  highlight?: boolean;
};

export const NavigationLink = (props: NavigationLinkProps) => {
  const baseClasses = () =>
    props.highlight
      ? 'bg-[#bcd35d] text-black hover:bg-[#bcd35d]/90 shadow-lg hover:shadow-xl hover:shadow-[#bcd35d]/20 hover:scale-105 transition-all duration-300 font-bold'
      : props.current
        ? 'bg-gray-900 text-white'
        : 'text-white hover:bg-green/80 hover:text-purple';

  return props.external ? (
    <a
      href={props.href}
      class={classNames(
        baseClasses(),
        'whitespace-nowrap rounded-md px-3 py-2 font-medium',
      )}
      aria-current={props.current ? 'page' : undefined}
      target="_blank"
      rel="noopener"
      itemprop="url"
      aria-label={`${props.name} (opens in a new tab)`}
    >
      <span itemprop="name">{props.name}</span>
      <FaSolidArrowUpRightFromSquare
        class="mb-1 ml-2 inline-block"
        aria-hidden="true"
      />
    </a>
  ) : (
    <a
      href={props.href}
      class={classNames(
        baseClasses(),
        'whitespace-nowrap rounded-md px-3 py-2 font-medium',
      )}
      aria-current={props.current ? 'page' : undefined}
      itemprop="url"
    >
      <span itemprop="name">{props.name}</span>
    </a>
  );
};
