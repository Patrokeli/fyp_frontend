import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Trash, Edit } from 'lucide-react';
type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  provider: string;
  plan: string;
  status: 'active' | 'pending' | 'inactive';
};
export function CustomerManagement() {
  const [customers, setCustomers] = useState<Customer[]>([{
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+255 123 456 789',
    location: 'Dar es Salaam',
    provider: 'Zuku',
    plan: '30 Mbps',
    status: 'active'
  }, {
    id: '2',
    name: 'Sarah Smith',
    email: 'sarah.smith@example.com',
    phone: '+255 987 654 321',
    location: 'Arusha',
    provider: 'TTCL',
    plan: '50 Mbps',
    status: 'pending'
  }
  // Add more sample customers as needed
  ]);
  const getStatusBadgeColor = (status: Customer['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'inactive':
        return 'bg-red-100 text-red-800';
    }
  };
  return <div className="bg-white shadow rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Manage Customers</h2>
        <div className="flex space-x-2">
          <input type="text" placeholder="Search customers..." className="px-4 py-2 border rounded-md" />
          <select className="px-4 py-2 border rounded-md">
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contact
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Service Details
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {customers.map(customer => <tr key={customer.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <User className="h-6 w-6 text-gray-500" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {customer.name}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-1" />
                      {customer.email}
                    </div>
                    <div className="flex items-center mt-1">
                      <Phone className="h-4 w-4 mr-1" />
                      {customer.phone}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center text-sm text-gray-900">
                    <MapPin className="h-4 w-4 mr-1" />
                    {customer.location}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {customer.provider}
                  </div>
                  <div className="text-sm text-gray-500">{customer.plan}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeColor(customer.status)}`}>
                    {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900 mr-3">
                    <Edit className="h-5 w-5" />
                  </button>
                  <button className="text-red-600 hover:text-red-900">
                    <Trash className="h-5 w-5" />
                  </button>
                </td>
              </tr>)}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <div className="text-sm text-gray-700">
          Showing {customers.length} customers
        </div>
        <div className="flex space-x-2">
          <button className="px-4 py-2 border rounded-md text-sm">
            Previous
          </button>
          <button className="px-4 py-2 border rounded-md text-sm">Next</button>
        </div>
      </div>
    </div>;
}