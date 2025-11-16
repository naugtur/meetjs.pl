import Link from 'next/link';
import { getTranslate } from '@/tolgee/server';

export const EventsAPIPartner = async () => {
  const t = await getTranslate();

  return (
    <div className="flex flex-col items-center justify-center md:flex-row">
      <p>{t('events_api_partner.powered_by')}</p>
      <Link href="https://crossweb.pl" className="pl-2" target="_blank">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/crossweb-logo.svg"
          alt="crossweb where IT meets"
          width={96}
          height={23.34}
          className="h-auto w-24"
        />
      </Link>
    </div>
  );
};
