import { For } from 'solid-js';
import { eventsDiscounts } from '@/content/events-discounts';
import { softwareDiscounts } from '@/content/software-discounts';
import { learningDiscounts } from '@/content/learning-discounts';
import type { Promo } from '@/types/promo';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { Gift, Ticket, Monitor, BookOpen } from '@/lib/lucide';
import UnifiedPromoCard from '@/components/UnifiedPromoCard';
import { EventDiscountSection } from '@/components/EventDiscountSection';
import ServerEmptyDiscountState from '@/components/ServerEmptyDiscountState';
import { useTranslate } from '@/i18n';

// Filter out expired promos
const filterActivePromos = (promos: Promo[]): Promo[] => {
  const now = new Date();
  return promos.filter((promo) => new Date(promo.expiresAt) >= now);
};

export default function DiscountsPage() {
  const { t } = useTranslate();

  // Filter active promos
  const activeSoftwareDiscounts = filterActivePromos(softwareDiscounts);
  const activeLearningDiscounts = filterActivePromos(learningDiscounts);
  return (
    <div class="container mx-auto max-w-4xl py-16">
      <div class="mb-12 text-center">
        <h1 class="mb-4 text-5xl font-bold tracking-tight">
          {t('discounts.page_title')}
        </h1>
        <p class="mx-auto max-w-2xl text-lg text-muted-foreground">
          {t('discounts.subtitle')}
        </p>
      </div>

      <Card class="mb-12 overflow-hidden border-purple shadow-xl">
        <div class="bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 p-1">
          <div class="bg-background p-5">
            <CardHeader class="pb-2">
              <div class="flex items-center gap-2">
                <span class="rounded-full bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 p-2 text-white">
                  <Gift class="h-5 w-5" />
                </span>
                <CardTitle class="text-2xl font-bold">
                  {t('discounts.benefits_card.title')}
                </CardTitle>
              </div>
              <CardDescription class="mt-2 text-base">
                {t('discounts.benefits_card.description')}
              </CardDescription>
            </CardHeader>
            <CardContent class="pt-4">
              <div class="grid gap-6 md:grid-cols-3">
                <div class="flex flex-col gap-2">
                  <div class="flex items-center gap-2">
                    <Ticket class="h-5 w-5 text-purple-600" />
                    <h3 class="font-semibold">
                      {t('discounts.benefits_card.events.title')}
                    </h3>
                  </div>
                  <p class="text-sm text-muted-foreground">
                    {t('discounts.benefits_card.events.description')}
                  </p>
                </div>
                <div class="flex flex-col gap-2">
                  <div class="flex items-center gap-2">
                    <Monitor class="h-5 w-5 text-indigo-600" />
                    <h3 class="font-semibold">
                      {t('discounts.benefits_card.software.title')}
                    </h3>
                  </div>
                  <p class="text-sm text-muted-foreground">
                    {t('discounts.benefits_card.software.description')}
                  </p>
                </div>
                <div class="flex flex-col gap-2">
                  <div class="flex items-center gap-2">
                    <BookOpen class="h-5 w-5 text-green-600" />
                    <h3 class="font-semibold">
                      {t('discounts.benefits_card.learning.title')}
                    </h3>
                  </div>
                  <p class="text-sm text-muted-foreground">
                    {t('discounts.benefits_card.learning.description')}
                  </p>
                </div>
              </div>
            </CardContent>
          </div>
        </div>
        <CardFooter class="bg-muted/50 p-6">
          <p class="text-sm text-muted-foreground">
            <span class="font-semibold">
              {t('discounts.benefits_card.note_label')}
            </span>{' '}
            {t('discounts.benefits_card.note')}
          </p>
        </CardFooter>
      </Card>

      <div id="events" class="mb-8">
        <div class="mb-6 flex items-center gap-3">
          <Ticket class="h-6 w-6 text-purple-600" />
          <h2 class="text-2xl font-bold">{t('discounts.sections.events')}</h2>
        </div>
        <EventDiscountSection promos={eventsDiscounts} />
      </div>

      <div id="software" class="mb-8">
        <div class="mb-6 flex items-center gap-3">
          <Monitor class="h-6 w-6 text-indigo-600" />
          <h2 class="text-2xl font-bold">{t('discounts.sections.software')}</h2>
        </div>
        {activeSoftwareDiscounts.length > 0 ? (
          <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
            {
              <For each={activeSoftwareDiscounts}>
                {(promo) => (
                  <UnifiedPromoCard promo={promo} variant="software" />
                )}
              </For>
            }
          </div>
        ) : (
          <ServerEmptyDiscountState
            type="software"
            title={t('discounts.empty.software.title')}
            description={t('discounts.empty.software.description')}
          />
        )}
      </div>

      <div id="learning" class="mb-8">
        <div class="mb-6 flex items-center gap-3">
          <BookOpen class="h-6 w-6 text-green-600" />
          <h2 class="text-2xl font-bold">{t('discounts.sections.learning')}</h2>
        </div>
        {activeLearningDiscounts.length > 0 ? (
          <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
            {
              <For each={activeLearningDiscounts}>
                {(promo: Promo) => (
                  <UnifiedPromoCard promo={promo} variant="learning" />
                )}
              </For>
            }
          </div>
        ) : (
          <ServerEmptyDiscountState
            type="learning"
            title={t('discounts.empty.learning.title')}
            description={t('discounts.empty.learning.description')}
          />
        )}
      </div>
    </div>
  );
}
