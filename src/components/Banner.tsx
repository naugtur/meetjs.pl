import { classNames } from '@/utils/classNames';

type Variant = 'info' | 'success' | 'warning' | 'danger';

interface Props {
  children: React.ReactNode;
  variant?: Variant;
}

export const Banner = ({ children, variant = 'info' }: Props) => (
  <article
    className={classNames(
      'mb-8 border-l-4 p-4 shadow-sm',
      getVariantStyles(variant),
    )}
  >
    {children}
  </article>
);

const getVariantStyles = (variant: Variant) => {
  switch (variant) {
    case 'info':
      return 'bg-sky-50 border-sky-400';
    case 'success':
      return 'bg-emerald-50 border-emerald-400';
    case 'warning':
      return 'bg-yellow-50 border-yellow-400';
    case 'danger':
      return 'bg-red-50 border-red-400';
    default:
      throw new Error(`Unknown Banner variant of "${variant}"`);
  }
};
