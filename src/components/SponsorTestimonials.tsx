'use client';

import Image from 'next/image';
import { useState } from 'react';
import { FaQuoteLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa6';

export const SponsorTestimonials = () => {
  const testimonials = [
    {
      id: 1,
      quote: "Sponsoring meet.js events has been a fantastic opportunity for our company to connect with talented JavaScript developers across Poland. The community is engaged, knowledgeable, and always eager to learn about new technologies.",
      author: "Anna Kowalska",
      position: "Developer Relations Lead",
      company: "TechCorp Poland",
      avatar: "/images/sponsors/avatar-1.jpg",
    },
    {
      id: 2,
      quote: "As a long-time sponsor of meet.js, we've seen tremendous value in our partnership. The events are well-organized, the audience is highly engaged, and we've been able to recruit several talented developers through our involvement with the community.",
      author: "Tomasz Nowak",
      position: "Head of Engineering",
      company: "CodeMasters",
      avatar: "/images/sponsors/avatar-2.jpg",
    },
    {
      id: 3,
      quote: "The meet.js community has been instrumental in helping us build our brand presence in the Polish tech ecosystem. The organizers are professional, the events are high-quality, and the developers who attend are exactly the audience we want to reach.",
      author: "Magdalena Wiśniewska",
      position: "Marketing Director",
      company: "DevTools Pro",
      avatar: "/images/sponsors/avatar-3.jpg",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">What Our Sponsors Say</h2>
        
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8 relative">
          <FaQuoteLeft className="text-4xl text-purple/20 absolute top-8 left-8" />
          
          <div className="text-center px-8 pt-8">
            <p className="text-xl text-gray-700 mb-8 italic">
              {testimonials[currentIndex].quote}
            </p>
            
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-purple mr-4 relative">
                {/* Placeholder for avatar - in production, use actual images */}
                <div className="w-full h-full bg-purple-200 flex items-center justify-center text-purple font-bold text-xl">
                  {testimonials[currentIndex].author.charAt(0)}
                </div>
              </div>
              
              <div className="text-left">
                <p className="font-bold text-lg">{testimonials[currentIndex].author}</p>
                <p className="text-gray-600">{testimonials[currentIndex].position}</p>
                <p className="text-purple font-medium">{testimonials[currentIndex].company}</p>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center gap-4 mt-8">
            <button 
              onClick={prevTestimonial}
              className="p-2 rounded-full bg-gray-200 hover:bg-purple hover:text-white transition-colors"
              aria-label="Previous testimonial"
            >
              <FaChevronLeft />
            </button>
            
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full ${
                    index === currentIndex ? 'bg-purple' : 'bg-gray-300'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            
            <button 
              onClick={nextTestimonial}
              className="p-2 rounded-full bg-gray-200 hover:bg-purple hover:text-white transition-colors"
              aria-label="Next testimonial"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
