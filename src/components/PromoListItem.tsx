'use client';

import { ReactNode, useState } from 'react';
import Image from 'next/image';
import type { Promo } from '@/types/promo';
import { Calendar, MapPin, ChevronDown, ExternalLink } from 'lucide-react';

interface PromoListItemProps {
  promo: Promo;
  variant: 'event' | 'software' | 'learning';
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

type VariantStyle = {
  iconBg: string;
  defaultIcon: string;
  ctaGradient: string;
};

const variantStyles = {
  event: {
    iconBg: 'bg-gradient-to-br from-purple-500 to-pink-600',
    defaultIcon: '🎟️',
    ctaGradient:
      'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700',
  },
  software: {
    iconBg: 'bg-gradient-to-br from-indigo-500 to-purple-600',
    defaultIcon: '🖥️',
    ctaGradient:
      'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700',
  },
  learning: {
    iconBg: 'bg-gradient-to-br from-green-500 to-teal-600',
    defaultIcon: '📚',
    ctaGradient:
      'bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700',
  },
} satisfies Record<string, VariantStyle>;

export function PromoListItem({ promo, variant }: PromoListItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const styles = variantStyles[variant];

  const toggle = () => setIsExpanded((previous) => !previous);

  return (
    <Card isExpanded={isExpanded}>
      {/* Header row */}
      <Row>
        {/* Clickable area for expand */}
        <div
          onClick={toggle}
          className="flex flex-1 items-center gap-3 text-left sm:gap-4"
        >
          {/* Logo */}
          <PromotionLogo
            name={promo.name}
            style={styles}
            image={promo.image}
            icon={promo.icon}
          />

          {/* Info */}
          <PromotionHeader name={promo.name} message={promo.message} />
        </div>

        {/* Meta - separate from expand button */}
        <div className="flex-2 flex flex-wrap items-center justify-between gap-2 sm:flex-nowrap sm:gap-3">
          <div className="flex min-w-24 flex-col gap-2">
            <PromotionDate date={promo.expiresAt} />

            {promo.city && variant === 'event' && (
              <PromotionLocation city={promo.city} />
            )}
          </div>

          <Column>
            <PromotionCTA
              cta={promo.cta}
              ticketLink={promo.ticketLink}
              gradient={styles.ctaGradient}
            />

            {promo.discountCode && (
              <CopyDiscountCode discountCode={promo.discountCode} />
            )}
          </Column>
        </div>
      </Row>

      {/* Expanded content */}
      <ExpandedContent isExpanded={isExpanded}>
        <PromotionDetails promotion={promo} />
      </ExpandedContent>

      <button
        onClick={toggle}
        className="flex w-full flex-1 items-center gap-3 text-left sm:gap-4"
      >
        <div className="flex w-full justify-center">
          <ChevronDown
            className={`h-5 w-5 flex-shrink-0 text-gray-400 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
          />
        </div>
      </button>
    </Card>
  );
}

const Card = ({
  children,
  isExpanded,
}: {
  children: ReactNode;
  isExpanded: boolean;
}) => (
  <div
    className={`rounded-lg border border-gray-200 bg-white transition-all hover:border-gray-300 hover:shadow-sm dark:border-gray-700 dark:bg-gray-800 ${isExpanded ? 'ring-1 ring-gray-300 dark:ring-gray-600' : ''}`}
  >
    {children}
  </div>
);

const Row = ({ children }: { children: ReactNode }) => (
  <div className="flex w-full flex-col gap-3 p-4 sm:flex-row sm:items-center sm:gap-4">
    {children}
  </div>
);

const Column = ({ children }: { children: ReactNode }) => (
  <div className="flex flex-col gap-2">{children}</div>
);

const PromotionLogo = ({
  name,
  style,
  image,
  icon,
}: {
  name: string;
  style: VariantStyle;
  image?: string;
  icon?: ReactNode;
}) => {
  if (image) {
    return (
      <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-700">
        <Image
          src={image}
          alt={`${name} logo`}
          fill
          className="object-contain p-1"
        />
      </div>
    );
  }

  return (
    <div
      className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg text-xl text-white ${style.iconBg}`}
    >
      {icon || style.defaultIcon}
    </div>
  );
};

const PromotionHeader = ({
  name,
  message,
}: {
  name: string;
  message: string;
}) => (
  <div className="min-w-0 flex-1">
    <h3 className="truncate font-semibold text-gray-900 hover:underline dark:text-white">
      {name}
    </h3>
    <p className="text-sm text-gray-600 dark:text-gray-400">{message}</p>
  </div>
);

const PromotionDate = ({ date }: { date: string }) => (
  <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
    <Calendar className="h-3.5 w-3.5" />
    <span>{formatDate(date)}</span>
  </div>
);

const PromotionLocation = ({ city }: { city: string }) => (
  <div
    // className="flex max-w-[100px] items-center gap-1 text-xs text-gray-500 dark:text-gray-400"
    className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400"
    title={city}
  >
    <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
    <span className="truncate">{city}</span>
  </div>
);

const CopyDiscountCode = ({ discountCode }: { discountCode: string }) => {
  const handleCopyCode = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (discountCode) navigator.clipboard.writeText(discountCode);
  };

  return (
    <button
      onClick={handleCopyCode}
      className="rounded-md border border-dashed border-gray-300 bg-gray-50 px-2 py-1 font-mono text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
      title="Click to copy"
    >
      {discountCode}
    </button>
  );
};

const PromotionCTA = ({
  cta,
  ticketLink,
  gradient,
}: {
  cta: string;
  ticketLink: string;
  gradient: string;
}) => {
  const handleCtaClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  if (!ticketLink) {
    return (
      <span className="whitespace-nowrap rounded-md bg-gray-100 px-3 py-1.5 text-sm text-gray-500 dark:bg-gray-700 dark:text-gray-400">
        {cta}
      </span>
    );
  }

  return (
    <a
      href={ticketLink}
      target="_blank"
      rel="noopener"
      onClick={handleCtaClick}
      className={`whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium text-white transition-all ${gradient}`}
    >
      {cta}
    </a>
  );
};

const ExpandedContent = ({
  children,
  isExpanded,
}: {
  children: ReactNode;
  isExpanded: boolean;
}) => (
  <div
    className={`overflow-hidden transition-all duration-200 ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
  >
    {children}
  </div>
);

const PromotionEventLink = ({ eventLink }: { eventLink?: string }) => {
  if (!eventLink) return null;

  return (
    <a
      href={eventLink}
      target="_blank"
      rel="noopener"
      className="mt-3 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
    >
      <ExternalLink className="h-3.5 w-3.5" />
      Visit website
    </a>
  );
};

const PromotionDescription = ({ description }: { description?: string }) => (
  <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
    {description}
  </p>
);

const PromotionDetails = ({
  promotion: { description, eventLink },
}: {
  promotion: Promo;
}) => {
  if (!description) return null;

  return (
    <div className="border-t border-gray-100 px-4 py-4 dark:border-gray-700">
      <PromotionDescription description={description} />

      <PromotionEventLink eventLink={eventLink} />
    </div>
  );
};
