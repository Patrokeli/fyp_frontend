import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Menu } from 'lucide-react';

type CustomerLayoutProps = {
  children: React.ReactNode;
};

export function CustomerLayout({ children }: CustomerLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Main content area - pushes left when sidebar opens */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${
        sidebarOpen ? 'md:mr-64' : 'mr-0'
      }`}>
        {/* Mobile header with hamburger menu */}
        <header className="md:hidden bg-white shadow-sm z-30">
          <div className="flex items-center justify-between px-4 py-3">
            <h1 className="text-lg font-medium">Dashboard</h1>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-gray-500 hover:text-gray-600"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </header>

        {/* Dashboard content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>

      {/* Sidebar - now on the right */}
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)}
      />
    </div>
  );
}