import { PageMeta } from '@/components/PageMeta';
import { CityEmail } from '@/components/CityEmail';
import { Organizers } from '@/components/Organizers';
import { FAQ } from '@/components/FAQ';
import { CityBanner } from '@/components/CityBanner';
import { EventSection } from '@/components/EventSection';
import { WroclawFAQ } from '@/data/cities/wroclaw/faq';
import { WroclawOrganizers } from '@/data/cities/wroclaw/organizers';
import { LocalGroups } from '@/components/LocalGroups';

export default function WroclawPage() {
  return (
    <>
      <PageMeta
        title="meet.js Wrocław"
        description="JavaScript meetups in Wrocław"
        path="/wroclaw"
        keywords="meet.js, Wrocław, JavaScript, meetup"
        ogImage="/api/og?city=Wrocław"
        ogImageAlt="meet.js | JavaScript meetups in Wrocław"
      />
      <CityBanner city="Wrocław" background="/city/wroclaw/cover.jpeg" />
      <EventSection city="Wrocław" />
      <LocalGroups
        localGroups={[
          'https://www.meetup.com/meet-js-wroclaw/',
          'https://www.facebook.com/groups/326774397348491',
          'https://lu.ma/user/usr-eNzoaGXYjizOBQI',
        ]}
      />
      <FAQ questions={WroclawFAQ} />
      <Organizers city="Wrocław" organizers={WroclawOrganizers} />
      <CityEmail email="wroclaw@meetjs.pl" />
    </>
  );
}
