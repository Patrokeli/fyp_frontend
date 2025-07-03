import React from 'react';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <section className="bg-gradient-to-b from-gray-900 to-gray-800 text-gray-300">
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Logo & Description */}
          <div className="space-y-5">
            <div className="flex items-center space-x-2">
              <span className="text-blue-400 font-bold text-2xl tracking-wide">
                FiberConnect
              </span>
              <span className="text-orange-400 font-bold text-2xl tracking-wide">
                Tanzania
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Empowering Tanzanians with transparent, unbiased fiber internet comparisons and recommendations.
            </p>
            <div className="flex space-x-5 pt-2">
              <a href="#" aria-label="Facebook" className="hover:text-blue-400 transition-colors duration-300 hover:scale-110">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" aria-label="Twitter" className="hover:text-sky-400 transition-colors duration-300 hover:scale-110">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" aria-label="Instagram" className="hover:text-pink-400 transition-colors duration-300 hover:scale-110">
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white border-b border-gray-700 pb-2">Quick Links</h3>
            <ul className="space-y-3.5 text-sm">
              <li><a href="#" className="hover:text-white transition-colors duration-200 flex items-center group">
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                Home</a></li>
              <li><a href="#providers" className="hover:text-white transition-colors duration-200 flex items-center group">
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                Compare Providers</a></li>
              <li><a href="#how-it-works" className="hover:text-white transition-colors duration-200 flex items-center group">
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                How It Works</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors duration-200 flex items-center group">
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                FAQ</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200 flex items-center group">
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                About Us</a></li>
            </ul>
          </div>

          {/* Providers List */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white border-b border-gray-700 pb-2">Providers</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <a href="#" className="hover:text-white transition-colors duration-200 flex items-center group">
                <span className="w-1.5 h-1.5 bg-orange-400 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                Zuku</a>
              <a href="#" className="hover:text-white transition-colors duration-200 flex items-center group">
                <span className="w-1.5 h-1.5 bg-orange-400 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                TTCL</a>
              <a href="#" className="hover:text-white transition-colors duration-200 flex items-center group">
                <span className="w-1.5 h-1.5 bg-orange-400 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                SimbaNet</a>
              <a href="#" className="hover:text-white transition-colors duration-200 flex items-center group">
                <span className="w-1.5 h-1.5 bg-orange-400 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                YAS Fiber</a>
              <a href="#" className="hover:text-white transition-colors duration-200 flex items-center group">
                <span className="w-1.5 h-1.5 bg-orange-400 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                Savannah</a>
              <a href="#" className="hover:text-white transition-colors duration-200 flex items-center group">
                <span className="w-1.5 h-1.5 bg-orange-400 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                Liquid Telecom</a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white border-b border-gray-700 pb-2">Contact Us</h3>
            <div className="space-y-4 text-sm">
              <div className="flex items-start">
                <Mail className="h-5 w-5 mr-3 text-blue-400 mt-0.5 flex-shrink-0" />
                <a href="mailto:info@fiberconnect.tz" className="hover:text-white transition-colors duration-200">info@fiberconnect.tz</a>
              </div>
              <div className="flex items-start">
                <Phone className="h-5 w-5 mr-3 text-blue-400 mt-0.5 flex-shrink-0" />
                <a href="tel:+255700000000" className="hover:text-white transition-colors duration-200">+255 700 000 000</a>
              </div>
              <div className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="hover:text-white transition-colors duration-200">
                    Msasani Peninsula,<br />
                    Dar es Salaam, Tanzania
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-16 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} FiberConnect Tanzania. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-sm hover:text-white transition-colors duration-200 hover:underline">Privacy Policy</a>
            <a href="#" className="text-sm hover:text-white transition-colors duration-200 hover:underline">Terms of Service</a>
            <a href="#" className="text-sm hover:text-white transition-colors duration-200 hover:underline">Cookies</a>
          </div>
        </div>
      </footer>
    </section>
  );
}