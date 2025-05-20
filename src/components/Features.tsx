import React from 'react';
import { Search, BarChart2, Clock, MapPin, CreditCard, Headphones } from 'lucide-react';
export function Features() {
  return <section className="py-16 bg-gray-50" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Why Choose FiberConnect Tanzania
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We simplify the process of finding and subscribing to the best fiber
            internet service for your needs.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="bg-blue-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <Search className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Compare Providers
            </h3>
            <p className="text-gray-600">
              Easily compare plans, speeds, and prices from multiple fiber
              providers in Tanzania in one place.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="bg-blue-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <BarChart2 className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Transparent Pricing
            </h3>
            <p className="text-gray-600">
              See all fees and charges upfront with no hidden costs. Know
              exactly what you'll be paying.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="bg-blue-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <MapPin className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Coverage Checker
            </h3>
            <p className="text-gray-600">
              Find out which providers service your area before spending time
              researching plans.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="bg-blue-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <Clock className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Quick Setup
            </h3>
            <p className="text-gray-600">
              Streamlined application process gets you connected faster without
              the typical paperwork hassle.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="bg-blue-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <CreditCard className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Exclusive Deals
            </h3>
            <p className="text-gray-600">
              Access special promotions and packages not advertised elsewhere,
              negotiated for our users.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="bg-blue-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <Headphones className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Expert Support
            </h3>
            <p className="text-gray-600">
              Get unbiased advice from our team to help you choose the right
              plan for your needs.
            </p>
          </div>
        </div>
      </div>
    </section>;
}