import React from 'react';
import { Search, FileText, PhoneCall, Zap } from 'lucide-react';
export function HowItWorks() {
  return <section className="py-16 bg-gray-50" id="how-it-works">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            How FiberConnect Works
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Get connected to high-speed fiber internet in just a few simple
            steps.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="bg-blue-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-8 w-8 text-blue-600" />
            </div>
            <div className="absolute -mt-12 ml-12 bg-blue-600 rounded-full h-8 w-8 flex items-center justify-center text-white font-bold">
              1
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Search Your Area
            </h3>
            <p className="text-gray-600">
              Enter your location to find all available fiber providers in your
              area.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="bg-blue-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
            <div className="absolute -mt-12 ml-12 bg-blue-600 rounded-full h-8 w-8 flex items-center justify-center text-white font-bold">
              2
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Compare Plans
            </h3>
            <p className="text-gray-600">
              Compare speeds, prices, and features to find the plan that fits
              your needs.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="bg-blue-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <PhoneCall className="h-8 w-8 text-blue-600" />
            </div>
            <div className="absolute -mt-12 ml-12 bg-blue-600 rounded-full h-8 w-8 flex items-center justify-center text-white font-bold">
              3
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Request Service
            </h3>
            <p className="text-gray-600">
              Fill out a simple form and we'll handle the provider communication
              for you.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="bg-blue-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="h-8 w-8 text-blue-600" />
            </div>
            <div className="absolute -mt-12 ml-12 bg-blue-600 rounded-full h-8 w-8 flex items-center justify-center text-white font-bold">
              4
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Get Connected
            </h3>
            <p className="text-gray-600">
              Schedule installation and enjoy your new high-speed fiber internet
              connection.
            </p>
          </div>
        </div>
        <div className="mt-12 bg-white p-8 rounded-lg shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="col-span-2">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Ready to find your perfect fiber internet plan?
              </h3>
              <p className="text-gray-600 mb-6">
                Start by checking which providers are available in your area.
                Our service is completely free to use.
              </p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium">
                Check Availability
              </button>
            </div>
            <div className="hidden md:block">
              <img src="https://images.unsplash.com/photo-1563770660941-20978e870e26?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" alt="Technician installing fiber" className="rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </section>;
}