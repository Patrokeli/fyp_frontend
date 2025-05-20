import React, { useState, createContext, useContext } from 'react';

type Location = {
  id: string;
  name: string;
  providers: string[];
};

type SearchContextType = {
  searchLocation: string;
  setSearchLocation: (location: string) => void;
  availableLocations: Location[];
  searchResults: Location | null;
  performSearch: (query: string) => void;
};

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [searchLocation, setSearchLocation] = useState('');
  const [searchResults, setSearchResults] = useState<Location | null>(null);
  
  // This could be fetched from your API instead of being hardcoded
  const [availableLocations] = useState<Location[]>([
    {
      id: '1',
      name: 'Dar es Salaam',
      providers: ['Zuku', 'TTCL', 'SimbaNet', 'YAS Fiber']
    },
    {
      id: '2',
      name: 'Arusha',
      providers: ['Zuku', 'TTCL', 'SimbaNet']
    },
    {
      id: '3',
      name: 'Mwanza',
      providers: ['TTCL', 'SimbaNet']
    },
    {
      id: '4',
      name: 'Zanzibar',
      providers: ['YAS Fiber', 'TTCL']
    }
  ]);

  const performSearch = async (query: string) => {
    const response = await fetch(`http://127.0.0.1:8000/api/search?location=${query}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
    
    if (response.ok) {
      const results = await response.json();
      setSearchResults(results);
    } else {
      setSearchResults(null);
    }
  };

  return (
    <SearchContext.Provider value={{
      searchLocation,
      setSearchLocation,
      availableLocations,
      searchResults,
      performSearch
    }}>
      {children}
    </SearchContext.Provider>
  );
}

// Properly export the useSearch hook
export function useSearch() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
}