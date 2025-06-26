// src/components/customer/Sidebar.tsx
import React, { useState } from 'react';
import { Home, LogOut, X, Search, Star, HelpCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

type SidebarProps = {
  isOpen: boolean;
  onClose?: () => void;
  currentTab: string;
  changeTab: (tab: 'dashboard' | 'search' | 'compare' | 'rate' | 'support') => void;
};

export function Sidebar({ isOpen, onClose, currentTab, changeTab }: SidebarProps) {
  const { user, logout } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      window.location.href = '/'; // Hard reload to home
    } catch (error) {
      console.error('Logout failed:', error);
      setIsLoggingOut(false);
    }
  };

  const navItems = [
    { name: 'Dashboard', icon: <Home className="h-5 w-5" aria-hidden="true" />, tab: 'dashboard' },
    { name: 'Search Providers', icon: <Search className="h-5 w-5" aria-hidden="true" />, tab: 'search' },
    { name: 'Compare Providers', icon: <Search className="h-5 w-5" aria-hidden="true" />, tab: 'compare' },
    { name: 'Rate Service', icon: <Star className="h-5 w-5" aria-hidden="true" />, tab: 'rate' },
    { name: 'Request Support', icon: <HelpCircle className="h-5 w-5" aria-hidden="true" />, tab: 'support' },
  ];

  return (
    <div className="flex flex-col h-full" role="navigation" aria-label="Main Sidebar Navigation">
      {/* Header */}
      <div className="flex items-center justify-between h-16 px-4 border-b">
        <h1 className="text-xl font-semibold text-gray-800">Customer Portal</h1>
        {onClose && (
          <button
            onClick={onClose}
            className="md:hidden text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500 rounded"
            aria-label="Close sidebar"
          >
            <X className="h-6 w-6" />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-4 overflow-y-auto">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = currentTab === item.tab;
            return (
              <li key={item.name}>
                <button
                  onClick={() => {
                    changeTab(item.tab as any);
                    if (onClose) onClose(); // Close sidebar on mobile
                  }}
                  className={`flex items-center w-full px-3 py-2 text-sm font-medium rounded-md transition-colors
                    ${isActive
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500'}`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span className={`mr-3 ${isActive ? 'text-blue-600' : 'text-gray-500'}`}>
                    {item.icon}
                  </span>
                  <span>{item.name}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t">
        {user && (
          <div className="flex items-center mb-4">
            <div className="bg-blue-100 text-blue-800 rounded-full h-10 w-10 flex items-center justify-center font-medium select-none">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="ml-3 overflow-hidden">
              <p className="text-sm font-medium text-gray-700 truncate">{user.name}</p>
              <p className="text-xs text-gray-500 truncate max-w-[180px]" title={user.email}>
                {user.email}
              </p>
            </div>
          </div>
        )}
        <button
          onClick={handleLogout}
          className="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isLoggingOut}
          aria-busy={isLoggingOut}
        >
          <LogOut className="h-5 w-5 mr-3 text-gray-500" aria-hidden="true" />
          <span>{isLoggingOut ? 'Logging out...' : 'Logout'}</span>
        </button>
      </div>
    </div>
  );
}
