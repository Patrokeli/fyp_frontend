import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { LogIn, X } from 'lucide-react';

type LoginFormProps = {
  onClose: () => void;
  onSuccess?: () => void;
};

export function LoginForm({ onClose, onSuccess }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agree) {
      setError('You must agree to the Terms & Privacy');
      return;
    }
    try {
      await login(email, password);
      onSuccess?.();
      onClose();
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 w-full max-w-md relative shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="h-6 w-6" />
        </button>
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Login</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="text-sm text-gray-600">
              Email address
            </label>
            <input
              id="email"
              type="email"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="text-sm text-gray-600">
              Password
              <a href="#" className="float-right text-blue-500 text-xs hover:underline">
                Forgot password?
              </a>
            </label>
            <input
              id="password"
              type="password"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <input
              type="checkbox"
              checked={agree}
              onChange={() => setAgree(!agree)}
              className="form-checkbox"
            />
            <label htmlFor="agree" className="text-gray-600">
              I agree to the{' '}
              <a href="#" className="text-blue-600 hover:underline">
                Terms & Privacy
              </a>
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md flex items-center justify-center"
          >
            <LogIn className="h-5 w-5 mr-2" />
            Login
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-6">
          Have an account?{' '}
          <a href="#" className="text-blue-600 font-medium hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}
