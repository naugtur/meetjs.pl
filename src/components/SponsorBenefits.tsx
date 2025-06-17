'use client';

import { FaHandshake, FaUsers, FaBullhorn, FaChartLine, FaLightbulb, FaNetworkWired } from 'react-icons/fa6';

export const SponsorBenefits = () => {
  const benefits = [
    {
      id: 1,
      title: 'Reach New Audiences',
      description: 'Introduce your products or services to developers who have never heard about your company before.',
      icon: <FaUsers className="h-8 w-8 text-purple" />,
    },
    {
      id: 2,
      title: 'Brand Recognition',
      description: 'Improve your brand visibility with logo placement on our website, event materials, and venue displays.',
      icon: <FaBullhorn className="h-8 w-8 text-purple" />,
    },
    {
      id: 3,
      title: 'Lead Generation',
      description: 'Connect with highly targeted leads for your business and build valuable connections with attendees.',
      icon: <FaChartLine className="h-8 w-8 text-purple" />,
    },
    {
      id: 4,
      title: 'Talent Recruitment',
      description: 'Meet skilled developers and potential candidates for your team in a relaxed, professional setting.',
      icon: <FaHandshake className="h-8 w-8 text-purple" />,
    },
    {
      id: 5,
      title: 'Community Support',
      description: 'Show your commitment to the JavaScript community and contribute to its growth in Poland.',
      icon: <FaLightbulb className="h-8 w-8 text-purple" />,
    },
    {
      id: 6,
      title: 'Networking Opportunities',
      description: 'Connect with other companies, speakers, and influencers in the JavaScript ecosystem.',
      icon: <FaNetworkWired className="h-8 w-8 text-purple" />,
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">What You Get as a Sponsor</h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
          Join the largest JavaScript community in Poland and enjoy these benefits while supporting the growth of the tech ecosystem.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit) => (
            <div key={benefit.id} className="bg-gray-50 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="mb-4">{benefit.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 bg-purple text-white rounded-lg p-8">
          <h3 className="text-2xl font-bold mb-4 text-center">Sponsorship Packages</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white text-gray-800 rounded-lg p-6 shadow-lg">
              <h4 className="text-xl font-bold mb-2 text-purple">Silver Sponsor</h4>
              <p className="text-gray-600 mb-4">Perfect for companies looking to establish their presence in the JavaScript community.</p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Logo on website
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Social media mentions
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Promotional materials
                </li>
              </ul>
            </div>
            
            <div className="bg-white text-gray-800 rounded-lg p-6 shadow-lg border-2 border-purple relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-purple text-white px-4 py-1 rounded-full text-sm font-medium">
                Most Popular
              </div>
              <h4 className="text-xl font-bold mb-2 text-purple">Gold Sponsor</h4>
              <p className="text-gray-600 mb-4">Enhanced visibility and engagement opportunities for your brand.</p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  All Silver benefits
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Logo on event banners
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  5-minute presentation
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Booth/table at events
                </li>
              </ul>
            </div>
            
            <div className="bg-white text-gray-800 rounded-lg p-6 shadow-lg">
              <h4 className="text-xl font-bold mb-2 text-purple">Platinum Sponsor</h4>
              <p className="text-gray-600 mb-4">Premium partnership with maximum exposure and exclusive benefits.</p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  All Gold benefits
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Premium logo placement
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  10-minute keynote
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Job listings promotion
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Exclusive workshop option
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
