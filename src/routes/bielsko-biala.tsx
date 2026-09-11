import { PageMeta } from '@/components/PageMeta';
import { CityEmail } from '@/components/CityEmail';
import { Organizers } from '@/components/Organizers';
import { FAQ } from '@/components/FAQ';
import { CityBanner } from '@/components/CityBanner';
import { EventSection } from '@/components/EventSection';
import { BielskoBialaFAQ } from '@/data/cities/bielsko-biala/faq';
import { BielskoBialaOrganizers } from '@/data/cities/bielsko-biala/organizers';
import { LocalGroups } from '@/components/LocalGroups';

export default function BielskobialaPage() {
  return (
    <>
      <PageMeta
        title="meet.js Bielsko-Biała"
        description="JavaScript meetups in Bielsko-Biała"
        path="/bielsko-biala"
        keywords="meet.js, Bielsko-Biała, JavaScript, meetup"
        ogImage="/api/og?city=Bielsko-Biała"
        ogImageAlt="meet.js | JavaScript meetups in Bielsko-Biała"
      />
      <CityBanner
        city="Bielsko-Biała"
        background="/city/bielsko-biala/cover.jpeg"
      />
      <EventSection city="Bielsko-Biała" />
      <LocalGroups
        localGroups={['https://www.meetup.com/meet-js-bielsko-biala/']}
      />
      <FAQ questions={BielskoBialaFAQ} />
      <Organizers city="Bielsko-Biała" organizers={BielskoBialaOrganizers} />
      <CityEmail email="d.wylon@selleo.com" />
    </>
  );
}
