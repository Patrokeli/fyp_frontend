import React from 'react';
import { 
  Home, 
  LogOut, 
  Settings, 
  CreditCard, 
  HelpCircle, 
  X, 
  Users, 
  Calendar, 
  Bell, 
  BarChart2, 
  Tag, 
  Gift, 
  Star, 
  AlertCircle,
  Wrench,
  Search // Add this import
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

type SidebarProps = {
  isOpen: boolean;
  onClose?: () => void;
};

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    if (onClose) onClose();
  };

  const navItems = [
    { name: 'Dashboard', icon: <Home className="h-5 w-5" />, path: '/dashboard' },
    { name: 'Search Providers', icon: <Search className="h-5 w-5" />, path: '/search' },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Close button (mobile only) */}
      <div className="flex items-center justify-between h-16 px-4 border-b">
        <h1 className="text-xl font-semibold text-gray-800">Customer Portal</h1>
        {onClose && (
          <button
            onClick={onClose}
            className="md:hidden text-gray-500 hover:text-gray-700"
          >
            <X className="h-6 w-6" />
          </button>
        )}
      </div>

      <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <button
            key={item.name}
            onClick={() => handleNavigation(item.path)}
            className="flex items-center w-full px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <span className="mr-3 text-gray-500">{item.icon}</span>
            <span>{item.name}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t">
        {user && (
          <div className="flex items-center mb-4">
            <div className="bg-blue-100 text-blue-800 rounded-full h-10 w-10 flex items-center justify-center font-medium">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700">{user.name}</p>
              <p className="text-xs text-gray-500 truncate max-w-[180px]">{user.email}</p>
            </div>
          </div>
        )}
        <button
          onClick={handleLogout}
          className="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
        >
          <LogOut className="h-5 w-5 mr-3 text-gray-500" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}