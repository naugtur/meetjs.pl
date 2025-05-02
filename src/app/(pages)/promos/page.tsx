import { SpecialPromoBanners } from '@/components/SpecialPromoBanners';
import { promos } from '@/content/promos';
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from '@/components/ui/card';

export const metadata = {
	title: 'Promos & Marketing Events | meet.js',
	description:
		'Special offers, discounts, and marketing events for the meet.js community.',
};

export default function PromosPage() {
	return (
		<div className="container mx-auto max-w-3xl py-16">
			<h1 className="mb-4 text-4xl font-bold">Promos & Marketing Events</h1>
			<p className="mb-8 text-lg text-muted-foreground">
				Explore current promotions, partner discounts, and special marketing
				events available to the meet.js community.
			</p>

			<Card className="mb-8 border-purple bg-gradient-to-r from-purple/20 via-green/10 to-blue/10 text-black shadow-lg">
				<CardHeader>
					<CardTitle className="flex items-center gap-2 text-2xl">
						🎉 Exclusive for meet.js Community!
					</CardTitle>
					<CardDescription className="text-black/80">
						Unlock special discounts and offers from our partners. Stay tuned
						for unique opportunities only available here!
					</CardDescription>
				</CardHeader>
				<CardContent>
					<ul className="list-disc space-y-1 pl-5 text-black/80">
						<li>Discounted tickets to top conferences and events</li>
						<li>Partner perks and giveaways</li>
						<li>Early access to community programs</li>
					</ul>
				</CardContent>
			</Card>

			<SpecialPromoBanners promos={promos} />
		</div>
	);
}
