import Link from 'next/link';

interface CityEmailProps {
	email: string;
}

export const CityEmail = ({ email }: CityEmailProps) => {
	return (
		<section className="flex w-full flex-col items-center justify-center gap-4 bg-green p-8">
			<h2 className="text-center font-medium">
				For more information, please contact us at{' '}
			</h2>
			<Link
				href={`mailto:${email}`}
				className="text-2xl font-bold hover:underline"
			>
				{email}
			</Link>
		</section>
	);
};
