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
    } catch {
      setError('Failed to load ratings data');
      setLoading(false);
    }
  }, []);

  const sortedRatings = React.useMemo(() => {
    const items = [...ratings];
    items.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
    return items;
  }, [ratings, sortConfig]);

  const filteredRatings = React.useMemo(() => {
    return sortedRatings.filter((r) =>
      [r.providerName, r.userName, r.comment].join(' ').toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [sortedRatings, searchTerm]);

  const requestSort = (key: keyof Rating) => {
    const direction = sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key: keyof Rating) =>
    sortConfig.key === key ? (sortConfig.direction === 'asc' ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1" />) : null;

  const clearSearch = () => setSearchTerm('');

  const averageRating = ratings.reduce((acc, r) => acc + r.rating, 0) / ratings.length || 0;

  const topProvider =
    ratings.length > 0
      ? Object.values(
          ratings.reduce((acc: Record<string, { name: string; total: number; count: number }>, curr) => {
            if (!acc[curr.providerId]) {
              acc[curr.providerId] = { name: curr.providerName, total: 0, count: 0 };
            }
            acc[curr.providerId].total += curr.rating;
            acc[curr.providerId].count++;
            return acc;
          }, {})
        ).sort((a, b) => b.total / b.count - a.total / a.count)[0].name
      : 'N/A';

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-indigo-600 border-solid"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-100 text-red-700 border border-red-300 rounded-lg dark:bg-red-900/20 dark:text-red-300 dark:border-red-600">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header + Search */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">📊 Service Ratings</h2>
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500" />
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-10 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
          />
          {searchTerm && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard title="Total Ratings" value={ratings.length.toString()} />
        <MetricCard
          title="Average Rating"
          value={averageRating.toFixed(1)}
          icon={
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`h-5 w-5 ${i < Math.round(averageRating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 dark:text-gray-600'}`} />
              ))}
            </div>
          }
        />
        <MetricCard title="Top Provider" value={topProvider} />
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl shadow border border-gray-200 dark:border-gray-700">
        <table className="min-w-full text-sm text-left text-gray-700 dark:text-gray-300">
          <thead className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs uppercase">
            <tr>
              {['providerName', 'userName', 'rating', 'comment', 'createdAt'].map((key) => (
                <th
                  key={key}
                  className="px-6 py-4 whitespace-nowrap"
                  onClick={['providerName', 'userName', 'rating', 'createdAt'].includes(key) ? () => requestSort(key as keyof Rating) : undefined}
                >
                  <div className={`flex items-center ${['providerName', 'userName', 'rating', 'createdAt'].includes(key) ? 'cursor-pointer hover:underline' : ''}`}>
                    {key === 'providerName' && 'Provider'}
                    {key === 'userName' && 'User'}
                    {key === 'rating' && 'Rating'}
                    {key === 'comment' && 'Comment'}
                    {key === 'createdAt' && 'Date'}
                    {getSortIcon(key as keyof Rating)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
            {filteredRatings.length > 0 ? (
              filteredRatings.map((r) => (
                <tr key={r.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{r.providerName}</td>
                  <td className="px-6 py-4">{r.userName}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-4 w-4 ${i < r.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 dark:text-gray-600'}`} />
                      ))}
                      <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">({r.rating}/5)</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 max-w-xs truncate">{r.comment}</td>
                  <td className="px-6 py-4 text-gray-500 dark:text-gray-400">{new Date(r.createdAt).toLocaleDateString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                  No ratings found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function MetricCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="p-5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm">
      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h4>
      <div className="mt-2 flex items-center space-x-2">
        {icon}
        <p className="text-2xl font-semibold text-gray-900 dark:text-white">{value}</p>
      </div>
    </div>
  );
}
