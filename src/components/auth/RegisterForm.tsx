import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { X, User, ArrowRight } from 'lucide-react';

type RegisterFormProps = {
  onClose: () => void;
  onSuccess?: () => void;
  onSwitchToLogin: () => void;
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
  'Other',
];

export function RegisterForm({ onClose, onSuccess, onSwitchToLogin }: RegisterFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '+255',
    region: 'Dar es Salaam',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
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
    setFieldErrors({});
    const newErrors: { [key: string]: string } = {};

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!/^\+255\d{9}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number must be in format +255XXXXXXXXX';
    }

    if (Object.keys(newErrors).length > 0) {
      setFieldErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
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
    } catch (err: any) {
      // Example Firebase errors; adjust based on your backend
      if (err?.code === 'auth/email-already-in-use') {
        setError('Email is already registered.');
      } else if (err?.code === 'auth/invalid-email') {
        setError('Invalid email address.');
      } else if (err?.code === 'auth/weak-password') {
        setError('Password is too weak. Use at least 6 characters.');
      } else {
        setError(err?.message || 'Registration failed. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
      <div className="bg-white w-full max-w-md rounded-xl shadow-xl p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto transition-all">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close registration form"
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Heading */}
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6 flex items-center justify-center gap-2">
          <User className="h-6 w-6" />
          Create Account
        </h2>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-300 text-red-600 text-sm p-2 rounded mb-4">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { id: 'name', label: 'Full Name', type: 'text' },
            { id: 'email', label: 'Email Address', type: 'email' },
            { id: 'password', label: 'Password', type: 'password' },
            { id: 'confirmPassword', label: 'Confirm Password', type: 'password' },
          ].map(({ id, label, type }) => (
            <div key={id}>
              <label htmlFor={id} className="block text-sm text-gray-700 mb-1">
                {label}
              </label>
              <input
                id={id}
                type={type}
                autoFocus={id === 'name'}
                value={formData[id as keyof typeof formData]}
                onChange={(e) => setFormData({ ...formData, [id]: e.target.value })}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
              />
              {fieldErrors[id] && (
                <p className="text-xs text-red-600 mt-1">{fieldErrors[id]}</p>
              )}
            </div>
          ))}

          {/* Phone Field */}
          <div>
            <label htmlFor="phone" className="block text-sm text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              inputMode="tel"
              id="phone"
              value={formData.phone}
              onChange={handlePhoneChange}
              required
              pattern="\+255[0-9]{9}"
              title="Phone number must start with +255 followed by 9 digits"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
            />
            <p className="text-xs text-gray-500 mt-1">Format: +255XXXXXXXXX</p>
            {fieldErrors.phone && (
              <p className="text-xs text-red-600 mt-1">{fieldErrors.phone}</p>
            )}
          </div>

          {/* Region Select */}
          <div>
            <label htmlFor="region" className="block text-sm text-gray-700 mb-1">
              Region
            </label>
            <select
              id="region"
              value={formData.region}
              onChange={(e) => setFormData({ ...formData, region: e.target.value })}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
            >
              {regions.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full font-semibold py-2 rounded-lg shadow-md transition-colors flex items-center justify-center gap-2 ${
              isSubmitting
                ? 'bg-blue-300 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {isSubmitting ? 'Registering...' : (
              <>
                <span>Register</span>
                <ArrowRight className="h-5 w-5" />
              </>
            )}
          </button>
        </form>

        {/* Terms */}
        <p className="mt-4 text-center text-xs text-gray-500">
          By registering, you agree to our{' '}
          <a href="#" className="text-blue-500 hover:underline">
            Terms
          </a>{' '}
          and{' '}
          <a href="#" className="text-blue-500 hover:underline">
            Privacy Policy
          </a>.
        </p>

        {/* Switch to login */}
        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{' '}
          <span
            onClick={onSwitchToLogin}
            className="text-blue-600 font-medium hover:underline cursor-pointer flex items-center gap-1"
          >
            Login here <ArrowRight className="h-4 w-4" />
          </span>
        </p>
      </div>
    </div>
  );
}
