import { Metadata } from 'next';
import Image from 'next/image';
import { ExternalLink, Users, BookOpen, Shield, Camera, Bot } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Community Partnerships | meet.js',
  description: 'Educational and community initiatives supported by meet.js - building a stronger tech community together.',
  openGraph: {
    title: 'Community Partnerships | meet.js',
    description: 'Educational and community initiatives supported by meet.js - building a stronger tech community together.',
  },
};

const partnerships = [
  {
    name: 'FutureConf 2025',
    website: 'https://futureconf.tech/',
    description: 'Two-day AI conference in Kraków focused on "AI in Production" with industry experts and practical use cases.',
    details: [
      'Expert talks on ML/AI, security, and practical AI production use cases',
      'Speakers from Hugging Face, Docker, Qdrant, mBank, and AGH University',
      'Networking opportunities with AI professionals and enthusiasts',
      'Workshops and hands-on sessions on AI implementation',
      'Located at International Cultural Centre on Main Square, Kraków',
    ],
    goals: [
      'Advancing AI knowledge and practical implementation',
      'Building connections in the AI and tech community',
      'Sharing real-world AI production experiences',
      'Supporting the growth of AI expertise in Poland',
    ],
    location: 'Kraków, Poland',
    contact: 'https://futureconf.tech/meetjs/',
    icon: <Bot className="h-8 w-8 text-purple-500" />,
    gradient: 'from-purple-600 to-blue-600',
    photos: [
      {
        src: 'https://futureconf.tech/assets/rozek.webp',
        alt: 'FutureConf 2024 conference atmosphere',
        caption: 'Conference atmosphere with hundreds of AI enthusiasts'
      },
      {
        src: 'https://futureconf.tech/assets/photobooth/uczestnik2.webp',
        alt: 'Conference speakers at FutureConf',
        caption: 'Industry experts sharing AI knowledge'
      },
      {
        src: 'https://futureconf.tech/assets/photobooth/uczestnik.webp',
        alt: 'Conference attendees networking',
        caption: 'Active networking and knowledge exchange'
      },
      {
        src: 'https://futureconf.tech/assets/ludzie-10.webp',
        alt: 'FutureConf community gathering',
        caption: 'Building the AI community in Poland'
      }
    ],
    specialOffer: {
      title: 'Group Discount System',
      description: 'Up to 50% off through meet.js partnership',
      link: 'https://futureconf.tech/meetjs/',
      linkText: 'Get Group Discount'
    }
  },
  {
    name: 'Młodzi 4IT 2.0',
    website: 'https://www.mlodzi4it.com/',
    description: 'Educational project focused on digital awareness and safe technology usage for youth and seniors.',
    details: [
      'Free educational workshops in schools, libraries, and cultural centers',
      'Personal data protection and internet privacy education',
      'Responsible AI usage training',
      'Cybercrime prevention (including phone scams and fake messages)',
      'Creating free educational materials (flyers, quizzes, e-books, presentations)',
    ],
    goals: [
      'Building digital awareness among children and seniors',
      'Teaching safe internet usage and data protection',
      'Explaining AI technology and its responsible use',
      'Preventing cybercrime through education',
    ],
    location: 'Bielsko-Biała and surrounding areas',
    contact: 'mlodzi4it@gmail.com',
    icon: <BookOpen className="h-8 w-8 text-blue-500" />,
    gradient: 'from-blue-500 to-purple-600',
    photos: [
      {
        src: '/partnerships/mlodzi4it-workshop-1.jpg',
        alt: 'Młodzi 4IT workshop with students in classroom',
        caption: 'Educational workshop on digital awareness and cybersecurity'
      },
      {
        src: '/partnerships/mlodzi4it-workshop-2.jpg',
        alt: 'Interactive presentation about AI and technology',
        caption: 'Teaching responsible AI usage to young students'
      },
      {
        src: '/partnerships/mlodzi4it-workshop-3.jpg',
        alt: 'Students participating in cybersecurity training',
        caption: 'Hands-on cybersecurity education session'
      },
      {
        src: '/partnerships/mlodzi4it-workshop-4.jpg',
        alt: 'Group activity during digital literacy workshop',
        caption: 'Interactive learning about internet safety'
      },
      {
        src: '/partnerships/mlodzi4it-workshop-5.jpg',
        alt: 'Młodzi 4IT team presenting educational materials',
        caption: 'Presenting educational materials and resources'
      }
    ],
  },
];

export default function CommunityPartnershipsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-blue-600 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Users className="mx-auto h-16 w-16 text-white mb-6" />
            <h1 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
              Community Partnerships
            </h1>
            <p className="mt-6 text-xl text-purple-100 max-w-3xl mx-auto">
              Supporting educational initiatives and community projects that strengthen the tech ecosystem
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Community Partners
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We proudly support educational and community initiatives that align with our mission 
              of building a stronger, more inclusive tech community.
            </p>
          </div>

          <div className="grid gap-8">
            {partnerships.map((partnership) => (
              <div
                key={partnership.name}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className={`bg-gradient-to-r ${partnership.gradient} p-6`}>
                  <div className="flex items-center gap-4">
                    {partnership.icon}
                    <div>
                      <h3 className="text-2xl font-bold text-white">
                        {partnership.name}
                      </h3>
                      <p className="text-white/90 mt-1">
                        {partnership.location}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-8">
                  <p className="text-lg text-gray-700 mb-6">
                    {partnership.description}
                  </p>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <BookOpen className="h-5 w-5 text-blue-500" />
                        What They Do
                      </h4>
                      <ul className="space-y-2">
                        {partnership.details.map((detail, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                            <span className="text-gray-600">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <Shield className="h-5 w-5 text-green-500" />
                        Their Goals
                      </h4>
                      <ul className="space-y-2">
                        {partnership.goals.map((goal, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                            <span className="text-gray-600">{goal}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {partnership.photos && (
                    <div className="mt-8">
                      <h4 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <Camera className="h-5 w-5 text-purple-500" />
                        Workshop Photos
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {partnership.photos.map((photo, index) => (
                          <div key={index} className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                            <Image
                              src={photo.src}
                              alt={photo.alt}
                              width={400}
                              height={300}
                              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <div className="absolute bottom-0 left-0 right-0 p-4">
                                <p className="text-white text-sm font-medium">
                                  {photo.caption}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {partnership.specialOffer && (
                    <div className="mt-8 p-6 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg">
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">
                        🎟️ {partnership.specialOffer.title}
                      </h4>
                      <p className="text-gray-700 mb-4">
                        {partnership.specialOffer.description}
                      </p>
                      <a
                        href={partnership.specialOffer.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 font-semibold"
                      >
                        {partnership.specialOffer.linkText}
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>
                  )}

                  <div className="mt-8 flex flex-col sm:flex-row gap-4">
                    <a
                      href={partnership.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                    >
                      Visit Website
                      <ExternalLink className="h-4 w-4" />
                    </a>
                    {partnership.contact.includes('@') ? (
                      <a
                        href={`mailto:${partnership.contact}`}
                        className="inline-flex items-center gap-2 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                      >
                        Contact Project
                      </a>
                    ) : (
                      <a
                        href={partnership.contact}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                      >
                        Learn More
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gray-900 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Want to Partner With Us?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            If you&apos;re running an educational or community initiative that aligns with our values, 
            we&apos;d love to hear from you.
          </p>
          <a
            href="mailto:hello@meetjs.pl"
            className="inline-flex items-center gap-2 bg-purple-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-purple-700 transition-colors duration-200"
          >
            Get in Touch
          </a>
        </div>
      </section>
    </div>
  );
}
