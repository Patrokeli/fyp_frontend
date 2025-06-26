import React from 'react';
import { CreditCard, Settings, HelpCircle, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export function CustomerDashboard() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout().catch(err => console.error('Logout error:', err));
  };

  const quickActions = [
    { name: 'Make a Payment', action: () => window.location.href = '/payments' },
    { name: 'Update Profile', action: () => window.location.href = '/profile' },
    { name: 'Contact Support', action: () => window.location.href = '/support' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <header className="md:hidden bg-white shadow-sm p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">Customer Portal</h1>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar - Hidden on mobile */}
          <aside className="hidden md:block w-64 bg-white rounded-lg shadow p-4 h-fit sticky top-6">
            <h2 className="text-lg font-semibold mb-4">Board Overview</h2>
            <nav className="space-y-2">
              <button className="flex items-center w-full p-2 rounded-lg bg-blue-50 text-blue-600">
                <CreditCard className="h-5 w-5 mr-3" />
                <span>Payments</span>
              </button>
              <button className="flex items-center w-full p-2 rounded-lg hover:bg-gray-100">
                <Settings className="h-5 w-5 mr-3" />
                <span>Settings</span>
              </button>
              <button className="flex items-center w-full p-2 rounded-lg hover:bg-gray-100">
                <HelpCircle className="h-5 w-5 mr-3" />
                <span>Help</span>
              </button>
            </nav>

            <div className="mt-8 pt-4 border-t">
              {user && (
                <div className="mb-4">
                  <p className="font-medium">{user.name}</p>
                  <p className="text-sm text-gray-600">{user.email}</p>
                </div>
              )}
              <button 
                onClick={handleLogout}
                className="flex items-center text-red-600 hover:text-red-800"
              >
                <LogOut className="h-5 w-5 mr-2" />
                <span>Logout</span>
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Dashboard Overview</h1>
            
            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
              <p className="text-gray-600">No recent activity</p>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={action.action}
                    className="p-4 border rounded-lg hover:bg-gray-50 transition-colors text-left"
                  >
                    <h3 className="font-medium text-blue-600">{action.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">Click to {action.name.toLowerCase()}</p>
                  </button>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t flex justify-around p-2">
        <button className="flex flex-col items-center p-2 text-blue-600">
          <CreditCard className="h-6 w-6" />
          <span className="text-xs mt-1">Payments</span>
        </button>
        <button className="flex flex-col items-center p-2 text-gray-600">
          <Settings className="h-6 w-6" />
          <span className="text-xs mt-1">Settings</span>
        </button>
        <button className="flex flex-col items-center p-2 text-gray-600">
          <HelpCircle className="h-6 w-6" />
          <span className="text-xs mt-1">Help</span>
        </button>
      </nav>
    </div>
  );
}