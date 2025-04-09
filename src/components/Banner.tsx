import { classNames } from '@/utils/classNames';

type Variant = 'info' | 'success' | 'warning' | 'danger';

interface Props {
	children: React.ReactNode;
	variant?: Variant;
}

// TODO: Introduce variants - https://github.com/naugtur/meetjs.pl/issues/129
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
			return 'bg-blue-50 border-blue-400';
		case 'success':
			return 'bg-green-50 border-green-400';
		case 'warning':
			return 'bg-yellow-50 border-yellow-400';
		case 'danger':
			return 'bg-red-50 border-red-400';
		default:
			throw new Error(`Unknown Banner variant of "${variant}"`);
	}
};
