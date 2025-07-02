import React, { useState } from 'react';
import {
  Star,
  LifeBuoy,
  Home,
  LogOut,
  X,
  Search,
  GitCompare,
  HelpCircle
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

// Extend the Tab type to include 'help'
type Tab = 'dashboard' | 'search' | 'compare' | 'rate' | 'support' | 'help';

type SidebarProps = {
  isOpen: boolean;
  onClose?: () => void;
  currentTab: Tab;
  changeTab: (tab: Tab) => void;
};

type NavItem = {
  name: string;
  icon: JSX.Element;
  tab: Tab;
};

export function Sidebar({ isOpen, onClose, currentTab, changeTab }: SidebarProps) {
  const { user, logout } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      window.location.href = '/';
    } catch (error) {
      console.error('Logout failed:', error);
      setIsLoggingOut(false);
    }
  };

  const navItems: NavItem[] = [
    { name: 'Dashboard', icon: <Home className="h-5 w-5" />, tab: 'dashboard' },
    { name: 'Search', icon: <Search className="h-5 w-5" />, tab: 'search' },
    { name: 'Compare', icon: <GitCompare className="h-5 w-5" />, tab: 'compare' },
    { name: 'Rate', icon: <Star className="h-5 w-5" />, tab: 'rate' },
    { name: 'Support', icon: <LifeBuoy className="h-5 w-5" />, tab: 'support' },
    { name: 'Help Center', icon: <HelpCircle className="h-5 w-5" />, tab: 'help' }
  ];

  return (
    <div
      className={`flex flex-col h-full bg-gray-900 text-white transition-all duration-300 ${
        isOpen ? 'w-64' : 'w-0 overflow-hidden'
      } md:w-64 fixed md:static z-40`}
    >
      {/* Header */}
      <div className="flex items-center justify-between h-16 px-6 border-b border-gray-800">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center mr-2">
            <span className="font-bold text-white">CZ</span>
          </div>
          <h1 className="text-xl font-bold">Customer Portal</h1>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="md:hidden text-gray-400 hover:text-white"
            aria-label="Close sidebar"
          >
            <X className="h-6 w-6" />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 overflow-y-auto">
        <ul className="space-y-1">
          {navItems.map(({ name, icon, tab }) => {
            const isActive = currentTab === tab;
            return (
              <li key={name}>
                <button
                  onClick={() => {
                    changeTab(tab);
                    onClose?.();
                  }}
                  className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition-all
                    ${
                      isActive
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                    }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span className={`mr-3 ${isActive ? 'text-white' : 'text-gray-400'}`}>
                    {icon}
                  </span>
                  {name}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-800 bg-gray-800">
        {user && (
          <div className="flex items-center mb-4">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-full h-10 w-10 flex items-center justify-center font-bold shadow">
              {user.name?.[0]?.toUpperCase()}
            </div>
            <div className="ml-3 overflow-hidden">
              <p className="text-sm font-medium text-white truncate">{user.name}</p>
              <p
                className="text-xs text-gray-400 truncate max-w-[180px]"
                title={user.email}
              >
                {user.email}
              </p>
            </div>
          </div>
        )}
        <button
          onClick={handleLogout}
          className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors
            ${
              isLoggingOut
                ? 'text-gray-400 bg-gray-700'
                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
            }`}
          disabled={isLoggingOut}
          aria-busy={isLoggingOut}
        >
          <LogOut className={`h-5 w-5 mr-3 ${isLoggingOut ? 'text-gray-500' : 'text-gray-400'}`} />
          {isLoggingOut ? 'Logging out...' : 'Logout'}
        </button>
      </div>
    </div>
  );
}
