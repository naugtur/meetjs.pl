import { PageMeta } from '@/components/PageMeta';
import { CityEmail } from '@/components/CityEmail';
import { Organizers } from '@/components/Organizers';
import { FAQ } from '@/components/FAQ';
import { CityBanner } from '@/components/CityBanner';
import { EventSection } from '@/components/EventSection';
import { KrakowFAQ } from '@/data/cities/krakow/faq';
import { KrakowOrganizers } from '@/data/cities/krakow/organizers';
import { LocalGroups } from '@/components/LocalGroups';

export default function KrakowPage() {
  return (
    <>
      <PageMeta
        title="meet.js Kraków"
        description="JavaScript meetups in Kraków"
        path="/krakow"
        keywords="meet.js, Kraków, JavaScript, meetup"
        ogImage="/api/og?city=Kraków"
        ogImageAlt="meet.js | JavaScript meetups in Kraków"
      />
      <CityBanner city="Kraków" background="/city/krakow/cover.jpg" />
      <EventSection city="Kraków" />
      <LocalGroups localGroups={['https://www.meetup.com/krakowjs/']} />
      <FAQ questions={KrakowFAQ} />
      <Organizers city="Kraków" organizers={KrakowOrganizers} />
      <CityEmail email="meetjskrk@gmail.com" />
    </>
  );
}
