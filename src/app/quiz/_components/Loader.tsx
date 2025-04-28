interface Props {
	text: string;
}

const Dot = ({ className }: { className?: string }) => (
	<div className={`h-1 w-1 animate-ping bg-red-400 ${className}`} />
);

// Todo: Add smaller text on mobile - fix media-queries on Tailwind config...
export const Loader = ({ text }: Props) => (
	<div className="mx-auto min-h-screen max-w-2xl p-8">
		<article className="space-y-8 py-8">
			<div className="flex gap-1">
				<code className="text-2xl">{text}</code>

				<section className="flex items-end gap-2 overflow-hidden p-1">
					<Dot className="delay-100" />
					<Dot className="delay-200" />
					<Dot className="delay-300" />
				</section>
			</div>
		</article>
	</div>
);
