import React from 'react';
import { Search, BarChart2, Clock, MapPin, CreditCard, Headphones } from 'lucide-react';

const features = [
  {
    icon: <Search className="h-6 w-6 text-white" />,
    title: 'Compare Providers',
    description:
      'Easily compare plans, speeds, and prices from multiple fiber providers in Tanzania in one place.',
  },
  {
    icon: <BarChart2 className="h-6 w-6 text-white" />,
    title: 'Transparent Pricing',
    description:
      "See all fees and charges upfront with no hidden costs. Know exactly what you'll be paying.",
  },
  {
    icon: <MapPin className="h-6 w-6 text-white" />,
    title: 'Coverage Checker',
    description:
      'Find out which providers service your area before spending time researching plans.',
  },
  {
    icon: <Clock className="h-6 w-6 text-white" />,
    title: 'Quick Setup',
    description:
      'Streamlined application process gets you connected faster without the typical paperwork hassle.',
  },
  {
    icon: <CreditCard className="h-6 w-6 text-white" />,
    title: 'Exclusive Deals',
    description:
      'Access special promotions and packages not advertised elsewhere, negotiated for our users.',
  },
  {
    icon: <Headphones className="h-6 w-6 text-white" />,
    title: 'Expert Support',
    description:
      'Get unbiased advice from our team to help you choose the right plan for your needs.',
  },
];

export function Features() {
  return (
    <section className="py-20 bg-gray-50" id="features">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-5">
            Why Choose FiberConnect Tanzania
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            We simplify the process of finding and subscribing to the best fiber internet service for your needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map(({ icon, title, description }, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-8 shadow-lg flex flex-col items-center text-center
                         transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="flex items-center justify-center rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 w-14 h-14 mb-6 shadow-lg">
                {icon}
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">{title}</h3>
              <p className="text-gray-600 text-base leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
