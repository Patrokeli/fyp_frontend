import React, { useState, useEffect, useMemo } from 'react';
import { Star, Search, ChevronDown, ChevronUp, X, Filter } from 'lucide-react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

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
  const [activeTab, setActiveTab] = useState<'list' | 'analytics'>('list');
  const [showFilters, setShowFilters] = useState(false);
  const [minRatingFilter, setMinRatingFilter] = useState<number | null>(null);

  // Fetch mock ratings
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const mockRatings: Rating[] = [
        { id: '1', providerId: '101', providerName: 'FiberNet Pro', userId: 'user1', userName: 'Jackob Juma', rating: 5, comment: 'Excellent service! Very reliable connection.', createdAt: '2023-10-15T09:30:00Z' },
        { id: '2', providerId: '102', providerName: 'BroadBand Solutions', userId: 'user2', userName: 'Jane Smih', rating: 4, comment: 'Good speeds but occasional drops.', createdAt: '2023-10-14T14:45:00Z' },
        { id: '3', providerId: '103', providerName: 'ConnectFast', userId: 'user3', userName: 'Robert Elias', rating: 3, comment: 'Average service. Customer support could be better.', createdAt: '2023-10-12T11:20:00Z' },
        { id: '4', providerId: '101', providerName: 'FiberNet Pro', userId: 'user4', userName: 'Alice Will', rating: 5, comment: 'Perfect in every way!', createdAt: '2023-10-10T16:15:00Z' },
        { id: '5', providerId: '104', providerName: 'NetBlaze', userId: 'user5', userName: 'Michael Brown', rating: 2, comment: 'Frequent outages. Not recommended.', createdAt: '2023-10-08T10:05:00Z' },
      ];
      setRatings(mockRatings);
      setLoading(false);
    }, 800);
  }, []);

  // Sorting
  const sortedRatings = useMemo(() => {
    const items = [...ratings];
    items.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
    return items;
  }, [ratings, sortConfig]);

  // Filtering
  const filteredRatings = useMemo(() => {
    let result = sortedRatings.filter((r) =>
      [r.providerName, r.userName, r.comment].join(' ').toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (minRatingFilter !== null) result = result.filter(r => r.rating >= minRatingFilter);
    return result;
  }, [sortedRatings, searchTerm, minRatingFilter]);

  // Provider stats
  const providerStats = useMemo(() => {
    const stats = ratings.reduce((acc: Record<string, { name: string; total: number; count: number; ratings: number[] }>, curr) => {
      if (!acc[curr.providerId]) acc[curr.providerId] = { name: curr.providerName, total: 0, count: 0, ratings: [] };
      acc[curr.providerId].total += curr.rating;
      acc[curr.providerId].count++;
      acc[curr.providerId].ratings.push(curr.rating);
      return acc;
    }, {});

    return Object.values(stats).map(provider => ({
      ...provider,
      average: provider.total / provider.count,
      ratingDistribution: [1, 2, 3, 4, 5].map(star => provider.ratings.filter(r => r === star).length)
    })).sort((a, b) => b.average - a.average);
  }, [ratings]);

  // Helpers
  const requestSort = (key: keyof Rating) => {
    const direction = sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    setSortConfig({ key, direction });
  };
  const getSortIcon = (key: keyof Rating) => sortConfig.key === key ? (sortConfig.direction === 'asc' ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1" />) : null;
  const clearSearch = () => { setSearchTerm(''); setMinRatingFilter(null); };

  const averageRating = ratings.reduce((acc, r) => acc + r.rating, 0) / ratings.length || 0;
  const topProvider = providerStats.length > 0 ? providerStats[0].name : 'N/A';

  // Chart Data
  const providerComparisonData = {
    labels: providerStats.map(p => p.name),
    datasets: [{ label: 'Average Rating', data: providerStats.map(p => p.average), backgroundColor: 'rgba(99,102,241,0.7)', borderColor: 'rgba(99,102,241,1)', borderWidth: 1 }]
  };
  const ratingDistributionData = {
    labels: ['1 Star', '2 Stars', '3 Stars', '4 Stars', '5 Stars'],
    datasets: providerStats.map((p, i) => ({
      label: p.name,
      data: p.ratingDistribution,
      backgroundColor: ['#ef4444','#f97316','#eab308','#22c55e','#10b981'][i % 5],
      borderColor: ['#ef4444','#f97316','#eab308','#22c55e','#10b981'][i % 5],
      borderWidth: 1,
    }))
  };
  const pieChartData = {
    labels: providerStats.map(p => p.name),
    datasets: [{
      data: providerStats.map(p => p.count),
      backgroundColor: ['#6366f1','#8b5cf6','#a855f7','#d946ef','#ec4899'],
      borderColor: ['#6366f1','#8b5cf6','#a855f7','#d946ef','#ec4899'],
      borderWidth: 1,
    }]
  };
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { labels: { color: '#6B7280' } }, tooltip: { callbacks: { label: (ctx: any) => `${ctx.dataset.label}: ${ctx.raw} rating(s)` } } },
    scales: { y: { beginAtZero: true, max: 5, ticks: { color: '#6B7280' }, grid: { color: 'rgba(209,213,219,0.3)' } }, x: { ticks: { color: '#6B7280' }, grid: { color: 'rgba(209,213,219,0.3)' } } },
    elements: { bar: { borderRadius: 6 } }
  };

  if (loading) return <div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-t-4 border-indigo-600 dark:border-indigo-400"></div></div>;
  if (error) return <div className="p-4 bg-red-100 text-red-700 border border-red-300 rounded-lg dark:bg-red-900/20 dark:text-red-300 dark:border-red-600">{error}</div>;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center p-4 bg-white dark:bg-gray-900 rounded-lg shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
          📊 Service Ratings
          {minRatingFilter && <span className="text-sm text-indigo-500">({minRatingFilter}+ ⭐)</span>}
        </h2>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-400" />
            <input
              type="text"
              placeholder="Search ratings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-10 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:focus:ring-indigo-400 dark:focus:border-indigo-400 transition"
            />
            {searchTerm && (
              <button onClick={clearSearch} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
          <button onClick={() => setShowFilters(!showFilters)} className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition relative">
            <Filter className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            {minRatingFilter && <span className="absolute -top-1 -right-1 bg-indigo-500 text-white rounded-full h-4 w-4 text-xs flex items-center justify-center">{minRatingFilter}</span>}
          </button>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="flex flex-wrap items-center gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Minimum Rating</label>
              <div className="flex items-center gap-2">
                {[1,2,3,4,5].map(star => (
                  <button
                    key={star}
                    onClick={() => setMinRatingFilter(minRatingFilter === star ? null : star)}
                    className={`p-2 rounded-full transition-transform transform hover:scale-110 ${minRatingFilter === star ? 'bg-gradient-to-tr from-indigo-500 to-purple-500' : 'bg-gray-100 dark:bg-gray-700'}`}
                  >
                    <Star className={`h-5 w-5 ${star <= (minRatingFilter || 5) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 dark:text-gray-500'}`} />
                  </button>
                ))}
              </div>
            </div>
            <button onClick={clearSearch} className="mt-6 text-sm text-indigo-600 dark:text-indigo-400 hover:underline">Clear all filters</button>
          </div>
        </div>
      )}

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard title="Total Ratings" value={ratings.length.toString()} description="All submitted ratings" bgColor="bg-white dark:bg-gray-900" />
        <MetricCard
          title="Average Rating"
          value={averageRating.toFixed(1)}
          description="Across all providers"
          bgColor="bg-white dark:bg-gray-900"
          icon={<div className="flex">{[...Array(5)].map((_,i) => (<Star key={i} className={`h-5 w-5 ${i < Math.round(averageRating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 dark:text-gray-500'}`} />))}</div>}
        />
        <MetricCard title="Top Provider" value={topProvider} description="Highest average rating" bgColor="bg-white dark:bg-gray-900" icon={<Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />} />
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-8">
          <button onClick={() => setActiveTab('list')} className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'list' ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400' : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'}`}>Ratings List</button>
          <button onClick={() => setActiveTab('analytics')} className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'analytics' ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400' : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'}`}>Analytics</button>
        </nav>
      </div>

      {/* Content */}
      {activeTab === 'list' ? (
        <div className="overflow-x-auto rounded-lg shadow border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                {['providerName','userName','rating','comment','createdAt'].map(key => (
                  <th key={key} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider" onClick={['providerName','userName','rating','createdAt'].includes(key) ? () => requestSort(key as keyof Rating) : undefined}>
                    <div className={`flex items-center ${['providerName','userName','rating','createdAt'].includes(key) ? 'cursor-pointer hover:text-gray-700 dark:hover:text-gray-300' : ''}`}>
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
                filteredRatings.map(r => (
                  <tr key={r.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900 dark:text-gray-100">{r.providerName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-300">{r.userName}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_,i) => (<Star key={i} className={`h-4 w-4 ${i<r.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 dark:text-gray-500'} transition-transform transform hover:scale-125`} />))}
                        <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">({r.rating}/5)</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 max-w-xs text-gray-700 dark:text-gray-300"><div className="line-clamp-2" title={r.comment}>{r.comment}</div></td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{new Date(r.createdAt).toLocaleDateString('en-US',{year:'numeric',month:'short',day:'numeric'})}</td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan={5} className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">No ratings found matching your criteria.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="p-4 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Provider Comparison</h3>
              <div className="h-64"><Bar data={providerComparisonData} options={chartOptions} /></div>
            </div>
            <div className="p-4 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Rating Distribution</h3>
              <div className="h-64">
                <Bar data={ratingDistributionData} options={{...chartOptions, scales:{...chartOptions.scales, x:{...chartOptions.scales?.x, stacked:true}}}} />
              </div>
            </div>
          </div>

          {/* Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 p-4 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Provider Ratings Breakdown</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Provider</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Avg Rating</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Total Ratings</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Rating Distribution</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                    {providerStats.map(p => (
                      <tr key={p.name} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                        <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900 dark:text-gray-100">{p.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <span className="font-medium">{p.average.toFixed(1)}</span>
                            <div className="ml-2 flex">{[...Array(5)].map((_,i) => (<Star key={i} className={`h-4 w-4 ${i<Math.round(p.average)?'text-yellow-400 fill-yellow-400':'text-gray-300 dark:text-gray-500'}`} />))}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-300">{p.count}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-1">
                            {p.ratingDistribution.map((count,i) => (
                              <div key={i} className="h-4 flex items-end" style={{width:'20px'}} title={`${i+1} star: ${count} ratings`}>
                                <div className={`w-full ${count>0? ['bg-red-500','bg-orange-500','bg-yellow-500','bg-green-500','bg-teal-500'][i]:'bg-gray-200 dark:bg-gray-600'}`} style={{height:`${(count/Math.max(...p.ratingDistribution))*100}%`}} />
                              </div>
                            ))}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="p-4 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Reviews by Provider</h3>
              <div className="h-64"><Pie data={pieChartData} options={{responsive:true, maintainAspectRatio:false, plugins:{legend:{position:'right',labels:{color:'#6B7280'}}}}} /></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// MetricCard
function MetricCard({ title, value, description, icon, bgColor="bg-white dark:bg-gray-800" }: { title:string, value:string, description?:string, icon?:React.ReactNode, bgColor?:string }) {
  return (
    <div className={`p-5 ${bgColor} border border-gray-200 dark:border-gray-700 rounded-xl shadow hover:shadow-lg transition`}>
      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h4>
      <div className="mt-1 flex items-center justify-between">
        <div>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{value}</p>
          {description && <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{description}</p>}
        </div>
        {icon && <div className="text-indigo-500 dark:text-indigo-400 transform hover:scale-110 transition">{icon}</div>}
      </div>
    </div>
  );
}
