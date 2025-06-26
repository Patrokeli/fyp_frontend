import { CustomerLayout } from './CustomerLayout';
import { useAuth } from '../../contexts/AuthContext';
import { useSearch } from '../../contexts/SearchContext';
import { Search } from 'lucide-react';

export function CustomerDashboard() {
  const { user } = useAuth();
  const {
    searchLocation,
    setSearchLocation,
    availableLocations,
    searchResults,
    performSearch
  } = useSearch();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(searchLocation);
  };

  return (
    <CustomerLayout>
      <div className="py-6 px-4 border-b border-gray-200">
        {user && (
          <h1 className="text-3xl font-semibold text-gray-800">
            Welcome, {user.name}!
          </h1>
        )}
      </div>

      <div className="p-4">
        <form onSubmit={handleSearch} className="mb-6">
          <div className="flex max-w-md">
            <input
              type="text"
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              placeholder="Search for a region (e.g. Dar es Salaam)"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              list="regions"
            />
            <datalist id="regions">
              {availableLocations.map((location) => (
                <option key={location.id} value={location.name} />
              ))}
            </datalist>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <Search className="h-5 w-5" />
            </button>
          </div>
        </form>

        {searchResults && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">{searchResults.name}</h2>
            <h3 className="text-lg font-medium mb-2">Available Providers:</h3>
            <ul className="space-y-2">
              {searchResults.providers.map((provider, index) => (
                <li key={index} className="flex items-center">
                  <span className="h-2 w-2 rounded-full bg-blue-500 mr-2"></span>
                  <span>{provider}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {!searchResults && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-gray-600">Search for a region to see available providers</p>
          </div>
        )}
      </div>
    </CustomerLayout>
  );
}