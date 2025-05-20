import React from 'react';
import { Search, Zap, CheckCircle } from 'lucide-react';
import { useSearch } from '../contexts/SearchContext';
export function Hero() {
  const {
    searchLocation,
    setSearchLocation,
    performSearch
  } = useSearch();
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(searchLocation);
  };
  return <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
              Find the Best Fiber Internet Provider in Tanzania
            </h1>
            <p className="text-lg md:text-xl mb-8 text-blue-100">
              Compare plans, prices, and coverage from Zuku, TTCL, SimbaNet, YAS
              Fiber, Savannah, and more in one place.
            </p>
            <form onSubmit={handleSearch} className="bg-white rounded-lg p-2 flex items-center shadow-lg">
              <input type="text" placeholder="Enter your location..." value={searchLocation} onChange={e => setSearchLocation(e.target.value)} className="flex-grow px-4 py-2 text-gray-800 focus:outline-none" list="locations" />
              <datalist id="locations">
                <option value="Dar es Salaam" />
                <option value="Arusha" />
                <option value="Mwanza" />
                <option value="Zanzibar" />
              </datalist>
              <button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md flex items-center">
                <Search className="h-5 w-5 mr-2" />
                <span>Search</span>
              </button>
            </form>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-orange-400 mr-2" />
                <span>Compare 6+ providers</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-orange-400 mr-2" />
                <span>Transparent pricing</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-orange-400 mr-2" />
                <span>Easy subscription</span>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <img src="https://images.unsplash.com/photo-1581092921461-eab10380ed37?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Family enjoying fast internet" className="rounded-lg shadow-xl" />
          </div>
        </div>
      </div>
    </div>;
}