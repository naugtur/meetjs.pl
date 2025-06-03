import { discounts } from '@/content/discounts';
import { softwareDiscounts } from '@/content/software-discounts';
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
	CardFooter,
} from '@/components/ui/card';
import { CalendarDays, Gift, Tag, Ticket, Monitor } from 'lucide-react';
import { Metadata } from 'next';
import { SoftwarePromoCard } from '@/components/SoftwarePromoCard';
import { EventDiscountCard } from '@/components/EventDiscountCard';

export const metadata: Metadata = {
	title: 'Software & Event Discounts | meet.js',
	description:
		'Exclusive discounts on software tools and event tickets for the meet.js community.',
};

export default function DiscountsPage() {
	return (
		<div className="container mx-auto max-w-4xl py-16">
			<div className="mb-12 text-center">
				<h1 className="mb-4 text-5xl font-bold tracking-tight">
					Community Discounts
				</h1>
				<p className="mx-auto max-w-2xl text-lg text-muted-foreground">
					Exclusive discounts on software tools and event tickets for the
					meet.js community. Take advantage of these limited-time opportunities!
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
								these special discounts from our partners.
							</CardDescription>
						</CardHeader>
						<CardContent className="pt-4">
							<div className="grid gap-6 md:grid-cols-4">
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
										<Monitor className="text-indigo h-5 w-5" />
										<h3 className="font-semibold">Software Tools</h3>
									</div>
									<p className="text-sm text-muted-foreground">
										Premium software and developer tools at discounted rates
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
						<span className="font-semibold">Note:</span> All discounts are
						time-limited and subject to partner terms and conditions. Check
						expiration dates before redeeming.
					</p>
				</CardFooter>
			</Card>

			{softwareDiscounts.length > 0 && (
				<div className="mb-8">
					<div className="mb-6 flex items-center gap-3">
						<Monitor className="text-indigo h-6 w-6" />
						<h2 className="text-2xl font-bold">Software & Tools</h2>
					</div>
					<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
						{softwareDiscounts.map((promo) => (
							<SoftwarePromoCard key={promo.id} promo={promo} />
						))}
					</div>
				</div>
			)}

			{discounts.length > 0 && (
				<div className="mb-8">
					<div className="mb-6 flex items-center gap-3">
						<Ticket className="h-6 w-6 text-purple" />
						<h2 className="text-2xl font-bold">Events & Conferences</h2>
					</div>
					<EventDiscountCard promos={discounts} />
				</div>
			)}
		</div>
	);
}
