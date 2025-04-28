const Dot = ({ className }: { className?: string }) => (
	<div className={`h-1 w-1 animate-ping bg-red-400 ${className}`} />
);

export default function Loading() {
	return (
		<div className="mx-auto min-h-screen max-w-2xl p-8">
			<article className="space-y-8 py-8">
				<div className="flex gap-1">
					<code className="text-2xl"> $ npm install questions</code>

					<section className="flex items-end gap-2 overflow-hidden p-1">
						<Dot className="delay-100" />
						<Dot className="delay-200" />
						<Dot className="delay-300" />
					</section>
				</div>
			</article>
		</div>
	);
}
