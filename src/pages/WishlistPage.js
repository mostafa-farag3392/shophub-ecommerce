import React from 'react';
import { Heart, ShoppingCart, Trash2, Grid, Search } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import ProductCard from '../components/common/ProductCard';

const WishlistPage = ({ setCurrentPage }) => {
  const { 
    wishlist, 
    clearWishlist,
    removeFromWishlist,
    currentUser, 
    isDarkMode 
  } = useAppContext();

  const handleClearWishlist = () => {
    if (window.confirm('Are you sure you want to clear your entire wishlist?')) {
      clearWishlist();
    }
  };

  if (!currentUser) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50'} py-8`}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg p-12`}>
            <Heart className="h-16 w-16 text-gray-400 mx-auto mb-6" />
            <h2 className="text-2xl font-bold mb-4">Please Login to View Wishlist</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              You need to be logged in to access your wishlist
            </p>
            <button
              onClick={() => setCurrentPage('login')}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Login Now
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50'} py-8`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold flex items-center">
              <Heart className="h-8 w-8 text-red-500 mr-3" />
              My Wishlist
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} saved
            </p>
          </div>
          
          {wishlist.length > 0 && (
            <button
              onClick={handleClearWishlist}
              className="text-red-600 hover:text-red-800 transition-colors flex items-center space-x-2"
            >
              <Trash2 className="h-4 w-4" />
              <span>Clear All</span>
            </button>
          )}
        </div>
        
        {wishlist.length === 0 ? (
          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg p-12 text-center`}>
            <Heart className="h-24 w-24 text-gray-400 mx-auto mb-6" />
            <h2 className="text-2xl font-bold mb-4">Your wishlist is empty</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Save items you love to your wishlist so you can easily find them later
            </p>
            <button
              onClick={() => setCurrentPage('shop')}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {wishlist.map(product => (
              <div key={product.id} className="relative group">
                <ProductCard
                  product={product}
                  onViewDetails={() => setCurrentPage(`product-${product.id}`)}
                />
                <button
                  onClick={() => removeFromWishlist(product.id)}
                  className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                  title="Remove from wishlist"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;