// FILE: src/app/components/home/Testimonials.js
'use client';

import { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Testimonials({ testimonials: staticTestimonials = [] }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch approved reviews from the database
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('/api/reviews/approved?limit=20');
        if (response.ok) {
          const data = await response.json();
          setReviews(data.reviews || []);
        }
      } catch (error) {
        console.error('Error fetching reviews:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  // Map client names to their photos
  const getClientPhoto = (name) => {
    const clientPhotos = {
      'Lauryn Cassells': '/lc.jpeg',
      'Garvit Chaudhary': '/gc.jpeg', 
      'Akshay Sharma': '/as.jpeg',
      'Hitesh': null,
      'Yadu': null,
      'Jacob': null
    };
    return clientPhotos[name] || null;
  };

  // Combine database reviews with static testimonials
  const allTestimonials = [
    ...reviews.map(review => ({
      id: review.id,
      name: review.customer_name,
      customer_name: review.customer_name,
      review_text: review.review_text,
      content: review.review_text,
      rating: review.rating,
      position: 'Customer',
      company: 'Selling Infinity'
    })),
    ...staticTestimonials
  ];

  // Create infinite testimonials by duplicating the array
  const infiniteTestimonials = allTestimonials.length > 0 ? [...allTestimonials, ...allTestimonials, ...allTestimonials] : [];

  return (
    <section id="testimonials" className="relative section-padding bg-[#0f1729] text-white overflow-hidden">
      
      <div className="relative content-container container-padding z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">What Our Clients Say</h2>
        </div>
        
        {loading ? (
          <div className="text-center text-gray-500">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            Loading testimonials...
          </div>
        ) : allTestimonials.length === 0 ? (
          <div className="text-center text-gray-500">
            No testimonials available at the moment.
          </div>
        ) : (
          <div className="relative">
            {/* Infinite Scroll Container */}
            <div className="overflow-hidden">
              <div 
                className="flex animate-scroll"
                style={{
                  width: `${infiniteTestimonials.length * 320}px`,
                  animationDuration: `${infiniteTestimonials.length * 1.8}s`,
                  animationIterationCount: 'infinite'
                }}
              >
                {infiniteTestimonials.map((testimonial, index) => (
                  <div key={`${testimonial.id}-${index}`} className="w-96 flex-shrink-0 px-4">
                    <div className="bg-white/5 rounded-xl p-3 shadow-md hover:shadow-lg transition-all duration-300 h-full border border-white/10 hover:border-yellow-400/30">
                      <div className="flex flex-col h-full">
                        {/* Review Title */}
                        {testimonial.title && (
                          <h4 className="font-semibold text-white text-sm mb-2">
                            {testimonial.title}
                          </h4>
                        )}
                        
                        {/* Testimonial Text */}
                        <blockquote className="text-white/80 text-sm mb-4 leading-relaxed">
                          "{testimonial.review_text || testimonial.content}"
                        </blockquote>
                        
                        {/* Customer Info */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            {getClientPhoto(testimonial.customer_name || testimonial.name) ? (
                              <img 
                                src={getClientPhoto(testimonial.customer_name || testimonial.name)} 
                                alt={testimonial.customer_name || testimonial.name}
                                className="w-10 h-10 rounded-full object-cover"
                                loading="lazy"
                                width="40"
                                height="40"
                              />
                            ) : testimonial.image_url ? (
                              <img 
                                src={testimonial.image_url} 
                                alt={testimonial.customer_name || testimonial.name}
                                className="w-10 h-10 rounded-full object-cover"
                                loading="lazy"
                                width="40"
                                height="40"
                              />
                            ) : (
                              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                                <span className="text-white font-semibold text-xs">
                                  {(testimonial.customer_name || testimonial.name)?.charAt(0)}
                                </span>
                              </div>
                            )}
                            <div>
                              <div className="font-semibold text-white text-sm">
                                {testimonial.customer_name || testimonial.name}
                              </div>
                              {testimonial.position && testimonial.company && (
                                <div className="text-xs text-white/60">
                                  {testimonial.position} at {testimonial.company}
                                </div>
                              )}
                            </div>
                          </div>
                          
                          {/* Stars */}
                          <div className="flex">
                            {[...Array(testimonial.rating || 5)].map((_, i) => (
                              <Star key={i} size={14} className="text-yellow-400 fill-current" />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
