/* ================================= */
/* MAIN JAVASCRIPT - MAIN STREET SCHOOL */
/* ================================= */

$(document).ready(function() {
    'use strict';
    
    // =================================
    // INITIALIZATION
    // =================================
    initializeApp();
    
    // =================================
    // SPINNER MANAGEMENT
    // =================================
    
    /**
     * Hide the loading spinner
     */
    function hideSpinner() {
        const spinner = $('#spinner');
        if (spinner.length) {
            spinner.removeClass('show');
            setTimeout(function() {
                spinner.hide();
            }, 500);
        }
    }
    
    // Hide spinner when page is loaded
    $(window).on('load', function() {
        hideSpinner();
    });
    
    // Hide spinner immediately if page is already loaded
    if (document.readyState === 'complete') {
        hideSpinner();
    }
    
    // =================================
    // CORE APPLICATION INITIALIZATION
    // =================================
    
    /**
     * Initialize the main application
     */
    function initializeApp() {
        console.log('Main Street School - Initializing application...');
        
        // Initialize all components
        initializeReadMoreButtons();
        initializeCoreValuesButtons();
        initializeAnimations();
        initializeAccessibility();
        
        // Set up event listeners
        setupEventListeners();
        
        // Run error checking
        handleMissingElements();
        
        console.log('Main Street School - Application initialized successfully');
    }
    
    // =================================
    // READ MORE/LESS FUNCTIONALITY
    // =================================
    
    /**
     * Initialize Read More buttons for main content sections
     */
    function initializeReadMoreButtons() {
        const mainReadMoreBtn = $('[data-bs-target="#whoWeAreMore"]');
        const mainCollapseEl = $('#whoWeAreMore');
        
        if (mainReadMoreBtn.length && mainCollapseEl.length) {
            // Set initial state
            updateButtonText(mainReadMoreBtn, false);
            
            // Listen for collapse events
            mainCollapseEl.on('show.bs.collapse', function() {
                updateButtonText(mainReadMoreBtn, true);
            });
            
            mainCollapseEl.on('hide.bs.collapse', function() {
                updateButtonText(mainReadMoreBtn, false);
            });
        }
    }
    
    /**
     * Initialize Core Values individual Read More buttons
     */
    function initializeCoreValuesButtons() {
        const coreValueButtons = $('.core-value-read-more');
        
        coreValueButtons.each(function() {
            const button = $(this);
            const targetId = button.attr('data-bs-target');
            const collapseEl = $(targetId);
            
            if (collapseEl.length) {
                // Set initial state
                updateButtonText(button, false);
                
                // Listen for collapse events
                collapseEl.on('show.bs.collapse', function() {
                    updateButtonText(button, true);
                });
                
                collapseEl.on('hide.bs.collapse', function() {
                    updateButtonText(button, false);
                });
            }
        });
    }
    
    /**
     * Update button text based on expanded state
     * @param {jQuery} button - The button element
     * @param {boolean} isExpanded - Whether the content is expanded
     */
    function updateButtonText(button, isExpanded) {
        const readMoreText = button.find('.read-more-text');
        const readLessText = button.find('.read-less-text');
        
        if (isExpanded) {
            readMoreText.hide();
            readLessText.show();
            button.attr('aria-expanded', 'true');
        } else {
            readMoreText.show();
            readLessText.hide();
            button.attr('aria-expanded', 'false');
        }
    }
    
    // =================================
    // ANIMATION INITIALIZATION
    // =================================
    
    /**
     * Initialize animations and scroll effects
     */
    function initializeAnimations() {
        // Initialize WOW.js if available
        if (typeof WOW !== 'undefined') {
            new WOW().init();
        }
        
        // Custom scroll animations
        initializeScrollAnimations();
    }
    
    /**
     * Initialize custom scroll animations
     */
    function initializeScrollAnimations() {
        const animatedElements = $('.wow');
        
        if (animatedElements.length) {
            // Use Intersection Observer if available
            if ('IntersectionObserver' in window) {
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.style.visibility = 'visible';
                            entry.target.classList.add('animated');
                        }
                    });
                }, {
                    threshold: 0.1,
                    rootMargin: '0px 0px -50px 0px'
                });
                
                animatedElements.each(function() {
                    observer.observe(this);
                });
            } else {
                // Fallback for older browsers
                animatedElements.each(function() {
                    $(this).css('visibility', 'visible');
                });
            }
        }
    }
    
    // =================================
    // ACCESSIBILITY INITIALIZATION
    // =================================
    
    /**
     * Initialize accessibility features
     */
    function initializeAccessibility() {
        // Add keyboard support for Read More buttons
        $('[data-bs-toggle="collapse"], .core-value-read-more').on('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                $(this).click();
            }
        });
        
        // Add focus management for collapsed content
        $('[data-bs-toggle="collapse"]').on('shown.bs.collapse', function() {
            const target = $($(this).attr('data-bs-target'));
            if (target.length) {
                // Focus the first focusable element in the expanded content
                const firstFocusable = target.find('a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])').first();
                if (firstFocusable.length) {
                    firstFocusable.focus();
                }
            }
        });
        
        // Add skip links functionality
        initializeSkipLinks();
    }
    
    /**
     * Initialize skip links for keyboard navigation
     */
    function initializeSkipLinks() {
        $('.skip-link').on('click', function(e) {
            e.preventDefault();
            const target = $($(this).attr('href'));
            if (target.length) {
                target.focus();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
    
    // =================================
    // EVENT LISTENERS SETUP
    // =================================
    
    /**
     * Set up all event listeners
     */
    function setupEventListeners() {
        // Handle window resize with debouncing
        $(window).on('resize', debounce(handleWindowResize, 250));
        
        // Handle scroll events with debouncing
        $(window).on('scroll', debounce(handleScroll, 100));
        
        // Handle form submissions
        $('form').on('submit', handleFormSubmit);
        
        // Handle external links
        $('a[href^="http"]').on('click', handleExternalLinks);
        
        // Handle image loading errors
        $('img').on('error', handleImageError);
    }
    
    /**
     * Handle window resize events
     */
    function handleWindowResize() {
        // Recalculate any layout-dependent elements
        // This is where you'd add any resize-specific logic
        console.log('Window resized - recalculating layout');
    }
    
    /**
     * Handle scroll events
     */
    function handleScroll() {
        // Handle scroll-based animations or effects
        // This is where you'd add any scroll-specific logic
    }
    
    /**
     * Handle form submissions
     */
    function handleFormSubmit(e) {
        const form = $(e.target);
        const submitBtn = form.find('button[type="submit"]');
        
        // Prevent double submission
        if (submitBtn.hasClass('submitting')) {
            e.preventDefault();
            return;
        }
        
        // Add loading state
        submitBtn.addClass('submitting').prop('disabled', true);
        
        // You can add form validation and submission logic here
        
        // Remove loading state after a delay (for demo purposes)
        setTimeout(() => {
            submitBtn.removeClass('submitting').prop('disabled', false);
        }, 2000);
    }
    
    /**
     * Handle external links
     */
    function handleExternalLinks(e) {
        const link = $(e.target);
        const href = link.attr('href');
        
        // Open external links in new tab
        if (href && !href.includes(window.location.hostname)) {
            link.attr('target', '_blank');
            link.attr('rel', 'noopener noreferrer');
        }
    }
    
    /**
     * Handle image loading errors
     */
    function handleImageError(e) {
        const img = $(e.target);
        const fallbackSrc = img.data('fallback') || 'img/placeholder.jpg';
        
        // Set fallback image
        img.attr('src', fallbackSrc);
        img.addClass('image-error');
        
        console.warn('Image failed to load:', img.attr('src'));
    }
    
    // =================================
    // UTILITY FUNCTIONS
    // =================================
    
    /**
     * Debounce function to limit how often a function can be called
     * @param {Function} func - The function to debounce
     * @param {number} wait - The wait time in milliseconds
     * @returns {Function} - The debounced function
     */
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    /**
     * Check if element is in viewport
     * @param {jQuery} element - The element to check
     * @returns {boolean} - Whether the element is in viewport
     */
    function isInViewport(element) {
        const rect = element[0].getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    /**
     * Smooth scroll to element
     * @param {string|jQuery} target - The target element
     * @param {number} offset - Offset from top
     */
    function smoothScrollTo(target, offset = 0) {
        const element = typeof target === 'string' ? $(target) : target;
        if (element.length) {
            const elementTop = element.offset().top - offset;
            $('html, body').animate({
                scrollTop: elementTop
            }, 800, 'easeInOutQuart');
        }
    }
    
    // =================================
    // ERROR HANDLING
    // =================================
    
    /**
     * Handle missing elements gracefully
     */
    function handleMissingElements() {
        const requiredElements = [
            { selector: '[data-bs-target="#whoWeAreMore"]', name: 'Main Read More button' },
            { selector: '#whoWeAreMore', name: 'Main collapse element' },
            { selector: '.core-value-read-more', name: 'Core Values buttons' }
        ];
        
        requiredElements.forEach(function(item) {
            if ($(item.selector).length === 0) {
                console.warn(`Missing element: ${item.name} (${item.selector})`);
            }
        });
    }
    
    // Global error handler for JavaScript errors
    window.addEventListener('error', function(e) {
        console.error('JavaScript error:', e.error);
        // You could add error reporting here
    });
    
    // =================================
    // PERFORMANCE OPTIMIZATIONS
    // =================================
    
    // Use passive event listeners where possible
    if ('addEventListener' in window) {
        window.addEventListener('scroll', function() {}, { passive: true });
        window.addEventListener('resize', function() {}, { passive: true });
    }
    
    // =================================
    // DEBUGGING HELPERS
    // =================================
    
    // Add debug logging if needed
    if (window.location.search.includes('debug=true')) {
        console.log('Main Street School JavaScript initialized');
        console.log('Read More buttons found:', $('[data-bs-toggle="collapse"]').length);
        console.log('Core Values buttons found:', $('.core-value-read-more').length);
        console.log('WOW elements found:', $('.wow').length);
    }
    
    // =================================
    // PUBLIC API (for other scripts)
    // =================================
    
    // Expose useful functions to global scope
    window.MainStreetSchool = {
        smoothScrollTo: smoothScrollTo,
        isInViewport: isInViewport,
        debounce: debounce,
        updateButtonText: updateButtonText
    };
});

