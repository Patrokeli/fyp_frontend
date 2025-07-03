import React, { useState, useEffect } from 'react';
import { ProviderManagement } from './ProviderManagement';
import { UserManagement } from './UserManagement';
import { RatingsManagement } from './RatingsManagement';
import { SupportManagement } from './SupportManagement';
import {
  LayoutGrid, Users, LogOut, Home, Menu, X, Moon, Sun, Briefcase,
  ChevronDown, ChevronUp, Activity, MapPin, UserPlus, Database,
  Settings, HelpCircle, Bell, Search,Mail, Calendar, Star, FileText, Shield
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Line, Bar, Pie, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

const API_URL = import.meta.env.VITE_API_URL;

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

type Tab = 'dashboard' | 'providers' |'support'| 'users' | 'ratings' | 'reports' | 'settings';

const colorSchemes = {
  light: {
    background: 'bg-gray-50',
    card: 'bg-white',
    sidebar: 'bg-white',
    header: 'bg-white',
    textPrimary: 'text-gray-900',
    textSecondary: 'text-gray-600',
    textAccent: 'text-indigo-600',
    border: 'border-gray-200',
    accentBorder: 'border-indigo-500',
    hoverBg: 'hover:bg-gray-50',
    activeBg: 'bg-indigo-50',
    iconBg: 'bg-gray-100',
    buttonHover: 'hover:bg-indigo-50 hover:text-indigo-700',
    logoutHover: 'hover:bg-red-50 hover:text-red-600',
    positiveText: 'text-emerald-600',
    chartGrid: 'rgba(229, 231, 235, 1)',
    chartText: 'rgba(75, 85, 99, 1)',
    sidebarActive: 'bg-indigo-50 text-indigo-700',
    sidebarHover: 'hover:bg-gray-100',
    searchBg: 'bg-gray-100',
    notificationBadge: 'bg-red-500 text-white',
  },
  dark: {
    background: 'bg-gray-950',
    card: 'bg-gray-900',
    sidebar: 'bg-gray-900',
    header: 'bg-gray-900',
    textPrimary: 'text-gray-100',
    textSecondary: 'text-gray-400',
    textAccent: 'text-indigo-400',
    border: 'border-gray-800',
    accentBorder: 'border-indigo-500',
    hoverBg: 'hover:bg-gray-800',
    activeBg: 'bg-indigo-900/30',
    iconBg: 'bg-gray-800',
    buttonHover: 'hover:bg-gray-800 hover:text-indigo-300',
    logoutHover: 'hover:bg-gray-800 hover:text-red-400',
    positiveText: 'text-emerald-400',
    chartGrid: 'rgba(31, 41, 55, 1)',
    chartText: 'rgba(209, 213, 219, 1)',
    sidebarActive: 'bg-indigo-900/30 text-indigo-300',
    sidebarHover: 'hover:bg-gray-800',
    searchBg: 'bg-gray-800',
    notificationBadge: 'bg-red-600 text-white',
  },
};

const chartColors = {
  blueShades: [
    '#3B82F6', '#60A5FA', '#93C5FD', '#BFDBFE', '#DBEAFE', '#1D4ED8', '#1E40AF', '#1E3A8A',
  ],
  vibrantColors: [
    '#6366F1', '#EC4899', '#10B981', '#F59E0B', '#3B82F6', '#8B5CF6', '#EF4444', '#14B8A6', '#F97316', '#64748B',
  ],
};

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [stats, setStats] = useState({ 
    totalUsers: 0, 
    totalProviders: 0,
    newUsers: 0,
    growthRate: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [registrationData, setRegistrationData] = useState<any[]>([]);
  const [regionData, setRegionData] = useState<{ region: string; count: number }[]>([]);
  const [unreadNotifications, setUnreadNotifications] = useState(3);
  const { user, logout } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

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
        
        // Calculate new users (last 30 days)
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        const newUsers = Array.isArray(customers) ? 
          customers.filter((user: any) => new Date(user.created_at) > thirtyDaysAgo).length : 0;
        
        // Calculate growth rate
        const growthRate = totalUsers > 0 ? Math.round((newUsers / totalUsers) * 100) : 0;

        // Group registrations by month
        const regMap = new Map<string, number>();
        customers.forEach((user: any) => {
          const date = new Date(user.created_at);
          const key = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
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

        setRegionData(
          Array.from(regionMap.entries())
            .map(([region, count]) => ({ region, count }))
            .sort((a, b) => b.count - a.count)
        );

        // Fetch providers
        const providerRes = await fetch(`${API_URL}/api/admin/providers`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        });

        const providers = await providerRes.json();
        const totalProviders = Array.isArray(providers) ? providers.length : 0;

        setStats({ 
          totalUsers, 
          totalProviders,
          newUsers,
          growthRate
        });
      } catch (err: any) {
        setError(err.message || 'Error fetching data.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

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

  const clearNotifications = () => {
    setUnreadNotifications(0);
  };

  return (
    <div className={`min-h-screen flex ${colors.background}`}>
      {/* Enhanced Sidebar */}
      <aside
        className={`w-64 h-screen fixed top-0 left-0 z-50 shadow-xl transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 ${colors.sidebar} ${colors.border} border-r flex flex-col`}
      >
        <div className={`p-4 border-b ${colors.border} flex justify-between items-center`}>
          <span className={`font-bold text-2xl ${colors.textAccent} flex items-center gap-2`}>
            <Shield className="h-6 w-6" />
            AdminPanel
          </span>
          <button 
            onClick={toggleSidebar} 
            className="md:hidden p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700" 
            aria-label="Close Sidebar"
          >
            <X className="h-6 w-6 text-gray-400" />
          </button>
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-2">
          <SidebarSection title="MAIN">
            <SidebarButton 
              icon={Home} 
              label="Dashboard" 
              isActive={activeTab === 'dashboard'} 
              onClick={() => changeTab('dashboard')} 
              colors={colors} 
            />
            <SidebarButton 
              icon={Briefcase} 
              label="Providers" 
              isActive={activeTab === 'providers'} 
              onClick={() => changeTab('providers')} 
              colors={colors} 
            />
            <SidebarButton 
              icon={Users} 
              label="Users" 
              isActive={activeTab === 'users'} 
              onClick={() => changeTab('users')} 
              colors={colors} 
            />
          </SidebarSection>
          <SidebarSection title="FEEDBACK">
            <SidebarButton 
              icon={Star} 
              label="Ratings" 
              isActive={activeTab === 'ratings'} 
              onClick={() => changeTab('ratings')} 
              colors={colors} 
            />
          </SidebarSection>
          <SidebarSection title="SUPPORT">
          <SidebarButton 
            icon={Mail} 
            label="Support Requests" 
            isActive={activeTab === 'support'} 
            onClick={() => changeTab('support')} 
            colors={colors} 
          />
        </SidebarSection>
        </nav>

        {/* User Profile & Logout */}
        <div className={`p-4 border-t ${colors.border} space-y-4`}>
          {user && (
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-medium">
                  {user.name?.charAt(0).toUpperCase() || 'U'}
                </div>
                <div>
                  <p className={`font-medium ${colors.textPrimary}`}>{user.name || 'User'}</p>
                  <p className={`text-xs ${colors.textSecondary}`}>
                    {user.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : 'Admin'}
                  </p>
                </div>
              </div>
              <button 
                onClick={clearNotifications}
                className="relative p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                <Bell className="h-5 w-5 text-gray-400" />
                {unreadNotifications > 0 && (
                  <span className={`absolute -top-1 -right-1 h-5 w-5 rounded-full flex items-center justify-center text-xs ${colors.notificationBadge}`}>
                    {unreadNotifications}
                  </span>
                )}
              </button>
            </div>
          )}
          <button
            onClick={handleLogout}
            className={`flex items-center justify-center w-full py-2 rounded-lg transition-colors ${
              isLoggingOut 
                ? 'bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-400' 
                : colors.logoutHover
            } font-medium`}
            disabled={isLoggingOut}
          >
            <LogOut className="h-5 w-5 mr-2" />
            {isLoggingOut ? 'Logging out...' : 'Logout'}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className={`flex-1 md:ml-64 transition-all duration-300`}>
        <header className={`sticky top-0 z-40 flex items-center justify-between p-4 shadow-sm ${colors.header} ${colors.border} border-b`}>
          <div className="flex items-center gap-4">
            <button 
              onClick={toggleSidebar} 
              className="md:hidden p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <Menu className="h-6 w-6 text-gray-500 dark:text-gray-400" />
            </button>
            <h1 className={`text-xl font-semibold ${colors.textPrimary} flex items-center gap-2`}>
              {activeTab === 'dashboard' && <Activity className="h-5 w-5" />}
              {activeTab === 'providers' && <Briefcase className="h-5 w-5" />}
              {activeTab === 'users' && <Users className="h-5 w-5" />}
              {activeTab === 'ratings' && <Star className="h-5 w-5" />}
              {activeTab === 'support' && <SupportManagement />}
              {activeTab === 'reports' && <FileText className="h-5 w-5" />}
              {activeTab === 'settings' && <Settings className="h-5 w-5" />}
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-full transition-colors ${
                isDarkMode 
                  ? 'bg-indigo-600 text-white hover:bg-indigo-500' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </div>
        </header>

        <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          {isLoading && (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
          )}
          
          {error && (
            <div className={`p-4 rounded-lg ${colors.card} ${colors.border} border`}>
              <p className="text-red-500">{error}</p>
            </div>
          )}
          
          {!isLoading && !error && activeTab === 'dashboard' && (
            <DashboardContent 
              stats={stats} 
              registrationData={registrationData} 
              regionData={regionData} 
              colors={colors} 
              isDarkMode={isDarkMode}
            />
          )}
          
          {activeTab === 'providers' && <ProviderManagement />}
          {activeTab === 'users' && <UserManagement />}
          {activeTab === 'ratings' && <RatingsManagement />}
          {activeTab === 'reports' && (
            <div className={`p-6 rounded-lg ${colors.card} ${colors.border} border`}>
              <h2 className={`text-xl font-bold mb-4 ${colors.textPrimary}`}>Reports</h2>
              <p className={colors.textSecondary}>Reports dashboard coming soon</p>
            </div>
          )}
          {activeTab === 'settings' && (
            <div className={`p-6 rounded-lg ${colors.card} ${colors.border} border`}>
              <h2 className={`text-xl font-bold mb-4 ${colors.textPrimary}`}>Settings</h2>
              <p className={colors.textSecondary}>Settings panel coming soon</p>
            </div>
          )}
        </main>
      </div>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
}

const SidebarSection = ({ title, children }: { title: string; children: React.ReactNode }) => {
  return (
    <div className="mb-6">
      <h3 className="px-4 mb-2 text-xs font-semibold tracking-wider text-gray-500 uppercase">
        {title}
      </h3>
      <div className="space-y-1">
        {children}
      </div>
    </div>
  );
};

const SidebarButton = ({ icon: Icon, label, isActive, onClick, colors }: any) => (
  <button
    onClick={onClick}
    className={`flex items-center w-full px-4 py-2.5 text-left rounded-lg transition-all ${
      isActive 
        ? `${colors.sidebarActive} font-medium` 
        : `${colors.textSecondary} ${colors.sidebarHover}`
    }`}
  >
    <Icon className={`h-5 w-5 mr-3 ${isActive ? colors.textAccent : colors.textSecondary}`} />
    <span className={isActive ? colors.textAccent : ''}>{label}</span>
    {isActive && (
      <span className="ml-auto">
        <div className={`h-2 w-2 rounded-full ${colors.textAccent}`} />
      </span>
    )}
  </button>
);

const DashboardContent = ({ stats, registrationData, regionData, colors, isDarkMode }: any) => {
  const getBarChartColors = (count: number) => {
    const colors = [];
    for (let i = 0; i < count; i++) {
      colors.push(chartColors.blueShades[i % chartColors.blueShades.length]);
    }
    return colors;
  };

  const getPieChartColors = (count: number) => {
    const colors = [];
    for (let i = 0; i < count; i++) {
      colors.push(chartColors.vibrantColors[i % chartColors.vibrantColors.length]);
    }
    return colors;
  };

  const regionLabels = regionData.map((r: any) => r.region);
  const barChartColors = getBarChartColors(regionLabels.length);
  const pieChartColors = getPieChartColors(regionLabels.length);

  const toRgba = (hex: string, opacity: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  };

  const barChartColorsWithOpacity = barChartColors.map(color => toRgba(color, 0.7));
  const pieChartColorsWithOpacity = pieChartColors.map(color => toRgba(color, 0.7));

  const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: colors.chartText,
        }
      },
      tooltip: {
        backgroundColor: colors.card,
        titleColor: colors.textPrimary,
        bodyColor: colors.textSecondary,
        borderColor: colors.border,
        borderWidth: 1,
      }
    },
    scales: {
      x: {
        grid: {
          color: colors.chartGrid,
        },
        ticks: {
          color: colors.chartText,
        }
      },
      y: {
        grid: {
          color: colors.chartGrid,
        },
        ticks: {
          color: colors.chartText,
        }
      }
    }
  };

  const lineChartData = {
    labels: registrationData.map((d: any) => {
      const [year, month] = d.monthYear.split('-');
      return new Date(parseInt(year), parseInt(month) - 1, 1).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short' 
      });
    }),
    datasets: [
      {
        label: 'User Registrations',
        data: registrationData.map((d: any) => d.count),
        borderColor: '#6366F1',
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        tension: 0.3,
        fill: true,
        pointBackgroundColor: '#6366F1',
        pointBorderColor: '#fff',
        pointHoverRadius: 5,
        pointHoverBackgroundColor: '#6366F1',
        pointHoverBorderColor: '#fff',
        pointHitRadius: 10,
        pointBorderWidth: 2,
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: colors.card,
        titleColor: colors.textPrimary,
        bodyColor: colors.textSecondary,
        borderColor: colors.border,
        borderWidth: 1,
      }
    },
    scales: {
      x: {
        grid: {
          color: colors.chartGrid,
          display: false,
        },
        ticks: {
          color: colors.chartText,
        }
      },
      y: {
        grid: {
          color: colors.chartGrid,
        },
        ticks: {
          color: colors.chartText,
        }
      }
    }
  };

  const barChartData = {
    labels: regionLabels,
    datasets: [
      {
        label: 'Users by Region',
        data: regionData.map((r: any) => r.count),
        backgroundColor: barChartColorsWithOpacity,
        borderColor: barChartColors,
        borderWidth: 1,
        borderRadius: 4,
      },
    ],
  };

  const pieChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          color: colors.chartText,
          padding: 20,
          usePointStyle: true,
          pointStyle: 'circle',
        }
      },
      tooltip: {
        backgroundColor: colors.card,
        titleColor: colors.textPrimary,
        bodyColor: colors.textSecondary,
        borderColor: colors.border,
        borderWidth: 1,
      }
    },
  };

  const pieChartData = {
    labels: regionLabels,
    datasets: [
      {
        label: 'Users by Region',
        data: regionData.map((r: any) => r.count),
        backgroundColor: pieChartColorsWithOpacity,
        borderColor: colors.card,
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          icon={Users} 
          title="Total Users" 
          value={stats.totalUsers} 
          change={stats.growthRate}
          colors={colors} 
        />
        <StatCard 
          icon={UserPlus} 
          title="New Users" 
          value={stats.newUsers} 
          change={stats.growthRate}
          colors={colors} 
        />
        <StatCard 
          icon={Briefcase} 
          title="Total Providers" 
          value={stats.totalProviders} 
          colors={colors} 
        />
        <StatCard 
          icon={MapPin} 
          title="Active Regions" 
          value={regionData.length} 
          colors={colors} 
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className={`p-5 rounded-xl shadow-sm ${colors.card} ${colors.border} border lg:col-span-2`}>
          <h3 className={`text-lg font-semibold mb-4 ${colors.textPrimary}`}>User Growth</h3>
          <div className="h-80">
            <Line data={lineChartData} options={lineChartOptions} />
          </div>
        </div>
        <div className={`p-5 rounded-xl shadow-sm ${colors.card} ${colors.border} border`}>
          <h3 className={`text-lg font-semibold mb-4 ${colors.textPrimary}`}>User Distribution</h3>
          <div className="h-80">
            <Doughnut data={pieChartData} options={pieChartOptions} />
          </div>
        </div>
      </div>

      <div className={`p-5 rounded-xl shadow-sm ${colors.card} ${colors.border} border`}>
        <h3 className={`text-lg font-semibold mb-4 ${colors.textPrimary}`}>Users by Region</h3>
        <div className="h-80">
          <Bar data={barChartData} options={barChartOptions} />
        </div>
        <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
          {regionData.map((region: any, index: number) => (
            <div key={region.region} className="flex items-center">
              <div 
                className="w-3 h-3 rounded-full mr-2" 
                style={{ backgroundColor: barChartColors[index] }}
              />
              <span className={`text-sm ${colors.textSecondary}`}>
                {region.region}: <span className="font-medium">{region.count}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon: Icon, title, value, change, colors }: any) => (
  <div className={`p-5 rounded-xl shadow-sm ${colors.card} ${colors.border} border transition-all hover:shadow-md`}>
    <div className="flex items-start justify-between">
      <div className="flex items-center">
        <div className={`p-3 rounded-lg ${colors.iconBg} mr-4`}>
          <Icon className={`h-6 w-6 ${colors.textAccent}`} />
        </div>
        <div>
          <p className={`text-sm font-medium ${colors.textSecondary}`}>{title}</p>
          <p className={`text-2xl font-bold ${colors.textPrimary}`}>{value.toLocaleString()}</p>
        </div>
      </div>
      {change !== undefined && (
        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
          change >= 0 
            ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400' 
            : 'bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400'
        }`}>
          {change >= 0 ? '+' : ''}{change}%
        </div>
      )}
    </div>
  </div>
);