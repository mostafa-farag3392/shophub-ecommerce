// API Configuration
export const API_BASE_URL = 'https://fakestoreapi.com';
export const ENDPOINTS = {
  PRODUCTS: '/products',
  CATEGORIES: '/products/categories',
  PRODUCT_BY_ID: (id) => `/products/${id}`,
  PRODUCTS_BY_CATEGORY: (category) => `/products/category/${category}`,
  USERS: '/users',
  LOGIN: '/auth/login',
  CARTS: '/carts'
};

// Local Storage Keys
export const STORAGE_KEYS = {
  CART: 'shophub_cart',
  WISHLIST: 'shophub_wishlist',
  USER: 'shophub_currentUser',
  THEME: 'shophub_isDarkMode',
  SEARCH_HISTORY: 'shophub_searchHistory',
  USER_PREFERENCES: 'shophub_userPreferences'
};

// App Configuration
export const APP_CONFIG = {
  NAME: 'ShopHub',
  DESCRIPTION: 'Your trusted online shopping destination for quality products at great prices',
  VERSION: '1.0.0',
  ITEMS_PER_PAGE: 12,
  FREE_SHIPPING_THRESHOLD: 50,
  MAX_CART_QUANTITY: 99,
  MAX_WISHLIST_ITEMS: 100,
  CURRENCY: 'USD',
  CURRENCY_SYMBOL: '$',
  TAX_RATE: 0.08, // 8% tax
  DEFAULT_SHIPPING_COST: 9.99
};

// Product Categories
export const PRODUCT_CATEGORIES = [
  {
    id: 'all',
    name: 'All Products',
    slug: 'all',
    description: 'Browse all available products'
  },
  {
    id: 'electronics',
    name: 'Electronics',
    slug: 'electronics',
    description: 'Smartphones, laptops, gadgets and more'
  },
  {
    id: 'jewelery',
    name: 'Jewelry',
    slug: 'jewelery',
    description: 'Beautiful jewelry and accessories'
  },
  {
    id: 'mens-clothing',
    name: "Men's Clothing",
    slug: 'men\'s clothing',
    description: 'Stylish clothing for men'
  },
  {
    id: 'womens-clothing',
    name: "Women's Clothing",
    slug: 'women\'s clothing',
    description: 'Fashion and clothing for women'
  }
];

// Sort Options
export const SORT_OPTIONS = [
  { 
    value: 'name', 
    label: 'Name (A-Z)',
    direction: 'asc'
  },
  { 
    value: 'name-desc', 
    label: 'Name (Z-A)',
    direction: 'desc'
  },
  { 
    value: 'price-low', 
    label: 'Price: Low to High',
    direction: 'asc'
  },
  { 
    value: 'price-high', 
    label: 'Price: High to Low',
    direction: 'desc'
  },
  { 
    value: 'rating', 
    label: 'Highest Rated',
    direction: 'desc'
  },
  { 
    value: 'rating-low', 
    label: 'Lowest Rated',
    direction: 'asc'
  },
  { 
    value: 'newest', 
    label: 'Newest First',
    direction: 'desc'
  },
  { 
    value: 'popular', 
    label: 'Most Popular',
    direction: 'desc'
  }
];

// Price Ranges for Filtering
export const PRICE_RANGES = [
  { min: 0, max: 25, label: 'Under $25' },
  { min: 25, max: 50, label: '$25 - $50' },
  { min: 50, max: 100, label: '$50 - $100' },
  { min: 100, max: 200, label: '$100 - $200' },
  { min: 200, max: 500, label: '$200 - $500' },
  { min: 500, max: Infinity, label: 'Over $500' }
];

// Rating Filters
export const RATING_FILTERS = [
  { value: 0, label: 'All Ratings', stars: 0 },
  { value: 1, label: '1 Star & Up', stars: 1 },
  { value: 2, label: '2 Stars & Up', stars: 2 },
  { value: 3, label: '3 Stars & Up', stars: 3 },
  { value: 4, label: '4 Stars & Up', stars: 4 },
  { value: 4.5, label: '4.5 Stars & Up', stars: 4.5 }
];

// Contact Information
export const CONTACT_INFO = {
  ADDRESS: '123 Shopping Street, Commerce City, CC 12345',
  PHONE: '+1 (555) 123-4567',
  EMAIL: 'support@shophub.com',
  SUPPORT_EMAIL: 'help@shophub.com',
  BUSINESS_EMAIL: 'business@shophub.com',
  BUSINESS_HOURS: {
    WEEKDAYS: 'Monday - Friday: 9:00 AM - 6:00 PM',
    WEEKENDS: 'Saturday - Sunday: 10:00 AM - 4:00 PM',
    TIMEZONE: 'EST (Eastern Standard Time)'
  },
  SOCIAL_MEDIA: {
    FACEBOOK: 'https://facebook.com/shophub',
    TWITTER: 'https://twitter.com/shophub',
    INSTAGRAM: 'https://instagram.com/shophub',
    LINKEDIN: 'https://linkedin.com/company/shophub',
    YOUTUBE: 'https://youtube.com/shophub'
  }
};

// Social Media Links
export const SOCIAL_LINKS = [
  {
    name: 'Facebook',
    url: CONTACT_INFO.SOCIAL_MEDIA.FACEBOOK,
    icon: 'facebook',
    color: '#1877F2'
  },
  {
    name: 'Twitter',
    url: CONTACT_INFO.SOCIAL_MEDIA.TWITTER,
    icon: 'twitter',
    color: '#1DA1F2'
  },
  {
    name: 'Instagram',
    url: CONTACT_INFO.SOCIAL_MEDIA.INSTAGRAM,
    icon: 'instagram',
    color: '#E4405F'
  },
  {
    name: 'LinkedIn',
    url: CONTACT_INFO.SOCIAL_MEDIA.LINKEDIN,
    icon: 'linkedin',
    color: '#0A66C2'
  },
  {
    name: 'YouTube',
    url: CONTACT_INFO.SOCIAL_MEDIA.YOUTUBE,
    icon: 'youtube',
    color: '#FF0000'
  }
];

// Payment Methods
export const PAYMENT_METHODS = [
  {
    id: 'card',
    name: 'Credit/Debit Card',
    description: 'Visa, Mastercard, American Express',
    icon: 'credit-card',
    enabled: true
  },
  {
    id: 'paypal',
    name: 'PayPal',
    description: 'Pay with your PayPal account',
    icon: 'paypal',
    enabled: true
  },
  {
    id: 'apple-pay',
    name: 'Apple Pay',
    description: 'Touch ID or Face ID',
    icon: 'apple-pay',
    enabled: false
  },
  {
    id: 'google-pay',
    name: 'Google Pay',
    description: 'Quick and secure payments',
    icon: 'google-pay',
    enabled: false
  }
];

// Shipping Options
export const SHIPPING_OPTIONS = [
  {
    id: 'standard',
    name: 'Standard Shipping',
    description: '5-7 business days',
    cost: 0, // Free for orders over threshold
    estimatedDays: { min: 5, max: 7 },
    freeThreshold: APP_CONFIG.FREE_SHIPPING_THRESHOLD
  },
  {
    id: 'express',
    name: 'Express Shipping',
    description: '2-3 business days',
    cost: 14.99,
    estimatedDays: { min: 2, max: 3 }
  },
  {
    id: 'overnight',
    name: 'Overnight Shipping',
    description: 'Next business day',
    cost: 29.99,
    estimatedDays: { min: 1, max: 1 }
  }
];

// Order Status Options
export const ORDER_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
  RETURNED: 'returned'
};

// Order Status Labels
export const ORDER_STATUS_LABELS = {
  [ORDER_STATUS.PENDING]: 'Order Pending',
  [ORDER_STATUS.PROCESSING]: 'Processing',
  [ORDER_STATUS.SHIPPED]: 'Shipped',
  [ORDER_STATUS.DELIVERED]: 'Delivered',
  [ORDER_STATUS.CANCELLED]: 'Cancelled',
  [ORDER_STATUS.RETURNED]: 'Returned'
};

// Countries List (abbreviated)
export const COUNTRIES = [
  { code: 'US', name: 'United States' },
  { code: 'CA', name: 'Canada' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'AU', name: 'Australia' },
  { code: 'DE', name: 'Germany' },
  { code: 'FR', name: 'France' },
  { code: 'IT', name: 'Italy' },
  { code: 'ES', name: 'Spain' },
  { code: 'JP', name: 'Japan' },
  { code: 'CN', name: 'China' },
  { code: 'IN', name: 'India' },
  { code: 'BR', name: 'Brazil' },
  { code: 'MX', name: 'Mexico' },
  { code: 'NL', name: 'Netherlands' },
  { code: 'SE', name: 'Sweden' },
  { code: 'NO', name: 'Norway' },
  { code: 'DK', name: 'Denmark' },
  { code: 'FI', name: 'Finland' }
];

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  API_ERROR: 'Something went wrong. Please try again.',
  PRODUCT_NOT_FOUND: 'Product not found.',
  CART_ERROR: 'Unable to update cart. Please try again.',
  WISHLIST_ERROR: 'Unable to update wishlist. Please try again.',
  LOGIN_REQUIRED: 'Please login to continue.',
  FORM_VALIDATION: 'Please fill in all required fields.',
  CHECKOUT_ERROR: 'Checkout failed. Please try again.',
  PAYMENT_ERROR: 'Payment processing failed. Please try again.'
};

// Success Messages
export const SUCCESS_MESSAGES = {
  PRODUCT_ADDED_TO_CART: 'Product added to cart!',
  PRODUCT_ADDED_TO_WISHLIST: 'Product added to wishlist!',
  PRODUCT_REMOVED_FROM_WISHLIST: 'Product removed from wishlist.',
  PROFILE_UPDATED: 'Profile updated successfully!',
  ORDER_PLACED: 'Order placed successfully!',
  MESSAGE_SENT: 'Message sent successfully!',
  NEWSLETTER_SUBSCRIBED: 'Successfully subscribed to newsletter!'
};

// Feature Flags
export const FEATURES = {
  REVIEWS_ENABLED: false,
  CHAT_SUPPORT: false,
  NEWSLETTER: true,
  SOCIAL_LOGIN: false,
  MULTIPLE_CURRENCIES: false,
  INVENTORY_TRACKING: false,
  ORDER_TRACKING: false,
  GIFT_CARDS: false,
  LOYALTY_PROGRAM: false,
  ANALYTICS: true
};

// Theme Configuration
export const THEME_CONFIG = {
  DARK_MODE_STORAGE_KEY: STORAGE_KEYS.THEME,
  DEFAULT_THEME: 'light',
  ANIMATION_DURATION: 300,
  TRANSITION_EASING: 'ease-in-out'
};

// Validation Rules
export const VALIDATION_RULES = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_REGEX: /^\+?[\d\s\-()]+$/,
  ZIP_CODE_REGEX: /^\d{5}(-\d{4})?$/,
  PASSWORD_MIN_LENGTH: 6,
  NAME_MIN_LENGTH: 2,
  MESSAGE_MIN_LENGTH: 10,
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
};

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: APP_CONFIG.ITEMS_PER_PAGE,
  MAX_PAGE_SIZE: 50,
  PAGE_SIZE_OPTIONS: [12, 24, 36, 48]
};

// Cache Configuration
export const CACHE_CONFIG = {
  PRODUCTS_TTL: 5 * 60 * 1000, // 5 minutes
  USER_DATA_TTL: 30 * 60 * 1000, // 30 minutes
  SEARCH_RESULTS_TTL: 2 * 60 * 1000 // 2 minutes
};

// Default User Preferences
export const DEFAULT_USER_PREFERENCES = {
  theme: 'light',
  currency: 'USD',
  language: 'en',
  notifications: {
    email: true,
    push: false,
    sms: false
  },
  privacy: {
    showProfile: false,
    shareData: false
  }
};

// SEO Configuration
export const SEO_CONFIG = {
  DEFAULT_TITLE: 'ShopHub - Online Shopping Made Easy',
  DEFAULT_DESCRIPTION: 'Discover amazing products at unbeatable prices. Shop electronics, clothing, jewelry and more with fast shipping and excellent customer service.',
  DEFAULT_KEYWORDS: 'online shopping, e-commerce, electronics, clothing, jewelry, deals, free shipping',
  SITE_NAME: APP_CONFIG.NAME,
  TWITTER_HANDLE: '@shophub',
  OG_IMAGE: '/images/og-image.jpg'
};

// Analytics Events
export const ANALYTICS_EVENTS = {
  PAGE_VIEW: 'page_view',
  PRODUCT_VIEW: 'product_view',
  ADD_TO_CART: 'add_to_cart',
  REMOVE_FROM_CART: 'remove_from_cart',
  ADD_TO_WISHLIST: 'add_to_wishlist',
  REMOVE_FROM_WISHLIST: 'remove_from_wishlist',
  SEARCH: 'search',
  FILTER: 'filter',
  PURCHASE: 'purchase',
  REGISTER: 'register',
  LOGIN: 'login',
  LOGOUT: 'logout'
};

// Export all constants as default
const constants = {
  API_BASE_URL,
  ENDPOINTS,
  // ... all other exports
};

export default constants;