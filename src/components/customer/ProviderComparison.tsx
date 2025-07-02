import React, { useState } from 'react';
import { Filter, Wifi } from 'lucide-react';

type Provider = {
  id: string;
  name: string;
  speeds: string[];
  prices: string[];
  installation: string;
  contract: string;
  coverage: string;
  rating: number;
  actionUrl: string;
};

const providers: Provider[] = [
  {
    id: '1',
    name: 'TTCL Fiber',
    speeds: ['Up to 500Mbps'],
    prices: ['45,000 TZS/mo'],
    installation: 'Free installation for new customers',
    contract: '12-month contract',
    coverage: '15 regions',
    rating: 4.2,
    actionUrl: '#',
  },
  {
    id: '2',
    name: 'Liquid',
    speeds: ['Up to 1Gbps'],
    prices: ['65,000 TZS/mo'],
    installation: 'Standard setup within 3 days',
    contract: 'No contract required',
    coverage: '10 regions',
    rating: 4.6,
    actionUrl: '#',
  },
  {
    id: '3',
    name: 'Zuku',
    speeds: ['Up to 250Mbps'],
    prices: ['40,000 TZS/mo'],
    installation: 'Free for select locations',
    contract: '6-month renewable',
    coverage: '8 regions',
    rating: 3.8,
    actionUrl: '#',
  },
  {
    id: '4',
    name: 'NASO',
    speeds: ['Up to 200Mbps'],
    prices: ['35,000 TZS/mo'],
    installation: 'Standard installation',
    contract: '6-month contract',
    coverage: '6 regions',
    rating: 4.1,
    actionUrl: '#',
  },
  {
    id: '5',
    name: 'Yas Fiber',
    speeds: ['Up to 300Mbps'],
    prices: ['42,000 TZS/mo'],
    installation: 'Free installation',
    contract: '12-month contract',
    coverage: '5 regions',
    rating: 4.3,
    actionUrl: '#',
  },
  {
    id: '6',
    name: 'Simba Net',
    speeds: ['Up to 150Mbps'],
    prices: ['30,000 TZS/mo'],
    installation: 'Standard fee applies',
    contract: 'No contract',
    coverage: '4 regions',
    rating: 3.9,
    actionUrl: '#',
  },
  {
    id: '7',
    name: 'Savannah Fiber',
    speeds: ['Up to 100Mbps'],
    prices: ['25,000 TZS/mo'],
    installation: 'Paid installation',
    contract: 'Monthly plan',
    coverage: '3 regions',
    rating: 3.7,
    actionUrl: '#',
  },
];

export function ProviderComparison() {
  const [speedFilter, setSpeedFilter] = useState('all');
  const [priceFilter, setPriceFilter] = useState('all');

  const parseSpeed = (speedStr: string) =>
    parseInt(speedStr.replace(/[^\d]/g, '') || '0', 10);
  const parsePrice = (priceStr: string) =>
    parseInt(priceStr.replace(/[^\d]/g, '') || '0', 10);

  const filteredProviders = providers.filter((provider) => {
    const maxSpeed = Math.max(...provider.speeds.map(parseSpeed));
    const minPrice = Math.min(...provider.prices.map(parsePrice));
    const matchesSpeed = speedFilter === 'all' || maxSpeed >= parseInt(speedFilter);
    const matchesPrice = priceFilter === 'all' || minPrice <= parseInt(priceFilter);
    return matchesSpeed && matchesPrice;
  });

  const handleResetFilters = () => {
    setSpeedFilter('all');
    setPriceFilter('all');
  };

  return (
    <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h2 className="text-xl font-bold text-gray-700">Compare Fiber Providers</h2>
        <div className="flex flex-wrap gap-2 mt-2 md:mt-0">
          <div className="flex items-center">
            <label htmlFor="speedFilter" className="text-sm mr-2">Speed:</label>
            <select
              id="speedFilter"
              className="text-sm border-gray-300 rounded px-2 py-1"
              value={speedFilter}
              onChange={(e) => setSpeedFilter(e.target.value)}
            >
              <option value="all">All</option>
              <option value="100">100+ Mbps</option>
              <option value="200">200+ Mbps</option>
              <option value="300">300+ Mbps</option>
              <option value="500">500+ Mbps</option>
              <option value="1000">1 Gbps+</option>
            </select>
          </div>
          <div className="flex items-center">
            <label htmlFor="priceFilter" className="text-sm mr-2">Price:</label>
            <select
              id="priceFilter"
              className="text-sm border-gray-300 rounded px-2 py-1"
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
            >
              <option value="all">All</option>
              <option value="30000">Under 30,000 TZS</option>
              <option value="40000">Under 40,000 TZS</option>
              <option value="50000">Under 50,000 TZS</option>
              <option value="60000">Under 60,000 TZS</option>
            </select>
          </div>
          <button
            className="flex items-center text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded"
            onClick={handleResetFilters}
          >
            <Filter size={14} className="mr-1" />
            Reset
          </button>
        </div>
      </div>

      {filteredProviders.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProviders.map((provider) => (
            <div
              key={provider.id}
              className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-2 mb-3">
                <Wifi className="h-5 w-5 text-blue-500" />
                <h3 className="text-lg font-semibold text-gray-800">{provider.name}</h3>
              </div>
              <div className="space-y-1 text-sm text-gray-600">
                <p><span className="font-medium">Speed:</span> {provider.speeds[0]}</p>
                <p><span className="font-medium">Price:</span> {provider.prices[0]}</p>
                <p><span className="font-medium">Installation:</span> {provider.installation}</p>
                <p><span className="font-medium">Contract:</span> {provider.contract}</p>
                <p><span className="font-medium">Coverage:</span> {provider.coverage}</p>
              </div>
              <div className="mt-3 flex items-center">
                <span className="text-sm text-yellow-500 font-medium mr-2">{provider.rating}/5</span>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(provider.rating)
                          ? 'text-yellow-400'
                          : 'text-gray-300'
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921...z" />
                    </svg>
                  ))}
                </div>
              </div>
              <a
                href={provider.actionUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 block text-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded text-sm transition"
              >
                Request Installation
              </a>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 py-6">
          No providers match your filters.
        </div>
      )}
    </div>
  );
}
