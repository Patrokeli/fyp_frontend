import { CustomerLayout } from './CustomerLayout';
import { useAuth } from '../../contexts/AuthContext';

export function CustomerDashboard() {
  const { user } = useAuth();

  return (
    <CustomerLayout>
      <div className="py-6 px-4 border-b border-gray-200">
        {user && (
          <h1 className="text-3xl font-semibold text-gray-800">
            Welcome, {user.name}!
          </h1>
        )}
      </div>

      {/* Below you can add more dashboard content */}

      <div className="p-4">
        {/* Example placeholder content */}
        <p className="text-gray-600">Here is your dashboard overview...</p>
      </div>
    </CustomerLayout>
  );
}
