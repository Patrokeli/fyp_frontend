import React from 'react';
import { Star, Quote } from 'lucide-react';

export function Testimonials() {
  const testimonials = [
    {
      name: 'Sarah M.',
      location: 'Dar es Salaam',
      comment:
        'FiberConnect helped me find a much better deal than I had before. The comparison tool made it so easy to see all my options.',
      rating: 5,
      provider: 'Zuku Fiber',
      image:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
    },
    {
      name: 'John T.',
      location: 'Arusha',
      comment:
        'I was paying too much for slow internet until I used FiberConnect. Now I have 100Mbps fiber for less than I was paying before!',
      rating: 5,
      provider: 'SimbaNet',
      image:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
    },
    {
      name: 'Grace L.',
      location: 'Mwanza',
      comment:
        'The setup process was so smooth. FiberConnect handled all the paperwork and coordination with the provider.',
      rating: 4,
      provider: 'TTCL Fiber',
      image:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-r from-white via-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
            What Our Users Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Thousands of Tanzanians have found better internet service through FiberConnect.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {testimonials.map((t, index) => (
            <div
              key={index}
              className="bg-white/70 backdrop-blur-md rounded-3xl shadow-xl border border-gray-200 p-8 transition-all hover:scale-105 hover:shadow-2xl duration-300"
            >
              <Quote className="text-blue-500 w-6 h-6 mb-4" />

              <p className="text-gray-800 text-base leading-relaxed mb-6">
                “{t.comment}”
              </p>

              <div className="flex items-center gap-4">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-14 h-14 rounded-full object-cover ring-2 ring-blue-500"
                />
                <div>
                  <h4 className="text-md font-semibold text-gray-900">
                    {t.name}
                  </h4>
                  <p className="text-sm text-gray-500">{t.location}</p>
                </div>
              </div>

              <div className="flex items-center mt-4 space-x-1" aria-label={`Rated ${t.rating} stars`}>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < t.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>

              <div className="mt-4">
                <span className="inline-block text-xs font-semibold bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
                  {t.provider}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          {/*<button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold transition">
            Read More Testimonials
          </button>*/}
        </div>
      </div>
    </section>
  );
}
