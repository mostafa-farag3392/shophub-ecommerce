import React, { useState, useEffect } from 'react';
import { AppProvider } from './context/AppContext';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import LoadingSpinner from './components/ui/LoadingSpinner';

// Import all page components
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import CartPage from './pages/CartPage';
import WishlistPage from './pages/WishlistPage';
import CheckoutPage from './pages/CheckoutPage';
import LoginPage from './pages/LoginPage';
import AccountPage from './pages/AccountPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import ErrorPage from './pages/ErrorPage';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isLoading, setIsLoading] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [pageHistory, setPageHistory] = useState(['home']);


  // Handle initial loading
  useEffect(() => {
    // Simulate initial app loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = (event) => {
      if (event.state && event.state.page) {
        setCurrentPage(event.state.page);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Update browser history when page changes
  useEffect(() => {
    // Don't push state on initial load
    if (currentPage !== 'home' || window.history.state) {
      const url = currentPage === 'home' ? '/' : `/${currentPage}`;
      window.history.pushState(
        { page: currentPage },
        '',
        url
      );
    }

    // Update page history for navigation
    setPageHistory(prev => {
      const newHistory = [...prev];
      if (newHistory[newHistory.length - 1] !== currentPage) {
        newHistory.push(currentPage);
        // Keep only last 10 pages
        if (newHistory.length > 10) {
          newHistory.shift();
        }
      }
      return newHistory;
    });
  }, [currentPage]);

  // Handle scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const renderPage = () => {
    // Handle product details pages
    if (currentPage.startsWith('product-')) {
      const productId = currentPage.split('-')[1];
      return <ProductDetailsPage productId={productId} setCurrentPage={setCurrentPage} />;
    }

    // Handle other pages
    switch (currentPage) {
      case 'home':
        return <HomePage setCurrentPage={setCurrentPage} />;
      case 'shop':
        return <ShopPage setCurrentPage={setCurrentPage} />;
      case 'cart':
        return <CartPage setCurrentPage={setCurrentPage} />;
      case 'wishlist':
        return <WishlistPage setCurrentPage={setCurrentPage} />;
      case 'checkout':
        return <CheckoutPage setCurrentPage={setCurrentPage} />;
      case 'login':
        return <LoginPage setCurrentPage={setCurrentPage} />;
      case 'account':
        return <AccountPage setCurrentPage={setCurrentPage} />;
      case 'about':
        return <AboutPage setCurrentPage={setCurrentPage} />;
      case 'contact':
        return <ContactPage setCurrentPage={setCurrentPage} />;
      default:
        return <ErrorPage setCurrentPage={setCurrentPage} />;
    }
  };

  // Show loading spinner during initial load
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <LoadingSpinner size="large" message="Loading ShopHub..." />
          <div className="mt-6">
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
            <p className="mt-4 text-gray-600 dark:text-gray-400 text-sm">
              Setting up your shopping experience...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <AppProvider>
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        {/* Navigation */}
        <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
        
        {/* Main Content */}
        <main className="flex-1">
          <div className="animate-fade-in">
            {renderPage()}
          </div>
        </main>
        
        {/* Footer */}
        <Footer setCurrentPage={setCurrentPage} />
        
        {/* Back to Top Button */}
        <BackToTopButton />
      </div>
    </AppProvider>
  );
}

// Back to Top Button Component
const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 btn-hover"
          aria-label="Back to top"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 11l5-5m0 0l5 5m-5-5v12"
            />
          </svg>
        </button>
      )}
    </>
  );
};

export default App;
