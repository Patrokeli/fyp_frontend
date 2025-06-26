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

  // Local state for loading and error messages
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Ref to store debounce timeout ID
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  // Debounced search triggered when user types and pauses for 500ms
  useEffect(() => {
    if (!searchLocation.trim()) {
      // Clear errors if input is empty
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    // Clear previous debounce timer
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

    // Set new debounce timer to delay search execution
    debounceTimeout.current = setTimeout(async () => {
      try {
        await performSearch(searchLocation);
        setError(null); // Clear error if successful
      } catch {
        setError('Failed to fetch providers. Please try again.');
      } finally {
        setLoading(false); // Always stop loading when done
      }
    }, 500);

    // Cleanup timeout on unmount or before next effect runs
    return () => {
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    };
  }, [searchLocation, performSearch]);

  // Optional manual search triggered by form submit
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

  // Clear search input and errors
  const clearSearch = () => {
    setSearchLocation('');
    setError(null);
  };

  return (
    <div className="p-4">
      {/* Search Form */}
      <form
        onSubmit={handleSearch}
        className="mb-6"
        role="search"
        aria-label="Search for providers by region"
      >
        <div className="flex max-w-md relative">
          {/* Search Input with datalist suggestions */}
          <input
            type="text"
            value={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)}
            placeholder="Search for a region (e.g. Dar es Salaam)"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="absolute right-12 top-2.5 text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <X className="h-5 w-5" />
            </button>
          )}
          {/* Region suggestions */}
          <datalist id="regions">
            {availableLocations.map((location) => (
              <option key={location.id} value={location.name} />
            ))}
          </datalist>
          {/* Submit button with search icon */}
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </button>
        </div>
        {/* Hidden description for screen readers */}
        <p id="search-desc" className="sr-only">
          Start typing a region name to search for available providers.
        </p>
      </form>

      {/* Results Section */}
      {loading ? (
        // Loading indicator while fetching providers
        <div className="bg-white p-6 rounded-lg shadow-md text-center text-gray-500">
          Loading providers...
        </div>
      ) : error ? (
        // Error message display
        <div className="bg-red-100 p-6 rounded-lg shadow-md text-red-700 font-semibold">
          {error}
        </div>
      ) : searchResults ? (
        // Search results with improved listing UX
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">{searchResults.name}</h2>
          <h3 className="text-lg font-medium mb-2">Available Providers:</h3>
          {searchResults.providers.length > 0 ? (
            <ul role="list" className="space-y-3">
              {searchResults.providers.map((provider, index) => (
                <li
                  key={index}
                  role="listitem"
                  tabIndex={0} // Make item keyboard-focusable
                  className="flex items-center p-3 rounded-md cursor-pointer hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                  aria-label={`Provider: ${provider}`}
                >
                  {/* Blue dot bullet */}
                  <span
                    className="inline-block h-3 w-3 rounded-full bg-blue-500 mr-4 flex-shrink-0"
                    aria-hidden="true"
                  ></span>
                  {/* Provider name */}
                  <span className="text-gray-800">{provider}</span>
                </li>
              ))}
            </ul>
          ) : (
            // No providers message
            <p className="text-gray-600">No providers found for this region.</p>
          )}
        </div>
      ) : (
        // Default prompt when no search has been performed yet
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-gray-600">
            Search for a region to see available providers.
          </p>
        </div>
      )}
    </div>
  );
}
