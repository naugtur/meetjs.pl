import type { MDXComponents } from 'mdx/types';
import Link, { LinkProps } from 'next/link';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="text-4xl font-bold">
        <>{children}</>
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl font-bold">
        <>{children}</>
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-bold">
        <>{children}</>
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-xl font-bold">
        <>{children}</>
      </h4>
    ),
    h5: ({ children }) => (
      <h5 className="text-lg font-bold">
        <>{children}</>
      </h5>
    ),
    h6: ({ children }) => (
      <h6 className="text-base font-bold">
        <>{children}</>
      </h6>
    ),
    strong: ({ children }) => (
      <span className="font-bold">
        <>{children}</>
      </span>
    ),
    a: (props) => (
      <Link {...(props as LinkProps)} className="font-bold">
        <>{props.children}</>
      </Link>
    ),
    ...components,
  };
}
