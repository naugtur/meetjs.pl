import { PageMeta } from '@/components/PageMeta';
import { CityEmail } from '@/components/CityEmail';
import { Organizers } from '@/components/Organizers';
import { FAQ } from '@/components/FAQ';
import { CityBanner } from '@/components/CityBanner';
import { EventSection } from '@/components/EventSection';
import { LublinFAQ } from '@/data/cities/lublin/faq';
import { LublinOrganizers } from '@/data/cities/lublin/organizers';
import { LocalGroups } from '@/components/LocalGroups';

export default function LublinPage() {
  return (
    <>
      <PageMeta
        title="meet.js Lublin"
        description="JavaScript meetups in Lublin"
        path="/lublin"
        keywords="meet.js, Lublin, JavaScript, meetup"
        ogImage="/api/og?city=Lublin"
        ogImageAlt="meet.js | JavaScript meetups in Lublin"
      />
      <CityBanner
        city="Lublin"
        background="https://ocdn.eu/pulscms-transforms/1/EDik9kpTURBXy9iYjJhMTIyMGEzY2E2M2YzMjUyNGRmZDBmZWNhMTZhMC5qcGeTlQMAzNbNDvDNCGeTBc0DFM0BvJMJpmQ2NzRmNAbeAAGhMAY/lublin.avif"
      />
      <EventSection city="Lublin" />
      <LocalGroups localGroups={['https://luma.com/user/meetjs']} />
      <FAQ questions={LublinFAQ} />
      <Organizers city="Lublin" organizers={LublinOrganizers} />
      <CityEmail email="lublin@meetjs.pl" />
    </>
  );
}
