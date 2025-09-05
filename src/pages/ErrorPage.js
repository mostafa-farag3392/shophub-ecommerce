import React from 'react';
import { Home, Search, ArrowLeft } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const ErrorPage = ({ setCurrentPage }) => {
  const { isDarkMode } = useAppContext();

  const suggestions = [
    { icon: Home, label: 'Go Home', action: () => setCurrentPage('home') },
    { icon: Search, label: 'Browse Products', action: () => setCurrentPage('shop') },
    { icon: ArrowLeft, label: 'Go Back', action: () => window.history.back() }
  ];

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50'} flex items-center justify-center`}>
      <div className="text-center px-4 max-w-2xl mx-auto">
        {/* 404 Animation */}
        <div className="mb-8">
          <div className="text-8xl md:text-9xl font-bold text-blue-600 mb-4 animate-pulse">
            404
          </div>
          <div className="relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 border-4 border-blue-600 border-dashed rounded-full animate-spin opacity-20"></div>
            </div>
            <div className="relative z-10 p-8">
              <div className="text-6xl mb-4">🔍</div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Oops! Page Not Found
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
          The page you're looking for seems to have wandered off into cyberspace. 
          Don't worry though, we'll help you find your way back!
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          {suggestions.map((suggestion, index) => {
            const IconComponent = suggestion.icon;
            return (
              <button
                key={index}
                onClick={suggestion.action}
                className={`flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 btn-hover ${
                  index === 0
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : isDarkMode
                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-600'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300 shadow-sm'
                }`}
              >
                <IconComponent className="h-5 w-5" />
                <span>{suggestion.label}</span>
              </button>
            );
          })}
        </div>

        {/* Popular Pages */}
        <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg p-8 inline-block`}>
          <h2 className="text-xl font-semibold mb-6">Popular Pages</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
            <button
              onClick={() => setCurrentPage('home')}
              className={`p-4 rounded-lg transition-colors text-left ${
                isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
              }`}
            >
              <h3 className="font-medium mb-1">Home</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Discover featured products and deals
              </p>
            </button>
            <button
              onClick={() => setCurrentPage('shop')}
              className={`p-4 rounded-lg transition-colors text-left ${
                isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
              }`}
            >
              <h3 className="font-medium mb-1">Shop</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Browse our complete product catalog
              </p>
            </button>
            <button
              onClick={() => setCurrentPage('about')}
              className={`p-4 rounded-lg transition-colors text-left ${
                isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
              }`}
            >
              <h3 className="font-medium mb-1">About</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Learn more about our company
              </p>
            </button>
            <button
              onClick={() => setCurrentPage('contact')}
              className={`p-4 rounded-lg transition-colors text-left ${
                isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
              }`}
            >
              <h3 className="font-medium mb-1">Contact</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Get in touch with our support team
              </p>
            </button>
          </div>
        </div>

        {/* Fun Error Messages */}
        <div className="mt-8 text-sm text-gray-500 dark:text-gray-400">
          <p>Error Code: 404 | Page Not Found</p>
          <p className="mt-2 italic">
            "Not all those who wander are lost... but this page definitely is." 📍
          </p>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;