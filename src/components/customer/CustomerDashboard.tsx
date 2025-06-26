import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { useAuth } from '../../contexts/AuthContext';
import { useSearch } from '../../contexts/SearchContext';
import { Search, Menu } from 'lucide-react';

export function CustomerDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuth();
  const {
    searchLocation,
    setSearchLocation,
    availableLocations,
    searchResults,
    performSearch
  } = useSearch();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(searchLocation);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64 border-r border-gray-200 bg-white">
          <Sidebar isOpen={true} />
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="fixed inset-0 bg-gray-600 bg-opacity-75"
            onClick={() => setSidebarOpen(false)}
          ></div>
          <div className="relative flex flex-col w-80 max-w-xs h-full bg-white">
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Header */}
        <header className="md:hidden bg-white shadow-sm z-30">
          <div className="flex items-center justify-between px-4 py-3">
            <h1 className="text-lg font-medium">Dashboard</h1>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-gray-500 hover:text-gray-600"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-100">
          <div className="max-w-7xl mx-auto">
            <div className="py-6 px-4 border-b border-gray-200">
              {user && (
                <h1 className="text-3xl font-semibold text-gray-800">
                  Welcome, {user.name}!
                </h1>
              )}
            </div>

            <div className="p-4">
              <form onSubmit={handleSearch} className="mb-6">
                <div className="flex max-w-md">
                  <input
                    type="text"
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    placeholder="Search for a region (e.g. Dar es Salaam)"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    list="regions"
                  />
                  <datalist id="regions">
                    {availableLocations.map((location) => (
                      <option key={location.id} value={location.name} />
                    ))}
                  </datalist>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <Search className="h-5 w-5" />
                  </button>
                </div>
              </form>

              {searchResults ? (
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h2 className="text-xl font-semibold mb-4">{searchResults.name}</h2>
                  <h3 className="text-lg font-medium mb-2">Available Providers:</h3>
                  <ul className="space-y-2">
                    {searchResults.providers.map((provider, index) => (
                      <li key={index} className="flex items-center">
                        <span className="h-2 w-2 rounded-full bg-blue-500 mr-2"></span>
                        <span>{provider}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <p className="text-gray-600">
                    Search for a region to see available providers
                  </p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
