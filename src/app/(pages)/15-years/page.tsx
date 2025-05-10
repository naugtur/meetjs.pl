import Image from 'next/image';
import { FaArrowUpRightFromSquare } from 'react-icons/fa6';

export const metadata = {
  title: "Meet.js: 15 Years of JavaScript Community in Poland | meetjs.pl",
  description: "The history and evolution of meet.js - Poland's longest-running JavaScript community since 2011, preparing for its 15-year anniversary in 2026."
};

export default function Page() {
  return (
    <div className="container mx-auto max-w-4xl py-12">
      <h1 className="text-4xl font-bold mb-8">
        ✨ Meet.js: 15 Years of JavaScript Community in Poland
      </h1>

      <div className="prose prose-lg max-w-none">
        <p className="text-xl text-gray-700 mb-8">
          A comprehensive overview of meet.js - Poland's longest-running JavaScript community - 
          as we prepare for our 15-year anniversary celebration in 2026.
        </p>

        <div className="mb-12">
          <Image
            src="/about/meetjs-meetup.avif" 
            alt="meet.js meetup in action"
            width={1024}
            height={256}
            className="w-full h-64 object-cover rounded-lg shadow-lg mb-2"
          />
          <p className="text-sm text-gray-600 text-center">Community-driven events are at the heart of meet.js</p>
        </div>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Origins and Early Development</h2>
          
          <p>
            Meet.js was founded in early 2011, with the first event taking place in Poznań, Poland. 
            The community was established by Damian Wielgosik as a grassroots initiative for JavaScript developers and enthusiasts. 
            By the end of 2011, the meetups had already expanded to four different cities across Poland.
          </p>
          
          <p>
            The core philosophy of meet.js has remained consistent throughout its history: it's a family of local meetups 
            organized across Poland that are for-community and by-community, non-commercial, 
            and organized by passionate individuals. Events are free to attend or organized for charity causes.
          </p>

          <div className="flex items-center space-x-4 my-8">
            <div className="bg-purple/10 rounded-full p-5 flex justify-center items-center">
              <span className="text-2xl">2011</span>
            </div>
            <div className="border-t-2 border-dashed border-purple/30 flex-grow"></div>
            <div className="bg-purple/10 rounded-full p-5 flex justify-center items-center">
              <span className="text-2xl">2026</span>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4">The Summit Conference Series</h2>

          <h3 className="text-2xl font-semibold mt-6 mb-3">Early Summits (2012-2014)</h3>
          <p>
            The first meet.js Summit was held on January 14, 2012, in Poznań. 
            It was marketed as a "completely free and the hottest conference this winter" 
            and took place at Centrum Wykładowe PP. This inaugural summit set the pattern for annual nationwide gatherings.
          </p>
          <p>
            The 2013 Summit moved to Gdańsk's AmberExpo on October 19, featuring talks on topics like 
            pushing web limits, Firefox OS, HTML5 games, and real-time web applications.
          </p>
          <p>
            By 2014, the Summit was being described as a nationwide conference expected to attract over 300 front-end developers 
            from across Poland. It took place in September in Poznań and was promoted as both nationwide and free to attend.
          </p>

          <h3 className="text-2xl font-semibold mt-6 mb-3">Middle Period (2016-2018)</h3>
          <p>
            The 2016 Summit held special significance as it celebrated the 5th anniversary of local meet.js meetings. 
            It took place on March 19 at Luna cinema in Warsaw, accommodating approximately 350 attendees. 
            This edition featured unique promotional materials including a film called "Trudna Sprawa" 
            that was distributed on YouTube.
          </p>
          <p>
            The 2017 Summit returned to Gdańsk on September 18, marking the fifth installment of the summit conference series. 
            By this point, the event was gathering 450 professional front-end developers.
          </p>
          <p>
            The 2018 Summit in Poznań (October 19) was described as "the largest meet.js Summit ever." 
            Held at Międzynarodowe Targi Poznańskie, it featured an impressive agenda covering React components, 
            machine learning, accessibility, micro frontends, and more. The event became known for its tickets 
            selling out in less than 5 minutes. After taxes, this edition donated 45,269.03 PLN to 
            "Akademia Przyszłości" to help children.
          </p>

          <h3 className="text-2xl font-semibold mt-6 mb-3">Recent Years (2019-2024)</h3>
          <p>
            The 2019 Summit in Katowice continued the growth trend, gathering over 500 web development professionals.
          </p>
          <p>
            After a likely pause during the pandemic years, the 2022 Summit marked the 10th anniversary of meet.js Summit. 
            It took place on September 16 in Poznań Congress Center, maintaining the tradition of donating all proceeds to charity.
          </p>
          <p>
            The 2023 Summit was held in Wrocław, with Zbyszek Tenerowicz serving as the "Chief Officer of meet.js Poland".
          </p>
          <p>
            In 2024, rather than hosting its own summit, meet.js joined Warsaw IT Days on their 15th anniversary (April 6).
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
            <div>
              <Image
                src="/about/meetjs-summit.jpg"
                alt="meet.js Summit conference"
                width={512}
                height={192}
                className="w-full h-48 object-cover rounded-lg shadow-lg"
              />
              <p className="text-sm text-gray-600 text-center mt-2">meet.js Summit in action</p>
            </div>
            <div>
              <Image
                src="/about/meetjs-networking.jpg"
                alt="Networking at meet.js event"
                width={512}
                height={192}
                className="w-full h-48 object-cover rounded-lg shadow-lg"
              />
              <p className="text-sm text-gray-600 text-center mt-2">Community networking</p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Community Structure and Growth</h2>

          <h3 className="text-2xl font-semibold mt-6 mb-3">Geographic Expansion</h3>
          <p>
            From its origins in a single city, meet.js has expanded to numerous locations across Poland including:
          </p>
          <ul className="grid grid-cols-2 md:grid-cols-3 gap-2 my-4 list-none ml-0 pl-0">
            <li className="bg-purple/5 py-2 px-4 rounded-lg text-center">Gdańsk</li>
            <li className="bg-purple/5 py-2 px-4 rounded-lg text-center">Warsaw</li>
            <li className="bg-purple/5 py-2 px-4 rounded-lg text-center">Kraków</li>
            <li className="bg-purple/5 py-2 px-4 rounded-lg text-center">Poznań</li>
            <li className="bg-purple/5 py-2 px-4 rounded-lg text-center">Wrocław</li>
            <li className="bg-purple/5 py-2 px-4 rounded-lg text-center">Łódź</li>
            <li className="bg-purple/5 py-2 px-4 rounded-lg text-center">Katowice</li>
            <li className="bg-purple/5 py-2 px-4 rounded-lg text-center">Szczecin</li>
            <li className="bg-purple/5 py-2 px-4 rounded-lg text-center">Lublin</li>
            <li className="bg-purple/5 py-2 px-4 rounded-lg text-center">Białystok</li>
            <li className="bg-purple/5 py-2 px-4 rounded-lg text-center">Bydgoszcz</li>
            <li className="bg-purple/5 py-2 px-4 rounded-lg text-center">Bielsko-Biała</li>
          </ul>

          <p>
            The community describes itself as "Poland's largest and longest-running JavaScript community," 
            and by 2017 was claiming to be "one of the largest technical community in Europe".
          </p>

          <h3 className="text-2xl font-semibold mt-6 mb-3">Organization</h3>
          <p>
            Meet.js operates as a decentralized network of local groups, each with its own organizers. 
            The community maintains:
          </p>
          <ul>
            <li>A Discord server for online communication</li>
            <li>GitHub repositories for various assets and websites</li>
            <li>Local groups with their own social media and event platforms</li>
          </ul>
          <p>
            The events are consistently described as non-commercial, community-driven, and either free to attend or organized for charity.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Special Features and Traditions</h2>

          <h3 className="text-2xl font-semibold mt-6 mb-3">Charitable Focus</h3>
          <p>
            In recent years, the Summit conferences have donated proceeds to charity. The 2018 Summit contributed 
            over 45,000 PLN to help children, with organizers proudly noting that the net donation exceeded 
            the total cost of organizing the conference.
          </p>

          <h3 className="text-2xl font-semibold mt-6 mb-3">Related Communities</h3>
          <p>
            Meet.js has connections to other specialized communities, such as "Gamedev.js Warsaw" which focuses on 
            HTML5 game development with JavaScript.
          </p>

          <h3 className="text-2xl font-semibold mt-6 mb-3">Corporate Collaborations</h3>
          <p>
            While maintaining its non-commercial nature, meet.js has collaborated with various tech companies to host events. 
            For example, in 2015, meet.js teamed up with Schibsted Tech Polska to host 100 developers at their office in Krakow.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Current Status</h2>
          <p>
            As of May 2025, meet.js remains active with upcoming events planned. The community continues to maintain 
            its online presence through Discord, GitHub, and various social media platforms.
          </p>
          
          <div className="bg-purple/5 p-6 rounded-xl mt-8">
            <h3 className="text-2xl font-bold text-center mb-4">
              🎉 Looking Forward: 15-Year Anniversary in 2026 🎉
            </h3>
            <p className="text-center">
              The upcoming 15-year anniversary in 2026 represents a significant milestone that will celebrate 
              not only the technical evolution of JavaScript during this period but also the human connections 
              and professional development fostered through this enduring community.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-4">Learn More</h2>
          <ul>
            <li>
              <a 
                href="https://summit.meetjs.pl" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-blue-600 hover:underline"
              >
                meet.js Summit <FaArrowUpRightFromSquare className="mb-1 ml-1 inline-block h-3 w-3" aria-hidden="true" />
              </a>
            </li>
            <li>
              <a 
                href="https://gamedevjs.pl" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-blue-600 hover:underline"
              >
                Gamedev.js <FaArrowUpRightFromSquare className="mb-1 ml-1 inline-block h-3 w-3" aria-hidden="true" />
              </a>
            </li>
            <li>
              <a href="/team" className="text-blue-600 hover:underline">
                Meet our team of organizers
              </a>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
