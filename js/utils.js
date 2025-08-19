/* ================================= */
/* UTILITIES JAVASCRIPT - MAIN STREET SCHOOL */
/* ================================= */

/**
 * Utility functions for Main Street School website
 * This file contains helper functions, validation utilities, and common operations
 */

// =================================
// DOM UTILITIES
// =================================

/**
 * Get element by selector with error handling
 * @param {string} selector - CSS selector
 * @param {string} context - Context element (optional)
 * @returns {jQuery|null} - jQuery element or null if not found
 */
function getElement(selector, context = document) {
    const element = $(selector, context);
    if (element.length === 0) {
        console.warn(`Element not found: ${selector}`);
        return null;
    }
    return element;
}

/**
 * Check if element exists
 * @param {string} selector - CSS selector
 * @returns {boolean} - Whether element exists
 */
function elementExists(selector) {
    return $(selector).length > 0;
}

/**
 * Show element with animation
 * @param {jQuery|string} element - Element to show
 * @param {string} animation - Animation type (fade, slide, etc.)
 * @param {number} duration - Animation duration in ms
 */
function showElement(element, animation = 'fade', duration = 300) {
    const $element = typeof element === 'string' ? $(element) : element;
    if ($element.length) {
        switch (animation) {
            case 'fade':
                $element.fadeIn(duration);
                break;
            case 'slide':
                $element.slideDown(duration);
                break;
            default:
                $element.show();
        }
    }
}

/**
 * Hide element with animation
 * @param {jQuery|string} element - Element to hide
 * @param {string} animation - Animation type (fade, slide, etc.)
 * @param {number} duration - Animation duration in ms
 */
function hideElement(element, animation = 'fade', duration = 300) {
    const $element = typeof element === 'string' ? $(element) : element;
    if ($element.length) {
        switch (animation) {
            case 'fade':
                $element.fadeOut(duration);
                break;
            case 'slide':
                $element.slideUp(duration);
                break;
            default:
                $element.hide();
        }
    }
}

/**
 * Toggle element visibility
 * @param {jQuery|string} element - Element to toggle
 * @param {string} animation - Animation type
 * @param {number} duration - Animation duration in ms
 */
function toggleElement(element, animation = 'fade', duration = 300) {
    const $element = typeof element === 'string' ? $(element) : element;
    if ($element.length) {
        if ($element.is(':visible')) {
            hideElement($element, animation, duration);
        } else {
            showElement($element, animation, duration);
        }
    }
}

// =================================
// VALIDATION UTILITIES
// =================================

/**
 * Email validation
 * @param {string} email - Email to validate
 * @returns {boolean} - Whether email is valid
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Phone number validation (US format)
 * @param {string} phone - Phone number to validate
 * @returns {boolean} - Whether phone number is valid
 */
function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
    return phoneRegex.test(cleanPhone);
}

/**
 * Required field validation
 * @param {string} value - Value to validate
 * @returns {boolean} - Whether field is not empty
 */
function isRequired(value) {
    return value !== null && value !== undefined && value.toString().trim() !== '';
}

/**
 * Minimum length validation
 * @param {string} value - Value to validate
 * @param {number} minLength - Minimum required length
 * @returns {boolean} - Whether value meets minimum length
 */
function hasMinLength(value, minLength) {
    return value && value.toString().length >= minLength;
}

/**
 * Maximum length validation
 * @param {string} value - Value to validate
 * @param {number} maxLength - Maximum allowed length
 * @returns {boolean} - Whether value is within maximum length
 */
function hasMaxLength(value, maxLength) {
    return value && value.toString().length <= maxLength;
}

/**
 * URL validation
 * @param {string} url - URL to validate
 * @returns {boolean} - Whether URL is valid
 */
function isValidUrl(url) {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

// =================================
// STRING UTILITIES
// =================================

/**
 * Capitalize first letter of string
 * @param {string} str - String to capitalize
 * @returns {string} - Capitalized string
 */
function capitalize(str) {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Convert string to title case
 * @param {string} str - String to convert
 * @returns {string} - Title case string
 */
function toTitleCase(str) {
    if (!str) return str;
    return str.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

/**
 * Truncate string to specified length
 * @param {string} str - String to truncate
 * @param {number} length - Maximum length
 * @param {string} suffix - Suffix to add (default: '...')
 * @returns {string} - Truncated string
 */
function truncate(str, length, suffix = '...') {
    if (!str || str.length <= length) return str;
    return str.substring(0, length) + suffix;
}

/**
 * Remove HTML tags from string
 * @param {string} str - String to clean
 * @returns {string} - Clean string without HTML tags
 */
function stripHtml(str) {
    if (!str) return str;
    return str.replace(/<[^>]*>/g, '');
}

/**
 * Generate random string
 * @param {number} length - Length of random string
 * @returns {string} - Random string
 */
function randomString(length = 8) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

// =================================
// NUMBER UTILITIES
// =================================

/**
 * Format number with commas
 * @param {number} num - Number to format
 * @returns {string} - Formatted number
 */
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * Format currency
 * @param {number} amount - Amount to format
 * @param {string} currency - Currency code (default: 'USD')
 * @returns {string} - Formatted currency
 */
function formatCurrency(amount, currency = 'USD') {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency
    }).format(amount);
}

/**
 * Clamp number between min and max values
 * @param {number} num - Number to clamp
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} - Clamped number
 */
function clamp(num, min, max) {
    return Math.min(Math.max(num, min), max);
}

/**
 * Generate random number between min and max
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} - Random number
 */
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// =================================
// DATE UTILITIES
// =================================

/**
 * Format date to readable string
 * @param {Date|string} date - Date to format
 * @param {string} format - Format string (default: 'MM/DD/YYYY')
 * @returns {string} - Formatted date
 */
function formatDate(date, format = 'MM/DD/YYYY') {
    const d = new Date(date);
    if (isNaN(d.getTime())) return '';
    
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');
    const year = d.getFullYear();
    
    return format
        .replace('MM', month)
        .replace('DD', day)
        .replace('YYYY', year);
}

/**
 * Get relative time (e.g., "2 hours ago")
 * @param {Date|string} date - Date to get relative time for
 * @returns {string} - Relative time string
 */
function getRelativeTime(date) {
    const now = new Date();
    const past = new Date(date);
    const diffInSeconds = Math.floor((now - past) / 1000);
    
    if (diffInSeconds < 60) return 'just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} days ago`;
    if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)} months ago`;
    return `${Math.floor(diffInSeconds / 31536000)} years ago`;
}

/**
 * Check if date is today
 * @param {Date|string} date - Date to check
 * @returns {boolean} - Whether date is today
 */
function isToday(date) {
    const today = new Date();
    const checkDate = new Date(date);
    return today.toDateString() === checkDate.toDateString();
}

// =================================
// ARRAY UTILITIES
// =================================

/**
 * Remove duplicates from array
 * @param {Array} array - Array to deduplicate
 * @returns {Array} - Array without duplicates
 */
function removeDuplicates(array) {
    return [...new Set(array)];
}

/**
 * Shuffle array
 * @param {Array} array - Array to shuffle
 * @returns {Array} - Shuffled array
 */
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

/**
 * Group array by key
 * @param {Array} array - Array to group
 * @param {string} key - Key to group by
 * @returns {Object} - Grouped object
 */
function groupBy(array, key) {
    return array.reduce((groups, item) => {
        const group = item[key];
        groups[group] = groups[group] || [];
        groups[group].push(item);
        return groups;
    }, {});
}

// =================================
// OBJECT UTILITIES
// =================================

/**
 * Deep clone object
 * @param {Object} obj - Object to clone
 * @returns {Object} - Cloned object
 */
function deepClone(obj) {
    if (obj === null || typeof obj !== 'object') return obj;
    if (obj instanceof Date) return new Date(obj.getTime());
    if (obj instanceof Array) return obj.map(item => deepClone(item));
    if (typeof obj === 'object') {
        const clonedObj = {};
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                clonedObj[key] = deepClone(obj[key]);
            }
        }
        return clonedObj;
    }
}

/**
 * Merge objects deeply
 * @param {...Object} objects - Objects to merge
 * @returns {Object} - Merged object
 */
function deepMerge(...objects) {
    const result = {};
    
    objects.forEach(obj => {
        if (obj && typeof obj === 'object') {
            Object.keys(obj).forEach(key => {
                if (obj[key] && typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
                    result[key] = deepMerge(result[key] || {}, obj[key]);
                } else {
                    result[key] = obj[key];
                }
            });
        }
    });
    
    return result;
}

// =================================
// BROWSER UTILITIES
// =================================

/**
 * Check if browser supports feature
 * @param {string} feature - Feature to check
 * @returns {boolean} - Whether feature is supported
 */
function isSupported(feature) {
    const features = {
        'localStorage': () => {
            try {
                localStorage.setItem('test', 'test');
                localStorage.removeItem('test');
                return true;
            } catch {
                return false;
            }
        },
        'sessionStorage': () => {
            try {
                sessionStorage.setItem('test', 'test');
                sessionStorage.removeItem('test');
                return true;
            } catch {
                return false;
            }
        },
        'geolocation': () => 'geolocation' in navigator,
        'webp': () => {
            const canvas = document.createElement('canvas');
            canvas.width = 1;
            canvas.height = 1;
            return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
        }
    };
    
    return features[feature] ? features[feature]() : false;
}

/**
 * Get browser information
 * @returns {Object} - Browser information
 */
function getBrowserInfo() {
    const userAgent = navigator.userAgent;
    let browser = 'Unknown';
    let version = 'Unknown';
    
    if (userAgent.includes('Chrome')) {
        browser = 'Chrome';
        version = userAgent.match(/Chrome\/(\d+)/)?.[1] || 'Unknown';
    } else if (userAgent.includes('Firefox')) {
        browser = 'Firefox';
        version = userAgent.match(/Firefox\/(\d+)/)?.[1] || 'Unknown';
    } else if (userAgent.includes('Safari')) {
        browser = 'Safari';
        version = userAgent.match(/Version\/(\d+)/)?.[1] || 'Unknown';
    } else if (userAgent.includes('Edge')) {
        browser = 'Edge';
        version = userAgent.match(/Edge\/(\d+)/)?.[1] || 'Unknown';
    }
    
    return { browser, version, userAgent };
}

/**
 * Get device type
 * @returns {string} - Device type
 */
function getDeviceType() {
    const userAgent = navigator.userAgent;
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)) {
        return 'mobile';
    } else if (/iPad/i.test(userAgent)) {
        return 'tablet';
    } else {
        return 'desktop';
    }
}

// =================================
// STORAGE UTILITIES
// =================================

/**
 * Set localStorage item with error handling
 * @param {string} key - Storage key
 * @param {*} value - Value to store
 * @returns {boolean} - Whether storage was successful
 */
function setStorageItem(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch (error) {
        console.error('Failed to set storage item:', error);
        return false;
    }
}

/**
 * Get localStorage item with error handling
 * @param {string} key - Storage key
 * @param {*} defaultValue - Default value if not found
 * @returns {*} - Stored value or default
 */
function getStorageItem(key, defaultValue = null) {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
        console.error('Failed to get storage item:', error);
        return defaultValue;
    }
}

/**
 * Remove localStorage item
 * @param {string} key - Storage key
 * @returns {boolean} - Whether removal was successful
 */
function removeStorageItem(key) {
    try {
        localStorage.removeItem(key);
        return true;
    } catch (error) {
        console.error('Failed to remove storage item:', error);
        return false;
    }
}

// =================================
// EXPORT UTILITIES
// =================================

// Make utilities available globally
window.MainStreetSchoolUtils = {
    // DOM utilities
    getElement,
    elementExists,
    showElement,
    hideElement,
    toggleElement,
    
    // Validation utilities
    isValidEmail,
    isValidPhone,
    isRequired,
    hasMinLength,
    hasMaxLength,
    isValidUrl,
    
    // String utilities
    capitalize,
    toTitleCase,
    truncate,
    stripHtml,
    randomString,
    
    // Number utilities
    formatNumber,
    formatCurrency,
    clamp,
    randomNumber,
    
    // Date utilities
    formatDate,
    getRelativeTime,
    isToday,
    
    // Array utilities
    removeDuplicates,
    shuffleArray,
    groupBy,
    
    // Object utilities
    deepClone,
    deepMerge,
    
    // Browser utilities
    isSupported,
    getBrowserInfo,
    getDeviceType,
    
    // Storage utilities
    setStorageItem,
    getStorageItem,
    removeStorageItem
};
