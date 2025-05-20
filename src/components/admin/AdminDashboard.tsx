import React, { useState } from 'react';
import { ProviderManagement } from './ProviderManagement';
import { CustomerManagement } from './CustomerManagement';
import { LayoutGrid, Users, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'providers' | 'customers'>('providers');
  const {
    logout
  } = useAuth();
  return <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-blue-600 font-bold text-xl">
                  Admin Dashboard
                </span>
              </div>
            </div>
            <button onClick={logout} className="ml-4 flex items-center text-gray-600 hover:text-gray-900">
              <LogOut className="h-5 w-5 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="flex space-x-4 mb-6">
          <button onClick={() => setActiveTab('providers')} className={`flex items-center px-4 py-2 rounded-md ${activeTab === 'providers' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}>
            <LayoutGrid className="h-5 w-5 mr-2" />
            Providers
          </button>
          <button onClick={() => setActiveTab('customers')} className={`flex items-center px-4 py-2 rounded-md ${activeTab === 'customers' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}>
            <Users className="h-5 w-5 mr-2" />
            Customers
          </button>
        </div>
        {activeTab === 'providers' ? <ProviderManagement /> : <CustomerManagement />}
      </div>
    </div>;
}