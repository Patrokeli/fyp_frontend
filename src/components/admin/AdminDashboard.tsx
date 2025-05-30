import React, { useState } from 'react';
import { ProviderManagement } from './ProviderManagement';
import { UserManagement } from './UserManagement';
import { LayoutGrid, Users, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'providers' | 'users'>('providers');
  const { logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sticky Header */}
      <header className="bg-white shadow sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div>
              <span className="text-blue-600 font-bold text-xl">Admin Dashboard</span>
            </div>
            <button
              onClick={logout}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200"
              aria-label="Logout"
            >
              <LogOut className="h-5 w-5 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Tabs */}
        <nav className="flex space-x-4 mb-6 flex-wrap">
          <button
            onClick={() => setActiveTab('providers')}
            className={`flex items-center px-4 py-2 rounded-md font-medium transition-colors duration-200 ${
              activeTab === 'providers'
                ? 'bg-blue-600 text-white shadow'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
            aria-current={activeTab === 'providers' ? 'page' : undefined}
          >
            <LayoutGrid className="h-5 w-5 mr-1.5" />
            Providers
          </button>

          <button
            onClick={() => setActiveTab('users')}
            className={`flex items-center px-4 py-2 rounded-md font-medium transition-colors duration-200 ${
              activeTab === 'users'
                ? 'bg-blue-600 text-white shadow'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
            aria-current={activeTab === 'users' ? 'page' : undefined}
          >
            <Users className="h-5 w-5 mr-1.5" />
            Users
          </button>
        </nav>

        {/* Tab Content Card */}
        <section
          className="bg-white rounded-lg shadow-md p-6 transition-all duration-300 ease-in-out"
          aria-live="polite"
        >
          {activeTab === 'providers' ? <ProviderManagement /> : <UserManagement />}
        </section>
      </main>
    </div>
  );
}
