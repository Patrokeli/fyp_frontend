import React, { useState } from 'react';
import { Filter, Wifi, Globe, Wrench, Rocket, BadgeDollarSign, FileText } from 'lucide-react';

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
    speeds: ['Up to 200Mbps'],
    prices: ['55,000 TZS/mo'],
    installation: 'Free installation for new customers',
    contract: '12-month contract',
    coverage: '15 regions',
    rating: 4.2,
    actionUrl: 'https://fiber.ttcl.co.tz/application/#/home',
  },
  {
    id: '2',
    name: 'Liquid',
    speeds: ['Up to 100Mbps'],
    prices: ['60,000 TZS/mo'],
    installation: 'Free installation for new customers',
    contract: 'No contract required',
    coverage: '10 regions',
    rating: 4.6,
    actionUrl: 'https://www.liquidhome.co.tz/products-and-services/packages/fibre',
  },
  {
    id: '3',
    name: 'Zuku',
    speeds: ['Up to 100Mbps'],
    prices: ['79,000 TZS/mo'],
    installation: 'Free for select locations',
    contract: '6-month renewable',
    coverage: '8 regions',
    rating: 3.8,
    actionUrl: 'https://zuku.co.tz/fiber/',
  },
  {
    id: '4',
    name: 'NESO',
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
    speeds: ['Up to 100Mbps'],
    prices: ['55,000 TZS/mo'],
    installation: 'Free installation',
    contract: '12-month contract',
    coverage: '5 regions',
    rating: 4.3,
    actionUrl: 'https://yas.co.tz/consumer/home-plans/fiber-home/',
  },
  {
    id: '6',
    name: 'Simba Net',
    speeds: ['Up to 300Mbps'],
    prices: ['364,270 TZS/mo'],
    installation: 'Standard fee applies',
    contract: 'No contract',
    coverage: '4 regions',
    rating: 3.9,
    actionUrl: 'https://www.simbanet.net/simbaconnect',
  },
  {
    id: '7',
    name: 'Savannah Fiber',
    speeds: ['Up to 200Mbps'],
    prices: ['49,000 TZS/mo'],
    installation: 'Free installation',
    contract: 'Monthly plan',
    coverage: '3 regions',
    rating: 3.7,
    actionUrl: 'https://savannafibre.co.tz/',
  },
];

export function ProviderComparison() {
  const [speedFilter, setSpeedFilter] = useState('all');
  const [priceFilter, setPriceFilter] = useState('all');

  const parseSpeed = (s: string) => parseInt(s.replace(/[^\d]/g, '') || '0', 10);
  const parsePrice = (p: string) => parseInt(p.replace(/[^\d]/g, '') || '0', 10);

  const filtered = providers.filter((p) => {
    const speed = Math.max(...p.speeds.map(parseSpeed));
    const price = Math.min(...p.prices.map(parsePrice));
    return (
      (speedFilter === 'all' || speed >= parseInt(speedFilter)) &&
      (priceFilter === 'all' || price <= parseInt(priceFilter))
    );
  });

  return (
    <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
      {/* Filters */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h2 className="text-xl font-bold text-gray-700">Compare Fiber Providers</h2>
        <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
          <div className="flex items-center">
            <label htmlFor="speedFilter" className="text-sm mr-2">Speed:</label>
            <select
              id="speedFilter"
              className="text-sm border rounded px-2 py-1"
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
              className="text-sm border rounded px-2 py-1"
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
            onClick={() => {
              setSpeedFilter('all');
              setPriceFilter('all');
            }}
            className="flex items-center text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded"
          >
            <Filter size={14} className="mr-1" />
            Reset
          </button>
        </div>
      </div>

      {/* Cards */}
      {filtered.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p) => (
            <div
              key={p.id}
              className="bg-white border rounded-xl p-5 shadow hover:shadow-lg transition-all"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Wifi className="text-blue-600" size={20} />
                  <h3 className="text-lg font-bold text-gray-800">{p.name}</h3>
                </div>
                <span className="text-sm text-yellow-600 font-semibold">{p.rating}/5</span>
              </div>

              <ul className="text-sm text-gray-600 space-y-2 mt-4">
                <li className="flex items-start gap-2">
                  <Rocket className="text-blue-500" size={16} /> <span><strong>Speed:</strong> {p.speeds[0]}</span>
                </li>
                <li className="flex items-start gap-2">
                  <BadgeDollarSign className="text-green-600" size={16} /> <span><strong>Price:</strong> {p.prices[0]}</span>
                </li>
                <li className="flex items-start gap-2">
                  <FileText className="text-purple-500" size={16} /> <span><strong>Contract:</strong> {p.contract}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Globe className="text-indigo-500" size={16} /> <span><strong>Coverage:</strong> {p.coverage}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Wrench className="text-orange-500" size={16} /> <span><strong>Installation:</strong> {p.installation}</span>
                </li>
              </ul>

              {/* Badges */}
              <div className="mt-3 flex flex-wrap gap-2">
                {p.installation.toLowerCase().includes('free') && (
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Free Installation</span>
                )}
                {p.contract.toLowerCase().includes('no contract') && (
                  <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">No Contract</span>
                )}
              </div>

              {/* CTA */}
              <a
                href={p.actionUrl}
                className="mt-4 block text-center bg-blue-600 hover:bg-blue-700 text-white py-2 rounded text-sm font-medium transition"
                target="_blank"
                rel="noopener noreferrer"
              >
                Request Installation
              </a>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 py-8">No providers match your filters.</div>
      )}
    </div>
  );
}
