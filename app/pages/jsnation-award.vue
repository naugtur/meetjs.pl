<script setup lang="ts">
import {
  Camera,
  ExternalLink,
  Heart,
  MapPin,
  Users,
  Video,
} from 'lucide-vue-next';

const siteUrl = useSiteUrl();

const description =
  'meet.js Wrocław has WON the JavaScript Open Source Award for Community of the Year 2025! Thank you for your incredible support!';
useSiteMeta({
  title: 'WE WON! meet.js Wrocław - Community of the Year 2025 | meet.js',
  description,
  canonical: siteUrl('/jsnation-award'),
  openGraph: {
    title: 'WE WON! meet.js Wrocław - Community of the Year 2025 | meet.js',
    description,
    url: 'https://meetjs.pl/jsnation-award',
    siteName: 'meet.js',
    images: [DEFAULT_OG_IMAGE],
    locale: 'en_US',
    type: 'website',
  },
});

// Former <Button variant="outline" asChild> share links
const shareButtonClass = cn(
  buttonVariants({
    variant: 'outline',
    class:
      'border-yellow-300 bg-yellow-100 text-yellow-700 hover:bg-yellow-200 hover:text-yellow-800',
  }),
);
const twitterShareUrl = `https://x.com/intent/tweet?text=${encodeURIComponent('WE WON! meet.js Wrocław is the JavaScript Open Source Awards Community of the Year 2025! 🏆 So proud of our amazing community! #MeetjsWroclaw #JSAwardsWinner #CommunityOfTheYear #JavaScript')}`;
const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://meet.js.pl/jsnation-award')}`;
const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://meet.js.pl/jsnation-award')}`;
</script>

<template>
  <div class="container mx-auto max-w-4xl py-16">
    <div class="mb-12 text-center">
      <div class="mb-6 flex justify-center">
        <span class="text-5xl">🏆</span>
      </div>
      <h1 class="mb-4 text-5xl font-bold tracking-tight">
        We Won! Community of the Year!
      </h1>
      <p class="mx-auto max-w-2xl text-lg text-muted-foreground">
        meet.js Wrocław has WON the JavaScript Open Source Award for
        <span class="font-semibold text-yellow-500"
          >Community of the Year 2025</span
        >! A huge thank you to our amazing community!
      </p>

      <div class="mt-4 flex justify-center">
        <UiBadge
          variant="default"
          class="flex items-center gap-1 border-yellow-300 bg-yellow-100 text-yellow-700"
        >
          🏆 Awarded on June 12, 2025
        </UiBadge>
      </div>
    </div>

    <div id="celebration" class="my-12 scroll-mt-20">
      {{ ' ' }}
      <h2
        class="mb-8 text-center text-4xl font-bold tracking-tight text-yellow-600"
      >
        Celebrating Our Victory! 🎉
      </h2>
      <div class="flex flex-col items-center gap-8">
        <UiCard class="w-full max-w-2xl overflow-hidden shadow-lg">
          <UiCardHeader class="relative aspect-video p-0">
            <AppImage
              src="/jsnation-award/ceremony.jpeg"
              alt="meet.js Wrocław Team Receiving Award"
              fill
              class="object-cover"
            />
          </UiCardHeader>
          <UiCardContent class="p-6">
            <div class="mb-2 flex items-center gap-2">
              <Camera class="h-5 w-5 text-yellow-600" />
              <UiCardTitle class="text-xl">
                Team Receiving the Award
              </UiCardTitle>
            </div>
            <p class="text-muted-foreground">
              A snapshot of the moment we received the Community of the Year
              award at JSNation 2025.
            </p>
          </UiCardContent>
        </UiCard>

        <UiCard class="w-full max-w-2xl overflow-hidden shadow-lg">
          <UiCardHeader class="relative aspect-video p-0">
            <AppImage
              src="/jsnation-award/award.jpeg"
              alt="JSNation Community of the Year Award"
              fill
              class="object-cover"
            />
          </UiCardHeader>
          <UiCardContent class="p-6">
            <div class="mb-2 flex items-center gap-2">
              <span class="text-xl">🏆</span>
              <UiCardTitle class="text-xl">The Award Itself</UiCardTitle>
            </div>
            <p class="text-muted-foreground">
              Our prestigious Community of the Year 2025 award from JSNation!
            </p>
          </UiCardContent>
        </UiCard>

        <UiCard class="w-full max-w-2xl overflow-hidden shadow-lg">
          <UiCardHeader class="p-0">
            <div class="aspect-video h-auto w-full">
              <iframe
                class="h-full w-full rounded-t-lg"
                src="https://www.youtube.com/embed/mQ9jSzh7gtE?start=1192"
                title="YouTube video player - JSNation Awards"
                allow="
                  accelerometer;
                  autoplay;
                  clipboard-write;
                  encrypted-media;
                  gyroscope;
                  picture-in-picture;
                  web-share;
                "
                allowfullscreen
              ></iframe>
            </div>
          </UiCardHeader>
          <UiCardContent class="p-6">
            <div class="mb-2 flex items-center gap-2">
              <Video class="h-5 w-5 text-yellow-600" />
              <UiCardTitle class="text-xl">Video from the Event</UiCardTitle>
            </div>
            <p class="text-muted-foreground">
              Watch highlights from the JSNation award ceremony and our
              acceptance speech!
            </p>
          </UiCardContent>
        </UiCard>
      </div>
    </div>

    <div
      class="mb-16 overflow-hidden rounded-xl bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 p-1 shadow-xl"
    >
      <div class="rounded-lg bg-background p-8">
        <div class="prose prose-lg mx-auto max-w-3xl">
          <p class="lead mb-6 text-xl font-medium">
            WE WON! 🎉 We are incredibly honored and thrilled to announce that
            meet.js Wrocław has been awarded the
            <strong class="text-yellow-600">
              Community of the Year 2025
            </strong>
            at the JavaScript Open Source Awards! 🚀
          </p>

          <p class="mb-6">
            This incredible achievement wouldn't be possible without every
            single one of you — our attendees, speakers, sponsors, and
            supporters. Thank you for showing up, sharing knowledge, and helping
            build something truly special together. 🙌
          </p>

          <p class="mb-6">
            Big appreciation goes to the people behind the scenes — doing the
            work out of passion, after hours, consistently, and wholeheartedly.
            Especially thanks to the organizers:
          </p>

          <ul class="mb-6 list-inside list-disc space-y-1">
            <li>
              <a
                href="https://www.linkedin.com/in/cdynak/?utm_source=meetjs.pl&utm_medium=referral&utm_campaign=community"
                target="_blank"
                rel="noopener"
              >
                Cezary Dynak
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/aleksandrapawlus/?utm_source=meetjs.pl&utm_medium=referral&utm_campaign=community"
                target="_blank"
                rel="noopener"
              >
                Aleksandra Pawlus
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/ssynowiecpl/?utm_source=meetjs.pl&utm_medium=referral&utm_campaign=community"
                target="_blank"
                rel="noopener"
              >
                Stanisław Synowiec
              </a>
            </li>
          </ul>

          <p class="mb-6">
            This is a shared success - meet.js Wrocław isn't just about events,
            it's about the people who make them happen. 💚
          </p>

          <p class="mb-6">
            The award was presented on June 12 during the JSNation Conference in
            Amsterdam. It was an unforgettable moment for our team and
            community!
          </p>
          <p class="mt-6">
            P.S. We'd also like to give a big shoutout to our friends at Gdańsk
            TypeScript Meetup Group, who were nominated for the
            <a
              href="https://osawards.com/react/"
              target="_blank"
              rel="noopener"
              class="text-yellow-600 hover:text-yellow-700"
            >
              React Open Source Awards
            </a>
            in the Community of the Year category! Congratulations to them! 🎉
          </p>
        </div>
      </div>
    </div>

    <div class="mb-16 grid grid-cols-1 gap-8 md:grid-cols-3">
      <UiCard class="border-yellow-300 bg-yellow-50 shadow-md">
        <UiCardHeader class="pb-2">
          <div class="flex items-center gap-2">
            <Heart class="h-5 w-5 text-yellow-600" />
            <UiCardTitle>Thank You, Community!</UiCardTitle>
          </div>
        </UiCardHeader>
        <UiCardContent>
          <p class="text-muted-foreground">
            We are overjoyed to be named Community of the Year! This award
            belongs to every member of the meet.js Wrocław family. Your passion
            and engagement make us who we are.
          </p>
        </UiCardContent>
        <UiCardFooter>
          <p class="text-xs text-muted-foreground">
            Awarded at JSNation, June 12, 2025
          </p>
        </UiCardFooter>
      </UiCard>

      <UiCard class="border-yellow-300 bg-yellow-50 shadow-md">
        <UiCardHeader class="pb-2">
          <div class="flex items-center gap-2">
            <span class="text-xl">🏆</span>
            <UiCardTitle>Award Ceremony Highlights</UiCardTitle>
          </div>
        </UiCardHeader>
        <UiCardContent>
          <p class="text-muted-foreground">
            meet.js Wrocław was honored with the Community of the Year award at
            the JSNation Conference 2025 in Amsterdam!
          </p>
          <div class="mt-4 rounded-md border border-yellow-200 bg-white p-3">
            <p class="font-medium">Awarded: June 12, 2025</p>
            <p class="text-sm text-muted-foreground">
              JSNation Conference, Amsterdam, Netherlands
            </p>
          </div>
        </UiCardContent>
        <UiCardFooter class="flex-col items-start gap-2">
          <a
            href="https://osawards.com/javascript/"
            target="_blank"
            rel="noopener"
            class="inline-flex items-center gap-1 text-sm font-medium text-green-600 hover:text-green-700"
          >
            JavaScript Open Source Awards <ExternalLink class="h-3 w-3" />
          </a>
          <a
            href="https://jsnation.com/"
            target="_blank"
            rel="noopener"
            class="inline-flex items-center gap-1 text-sm font-medium text-green-600 hover:text-green-700"
          >
            JSNation Conference
            <ExternalLink class="h-3 w-3" />
          </a>
        </UiCardFooter>
      </UiCard>

      <UiCard class="border-green-200 shadow-md">
        <UiCardHeader class="pb-2">
          <div class="flex items-center gap-2">
            <Users class="h-5 w-5 text-green-600" />
            <UiCardTitle>About meet.js Wrocław</UiCardTitle>
          </div>
        </UiCardHeader>
        <UiCardContent>
          <p class="text-muted-foreground">
            meet.js Wrocław is a vibrant community of JavaScript developers in
            Wrocław, Poland, organizing regular meetups, workshops, and
            knowledge-sharing events.
          </p>
          <div class="mt-4 rounded-md bg-muted p-3">
            <div class="flex items-center gap-2">
              <MapPin class="h-4 w-4 text-muted-foreground" />
              <p class="text-sm font-medium">Wrocław, Poland</p>
            </div>
            <div class="mt-2 flex items-center gap-2">
              <Heart class="h-4 w-4 text-muted-foreground" />
              <p class="text-sm font-medium">Community-driven since 2011</p>
            </div>
          </div>
        </UiCardContent>
        <UiCardFooter>
          <NuxtLink
            to="/wroclaw"
            class="inline-flex items-center gap-1 text-sm font-medium text-green-600 hover:text-green-700"
          >
            Learn more about meet.js Wrocław
          </NuxtLink>
        </UiCardFooter>
      </UiCard>
    </div>

    <div class="mb-16">
      <h2 class="mb-6 text-center text-2xl font-bold">Other Nominees</h2>
      <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <UiCard class="border-gray-200 shadow-sm">
          <UiCardHeader class="pb-2">
            <UiCardTitle class="text-lg">JavaScript London</UiCardTitle>
          </UiCardHeader>
          <UiCardContent>
            <p class="text-sm text-muted-foreground">
              This is a community of people passionate about JavaScript. We
              believe that the best way to learn is by doing, and it's also the
              most rewarding.
            </p>
          </UiCardContent>
          <UiCardFooter>
            <a
              href="https://www.meetup.com/javascript-london/"
              target="_blank"
              rel="noopener"
              class="inline-flex items-center gap-1 text-xs font-medium text-yellow-600 hover:text-yellow-700"
            >
              Visit Meetup Page <ExternalLink class="h-3 w-3" />
            </a>
          </UiCardFooter>
        </UiCard>

        <UiCard class="border-gray-200 shadow-sm">
          <UiCardHeader class="pb-2">
            <UiCardTitle class="text-lg">AdvancedJS Amsterdam</UiCardTitle>
          </UiCardHeader>
          <UiCardContent>
            <p class="text-sm text-muted-foreground">
              Meetups about JavaScript, React, deep-dives, and the latest tech
              updates to learn all tricks of the trade from the experts.
            </p>
          </UiCardContent>
          <UiCardFooter>
            <a
              href="https://www.meetup.com/advancedjs-amsterdam/"
              target="_blank"
              rel="noopener"
              class="inline-flex items-center gap-1 text-xs font-medium text-yellow-600 hover:text-yellow-700"
            >
              Visit Meetup Page <ExternalLink class="h-3 w-3" />
            </a>
          </UiCardFooter>
        </UiCard>

        <UiCard class="border-gray-200 shadow-sm">
          <UiCardHeader class="pb-2">
            <UiCardTitle class="text-lg">CopenhagenJS</UiCardTitle>
          </UiCardHeader>
          <UiCardContent>
            <p class="text-sm text-muted-foreground">
              CopenhagenJS is a monthly meetup group about JavaScript and all
              web technologies. It is a group focused on community building and
              sharing information.
            </p>
          </UiCardContent>
          <UiCardFooter>
            <a
              href="https://www.meetup.com/copenhagenjs"
              target="_blank"
              rel="noopener"
              class="inline-flex items-center gap-1 text-xs font-medium text-yellow-600 hover:text-yellow-700"
            >
              Visit Meetup Page <ExternalLink class="h-3 w-3" />
            </a>
          </UiCardFooter>
        </UiCard>
      </div>
    </div>

    <div class="mb-12 text-center">
      <h2 class="mb-6 text-center text-2xl font-bold">Share the Great News!</h2>
      <div class="flex flex-wrap justify-center gap-4">
        <a
          :href="twitterShareUrl"
          target="_blank"
          rel="noopener"
          :class="shareButtonClass"
        >
          Share on Twitter
        </a>
        <a
          :href="linkedInShareUrl"
          target="_blank"
          rel="noopener"
          :class="shareButtonClass"
        >
          Share on LinkedIn
        </a>
        <a
          :href="facebookShareUrl"
          target="_blank"
          rel="noopener"
          :class="shareButtonClass"
        >
          Share on Facebook
        </a>
      </div>
    </div>

    <div class="text-center">
      <p class="text-muted-foreground">
        Thank you for making this possible! We are incredibly grateful! ❤️
      </p>
      <p class="mt-2 text-sm text-muted-foreground">
        #MeetjsWroclaw #JSAwardsWinner #CommunityOfTheYear #JavaScript
        #OpenSource #JSNation #TechCommunity #Grateful
      </p>
    </div>
  </div>
</template>
