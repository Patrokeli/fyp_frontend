import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL;

type Provider = {
  id: string;
  name: string;
  speeds: string[];
  prices: string[];
  installation: string;
  contract?: string;
  coverage: string[]; // Changed back to array
  rating?: string;
  action_url?: string;
  created_at?: string;
  updated_at?: string;
};

export function ProviderManagement() {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isAddingProvider, setIsAddingProvider] = useState(false);
  const [newProvider, setNewProvider] = useState<Partial<Provider>>({});

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/api/admin/providers`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch providers');
        }

        const data = await response.json();
        setProviders(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchProviders();
  }, []);

  const handleAddProvider = async () => {
    if (!newProvider.name) return;

    try {
      const token = localStorage.getItem('token');
      
      // Prepare data for API - ensure coverage is an array
      const apiData = {
        name: newProvider.name,
        speeds: newProvider.speeds || [],
        prices: newProvider.prices || [],
        installation: newProvider.installation || '',
        contract: newProvider.contract || '',
        coverage: Array.isArray(newProvider.coverage) ? newProvider.coverage : 
                 newProvider.coverage ? [newProvider.coverage] : [],
        action_url: newProvider.action_url || ''
      };

      const response = await fetch(`${API_URL}/api/admin/providers`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(apiData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add provider');
      }

      // Refresh the providers list
      const refreshResponse = await fetch(`${API_URL}/api/admin/providers`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });

      if (refreshResponse.ok) {
        const refreshedData = await refreshResponse.json();
        setProviders(refreshedData);
      }

      setIsAddingProvider(false);
      setNewProvider({});
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add provider');
    }
  };

  const handleDeleteProvider = async (id: string) => {
    if (!confirm('Are you sure you want to delete this provider?')) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/admin/providers/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete provider');
      }

      // Remove the provider from the local state
      setProviders(providers.filter(provider => provider.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete provider');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white shadow rounded-lg p-6">
        <div className="text-red-600 text-center p-4">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Manage Providers</h2>
        <button
          onClick={() => setIsAddingProvider(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Provider
        </button>
      </div>

      {isAddingProvider && (
        <div className="mb-6 p-4 border rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Add New Provider</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-2">Provider Name</label>
              <input
                type="text"
                value={newProvider.name || ''}
                onChange={e => setNewProvider({
                  ...newProvider,
                  name: e.target.value
                })}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="e.g., TTCL Fiber"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Installation</label>
              <input
                type="text"
                value={newProvider.installation || ''}
                onChange={e => setNewProvider({
                  ...newProvider,
                  installation: e.target.value
                })}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="e.g., Free installation"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Contract</label>
              <input
                type="text"
                value={newProvider.contract || ''}
                onChange={e => setNewProvider({
                  ...newProvider,
                  contract: e.target.value
                })}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="e.g., 12-month contract"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Coverage (comma-separated regions)</label>
              <input
                type="text"
                value={Array.isArray(newProvider.coverage) ? newProvider.coverage.join(', ') : newProvider.coverage || ''}
                onChange={e => setNewProvider({
                  ...newProvider,
                  coverage: e.target.value.split(',').map(c => c.trim())
                })}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="e.g., Dar es Salaam, Arusha, Mwanza"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Speeds (comma-separated)</label>
              <input
                type="text"
                value={newProvider.speeds?.join(', ') || ''}
                onChange={e => setNewProvider({
                  ...newProvider,
                  speeds: e.target.value.split(',').map(s => s.trim())
                })}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="e.g., Up to 200Mbps"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Prices (comma-separated)</label>
              <input
                type="text"
                value={newProvider.prices?.join(', ') || ''}
                onChange={e => setNewProvider({
                  ...newProvider,
                  prices: e.target.value.split(',').map(p => p.trim())
                })}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="e.g., 55,000 TZS/mo"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-gray-700 mb-2">Action URL</label>
              <input
                type="url"
                value={newProvider.action_url || ''}
                onChange={e => setNewProvider({
                  ...newProvider,
                  action_url: e.target.value
                })}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="e.g., https://fiber.ttcl.co.tz/application/#/home"
              />
            </div>
          </div>
          <div className="mt-4 flex justify-end space-x-2">
            <button
              onClick={() => setIsAddingProvider(false)}
              className="px-4 py-2 text-gray-600 hover:text-gray-900"
            >
              Cancel
            </button>
            <button
              onClick={handleAddProvider}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
            >
              Save Provider
            </button>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Provider
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Coverage
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Plans
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Installation
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {providers.map(provider => (
              <tr key={provider.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {provider.name}
                  </div>
                  {provider.action_url && (
                    <div className="text-xs text-blue-600 mt-1">
                      <a href={provider.action_url} target="_blank" rel="noopener noreferrer">
                        Visit Website
                      </a>
                    </div>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-500">
                    {Array.isArray(provider.coverage) ? provider.coverage.join(', ') : provider.coverage}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900 font-medium">
                    {provider.speeds?.length || 0} plans
                  </div>
                  {provider.speeds && provider.prices && (
                    <div className="text-xs text-gray-500 mt-1">
                      {provider.speeds.map((speed, index) => (
                        <div key={index}>
                          {speed} - {provider.prices?.[index] || ''}
                        </div>
                      ))}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-500">
                    {provider.installation}
                  </div>
                  {provider.contract && (
                    <div className="text-xs text-gray-400 mt-1">
                      {provider.contract}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900 mr-3">
                    <Edit className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDeleteProvider(provider.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {providers.length === 0 && !loading && (
        <div className="text-center py-8 text-gray-500">
          No providers found. Add your first provider to get started.
        </div>
      )}
    </div>
  );
}