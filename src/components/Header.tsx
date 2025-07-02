import React, { useState, useRef, useEffect } from 'react';
import { Menu, X, ChevronDown, LogIn, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

type HeaderProps = {
  onRegisterClick: () => void;
  onLoginClick: () => void;
};

export function Header({ onRegisterClick, onLoginClick }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user, logout } = useAuth();

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLinkClick = () => setIsMenuOpen(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-1 text-2xl font-extrabold cursor-pointer">
            <span className="text-blue-700">FiberConnect</span>
            <span className="text-orange-500">Tanzania</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6 items-center text-[15px] font-medium">
            <a href="#" className="text-gray-700 hover:text-blue-600 transition">Home</a>
            <a href="#providers" className="text-gray-700 hover:text-blue-600 transition">Compare Providers</a>

            <div className="relative" ref={dropdownRef}>
              <button
                className="inline-flex items-center text-gray-700 hover:text-blue-600 transition"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                aria-haspopup="true"
                aria-expanded={isDropdownOpen}
              >
                Services
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              {isDropdownOpen && (
                <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 z-20">
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Fiber Internet</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Installation</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Support</a>
                </div>
              )}
            </div>

            <a href="#how-it-works" className="text-gray-700 hover:text-blue-600 transition">How It Works</a>
            <a href="#faq" className="text-gray-700 hover:text-blue-600 transition">FAQ</a>
          </nav>

          {/* Auth Buttons - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-gray-700">Hi, <span className="font-semibold">{user.name}</span></span>
                <button onClick={logout} className="flex items-center text-gray-600 hover:text-red-600 transition">
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <button onClick={onLoginClick} className="text-gray-600 hover:text-blue-600 transition flex items-center">
                  <LogIn className="h-4 w-4 mr-2" />
                  Login
                </button>
                <button
                  onClick={onRegisterClick}
                  className="bg-blue-600 hover:bg-blue-700 transition text-white px-4 py-2 rounded-md text-sm font-medium shadow-md"
                >
                  Register Now
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-500 hover:text-blue-600 hover:bg-gray-100 transition"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden animate-slide-down origin-top bg-white shadow-md z-40">
          <div className="px-4 pt-4 pb-4 space-y-2">
            <a onClick={handleLinkClick} href="#" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md">Home</a>
            <a onClick={handleLinkClick} href="#providers" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md">Compare Providers</a>

            {/* Nested Mobile Services */}
            <div>
              <p className="text-sm font-semibold text-gray-500 px-3 pt-2">Services</p>
              <a onClick={handleLinkClick} href="#" className="block px-5 py-2 text-gray-700 hover:bg-gray-100 rounded-md text-sm">Fiber Internet</a>
              <a onClick={handleLinkClick} href="#" className="block px-5 py-2 text-gray-700 hover:bg-gray-100 rounded-md text-sm">Installation</a>
              <a onClick={handleLinkClick} href="#" className="block px-5 py-2 text-gray-700 hover:bg-gray-100 rounded-md text-sm">Support</a>
            </div>

            <a onClick={handleLinkClick} href="#how-it-works" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md">How It Works</a>
            <a onClick={handleLinkClick} href="#faq" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md">FAQ</a>

            {user ? (
              <button
                onClick={() => {
                  logout();
                  setIsMenuOpen(false);
                }}
                className="w-full flex items-center px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md"
              >
                <LogOut className="h-5 w-5 mr-2" />
                Logout ({user.name})
              </button>
            ) : (
              <div className="space-y-2">
                <button
                  onClick={() => {
                    onLoginClick();
                    setIsMenuOpen(false);
                  }}
                  className="w-full flex items-center px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  <LogIn className="h-5 w-5 mr-2" />
                  Login
                </button>
                <button
                  onClick={() => {
                    onRegisterClick();
                    setIsMenuOpen(false);
                  }}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium shadow-md"
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
