import React, { useState } from 'react';
import { Wifi, CheckCircle, XCircle } from 'lucide-react';
import { useSearch } from '../contexts/SearchContext';
import { useAuth } from '../contexts/AuthContext';
import { RegisterForm } from './auth/RegisterForm'; // Corrected import path

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
      speeds: ['10 Mbps', '30 Mbps', '100 Mbps'],
      prices: ['30,000 TZS', '45,000 TZS', '75,000 TZS'],
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
      speeds: ['5 Mbps', '20 Mbps', '50 Mbps'],
      prices: ['25,000 TZS', '40,000 TZS', '65,000 TZS'],
      installation: '50,000 TZS',
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
      installation: '30,000 TZS',
      contract: 'No contract',
      coverage: 'Dar es Salaam, Zanzibar',
      rating: 4.0,
      actions: [
        { name: 'Installation Request', url: 'https://yasfiber.co.tz/request-installation' },
        { name: 'Support', url: 'https://yasfiber.co.tz/support' },
        { name: 'Coverage Check', url: 'https://yasfiber.co.tz/coverage' },
      ],
    },
  ];

  const filteredProviders = searchResults ? providers.filter(provider => searchResults.providers.includes(provider.name)) : providers;

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
          <div className="mt-8 flex justify-center space-x-4">
            <button
              onClick={() => setSelectedSpeed('all')}
              className={`px-4 py-2 rounded-md ${selectedSpeed === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              All Speeds
            </button>
            <button
              onClick={() => setSelectedSpeed('basic')}
              className={`px-4 py-2 rounded-md ${selectedSpeed === 'basic' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              Basic (5-15 Mbps)
            </button>
            <button
              onClick={() => setSelectedSpeed('standard')}
              className={`px-4 py-2 rounded-md ${selectedSpeed === 'standard' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              Standard (20-50 Mbps)
            </button>
            <button
              onClick={() => setSelectedSpeed('premium')}
              className={`px-4 py-2 rounded-md ${selectedSpeed === 'premium' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              Premium (100+ Mbps)
            </button>
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
              {filteredProviders.map((provider, index) => (
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
                    <div className="text-sm text-gray-900">Up to {provider.speeds[2]}</div>
                    <div className="text-sm text-gray-500">Multiple plans available</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">From {provider.prices[0]}</div>
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
                          onClick={e => {
                            e.preventDefault();
                            handleActionClick(action.url);
                          }}
                          className="inline-flex items-center justify-center text-blue-600 hover:text-blue-900 bg-blue-100 hover:bg-blue-200 px-4 py-2 rounded-md text-sm"
                        >
                          {action.name}
                        </a>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-8 text-center">
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-md font-medium">
            See All Providers
          </button>
        </div>
      </div>

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
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
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