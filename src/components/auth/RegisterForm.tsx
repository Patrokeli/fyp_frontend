import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { X } from 'lucide-react';

type RegisterFormProps = {
  onClose: () => void;
  onSuccess?: () => void;
};

const regions = [
  'Arusha',
  'Dar es Salaam',
  'Dodoma',
  'Mwanza',
  'Mbeya',
  'Morogoro',
  'Tanga',
  'Kilimanjaro',
  'Zanzibar',
  'Other'
];

export function RegisterForm({ onClose, onSuccess }: RegisterFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '+255',
    region: 'Dar es Salaam',
    password: '',
    confirmPassword: ''
  });

  const [error, setError] = useState('');
  const { register, login } = useAuth();

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.startsWith('+255') && value.length <= 13) {
      setFormData({ ...formData, phone: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.phone.length !== 13) {
      setError('Phone number must be in format +255XXXXXXXXX');
      return;
    }

    try {
      await register(
        formData.email,
        formData.password,
        formData.name,
        formData.phone,
        formData.region
      );
      await login(formData.email, formData.password);
      onSuccess?.();
      onClose();
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center px-4 sm:px-6 z-50 overflow-y-auto">
      <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-md relative shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        >
          <X className="h-5 w-5" />
        </button>
        <h2 className="text-xl font-semibold text-gray-900 mb-4 text-center">
          Create Account
        </h2>

        {error && (
          <div className="bg-red-100 border border-red-300 text-red-600 text-sm p-2 rounded mb-3">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { id: 'name', label: 'Full Name', type: 'text' },
            { id: 'email', label: 'Email Address', type: 'email' },
            { id: 'password', label: 'Password', type: 'password' },
            { id: 'confirmPassword', label: 'Confirm Password', type: 'password' },
          ].map(({ id, label, type }) => (
            <div key={id}>
              <label htmlFor={id} className="block text-sm text-gray-700 mb-1">{label}</label>
              <input
                type={type}
                id={id}
                value={formData[id as keyof typeof formData]}
                onChange={e =>
                  setFormData({ ...formData, [id]: e.target.value })
                }
                className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          ))}

          <div>
            <label htmlFor="phone" className="block text-sm text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              value={formData.phone}
              onChange={handlePhoneChange}
              className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              pattern="\+255[0-9]{9}"
              title="Phone number must start with +255 followed by 9 digits"
            />
            <p className="text-xs text-gray-500 mt-1">Format: +255XXXXXXXXX</p>
          </div>

          <div>
            <label htmlFor="region" className="block text-sm text-gray-700 mb-1">
              Region
            </label>
            <select
              id="region"
              value={formData.region}
              onChange={e => setFormData({ ...formData, region: e.target.value })}
              className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              {regions.map(region => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md"
          >
            Register
          </button>
        </form>

        <p className="mt-4 text-center text-xs text-gray-500">
          By registering, you agree to our{' '}
          <a href="#" className="text-blue-500 hover:underline">
            Terms
          </a>{' '}
          &{' '}
          <a href="#" className="text-blue-500 hover:underline">
            Privacy Policy
          </a>.
        </p>
      </div>
    </div>
  );
}
