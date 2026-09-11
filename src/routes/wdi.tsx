import { For } from 'solid-js';
import { Banner } from '@/components/Banner';
import { ActionLink } from '@/components/ActionLink';
import { ClickToCopy } from '@/components/ClickToCopy';

import { CalendarIcon } from '@/components/wdi/icons/CalendarIcon';
import { LocationPinIcon } from '@/components/wdi/icons/LocationPinIcon';
import { StackedFoldersIcon } from '@/components/wdi/icons/StackedFoldersIcon';

const DISCOUNT_CODE = 'WID26RP20';
const DISCOUNT_END_DATE = new Date('2026-03-20');

const details = [
  {
    icon: CalendarIcon,
    name: 'Dates',
    description: 'March 19th, 2026 (online) and March 20th, 2026 (in-person)',
  },
  {
    icon: LocationPinIcon,
    name: 'Location',
    description: 'PGE Narodowy, Warsaw',
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
    <div class="container mx-auto max-w-3xl py-16">
      <div class="mb-8 flex flex-col items-start justify-between md:flex-row md:items-center">
        <h1 class="mb-4 text-4xl font-bold md:mb-0">Warsaw IT Days 2026</h1>
        <ActionLink href="https://warszawskiedniinformatyki.pl/">
          Register Now! 🚀
        </ActionLink>
      </div>

      <Banner variant="warning">
        {daysRemaining >= 0 ? (
          <>
            <p class="font-semibold">Discount ends soon!</p>
            <p>
              Only {daysRemaining} days left to get 20% off with code:{' '}
              <span class="rounded bg-gray-100 px-2 py-1 font-mono">
                {DISCOUNT_CODE}
              </span>
            </p>{' '}
          </>
        ) : (
          <>
            <p class="font-semibold">The discount has ended!</p>
            <p>
              Thank you for participating in this year’s edition — we’ll see you
              in{' '}
              <span class="rounded bg-gray-100 px-2 py-1 font-mono">
                {DISCOUNT_END_DATE.getFullYear() + 1}
              </span>
              !
            </p>
          </>
        )}
      </Banner>

      <div class="mb-8 space-y-4">
        <p>
          We helped put together the JavaScript track on the Warsaw IT Days on
          March 19th online and March 20th in Warsaw at PGE Narodowy.
        </p>
        <p>
          With 25+ tracks and 300+ talks, including several selected by the
          meet.js crew, this is one of the largest IT events in Poland this
          year! The 17th edition brings together over 10,000 IT & Data Science
          professionals.
        </p>
        <p class="font-semibold">Hope to see you there!</p>
      </div>

      <div class="mb-8">
        <h2 class="mb-4 text-2xl font-semibold">Event Details</h2>
        <ul class="space-y-3">
          {
            <For each={details}>
              {({ name, icon: Icon, description }) => (
                <li class="flex items-start">
                  <span class="mr-3 inline-flex items-center justify-center rounded-full bg-blue-100 p-1">
                    <Icon class="h-5 w-5 text-blue-600" />
                  </span>
                  <span>
                    <strong>{name}:</strong> {description}
                  </span>
                </li>
              )}
            </For>
          }
        </ul>
      </div>

      <div class="mb-8">
        <h2 class="mb-4 text-2xl font-semibold">Special Discount</h2>
        <div class="space-y-4 rounded-lg border border-blue-200 bg-blue-50 p-6">
          <p>
            Until March 20th, 2026, you can buy a Standard or Executive ticket
            with a 20% discount using a special code from the Program Council:
          </p>

          <ClickToCopy textToCopy={DISCOUNT_CODE} />

          <p class="text-sm text-gray-600">
            This offer is valid only until the end of this month, so don&apos;t
            miss out!
          </p>
        </div>
      </div>

      <div class="mb-8">
        <h2 class="mb-4 text-2xl font-semibold">JavaScript Track</h2>
        <p class="mb-4">
          The meet.js crew has helped curate an exciting JavaScript track
          featuring talks on the latest frameworks, tools, and best practices.
          This is a great opportunity to learn from industry experts and connect
          with the JavaScript community.
        </p>
        <div class="mt-6 text-center">
          <ActionLink href="https://warszawskiedniinformatyki.pl/">
            Join the JavaScript Track! 💻
          </ActionLink>
        </div>
      </div>

      <div class="mt-8 text-center">
        <p class="mt-2 text-sm text-gray-600">
          For more information and registration, visit the{' '}
          <a
            href="https://warszawskiedniinformatyki.pl/"
            target="_blank"
            rel="noopener"
            class="text-primary hover:underline"
          >
            official website
          </a>
        </p>
      </div>
    </div>
  );
}
