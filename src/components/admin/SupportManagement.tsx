import React, { useState, useEffect } from 'react';

import { Mail, Search, ChevronDown, ChevronUp, X, Check, Clock, AlertCircle } from 'lucide-react';

type SupportRequest = {
  id: string;
  providerId: string;
  providerName: string;
  userId: string;
  userName: string;
  userEmail: string;
  issue: string;
  status: 'pending' | 'in-progress' | 'resolved' | 'rejected';
  createdAt: string;
  updatedAt: string;
};

export function SupportManagement() {
  const [requests, setRequests] = useState<SupportRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [sortConfig, setSortConfig] = useState<{ key: keyof SupportRequest; direction: 'asc' | 'desc' }>({
    key: 'createdAt',
    direction: 'desc',
  });

  // Mock data - replace with API call later
  useEffect(() => {
    setLoading(true);
    try {
      setTimeout(() => {
        const mockRequests: SupportRequest[] = [
          {
            id: '1',
            providerId: '101',
            providerName: 'FiberNet Pro',
            userId: 'user1',
            userName: 'John Doe',
            userEmail: 'john@example.com',
            issue: 'No internet connection since yesterday',
            status: 'pending',
            createdAt: '2023-10-15T09:30:00Z',
            updatedAt: '2023-10-15T09:30:00Z',
          },
          {
            id: '2',
            providerId: '102',
            providerName: 'BroadBand Solutions',
            userId: 'user2',
            userName: 'Jane Smith',
            userEmail: 'jane@example.com',
            issue: 'Slow speeds during peak hours',
            status: 'in-progress',
            createdAt: '2023-10-14T14:45:00Z',
            updatedAt: '2023-10-15T10:20:00Z',
          },
          {
            id: '3',
            providerId: '103',
            providerName: 'ConnectFast',
            userId: 'user3',
            userName: 'Robert Johnson',
            userEmail: 'robert@example.com',
            issue: 'Billing discrepancy',
            status: 'resolved',
            createdAt: '2023-10-12T11:20:00Z',
            updatedAt: '2023-10-14T16:30:00Z',
          },
          {
            id: '4',
            providerId: '101',
            providerName: 'FiberNet Pro',
            userId: 'user4',
            userName: 'Alice Williams',
            userEmail: 'alice@example.com',
            issue: 'Router configuration help needed',
            status: 'rejected',
            createdAt: '2023-10-10T16:15:00Z',
            updatedAt: '2023-10-11T09:45:00Z',
          },
        ];
        setRequests(mockRequests);
        setLoading(false);
      }, 800);
    } catch (err) {
      setError('Failed to load support requests');
      setLoading(false);
    }
  }, []);

  const sortedRequests = React.useMemo(() => {
    let sortableItems = [...requests];
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
  }, [requests, sortConfig]);

  const filteredRequests = React.useMemo(() => {
    let result = sortedRequests;
    
    // Apply status filter
    if (filterStatus !== 'all') {
      result = result.filter(request => request.status === filterStatus);
    }
    
    // Apply search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        request =>
          request.providerName.toLowerCase().includes(term) ||
          request.userName.toLowerCase().includes(term) ||
          request.userEmail.toLowerCase().includes(term) ||
          request.issue.toLowerCase().includes(term)
      );
    }
    
    return result;
  }, [sortedRequests, filterStatus, searchTerm]);

  const requestSort = (key: keyof SupportRequest) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key: keyof SupportRequest) => {
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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <Clock className="h-3 w-3 mr-1" /> Pending
          </span>
        );
      case 'in-progress':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <AlertCircle className="h-3 w-3 mr-1" /> In Progress
          </span>
        );
      case 'resolved':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <Check className="h-3 w-3 mr-1" /> Resolved
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <X className="h-3 w-3 mr-1" /> Rejected
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            Unknown
          </span>
        );
    }
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
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Support Requests</h2>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search requests..."
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
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full sm:w-40 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="resolved">Resolved</option>
            <option value="rejected">Rejected</option>
          </select>
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
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
              >
                Issue
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort('status')}
              >
                <div className="flex items-center">
                  Status
                  {getSortIcon('status')}
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort('createdAt')}
              >
                <div className="flex items-center">
                  Created
                  {getSortIcon('createdAt')}
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort('updatedAt')}
              >
                <div className="flex items-center">
                  Updated
                  {getSortIcon('updatedAt')}
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
            {filteredRequests.length > 0 ? (
              filteredRequests.map((request) => (
                <tr key={request.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {request.providerName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">{request.userName}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{request.userEmail}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400 max-w-xs">
                    <div className="line-clamp-2">{request.issue}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(request.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {new Date(request.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {new Date(request.updatedAt).toLocaleDateString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                  No support requests found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Stats summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Requests</h3>
          <p className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">
            {requests.length}
          </p>
        </div>
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Pending</h3>
          <p className="mt-1 text-2xl font-semibold text-yellow-600 dark:text-yellow-400">
            {requests.filter(r => r.status === 'pending').length}
          </p>
        </div>
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">In Progress</h3>
          <p className="mt-1 text-2xl font-semibold text-blue-600 dark:text-blue-400">
            {requests.filter(r => r.status === 'in-progress').length}
          </p>
        </div>
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Resolved</h3>
          <p className="mt-1 text-2xl font-semibold text-green-600 dark:text-green-400">
            {requests.filter(r => r.status === 'resolved').length}
          </p>
        </div>
      </div>
    </div>
  );
}