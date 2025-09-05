import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocalStorageState } from '../hooks/useLocalStorage';
import { API_BASE_URL, ENDPOINTS, STORAGE_KEYS } from '../utils/constants';

// Create Context
const AppContext = createContext();

// Context Provider Component
export const AppProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // State with localStorage persistence
  const [cart, setCart] = useLocalStorageState(STORAGE_KEYS.CART, []);
  const [wishlist, setWishlist] = useLocalStorageState(STORAGE_KEYS.WISHLIST, []);
  const [currentUser, setCurrentUser] = useLocalStorageState(STORAGE_KEYS.USER, null);
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(STORAGE_KEYS.THEME, false);
  
  // Filter and search state
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [filterCategory, setFilterCategory] = useState('all');

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`${API_BASE_URL}${ENDPOINTS.PRODUCTS}`);
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Apply dark mode to document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Cart functions
  const addToCart = (product, quantity = 1) => {
    if (!currentUser) {
      throw new Error('Please login to add items to cart');
    }

    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + quantity }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateCartQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(cart.map(item => 
        item.id === productId 
          ? { ...item, quantity }
          : item
      ));
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartItemsCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  // Wishlist functions
  const addToWishlist = (product) => {
    if (!currentUser) {
      throw new Error('Please login to add items to wishlist');
    }

    if (!wishlist.some(item => item.id === product.id)) {
      setWishlist([...wishlist, product]);
    }
  };

  const removeFromWishlist = (productId) => {
    setWishlist(wishlist.filter(item => item.id !== productId));
  };

  const toggleWishlist = (product) => {
    if (!currentUser) {
      throw new Error('Please login to manage wishlist');
    }

    const isInWishlist = wishlist.some(item => item.id === product.id);
    
    if (isInWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const isInWishlist = (productId) => {
    return wishlist.some(item => item.id === productId);
  };

  const clearWishlist = () => {
    setWishlist([]);
  };

  // User functions
  const login = (userData) => {
    setCurrentUser(userData);
  };

  const logout = () => {
    setCurrentUser(null);
    setCart([]);
    setWishlist([]);
  };

  const updateUser = (userData) => {
    setCurrentUser({ ...currentUser, ...userData });
  };

  // Filter and search functions
  const getFilteredProducts = () => {
    let filtered = products;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply category filter
    if (filterCategory !== 'all') {
      filtered = filtered.filter(product => product.category === filterCategory);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return (b.rating?.rate || 0) - (a.rating?.rate || 0);
        case 'name':
        default:
          return a.title.localeCompare(b.title);
      }
    });

    return filtered;
  };

  const getProductById = (id) => {
    return products.find(product => product.id === parseInt(id));
  };

  const getRelatedProducts = (product, limit = 4) => {
    if (!product) return [];
    
    return products
      .filter(p => p.category === product.category && p.id !== product.id)
      .slice(0, limit);
  };

  const getProductsByCategory = (category, limit) => {
    let filtered = products.filter(product => product.category === category);
    return limit ? filtered.slice(0, limit) : filtered;
  };

  // Context value
  const contextValue = {
    // Products state
    products,
    loading,
    error,
    
    // Cart state and functions
    cart,
    setCart,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    getCartTotal,
    getCartItemsCount,
    
    // Wishlist state and functions
    wishlist,
    setWishlist,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    isInWishlist,
    clearWishlist,
    
    // User state and functions
    currentUser,
    setCurrentUser,
    login,
    logout,
    updateUser,
    
    // Theme state
    isDarkMode,
    setIsDarkMode,
    
    // Search and filter state
    searchTerm,
    setSearchTerm,
    sortBy,
    setSortBy,
    filterCategory,
    setFilterCategory,
    
    // Utility functions
    getFilteredProducts,
    getProductById,
    getRelatedProducts,
    getProductsByCategory,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the context
export const useAppContext = () => {
  const context = useContext(AppContext);
  
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  
  return context;
};

export default AppContext;