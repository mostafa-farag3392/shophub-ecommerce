import React, { useState } from 'react';
import { ShoppingCart, Plus, Minus, Trash2, Heart, ArrowRight, Tag, Truck, Shield, ArrowLeft, X } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import ProductCard from '../components/common/ProductCard';
import { APP_CONFIG } from '../utils/constants';

const CartPage = ({ setCurrentPage }) => {
  const { 
    cart, 
    wishlist,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    getCartTotal,
    getCartItemsCount,
    currentUser, 
    isDarkMode 
  } = useAppContext();

  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [isPromoLoading, setIsPromoLoading] = useState(false);

  const subtotal = getCartTotal();
  const promoDiscount = appliedPromo ? subtotal * appliedPromo.discount : 0;
  const discountedSubtotal = subtotal - promoDiscount;
  const shipping = discountedSubtotal > APP_CONFIG.FREE_SHIPPING_THRESHOLD ? 0 : APP_CONFIG.DEFAULT_SHIPPING_COST;
  const tax = discountedSubtotal * APP_CONFIG.TAX_RATE;
  const total = discountedSubtotal + shipping + tax;
  const totalItems = getCartItemsCount();

  // Mock promo codes for demonstration
  const validPromoCodes = {
    'WELCOME10': { discount: 0.1, description: '10% off your order' },
    'SAVE20': { discount: 0.2, description: '20% off your order' },
    'FREESHIP': { discount: 0, description: 'Free shipping', freeShipping: true }
  };

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) {
      if (window.confirm('Remove this item from cart?')) {
        removeFromCart(productId);
      }
    } else if (newQuantity > APP_CONFIG.MAX_CART_QUANTITY) {
      alert(`Maximum quantity is ${APP_CONFIG.MAX_CART_QUANTITY}`);
    } else {
      updateCartQuantity(productId, newQuantity);
    }
  };

  const handleRemoveItem = (productId, productTitle) => {
    if (window.confirm(`Are you sure you want to remove "${productTitle}" from your cart?`)) {
      removeFromCart(productId);
    }
  };

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your entire cart? This action cannot be undone.')) {
      clearCart();
      setAppliedPromo(null);
      setPromoCode('');
    }
  };

  const handleApplyPromo = async () => {
    if (!promoCode.trim()) return;
    
    setIsPromoLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const promo = validPromoCodes[promoCode.toUpperCase()];
    if (promo) {
      setAppliedPromo({ code: promoCode.toUpperCase(), ...promo });
      alert(`Promo code applied! ${promo.description}`);
    } else {
      alert('Invalid promo code. Please try again.');
    }
    
    setIsPromoLoading(false);
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
    setPromoCode('');
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: APP_CONFIG.CURRENCY
    }).format(price);
  };

  const freeShippingRemaining = APP_CONFIG.FREE_SHIPPING_THRESHOLD - discountedSubtotal;

  // Redirect to login if not authenticated
  if (!currentUser) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50'} py-8`}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg p-12`}>
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 dark:bg-blue-900 rounded-full mb-6">
                <ShoppingCart className="h-10 w-10 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Please Login to View Cart</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                You need to be logged in to access your shopping cart and continue with your purchase.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setCurrentPage('login')}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Login Now
              </button>
              <button
                onClick={() => setCurrentPage('shop')}
                className={`px-8 py-3 rounded-lg transition-colors font-medium ${
                  isDarkMode 
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Empty cart state
  if (cart.length === 0) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50'} py-8`}>
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
          
          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg p-12 text-center`}>
            <div className="mb-8">
              <ShoppingCart className="h-24 w-24 text-gray-400 mx-auto mb-6" />
              <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                Looks like you haven't added anything to your cart yet. Start shopping to fill it up!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <button
                  onClick={() => setCurrentPage('shop')}
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Start Shopping
                </button>
                {wishlist.length > 0 && (
                  <button
                    onClick={() => setCurrentPage('wishlist')}
                    className={`px-8 py-3 rounded-lg transition-colors font-medium ${
                      isDarkMode 
                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    View Wishlist ({wishlist.length})
                  </button>
                )}
              </div>
            </div>

            {/* Quick Add from Wishlist */}
            {wishlist.length > 0 && (
              <div className="pt-8 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold mb-6">Items from your wishlist</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Maybe add some of these to your cart?
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {wishlist.slice(0, 3).map(item => (
                    <div key={item.id} className="text-left">
                      <ProductCard 
                        product={item} 
                        onViewDetails={() => setCurrentPage(`product-${item.id}`)}
                      />
                    </div>
                  ))}
                </div>
                {wishlist.length > 3 && (
                  <button
                    onClick={() => setCurrentPage('wishlist')}
                    className="mt-6 text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    View all {wishlist.length} wishlist items →
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50'} py-8`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold flex items-center">
              <ShoppingCart className="h-8 w-8 mr-3" />
              Shopping Cart
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              {totalItems} {totalItems === 1 ? 'item' : 'items'} in your cart
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setCurrentPage('shop')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                isDarkMode 
                  ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Continue Shopping</span>
            </button>
            
            {cart.length > 0 && (
              <button
                onClick={handleClearCart}
                className="text-red-600 hover:text-red-800 transition-colors flex items-center space-x-2"
              >
                <Trash2 className="h-4 w-4" />
                <span>Clear Cart</span>
              </button>
            )}
          </div>
        </div>

        {/* Free Shipping Banner */}
        {freeShippingRemaining > 0 && (
          <div className={`mb-8 p-4 rounded-lg border-2 border-dashed ${
            isDarkMode 
              ? 'bg-blue-900/20 border-blue-600 text-blue-300' 
              : 'bg-blue-50 border-blue-300 text-blue-700'
          }`}>
            <div className="flex items-center justify-center space-x-2">
              <Truck className="h-5 w-5" />
              <span className="font-medium">
                Add {formatPrice(freeShippingRemaining)} more for FREE shipping!
              </span>
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cart.map((item, index) => (
              <div key={item.id} className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6 animate-fade-in`} style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="flex items-start space-x-4">
                  {/* Product Image */}
                  <div 
                    className="w-24 h-24 bg-gray-50 dark:bg-gray-700 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors group"
                    onClick={() => setCurrentPage(`product-${item.id}`)}
                  >
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-full object-contain rounded-lg group-hover:scale-105 transition-transform duration-200"
                    />
                  </div>
                  
                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 pr-4">
                        <h3 
                          className="font-semibold text-lg mb-2 cursor-pointer hover:text-blue-600 transition-colors line-clamp-2"
                          onClick={() => setCurrentPage(`product-${item.id}`)}
                        >
                          {item.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-2 capitalize">
                          Category: {item.category}
                        </p>
                        <div className="flex items-center space-x-4 mb-4">
                          <span className="text-2xl font-bold text-blue-600">
                            {formatPrice(item.price)}
                          </span>
                          {item.quantity > 1 && (
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              {formatPrice(item.price)} each
                            </span>
                          )}
                        </div>
                      </div>
                      
                      {/* Remove Button */}
                      <button
                        onClick={() => handleRemoveItem(item.id, item.title)}
                        className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                    
                    {/* Quantity Controls and Total */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-sm font-medium">Quantity:</span>
                        <div className={`flex items-center border rounded-lg ${
                          isDarkMode ? 'border-gray-600' : 'border-gray-300'
                        }`}>
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors rounded-l-lg"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <input
                            type="number"
                            min="1"
                            max={APP_CONFIG.MAX_CART_QUANTITY}
                            value={item.quantity}
                            onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 1)}
                            className={`w-16 py-2 text-center font-medium border-0 focus:ring-0 ${
                              isDarkMode ? 'bg-gray-800' : 'bg-white'
                            }`}
                          />
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors rounded-r-lg"
                            disabled={item.quantity >= APP_CONFIG.MAX_CART_QUANTITY}
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-sm text-gray-600 dark:text-gray-400">Subtotal</p>
                        <p className="text-xl font-bold">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Continue Shopping */}
            <div className="text-center py-6">
              <button
                onClick={() => setCurrentPage('shop')}
                className={`inline-flex items-center space-x-2 px-6 py-3 rounded-lg transition-colors ${
                  isDarkMode 
                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Continue Shopping</span>
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6 sticky top-8`}>
              <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
              
              {/* Promo Code Section */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-3">Promo Code</label>
                {appliedPromo ? (
                  <div className={`flex items-center justify-between p-3 rounded-lg border ${
                    isDarkMode ? 'bg-green-900/20 border-green-600' : 'bg-green-50 border-green-300'
                  }`}>
                    <div className="flex items-center space-x-2">
                      <Tag className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium text-green-600">{appliedPromo.code}</span>
                    </div>
                    <button
                      onClick={handleRemovePromo}
                      className="text-green-600 hover:text-green-800 transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <div className="flex">
                    <input
                      type="text"
                      placeholder="Enter promo code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                      onKeyPress={(e) => e.key === 'Enter' && handleApplyPromo()}
                      className={`flex-1 px-4 py-3 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                          : 'bg-white border-gray-300 placeholder-gray-500'
                      }`}
                    />
                    <button 
                      onClick={handleApplyPromo}
                      disabled={!promoCode.trim() || isPromoLoading}
                      className={`bg-blue-600 text-white px-6 py-3 rounded-r-lg hover:bg-blue-700 transition-colors flex items-center ${
                        (!promoCode.trim() || isPromoLoading) ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      {isPromoLoading ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <Tag className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                )}
                
                {/* Suggested Promo Codes */}
                {!appliedPromo && (
                  <div className="mt-3">
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Try these codes:</p>
                    <div className="flex flex-wrap gap-2">
                      {Object.keys(validPromoCodes).map(code => (
                        <button
                          key={code}
                          onClick={() => {
                            setPromoCode(code);
                            handleApplyPromo();
                          }}
                          className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 px-2 py-1 rounded hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                        >
                          {code}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              {/* Summary Details */}
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Subtotal ({totalItems} items)
                  </span>
                  <span className="font-medium">{formatPrice(subtotal)}</span>
                </div>
                
                {appliedPromo && appliedPromo.discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount ({appliedPromo.code})</span>
                    <span>-{formatPrice(promoDiscount)}</span>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400 flex items-center">
                    <Truck className="h-4 w-4 mr-1" />
                    Shipping
                  </span>
                  <span className={`font-medium ${shipping === 0 ? 'text-green-600' : ''}`}>
                    {shipping === 0 ? 'FREE' : formatPrice(shipping)}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Tax ({(APP_CONFIG.TAX_RATE * 100).toFixed(0)}%)
                  </span>
                  <span className="font-medium">{formatPrice(tax)}</span>
                </div>
                
                <hr className="border-gray-200 dark:border-gray-700" />
                
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span className="text-blue-600">{formatPrice(total)}</span>
                </div>
                
                {appliedPromo && (
                  <p className="text-sm text-green-600 text-center">
                    You saved {formatPrice(promoDiscount + (appliedPromo.freeShipping ? APP_CONFIG.DEFAULT_SHIPPING_COST : 0))}!
                  </p>
                )}
              </div>
              
              {/* Checkout Button */}
              <button
                onClick={() => setCurrentPage('checkout')}
                className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition-all duration-200 font-medium text-lg flex items-center justify-center space-x-2 btn-hover mb-4"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="h-5 w-5" />
              </button>
              
              {/* Security and Payment Info */}
              <div className="space-y-4">
                {/* Security Badge */}
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-2">
                    <Shield className="h-4 w-4" />
                    <span>Secure SSL Checkout</span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-500">
                    Your payment information is protected
                  </p>
                </div>
                
                {/* Payment Methods */}
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 text-center">We accept</p>
                  <div className="flex justify-center space-x-3">
                    <div className="bg-white text-gray-900 px-2 py-1 rounded text-xs font-bold border">VISA</div>
                    <div className="bg-white text-gray-900 px-2 py-1 rounded text-xs font-bold border">MASTERCARD</div>
                    <div className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-bold">PAYPAL</div>
                    <div className="bg-white text-gray-900 px-2 py-1 rounded text-xs font-bold border">AMEX</div>
                  </div>
                </div>

                {/* Shipping Info */}
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-start space-x-3">
                    <Truck className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium mb-1">Shipping Information</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {shipping === 0 
                          ? 'Free standard shipping (5-7 business days)'
                          : 'Standard shipping: 5-7 business days'
                        }
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Express shipping available at checkout
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Products / Wishlist Section */}
        {wishlist.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold">You might also like</h2>
              <button
                onClick={() => setCurrentPage('wishlist')}
                className="text-blue-600 hover:text-blue-800 transition-colors flex items-center space-x-2"
              >
                <Heart className="h-4 w-4" />
                <span>View Full Wishlist ({wishlist.length})</span>
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {wishlist.slice(0, 4).map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onViewDetails={() => setCurrentPage(`product-${product.id}`)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Trust Indicators */}
        <div className={`mt-16 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-8`}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full mb-4">
                <Shield className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Secure Payments</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Your payment information is encrypted and secure with SSL protection.
              </p>
            </div>
            <div>
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full mb-4">
                <Truck className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Fast Shipping</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Free shipping on orders over ${APP_CONFIG.FREE_SHIPPING_THRESHOLD}. Express options available.
              </p>
            </div>
            <div>
              <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full mb-4">
                <Heart className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">30-Day Returns</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Not satisfied? Return any item within 30 days for a full refund.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;