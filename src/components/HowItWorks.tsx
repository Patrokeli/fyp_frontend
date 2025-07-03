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
    description: 'Fill out a simple form and we\'ll handle the provider communication for you.',
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
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white" id="how-it-works">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            How FiberConnect Works
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Get connected to high-speed fiber internet in just a few simple steps.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div key={step.id} className="relative bg-white shadow-xl rounded-xl p-8 transition transform hover:scale-105 hover:shadow-2xl">
              <div className="absolute -top-5 -left-5 bg-blue-600 text-white rounded-full h-10 w-10 flex items-center justify-center text-sm font-bold shadow-md">
                {step.id}
              </div>
              <div className="bg-blue-600 h-12 w-12 rounded-full flex items-center justify-center mx-auto mb-4">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{step.title}</h3>
              <p className="text-gray-600 text-sm">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-20 bg-white rounded-xl shadow-lg p-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Ready to find your perfect fiber internet plan?
            </h3>
            <p className="text-gray-600 mb-6">
              Start by checking which providers are available in your area. Our service is completely free to use.
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-3 rounded-md font-semibold shadow-md">
              Check Availability
            </button>
          </div>
          <div className="w-full md:w-1/3 hidden md:block">
            <img
              src="https://images.unsplash.com/photo-1563770660941-20978e870e26?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
              alt="Technician installing fiber"
              className="rounded-lg shadow-md"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
