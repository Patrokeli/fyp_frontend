import React, { useState } from 'react';
import { Wifi, CheckCircle, XCircle } from 'lucide-react';
import { useSearch } from '../contexts/SearchContext';
import { useAuth } from '../contexts/AuthContext';
import { RegisterForm } from './auth/RegisterForm';

type ProviderAction = {
  name: string;
  url: string;
};

type Provider = {
  id: string;
  name: string;
  speeds: string[];
  prices: string[];
  installation: string;
  contract: string;
  coverage: string;
  rating: number;
  actions: ProviderAction[];
};

export function ProviderComparison({ onRegisterClick }: { onRegisterClick: () => void }) {
  const [selectedSpeed, setSelectedSpeed] = useState('all');
  const { searchResults } = useSearch();
  const { user } = useAuth();
  const [showRegisterPrompt, setShowRegisterPrompt] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [showAllProviders, setShowAllProviders] = useState(false);

  const handleActionClick = (url: string) => {
    if (!user) {
      setShowRegisterPrompt(true);
      return;
    }
    window.open(url, '_blank');
  };

  const providers: Provider[] = [
    {
      id: '1',
      name: 'Zuku',
      speeds: ['10 Mbps','20 Mbps', '40 Mbps', '100 Mbps'],
      prices: ['79,000 TZS','129,000 TZS', '159,000 TZS', '249,000 TZS'],
      installation: 'Free',
      contract: '12 months',
      coverage: 'Dar es Salaam, Arusha, Mwanza',
      rating: 4.2,
      actions: [
        { name: 'Installation Request', url: 'https://zuku.co.tz/request-installation' },
        { name: 'Support', url: 'https://zuku.co.tz/support' },
        { name: 'Coverage Check', url: 'https://zuku.co.tz/coverage' },
      ],
    },
    {
      id: '2',
      name: 'TTCL',
      speeds: ['10 Mbps', '40 Mbps', '1000 Mbps'],
      prices: ['55,000 TZS', '100,000 TZS', '200,000 TZS'],
      installation: 'Free',
      contract: '6 months',
      coverage: 'Nationwide',
      rating: 3.8,
      actions: [
        { name: 'Installation Request', url: 'https://ttcl.co.tz/request-installation' },
        { name: 'Support', url: 'https://ttcl.co.tz/support' },
        { name: 'Coverage Check', url: 'https://ttcl.co.tz/coverage' },
      ],
    },
    {
      id: '3',
      name: 'SimbaNet',
      speeds: ['20 Mbps', '50 Mbps', '200 Mbps'],
      prices: ['35,000 TZS', '60,000 TZS', '120,000 TZS'],
      installation: 'Free',
      contract: '12 months',
      coverage: 'Dar es Salaam, Arusha, Moshi',
      rating: 4.5,
      actions: [
        { name: 'Installation Request', url: 'https://simbanet.co.tz/request-installation' },
        { name: 'Support', url: 'https://simbanet.co.tz/support' },
        { name: 'Coverage Check', url: 'https://simbanet.co.tz/coverage' },
      ],
    },
    {
      id: '4',
      name: 'YAS Fiber',
      speeds: ['15 Mbps', '40 Mbps', '100 Mbps'],
      prices: ['32,000 TZS', '55,000 TZS', '85,000 TZS'],
      installation: 'Free',
      contract: 'No contract',
      coverage: 'Dar es Salaam, Zanzibar',
      rating: 4.0,
      actions: [
        { name: 'Installation Request', url: 'https://yasfiber.co.tz/request-installation' },
        { name: 'Support', url: 'https://yasfiber.co.tz/support' },
        { name: 'Coverage Check', url: 'https://yasfiber.co.tz/coverage' },
      ],
    },
    {
      id: '5',
      name: 'GOfiber',
      speeds: ['20 Mbps', '40 Mbps', '100 Mbps'],
      prices: ['75,000 TZS', '125,000 TZS', '249,000 TZS'],
      installation: 'Charge applies',
      contract: 'No contract',
      coverage: 'Dar es Salaam, Arusha, Mwanza',
      rating: 4.8,
      actions: [
        { name: 'Installation Request', url: 'https://gofiber.co.tz/request-installation' },
        { name: 'Support', url: 'https://gofiber.co.tz/support' },
        { name: 'Coverage Check', url: 'https://gofiber.co.tz/coverage' },
      ],
    },
    {
      id: '6',
      name: 'Liquid Home',
      speeds: ['20 Mbps', '50 Mbps', '80 Mbps','100 Mbps'],
      prices: ['60,000 TZS', '85,000 TZS', '125,000 TZS','200,000 TZS'],
      installation: 'Free',
      contract: '12 months',
      coverage: 'Dar es Salaam, Dodoma, Mwanza',
      rating: 4.3,
      actions: [
        { name: 'Installation Request', url: 'https://liquidhome.co.tz/request-installation' },
        { name: 'Support', url: 'https://liquidhome.co.tz/support' },
        { name: 'Coverage Check', url: 'https://liquidhome.co.tz/coverage' },
      ],
    },
    {
      id: '7',
      name: 'BLINK',
      speeds: ['10 Mbps', '20 Mbps', '50 Mbps'],
      prices: ['45,000 TZS', '65,000 TZS', '100,000 TZS'],
      installation: 'Free',
      contract: '6 months',
      coverage: 'Dar es Salaam, Arusha',
      rating: 4.1,
      actions: [
        { name: 'Installation Request', url: 'https://blink.co.tz/request-installation' },
        { name: 'Support', url: 'https://blink.co.tz/support' },
        { name: 'Coverage Check', url: 'https://blink.co.tz/coverage' },
      ],
    },
    {
      id: '8',
      name: 'Savannah Fiber',
      speeds: ['20 Mbps', '40 Mbps', '100 Mbps','200 Mbps'],
      prices: ['49,000 TZS', '59,000 TZS', '99,000 TZS','149,000 TZS'],
      installation: 'Free',
      contract: 'No contract',
      coverage: 'Dar es Salaam, Zanzibar',
      rating: 4.4,
      actions: [
        { name: 'Installation Request', url: 'https://savannafibre.co.tz/request-installation' },
        { name: 'Support', url: 'https://savannafibre.co.tz/support' },
        { name: 'Coverage Check', url: 'https://savannafibre.co.tz/coverage' },
      ],
    },
    {
      id: '9',
      name: 'Konnect',
      speeds: ['10 Mbps', '25 Mbps', '50 Mbps'],
      prices: ['70,000 TZS', '100,000 TZS', '150,000 TZS'],
      installation: 'Free',
      contract: '12 months',
      coverage: 'Nationwide (Satellite)',
      rating: 3.5,
      actions: [
        { name: 'Installation Request', url: 'https://africa.konnect.com/request-installation' },
        { name: 'Support', url: 'https://africa.konnect.com/support' },
        { name: 'Coverage Check', url: 'https://africa.konnect.com/coverage' },
      ],
    },
  ];

  // Function to parse speed value from string (e.g., "10 Mbps" -> 10)
  const parseSpeed = (speed: string): number => {
    return parseInt(speed.replace(' Mbps', ''), 10);
  };

  // Filter providers based on selected speed range
  const filteredProviders = providers
    .filter((provider) => {
      if (selectedSpeed === 'all') return true;
      const speeds = provider.speeds.map(parseSpeed);
      if (selectedSpeed === 'basic') {
        return speeds.some((speed) => speed >= 5 && speed <= 15);
      } else if (selectedSpeed === 'standard') {
        return speeds.some((speed) => speed >= 20 && speed <= 50);
      } else if (selectedSpeed === 'premium') {
        return speeds.some((speed) => speed >= 100);
      }
      return true;
    })
    .filter((provider) => (searchResults ? searchResults.providers.includes(provider.name) : true));

  const handleRegisterClick = () => {
    setShowRegisterForm(true);
  };

  return (
    <section className="py-16 bg-white" id="providers">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Compare Fiber Providers</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Find the perfect fiber internet plan for your home or business in Tanzania.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {[
              { label: 'All Speeds', value: 'all' },
              { label: 'Basic (5-15 Mbps)', value: 'basic' },
              { label: 'Standard (20-50 Mbps)', value: 'standard' },
              { label: 'Premium (100+ Mbps)', value: 'premium' },
            ].map((button) => (
              <button
                key={button.value}
                onClick={() => setSelectedSpeed(button.value)}
                className={`px-6 py-3 rounded-lg font-medium text-sm transition-all duration-200 ease-in-out
                  ${selectedSpeed === button.value
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-sm'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
                aria-label={`Filter by ${button.label}`}
              >
                {button.label}
              </button>
            ))}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Provider
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Speed
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price/Month
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Installation
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contract
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Coverage
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rating
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProviders.map((provider, index) => {
                // Find the index of the speed that matches the selected range
                const speedIndex = provider.speeds.findIndex((speed) => {
                  const speedValue = parseSpeed(speed);
                  if (selectedSpeed === 'basic') return speedValue >= 5 && speedValue <= 15;
                  if (selectedSpeed === 'standard') return speedValue >= 20 && speedValue <= 50;
                  if (selectedSpeed === 'premium') return speedValue >= 100;
                  return true;
                });
                const displaySpeed = speedIndex !== -1 ? provider.speeds[speedIndex] : provider.speeds[0];
                const displayPrice = speedIndex !== -1 ? provider.prices[speedIndex] : provider.prices[0];

                return (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <Wifi className="h-10 w-10 text-blue-500" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{provider.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">Up to {displaySpeed}</div>
                      <div className="text-sm text-gray-500">Multiple plans available</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">From {displayPrice}</div>
                      <div className="text-sm text-gray-500">Monthly payment</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{provider.installation}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{provider.contract}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{provider.coverage}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="text-sm font-medium text-gray-900">{provider.rating}/5</div>
                        <div className="ml-1 flex">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              xmlns="http://www.w3.org/2000/svg"
                              className={`h-4 w-4 ${i < Math.floor(provider.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex flex-col space-y-2">
                        {provider.actions.map((action, idx) => (
                          <a
                            key={idx}
                            href={action.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => {
                              e.preventDefault();
                              handleActionClick(action.url);
                            }}
                            className="inline-flex items-center justify-center text-blue-600 hover:text-blue-900 bg-blue-100 hover:bg-blue-200 px-4 py-2 rounded-md text-sm transition-colors duration-200"
                          >
                            {action.name}
                          </a>
                        ))}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="mt-8 text-center">
          <button
            onClick={() => setShowAllProviders(true)}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-md font-medium transition-colors duration-200"
          >
            See All Providers
          </button>
        </div>
      </div>

      {showAllProviders && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">All Internet Providers in Tanzania</h3>
              <button
                onClick={() => setShowAllProviders(false)}
                className="text-gray-600 hover:text-gray-900"
                aria-label="Close modal"
              >
                <XCircle className="h-6 w-6" />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {providers.map((provider) => (
                <div key={provider.id} className="border rounded-lg p-4 shadow-sm">
                  <div className="flex items-center mb-2">
                    <Wifi className="h-8 w-8 text-blue-500 mr-2" />
                    <h4 className="text-lg font-semibold">{provider.name}</h4>
                  </div>
                  <p className="text-sm text-gray-600">
                    <strong>Speed:</strong> Up to {provider.speeds[provider.speeds.length - 1]}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Price:</strong> From {provider.prices[0]}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Installation:</strong> {provider.installation}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Contract:</strong> {provider.contract}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Coverage:</strong> {provider.coverage}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Rating:</strong> {provider.rating}/5
                  </p>
                  <div className="mt-2 flex flex-col space-y-2">
                    {provider.actions.map((action, idx) => (
                      <a
                        key={idx}
                        href={action.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => {
                          e.preventDefault();
                          handleActionClick(action.url);
                        }}
                        className="text-blue-600 hover:text-blue-900 text-sm"
                      >
                        {action.name}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowAllProviders(false)}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md transition-colors duration-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {showRegisterPrompt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md mx-4">
            <h3 className="text-xl font-bold mb-4">Registration Required</h3>
            <p className="text-gray-600 mb-6">
              Please register to access provider services and installation requests.
            </p>
            <div className="flex justify-end space-x-4">
              <button onClick={() => setShowRegisterPrompt(false)} className="text-gray-600 hover:text-gray-900">
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowRegisterPrompt(false);
                  handleRegisterClick();
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-200"
              >
                Register Now
              </button>
            </div>
          </div>
        </div>
      )}

      {showRegisterForm && (
        <RegisterForm
          onClose={() => setShowRegisterForm(false)}
          onSuccess={() => {
            setShowRegisterForm(false);
          }}
          onSwitchToLogin={() => {
            setShowRegisterForm(false);
            // Add logic to switch to login form if needed
          }}
        />
      )}
    </section>
  );
}