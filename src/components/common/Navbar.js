import React, { useState } from 'react';
import { ShoppingCart, Heart, User, Menu, X, Sun, Moon } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

const Navbar = ({ currentPage, setCurrentPage }) => {
  const {  
    wishlist, 
    currentUser, 
    logout, 
    isDarkMode, 
    setIsDarkMode,
    getCartItemsCount 
  } = useAppContext();
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setCurrentPage('home');
    setIsMenuOpen(false);
    setIsUserMenuOpen(false);
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'shop', label: 'Shop' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' }
  ];

  const cartCount = getCartItemsCount();

  const handleNavClick = (pageId) => {
    setCurrentPage(pageId);
    setIsMenuOpen(false);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <nav className={`sticky top-0 z-50 ${
      isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
    } shadow-lg transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer group"
            onClick={() => handleNavClick('home')}
          >
            <ShoppingCart className="h-8 w-8 text-blue-600 mr-2 transition-transform group-hover:scale-110" />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ShopHub
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`hover:text-blue-600 transition-colors duration-200 relative ${
                  currentPage === item.id ? 'text-blue-600 font-medium' : ''
                }`}
              >
                {item.label}
                {currentPage === item.id && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-600 rounded-full"></span>
                )}
              </button>
            ))}
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-all duration-200 ${
                isDarkMode 
                  ? 'hover:bg-gray-800 text-yellow-400' 
                  : 'hover:bg-gray-100 text-gray-600'
              }`}
              title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            {/* Wishlist */}
            <button
              onClick={() => handleNavClick('wishlist')}
              className={`p-2 rounded-lg transition-all duration-200 relative ${
                isDarkMode 
                  ? 'hover:bg-gray-800' 
                  : 'hover:bg-gray-100'
              }`}
              title="Wishlist"
            >
              <Heart className={`h-5 w-5 ${
                wishlist.length > 0 ? 'text-red-500' : ''
              }`} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart */}
            <button
              onClick={() => handleNavClick('cart')}
              className={`p-2 rounded-lg transition-all duration-200 relative ${
                isDarkMode 
                  ? 'hover:bg-gray-800' 
                  : 'hover:bg-gray-100'
              }`}
              title="Shopping Cart"
            >
              <ShoppingCart className={`h-5 w-5 ${
                cartCount > 0 ? 'text-blue-600' : ''
              }`} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>

            {/* User Menu */}
            {currentUser ? (
              <div className="relative">
                <button 
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className={`flex items-center space-x-2 p-2 rounded-lg transition-all duration-200 ${
                    isDarkMode 
                      ? 'hover:bg-gray-800' 
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <User className="h-5 w-5" />
                  <span className="hidden sm:block font-medium">{currentUser.name}</span>
                  <svg 
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isUserMenuOpen ? 'transform rotate-180' : ''
                    }`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {/* Dropdown Menu */}
                {isUserMenuOpen && (
                  <>
                    {/* Overlay */}
                    <div 
                      className="fixed inset-0 z-10"
                      onClick={() => setIsUserMenuOpen(false)}
                    ></div>
                    
                    {/* Menu */}
                    <div className={`absolute right-0 mt-2 w-48 ${
                      isDarkMode ? 'bg-gray-800' : 'bg-white'
                    } rounded-lg shadow-lg border ${
                      isDarkMode ? 'border-gray-700' : 'border-gray-200'
                    } z-20 animate-fade-in`}>
                      <div className="py-1">
                        <button
                          onClick={() => {
                            handleNavClick('account');
                            setIsUserMenuOpen(false);
                          }}
                          className={`flex items-center w-full text-left px-4 py-2 text-sm transition-colors ${
                            isDarkMode 
                              ? 'hover:bg-gray-700 text-gray-300' 
                              : 'hover:bg-gray-100 text-gray-700'
                          }`}
                        >
                          <User className="h-4 w-4 mr-3" />
                          My Account
                        </button>
                        <button
                          onClick={() => {
                            handleNavClick('cart');
                            setIsUserMenuOpen(false);
                          }}
                          className={`flex items-center w-full text-left px-4 py-2 text-sm transition-colors ${
                            isDarkMode 
                              ? 'hover:bg-gray-700 text-gray-300' 
                              : 'hover:bg-gray-100 text-gray-700'
                          }`}
                        >
                          <ShoppingCart className="h-4 w-4 mr-3" />
                          My Cart ({cartCount})
                        </button>
                        <button
                          onClick={() => {
                            handleNavClick('wishlist');
                            setIsUserMenuOpen(false);
                          }}
                          className={`flex items-center w-full text-left px-4 py-2 text-sm transition-colors ${
                            isDarkMode 
                              ? 'hover:bg-gray-700 text-gray-300' 
                              : 'hover:bg-gray-100 text-gray-700'
                          }`}
                        >
                          <Heart className="h-4 w-4 mr-3" />
                          Wishlist ({wishlist.length})
                        </button>
                        <hr className={`my-1 ${
                          isDarkMode ? 'border-gray-700' : 'border-gray-200'
                        }`} />
                        <button
                          onClick={handleLogout}
                          className="flex items-center w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                        >
                          <svg className="h-4 w-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                          Logout
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <button
                onClick={() => handleNavClick('login')}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-200 font-medium btn-hover"
              >
                Login
              </button>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`md:hidden p-2 rounded-lg transition-all duration-200 ${
                isDarkMode 
                  ? 'hover:bg-gray-800' 
                  : 'hover:bg-gray-100'
              }`}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className={`md:hidden py-4 border-t ${
            isDarkMode ? 'border-gray-700' : 'border-gray-200'
          } animate-slide-in`}>
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`block w-full text-left py-3 px-4 transition-colors ${
                  currentPage === item.id 
                    ? 'text-blue-600 font-medium bg-blue-50 dark:bg-blue-900/20' 
                    : isDarkMode 
                      ? 'hover:bg-gray-800' 
                      : 'hover:bg-gray-50'
                }`}
              >
                {item.label}
              </button>
            ))}
            
            {/* Mobile User Actions */}
            {currentUser && (
              <>
                <hr className={`my-2 ${
                  isDarkMode ? 'border-gray-700' : 'border-gray-200'
                }`} />
                <button
                  onClick={() => handleNavClick('account')}
                  className={`block w-full text-left py-3 px-4 transition-colors ${
                    isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-50'
                  }`}
                >
                  My Account
                </button>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left py-3 px-4 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;