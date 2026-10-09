import { notFound } from 'next/navigation';

// Every request is rewritten into `[locale]` by `src/proxy.ts`, so unknown
// paths land here and render `[locale]/not-found.tsx` with the full layout.
const CatchAll = () => {
  notFound();
};

export default CatchAll;
