import { PartnersCarousel } from '@/components/PartnersCarousel';
import { useTranslate } from '@/i18n';

export const PartnersSection = () => {
  const { t } = useTranslate();

  return (
    <section class="w-full bg-purple p-12">
      <div class="mx-auto flex max-w-7xl flex-col justify-between gap-11 px-2 sm:px-6 lg:px-8">
        <h2 class="text-center text-3xl font-bold text-white">
          {t('partners.section_title')}
        </h2>
        <PartnersCarousel />

        <div class="flex flex-col items-center gap-3 border-t border-white/10 pt-10">
          <p class="text-sm text-white/80">
            {t('partners.technology_partner')}
          </p>
          <a
            href="https://cyberfolks.pl/?ref=MEETJS"
            target="_blank"
            rel="noopener"
            class="transition-opacity hover:opacity-80"
          >
            <img
              src="/partners/cyberfolks-white.svg"
              alt="cyber_Folks"
              class="h-14 w-auto"
            />
          </a>
          <p class="max-w-md text-center text-sm text-white/80">
            {t('partners.technology_partner_offer')}{' '}
            <code class="rounded bg-white/15 px-1.5 py-0.5 font-mono text-white">
              MEETJS
            </code>
          </p>
          <a
            href="/discounts#software"
            class="text-sm text-white/80 underline decoration-white/40 underline-offset-2 transition-colors hover:text-white hover:decoration-white"
          >
            {t('partners.technology_partner_link')}
          </a>
        </div>
      </div>
    </section>
  );
};
