import Link from 'next/link';
import Image from 'next/image';
import crosswebImag3 from '../../public/crossweb-logo.svg';
import { getTranslate } from '@/tolgee/server';

export const EventsAPIPartner = async () => {
  const t = await getTranslate();
  
  return (
    <div className="flex flex-col items-center justify-center md:flex-row">
      <p>{t('events_api_partner.powered_by')}</p>
      <Link href="https://crossweb.pl" className="pl-2" target="_blank">
        <Image
          src={crosswebImag3}
          alt="crossweb where IT meets"
          width={96}
          height={23.34}
        />
      </Link>
    </div>
  );
};
