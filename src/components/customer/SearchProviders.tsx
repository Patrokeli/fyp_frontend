import React, { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { useSearch } from '../../contexts/SearchContext';

export function SearchProviders() {
  const {
    searchLocation,
    setSearchLocation,
    availableLocations,
    searchResults,
    performSearch,
  } = useSearch();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!searchLocation.trim()) {
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

    debounceTimeout.current = setTimeout(async () => {
      try {
        await performSearch(searchLocation);
        setError(null);
      } catch {
        setError('Failed to fetch providers. Please try again.');
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => {
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    };
  }, [searchLocation, performSearch]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchLocation.trim()) {
      setError('Please enter a region name.');
      return;
    }
    setLoading(true);
    performSearch(searchLocation)
      .then(() => setError(null))
      .catch(() => setError('Failed to fetch providers. Please try again.'))
      .finally(() => setLoading(false));
  };

  const clearSearch = () => {
    setSearchLocation('');
    setError(null);
  };

  return (
    <div className="p-4">
      {/* Search Form */}
      <form
        onSubmit={handleSearch}
        className="mb-6 group max-w-md"
        role="search"
        aria-label="Search for providers by region"
      >
        <div className="flex relative shadow-md rounded-md overflow-hidden border border-gray-300 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition">
          {/* Search Input */}
          <input
            type="text"
            value={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)}
            placeholder="Search for a region (e.g. Dar es Salaam)"
            className="flex-1 px-4 py-3 bg-white text-gray-900 placeholder-gray-400 focus:outline-none"
            list="regions"
            aria-autocomplete="list"
            aria-controls="regions"
            aria-describedby="search-desc"
            aria-label="Region search input"
            autoComplete="off"
          />

          {/* Clear input button (X) */}
          {searchLocation && (
            <button
              type="button"
              onClick={clearSearch}
              aria-label="Clear search input"
              className="absolute right-12 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:text-gray-600 transition-opacity opacity-0 group-hover:opacity-100 focus:opacity-100"
            >
              <X className="h-5 w-5" />
            </button>
          )}

          {/* Submit button with search icon */}
          <button
            type="submit"
            className="flex items-center justify-center px-5 bg-blue-600 hover:bg-blue-700 focus:bg-blue-700 text-white font-semibold transition-colors"
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </button>
        </div>

        {/* Hidden description for screen readers */}
        <p id="search-desc" className="sr-only">
          Start typing a region name to search for available providers.
        </p>

        {/* Datalist outside for better browser support */}
        <datalist id="regions">
          {availableLocations.map((location) => (
            <option key={location.id} value={location.name} />
          ))}
        </datalist>
      </form>

      {/* Results Section */}
      {loading ? (
        <div className="bg-white p-6 rounded-lg shadow-md text-center text-gray-500">
          Loading providers...
        </div>
      ) : error ? (
        <div className="bg-red-100 p-6 rounded-lg shadow-md text-red-700 font-semibold">
          {error}
        </div>
      ) : searchResults ? (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">{searchResults.name}</h2>
          <h3 className="text-lg font-medium mb-2">Available Providers:</h3>
          {searchResults.providers.length > 0 ? (
            <ul role="list" className="space-y-3">
              {searchResults.providers.map((provider, index) => (
                <li
                  key={index}
                  role="listitem"
                  tabIndex={0}
                  className="flex items-center p-3 rounded-md cursor-pointer hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                  aria-label={`Provider: ${provider}`}
                >
                  <span
                    className="inline-block h-3 w-3 rounded-full bg-blue-500 mr-4 flex-shrink-0"
                    aria-hidden="true"
                  ></span>
                  <span className="text-gray-800">{provider}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No providers found for this region.</p>
          )}
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-gray-600">
            Search for a region to see available providers.
          </p>
        </div>
      )}
    </div>
  );
}
