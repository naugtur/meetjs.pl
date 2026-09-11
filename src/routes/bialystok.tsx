import { PageMeta } from '@/components/PageMeta';
import { CityEmail } from '@/components/CityEmail';
import { Organizers } from '@/components/Organizers';
import { FAQ } from '@/components/FAQ';
import { CityBanner } from '@/components/CityBanner';
import { EventSection } from '@/components/EventSection';
import { BialystokFAQ } from '@/data/cities/bialystok/faq';
import { BialystokOrganizers } from '@/data/cities/bialystok/organizers';

export default function BialystokPage() {
  return (
    <>
      <PageMeta
        title="meet.js Białystok"
        description="JavaScript meetups in Białystok"
        path="/bialystok"
        keywords="meet.js, Białystok, JavaScript, meetup"
        ogImage="/api/og?city=Białystok"
        ogImageAlt="meet.js | JavaScript meetups in Białystok"
      />
      <CityBanner city="Białystok" background="/city/bialystok/cover.jpg" />
      <EventSection city="Białystok" />
      <FAQ questions={BialystokFAQ} />
      <Organizers city="Białystok" organizers={BialystokOrganizers} />
      <CityEmail email="hello@meetjs.bialystok.pl" />
    </>
  );
}
