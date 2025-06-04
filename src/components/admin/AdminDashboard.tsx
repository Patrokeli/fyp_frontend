import React, { useState, useEffect } from 'react';
import { ProviderManagement } from './ProviderManagement';
import { UserManagement } from './UserManagement';
import { LayoutGrid, Users, LogOut, Home, Menu, X, Moon, Sun, Activity, UserPlus, Briefcase } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

type TabType = 'dashboard' | 'providers' | 'users';

// Define consistent color schemes for both modes
const colorSchemes = {
  light: {
    background: 'bg-gray-50',
    card: 'bg-white',
    sidebar: 'bg-white',
    header: 'bg-white',
    textPrimary: 'text-gray-800',
    textSecondary: 'text-gray-600',
    textAccent: 'text-blue-600',
    border: 'border-gray-200',
    accentBorder: 'border-blue-500',
    hoverBg: 'hover:bg-gray-50',
    activeBg: 'bg-blue-100',
    iconBg: 'bg-gray-100',
    buttonHover: 'hover:bg-blue-50 hover:text-blue-700',
    logoutHover: 'hover:bg-red-50 hover:text-red-600',
    positiveText: 'text-green-600'
  },
  dark: {
    background: 'bg-gray-900',
    card: 'bg-gray-800',
    sidebar: 'bg-gray-900',
    header: 'bg-gray-800',
    textPrimary: 'text-gray-100',
    textSecondary: 'text-gray-300',
    textAccent: 'text-blue-400',
    border: 'border-gray-700',
    accentBorder: 'border-blue-500',
    hoverBg: 'hover:bg-gray-700',
    activeBg: 'bg-blue-900',
    iconBg: 'bg-gray-700',
    buttonHover: 'hover:bg-gray-700 hover:text-blue-300',
    logoutHover: 'hover:bg-gray-700 hover:text-red-400',
    positiveText: 'text-green-300'
  }
};

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProviders: 0,
    activeUsers: 0
  });
  const { logout } = useAuth();

  const colors = isDarkMode ? colorSchemes.dark : colorSchemes.light;

  // Mock data fetch - replace with actual API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      setStats({
        totalUsers: 1243,
        totalProviders: 87,
        activeUsers: 892
      });
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Dark mode handling
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark = savedTheme === 'dark' || (!savedTheme && prefersDark);

    setIsDarkMode(shouldBeDark);
    document.documentElement.classList.toggle('dark', shouldBeDark);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => {
      const newMode = !prev;
      localStorage.setItem('theme', newMode ? 'dark' : 'light');
      return newMode;
    });
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const changeTab = (tab: TabType) => {
    setActiveTab(tab);
    setIsSidebarOpen(false);
  };

  return (
    <div className={`min-h-screen flex ${colors.background}`}>
      {/* Sidebar */}
      <aside
        className={`w-64 h-screen fixed top-0 left-0 shadow-lg flex flex-col z-50 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 ${colors.sidebar} ${colors.border} border-r`}
      >
        {/* Sidebar Header */}
        <div className={`p-4 border-b flex items-center justify-between ${colors.border}`}>
          <span className={`font-bold text-xl ${colors.textAccent}`}>
            Admin Dashboard
          </span>
          <button
            onClick={toggleSidebar}
            className={`md:hidden ${colors.textSecondary} hover:text-gray-900 dark:hover:text-gray-100`}
            aria-label="Close Sidebar"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 mt-4">
          <button
            onClick={() => changeTab('dashboard')}
            className={`w-full flex items-center px-4 py-3 text-left font-medium transition-colors duration-200 ${
              activeTab === 'dashboard'
                ? `${colors.activeBg} text-white border-l-4 ${colors.accentBorder}`
                : `${colors.textSecondary} ${colors.hoverBg} ${colors.buttonHover}`
            }`}
            aria-current={activeTab === 'dashboard' ? 'page' : undefined}
          >
            <Home className="h-5 w-5 mr-3" />
            Dashboard
          </button>

          <button
            onClick={() => changeTab('providers')}
            className={`w-full flex items-center px-4 py-3 text-left font-medium transition-colors duration-200 ${
              activeTab === 'providers'
                ? `${colors.activeBg} text-white border-l-4 ${colors.accentBorder}`
                : `${colors.textSecondary} ${colors.hoverBg} ${colors.buttonHover}`
            }`}
            aria-current={activeTab === 'providers' ? 'page' : undefined}
          >
            <LayoutGrid className="h-5 w-5 mr-3" />
            Providers
          </button>

          <button
            onClick={() => changeTab('users')}
            className={`w-full flex items-center px-4 py-3 text-left font-medium transition-colors duration-200 ${
              activeTab === 'users'
                ? `${colors.activeBg} text-white border-l-4 ${colors.accentBorder}`
                : `${colors.textSecondary} ${colors.hoverBg} ${colors.buttonHover}`
            }`}
            aria-current={activeTab === 'users' ? 'page' : undefined}
          >
            <Users className="h-5 w-5 mr-3" />
            Users
          </button>
        </nav>

        {/* Logout Button */}
        <div className={`p-4 border-t ${colors.border}`}>
          <button
            onClick={() => {
              logout();
              setIsSidebarOpen(false);
            }}
            className={`w-full flex items-center px-4 py-3 text-left ${colors.textSecondary} ${colors.logoutHover} transition-colors duration-200`}
            aria-label="Logout"
          >
            <LogOut className="h-5 w-5 mr-3" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`flex-1 md:ml-64 ${colors.background}`}>
        {/* Header */}
        <header className={`sticky top-0 z-40 shadow ${colors.header} ${colors.border} border-b`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between space-x-6">
            {/* Hamburger Menu */}
            <button
              onClick={toggleSidebar}
              className={`md:hidden ${colors.textSecondary} hover:text-gray-900 dark:hover:text-gray-100 focus:outline-none`}
              aria-label="Open Sidebar"
            >
              <Menu className="h-6 w-6" />
            </button>

            {/* Header Title */}
            <h1 className={`text-2xl font-bold ${colors.textPrimary}`}>
              {activeTab === 'dashboard' ? 'Dashboard' : 
               activeTab === 'providers' ? 'Providers' : 'Users'}
            </h1>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-full ${
                isDarkMode
                  ? 'bg-blue-600 text-white hover:bg-blue-500'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              } focus:outline-none transition-colors duration-200`}
              aria-label="Toggle Dark Mode"
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </div>
        </header>

        {/* Main Content Section */}
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <section
            className={`rounded-lg shadow-md p-6 transition-all duration-300 ease-in-out ${colors.card} ${colors.border} border`}
            aria-live="polite"
          >
            {activeTab === 'dashboard' ? (
              <DashboardContent stats={stats} colors={colors} />
            ) : activeTab === 'providers' ? (
              <ProviderManagement />
            ) : (
              <UserManagement />
            )}
          </section>
        </main>
      </div>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleSidebar}
          role="dialog"
          aria-label="Close Sidebar Overlay"
        />
      )}
    </div>
  );
}

// Dashboard Content Component
const DashboardContent = ({ stats, colors }: { stats: any, colors: any }) => (
  <div>
    <h2 className={`text-3xl font-semibold ${colors.textPrimary} mb-6`}>
      Welcome to Your Dashboard
    </h2>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <StatCard 
        icon={Users}
        title="Total Users"
        value={stats.totalUsers}
        change="+12% from last month"
        colors={colors}
      />
      <StatCard 
        icon={Briefcase}
        title="Providers"
        value={stats.totalProviders}
        change="+3 new this week"
        colors={colors}
      />
      <StatCard 
        icon={Activity}
        title="Active Users"
        value={stats.activeUsers}
        change="72% activity rate"
        colors={colors}
      />
    </div>

    <div className={`p-6 rounded-lg ${colors.card} ${colors.border} border`}>
      <h3 className={`text-xl font-medium mb-4 ${colors.textPrimary}`}>
        Quick Actions
      </h3>
      <div className="grid grid-cols-2 gap-4">
        <ActionButton 
          icon={UserPlus}
          label="Add New User"
          onClick={() => console.log('Add user')}
          colors={colors}
        />
        <ActionButton 
          icon={Briefcase}
          label="Add Provider"
          onClick={() => console.log('Add provider')}
          colors={colors}
        />
      </div>
    </div>
  </div>
);

// Stat Card Component
const StatCard = ({ icon: Icon, title, value, change, colors }: {
  icon: any;
  title: string;
  value: number;
  change: string;
  colors: any;
}) => (
  <div className={`p-6 rounded-lg shadow-sm ${colors.card} ${colors.border} border`}>
    <div className="flex items-center">
      <div className={`p-3 rounded-full ${colors.iconBg} mr-4`}>
        <Icon className={`h-6 w-6 ${colors.textAccent}`} />
      </div>
      <div>
        <p className={`text-sm font-medium ${colors.textSecondary}`}>
          {title}
        </p>
        <p className={`text-2xl font-semibold ${colors.textPrimary}`}>
          {value.toLocaleString()}
        </p>
      </div>
    </div>
    <p className={`mt-2 text-sm ${colors.positiveText}`}>
      {change}
    </p>
  </div>
);

// Action Button Component
const ActionButton = ({ icon: Icon, label, onClick, colors }: {
  icon: any;
  label: string;
  onClick: () => void;
  colors: any;
}) => (
  <button
    onClick={onClick}
    className={`flex items-center justify-center p-4 rounded-lg transition-all ${
      colors.card
    } ${colors.border} border ${colors.buttonHover}`}
  >
    <Icon className={`h-5 w-5 mr-2 ${colors.textAccent}`} />
    <span className={colors.textPrimary}>{label}</span>
  </button>
);