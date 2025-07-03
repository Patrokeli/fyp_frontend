import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { LogIn, X, User } from 'lucide-react';

type LoginFormProps = {
  onClose: () => void;
  onSuccess?: () => void;
  onSwitchToRegister: () => void;
};

export function LoginForm({ onClose, onSuccess, onSwitchToRegister }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agree, setAgree] = useState(false);

  // Separate error states
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [agreeError, setAgreeError] = useState('');
  const [loginError, setLoginError] = useState(''); // for login failure message

  const navigate = useNavigate();
  const { login } = useAuth();

  const clearErrors = () => {
    setEmailError('');
    setPasswordError('');
    setAgreeError('');
    setLoginError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearErrors();

    let hasError = false;

    if (!agree) {
      setAgreeError('You must agree to the Terms & Privacy');
      hasError = true;
    }
    if (!email) {
      setEmailError('Email is required');
      hasError = true;
    }
    if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters long');
      hasError = true;
    }

    if (hasError) return;

    try {
      await login(email, password);
      onSuccess?.();
      onClose();
      navigate('/dashboard');
    } catch {
      setLoginError('Invalid email or password');
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
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          aria-label="Close login form"
        >
          <X className="h-6 w-6" />
        </button>

        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6 flex items-center justify-center gap-2">
          <User className="h-6 w-6" />
          Welcome Back
        </h2>

        {/* Login failure error */}
        {loginError && (
          <div
            role="alert"
            className="bg-red-100 text-red-700 text-sm px-4 py-2 rounded mb-4 text-center"
          >
            {loginError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          <div>
            <label htmlFor="email" className="block text-sm text-gray-700 mb-1">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none shadow-sm ${
                emailError ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
              }`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-describedby="email-error"
              required
            />
            {emailError && (
              <p id="email-error" className="text-red-600 text-sm mt-1">
                {emailError}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm text-gray-700 mb-1">
              Password (min 8 characters)
            </label>
            <input
              id="password"
              type="password"
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none shadow-sm ${
                passwordError ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
              }`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              aria-describedby="password-error"
              required
              minLength={8}
            />
            {passwordError && (
              <p id="password-error" className="text-red-600 text-sm mt-1">
                {passwordError}
              </p>
            )}
          </div>

          <div className="flex items-center space-x-2 text-sm">
            <input
              type="checkbox"
              checked={agree}
              onChange={() => setAgree(!agree)}
              className={`form-checkbox h-4 w-4 text-blue-600 ${
                agreeError ? 'border-red-500' : ''
              }`}
              id="agree"
              aria-describedby="agree-error"
            />
            <label htmlFor="agree" className="text-gray-600 select-none cursor-pointer">
              I agree to the{' '}
              <a href="#" className="text-blue-600 hover:underline">
                Terms & Privacy
              </a>
            </label>
          </div>
          {agreeError && (
            <p id="agree-error" className="text-red-600 text-sm mt-1 ml-6">
              {agreeError}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition-colors text-white font-semibold py-2 rounded-lg flex items-center justify-center shadow-md gap-2"
          >
            <LogIn className="h-5 w-5" />
            <span>Login</span>
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Don't have an account?{' '}
          <span
            onClick={onSwitchToRegister}
            className="text-blue-600 font-medium hover:underline cursor-pointer"
          >
            Create one
          </span>
        </p>
      </div>
    </div>
  );
}
