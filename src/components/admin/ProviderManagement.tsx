import React, { useState } from 'react';
import { Plus, Edit, Trash } from 'lucide-react';
type Provider = {
  id: string;
  name: string;
  speeds: string[];
  prices: string[];
  installation: string;
  coverage: string[];
};
export function ProviderManagement() {
  const [providers, setProviders] = useState<Provider[]>([{
    id: '1',
    name: 'Zuku',
    speeds: ['10 Mbps', '30 Mbps', '100 Mbps'],
    prices: ['30,000 TZS', '45,000 TZS', '75,000 TZS'],
    installation: 'Free',
    coverage: ['Dar es Salaam', 'Arusha', 'Mwanza']
  }
  // Add more initial providers as needed
  ]);
  const [isAddingProvider, setIsAddingProvider] = useState(false);
  const [newProvider, setNewProvider] = useState<Partial<Provider>>({});
  const handleAddProvider = () => {
    if (newProvider.name) {
      setProviders([...providers, {
        id: Math.random().toString(),
        name: newProvider.name,
        speeds: newProvider.speeds || [],
        prices: newProvider.prices || [],
        installation: newProvider.installation || 'Contact for details',
        coverage: newProvider.coverage || []
      }]);
      setIsAddingProvider(false);
      setNewProvider({});
    }
  };
  return <div className="bg-white shadow rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Manage Providers</h2>
        <button onClick={() => setIsAddingProvider(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center">
          <Plus className="h-5 w-5 mr-2" />
          Add Provider
        </button>
      </div>
      {isAddingProvider && <div className="mb-6 p-4 border rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Add New Provider</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-2">Provider Name</label>
              <input type="text" value={newProvider.name || ''} onChange={e => setNewProvider({
            ...newProvider,
            name: e.target.value
          })} className="w-full px-3 py-2 border rounded-md" />
            </div>
            {/* Add more fields as needed */}
          </div>
          <div className="mt-4 flex justify-end space-x-2">
            <button onClick={() => setIsAddingProvider(false)} className="px-4 py-2 text-gray-600 hover:text-gray-900">
              Cancel
            </button>
            <button onClick={handleAddProvider} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
              Save Provider
            </button>
          </div>
        </div>}
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
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {providers.map(provider => <tr key={provider.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {provider.name}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {provider.coverage.join(', ')}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {provider.speeds.length} plans
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900 mr-3">
                    <Edit className="h-5 w-5" />
                  </button>
                  <button className="text-red-600 hover:text-red-900">
                    <Trash className="h-5 w-5" />
                  </button>
                </td>
              </tr>)}
          </tbody>
        </table>
      </div>
    </div>;
}