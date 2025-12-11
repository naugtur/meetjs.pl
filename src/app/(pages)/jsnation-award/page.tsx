import Image from 'next/image';
import Link from 'next/link';
import type { Route } from 'next';
import {
  ExternalLink,
  Heart,
  MapPin,
  Users,
  Camera,
  Video,
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

export default function JSNationAwardPage() {
  return (
    <div className="container mx-auto max-w-4xl py-16">
      <div className="mb-12 text-center">
        <div className="mb-6 flex justify-center">
          <span className="text-5xl">🏆</span>
        </div>
        <h1 className="mb-4 text-5xl font-bold tracking-tight">
          We Won! Community of the Year!
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          meet.js Wrocław has WON the JavaScript Open Source Award for{' '}
          <span className="font-semibold text-yellow-500">
            Community of the Year 2025
          </span>
          ! A huge thank you to our amazing community!
        </p>

        <div className="mt-4 flex justify-center">
          <Badge
            variant="default"
            className="flex items-center gap-1 border-yellow-300 bg-yellow-100 text-yellow-700"
          >
            🏆 Awarded on June 12, 2025
          </Badge>
        </div>
      </div>

      <div id="celebration" className="my-12 scroll-mt-20">
        {' '}
        <h2 className="mb-8 text-center text-4xl font-bold tracking-tight text-yellow-600">
          Celebrating Our Victory! 🎉
        </h2>
        <div className="flex flex-col items-center gap-8">
          <Card className="w-full max-w-2xl overflow-hidden shadow-lg">
            <CardHeader className="relative aspect-video p-0">
              <Image
                src="/jsnation-award/ceremony.jpeg"
                alt="meet.js Wrocław Team Receiving Award"
                fill
                className="object-cover"
              />
            </CardHeader>
            <CardContent className="p-6">
              <div className="mb-2 flex items-center gap-2">
                <Camera className="h-5 w-5 text-yellow-600" />
                <CardTitle className="text-xl">
                  Team Receiving the Award
                </CardTitle>
              </div>
              <p className="text-muted-foreground">
                A snapshot of the moment we received the Community of the Year
                award at JSNation 2025.
              </p>
            </CardContent>
          </Card>

          <Card className="w-full max-w-2xl overflow-hidden shadow-lg">
            <CardHeader className="relative aspect-video p-0">
              <Image
                src="/jsnation-award/award.jpeg"
                alt="JSNation Community of the Year Award"
                fill
                className="object-cover"
              />
            </CardHeader>
            <CardContent className="p-6">
              <div className="mb-2 flex items-center gap-2">
                <span className="text-xl">🏆</span>
                <CardTitle className="text-xl">The Award Itself</CardTitle>
              </div>
              <p className="text-muted-foreground">
                Our prestigious Community of the Year 2025 award from JSNation!
              </p>
            </CardContent>
          </Card>

          <Card className="w-full max-w-2xl overflow-hidden shadow-lg">
            <CardHeader className="p-0">
              <div className="aspect-video h-auto w-full">
                <iframe
                  className="h-full w-full rounded-t-lg"
                  src="https://www.youtube.com/embed/mQ9jSzh7gtE?start=1192"
                  title="YouTube video player - JSNation Awards"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="mb-2 flex items-center gap-2">
                <Video className="h-5 w-5 text-yellow-600" />
                <CardTitle className="text-xl">Video from the Event</CardTitle>
              </div>
              <p className="text-muted-foreground">
                Watch highlights from the JSNation award ceremony and our
                acceptance speech!
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mb-16 overflow-hidden rounded-xl bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 p-1 shadow-xl">
        <div className="rounded-lg bg-background p-8">
          <div className="prose prose-lg mx-auto max-w-3xl">
            <p className="lead mb-6 text-xl font-medium">
              WE WON! 🎉 We are incredibly honored and thrilled to announce that
              meet.js Wrocław has been awarded the{' '}
              <strong className="text-yellow-600">
                Community of the Year 2025
              </strong>{' '}
              at the JavaScript Open Source Awards! 🚀
            </p>

            <p className="mb-6">
              This incredible achievement wouldn&apos;t be possible without
              every single one of you — our attendees, speakers, sponsors, and
              supporters. Thank you for showing up, sharing knowledge, and
              helping build something truly special together. 🙌
            </p>

            <p className="mb-6">
              Big appreciation goes to the people behind the scenes — doing the
              work out of passion, after hours, consistently, and
              wholeheartedly. Especially thanks to the organizers:
            </p>

            <ul className="mb-6 list-inside list-disc space-y-1">
              <li>
                <a
                  href="https://www.linkedin.com/in/cdynak/?utm_source=meetjs.pl&utm_medium=referral&utm_campaign=community"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Cezary Dynak
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/aleksandrapawlus/?utm_source=meetjs.pl&utm_medium=referral&utm_campaign=community"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Aleksandra Pawlus
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/ssynowiecpl/?utm_source=meetjs.pl&utm_medium=referral&utm_campaign=community"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Stanisław Synowiec
                </a>
              </li>
            </ul>

            <p className="mb-6">
              This is a shared success - meet.js Wrocław isn&apos;t just about
              events, it&apos;s about the people who make them happen. 💚
            </p>

            <p className="mb-6">
              The award was presented on June 12 during the JSNation Conference
              in Amsterdam. It was an unforgettable moment for our team and
              community!
            </p>
            <p className="mt-6">
              P.S. We&apos;d also like to give a big shoutout to our friends at
              Gdańsk TypeScript Meetup Group, who were nominated for the{' '}
              <a
                href="https://osawards.com/react/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-yellow-600 hover:text-yellow-700"
              >
                React Open Source Awards
              </a>{' '}
              in the Community of the Year category! Congratulations to them! 🎉
            </p>
          </div>
        </div>
      </div>

      <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-3">
        <Card className="border-yellow-300 bg-yellow-50 shadow-md">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-yellow-600" />
              <CardTitle>Thank You, Community!</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              We are overjoyed to be named Community of the Year! This award
              belongs to every member of the meet.js Wrocław family. Your
              passion and engagement make us who we are.
            </p>
          </CardContent>
          <CardFooter>
            <p className="text-xs text-muted-foreground">
              Awarded at JSNation, June 12, 2025
            </p>
          </CardFooter>
        </Card>

        <Card className="border-yellow-300 bg-yellow-50 shadow-md">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <span className="text-xl">🏆</span>
              <CardTitle>Award Ceremony Highlights</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              meet.js Wrocław was honored with the Community of the Year award
              at the JSNation Conference 2025 in Amsterdam!
            </p>
            <div className="mt-4 rounded-md border border-yellow-200 bg-white p-3">
              <p className="font-medium">Awarded: June 12, 2025</p>
              <p className="text-sm text-muted-foreground">
                JSNation Conference, Amsterdam, Netherlands
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex-col items-start gap-2">
            <a
              href="https://osawards.com/javascript/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm font-medium text-green-600 hover:text-green-700"
            >
              JavaScript Open Source Awards <ExternalLink className="h-3 w-3" />
            </a>
            <a
              href="https://jsnation.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm font-medium text-green-600 hover:text-green-700"
            >
              JSNation Conference
              <ExternalLink className="h-3 w-3" />
            </a>
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
              href={'/city/wroclaw' as Route}
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
          <Card className="border-gray-200 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">JavaScript London</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                This is a community of people passionate about JavaScript. We
                believe that the best way to learn is by doing, and it&apos;s
                also the most rewarding.
              </p>
            </CardContent>
            <CardFooter>
              <a
                href="https://www.meetup.com/javascript-london/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-medium text-yellow-600 hover:text-yellow-700"
              >
                Visit Meetup Page <ExternalLink className="h-3 w-3" />
              </a>
            </CardFooter>
          </Card>

          <Card className="border-gray-200 shadow-sm">
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
              <a
                href="https://www.meetup.com/advancedjs-amsterdam/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-medium text-yellow-600 hover:text-yellow-700"
              >
                Visit Meetup Page <ExternalLink className="h-3 w-3" />
              </a>
            </CardFooter>
          </Card>

          <Card className="border-gray-200 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">CopenhagenJS</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                CopenhagenJS is a monthly meetup group about JavaScript and all
                web technologies. It is a group focused on community building
                and sharing information.
              </p>
            </CardContent>
            <CardFooter>
              <a
                href="https://www.meetup.com/copenhagenjs"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-medium text-yellow-600 hover:text-yellow-700"
              >
                Visit Meetup Page <ExternalLink className="h-3 w-3" />
              </a>
            </CardFooter>
          </Card>
        </div>
      </div>

      <div className="mb-12 text-center">
        <h2 className="mb-6 text-center text-2xl font-bold">
          Share the Great News!
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
          <Button
            variant="outline"
            className="border-yellow-300 bg-yellow-100 text-yellow-700 hover:bg-yellow-200 hover:text-yellow-800"
            asChild
          >
            <a
              href={`https://x.com/intent/tweet?text=${encodeURIComponent('WE WON! meet.js Wrocław is the JavaScript Open Source Awards Community of the Year 2025! 🏆 So proud of our amazing community! #MeetjsWroclaw #JSAwardsWinner #CommunityOfTheYear #JavaScript')}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Share on Twitter
            </a>
          </Button>
          <Button
            variant="outline"
            className="border-yellow-300 bg-yellow-100 text-yellow-700 hover:bg-yellow-200 hover:text-yellow-800"
            asChild
          >
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://meet.js.pl/jsnation-award')}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Share on LinkedIn
            </a>
          </Button>
          <Button
            variant="outline"
            className="border-yellow-300 bg-yellow-100 text-yellow-700 hover:bg-yellow-200 hover:text-yellow-800"
            asChild
          >
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://meet.js.pl/jsnation-award')}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Share on Facebook
            </a>
          </Button>
        </div>
      </div>

      <div className="text-center">
        <p className="text-muted-foreground">
          Thank you for making this possible! We are incredibly grateful! ❤️
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          #MeetjsWroclaw #JSAwardsWinner #CommunityOfTheYear #JavaScript
          #OpenSource #JSNation #TechCommunity #Grateful
        </p>
      </div>
    </div>
  );
}
