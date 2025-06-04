import { useState, useEffect } from 'react';
import { User, Mail, Phone, MapPin, Shield, ShieldOff, Trash, Plus, Edit3, X, Search } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

// Define UserType with nullable fields
type UserType = {
  id: string;
  name: string | null;
  email: string;
  phone: string | null;
  region: string | null;
  role: 'admin' | 'user' | null;
  created_at: string;
};

// List of regions from the database
const regions = [
  'Arusha', 'Dar es Salaam', 'Dodoma', 'Mwanza', 'Mbeya', 'Morogoro', 'Tanga', 'Kilimanjaro', 'Zanzibar', 'Other'
];

export function UserManagement() {
  const [users, setUsers] = useState<UserType[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  // For create form visibility and data
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    region: '',
    role: 'user' as 'admin' | 'user',
  });

  // For edit form visibility and data
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [editUserData, setEditUserData] = useState<Partial<UserType>>({});

  const { user: currentUser } = useAuth();

  // Clear success message after 3 seconds
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  // Fetch users on mount
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://127.0.0.1:8000/api/admin/customers', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) throw new Error('Failed to fetch users');
      const data = await response.json();
      console.log('Fetched users:', data);
      const validUsers = Array.isArray(data) ? data : [];
      setUsers(validUsers);
      setFilteredUsers(validUsers);
      setError('');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Filter users based on search term with null checks
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredUsers(users);
    } else {
      const term = searchTerm.toLowerCase();
      const filtered = users.filter(user =>
        (user.name?.toLowerCase() || '').includes(term) ||
        (user.email?.toLowerCase() || '').includes(term) ||
        (user.phone?.toLowerCase() || '').includes(term) ||
        (user.region?.toLowerCase() || '').includes(term) ||
        (user.role?.toLowerCase() || '').includes(term)
      );
      setFilteredUsers(filtered);
    }
  }, [searchTerm, users]);

  // Validate phone number format (+255 followed by 9 digits)
  const validatePhoneNumber = (phone: string): boolean => {
    const phoneRegex = /^\+255\d{9}$/;
    return phoneRegex.test(phone);
  };

  // Validate create user form
  const validateCreateForm = () => {
    const errors: { [key: string]: string } = {};
    if (!newUser.name.trim()) errors.name = 'This field is required';
    if (!newUser.email.trim()) errors.email = 'This field is required';
    else if (!/\S+@\S+\.\S+/.test(newUser.email)) errors.email = 'Invalid email format';
    if (!newUser.password.trim()) errors.password = 'This field is required';
    else if (newUser.password.length < 6) errors.password = 'Password must be at least 6 characters';
    if (newUser.phone && !validatePhoneNumber(newUser.phone)) {
      errors.phone = 'Phone number must be +255 followed by 9 digits';
    }
    setFormErrors(errors);
    console.log('Validation errors:', errors);
    return Object.keys(errors).length === 0;
  };

  // Create new user
  const createUser = async () => {
    console.log('Submitting state before validation:', submitting);
    if (!validateCreateForm()) {
      console.log('Validation failed, form errors:', formErrors);
      return;
    }
    setSubmitting(true);
    console.log('Submitting set to true');
    try {
      const response = await fetch('http://127.0.0.1:8000/api/admin/customers', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        const data = await response.json();
        console.error('Create user error:', data);
        if (data.errors) {
          const backendErrors: { [key: string]: string } = {};
          if (data.errors.email) backendErrors.email = data.errors.email[0] || 'Email is invalid or already taken';
          if (data.errors.password) backendErrors.password = data.errors.password[0] || 'Password is invalid';
          if (data.errors.phone) backendErrors.phone = data.errors.phone[0] || 'Invalid phone number format';
          if (data.errors.region) backendErrors.region = data.errors.region[0] || 'Invalid region';
          setFormErrors(backendErrors);
        }
        throw new Error(data.message || 'Failed to create user');
      }

      const created = await response.json();
      setUsers([created, ...users]);
      setNewUser({ name: '', email: '', password: '', phone: '', region: '', role: 'user' });
      setShowCreateForm(false);
      setSuccessMessage('User created successfully');
      setFormErrors({});
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(false);
      console.log('Submitting set to false');
    }
  };

  // Toggle role admin/user
  const toggleUserRole = async (userId: string, currentRole: 'admin' | 'user' | null) => {
    try {
      setSubmitting(true);
      const response = await fetch(`http://127.0.0.1:8000/api/admin/customers/${userId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          role: currentRole === 'admin' ? 'user' : 'admin',
        }),
      });

      if (!response.ok) throw new Error('Failed to update user role');

      setUsers(users.map(user =>
        user.id === userId
          ? { ...user, role: currentRole === 'admin' ? 'user' : 'admin' }
          : user
      ));
      setSuccessMessage('User role updated successfully');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  // Delete user
  const deleteUser = async (userId: string) => {
    if (!window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) return;

    try {
      setSubmitting(true);
      const response = await fetch(`http://127.0.0.1:8000/api/admin/customers/${userId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) throw new Error('Failed to delete user');
      setUsers(users.filter(user => user.id !== userId));
      setSuccessMessage('User deleted successfully');
      if (editingUserId === userId) {
        setEditingUserId(null);
        setEditUserData({});
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  // Start editing a user
  const startEditing = (user: UserType) => {
    setEditingUserId(user.id);
    setEditUserData({
      name: user.name || '',
      email: user.email,
      phone: user.phone || '',
      region: user.region || '',
      role: user.role || 'user',
    });
    setShowCreateForm(false);
    setError('');
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditingUserId(null);
    setEditUserData({});
    setError('');
  };

  // Submit edited user
  const submitEdit = async () => {
    if (!editingUserId) return;

    setSubmitting(true);
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/admin/customers/${editingUserId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editUserData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to update user');
      }

      const updatedUser = await response.json();
      setUsers(users.map(user => (user.id === editingUserId ? updatedUser : user)));
      setEditingUserId(null);
      setEditUserData({});
      setSuccessMessage('User updated successfully');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  // Cancel create form
  const cancelCreate = () => {
    setShowCreateForm(false);
    setNewUser({ name: '', email: '', password: '', phone: '', region: '', role: 'user' });
    setError('');
    setFormErrors({});
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">User Management</h2>
        {!showCreateForm && editingUserId === null && (
          <button
            onClick={() => setShowCreateForm(true)}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create New User
          </button>
        )}
      </div>

      {/* Status messages */}
      {error && (
        <div className="mb-4 p-3 bg-red-100 border-l-4 border-red-500 text-red-700 rounded">
          <p>{error}</p>
        </div>
      )}
      {successMessage && (
        <div className="mb-4 p-3 bg-green-100 border-l-4 border-green-500 text-green-700 rounded">
          <p>{successMessage}</p>
        </div>
      )}

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search users by name, email, phone, region or role"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
      </div>

      {/* Create User Form */}
      {showCreateForm && (
        <div className="mb-6 bg-gray-50 p-5 rounded-lg border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-700 flex items-center">
              <Plus className="w-5 h-5 mr-2 text-blue-600" /> Add New User
            </h3>
            <button
              onClick={cancelCreate}
              className="text-gray-500 hover:text-gray-700"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                placeholder="John Doe"
                value={newUser.name}
                onChange={e => setNewUser({ ...newUser, name: e.target.value })}
                className={`w-full border ${formErrors.name ? 'border-red-500' : 'border-gray-300'} px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {formErrors.name && <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                placeholder="john@example.com"
                value={newUser.email}
                onChange={e => setNewUser({ ...newUser, email: e.target.value })}
                className={`w-full border ${formErrors.email ? 'border-red-500' : 'border-gray-300'} px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={newUser.password}
                onChange={e => setNewUser({ ...newUser, password: e.target.value })}
                className={`w-full border ${formErrors.password ? 'border-red-500' : 'border-gray-300'} px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {formErrors.password && <p className="text-red-500 text-xs mt-1">{formErrors.password}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone (optional)</label>
              <input
                type="text"
                placeholder="+255123456789"
                value={newUser.phone}
                onChange={e => setNewUser({ ...newUser, phone: e.target.value })}
                className={`w-full border ${formErrors.phone ? 'border-red-500' : 'border-gray-300'} px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {formErrors.phone && <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Region (optional)</label>
              <select
                value={newUser.region}
                onChange={e => setNewUser({ ...newUser, region: e.target.value })}
                className={`w-full border ${formErrors.region ? 'border-red-500' : 'border-gray-300'} px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              >
                <option value="">Select a region</option>
                {regions.map(region => (
                  <option key={region} value={region}>{region}</option>
                ))}
              </select>
              {formErrors.region && <p className="text-red-500 text-xs mt-1">{formErrors.region}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
              <select
                value={newUser.role}
                onChange={e => setNewUser({ ...newUser, role: e.target.value as 'admin' | 'user' })}
                className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end space-x-3">
            <button
              onClick={cancelCreate}
              disabled={submitting}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={createUser}
              disabled={submitting}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center"
            >
              {submitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating...
                </>
              ) : (
                'Create User'
              )}
            </button>
          </div>
        </div>
      )}

      {/* Edit User Form */}
      {editingUserId && (
        <div className="mb-6 bg-gray-50 p-5 rounded-lg border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-700 flex items-center">
              <Edit3 className="w-5 h-5 mr-2 text-blue-600" /> Edit User
            </h3>
            <button
              onClick={cancelEditing}
              className="text-gray-500 hover:text-gray-700"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                placeholder="John Doe"
                value={editUserData.name || ''}
                onChange={e => setEditUserData({ ...editUserData, name: e.target.value })}
                className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                placeholder="john@example.com"
                value={editUserData.email || ''}
                onChange={e => setEditUserData({ ...editUserData, email: e.target.value })}
                className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone (optional)</label>
              <input
                type="text"
                placeholder="+255123456789"
                value={editUserData.phone || ''}
                onChange={e => setEditUserData({ ...editUserData, phone: e.target.value })}
                className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Region (optional)</label>
              <select
                value={editUserData.region || ''}
                onChange={e => setEditUserData({ ...editUserData, region: e.target.value })}
                className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select a region</option>
                {regions.map(region => (
                  <option key={region} value={region}>{region}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
              <select
                value={editUserData.role || 'user'}
                onChange={e => setEditUserData({ ...editUserData, role: e.target.value as 'admin' | 'user' })}
                className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end space-x-3">
            <button
              onClick={cancelEditing}
              disabled={submitting}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={submitEdit}
              disabled={submitting}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center"
            >
              {submitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Updating...
                </>
              ) : (
                'Update User'
              )}
            </button>
          </div>
        </div>
      )}

      {/* Users Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        {loading ? (
          <div className="p-8 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
            <p className="mt-2 text-gray-600">Loading users...</p>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-600">
              {searchTerm ? 'No users match your search.' : 'No users found.'}
            </p>
          </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Region
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map(user => {
                const isCurrentUser = currentUser?.id === user.id;
                return (
                  <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <User className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{user.name || 'N/A'}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{user.phone || 'N/A'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 text-gray-500 mr-1" />
                        <span className="text-sm text-gray-900">{user.region || 'N/A'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        disabled={isCurrentUser || submitting || !user.role}
                        onClick={() => user.role && toggleUserRole(user.id, user.role)}
                        title={isCurrentUser ? "You can't change your own role" : !user.role ? 'No role assigned' : 'Toggle Role'}
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          user.role === 'admin'
                            ? 'bg-green-100 text-green-800 hover:bg-green-200'
                            : user.role === 'user'
                            ? 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                            : 'bg-gray-100 text-gray-500 cursor-not-allowed'
                        } transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
                      >
                        {user.role === 'admin' ? (
                          <>
                            <Shield className="w-3 h-3 mr-1" /> Admin
                          </>
                        ) : user.role === 'user' ? (
                          <>
                            <ShieldOff className="w-3 h-3 mr-1" /> User
                          </>
                        ) : (
                          'No Role'
                        )}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(user.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => startEditing(user)}
                          disabled={submitting}
                          title="Edit User"
                          className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50 transition-colors disabled:opacity-50"
                        >
                          <Edit3 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => deleteUser(user.id)}
                          disabled={submitting || isCurrentUser}
                          title={isCurrentUser ? "You can't delete yourself" : 'Delete User'}
                          className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50 transition-colors disabled:opacity-50"
                        >
                          <Trash className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}