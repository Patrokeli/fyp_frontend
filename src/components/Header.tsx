// components/Header.tsx

import React, { useState } from 'react';
import { Menu, X, ChevronDown, LogIn, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

type HeaderProps = {
  onRegisterClick: () => void;
  onLoginClick: () => void;
};

export function Header({ onRegisterClick, onLoginClick }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-blue-600 font-bold text-xl">FiberConnect</span>
            <span className="text-orange-500 font-bold text-xl">Tanzania</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 items-center">
            <a href="#" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">Home</a>
            <a href="#providers" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">Compare Providers</a>

            <div className="relative group">
              <button className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium inline-flex items-center">
                Services
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 hidden group-hover:block">
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Fiber Internet</a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Installation</a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Support</a>
              </div>
            </div>

            <a href="#how-it-works" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">How It Works</a>
            <a href="#faq" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">FAQ</a>
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-gray-700">Welcome, {user.name}</span>
                <button onClick={logout} className="flex items-center text-gray-600 hover:text-gray-900">
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <button onClick={onLoginClick} className="text-gray-600 hover:text-gray-900 flex items-center">
                  <LogIn className="h-4 w-4 mr-2" />
                  Login
                </button>
                <button
                  onClick={onRegisterClick}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  Register Now
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md">Home</a>
            <a href="#providers" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md">Compare Providers</a>
            <a href="#" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md">Services</a>
            <a href="#how-it-works" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md">How It Works</a>
            <a href="#faq" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md">FAQ</a>

            {user ? (
              <button onClick={logout} className="w-full flex items-center px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md">
                <LogOut className="h-5 w-5 mr-2" />
                Logout ({user.name})
              </button>
            ) : (
              <div className="space-y-2">
                <button onClick={onLoginClick} className="w-full flex items-center px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md">
                  <LogIn className="h-5 w-5 mr-2" />
                  Login
                </button>
                <button
                  onClick={onRegisterClick}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  Register Now
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
