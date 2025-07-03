import React, { useState, useEffect } from 'react';
import { Star, Search, ChevronDown, ChevronUp, X } from 'lucide-react';

type Rating = {
  id: string;
  providerId: string;
  providerName: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
};

export function RatingsManagement() {
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: keyof Rating; direction: 'asc' | 'desc' }>({
    key: 'createdAt',
    direction: 'desc',
  });

  useEffect(() => {
    setLoading(true);
    try {
      setTimeout(() => {
        const mockRatings: Rating[] = [
          {
            id: '1',
            providerId: '101',
            providerName: 'FiberNet Pro',
            userId: 'user1',
            userName: 'John Doe',
            rating: 5,
            comment: 'Excellent service! Very reliable connection.',
            createdAt: '2023-10-15T09:30:00Z',
          },
          {
            id: '2',
            providerId: '102',
            providerName: 'BroadBand Solutions',
            userId: 'user2',
            userName: 'Jane Smith',
            rating: 4,
            comment: 'Good speeds but occasional drops.',
            createdAt: '2023-10-14T14:45:00Z',
          },
          {
            id: '3',
            providerId: '103',
            providerName: 'ConnectFast',
            userId: 'user3',
            userName: 'Robert Johnson',
            rating: 3,
            comment: 'Average service. Customer support could be better.',
            createdAt: '2023-10-12T11:20:00Z',
          },
          {
            id: '4',
            providerId: '101',
            providerName: 'FiberNet Pro',
            userId: 'user4',
            userName: 'Alice Williams',
            rating: 5,
            comment: 'Perfect in every way!',
            createdAt: '2023-10-10T16:15:00Z',
          },
          {
            id: '5',
            providerId: '104',
            providerName: 'NetBlaze',
            userId: 'user5',
            userName: 'Michael Brown',
            rating: 2,
            comment: 'Frequent outages. Not recommended.',
            createdAt: '2023-10-08T10:05:00Z',
          },
        ];
        setRatings(mockRatings);
        setLoading(false);
      }, 800);
    } catch (err) {
      setError('Failed to load ratings data');
      setLoading(false);
    }
  }, []);

  const sortedRatings = React.useMemo(() => {
    let sortableItems = [...ratings];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [ratings, sortConfig]);

  const filteredRatings = React.useMemo(() => {
    return sortedRatings.filter(
      (rating) =>
        rating.providerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rating.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rating.comment.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [sortedRatings, searchTerm]);

  const requestSort = (key: keyof Rating) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key: keyof Rating) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'asc' ? (
      <ChevronUp className="h-4 w-4 ml-1 inline" />
    ) : (
      <ChevronDown className="h-4 w-4 ml-1 inline" />
    );
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 rounded-lg bg-red-50 border border-red-200">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Service Ratings</h2>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search ratings..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-8 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {searchTerm && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort('providerName')}
              >
                <div className="flex items-center">
                  Provider
                  {getSortIcon('providerName')}
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort('userName')}
              >
                <div className="flex items-center">
                  User
                  {getSortIcon('userName')}
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort('rating')}
              >
                <div className="flex items-center">
                  Rating
                  {getSortIcon('rating')}
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
              >
                Comment
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort('createdAt')}
              >
                <div className="flex items-center">
                  Date
                  {getSortIcon('createdAt')}
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
            {filteredRatings.length > 0 ? (
              filteredRatings.map((rating) => (
                <tr key={rating.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {rating.providerName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {rating.userName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < rating.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                        />
                      ))}
                      <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">
                        ({rating.rating}/5)
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400 max-w-xs truncate">
                    {rating.comment}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {new Date(rating.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                  No ratings found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Ratings</h3>
          <p className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">
            {ratings.length}
          </p>
        </div>
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Average Rating</h3>
          <div className="mt-1 flex items-center">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.round(ratings.reduce((acc, curr) => acc + curr.rating, 0) / ratings.length)
                      ? 'text-yellow-400 fill-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="ml-2 text-xl font-semibold text-gray-900 dark:text-white">
              {(ratings.reduce((acc, curr) => acc + curr.rating, 0) / ratings.length || 0).toFixed(1)}
            </span>
          </div>
        </div>
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Top Provider</h3>
          <p className="mt-1 text-xl font-semibold text-gray-900 dark:text-white truncate">
            {ratings.length > 0
              ? Object.values(
                  ratings.reduce((acc: {[key: string]: {name: string; total: number; count: number}}, curr) => {
                    if (!acc[curr.providerId]) {
                      acc[curr.providerId] = { name: curr.providerName, total: 0, count: 0 };
                    }
                    acc[curr.providerId].total += curr.rating;
                    acc[curr.providerId].count++;
                    return acc;
                  }, {})
                ).sort((a: any, b: any) => (b.total / b.count) - (a.total / a.count))[0].name
              : 'N/A'}
          </p>
        </div>
      </div>
    </div>
  );
}