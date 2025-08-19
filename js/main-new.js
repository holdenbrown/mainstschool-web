/* ================================= */
/* MAIN JAVASCRIPT - MAIN STREET SCHOOL */
/* ================================= */

$(document).ready(function() {
    'use strict';
    
    // =================================
    // INITIALIZATION
    // =================================
    initializeReadMoreButtons();
    initializeCoreValuesButtons();
    
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
    
    // =================================
    // EVENT HANDLERS
    // =================================
    
    // Handle window resize with debouncing
    $(window).on('resize', debounce(function() {
        // Recalculate any layout-dependent elements
        // This is where you'd add any resize-specific logic
    }, 250));
    
    // Handle scroll events with debouncing
    $(window).on('scroll', debounce(function() {
        // Handle scroll-based animations or effects
        // This is where you'd add any scroll-specific logic
    }, 100));
    
    // =================================
    // ACCESSIBILITY ENHANCEMENTS
    // =================================
    
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
    
    // =================================
    // ERROR HANDLING
    // =================================
    
    // Global error handler for JavaScript errors
    window.addEventListener('error', function(e) {
        console.error('JavaScript error:', e.error);
        // You could add error reporting here
    });
    
    // Handle missing elements gracefully
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
    
    // Run error checking
    handleMissingElements();
    
    // =================================
    // PERFORMANCE OPTIMIZATIONS
    // =================================
    
    // Use passive event listeners where possible
    if ('addEventListener' in window) {
        window.addEventListener('scroll', function() {}, { passive: true });
        window.addEventListener('resize', function() {}, { passive: true });
    }
    
    // =================================
    // DEBUGGING HELPERS (remove in production)
    // =================================
    
    // Add debug logging if needed
    if (window.location.search.includes('debug=true')) {
        console.log('Main Street School JavaScript initialized');
        console.log('Read More buttons found:', $('[data-bs-toggle="collapse"]').length);
        console.log('Core Values buttons found:', $('.core-value-read-more').length);
    }
});
