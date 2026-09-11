import NumberTicker from '@/components/magicui/number-ticker';
import { CITIES } from '@/content/cities';
import { useTranslate } from '@/i18n';

export const Stats = () => {
  const { t } = useTranslate();
  return (
    <div class="w-full bg-green py-12 md:py-16">
      <div class="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 sm:px-6 md:grid-cols-3 lg:px-8">
        <div class="text-center">
          <h3 class="text-3xl font-bold sm:text-4xl">
            <NumberTicker value={9} />
          </h3>
          <p class="mt-2 text-lg">{t('stats.summits')}</p>
        </div>
        <div class="text-center">
          <h3 class="text-3xl font-bold sm:text-4xl">
            <NumberTicker value={2011} />
          </h3>
          <p class="mt-2 text-lg">{t('stats.since')}</p>
        </div>
        <div class="text-center">
          <h3 class="text-3xl font-bold sm:text-4xl">
            <NumberTicker value={CITIES.length} />
          </h3>
          <p class="mt-2 text-lg">{t('stats.cities')}</p>
        </div>
      </div>
    </div>
  );
};
