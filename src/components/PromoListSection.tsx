'use client';

import { useMemo } from 'react';
import type { Promo } from '@/types/promo';
import { PromoListItem } from './PromoListItem';
import ServerEmptyDiscountState from './ServerEmptyDiscountState';

interface PromoListSectionProps {
  promos: Promo[];
  variant: 'event' | 'software' | 'learning';
  emptyTitle: string;
  emptyDescription: string;
}

export function PromoListSection({
  promos,
  variant,
  emptyTitle,
  emptyDescription,
}: PromoListSectionProps) {
  // Filter out expired promos and sort by expiration date
  const visiblePromos = useMemo(() => {
    const now = new Date();
    return promos
      .filter((promo) => new Date(promo.expiresAt) >= now)
      .sort(
        (a, b) =>
          new Date(a.expiresAt).getTime() - new Date(b.expiresAt).getTime(),
      );
  }, [promos]);

  if (visiblePromos.length === 0) {
    const emptyStateType = variant === 'event' ? 'events' : variant;
    return (
      <ServerEmptyDiscountState
        type={emptyStateType}
        title={emptyTitle}
        description={emptyDescription}
      />
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {visiblePromos.map((promo) => (
        <PromoListItem key={promo.id} promo={promo} variant={variant} />
      ))}
    </div>
  );
}
