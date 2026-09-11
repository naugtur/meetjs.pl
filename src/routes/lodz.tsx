import { PageMeta } from '@/components/PageMeta';
import { CityEmail } from '@/components/CityEmail';
import { Organizers } from '@/components/Organizers';
import { FAQ } from '@/components/FAQ';
import { CityBanner } from '@/components/CityBanner';
import { EventSection } from '@/components/EventSection';
import { LodzFAQ } from '@/data/cities/lodz/faq';
import { LodzOrganizers } from '@/data/cities/lodz/organizers';
import { LocalGroups } from '@/components/LocalGroups';

export default function LodzPage() {
  return (
    <>
      <PageMeta
        title="meet.js Łódź"
        description="JavaScript meetups in Łódź"
        path="/lodz"
        keywords="meet.js, Łódź, JavaScript, meetup"
        ogImage="/api/og?city=Łódź"
        ogImageAlt="meet.js | JavaScript meetups in Łódź"
      />
      <CityBanner city="Łódź" background="/city/lodz/cover.jpg" />
      <EventSection city="Łódź" />
      <LocalGroups localGroups={['https://luma.com/user/meetjs']} />
      <FAQ questions={LodzFAQ} />
      <Organizers city="Łódź" organizers={LodzOrganizers} />
      <CityEmail email="Lodz@meetjs.pl" />
    </>
  );
}
