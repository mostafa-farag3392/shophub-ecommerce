import React from 'react';
import { ShoppingCart, Mail, Phone, MapPin, Clock, Facebook, Twitter, Instagram } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { CONTACT_INFO, APP_CONFIG } from '../../utils/constants';

const Footer = ({ setCurrentPage }) => {
  const { isDarkMode } = useAppContext();

  const quickLinks = [
    { id: 'home', label: 'Home' },
    { id: 'shop', label: 'Shop' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact' },
  ];

  const customerServiceLinks = [
    'Help Center',
    'Shipping Info',
    'Returns & Exchanges',
    'Size Guide',
    'FAQ',
  ];

  const categories = [
    "Electronics",
    "Clothing",
    "Jewelry",
    "Home & Garden",
    "Sports",
  ];

  const socialLinks = [
    { icon: Facebook, label: 'Facebook', href: '#' },
    { icon: Twitter, label: 'Twitter', href: '#' },
    { icon: Instagram, label: 'Instagram', href: '#' },
  ];

  const handleNavClick = (pageId) => {
    setCurrentPage(pageId);
    // Smooth scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={`${
      isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-900 text-white'
    } transition-colors duration-300`}>
      {/* Newsletter Section */}
      <div className={`border-b ${
        isDarkMode ? 'border-gray-800' : 'border-gray-800'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-2">Stay Updated</h3>
            <p className="text-gray-300 mb-6">Subscribe to our newsletter for the latest deals and updates</p>
            <div className="max-w-md mx-auto flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              />
              <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-r-lg transition-colors font-medium">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-6">
              <ShoppingCart className="h-8 w-8 text-blue-400 mr-3" />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {APP_CONFIG.NAME}
              </span>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              {APP_CONFIG.DESCRIPTION}. We provide high-quality products at competitive prices with exceptional customer service.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                    title={social.label}
                  >
                    <IconComponent className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-blue-400">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map(link => (
                <li key={link.id}>
                  <button 
                    onClick={() => handleNavClick(link.id)}
                    className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-200 block"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-blue-400">Categories</h3>
            <ul className="space-y-3">
              {categories.map((category, index) => (
                <li key={index}>
                  <button 
                    onClick={() => handleNavClick('shop')}
                    className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-200 block"
                  >
                    {category}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-blue-400">Contact Info</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-blue-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {CONTACT_INFO.ADDRESS}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-blue-400 flex-shrink-0" />
                <div>
                  <a 
                    href={`tel:${CONTACT_INFO.PHONE}`}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {CONTACT_INFO.PHONE}
                  </a>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blue-400 flex-shrink-0" />
                <div>
                  <a 
                    href={`mailto:${CONTACT_INFO.EMAIL}`}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {CONTACT_INFO.EMAIL}
                  </a>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Clock className="h-5 w-5 text-blue-400 mt-1 flex-shrink-0" />
                <div className="text-sm">
                  <p className="text-gray-300">{CONTACT_INFO.BUSINESS_HOURS.WEEKDAYS}</p>
                  <p className="text-gray-300">{CONTACT_INFO.BUSINESS_HOURS.WEEKENDS}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Service Links */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="text-center mb-8">
            <h3 className="text-lg font-semibold mb-4 text-blue-400">Customer Service</h3>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-8">
              {customerServiceLinks.map((link, index) => (
                <button
                  key={index}
                  onClick={() => handleNavClick('contact')}
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  {link}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="text-center">
            <h4 className="text-sm font-medium text-gray-400 mb-4">We Accept</h4>
            <div className="flex justify-center space-x-6 opacity-60">
              <div className="bg-white text-gray-900 px-3 py-1 rounded text-xs font-bold">VISA</div>
              <div className="bg-white text-gray-900 px-3 py-1 rounded text-xs font-bold">MASTERCARD</div>
              <div className="bg-blue-600 text-white px-3 py-1 rounded text-xs font-bold">PAYPAL</div>
              <div className="bg-white text-gray-900 px-3 py-1 rounded text-xs font-bold">AMEX</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-gray-400 text-sm">
                © {new Date().getFullYear()} {APP_CONFIG.NAME}. All rights reserved.
              </p>
              <p className="text-gray-500 text-xs mt-1">
                Made with ❤️ for great shopping experiences.
              </p>
            </div>
            
            <div className="flex items-center space-x-6">
              <button
                onClick={() => handleNavClick('about')}
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Privacy Policy
              </button>
              <button
                onClick={() => handleNavClick('about')}
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Terms of Service
              </button>
              <button
                onClick={() => handleNavClick('contact')}
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;