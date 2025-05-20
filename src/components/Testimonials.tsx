import React from 'react';
import { Star } from 'lucide-react';
export function Testimonials() {
  const testimonials = [{
    name: 'Sarah M.',
    location: 'Dar es Salaam',
    comment: 'FiberConnect helped me find a much better deal than I had before. The comparison tool made it so easy to see all my options.',
    rating: 5,
    provider: 'Zuku Fiber',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80'
  }, {
    name: 'John T.',
    location: 'Arusha',
    comment: 'I was paying too much for slow internet until I used FiberConnect. Now I have 100Mbps fiber for less than I was paying before!',
    rating: 5,
    provider: 'SimbaNet',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80'
  }, {
    name: 'Grace L.',
    location: 'Mwanza',
    comment: 'The setup process was so smooth. FiberConnect handled all the paperwork and coordination with the provider.',
    rating: 4,
    provider: 'TTCL Fiber',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80'
  }];
  return <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            What Our Users Say
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Thousands of Tanzanians have found better internet service through
            FiberConnect.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <img src={testimonial.image} alt={testimonial.name} className="h-12 w-12 rounded-full mr-4" />
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {testimonial.location}
                  </p>
                </div>
              </div>
              <div className="flex mb-2">
                {[...Array(5)].map((_, i) => <Star key={i} className={`h-5 w-5 ${i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />)}
              </div>
              <p className="text-gray-600 italic mb-4">
                "{testimonial.comment}"
              </p>
              <div className="text-sm text-gray-500">
                Provider:{' '}
                <span className="font-medium">{testimonial.provider}</span>
              </div>
            </div>)}
        </div>
        <div className="mt-12 text-center">
          <button className="text-blue-600 hover:text-blue-800 font-medium flex items-center mx-auto">
            <span>Read more testimonials</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </section>;
}