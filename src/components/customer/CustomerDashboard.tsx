import React, { useState, useEffect, useRef } from 'react';
import { Sidebar } from './Sidebar';
import { useAuth } from '../../contexts/AuthContext';
import { useSearch } from '../../contexts/SearchContext';
import {
  Search, Menu, Bell, HelpCircle, Activity,
  AlertCircle, Star, LifeBuoy, GitCompare
} from 'lucide-react';

import { SearchProviders } from './SearchProviders';
import { ProviderComparison } from './ProviderComparison';
import { RateService } from './RateService';
import { SupportRequest } from './SupportRequest';
import { QuickActionCard } from './QuickActionCard';
import { UserHelp } from './UserHelp';

type Tab = 'dashboard' | 'search' | 'compare' | 'rate' | 'support' | 'help';

const PROVIDERS = [
  { id: '1', name: 'Zuku' },
  { id: '2', name: 'TTCL' },
  { id: '3', name: 'SimbaNet' },
  { id: '4', name: 'YAS Fiber' }
];

// Particle background component using useRef
const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const setCanvasSize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    setCanvasSize();

    interface Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
    }

    const particles: Particle[] = [];
    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedX: Math.random() * 0.5 - 0.25,
        speedY: Math.random() * 0.5 - 0.25,
        color: `rgba(200, 200, 255, ${Math.random() * 0.3 + 0.1})`
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });
      requestAnimationFrame(animate);
    };

    window.addEventListener('resize', setCanvasSize);
    animate();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none opacity-10"
    />
  );
};

export function CustomerDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState<Tab>('dashboard');

  const { user } = useAuth();
  const { searchLocation, setSearchLocation, performSearch } = useSearch();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchLocation.trim()) return;
    performSearch(searchLocation);
  };

  const dashboardStats = [
    { title: "Active Services", value: 3, change: "+2 from last week", icon: <Activity className="h-5 w-5" />, color: "blue" },
    { title: "Pending Requests", value: 1, change: "1 awaiting approval", icon: <AlertCircle className="h-5 w-5" />, color: "orange" },
    { title: "Support Tickets", value: 2, change: "1 new today", icon: <HelpCircle className="h-5 w-5" />, color: "purple" },
    { title: "Average Rating", value: 4.5, change: "+0.2 from last month", icon: <Star className="h-5 w-5" />, color: "green" }
  ];

  const quickActions: { title: string; icon: JSX.Element; tab: Tab }[] = [
    { title: "Compare Providers", icon: <GitCompare className="h-5 w-5" />, tab: "compare" },
    { title: "Rate Service", icon: <Star className="h-5 w-5" />, tab: "rate" },
    { title: "Need Support", icon: <LifeBuoy className="h-5 w-5" />, tab: "support" },
    { title: "Help Center", icon: <HelpCircle className="h-5 w-5" />, tab: "help" }
  ];

  const tabTitles: Record<Tab, string> = {
    dashboard: 'Dashboard',
    search: 'Search Providers',
    compare: 'Compare Providers',
    rate: 'Rate Service',
    support: 'Support',
    help: 'Help Center'
  };

  return (
    <div className="flex h-screen bg-gray-50 relative overflow-hidden">
      <ParticleBackground />

      {/* Sidebar */}
      <div className="hidden md:flex md:flex-shrink-0 z-10">
        <Sidebar isOpen={true} currentTab={currentTab} changeTab={setCurrentTab} />
      </div>

      {sidebarOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="relative flex flex-col w-80 max-w-xs h-full z-50">
            <Sidebar
              isOpen={sidebarOpen}
              onClose={() => setSidebarOpen(false)}
              currentTab={currentTab}
              changeTab={(tab) => {
                setCurrentTab(tab);
                setSidebarOpen(false);
              }}
            />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden relative z-10">
        <header className="bg-white shadow-sm z-30 border-b border-gray-200">
          <div className="flex items-center justify-between px-6 py-3">
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="text-gray-500 hover:text-gray-600 mr-4"
                aria-label="Toggle sidebar"
              >
                <Menu className="h-6 w-6" />
              </button>
              <h1 className="text-lg font-semibold text-gray-800">
                {tabTitles[currentTab]}
              </h1>
            </div>

            <div className="hidden md:flex md:items-center md:space-x-6">
              {currentTab !== 'help' && (
                <form onSubmit={handleSearch} className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search..."
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                  />
                </form>
              )}

              <button className="p-1 text-gray-500 hover:text-gray-700 rounded-full relative">
                <Bell className="h-6 w-6" />
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
              </button>

              {user && (
                <div className="flex items-center space-x-2">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-full h-8 w-8 flex items-center justify-center font-bold text-sm">
                    {user.name?.[0]?.toUpperCase()}
                  </div>
                  <span className="text-sm font-medium text-gray-700">{user.name}</span>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            {currentTab === 'dashboard' && (
              <>
                <div className="bg-white rounded-xl shadow-sm p-6 backdrop-blur-sm bg-opacity-90 mb-6">
                  <h1 className="text-2xl font-bold text-gray-800 mb-2">
                    Welcome , {user?.name}!
                  </h1>
                  <p className="text-gray-600">Here's what's happening with your services today.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                  {dashboardStats.map((stat, index) => (
                    <div key={index} className={`bg-white rounded-xl shadow-sm p-5 border-l-4 backdrop-blur-sm bg-opacity-90 ${{
                      blue: 'border-blue-500',
                      orange: 'border-orange-500',
                      purple: 'border-purple-500',
                      green: 'border-green-500'
                    }[stat.color]}`}>
                      <div className="flex justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                          <p className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</p>
                          <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
                        </div>
                        <div className={`h-10 w-10 rounded-full flex items-center justify-center ${{
                          blue: 'bg-blue-100 text-blue-600',
                          orange: 'bg-orange-100 text-orange-600',
                          purple: 'bg-purple-100 text-purple-600',
                          green: 'bg-green-100 text-green-600'
                        }[stat.color]}`}>
                          {stat.icon}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <h2 className="text-xl font-bold text-gray-800 mb-4 tracking-tight">Quick Actions</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
                  {quickActions.map((action, idx) => (
                    <QuickActionCard
                      key={idx}
                      title={action.title}
                      description={
                        action.tab === 'compare' ? "Evaluate and compare internet providers" :
                        action.tab === 'rate' ? "Share feedback on your provider" :
                        action.tab === 'support' ? "Reach out for assistance" :
                        "Get help using the system"
                      }
                      icon={action.icon}
                      color={
                        action.tab === 'compare' ? "bg-blue-500" :
                        action.tab === 'rate' ? "bg-green-500" :
                        action.tab === 'support' ? "bg-purple-500" :
                        "bg-gray-600"
                      }
                      onClick={() => setCurrentTab(action.tab)}
                    />
                  ))}
                </div>
              </>
            )}

            {currentTab !== 'dashboard' && (
              <div className="bg-white rounded-xl shadow-sm overflow-hidden backdrop-blur-sm bg-opacity-90 p-6">
                {currentTab === 'search' && <SearchProviders />}
                {currentTab === 'compare' && <ProviderComparison />}
                {currentTab === 'rate' && <RateService providers={PROVIDERS} />}
                {currentTab === 'support' && <SupportRequest providers={PROVIDERS} />}
                {currentTab === 'help' && <UserHelp />}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
