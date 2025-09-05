import React, { useState } from 'react';
import { ArrowLeft, Heart, Star, Plus, Minus, ShoppingCart, Share, Truck, Shield, RefreshCw } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import ProductCard from '../components/common/ProductCard';
// eslint-disable-next-line no-unused-vars
import LoadingSpinner from '../components/ui/LoadingSpinner';

const ProductDetailsPage = ({ productId, setCurrentPage }) => {
  const { 
    getProductById, 
    getRelatedProducts, 
    addToCart, 
    toggleWishlist, 
    isInWishlist,
    currentUser, 
    isDarkMode 
  } = useAppContext();

  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState('description');

  const product = getProductById(productId);
  const relatedProducts = product ? getRelatedProducts(product, 4) : [];
  const inWishlist = product ? isInWishlist(product.id) : false;

  if (!product) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} flex items-center justify-center`}>
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Product not found
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <button
            onClick={() => setCurrentPage('shop')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Shop
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!currentUser) {
      alert('Please login to add items to cart');
      return;
    }
    
    try {
      addToCart(product, quantity);
      alert(`Added ${quantity} ${product.title} to cart!`);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleToggleWishlist = () => {
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

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const renderStars = (rating) => {
    const stars = [];
    const rate = rating?.rate || 0;
    
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`h-5 w-5 ${
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

  // Mock additional images (in real app, these would come from API)
  const productImages = [
    product.image,
    product.image, // Duplicate for demo
    product.image,
  ];

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50'} py-8`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-8 flex items-center space-x-2 text-sm">
          <button
            onClick={() => setCurrentPage('shop')}
            className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Shop
          </button>
          <span className="text-gray-400">/</span>
          <span className="text-gray-600 dark:text-gray-400 capitalize">{product.category}</span>
          <span className="text-gray-400">/</span>
          <span className="text-gray-500 dark:text-gray-500 truncate max-w-xs">
            {product.title}
          </span>
        </div>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg p-8 aspect-square flex items-center justify-center`}>
              <img 
                src={productImages[selectedImage]} 
                alt={product.title}
                className="w-full h-full object-contain"
              />
            </div>
            
            {/* Image Thumbnails */}
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg border-2 transition-colors ${
                    selectedImage === index
                      ? 'border-blue-600'
                      : isDarkMode
                      ? 'border-gray-700 hover:border-gray-600'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <img 
                    src={image} 
                    alt={`${product.title} ${index + 1}`}
                    className="w-full h-full object-contain rounded-lg"
                  />
                </button>
              ))}
            </div>
          </div>
          
          {/* Product Info */}
          <div className="space-y-6">
            {/* Category Badge */}
            <div>
              <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium capitalize">
                {product.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl lg:text-4xl font-bold leading-tight">
              {product.title}
            </h1>
            
            {/* Rating */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                {renderStars(product.rating)}
              </div>
              <span className="text-lg font-medium">
                {product.rating?.rate || 0}
              </span>
              <span className="text-gray-600 dark:text-gray-400">
                ({product.rating?.count || 0} reviews)
              </span>
            </div>
            
            {/* Price */}
            <div className="flex items-center space-x-4">
              <span className="text-4xl font-bold text-blue-600">
                {formatPrice(product.price)}
              </span>
              <span className="text-lg text-gray-500 line-through">
                {formatPrice(product.price * 1.2)} {/* Mock original price */}
              </span>
              <span className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 px-2 py-1 rounded-full text-sm font-medium">
                Save 17%
              </span>
            </div>
            
            {/* Stock Status */}
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-green-600 dark:text-green-400 font-medium">In Stock</span>
              <span className="text-gray-600 dark:text-gray-400">(12 items left)</span>
            </div>

            {/* Description */}
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p className="text-lg leading-relaxed">
                {product.description}
              </p>
            </div>
            
            {/* Quantity Selector */}
            <div className="flex items-center space-x-4">
              <label className="font-medium text-lg">Quantity:</label>
              <div className={`flex items-center border rounded-lg ${
                isDarkMode ? 'border-gray-600' : 'border-gray-300'
              }`}>
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className={`p-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                    quantity <= 1 ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="px-6 py-3 font-semibold text-lg min-w-[60px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-blue-600 text-white py-4 px-6 rounded-lg hover:bg-blue-700 transition-all duration-200 font-medium text-lg flex items-center justify-center space-x-2 btn-hover"
              >
                <ShoppingCart className="h-5 w-5" />
                <span>Add to Cart</span>
              </button>
              
              <button
                onClick={handleToggleWishlist}
                className={`p-4 rounded-lg border-2 transition-all duration-200 btn-hover ${
                  inWishlist
                    ? 'bg-red-500 border-red-500 text-white hover:bg-red-600'
                    : isDarkMode
                    ? 'border-gray-600 text-gray-300 hover:border-red-500 hover:text-red-500'
                    : 'border-gray-300 text-gray-600 hover:border-red-500 hover:text-red-500'
                }`}
              >
                <Heart className="h-6 w-6" fill={inWishlist ? 'currentColor' : 'none'} />
              </button>

              <button className={`p-4 rounded-lg border-2 transition-all duration-200 btn-hover ${
                isDarkMode 
                  ? 'border-gray-600 text-gray-300 hover:border-blue-500 hover:text-blue-500' 
                  : 'border-gray-300 text-gray-600 hover:border-blue-500 hover:text-blue-500'
              }`}>
                <Share className="h-6 w-6" />
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                  <Truck className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">Free Shipping</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Orders over $50</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                  <Shield className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium">Secure Payment</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">SSL Protected</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                  <RefreshCw className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium">30-Day Return</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Money back guarantee</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Tabs */}
        <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg mb-16`}>
          {/* Tab Navigation */}
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex space-x-8 px-8">
              {[
                { id: 'description', label: 'Description' },
                { id: 'specifications', label: 'Specifications' },
                { id: 'reviews', label: 'Reviews' },
                { id: 'shipping', label: 'Shipping Info' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {activeTab === 'description' && (
              <div className="prose prose-gray dark:prose-invert max-w-none">
                <p className="text-lg leading-relaxed mb-4">{product.description}</p>
                <h3>Key Features:</h3>
                <ul>
                  <li>High-quality materials and construction</li>
                  <li>Designed for durability and performance</li>
                  <li>Suitable for daily use</li>
                  <li>Backed by manufacturer warranty</li>
                </ul>
              </div>
            )}

            {activeTab === 'specifications' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-lg mb-4">Product Details</h3>
                  <dl className="space-y-2">
                    <div className="flex justify-between">
                      <dt className="text-gray-600 dark:text-gray-400">Category:</dt>
                      <dd className="capitalize">{product.category}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600 dark:text-gray-400">Brand:</dt>
                      <dd>ShopHub</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600 dark:text-gray-400">Weight:</dt>
                      <dd>1.5 kg</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600 dark:text-gray-400">Dimensions:</dt>
                      <dd>30 x 20 x 10 cm</dd>
                    </div>
                  </dl>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-4">Additional Info</h3>
                  <dl className="space-y-2">
                    <div className="flex justify-between">
                      <dt className="text-gray-600 dark:text-gray-400">Material:</dt>
                      <dd>Premium Quality</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600 dark:text-gray-400">Color:</dt>
                      <dd>As shown</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600 dark:text-gray-400">Warranty:</dt>
                      <dd>1 Year</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600 dark:text-gray-400">Country:</dt>
                      <dd>Made in USA</dd>
                    </div>
                  </dl>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold text-lg">Customer Reviews</h3>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Write a Review
                  </button>
                </div>
                
                {/* Review Summary */}
                <div className="flex items-center space-x-6 mb-8 p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="text-center">
                    <div className="text-3xl font-bold">{product.rating?.rate || 0}</div>
                    <div className="flex justify-center mb-1">
                      {renderStars(product.rating)}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {product.rating?.count || 0} reviews
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    {[5,4,3,2,1].map(stars => (
                      <div key={stars} className="flex items-center space-x-2 mb-1">
                        <span className="text-sm w-3">{stars}</span>
                        <Star className="h-4 w-4 text-yellow-400" />
                        <div className="flex-1 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                          <div 
                            className="bg-yellow-400 h-2 rounded-full" 
                            style={{ width: `${Math.random() * 80 + 20}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600 dark:text-gray-400 w-8">
                          {Math.floor(Math.random() * 50)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Individual Reviews */}
                <div className="space-y-6">
                  {Array.from({ length: 3 }, (_, i) => (
                    <div key={i} className="border-b border-gray-200 dark:border-gray-700 pb-6">
                      <div className="flex items-center space-x-4 mb-3">
                        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                          {String.fromCharCode(65 + i)}U
                        </div>
                        <div>
                          <div className="font-medium">Customer {i + 1}</div>
                          <div className="flex items-center space-x-2">
                            <div className="flex">
                              {renderStars({ rate: 5 - i * 0.5 })}
                            </div>
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              {new Date(Date.now() - i * 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300">
                        Great product! Really happy with the quality and fast shipping. 
                        Would definitely recommend to others.
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'shipping' && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-4">Shipping Options</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                      <div className="flex items-center space-x-3 mb-2">
                        <Truck className="h-5 w-5 text-blue-600" />
                        <h4 className="font-medium">Standard Shipping</h4>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">5-7 business days</p>
                      <p className="font-semibold text-green-600">FREE</p>
                    </div>
                    
                    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                      <div className="flex items-center space-x-3 mb-2">
                        <Truck className="h-5 w-5 text-purple-600" />
                        <h4 className="font-medium">Express Shipping</h4>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">2-3 business days</p>
                      <p className="font-semibold">$9.99</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-lg mb-4">Return Policy</h3>
                  <div className="prose prose-gray dark:prose-invert max-w-none">
                    <p>We offer a 30-day return policy for all items. Items must be returned in original condition with all tags attached.</p>
                    <ul>
                      <li>Free returns for defective items</li>
                      <li>Return shipping costs apply for exchanges</li>
                      <li>Refunds processed within 5-7 business days</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-8">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map(relatedProduct => (
                <ProductCard
                  key={relatedProduct.id}
                  product={relatedProduct}
                  onViewDetails={() => setCurrentPage(`product-${relatedProduct.id}`)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailsPage;