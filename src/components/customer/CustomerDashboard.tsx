import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { useAuth } from '../../contexts/AuthContext';
import { useSearch } from '../../contexts/SearchContext';
import { Search, Menu, Bell, HelpCircle, ChevronRight, Activity, AlertCircle, Star, LifeBuoy, GitCompare } from 'lucide-react';
import { SearchProviders } from './SearchProviders'; 
import { ProviderComparison } from './ProviderComparison';
import { RateService } from './RateService';
import { SupportRequest } from './SupportRequest';

export function CustomerDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState<'dashboard' | 'search' | 'compare' | 'rate' | 'support'>('dashboard');

  const { user } = useAuth();
  const {
    searchLocation,
    setSearchLocation,
    performSearch
  } = useSearch();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(searchLocation);
  };

  // Mock data for dashboard
  const dashboardStats = [
    { title: "Active Services", value: 3, change: "+2 from last week", icon: <Activity className="h-5 w-5" />, color: "blue" },
    { title: "Pending Requests", value: 1, change: "1 awaiting approval", icon: <AlertCircle className="h-5 w-5" />, color: "orange" },
    { title: "Support Tickets", value: 2, change: "1 new today", icon: <HelpCircle className="h-5 w-5" />, color: "purple" },
    { title: "Average Rating", value: 4.5, change: "+0.2 from last month", icon: <Star className="h-5 w-5" />, color: "green" }
  ];

  const quickActions = [
    { title: "Compare Providers", icon: <GitCompare className="h-5 w-5" />, tab: "compare" },
    { title: "Rate Service", icon: <Star className="h-5 w-5" />, tab: "rate" },
    { title: "Need Support", icon: <LifeBuoy className="h-5 w-5" />, tab: "support" }
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:flex-shrink-0">
        <Sidebar
          isOpen={true}
          currentTab={currentTab}
          changeTab={setCurrentTab}
        />
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="relative flex flex-col w-80 max-w-xs h-full">
            <Sidebar
              isOpen={sidebarOpen}
              onClose={() => setSidebarOpen(false)}
              currentTab={currentTab}
              changeTab={(tab) => {
                setCurrentTab(tab);
                setSidebarOpen(false);
              }}
            />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation Bar */}
        <header className="bg-white shadow-sm z-30 border-b border-gray-200">
          <div className="flex items-center justify-between px-6 py-3">
            {/* Mobile Menu Button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="text-gray-500 hover:text-gray-600 mr-4"
                aria-label="Toggle sidebar"
              >
                <Menu className="h-6 w-6" />
              </button>
              <h1 className="text-lg font-semibold text-gray-800">
                {currentTab === 'dashboard' && 'Dashboard'}
                {currentTab === 'search' && 'Search Providers'}
                {currentTab === 'compare' && 'Compare Providers'}
                {currentTab === 'rate' && 'Rate Service'}
                {currentTab === 'support' && 'Support'}
              </h1>
            </div>

            {/* Desktop Search and User Area */}
            <div className="hidden md:flex md:items-center md:space-x-6">
              <form onSubmit={handleSearch} className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                />
              </form>
              
              <button className="p-1 text-gray-500 hover:text-gray-700 rounded-full relative">
                <Bell className="h-6 w-6" />
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
              </button>
              
              {user && (
                <div className="flex items-center space-x-2">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-full h-8 w-8 flex items-center justify-center font-bold text-sm">
                    {user.name?.[0]?.toUpperCase()}
                  </div>
                  <span className="text-sm font-medium text-gray-700">{user.name}</span>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            {/* Dashboard Welcome Section */}
            {currentTab === 'dashboard' && (
              <div className="space-y-6">
                {/* Welcome Card */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  {user && (
                    <div>
                      <h1 className="text-2xl font-bold text-gray-800 mb-2">
                        Welcome back, {user.name}!
                      </h1>
                      <p className="text-gray-600">
                        Here's what's happening with your services today.
                      </p>
                    </div>
                  )}
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {dashboardStats.map((stat, index) => (
                    <div 
                      key={index} 
                      className={`bg-white rounded-xl shadow-sm p-5 border-l-4 ${stat.color === 'blue' ? 'border-blue-500' : stat.color === 'orange' ? 'border-orange-500' : stat.color === 'purple' ? 'border-purple-500' : 'border-green-500'}`}
                    >
                      <div className="flex justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                          <p className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</p>
                          <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
                        </div>
                        <div className={`h-10 w-10 rounded-full ${stat.color === 'blue' ? 'bg-blue-100 text-blue-600' : stat.color === 'orange' ? 'bg-orange-100 text-orange-600' : stat.color === 'purple' ? 'bg-purple-100 text-purple-600' : 'bg-green-100 text-green-600'} flex items-center justify-center`}>
                          {stat.icon}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {quickActions.map((action, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentTab(action.tab as any)}
                        className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center">
                          <div className="bg-blue-100 text-blue-600 p-2 rounded-lg mr-3">
                            {action.icon}
                          </div>
                          <span className="font-medium text-gray-800">{action.title}</span>
                        </div>
                        <ChevronRight className="h-5 w-5 text-gray-400" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h2>
                  <div className="space-y-4">
                    {[1, 2, 3].map((item) => (
                      <div key={item} className="flex items-start pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                        <div className="bg-blue-100 text-blue-600 p-2 rounded-lg mr-3">
                          <Activity className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-800">Service request updated</p>
                          <p className="text-sm text-gray-500">Your request for Zuku Fiber has been processed</p>
                        </div>
                        <span className="text-xs text-gray-400">2 hours ago</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Tab Content */}
            {currentTab !== 'dashboard' && (
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                {currentTab === 'search' && <SearchProviders />}
                {currentTab === 'compare' && <ProviderComparison />}
                {currentTab === 'rate' && (
                  <RateService
                    providers={[
                      { id: '1', name: 'Zuku' },
                      { id: '2', name: 'TTCL' },
                      { id: '3', name: 'SimbaNet' },
                      { id: '4', name: 'YAS Fiber' },
                    ]}
                  />
                )}
                {currentTab === 'support' && (
                  <SupportRequest
                    providers={[
                      { id: '1', name: 'Zuku' },
                      { id: '2', name: 'TTCL' },
                      { id: '3', name: 'SimbaNet' },
                      { id: '4', name: 'YAS Fiber' },
                    ]}
                  />
                )}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}