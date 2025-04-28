interface Props {
	error: string;
}

// Todo: Proper handling - report on Discord (Add widget) or GitHub issues (you can fix it urself, PR)
export const ReportError = ({ error }: Props) => {
	return (
		<div className="mx-auto min-h-screen max-w-2xl p-8">
			<p className="text-red-500">There was an error.</p>
			<p className="text-red-500">{error}</p>
		</div>
	);
};
