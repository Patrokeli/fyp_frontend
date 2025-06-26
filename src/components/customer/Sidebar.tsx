import React from 'react';
import { Home, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

type SidebarProps = {
  isOpen: boolean;
  onClose?: () => void;
};

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/'); // Redirect to home after logout
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    if (onClose) onClose(); // Close sidebar on mobile after navigation
  };

  return (
    <aside className={`...`}> {/* Keep your existing classes */}
      {/* ... other sidebar code ... */}
      
      <nav className="flex-1 px-4 py-4 space-y-1">
        <button
          onClick={() => handleNavigation('/dashboard')}
          className="flex items-center w-full px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
        >
          <Home className="h-5 w-5 mr-3" />
          <span>Home</span>
        </button>
      </nav>

      {/* ... rest of your sidebar code ... */}
    </aside>
  );
}