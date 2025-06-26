import { CustomerLayout } from './CustomerLayout';

export function CustomerDashboard() {
  return (
    <CustomerLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Overview</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Your dashboard content here */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-medium mb-4">Recent Activity</h2>
            <p className="text-gray-600">No recent activity</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-medium mb-4">Quick Actions</h2>
            <p className="text-gray-600">Get started with your account</p>
          </div>
        </div>
      </div>
    </CustomerLayout>
  );
}