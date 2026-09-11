import { PageMeta } from '@/components/PageMeta';
import { CityEmail } from '@/components/CityEmail';
import { Organizers } from '@/components/Organizers';
import { FAQ } from '@/components/FAQ';
import { CityBanner } from '@/components/CityBanner';
import { EventSection } from '@/components/EventSection';
import { PoznanFAQ } from '@/data/cities/poznan/faq';
import { PoznanOrganizers } from '@/data/cities/poznan/organizers';
import { LocalGroups } from '@/components/LocalGroups';

export default function PoznanPage() {
  return (
    <>
      <PageMeta
        title="meet.js Poznań"
        description="JavaScript meetups in Poznań"
        path="/poznan"
        keywords="meet.js, Poznań, JavaScript, meetup"
        ogImage="/api/og?city=Poznań"
        ogImageAlt="meet.js | JavaScript meetups in Poznań"
      />
      <CityBanner city="Poznań" background="/city/poznan/cover.jpg" />
      <EventSection city="Poznań" />
      <LocalGroups
        localGroups={[
          'https://crossweb.pl/cykle-wydarzen/meet-js-poznan/',
          'https://github.com/meetjspl/poznan',
        ]}
      />
      <FAQ questions={PoznanFAQ} />
      <Organizers city="Poznań" organizers={PoznanOrganizers} />
      <CityEmail email="poznan@meetjs.pl" />
    </>
  );
}
