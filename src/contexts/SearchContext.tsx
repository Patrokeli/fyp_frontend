import React, { useState, createContext, useContext } from 'react';

interface Location {
  id: string;
  name: string;
  providers: string[];
}

interface SearchContextType {
  searchLocation: string;
  setSearchLocation: (location: string) => void;
  availableLocations: Location[];
  searchResults: Location | null;
  performSearch: (query: string) => Promise<void>;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [searchLocation, setSearchLocation] = useState('');
  const [searchResults, setSearchResults] = useState<Location | null>(null);
  
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
    try {
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const foundLocation = availableLocations.find(location => 
        location.name.toLowerCase().includes(query.toLowerCase())
      );
      
      setSearchResults(foundLocation || null);
      
      // For actual API call, you would use:
      /*
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
      */
    } catch (error) {
      console.error('Search failed:', error);
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
};

export function useSearch() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
}