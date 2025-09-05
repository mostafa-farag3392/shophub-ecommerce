import React from 'react';
import { Heart, Star, ShoppingCart, Eye } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

const ProductCard = ({ product, onViewDetails, className = '' }) => {
  const { 
    cart, 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    currentUser, 
    isDarkMode 
  } = useAppContext();

  const isInCart = cart.some(item => item.id === product.id);
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    
    if (!currentUser) {
      alert('Please login to add items to cart');
      return;
    }
    
    try {
      addToCart(product);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleToggleWishlist = (e) => {
    e.stopPropagation();
    
    if (!currentUser) {
      alert('Please login to add items to wishlist');
      return;
    }

    try {
      toggleWishlist(product);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleViewDetails = (e) => {
    e.stopPropagation();
    if (onViewDetails) {
      onViewDetails(product);
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const rate = rating?.rate || 0;
    
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`h-4 w-4 ${
            i <= Math.floor(rate)
              ? 'text-yellow-400 fill-current'
              : i <= rate
              ? 'text-yellow-400 fill-current opacity-50'
              : 'text-gray-300'
          }`}
        />
      );
    }
    
    return stars;
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div className={`${
      isDarkMode ? 'bg-gray-800 text-white' : 'bg-white'
    } rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02] card-hover group ${className}`}>
      {/* Product Image Container */}
      <div className="relative overflow-hidden">
        <div className="aspect-w-1 aspect-h-1 w-full">
          <img 
            src={product.image} 
            alt={product.title}
            className="w-full h-64 object-contain bg-gray-50 dark:bg-gray-700 group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>
        
        {/* Overlay Actions */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <button
            onClick={handleViewDetails}
            className="bg-white text-gray-900 p-3 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-gray-100"
            title="View Details"
          >
            <Eye className="h-5 w-5" />
          </button>
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleToggleWishlist}
          className={`absolute top-4 right-4 p-2 rounded-full shadow-md transition-all duration-200 ${
            inWishlist 
              ? 'bg-red-500 text-white transform scale-110' 
              : 'bg-white/90 text-gray-600 hover:bg-red-500 hover:text-white hover:scale-110'
          }`}
          title={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className="h-4 w-4" fill={inWishlist ? 'currentColor' : 'none'} />
        </button>
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium capitalize shadow-md">
          {product.category}
        </div>

        {/* Discount Badge (if applicable) */}
        {product.originalPrice && (
          <div className="absolute top-4 left-4 mt-8 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-md">
            SALE
          </div>
        )}
      </div>
      
      {/* Product Info */}
      <div className="p-6">
        {/* Product Title */}
        <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {truncateText(product.title, 60)}
        </h3>
        
        {/* Rating */}
        <div className="flex items-center mb-3 space-x-2">
          <div className="flex space-x-1">
            {renderStars(product.rating)}
          </div>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {product.rating?.rate || 0}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-500">
            ({product.rating?.count || 0} reviews)
          </span>
        </div>
        
        {/* Description */}
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
          {truncateText(product.description, 120)}
        </p>
        
        {/* Price and Actions */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            {/* Current Price */}
            <span className="text-2xl font-bold text-blue-600">
              {formatPrice(product.price)}
            </span>
            
            {/* Original Price (if discounted) */}
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          
          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 btn-hover ${
              isInCart
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
            title={isInCart ? 'Already in cart' : 'Add to cart'}
          >
            <div className="flex items-center space-x-2">
              <ShoppingCart className="h-4 w-4" />
              <span className="hidden sm:inline">
                {isInCart ? 'Added' : 'Add'}
              </span>
            </div>
          </button>
        </div>

        {/* Stock Status */}
        <div className="mt-3">
          <div className="flex items-center space-x-2">
            <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-1">
              <div 
                className="bg-green-500 h-1 rounded-full transition-all duration-300"
                style={{ width: '75%' }} // Mock stock level
              ></div>
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400">In Stock</span>
          </div>
        </div>
      </div>

      {/* Quick Actions Footer */}
      <div className={`px-6 py-3 border-t ${
        isDarkMode ? 'border-gray-700 bg-gray-750' : 'border-gray-200 bg-gray-50'
      }`}>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500 dark:text-gray-400">
            Free shipping available
          </span>
          <div className="flex items-center space-x-3">
            <button 
              className="text-blue-600 hover:text-blue-800 transition-colors"
              onClick={handleViewDetails}
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;