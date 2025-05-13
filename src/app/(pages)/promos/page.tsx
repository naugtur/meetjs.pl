import { SpecialPromoBanners } from '@/components/SpecialPromoBanners';
import { promos } from '@/content/promos';
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
	CardFooter,
} from '@/components/ui/card';
import { CalendarDays, Gift, Tag, Ticket } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Promos & Marketing Events | meet.js',
	description:
		'Special offers, discounts, and marketing events for the meet.js community.',
};

export default function PromosPage() {
	return (
		<div className="container mx-auto max-w-4xl py-16">
			<div className="mb-12 text-center">
				<h1 className="mb-4 text-5xl font-bold tracking-tight">
					Promos & Events
				</h1>
				<p className="mx-auto max-w-2xl text-lg text-muted-foreground">
					Exclusive offers and special events for the meet.js community. Take
					advantage of these limited-time opportunities!
				</p>
			</div>

			<Card className="mb-12 overflow-hidden border-purple shadow-xl">
				<div className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 p-1">
					<div className="bg-background p-5">
						<CardHeader className="pb-2">
							<div className="flex items-center gap-2">
								<span className="rounded-full bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 p-2 text-white">
									<Gift className="h-5 w-5" />
								</span>
								<CardTitle className="text-2xl font-bold">
									Exclusive Community Benefits
								</CardTitle>
							</div>
							<CardDescription className="mt-2 text-base">
								As a valued member of the meet.js community, you have access to
								these special offers from our partners.
							</CardDescription>
						</CardHeader>
						<CardContent className="pt-4">
							<div className="grid gap-6 md:grid-cols-3">
								<div className="flex flex-col gap-2">
									<div className="flex items-center gap-2">
										<Ticket className="h-5 w-5 text-purple" />
										<h3 className="font-semibold">Event Discounts</h3>
									</div>
									<p className="text-sm text-muted-foreground">
										Special pricing for conferences and workshops around the
										world
									</p>
								</div>
								<div className="flex flex-col gap-2">
									<div className="flex items-center gap-2">
										<Tag className="h-5 w-5 text-blue" />
										<h3 className="font-semibold">Partner Perks</h3>
									</div>
									<p className="text-sm text-muted-foreground">
										Exclusive offers from our technology and education partners
									</p>
								</div>
								<div className="flex flex-col gap-2">
									<div className="flex items-center gap-2">
										<CalendarDays className="h-5 w-5 text-green" />
										<h3 className="font-semibold">Early Access</h3>
									</div>
									<p className="text-sm text-muted-foreground">
										Be the first to know about upcoming events and opportunities
									</p>
								</div>
							</div>
						</CardContent>
					</div>
				</div>
				<CardFooter className="bg-muted/50 p-6">
					<p className="text-sm text-muted-foreground">
						<span className="font-semibold">Note:</span> All promotions are
						time-limited and subject to partner terms and conditions. Check
						expiration dates before redeeming.
					</p>
				</CardFooter>
			</Card>

			<div className="mb-8">
				<h2 className="mb-6 text-2xl font-bold">Current Promotions</h2>
				<SpecialPromoBanners promos={promos} />
			</div>
		</div>
	);
}
