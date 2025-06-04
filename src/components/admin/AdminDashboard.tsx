import React, { useState, useEffect } from 'react';
import { ProviderManagement } from './ProviderManagement';
import { UserManagement } from './UserManagement';
import { LayoutGrid, Users, LogOut, Home, Menu, X, Moon, Sun } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'providers' | 'users'>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for sidebar visibility on small screens
  const [isDarkMode, setIsDarkMode] = useState(false); // State for dark mode
  const { logout } = useAuth();

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Toggle dark mode and persist in localStorage
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem('theme', !isDarkMode ? 'dark' : 'light');
  };

  // Apply dark mode on mount based on localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Update document class when isDarkMode changes
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <div className={`min-h-screen flex ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
      {/* Sidebar - Contains navigation links and logo */}
      <aside
        className={`bg-white w-64 h-screen fixed top-0 left-0 shadow-lg flex flex-col z-50 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 ${isDarkMode ? 'bg-gray-900 border-r border-gray-700' : ''}`}
      >
        {/* Logo/Title Section - Displays app title with close button on small screens */}
        <div className={`p-4 border-b flex items-center justify-between ${
          isDarkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-200'}`}>
          <span className={`text-blue-600 font-bold text-xl ${
            isDarkMode ? 'text-blue-400' : ''}`}>Admin Dashboard</span>
          <button
            onClick={toggleSidebar}
            className={`md:hidden ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`}
            aria-label="Close Sidebar"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Navigation Links - Contains clickable options for dashboard, providers, and users */}
        <nav className="flex-1 mt-4">
          <button
            onClick={() => {
              setActiveTab('dashboard');
              setIsSidebarOpen(false);
            }}
            className={`w-full flex items-center px-4 py-3 text-left font-medium transition-colors duration-200 ${
              activeTab === 'dashboard'
                ? 'bg-blue-900 text-white border-l-4 border-blue-400'
                : `${isDarkMode ? 'text-gray-300 hover:bg-gray-800 hover:text-blue-300' : 'text-gray-600 hover:bg-gray-50 hover:text-blue-600'}`
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
                ? 'bg-blue-900 text-white border-l-4 border-blue-400'
                : `${isDarkMode ? 'text-gray-300 hover:bg-gray-800 hover:text-blue-300' : 'text-gray-600 hover:bg-gray-50 hover:text-blue-600'}`
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
                ? 'bg-blue-900 text-white border-l-4 border-blue-400'
                : `${isDarkMode ? 'text-gray-300 hover:bg-gray-800 hover:text-blue-300' : 'text-gray-600 hover:bg-gray-50 hover:text-blue-600'}`
            }`}
            aria-current={activeTab === 'users' ? 'page' : undefined}
          >
            <Users className="h-5 w-5 mr-3" />
            Users
          </button>
        </nav>

        {/* Logout Button - Placed at the bottom of the sidebar */}
        <div className={`p-4 border-t ${
          isDarkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-200'}`}>
          <button
            onClick={() => {
              logout();
              setIsSidebarOpen(false);
            }}
            className={`w-full flex items-center px-4 py-3 text-left ${
              isDarkMode ? 'text-gray-400 hover:bg-gray-800 hover:text-red-400' : 'text-gray-600 hover:bg-gray-50 hover:text-red-600'
            } transition-colors duration-200`}
            aria-label="Logout"
          >
            <LogOut className="h-5 w-5 mr-3" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content - Contains header and main section */}
      <div className={`flex-1 md:ml-64 ${isDarkMode ? 'bg-gray-900' : ''}`}>
        {/* Header - Contains navigation toggle, title, and dark mode toggle */}
        <header className={`bg-white shadow sticky top-0 z-40 ${
          isDarkMode ? 'bg-gray-700 border-b border-gray-600' : ''}`} // Adjusted to bg-gray-700 for better contrast
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between space-x-6"> {/* Increased space-x-6 for better spacing */}
            {/* Hamburger Menu for Small Screens */}
            <button
              onClick={toggleSidebar}
              className={`md:hidden ${isDarkMode ? 'text-gray-300 hover:text-gray-100' : 'text-gray-600 hover:text-gray-900'} focus:outline-none`}
              aria-label="Open Sidebar"
            >
              <Menu className="h-6 w-6" />
            </button>

            <h1 className={`text-2xl font-bold ${
              isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}> {/* Adjusted to text-gray-100 for readability */}
              {activeTab === 'dashboard' ? 'Dashboard' : activeTab === 'providers' ? 'Providers' : 'Users'}
            </h1>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-full ${
                isDarkMode ? 'bg-gray-600 text-yellow-300 hover:bg-gray-500' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              } focus:outline-none transition-colors duration-200`} // Adjusted bg-gray-600 to match header
              aria-label="Toggle Dark Mode"
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <section
            className={`rounded-lg shadow-md p-6 transition-all duration-300 ease-in-out ${
              isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'}`}
            aria-live="polite"
          >
            {activeTab === 'dashboard' ? (
              <div className="text-center">
                <h2 className={`text-3xl font-semibold ${
                  isDarkMode ? 'text-white' : 'text-gray-800'} mb-4`}>Welcome to Your Dashboard</h2>
                <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
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