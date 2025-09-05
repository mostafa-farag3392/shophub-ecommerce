import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Edit, Save, X, ShoppingCart, Heart, Package, Calendar } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const AccountPage = ({ setCurrentPage }) => {
  const { currentUser, updateUser, cart, wishlist, isDarkMode } = useAppContext();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
    address: currentUser?.address || '',
    city: currentUser?.city || '',
    country: currentUser?.country || '',
    zipCode: currentUser?.zipCode || ''
  });

  if (!currentUser) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50'} py-8`}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold mb-8">My Account</h1>
          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg p-12`}>
            <User className="h-16 w-16 text-gray-400 mx-auto mb-6" />
            <h2 className="text-2xl font-bold mb-4">Please Login</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              You need to be logged in to access your account
            </p>
            <div className="space-x-4">
              <button
                onClick={() => setCurrentPage('login')}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Login Now
              </button>
              <button
                onClick={() => setCurrentPage('home')}
                className={`px-8 py-3 rounded-lg transition-colors font-medium ${
                  isDarkMode 
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Go Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleSave = () => {
    updateUser(formData);
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  const handleCancel = () => {
    setFormData({
      name: currentUser.name || '',
      email: currentUser.email || '',
      phone: currentUser.phone || '',
      address: currentUser.address || '',
      city: currentUser.city || '',
      country: currentUser.country || '',
      zipCode: currentUser.zipCode || ''
    });
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const totalSpent = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const stats = [
    {
      icon: ShoppingCart,
      label: 'Cart Items',
      value: totalItems,
      color: 'bg-blue-100 dark:bg-blue-900 text-blue-600',
      action: () => setCurrentPage('cart')
    },
    {
      icon: Heart,
      label: 'Wishlist',
      value: wishlist.length,
      color: 'bg-red-100 dark:bg-red-900 text-red-600',
      action: () => setCurrentPage('wishlist')
    },
    {
      icon: Package,
      label: 'Orders',
      value: '12', // Mock data
      color: 'bg-green-100 dark:bg-green-900 text-green-600',
      action: () => alert('Order history feature coming soon!')
    },
    {
      icon: Calendar,
      label: 'Member Since',
      value: new Date(currentUser.joinDate || Date.now()).getFullYear(),
      color: 'bg-purple-100 dark:bg-purple-900 text-purple-600',
      action: null
    }
  ];

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50'} py-8`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">My Account</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Manage your profile and account settings
            </p>
          </div>
          
          {/* Profile Avatar */}
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
              {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <div>
              <p className="font-semibold text-lg">{currentUser.name}</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">{currentUser.email}</p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div 
                key={index} 
                className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6 ${
                  stat.action ? 'cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105' : ''
                }`}
                onClick={stat.action}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg ${stat.color}`}>
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <div className="text-2xl font-bold">{stat.value}</div>
                </div>
                <p className="text-gray-600 dark:text-gray-400 font-medium">{stat.label}</p>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Information */}
          <div className="lg:col-span-2">
            <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-8`}>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold">Profile Information</h2>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Edit className="h-4 w-4" />
                    <span>Edit Profile</span>
                  </button>
                ) : (
                  <div className="flex space-x-2">
                    <button
                      onClick={handleSave}
                      className="flex items-center space-x-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <Save className="h-4 w-4" />
                      <span>Save</span>
                    </button>
                    <button
                      onClick={handleCancel}
                      className="flex items-center space-x-1 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      <X className="h-4 w-4" />
                      <span>Cancel</span>
                    </button>
                  </div>
                )}
              </div>
              
              {isEditing ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-lg border ${
                          isDarkMode 
                            ? 'bg-gray-700 border-gray-600 text-white' 
                            : 'bg-white border-gray-300'
                        } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-lg border ${
                          isDarkMode 
                            ? 'bg-gray-700 border-gray-600 text-white' 
                            : 'bg-white border-gray-300'
                        } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-lg border ${
                          isDarkMode 
                            ? 'bg-gray-700 border-gray-600 text-white' 
                            : 'bg-white border-gray-300'
                        } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">City</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-lg border ${
                          isDarkMode 
                            ? 'bg-gray-700 border-gray-600 text-white' 
                            : 'bg-white border-gray-300'
                        } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Address</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-lg border ${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300'
                      } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Country</label>
                      <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-lg border ${
                          isDarkMode 
                            ? 'bg-gray-700 border-gray-600 text-white' 
                            : 'bg-white border-gray-300'
                        } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">ZIP Code</label>
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-lg border ${
                          isDarkMode 
                            ? 'bg-gray-700 border-gray-600 text-white' 
                            : 'bg-white border-gray-300'
                        } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                        <User className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">Name</label>
                        <p className="text-lg font-medium">{currentUser.name || 'Not provided'}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                        <Mail className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">Email</label>
                        <p className="text-lg font-medium">{currentUser.email}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                        <Phone className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">Phone</label>
                        <p className="text-lg font-medium">{currentUser.phone || 'Not provided'}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                        <MapPin className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">Location</label>
                        <p className="text-lg font-medium">
                          {currentUser.city && currentUser.country 
                            ? `${currentUser.city}, ${currentUser.country}` 
                            : 'Not provided'
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {currentUser.address && (
                    <div className="flex items-start space-x-4">
                      <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                        <MapPin className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">Address</label>
                        <p className="text-lg font-medium">{currentUser.address}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions & Summary */}
          <div className="space-y-6">
            {/* Account Summary */}
            <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
              <h3 className="text-lg font-bold mb-6">Account Summary</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Current Cart Value</span>
                  <span className="font-bold text-blue-600 text-lg">
                    ${totalSpent.toFixed(2)}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Total Saved Items</span>
                  <span className="font-bold">{wishlist.length}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Account Status</span>
                  <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded-full text-xs font-medium">
                    Active
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
              <h3 className="text-lg font-bold mb-6">Quick Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={() => setCurrentPage('cart')}
                  className={`w-full text-left p-4 rounded-lg transition-colors ${
                    isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                  } flex items-center space-x-3`}
                >
                  <ShoppingCart className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium">View Cart</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{totalItems} items</p>
                  </div>
                </button>
                
                <button
                  onClick={() => setCurrentPage('wishlist')}
                  className={`w-full text-left p-4 rounded-lg transition-colors ${
                    isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                  } flex items-center space-x-3`}
                >
                  <Heart className="h-5 w-5 text-red-600" />
                  <div>
                    <p className="font-medium">View Wishlist</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{wishlist.length} items</p>
                  </div>
                </button>
                
                <button
                  onClick={() => setCurrentPage('shop')}
                  className={`w-full text-left p-4 rounded-lg transition-colors ${
                    isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                  } flex items-center space-x-3`}
                >
                  <Package className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-medium">Continue Shopping</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Discover more products</p>
                  </div>
                </button>
              </div>
            </div>

            {/* Account Settings */}
            <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
              <h3 className="text-lg font-bold mb-6">Account Settings</h3>
              <div className="space-y-3">
                <button className={`w-full text-left p-3 rounded-lg transition-colors ${
                  isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                } text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100`}>
                  Change Password
                </button>
                <button className={`w-full text-left p-3 rounded-lg transition-colors ${
                  isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                } text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100`}>
                  Privacy Settings
                </button>
                <button className={`w-full text-left p-3 rounded-lg transition-colors ${
                  isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                } text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100`}>
                  Notification Preferences
                </button>
                <button 
                  className="w-full text-left p-3 rounded-lg transition-colors hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600"
                  onClick={() => {
                    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
                      alert('Account deletion feature would be implemented here');
                    }
                  }}
                >
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;