import { PageMeta } from '@/components/PageMeta';
import { CityEmail } from '@/components/CityEmail';
import { Organizers } from '@/components/Organizers';
import { FAQ } from '@/components/FAQ';
import { CityBanner } from '@/components/CityBanner';
import { EventSection } from '@/components/EventSection';
import { KatowiceFAQ } from '@/data/cities/katowice/faq';
import { KatowiceOrganizers } from '@/data/cities/katowice/organizers';

export default function KatowicePage() {
  return (
    <>
      <PageMeta
        title="meet.js Katowice"
        description="JavaScript meetups in Katowice"
        path="/katowice"
        keywords="meet.js, Katowice, JavaScript, meetup"
        ogImage="/api/og?city=Katowice"
        ogImageAlt="meet.js | JavaScript meetups in Katowice"
      />
      <CityBanner city="Katowice" background="/city/katowice/cover.avif" />
      <EventSection city="Katowice" />
      <FAQ questions={KatowiceFAQ} />
      <Organizers city="Katowice" organizers={KatowiceOrganizers} />
    </>
  );
}
