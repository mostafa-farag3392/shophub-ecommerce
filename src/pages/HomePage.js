import React from 'react';
import { ShoppingCart, Heart, User, Star, TrendingUp, Shield, Truck } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import ProductCard from '../components/common/ProductCard';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const HomePage = ({ setCurrentPage }) => {
  const { products, loading, isDarkMode } = useAppContext();

  // Get featured products (first 8 products)
  const featuredProducts = products.slice(0, 8);
  
  // Get products by category for different sections
  const electronicsProducts = products.filter(p => p.category === 'electronics').slice(0, 4);
  const clothingProducts = products.filter(p => p.category.includes('clothing')).slice(0, 4);

  if (loading) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} flex items-center justify-center`}>
        <LoadingSpinner size="large" message="Loading amazing products..." />
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50'}`}>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <div className="text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
                Welcome to{' '}
                <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                  ShopHub
                </span>
              </h1>
              <p className="text-xl lg:text-2xl mb-8 opacity-90 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                Discover amazing products at unbeatable prices. Your one-stop destination for quality shopping.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in" style={{ animationDelay: '0.4s' }}>
                <button
                  onClick={() => setCurrentPage('shop')}
                  className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Shop Now
                </button>
                <button
                  onClick={() => setCurrentPage('about')}
                  className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105"
                >
                  Learn More
                </button>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-8 justify-center lg:justify-start mt-12 animate-fade-in" style={{ animationDelay: '0.6s' }}>
                <div className="text-center">
                  <div className="text-3xl font-bold">{products.length}+</div>
                  <div className="text-sm opacity-80">Products</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">50K+</div>
                  <div className="text-sm opacity-80">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">4.9★</div>
                  <div className="text-sm opacity-80">Customer Rating</div>
                </div>
              </div>
            </div>

            {/* Hero Image/Graphics */}
            <div className="relative animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="relative w-full max-w-lg mx-auto">
                {/* Main circle */}
                <div className="w-80 h-80 bg-white/10 rounded-full backdrop-blur-sm border border-white/20 flex items-center justify-center mx-auto">
                  <div className="w-60 h-60 bg-white/20 rounded-full backdrop-blur-md border border-white/30 flex items-center justify-center">
                    <ShoppingCart className="w-24 h-24 text-white" />
                  </div>
                </div>
                
                {/* Floating icons */}
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-green-400 rounded-full flex items-center justify-center animate-bounce" style={{ animationDelay: '0.5s' }}>
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <div className="absolute top-1/2 -left-8 w-12 h-12 bg-pink-400 rounded-full flex items-center justify-center animate-bounce" style={{ animationDelay: '1s' }}>
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-16">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className={`fill-current ${isDarkMode ? 'text-gray-900' : 'text-gray-50'}`}></path>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className={`py-16 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose ShopHub?</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              We're committed to providing the best shopping experience with quality products and exceptional service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 transition-all duration-300 group-hover:scale-110 ${
                isDarkMode ? 'bg-blue-900' : 'bg-blue-100'
              }`}>
                <Truck className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Fast & Free Shipping</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Free shipping on orders over $50 with express delivery options available.
              </p>
            </div>

            <div className="text-center group">
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 transition-all duration-300 group-hover:scale-110 ${
                isDarkMode ? 'bg-green-900' : 'bg-green-100'
              }`}>
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Quality Guarantee</h3>
              <p className="text-gray-600 dark:text-gray-400">
                All products are carefully vetted for quality and authenticity with 30-day returns.
              </p>
            </div>

            <div className="text-center group">
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 transition-all duration-300 group-hover:scale-110 ${
                isDarkMode ? 'bg-purple-900' : 'bg-purple-100'
              }`}>
                <User className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">24/7 Support</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Our dedicated support team is always ready to help you with any questions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Products</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Discover our handpicked selection of popular items
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onViewDetails={() => setCurrentPage(`product-${product.id}`)}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => setCurrentPage('shop')}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-all duration-200 font-medium btn-hover"
            >
              View All Products
            </button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className={`py-16 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Shop by Category</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Find exactly what you're looking for in our organized categories
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Electronics */}
            {electronicsProducts.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-semibold">Electronics</h3>
                  <button
                    onClick={() => setCurrentPage('shop')}
                    className="text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    View All →
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {electronicsProducts.map(product => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onViewDetails={() => setCurrentPage(`product-${product.id}`)}
                      className="h-full"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Clothing */}
            {clothingProducts.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-semibold">Clothing</h3>
                  <button
                    onClick={() => setCurrentPage('shop')}
                    className="text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    View All →
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {clothingProducts.map(product => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onViewDetails={() => setCurrentPage(`product-${product.id}`)}
                      className="h-full"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay in the Loop</h2>
          <p className="text-xl mb-8 opacity-90">
            Get the latest updates on new products, exclusive deals, and more!
          </p>
          
          <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
            />
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-medium">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;