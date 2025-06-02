import Link from 'next/link';
import {
	Award,
	Calendar,
	Clock,
	ExternalLink,
	Heart,
	MapPin,
	Users,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const metadata = {
	title: 'meet.js Wrocław - Thank You for Your Support | meet.js',
	description:
		'Thank you for supporting meet.js Wrocław in the JavaScript Open Source Awards 2025 Community of the Year category!',
};

export default function JSNationAwardPage() {
	return (
		<div className="container mx-auto max-w-4xl py-16">
			<div className="mb-12 text-center">
				<div className="mb-6 flex justify-center">
					<span className="inline-block rounded-full bg-green-100 p-3">
						<Award className="h-12 w-12 text-green-600" />
					</span>
				</div>
				<h1 className="mb-4 text-5xl font-bold tracking-tight">
					Thank You for Your Support! 🙏
				</h1>
				<p className="mx-auto max-w-2xl text-lg text-muted-foreground">
					meet.js Wrocław was nominated for the JavaScript Open Source Awards in
					the{' '}
					<span className="font-semibold text-green-600">
						Community of the Year
					</span>{' '}
					category!
				</p>
				<div className="mt-8 flex justify-center">
					<Button
						size="lg"
						variant="outline"
						className="border-green-200 bg-green-50 text-green-700 hover:bg-green-100"
						disabled
					>
						<Award className="h-5 w-5" />
						Voting has ended
					</Button>
				</div>
				<div className="mt-4 flex justify-center">
					<Badge
						variant="outline"
						className="flex items-center gap-1 bg-gray-100 text-gray-700"
					>
						<Clock className="h-3 w-3" /> Voting ended on May 30, 2025
					</Badge>
				</div>
			</div>

			<div className="mb-16 overflow-hidden rounded-xl bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 p-1 shadow-xl">
				<div className="rounded-lg bg-background p-8">
					<div className="prose prose-lg mx-auto max-w-3xl">
						<p className="lead mb-6 text-xl font-medium">
							Grateful, surprised, and excited — meet.js Wrocław has been
							nominated for the JavaScript Open Source Awards in the Community
							of the Year category! 🚀
						</p>

						<p className="mb-6">
							Thank you to everyone who&apos;s part of this community — for
							showing up, sharing knowledge and helping build something
							meaningful together. 🙌
						</p>

						<p className="mb-6">
							Big appreciation goes to the people behind the scenes — doing the
							work out of passion, after hours, consistently, and
							wholeheartedly. Especially thanks to the organizers:
						</p>

						<ul className="mb-6 list-inside list-disc space-y-1">
							<li>
								<Link href="https://www.linkedin.com/in/cdynak/?utm_source=meetjs.pl&utm_medium=referral&utm_campaign=community">
									Cezary Dynak
								</Link>
							</li>
							<li>
								<Link href="https://www.linkedin.com/in/aleksandrapawlus/?utm_source=meetjs.pl&utm_medium=referral&utm_campaign=community">
									Aleksandra Pawlus
								</Link>
							</li>
							<li>
								<Link href="https://www.linkedin.com/in/ssynowiecpl/?utm_source=meetjs.pl&utm_medium=referral&utm_campaign=community">
									Stanisław Synowiec
								</Link>
							</li>
						</ul>

						<p className="mb-6">
							This is a shared success - meet.js Wrocław isn&apos;t just about
							events, it&apos;s about the people who make them happen. 💚
						</p>

						<p className="mb-6">
							The awards ceremony will take place on June 12 during JSNation
							Conference in Amsterdam. We&apos;ll update this page with the
							results after the ceremony!
						</p>
						<p className="mt-6">
							P.S. We&apos;d also like to give a big shoutout to our friends at
							Gdańsk TypeScript Meetup Group, who were nominated for the{' '}
							<Link
								href="https://osawards.com/react/"
								target="_blank"
								rel="noopener noreferrer"
								className="text-green-600 hover:text-green-700"
							>
								React Open Source Awards
							</Link>{' '}
							in the Community of the Year category! Congratulations to them! 🎉
						</p>
					</div>
				</div>
			</div>

			<div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-3">
				<Card className="border-green-200 bg-green-50 shadow-md">
					<CardHeader className="pb-2">
						<div className="flex items-center gap-2">
							<Award className="h-5 w-5 text-green-600" />
							<CardTitle>Voting Has Ended</CardTitle>
						</div>
					</CardHeader>
					<CardContent>
						<p className="text-muted-foreground">
							Thank you to everyone who voted for meet.js Wrocław in the
							Community of the Year category! Your support means the world to
							us.
						</p>
						<div className="mt-4">
							<Button
								variant="outline"
								className="w-full border-green-200 bg-white text-green-700"
								disabled
							>
								Voting has ended
							</Button>
						</div>
					</CardContent>
					<CardFooter>
						<p className="text-xs text-muted-foreground">
							Voting ended on May 30, 2025
						</p>
					</CardFooter>
				</Card>

				<Card className="border-green-200 bg-green-50 shadow-md">
					<CardHeader className="pb-2">
						<div className="flex items-center gap-2">
							<Calendar className="h-5 w-5 text-green-600" />
							<CardTitle>Award Ceremony</CardTitle>
						</div>
					</CardHeader>
					<CardContent>
						<p className="text-muted-foreground">
							The JavaScript Open Source Awards ceremony will take place during
							JSNation Conference 2025. Check back here after the event for
							updates!
						</p>
						<div className="mt-4 rounded-md border border-green-100 bg-white p-3">
							<p className="font-medium">June 12, 2025</p>
							<p className="text-sm text-muted-foreground">
								Amsterdam, Netherlands
							</p>
						</div>
					</CardContent>
					<CardFooter className="flex-col items-start gap-2">
						<Link
							href="https://osawards.com/javascript/"
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center gap-1 text-sm font-medium text-green-600 hover:text-green-700"
						>
							JavaScript Open Source Awards <ExternalLink className="h-3 w-3" />
						</Link>
						<Link
							href="https://jsnation.com/"
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center gap-1 text-sm font-medium text-green-600 hover:text-green-700"
						>
							JSNation Conference
							<ExternalLink className="h-3 w-3" />
						</Link>
					</CardFooter>
				</Card>

				<Card className="border-green-200 shadow-md">
					<CardHeader className="pb-2">
						<div className="flex items-center gap-2">
							<Users className="h-5 w-5 text-green-600" />
							<CardTitle>About meet.js Wrocław</CardTitle>
						</div>
					</CardHeader>
					<CardContent>
						<p className="text-muted-foreground">
							meet.js Wrocław is a vibrant community of JavaScript developers in
							Wrocław, Poland, organizing regular meetups, workshops, and
							knowledge-sharing events.
						</p>
						<div className="mt-4 rounded-md bg-muted p-3">
							<div className="flex items-center gap-2">
								<MapPin className="h-4 w-4 text-muted-foreground" />
								<p className="text-sm font-medium">Wrocław, Poland</p>
							</div>
							<div className="mt-2 flex items-center gap-2">
								<Heart className="h-4 w-4 text-muted-foreground" />
								<p className="text-sm font-medium">
									Community-driven since 2011
								</p>
							</div>
						</div>
					</CardContent>
					<CardFooter>
						<Link
							href="/city/wroclaw"
							className="inline-flex items-center gap-1 text-sm font-medium text-green-600 hover:text-green-700"
						>
							Learn more about meet.js Wrocław
						</Link>
					</CardFooter>
				</Card>
			</div>

			<div className="mb-16">
				<h2 className="mb-6 text-center text-2xl font-bold">Other Nominees</h2>
				<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
					<Card className="border-green-100 shadow-sm">
						<CardHeader className="pb-2">
							<CardTitle className="text-lg">JavaScript London</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-sm text-muted-foreground">
								A community of people passionate about JavaScript. They believe
								that the best way to learn is by doing, and it&apos;s also the
								most rewarding.
							</p>
						</CardContent>
						<CardFooter>
							<Link
								href="https://www.meetup.com/javascript-london/"
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex items-center gap-1 text-xs font-medium text-green-600 hover:text-green-700"
							>
								Visit Meetup Page <ExternalLink className="h-3 w-3" />
							</Link>
						</CardFooter>
					</Card>

					<Card className="border-green-100 bg-green-50 shadow-sm">
						<CardHeader className="pb-2">
							<CardTitle className="text-lg">meet.js Wrocław</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-sm text-muted-foreground">
								Cyclic meetings of JavaScript and TypeScript programmers in
								Wroclaw. You can count on lectures on both frontend (Angular,
								React, Vue) and backend (Node.js, Deno, etc.).
							</p>
						</CardContent>
						<CardFooter>
							<Link
								href="https://www.meetup.com/meet-js-wroclaw/"
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex items-center gap-1 text-xs font-medium text-green-600 hover:text-green-700"
							>
								Visit Meetup Page <ExternalLink className="h-3 w-3" />
							</Link>
						</CardFooter>
					</Card>

					<Card className="border-green-100 shadow-sm">
						<CardHeader className="pb-2">
							<CardTitle className="text-lg">AdvancedJS Amsterdam</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-sm text-muted-foreground">
								Meetups about JavaScript, React, deep-dives, and the latest tech
								updates to learn all tricks of the trade from the experts.
							</p>
						</CardContent>
						<CardFooter>
							<Link
								href="https://www.meetup.com/advancedjs-amsterdam/"
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex items-center gap-1 text-xs font-medium text-green-600 hover:text-green-700"
							>
								Visit Meetup Page <ExternalLink className="h-3 w-3" />
							</Link>
						</CardFooter>
					</Card>
				</div>
			</div>

			<div className="mb-12 text-center">
				<h2 className="mb-6 text-center text-2xl font-bold">
					Thank You for Your Support!
				</h2>
				<div className="flex flex-wrap justify-center gap-4">
					<Button
						variant="outline"
						className="border-green-200 bg-green-50 text-green-700 hover:bg-green-100 hover:text-green-800"
						asChild
					>
						<Link
							href={`https://x.com/intent/tweet?text=${encodeURIComponent('meet.js Wrocław was nominated for the JavaScript Open Source Awards in the Community of the Year category! 🏆 #MeetjsWroclaw #JavaScript #OpenSource')}`}
							target="_blank"
							rel="noopener noreferrer"
						>
							Share on Twitter
						</Link>
					</Button>
					<Button
						variant="outline"
						className="border-green-200 bg-green-50 text-green-700 hover:bg-green-100 hover:text-green-800"
						asChild
					>
						<Link
							href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://meet.js.pl/jsnation-award')}`}
							target="_blank"
							rel="noopener noreferrer"
						>
							Share on LinkedIn
						</Link>
					</Button>
					<Button
						variant="outline"
						className="border-green-200 bg-green-50 text-green-700 hover:bg-green-100 hover:text-green-800"
						asChild
					>
						<Link
							href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://meet.js.pl/jsnation-award')}`}
							target="_blank"
							rel="noopener noreferrer"
						>
							Share on Facebook
						</Link>
					</Button>
				</div>
			</div>

			<div className="text-center">
				<p className="text-muted-foreground">
					Thank you for being part of our community! ❤️
				</p>
				<p className="mt-2 text-sm text-muted-foreground">
					#MeetjsWroclaw #JavaScript #OpenSource #CommunityOfTheYear #JSNation
					#TechCommunity
				</p>
			</div>
		</div>
	);
}
