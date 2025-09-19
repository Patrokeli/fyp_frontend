import React, { useState, useEffect } from 'react';
import { Mail, Search, ChevronDown, ChevronUp, X, Check, Clock, AlertCircle, Filter } from 'lucide-react';

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

type Provider = {
  id: string;
  name: string;
  email: string;
  phone: string;
};

export function SupportManagement() {
  const [requests, setRequests] = useState<SupportRequest[]>([]);
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterProvider, setFilterProvider] = useState<string>('all');
  const [sortConfig, setSortConfig] = useState<{ key: keyof SupportRequest; direction: 'asc' | 'desc' }>({
    key: 'createdAt',
    direction: 'desc',
  });
  const [showFilters, setShowFilters] = useState(false);

  // Mock data - replace with API calls later
  useEffect(() => {
    setLoading(true);
    try {
      setTimeout(() => {
        // Mock providers data
        const mockProviders: Provider[] = [
          { id: '101', name: 'FiberNet Pro', email: 'support@fibernetpro.com', phone: '+255 789 123 456' },
          { id: '102', name: 'BroadBand Solutions', email: 'help@broadbandsolutions.com', phone: '+255 789 654 321' },
          { id: '103', name: 'ConnectFast', email: 'support@connectfast.co.tz', phone: '+255 788 111 222' },
          { id: '104', name: 'NetBlaze', email: 'info@netblaze.tz', phone: '+255 787 333 444' },
          { id: '105', name: 'TTCL Fiber', email: 'support@ttcl.co.tz', phone: '+255 22 123 4567' },
          { id: '106', name: 'Zuku', email: 'customercare@zuku.co.tz', phone: '+255 763 123 456' },
        ];

        // Mock support requests
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
          {
            id: '5',
            providerId: '105',
            providerName: 'TTCL Fiber',
            userId: 'user5',
            userName: 'Michael Brown',
            userEmail: 'michael@example.com',
            issue: 'Fiber cable damaged in my area',
            status: 'in-progress',
            createdAt: '2023-10-16T08:20:00Z',
            updatedAt: '2023-10-16T14:30:00Z',
          },
          {
            id: '6',
            providerId: '106',
            providerName: 'Zuku',
            userId: 'user6',
            userName: 'Sarah Johnson',
            userEmail: 'sarah@example.com',
            issue: 'Package upgrade request',
            status: 'pending',
            createdAt: '2023-10-15T16:45:00Z',
            updatedAt: '2023-10-15T16:45:00Z',
          },
        ];

        setProviders(mockProviders);
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
    
    // Apply provider filter
    if (filterProvider !== 'all') {
      result = result.filter(request => request.providerId === filterProvider);
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
  }, [sortedRequests, filterStatus, filterProvider, searchTerm]);

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

  const clearFilters = () => {
    setSearchTerm('');
    setFilterStatus('all');
    setFilterProvider('all');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
            <Clock className="h-3 w-3 mr-1" /> Pending
          </span>
        );
      case 'in-progress':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
            <AlertCircle className="h-3 w-3 mr-1" /> In Progress
          </span>
        );
      case 'resolved':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
            <Check className="h-3 w-3 mr-1" /> Resolved
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
            <X className="h-3 w-3 mr-1" /> Rejected
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
            Unknown
          </span>
        );
    }
  };

  const getProviderContact = (providerId: string) => {
    const provider = providers.find(p => p.id === providerId);
    return provider ? { email: provider.email, phone: provider.phone } : null;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 dark:border-indigo-400"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 rounded-lg bg-red-50 border border-red-200 dark:bg-red-900/20 dark:border-red-800">
        <p className="text-red-500 dark:text-red-300">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Support Requests</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Manage customer support requests and provider communications
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
            <input
              type="text"
              placeholder="Search requests..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-8 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            Filters
          </button>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Status
              </label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="resolved">Resolved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Provider
              </label>
              <select
                value={filterProvider}
                onChange={(e) => setFilterProvider(e.target.value)}
                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="all">All Providers</option>
                {providers.map(provider => (
                  <option key={provider.id} value={provider.id}>
                    {provider.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={clearFilters}
                className="px-4 py-2 text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
              >
                Clear All Filters
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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

      {/* Requests Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
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
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {filteredRequests.length > 0 ? (
              filteredRequests.map((request) => {
                const providerContact = getProviderContact(request.providerId);
                return (
                  <tr key={request.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {request.providerName}
                      </div>
                      {providerContact && (
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          <div>{providerContact.email}</div>
                          <div>{providerContact.phone}</div>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{request.userName}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{request.userEmail}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 dark:text-white max-w-xs">
                        {request.issue}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(request.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {new Date(request.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <button className="p-1 text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300">
                          <Mail className="h-4 w-4" />
                        </button>
                        <button className="p-1 text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300">
                          <Check className="h-4 w-4" />
                        </button>
                        <button className="p-1 text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300">
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center">
                  <div className="text-gray-500 dark:text-gray-400">
                    <Mail className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-medium">No support requests found</p>
                    <p className="text-sm mt-1">Try adjusting your filters or search terms</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Provider Contact Summary */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Provider Contact Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {providers.map(provider => (
            <div key={provider.id} className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-white">{provider.name}</h4>
              <div className="mt-2 space-y-1 text-sm text-gray-600 dark:text-gray-400">
                <div>Email: {provider.email}</div>
                <div>Phone: {provider.phone}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}