'use client';

import { useState } from 'react';
import { FaPaperPlane, FaCheck } from 'react-icons/fa6';

export const SponsorCTA = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
    submitted: false,
    loading: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState((prev) => ({ ...prev, loading: true }));
    
    // Simulate form submission
    setTimeout(() => {
      setFormState((prev) => ({ ...prev, submitted: true, loading: false }));
    }, 1500);
    
    // In a real implementation, you would send the form data to your backend
    // fetch('/api/contact', {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     name: formState.name,
    //     email: formState.email,
    //     company: formState.company,
    //     message: formState.message,
    //   }),
    // });
  };

  return (
    <section id="become-sponsor" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Become a Sponsor</h2>
          <p className="text-center text-gray-600 mb-12">
            Interested in sponsoring meet.js events? Fill out the form below and we'll get back to you with more information.
          </p>
          
          {formState.submitted ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
              <div className="mx-auto w-16 h-16 bg-green text-white rounded-full flex items-center justify-center mb-4">
                <FaCheck className="text-2xl" />
              </div>
              <h3 className="text-2xl font-bold text-green-800 mb-2">Thank You!</h3>
              <p className="text-gray-600 mb-4">
                We've received your sponsorship inquiry and will get back to you shortly.
              </p>
              <button 
                onClick={() => setFormState({
                  name: '',
                  email: '',
                  company: '',
                  message: '',
                  submitted: false,
                  loading: false,
                })}
                className="text-purple hover:text-purple-700 font-medium"
              >
                Send another inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-gray-50 rounded-lg p-8 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple focus:border-purple"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple focus:border-purple"
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="company" className="block text-gray-700 font-medium mb-2">
                  Company Name *
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formState.company}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple focus:border-purple"
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple focus:border-purple"
                  placeholder="Tell us about your sponsorship goals and interests..."
                />
              </div>
              
              <div className="text-center">
                <button
                  type="submit"
                  disabled={formState.loading}
                  className="bg-purple hover:bg-purple-700 text-white font-medium py-3 px-6 rounded-lg transition-colors inline-flex items-center"
                >
                  {formState.loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane className="mr-2" /> Send Inquiry
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
          
          <div className="mt-12 text-center">
            <h3 className="text-xl font-bold mb-4">Other Ways to Connect</h3>
            <p className="text-gray-600 mb-2">
              Email us directly at: <a href="mailto:sponsors@meetjs.pl" className="text-purple hover:underline">sponsors@meetjs.pl</a>
            </p>
            <p className="text-gray-600">
              Connect with our organizers on LinkedIn to discuss sponsorship opportunities.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
