import { PageMeta } from '@/components/PageMeta';
import {
  FaSolidArrowUpRightFromSquare,
  FaSolidUsers,
  FaSolidTrophy,
  FaSolidHeart,
  FaSolidComments,
  FaSolidMicrophone,
} from 'solid-icons/fa';
import { useTranslate } from '@/i18n';

export default function Page() {
  const { t } = useTranslate();
  return (
    <div class="container mx-auto max-w-3xl py-16">
      <PageMeta
        title="About - meet.js"
        description="The largest JavaScript community in Poland. Learn about our mission, values, and how to get involved."
        path="/about"
      />
      <h1 class="mb-8 text-4xl font-bold">{t('about.page_title')}</h1>

      <div class="mb-12">
        <img
          src="/about/meetjs-meetup.avif"
          alt="meet.js meetup in action"
          width={1024}
          height={256}
          class="mb-2 h-64 w-full rounded-lg object-cover shadow-lg"
        />
        <p class="text-center text-sm text-gray-600">
          {t('about.meetup_caption')}
        </p>
      </div>

      <div class="mb-8 space-y-4">
        <p>{t('about.intro_p1')}</p>
        <p>{t('about.intro_p2')}</p>
      </div>

      <div class="mb-8">
        <h2 class="mb-4 text-2xl font-semibold">{t('about.values_title')}</h2>
        <ul class="list-disc space-y-2 pl-6">
          <li>{t('about.values.non_commercial')}</li>
          <li>{t('about.values.free_open')}</li>
          <li>{t('about.values.community_driven')}</li>
          <li>{t('about.values.knowledge_sharing')}</li>
        </ul>
      </div>

      <div class="mb-12 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <img
            src="/about/meetjs-summit.jpg"
            alt="meet.js Summit conference"
            width={512}
            height={192}
            class="h-48 w-full rounded-lg object-cover shadow-lg"
          />
          <p class="mt-2 text-center text-sm text-gray-600">
            {t('about.summit_caption')}
          </p>
        </div>
        <div>
          <img
            src="/about/meetjs-networking.jpg"
            alt="Networking at meet.js event"
            width={512}
            height={192}
            class="h-48 w-full rounded-lg object-cover shadow-lg"
          />
          <p class="mt-2 text-center text-sm text-gray-600">
            {t('about.networking_caption')}
          </p>
        </div>
      </div>

      <div class="mb-12">
        <h2 class="mb-6 text-2xl font-semibold">
          {t('about.what_we_do_title')}
        </h2>
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div class="rounded-lg border border-gray-200 bg-white p-4 shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg">
            <h3 class="mb-2 flex items-center gap-2 font-semibold">
              <FaSolidUsers class="text-purple" />
              {t('about.activities.local_meetups.title')}
            </h3>
            <p class="text-sm text-gray-700">
              {t('about.activities.local_meetups.description')}
            </p>
          </div>

          <div class="rounded-lg border border-gray-200 bg-white p-4 shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg">
            <h3 class="mb-2 flex items-center gap-2 font-semibold">
              <FaSolidTrophy class="text-purple" />
              {t('about.activities.summit.title')}
            </h3>
            <p class="text-sm text-gray-700">
              {t('about.activities.summit.description')}{' '}
              <a
                href="https://summit.meetjs.pl"
                target="_blank"
                rel="noopener"
                class="text-blue-600 hover:underline"
              >
                {t('about.activities.summit.conference_link')}
                <FaSolidArrowUpRightFromSquare
                  class="mb-1 ml-1 inline-block h-3 w-3"
                  aria-hidden="true"
                />
              </a>
              .
            </p>
          </div>

          <div class="rounded-lg border border-gray-200 bg-white p-4 shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg">
            <h3 class="mb-2 flex items-center gap-2 font-semibold">
              <FaSolidHeart class="text-purple" />
              {t('about.activities.charity.title')}
            </h3>
            <p class="text-sm text-gray-700">
              {t('about.activities.charity.description')}{' '}
              <a
                href="https://www.siepomaga.pl/pomagacze/meetjs"
                target="_blank"
                rel="noopener"
                class="text-blue-600 hover:underline"
              >
                Siepomaga.pl
                <FaSolidArrowUpRightFromSquare
                  class="mb-1 ml-1 inline-block h-3 w-3"
                  aria-hidden="true"
                />
              </a>
              .
            </p>
          </div>

          <div class="rounded-lg border border-gray-200 bg-white p-4 shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg">
            <h3 class="mb-2 flex items-center gap-2 font-semibold">
              <FaSolidComments class="text-purple" />
              {t('about.activities.networking.title')}
            </h3>
            <p class="text-sm text-gray-700">
              {t('about.activities.networking.description')}
            </p>
          </div>

          <div class="rounded-lg border border-gray-200 bg-white p-4 shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg">
            <h3 class="mb-2 flex items-center gap-2 font-semibold">
              <FaSolidMicrophone class="text-purple" />
              {t('about.activities.tech_talks.title')}
            </h3>
            <p class="text-sm text-gray-700">
              {t('about.activities.tech_talks.description')}
            </p>
          </div>
        </div>
      </div>

      <div class="mb-8">
        <h2 class="mb-4 text-2xl font-semibold">
          {t('about.get_involved_title')}
        </h2>
        <p class="mb-4">{t('about.get_involved_p1')}</p>
        <p class="mb-4">
          {t('about.get_involved_p2')}{' '}
          <a
            href="/how-to-become-an-organizer"
            class="font-bold text-blue-600 hover:underline"
          >
            {t('about.organizer_link')}
          </a>{' '}
          {t('about.get_involved_p3')}
        </p>
        <img
          src="/about/meetjs-organizers.jpg"
          alt="meet.js organizers team"
          width={1024}
          height={192}
          class="mt-4 h-48 w-full rounded-lg object-cover shadow-lg"
        />
        <p class="mt-2 text-center text-sm text-gray-600">
          {t('about.organizers_caption')}
        </p>
      </div>

      <div>
        <h2 class="mb-4 text-2xl font-semibold">{t('about.contact_title')}</h2>
        <p>
          {t('about.contact_text')}{' '}
          <a
            href="mailto:contact@meetjs.pl"
            class="text-blue-600 hover:underline"
          >
            contact@meetjs.pl
          </a>
        </p>
      </div>
    </div>
  );
}
