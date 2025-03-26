interface Props {
	children: React.ReactNode;
}

// TODO: Introduce variants - https://github.com/naugtur/meetjs.pl/issues/129
export const Banner = ({ children }: Props) => (
	<article className="mb-8 border-l-4 border-yellow-400 bg-yellow-50 p-4">
		{children}
	</article>
);
