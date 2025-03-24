import { Banner } from './_components/Banner';
import { ActionLink } from './_components/ActionLink';
import { ClickToCopy } from './_components/ClickToCopy';
import { CalendarIcon } from './_components/icons/CalendarIcon';
import { LocationPinIcon } from './_components/icons/LocationPinIcon';
import { StackedFoldersIcon } from './_components/icons/StackedFoldersIcon';

const DISCOUNT_CODE = 'WDI25RP20';
const DISCOUNT_END_DATE = new Date('2025-03-31');

const details = [
	{
		icon: CalendarIcon,
		name: 'Dates',
		description: 'April 4th, 2025 (online) and April 5th, 2025 (in-person)',
	},
	{
		icon: LocationPinIcon,
		name: 'Location',
		description:
			'Faculty of Mathematics and Information Science, Warsaw University of Technology',
	},
	{
		icon: StackedFoldersIcon,
		name: 'Tracks',
		description: '25 tracks with 300 talks',
	},
] as const;

const getDaysRemainingToDate = (target: Date) =>
	Math.ceil((target.getTime() - Date.now()) / (1_000 * 60 * 60 * 24));

export default function Page() {
	const daysRemaining = getDaysRemainingToDate(DISCOUNT_END_DATE);

	return (
		<div className="container mx-auto max-w-3xl py-16">
			<div className="mb-8 flex flex-col items-start justify-between md:flex-row md:items-center">
				<h1 className="mb-4 text-4xl font-bold md:mb-0">Warsaw IT Days 2025</h1>
				<ActionLink href="https://warszawskiedniinformatyki.pl/">
					Register Now! 🚀
				</ActionLink>
			</div>

			<Banner>
				{daysRemaining >= 0 ? (
					<>
						<p className="font-semibold">Discount ends soon!</p>
						<p>
							Only {daysRemaining} days left to get 20% off with code:{' '}
							<span className="rounded bg-gray-100 px-2 py-1 font-mono">
								{DISCOUNT_CODE}
							</span>
						</p>{' '}
					</>
				) : (
					<>
						<p className="font-semibold">The discount has ended!</p>
						<p>
							Thank you for participating in this year’s edition — we’ll see you
							in{' '}
							<span className="rounded bg-gray-100 px-2 py-1 font-mono">
								{DISCOUNT_END_DATE.getFullYear() + 1}
							</span>
							!
						</p>
					</>
				)}
			</Banner>

			<div className="mb-8 space-y-4">
				<p>
					We helped put together the JavaScript track on the Warsaw IT Days on
					April 4th online and April 5th in Warsaw at the Faculty of Mathematics
					and Information Science, Warsaw University of Technology.
				</p>
				<p>
					With 25 tracks and 300 talks, including several selected by the
					meet.js crew, this is one of the largest IT events in Poland this
					year!
				</p>
				<p className="font-semibold">Hope to see you there!</p>
			</div>

			<div className="mb-8">
				<h2 className="mb-4 text-2xl font-semibold">Event Details</h2>
				<ul className="space-y-3">
					{details.map(({ name, icon: Icon, description }) => (
						<li key={name} className="flex items-start">
							<span className="bg-blue-100 mr-3 inline-flex items-center justify-center rounded-full p-1">
								<Icon className="text-blue-600 h-5 w-5" />
							</span>
							<span>
								<strong>{name}:</strong> {description}
							</span>
						</li>
					))}
				</ul>
			</div>

			<div className="mb-8">
				<h2 className="mb-4 text-2xl font-semibold">Special Discount</h2>
				<div className="bg-blue-50 border-blue-200 rounded-lg border p-6">
					<p className="mb-4">
						Until March 31st, 2025, you can buy a Standard or Executive ticket
						with a 20% discount using a special code from the Program Council:
					</p>

					<ClickToCopy textToCopy={DISCOUNT_CODE} />

					<p className="text-sm text-gray-600">
						This offer is valid only until the end of this month, so don&apos;t
						miss out!
					</p>
				</div>
			</div>

			<div className="mb-8">
				<h2 className="mb-4 text-2xl font-semibold">JavaScript Track</h2>
				<p className="mb-4">
					The meet.js crew has helped curate an exciting JavaScript track
					featuring talks on the latest frameworks, tools, and best practices.
					This is a great opportunity to learn from industry experts and connect
					with the JavaScript community.
				</p>
				<div className="mt-6 text-center">
					<ActionLink href="https://warszawskiedniinformatyki.pl/">
						Join the JavaScript Track! 💻
					</ActionLink>
				</div>
			</div>

			<div className="mt-8 text-center">
				<p className="mt-2 text-sm text-gray-600">
					For more information and registration, visit the{' '}
					<a
						href="https://warszawskiedniinformatyki.pl/"
						target="_blank"
						rel="noopener noreferrer"
						className="text-primary hover:underline"
					>
						official website
					</a>
				</p>
			</div>
		</div>
	);
}
