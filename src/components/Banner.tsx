interface Props {
	children: React.ReactNode;
}

export const Banner = ({ children }: Props) => (
	<article className="mb-8 border-l-4 border-yellow-400 bg-yellow-50 p-4">
		{children}
	</article>
);
