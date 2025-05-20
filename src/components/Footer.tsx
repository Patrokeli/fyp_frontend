import React from 'react';
import { Facebook, Twitter, Instagram, Mail, Phone } from 'lucide-react';
export function Footer() {
  return <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <span className="text-blue-400 font-bold text-xl">
                FiberConnect
              </span>
              <span className="text-orange-400 font-bold text-xl">
                Tanzania
              </span>
            </div>
            <p className="text-gray-300 mb-4">
              Helping Tanzanians find the best fiber internet providers and
              plans for their needs.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Home
                </a>
              </li>
              <li>
                <a href="#providers" className="text-gray-300 hover:text-white">
                  Compare Providers
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="text-gray-300 hover:text-white">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#faq" className="text-gray-300 hover:text-white">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  About Us
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Providers</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Zuku
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  TTCL
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  SimbaNet
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  YAS Fiber
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Savannah
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Liquid Telecom
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-gray-300" />
                <a href="mailto:info@fiberconnect.tz" className="text-gray-300 hover:text-white">
                  info@fiberconnect.tz
                </a>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-gray-300" />
                <a href="tel:+255700000000" className="text-gray-300 hover:text-white">
                  +255 700 000 000
                </a>
              </div>
              <p className="text-gray-300">
                Msasani Peninsula,
                <br />
                Dar es Salaam, Tanzania
              </p>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300 text-sm">
            © {new Date().getFullYear()} FiberConnect Tanzania. All rights
            reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-sm text-gray-300 hover:text-white">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-gray-300 hover:text-white">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>;
}