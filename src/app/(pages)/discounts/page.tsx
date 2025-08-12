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
import { Gift, Ticket, Monitor, BookOpen } from 'lucide-react';
import { Metadata } from 'next';
import UnifiedPromoCard from '@/components/UnifiedPromoCard';
import { EventDiscountSection } from '@/components/EventDiscountSection';
import { getTranslate } from '@/tolgee/server';

export const metadata: Metadata = {
  title: 'Exclusive Discounts | meet.js',
  description:
    'Exclusive discounts on courses, software tools, and event tickets for the meet.js community.',
};

export default async function DiscountsPage() {
  const t = await getTranslate();
  return (
    <div className="container mx-auto max-w-4xl py-16">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-5xl font-bold tracking-tight">
          {t('discounts.page_title')}
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          {t('discounts.subtitle')}
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
                  {t('discounts.benefits_card.title')}
                </CardTitle>
              </div>
              <CardDescription className="mt-2 text-base">
                {t('discounts.benefits_card.description')}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="grid gap-6 md:grid-cols-3">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <Ticket className="h-5 w-5 text-purple-600" />
                    <h3 className="font-semibold">
                      {t('discounts.benefits_card.events.title')}
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {t('discounts.benefits_card.events.description')}
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <Monitor className="h-5 w-5 text-indigo-600" />
                    <h3 className="font-semibold">
                      {t('discounts.benefits_card.software.title')}
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {t('discounts.benefits_card.software.description')}
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-green-600" />
                    <h3 className="font-semibold">
                      {t('discounts.benefits_card.learning.title')}
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {t('discounts.benefits_card.learning.description')}
                  </p>
                </div>
              </div>
            </CardContent>
          </div>
        </div>
        <CardFooter className="bg-muted/50 p-6">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold">
              {t('discounts.benefits_card.note_label')}
            </span>{' '}
            {t('discounts.benefits_card.note')}
          </p>
        </CardFooter>
      </Card>

      {eventsDiscounts.length > 0 && (
        <div id="events" className="mb-8">
          <div className="mb-6 flex items-center gap-3">
            <Ticket className="h-6 w-6 text-purple-600" />
            <h2 className="text-2xl font-bold">
              {t('discounts.sections.events')}
            </h2>
          </div>
          <EventDiscountSection promos={eventsDiscounts} />
        </div>
      )}

      {softwareDiscounts.length > 0 && (
        <div id="software" className="mb-8">
          <div className="mb-6 flex items-center gap-3">
            <Monitor className="h-6 w-6 text-indigo-600" />
            <h2 className="text-2xl font-bold">
              {t('discounts.sections.software')}
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
            {softwareDiscounts.map((promo) => (
              <UnifiedPromoCard
                key={promo.id}
                promo={promo}
                variant="software"
              />
            ))}
          </div>
        </div>
      )}

      {learningDiscounts.length > 0 && (
        <div id="learning" className="mb-8">
          <div className="mb-6 flex items-center gap-3">
            <BookOpen className="h-6 w-6 text-green-600" />
            <h2 className="text-2xl font-bold">
              {t('discounts.sections.learning')}
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
            {learningDiscounts.map((promo: Promo) => (
              <UnifiedPromoCard
                key={promo.id}
                promo={promo}
                variant="learning"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
