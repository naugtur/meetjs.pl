import { PageMeta } from '@/components/PageMeta';
import { CityEmail } from '@/components/CityEmail';
import { Organizers } from '@/components/Organizers';
import { FAQ } from '@/components/FAQ';
import { CityBanner } from '@/components/CityBanner';
import { EventSection } from '@/components/EventSection';
import { WarsawFAQ } from '@/data/cities/warszawa/faq';
import { WarsawOrganizers } from '@/data/cities/warszawa/organizers';
import { LocalGroups } from '@/components/LocalGroups';

export default function WarszawaPage() {
  return (
    <>
      <PageMeta
        title="meet.js Warsaw"
        description="JavaScript meetups in Warsaw"
        path="/warszawa"
        keywords="meet.js, Warsaw, JavaScript, meetup"
        ogImage="/api/og?city=Warsaw"
        ogImageAlt="meet.js | JavaScript meetups in Warsaw"
      />
      <CityBanner city="Warsaw" background="/city/warszawa/cover.jpg" />
      <EventSection city="Warszawa" />
      <LocalGroups
        localGroups={[
          'https://www.meetup.com/meet-js-warsaw/',
          'https://lu.ma/user/usr-eNzoaGXYjizOBQI',
        ]}
      />
      <div id="video" style={{ display: 'flex', 'justify-content': 'center' }}>
        <iframe
          src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7301219840705339392?compact=1"
          allowfullscreen
          title="meet.js Warsaw at Box Warsaw"
        ></iframe>
      </div>
      <FAQ questions={WarsawFAQ} />
      <Organizers city="Warsaw" organizers={WarsawOrganizers} />
      <CityEmail email="warszawa@meetjs.pl" />
    </>
  );
}
