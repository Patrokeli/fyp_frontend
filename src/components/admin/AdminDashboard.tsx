import React, { useState, useEffect } from 'react';
import { ProviderManagement } from './ProviderManagement';
import { UserManagement } from './UserManagement';
import {
  LayoutGrid, Users, LogOut, Home, Menu, X, Moon, Sun, Briefcase,
  ChevronDown, ChevronUp, Activity, MapPin, UserPlus, Database
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

type Tab = 'dashboard' | 'providers' | 'users';

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
  },
};

// Updated color configurations
const chartColors = {
  blueShades: [
    '#3B82F6', // blue-500
    '#60A5FA', // blue-400
    '#93C5FD', // blue-300
    '#BFDBFE', // blue-200
    '#DBEAFE', // blue-100
    '#1D4ED8', // blue-700
    '#1E40AF', // blue-800
    '#1E3A8A', // blue-900
  ],
  vibrantColors: [
    '#6366F1', // indigo-500
    '#EC4899', // pink-500
    '#10B981', // emerald-500
    '#F59E0B', // amber-500
    '#3B82F6', // blue-500
    '#8B5CF6', // violet-500
    '#EF4444', // red-500
    '#14B8A6', // teal-500
    '#F97316', // orange-500
    '#64748B', // slate-500
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
        
        // Calculate new users (last 30 days)
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        const newUsers = Array.isArray(customers) ? 
          customers.filter((user: any) => new Date(user.created_at) > thirtyDaysAgo).length : 0;
        
        // Calculate growth rate (placeholder logic)
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
        className={`w-64 h-screen fixed top-0 left-0 z-50 shadow-lg transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 ${colors.sidebar} ${colors.border} border-r`}
      >
        <div className={`p-4 border-b flex justify-between items-center ${colors.border}`}>
          <span className={`font-bold text-2xl ${colors.textAccent} flex items-center gap-2`}>
            <Database className="h-6 w-6" />
            AdminHub
          </span>
          <button 
            onClick={toggleSidebar} 
            className="md:hidden" 
            aria-label="Close Sidebar"
          >
            <X className="h-6 w-6 text-gray-400 hover:text-gray-600" />
          </button>
        </div>
        <nav className="flex flex-col mt-6 p-2">
          <SidebarButton 
            icon={Home} 
            label="Dashboard" 
            isActive={activeTab === 'dashboard'} 
            onClick={() => changeTab('dashboard')} 
            colors={colors} 
          />
          <SidebarButton 
            icon={LayoutGrid} 
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
        </nav>
        <div className={`mt-auto p-4 border-t ${colors.border}`}>
          <button
            onClick={() => {
              logout();
              setIsSidebarOpen(false);
            }}
            className={`flex items-center px-4 py-3 w-full rounded-lg text-left transition-colors ${colors.logoutHover}`}
          >
            <LogOut className="h-5 w-5 mr-3" />
            <span className="font-medium">Logout</span>
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
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
            </h1>
          </div>
          <div className="flex items-center gap-2">
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

const SidebarButton = ({ icon: Icon, label, isActive, onClick, colors }: any) => (
  <button
    onClick={onClick}
    className={`flex items-center px-4 py-3 text-left w-full transition-colors rounded-lg mb-1 ${
      isActive 
        ? `${colors.activeBg} ${colors.textAccent} font-medium border-l-4 ${colors.accentBorder}` 
        : `${colors.textSecondary} ${colors.hoverBg} ${colors.buttonHover}`
    }`}
  >
    <Icon className="h-5 w-5 mr-3" />
    {label}
    <span className="ml-auto">
      {isActive ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
    </span>
  </button>
);

const DashboardContent = ({ stats, registrationData, regionData, colors, isDarkMode }: any) => {
  // Generate colors for bar chart (blue shades)
  const getBarChartColors = (count: number) => {
    const colors = [];
    for (let i = 0; i < count; i++) {
      colors.push(chartColors.blueShades[i % chartColors.blueShades.length]);
    }
    return colors;
  };

  // Generate colors for pie chart (vibrant distinct colors)
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

  // Convert colors to RGBA with opacity for some charts
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