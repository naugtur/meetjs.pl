export default function Page() {
    return (
        <div className="container mx-auto max-w-3xl py-16">
            <h1 className="text-4xl font-bold mb-8">
                How to become an organizer
            </h1>

            <div className="mb-8 space-y-4">
                <p>
                    Do you wish to become an organizer and you need some help getting started? That&apos;s what we&apos;re here for!
                </p>
                <p>
                    If there&apos;s a meet.js in your city already, get in touch with the organizers to see how you can join.
                </p>
                <p>
                    If your city has a JavaScript crowd that&apos;s not organized yet or the local meetups are hosted by companies
                    for short-term commercial or hiring reasons, you should definitely set up a meet.js in your city.
                </p>
            </div>

            <div className="mb-8">
                <h2 className="text-xl font-semibold">
                    To start, reach out to <a href="mailto:contact@meetjs.pl?subject=meet.js%20YOURCITY"><strong>contact@meetjs.pl</strong></a> with the subject &quot;meet.js YOURCITY&quot;
                </h2>
            </div>

            <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">
                    What you need to have:
                </h2>
                <ul className="list-disc pl-6 space-y-2">
                    <li>A bit of time and ambition</li>
                    <li>No commercial interest or a company backing your engagement as an organizer</li>
                    <li>Some involvement with JavaScript and programming community (being a dev yourself and enthusiastic about other humans)</li>
                </ul>
            </div>

            <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">
                    What you&apos;ll get:
                </h2>
                <ul className="list-disc pl-6 space-y-2">
                    <li>Access to other organizers and their experience</li>
                    <li>Intro call with Zbyszek with all the knowledge you need to get the first meetup to happen</li>
                    <li>Help when talking to sponsors and venues</li>
                    <li>Access to the brand and the social media presence we have</li>
                    <li>Exposure to our network, including speakers that might want to visit your city</li>
                </ul>
            </div>

            <div>
                <h2 className="text-2xl font-semibold mb-4">
                    What you don&apos;t get:
                </h2>
                <ul className="list-disc pl-6 space-y-2">
                    <li>Money or anything of notable commercial value</li>
                </ul>
            </div>
        </div>
    );
}
