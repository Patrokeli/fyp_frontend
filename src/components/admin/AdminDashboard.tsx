import React, { useState } from 'react';
import { ProviderManagement } from './ProviderManagement';
import { UserManagement } from './UserManagement';
import { LayoutGrid, Users, LogOut, Home, Menu, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'providers' | 'users'>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for sidebar visibility on small screens
  const { logout } = useAuth();

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside
        className={`bg-white w-64 h-screen fixed top-0 left-0 shadow-lg flex flex-col z-50 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0`} // Hide sidebar on small screens, show on md and up
      >
        {/* Logo/Title */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <span className="text-blue-600 font-bold text-xl">Admin Dashboard</span>
          {/* Close button for small screens */}
          <button
            onClick={toggleSidebar}
            className="md:hidden text-gray-600 hover:text-gray-900"
            aria-label="Close Sidebar"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Sidebar Links */}
        <nav className="flex-1 mt-4">
          <button
            onClick={() => {
              setActiveTab('dashboard');
              setIsSidebarOpen(false); // Close sidebar on link click (small screens)
            }}
            className={`w-full flex items-center px-4 py-3 text-left font-medium transition-colors duration-200 ${
              activeTab === 'dashboard'
                ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600'
                : 'text-gray-600 hover:bg-gray-50 hover:text-blue-600'
            }`}
            aria-current={activeTab === 'dashboard' ? 'page' : undefined}
          >
            <Home className="h-5 w-5 mr-3" />
            Dashboard
          </button>

          <button
            onClick={() => {
              setActiveTab('providers');
              setIsSidebarOpen(false);
            }}
            className={`w-full flex items-center px-4 py-3 text-left font-medium transition-colors duration-200 ${
              activeTab === 'providers'
                ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600'
                : 'text-gray-600 hover:bg-gray-50 hover:text-blue-600'
            }`}
            aria-current={activeTab === 'providers' ? 'page' : undefined}
          >
            <LayoutGrid className="h-5 w-5 mr-3" />
            Providers
          </button>

          <button
            onClick={() => {
              setActiveTab('users');
              setIsSidebarOpen(false);
            }}
            className={`w-full flex items-center px-4 py-3 text-left font-medium transition-colors duration-200 ${
              activeTab === 'users'
                ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600'
                : 'text-gray-600 hover:bg-gray-50 hover:text-blue-600'
            }`}
            aria-current={activeTab === 'users' ? 'page' : undefined}
          >
            <Users className="h-5 w-5 mr-3" />
            Users
          </button>
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={() => {
              logout();
              setIsSidebarOpen(false);
            }}
            className="w-full flex items-center px-4 py-3 text-left text-gray-600 hover:bg-gray-50 hover:text-red-600 transition-colors duration-200"
            aria-label="Logout"
          >
            <LogOut className="h-5 w-5 mr-3" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 md:ml-64">
        {/* Header */}
        <header className="bg-white shadow sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            {/* Hamburger Menu for Small Screens */}
            <button
              onClick={toggleSidebar}
              className="md:hidden text-gray-600 hover:text-gray-900 focus:outline-none"
              aria-label="Open Sidebar"
            >
              <Menu className="h-6 w-6" />
            </button>

            <h1 className="text-2xl font-bold text-gray-800">
              {activeTab === 'dashboard' ? 'Dashboard' : activeTab === 'providers' ? 'Providers' : 'Users'}
            </h1>

            {/* Placeholder to balance flex layout on small screens */}
            <div className="w-6 md:hidden"></div>
          </div>
        </header>

        {/* Content */}
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <section
            className="bg-white rounded-lg shadow-md p-6 transition-all duration-300 ease-in-out"
            aria-live="polite"
          >
            {activeTab === 'dashboard' ? (
              <div className="text-center">
                <h2 className="text-3xl font-semibold text-gray-800 mb-4">Welcome to Your Dashboard</h2>
                <p className="text-gray-600">
                  Manage your providers and users efficiently from the sidebar on the left.
                </p>
              </div>
            ) : activeTab === 'providers' ? (
              <ProviderManagement />
            ) : (
              <UserManagement />
            )}
          </section>
        </main>
      </div>

      {/* Overlay for small screens when sidebar is open */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleSidebar}
          aria-hidden="true"
        ></div>
      )}
    </div>
  );
}