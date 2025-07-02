import React, { useState, useEffect } from 'react';
import { ProviderManagement } from './ProviderManagement';
import { UserManagement } from './UserManagement';
import {
  LayoutGrid, Users, LogOut, Home, Menu, X, Moon, Sun, Briefcase
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Line, Bar, Pie } from 'react-chartjs-2';  // Added Pie import
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,  // Registered ArcElement for Pie chart
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

const API_URL = import.meta.env.VITE_API_URL;

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,  // <-- Added ArcElement for Pie chart
  Title,
  Tooltip,
  Legend
);

type Tab = 'dashboard' | 'providers' | 'users';

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
    positiveText: 'text-green-600',
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
    positiveText: 'text-green-300',
  },
};

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [stats, setStats] = useState({ totalUsers: 0, totalProviders: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [registrationData, setRegistrationData] = useState<any[]>([]);
  const [regionData, setRegionData] = useState<{ region: string; count: number }[]>([]);
  const { logout } = useAuth();

  const colors = isDarkMode ? colorSchemes.dark : colorSchemes.light;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      const token = localStorage.getItem('token');

      if (!token) {
        setError('No authentication token found.');
        setIsLoading(false);
        return;
      }

      try {
        // Fetch customers
        const customerRes = await fetch(`${API_URL}/api/admin/customers`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        });

        const customers = await customerRes.json();
        const totalUsers = Array.isArray(customers) ? customers.length : 0;

        // Group registrations by month
        const regMap = new Map<string, number>();
        customers.forEach((user: any) => {
          const date = new Date(user.created_at);
          const key = `${date.getFullYear()}-${date.getMonth() + 1}`;
          regMap.set(key, (regMap.get(key) || 0) + 1);
        });

        setRegistrationData(
          Array.from(regMap.entries())
            .map(([monthYear, count]) => ({ monthYear, count }))
            .sort((a, b) => a.monthYear.localeCompare(b.monthYear))
        );

        // Group by region
        const regionMap = new Map<string, number>();
        customers.forEach((user: any) => {
          const region = user.region || 'Unknown';
          regionMap.set(region, (regionMap.get(region) || 0) + 1);
        });

        setRegionData(Array.from(regionMap.entries()).map(([region, count]) => ({ region, count })));

        // Fetch providers
        const providerRes = await fetch(`${API_URL}/api/admin/providers`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        });

        const providers = await providerRes.json();
        const totalProviders = Array.isArray(providers) ? providers.length : 0;

        setStats({ totalUsers, totalProviders });
      } catch (err: any) {
        setError(err.message || 'Error fetching data.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const useDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
    setIsDarkMode(useDark);
    document.documentElement.classList.toggle('dark', useDark);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleDarkMode = () => {
    setIsDarkMode(prev => {
      const next = !prev;
      localStorage.setItem('theme', next ? 'dark' : 'light');
      return next;
    });
  };

  const changeTab = (tab: Tab) => {
    setActiveTab(tab);
    setIsSidebarOpen(false);
  };

  return (
    <div className={`min-h-screen flex ${colors.background}`}>
      {/* Sidebar */}
      <aside
        className={`w-64 h-screen fixed top-0 left-0 z-50 shadow-md transform transition-transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 ${colors.sidebar} ${colors.border} border-r`}
      >
        <div className={`p-4 border-b flex justify-between items-center ${colors.border}`}>
          <span className={`font-bold text-xl ${colors.textAccent}`}>Admin</span>
          <button onClick={toggleSidebar} className="md:hidden" aria-label="Close Sidebar">
            <X className="h-6 w-6 text-gray-400" />
          </button>
        </div>
        <nav className="flex flex-col mt-4">
          <SidebarButton icon={Home} label="Dashboard" isActive={activeTab === 'dashboard'} onClick={() => changeTab('dashboard')} colors={colors} />
          <SidebarButton icon={LayoutGrid} label="Providers" isActive={activeTab === 'providers'} onClick={() => changeTab('providers')} colors={colors} />
          <SidebarButton icon={Users} label="Users" isActive={activeTab === 'users'} onClick={() => changeTab('users')} colors={colors} />
        </nav>
        <div className={`mt-auto p-4 border-t ${colors.border}`}>
          <button
            onClick={() => {
              logout();
              setIsSidebarOpen(false);
            }}
            className={`flex items-center px-4 py-2 w-full rounded-lg text-left ${colors.logoutHover}`}
          >
            <LogOut className="h-5 w-5 mr-3" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className={`flex-1 md:ml-64`}>
        <header className={`sticky top-0 z-40 flex items-center justify-between p-4 shadow ${colors.header} ${colors.border} border-b`}>
          <button onClick={toggleSidebar} className="md:hidden">
            <Menu className="h-6 w-6 text-gray-400" />
          </button>
          <h1 className={`text-xl font-semibold ${colors.textPrimary}`}>
            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
          </h1>
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-full ${
              isDarkMode ? 'bg-blue-600 text-white hover:bg-blue-500' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
        </header>

        <main className="max-w-7xl mx-auto py-6 px-4">
          <section className={`rounded-lg shadow p-6 ${colors.card} ${colors.border} border`}>
            {isLoading && <p className={colors.textPrimary}>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {!isLoading && !error && activeTab === 'dashboard' && (
              <DashboardContent stats={stats} registrationData={registrationData} regionData={regionData} colors={colors} />
            )}
            {activeTab === 'providers' && <ProviderManagement />}
            {activeTab === 'users' && <UserManagement />}
          </section>
        </main>
      </div>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
}

// Sidebar Button
const SidebarButton = ({ icon: Icon, label, isActive, onClick, colors }: any) => (
  <button
    onClick={onClick}
    className={`flex items-center px-4 py-3 text-left w-full transition-colors ${
      isActive ? `${colors.activeBg} text-white border-l-4 ${colors.accentBorder}` : `${colors.textSecondary} ${colors.hoverBg} ${colors.buttonHover}`
    }`}
  >
    <Icon className="h-5 w-5 mr-3" />
    {label}
  </button>
);

// Dashboard Content
const DashboardContent = ({ stats, registrationData, regionData, colors }: any) => {
  const lineChartData = {
    labels: registrationData.map((d: any) => d.monthYear),
    datasets: [
      {
        label: 'Registrations',
        data: registrationData.map((d: any) => d.count),
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        tension: 0,  // Changed from 0.4 to 0 for zig-zag lines
        fill: true,
      },
    ],
  };

  const barChartData = {
    labels: regionData.map((r: any) => r.region),
    datasets: [
      {
        label: 'Users by Region',
        data: regionData.map((r: any) => r.count),
        backgroundColor: '#10B981',
      },
    ],
  };

  const pieChartData = {
    labels: regionData.map((r: any) => r.region),
    datasets: [
      {
        label: 'Users by Region',
        data: regionData.map((r: any) => r.count),
        backgroundColor: [
          '#10B981',
          '#3B82F6',
          '#F59E0B',
          '#EF4444',
          '#8B5CF6',
          '#EC4899',
          '#14B8A6',
          '#F97316',
        ],
      },
    ],
  };

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        <StatCard icon={Users} title="Total Users" value={stats.totalUsers} colors={colors} />
        <StatCard icon={Briefcase} title="Total Providers" value={stats.totalProviders} colors={colors} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className={`p-4 rounded-lg ${colors.card} ${colors.border} border`}>
          <Line data={lineChartData} />
        </div>
        <div className={`p-4 rounded-lg ${colors.card} ${colors.border} border`}>
          <Bar data={barChartData} />
        </div>
        <div className={`p-4 rounded-lg ${colors.card} ${colors.border} border`}>
          <Pie data={pieChartData} />
        </div>
      </div>
    </div>
  );
};

// Stat Card
const StatCard = ({ icon: Icon, title, value, colors }: any) => (
  <div className={`p-6 rounded-lg shadow-sm ${colors.card} ${colors.border} border`}>
    <div className="flex items-center">
      <div className={`p-3 rounded-full ${colors.iconBg} mr-4`}>
        <Icon className={`h-6 w-6 ${colors.textAccent}`} />
      </div>
      <div>
        <p className={`text-sm font-medium ${colors.textSecondary}`}>{title}</p>
        <p className={`text-2xl font-semibold ${colors.textPrimary}`}>{value.toLocaleString()}</p>
      </div>
    </div>
  </div>
);
