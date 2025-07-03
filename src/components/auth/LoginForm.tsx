import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { LogIn, X, User, AlertCircle } from 'lucide-react';

type LoginFormProps = {
  onClose: () => void;
  onSuccess?: () => void;
  onSwitchToRegister: () => void;
};

export function LoginForm({ onClose, onSuccess, onSwitchToRegister }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [agreeError, setAgreeError] = useState('');
  const [loginError, setLoginError] = useState('');

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  // Refs for inputs to manage focus
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const agreeRef = useRef<HTMLInputElement>(null);

  // Clear all error messages
  const clearErrors = () => {
    setEmailError('');
    setPasswordError('');
    setAgreeError('');
    setLoginError('');
  };

  // Reset form fields and errors (called on switching to register)
  const resetForm = () => {
    setEmail('');
    setPassword('');
    setAgree(false);
    clearErrors();
    setShowPassword(false);
  };

  // On switch to register, reset form and call prop handler
  const handleSwitchToRegister = () => {
    resetForm();
    onSwitchToRegister();
  };

  // Simple email format validation regex
  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
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
    } else if (!isValidEmail(email)) {
      setEmailError('Please enter a valid email address');
      hasError = true;
    }
    if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters long');
      hasError = true;
    }

    // Focus the first invalid field
    if (hasError) {
      if (emailError || !email || !isValidEmail(email)) {
        emailRef.current?.focus();
      } else if (passwordError || password.length < 8) {
        passwordRef.current?.focus();
      } else if (agreeError || !agree) {
        agreeRef.current?.focus();
      }
      return;
    }

    setLoading(true);
    try {
      await login(email, password);
      onSuccess?.();
      onClose();
      navigate('/dashboard');
    } catch {
      setLoginError('Invalid email or password');
      // Focus email field on login error
      emailRef.current?.focus();
    } finally {
      setLoading(false);
    }
  };

  // Focus email input on mount
  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  // Close modal on Escape key
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
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
          aria-label="Close login form"
          disabled={loading}
        >
          <X className="h-6 w-6" />
        </button>

        <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-6 flex items-center justify-center gap-2">
          <User className="h-7 w-7 text-blue-600" />
          Welcome Back
        </h2>

        {loginError && (
          <div
            role="alert"
            aria-live="assertive"
            className="bg-red-100 border border-red-400 text-red-700 text-sm px-4 py-3 rounded mb-5 flex items-center gap-2 justify-center font-semibold"
          >
            <AlertCircle className="w-5 h-5" />
            {loginError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              ref={emailRef}
              id="email"
              type="email"
              className={`w-full px-4 py-3 border rounded-lg shadow-sm transition focus:outline-none focus:ring-2 ${
                emailError ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
              }`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-describedby="email-error"
              required
              autoComplete="email"
              disabled={loading}
              autoFocus
            />
            {emailError && (
              <p id="email-error" className="text-red-600 text-sm mt-1 font-medium" aria-live="assertive">
                {emailError}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password (min 8 characters)
            </label>
            <div className="relative">
              <input
                ref={passwordRef}
                id="password"
                type={showPassword ? 'text' : 'password'}
                className={`w-full px-4 py-3 border rounded-lg shadow-sm transition focus:outline-none focus:ring-2 ${
                  passwordError ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                }`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-describedby="password-error"
                required
                minLength={8}
                autoComplete="current-password"
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                className="absolute right-3 top-3 text-gray-500 hover:text-gray-700 focus:outline-none"
                tabIndex={-1}
                disabled={loading}
              >
                {showPassword ? (
                  <span role="img" aria-hidden="true">
                    🙈
                  </span>
                ) : (
                  <span role="img" aria-hidden="true">
                    👁️
                  </span>
                )}
              </button>
            </div>
            {passwordError && (
              <p id="password-error" className="text-red-600 text-sm mt-1 font-medium" aria-live="assertive">
                {passwordError}
              </p>
            )}
          </div>

          <div className="flex items-center space-x-3">
            <input
              ref={agreeRef}
              type="checkbox"
              checked={agree}
              onChange={() => setAgree(!agree)}
              className={`h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 ${
                agreeError ? 'border-red-500' : ''
              }`}
              id="agree"
              aria-describedby="agree-error"
              disabled={loading}
            />
            <label htmlFor="agree" className="text-gray-700 select-none cursor-pointer text-sm">
              I agree to the{' '}
              <a
                href="https://yourdomain.com/terms-privacy"
                className="text-blue-600 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Terms & Privacy
              </a>
            </label>
          </div>
          {agreeError && (
            <p id="agree-error" className="text-red-600 text-sm mt-1 ml-8 font-medium" aria-live="assertive">
              {agreeError}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-600 hover:bg-blue-700 transition-colors text-white font-semibold py-3 rounded-lg flex items-center justify-center shadow-md gap-3 ${
              loading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            <LogIn className="h-5 w-5" />
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
                <span>Logging in...</span>
              </>
            ) : (
              'Login'
            )}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-8">
          Don't have an account?{' '}
          <span
            onClick={handleSwitchToRegister}
            className="text-blue-600 font-semibold hover:underline cursor-pointer"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleSwitchToRegister();
              }
            }}
          >
            Create one
          </span>
        </p>
      </div>
    </div>
  );
}
