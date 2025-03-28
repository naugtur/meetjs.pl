import Image from 'next/image';

export default function Page() {
    return (
        <div className="container mx-auto max-w-3xl py-16">
            <h1 className="text-4xl font-bold mb-8">
                About meet.js
            </h1>

            <div className="mb-12">
                <Image
                    src="/about/meetjs-meetup.avif"
                    alt="meet.js meetup in action"
                    width={1024}
                    height={256}
                    className="w-full h-64 object-cover rounded-lg shadow-lg mb-2"
                />
                <p className="text-sm text-gray-600 text-center">One of our regular meetups in action</p>
            </div>

            <div className="mb-8 space-y-4">
                <p>
                    meet.js is Poland&apos;s largest and longest-running JavaScript community, bringing together developers,
                    enthusiasts, and industry experts since 2011.
                </p>
                <p>
                    It all began on a Valentine&apos;s Day eve in 2011, when a group of JavaScript enthusiasts gathered in a
                    Poznań pub. What started as a casual meetup has evolved into a nationwide movement that has shaped
                    Poland&apos;s JavaScript ecosystem.
                </p>
            </div>

            <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">
                    Our Values
                </h2>
                <ul className="list-disc pl-6 space-y-2">
                    <li>100% Non-Commercial - We operate without corporate oversight or profit motives</li>
                    <li>Free and Open - All our events are free and open to everyone interested in web technologies</li>
                    <li>Community-Driven - Powered by passionate local organizers across Poland</li>
                    <li>Knowledge Sharing - Focus on practical learning and networking opportunities</li>
                </ul>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                <div>
                    <Image
                        src="/about/meetjs-summit.jpg"
                        alt="meet.js Summit conference"
                        width={512}
                        height={192}
                        className="w-full h-48 object-cover rounded-lg shadow-lg"
                    />
                    <p className="text-sm text-gray-600 text-center mt-2">meet.js Summit conference</p>
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

            <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">
                    What We Do
                </h2>
                <ul className="list-disc pl-6 space-y-2">
                    <li>Regular local meetups across multiple Polish cities</li>
                    <li>Semi-annual <a href="https://summit.meetjs.pl" className="text-blue-600 hover:underline">meet.js Summit</a> conference</li>
                    <li>Partnership with charity organizations</li>
                    <li>Networking opportunities for JavaScript enthusiasts</li>
                    <li>Knowledge sharing sessions and tech talks</li>
                </ul>
            </div>

            <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">
                    Get Involved
                </h2>
                <p className="mb-4">
                    Whether you&apos;re a seasoned developer or just starting your journey with JavaScript,
                    meet.js welcomes you to join our vibrant community.
                </p>
                <p className="mb-4">
                    Find your local meet.js chapter or check out <a href="/how-to-become-an-organizer" className="text-blue-600 hover:underline font-bold">how to become an organizer</a> to help grow Poland&apos;s most resilient tech community!
                </p>
                <Image
                    src="/about/meetjs-organizers.jpg"
                    alt="meet.js organizers team"
                    width={1024}
                    height={192}
                    className="w-full h-48 object-cover rounded-lg shadow-lg mt-4"
                />
                <p className="text-sm text-gray-600 text-center mt-2">Our amazing organizers team</p>
            </div>

            <div>
                <h2 className="text-2xl font-semibold mb-4">
                    Contact Us
                </h2>
                <p>
                    Have questions? Reach out to us at <a href="mailto:contact@meetjs.pl" className="text-blue-600 hover:underline">contact@meetjs.pl</a>
                </p>
            </div>
        </div>
    );
}
