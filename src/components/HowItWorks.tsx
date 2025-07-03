import React from 'react';
import { Search, FileText, PhoneCall, Zap } from 'lucide-react';

const steps = [
  {
    id: 1,
    title: 'Search Your Area',
    description: 'Enter your location to find all available fiber providers in your area.',
    icon: <Search className="h-6 w-6 text-white" />,
  },
  {
    id: 2,
    title: 'Compare Plans',
    description: 'Compare speeds, prices, and features to find the plan that fits your needs.',
    icon: <FileText className="h-6 w-6 text-white" />,
  },
  {
    id: 3,
    title: 'Request Service',
    description: "Fill out a simple form and we'll handle the provider communication for you.",
    icon: <PhoneCall className="h-6 w-6 text-white" />,
  },
  {
    id: 4,
    title: 'Get Connected',
    description: 'Schedule installation and enjoy your new high-speed fiber internet connection.',
    icon: <Zap className="h-6 w-6 text-white" />,
  },
];

export function HowItWorks() {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white" id="how-it-works">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <h2 className="text-5xl font-extrabold text-gray-900 tracking-tight">
            How FiberConnect Works
          </h2>
          <p className="mt-5 text-xl text-gray-600 leading-relaxed">
            Get connected to high-speed fiber internet in just a few simple steps.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {steps.map((step) => (
            <div
              key={step.id}
              className="relative bg-white rounded-2xl p-10 shadow-lg flex flex-col items-center text-center
                         transition-transform duration-300 ease-in-out hover:-translate-y-3 hover:shadow-2xl"
            >
              <div className="flex items-center justify-center rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 shadow-lg w-14 h-14 mb-6">
                {step.icon}
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">{step.title}</h3>
              <p className="text-gray-600 text-base leading-relaxed">{step.description}</p>
              <div className="absolute top-6 left-6 text-blue-500 font-bold text-3xl select-none opacity-10 pointer-events-none">
                {step.id}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-24 bg-white rounded-3xl shadow-2xl p-12 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="max-w-2xl">
            <h3 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
              Ready to find your perfect fiber internet plan?
            </h3>
            <p className="text-gray-700 mb-8 text-lg leading-relaxed">
              Start by checking which providers are available in your area. Our service is completely free to use.
            </p>
            {/*<button
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700
                         transition text-white px-8 py-4 rounded-full font-semibold shadow-lg focus:outline-none
                         focus:ring-4 focus:ring-blue-400"
            >
              Check Availability
            </button>*/}
          </div>
          <div className="w-full md:w-1/3 hidden md:block">
            <img
              src="https://images.unsplash.com/photo-1563770660941-20978e870e26?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
              alt="Technician installing fiber"
              className="rounded-2xl shadow-xl object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
