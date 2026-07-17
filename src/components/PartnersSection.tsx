import { PartnersCarousel } from '@/components/PartnersCarousel';
import Link from 'next/link';
import { getTranslate } from '@/tolgee/server';

export const PartnersSection = async () => {
  const t = await getTranslate();

  return (
    <section className="w-full bg-purple p-12">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-11 px-2 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl font-bold text-white">
          {t('partners.section_title')}
        </h2>
        <PartnersCarousel />

        <div className="flex flex-col items-center gap-3 border-t border-white/10 pt-10">
          <p className="text-sm text-white/80">
            {t('partners.technology_partner')}
          </p>
          <a
            href="https://cyberfolks.pl/?ref=MEETJS"
            target="_blank"
            rel="noopener"
            className="transition-opacity hover:opacity-80"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/partners/cyberfolks-white.svg"
              alt="cyber_Folks"
              className="h-14 w-auto"
            />
          </a>
          <p className="max-w-md text-center text-sm text-white/80">
            {t('partners.technology_partner_offer')}{' '}
            <code className="rounded bg-white/15 px-1.5 py-0.5 font-mono text-white">
              MEETJS
            </code>
          </p>
          <Link
            href="/discounts#software"
            className="text-sm text-white/80 underline decoration-white/40 underline-offset-2 transition-colors hover:text-white hover:decoration-white"
          >
            {t('partners.technology_partner_link')}
          </Link>
        </div>
      </div>
    </section>
  );
};
