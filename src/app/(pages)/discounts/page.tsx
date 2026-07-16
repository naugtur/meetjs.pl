import { eventsDiscounts } from '@/content/events-discounts';
import { softwareDiscounts } from '@/content/software-discounts';
import { learningDiscounts } from '@/content/learning-discounts';
import type { Promo } from '@/types/promo';
import { Ticket, Monitor, BookOpen } from 'lucide-react';
import { PromoListSection } from '@/components/PromoListSection';
import { getTranslate } from '@/tolgee/server';

// Filter out expired promos
const filterActivePromos = (promos: Promo[]): Promo[] => {
  const now = new Date();
  return promos.filter((promo) => new Date(promo.expiresAt) >= now);
};

export default async function DiscountsPage() {
  const t = await getTranslate();

  // Filter active promos
  const activeEventsDiscounts = filterActivePromos(eventsDiscounts);
  const activeSoftwareDiscounts = filterActivePromos(softwareDiscounts);
  const activeLearningDiscounts = filterActivePromos(learningDiscounts);
  return (
    <div className="container mx-auto max-w-4xl py-8 sm:py-12 lg:py-16">
      <div className="mb-6 text-center sm:mb-8 lg:mb-10">
        <h1 className="mb-2 text-3xl font-bold tracking-tight sm:mb-3 sm:text-4xl lg:text-5xl">
          {t('discounts.page_title')}
        </h1>
        <p className="mx-auto max-w-2xl px-4 text-base text-muted-foreground sm:px-0 sm:text-lg">
          {t('discounts.subtitle')}
        </p>
      </div>

      <div id="events" className="mb-8">
        <div className="mb-6 flex items-center gap-3">
          <Ticket className="h-6 w-6 text-purple-600" />
          <h2 className="text-2xl font-bold">
            {t('discounts.sections.events')}
          </h2>
          <span className="rounded-full bg-purple-100 px-2.5 py-0.5 text-sm font-medium text-purple-700">
            {activeEventsDiscounts.length}
          </span>
        </div>
        <PromoListSection
          promos={activeEventsDiscounts}
          variant="event"
          emptyTitle={t('discounts.empty.events.title')}
          emptyDescription={t('discounts.empty.events.description')}
        />
      </div>

      <div id="software" className="mb-8">
        <div className="mb-6 flex items-center gap-3">
          <Monitor className="h-6 w-6 text-indigo-600" />
          <h2 className="text-2xl font-bold">
            {t('discounts.sections.software')}
          </h2>
          <span className="rounded-full bg-indigo-100 px-2.5 py-0.5 text-sm font-medium text-indigo-700">
            {activeSoftwareDiscounts.length}
          </span>
        </div>
        <PromoListSection
          promos={activeSoftwareDiscounts}
          variant="software"
          emptyTitle={t('discounts.empty.software.title')}
          emptyDescription={t('discounts.empty.software.description')}
        />
      </div>

      <div id="learning" className="mb-8">
        <div className="mb-6 flex items-center gap-3">
          <BookOpen className="h-6 w-6 text-green-600" />
          <h2 className="text-2xl font-bold">
            {t('discounts.sections.learning')}
          </h2>
          <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-sm font-medium text-green-700">
            {activeLearningDiscounts.length}
          </span>
        </div>
        <PromoListSection
          promos={activeLearningDiscounts}
          variant="learning"
          emptyTitle={t('discounts.empty.learning.title')}
          emptyDescription={t('discounts.empty.learning.description')}
        />
      </div>
    </div>
  );
}
