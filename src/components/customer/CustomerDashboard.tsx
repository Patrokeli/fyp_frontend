// Only the imports and state section need update at the top:
import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { useAuth } from '../../contexts/AuthContext';
import { useSearch } from '../../contexts/SearchContext';
import { Search, Menu } from 'lucide-react';
// src/components/customer/CustomerDashboard.tsx
import { SearchProviders } from './SearchProviders'; 
import { ProviderComparison } from './ProviderComparison';



export function CustomerDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState<'dashboard' | 'search'| 'compare'>('dashboard');

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
          <Sidebar
            isOpen={true}
            currentTab={currentTab}
            changeTab={setCurrentTab}
          />
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
            <Sidebar
              isOpen={sidebarOpen}
              onClose={() => setSidebarOpen(false)}
              currentTab={currentTab}
              changeTab={setCurrentTab}
            />
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
            {/* Conditional Tab Content */}
            {currentTab === 'dashboard' && (
              <div className="py-6 px-4 border-b border-gray-200">
                {user && (
                  <h1 className="text-3xl font-semibold text-gray-800">
                    Welcome, {user.name}!
                  </h1>
                )}
              </div>
            )}

           {currentTab === 'search' && <SearchProviders />}
           {currentTab === 'compare' && <ProviderComparison />}


          </div>
        </main>
      </div>
    </div>
  );
}
