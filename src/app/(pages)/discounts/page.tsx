import { discounts } from '@/content/discounts';
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
import { SoftwarePromoCard } from '@/components/SoftwarePromoCard';
import { EventDiscountCard } from '@/components/EventDiscountCard';

export const metadata: Metadata = {
  title: 'Exclusive Discounts | meet.js',
  description:
    'Exclusive discounts on courses, software tools, and event tickets for the meet.js community.',
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
              <div className="grid gap-6 md:grid-cols-3">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <Ticket className="h-5 w-5 text-purple-600" />
                    <h3 className="font-semibold">Events & Conferences</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Special pricing for conferences, workshops, and meetups
                    around the world
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <Monitor className="h-5 w-5 text-indigo-600" />
                    <h3 className="font-semibold">Software & Tools</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Premium developer tools, IDEs, and services at exclusive
                    rates
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-green-600" />
                    <h3 className="font-semibold">Courses & Learning</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Discounts on courses, books, and educational content from
                    top instructors
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

      {discounts.length > 0 && (
        <div className="mb-8">
          <div className="mb-6 flex items-center gap-3">
            <Ticket className="h-6 w-6 text-purple-600" />
            <h2 className="text-2xl font-bold">Events & Conferences</h2>
          </div>
          <EventDiscountCard promos={discounts} />
        </div>
      )}

      {softwareDiscounts.length > 0 && (
        <div className="mb-8">
          <div className="mb-6 flex items-center gap-3">
            <Monitor className="h-6 w-6 text-indigo-600" />
            <h2 className="text-2xl font-bold">Software & Tools</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
            {softwareDiscounts.map((promo) => (
              <SoftwarePromoCard key={promo.id} promo={promo} />
            ))}
          </div>
        </div>
      )}

      {learningDiscounts.length > 0 && (
        <div className="mb-8">
          <div className="mb-6 flex items-center gap-3">
            <BookOpen className="h-6 w-6 text-green-600" />
            <h2 className="text-2xl font-bold">Courses & Learning</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
            {learningDiscounts.map((promo: Promo) => (
              <SoftwarePromoCard key={promo.id} promo={promo} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
