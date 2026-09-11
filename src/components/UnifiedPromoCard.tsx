import { Show } from 'solid-js';
import type { Promo } from '@/types/promo';
import { Calendar, MapPin, ExternalLink } from '@/lib/lucide';
import DiscountCodeSection from './DiscountCodeSection';
import WorkshopInfo from './WorkshopInfo';

const getDomain = (url: string) => {
  try {
    const domain = new URL(url).hostname;
    return domain.startsWith('www.') ? domain.substring(4) : domain;
  } catch (e) {
    console.error('Failed to extract domain from URL:', e);
    return url;
  }
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

type PromoVariant = 'event' | 'software' | 'learning';

interface VariantConfig {
  iconBg: string;
  defaultIcon: string;
  discountVariant: 'event' | 'software';
  ctaGradient: string;
  ctaTextColor?: string;
  linkColor: string;
  websiteLabel: string;
}

const variantConfigs: Record<PromoVariant, VariantConfig> = {
  event: {
    iconBg: 'bg-gradient-to-br from-purple-500 to-pink-600',
    defaultIcon: '🎟️',
    discountVariant: 'event',
    ctaGradient:
      'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700',
    linkColor:
      'text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300',
    websiteLabel: 'Website',
  },
  software: {
    iconBg: 'bg-gradient-to-br from-indigo-500 to-purple-600',
    defaultIcon: '🖥️',
    discountVariant: 'software',
    ctaGradient:
      'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700',
    linkColor:
      'text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300',
    websiteLabel: 'Website',
  },
  learning: {
    iconBg: 'bg-gradient-to-br from-green-500 to-teal-600',
    defaultIcon: '📚',
    discountVariant: 'software',
    ctaGradient:
      'bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700',
    ctaTextColor: 'text-white',
    linkColor:
      'text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300',
    websiteLabel: 'Website',
  },
};

interface UnifiedPromoCardProps {
  promo: Promo;
  variant?: PromoVariant;
}

export default function UnifiedPromoCard(props: UnifiedPromoCardProps) {
  const config = () => variantConfigs[props.variant ?? 'software'];
  const isEventVariant = () => (props.variant ?? 'software') === 'event';

  // Use promo-specific gradient and text color if provided, otherwise use variant defaults
  const ctaGradient = () => props.promo.gradient || config().ctaGradient;
  const ctaTextColor = () =>
    props.promo.textColor || config().ctaTextColor || 'text-white';

  return (
    <div class="group relative block overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-gray-700 dark:bg-gray-800">
      {/* Header with Logo/Image */}
      <div class="flex items-center gap-4 border-b border-gray-100 p-6 dark:border-gray-700">
        <Show
          when={props.promo.image}
          fallback={
            <div
              class={`flex h-20 w-20 items-center justify-center rounded-lg text-3xl text-white ${config().iconBg}`}
            >
              {props.promo.icon || config().defaultIcon}
            </div>
          }
        >
          <div class="relative h-20 w-20 overflow-hidden rounded-lg bg-gray-100 ring-2 ring-gray-100 dark:bg-gray-700 dark:ring-gray-600">
            <img
              src={props.promo.image}
              alt={`${props.promo.name} logo`}
              class="absolute inset-0 h-full w-full object-contain p-3"
            />
          </div>
        </Show>

        <div class="flex-1">
          <h3 class="text-xl font-bold text-gray-900 dark:text-white">
            {props.promo.name}
          </h3>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            {props.promo.message}
          </p>
        </div>
      </div>

      <div class="p-6">
        {/* Description */}
        <Show when={props.promo.description}>
          <div class="mb-6">
            <p class="leading-relaxed text-gray-700 dark:text-gray-300">
              {props.promo.description}
            </p>
          </div>
        </Show>

        {/* Workshop Information - Only for events */}
        <Show when={isEventVariant()}>
          <WorkshopInfo
            workshopDescription={props.promo.workshopDescription}
            workshopDiscountCode={props.promo.workshopDiscountCode}
            workshopLink={props.promo.workshopLink}
          />
        </Show>

        {/* Discount Code Section */}
        <Show when={props.promo.discountCode}>
          <DiscountCodeSection
            discountCode={props.promo.discountCode!}
            variant={config().discountVariant}
          />
        </Show>

        {/* Details Grid - Different for events vs software/learning */}
        <Show
          when={isEventVariant()}
          fallback={
            <div class="mb-6 space-y-3">
              <Show when={props.promo.eventLink}>
                <div class="flex items-center justify-between rounded-lg border border-gray-200 p-3 dark:border-gray-600">
                  <div>
                    <p class="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {config().websiteLabel}
                    </p>
                    <p class="text-sm text-gray-500 dark:text-gray-400">
                      {getDomain(props.promo.eventLink!)}
                    </p>
                  </div>
                  <a
                    href={props.promo.eventLink}
                    target="_blank"
                    rel="noopener"
                    class={config().linkColor}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink class="h-4 w-4" />
                  </a>
                </div>
              </Show>
            </div>
          }
        >
          <div class="mb-6 grid grid-cols-2 gap-4">
            <div class="flex items-start gap-2">
              <Calendar class="mt-0.5 h-4 w-4 flex-shrink-0 text-gray-400" />
              <div class="min-w-0">
                <p class="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Valid Until
                </p>
                <p class="text-sm text-gray-900 dark:text-white">
                  {formatDate(props.promo.expiresAt)}
                </p>
              </div>
            </div>
            <Show when={props.promo.city && props.promo.country}>
              <div class="flex items-start gap-2">
                <MapPin class="mt-0.5 h-4 w-4 flex-shrink-0 text-gray-400" />
                <div class="min-w-0">
                  <p class="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Location
                  </p>
                  <p class="text-sm text-gray-900 dark:text-white">
                    {props.promo.city}, {props.promo.country}{' '}
                    {props.promo.emojiRight}
                  </p>
                </div>
              </div>
            </Show>
          </div>
        </Show>

        {/* Additional Event Links */}
        <Show
          when={
            isEventVariant() &&
            props.promo.eventLink &&
            props.promo.ticketLink &&
            props.promo.eventLink !== props.promo.ticketLink
          }
        >
          <div class="mb-6">
            <div class="flex items-center justify-between rounded-lg border border-gray-200 p-3 dark:border-gray-600">
              <div>
                <p class="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {config().websiteLabel}
                </p>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  {getDomain(props.promo.eventLink!)}
                </p>
              </div>
              <a
                href={props.promo.eventLink}
                target="_blank"
                rel="noopener"
                class={config().linkColor}
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink class="h-4 w-4" />
              </a>
            </div>
          </div>
        </Show>
      </div>

      {/* CTA Button */}
      <div class="border-t border-gray-100 p-6 dark:border-gray-700">
        <Show
          when={props.promo.ticketLink}
          fallback={
            <span
              class={`block w-full rounded-lg py-3 text-center font-semibold opacity-60 shadow ${ctaTextColor()}/80 ${ctaGradient()}`}
            >
              {props.promo.cta}
            </span>
          }
        >
          <a
            href={props.promo.ticketLink}
            target="_blank"
            rel="noopener"
            class={`block w-full rounded-lg py-3 text-center font-semibold shadow transition-all hover:shadow-lg ${ctaTextColor()} ${ctaGradient()}`}
            onClick={(e) => e.stopPropagation()}
          >
            {props.promo.cta}
          </a>
        </Show>
      </div>
    </div>
  );
}
