import { PageMeta } from '@/components/PageMeta';
import { CityEmail } from '@/components/CityEmail';
import { Organizers } from '@/components/Organizers';
import { FAQ } from '@/components/FAQ';
import { CityBanner } from '@/components/CityBanner';
import { EventSection } from '@/components/EventSection';
import { GdanskFAQ } from '@/data/cities/gdansk/faq';
import { GdanskOrganizers } from '@/data/cities/gdansk/organizers';
import { LocalGroups } from '@/components/LocalGroups';

export default function GdanskPage() {
  return (
    <>
      <PageMeta
        title="meet.js Gdańsk"
        description="JavaScript meetups in Gdańsk"
        path="/gdansk"
        keywords="meet.js, Gdańsk, JavaScript, meetup"
        ogImage="/api/og?city=Gdańsk"
        ogImageAlt="meet.js | JavaScript meetups in Gdańsk"
      />
      <CityBanner city="Gdańsk" background="/city/gdansk/cover.png" />
      <EventSection city="Gdańsk" />
      <LocalGroups localGroups={[]} />
      <FAQ questions={GdanskFAQ} />
      <Organizers city="Gdańsk" organizers={GdanskOrganizers} />
      <CityEmail email="gdansk@meetjs.pl" />
    </>
  );
}
