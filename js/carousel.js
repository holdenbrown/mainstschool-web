/* ================================= */
/* CAROUSEL INITIALIZATION - MAIN STREET SCHOOL */
/* ================================= */

$(document).ready(function() {
    'use strict';
    
    // =================================
    // HEADER CAROUSEL INITIALIZATION
    // =================================
    
    /**
     * Initialize the header carousel
     */
    function initializeHeaderCarousel() {
        const headerCarousel = $('#headerCarousel');
        
        if (headerCarousel.length) {
            headerCarousel.owlCarousel({
                items: 1,
                loop: true,
                margin: 0,
                nav: true,
                dots: false,
                autoplay: true,
                autoplayTimeout: 5000,
                autoplayHoverPause: true,
                smartSpeed: 1000,
                navText: [
                    '<i class="bi bi-chevron-left"></i>',
                    '<i class="bi bi-chevron-right"></i>'
                ],
                responsive: {
                    0: {
                        items: 1
                    },
                    768: {
                        items: 1
                    },
                    992: {
                        items: 1
                    }
                }
            });
        }
    }
    
    // =================================
    // TESTIMONIAL CAROUSEL INITIALIZATION
    // =================================
    
    /**
     * Initialize the testimonial carousel
     */
    function initializeTestimonialCarousel() {
        const testimonialCarousel = $('#testimonialCarousel');
        
        if (testimonialCarousel.length) {
            // Sample testimonial data - this should be loaded from a data source
            const testimonials = [
                {
                    quote: "Main Street School has been an incredible experience for our family. The individualized attention and whole-child approach have made all the difference in our child's development.",
                    author: "Sarah Johnson",
                    role: "Parent"
                },
                {
                    quote: "The teachers here truly understand how to nurture each child's unique potential. Our daughter has grown so much academically and socially since starting here.",
                    author: "Michael Chen",
                    role: "Parent"
                },
                {
                    quote: "As an alumni, I can say that Main Street School gave me the foundation I needed for success. The project-based learning approach prepared me well for higher education.",
                    author: "Emily Rodriguez",
                    role: "Alumni"
                },
                {
                    quote: "The small class sizes and personalized curriculum allow each child to thrive. We couldn't be happier with our choice of Main Street School.",
                    author: "David Thompson",
                    role: "Parent"
                }
            ];
            
            // Populate testimonial carousel
            testimonials.forEach(function(testimonial) {
                const testimonialHtml = `
                    <div class="testimonial-item">
                        <div class="testimonial-content">
                            <div class="testimonial-quote-icon">
                                <i class="bi bi-quote text-primary fs-1"></i>
                            </div>
                            <div class="testimonial-text">
                                <p>${testimonial.quote}</p>
                            </div>
                        </div>
                        <div class="testimonial-author">
                            <h5 class="mb-1">${testimonial.author}</h5>
                            <span>${testimonial.role}</span>
                        </div>
                    </div>
                `;
                testimonialCarousel.append(testimonialHtml);
            });
            
            // Initialize Owl Carousel
            testimonialCarousel.owlCarousel({
                items: 1,
                loop: true,
                margin: 30,
                nav: true,
                dots: true,
                autoplay: true,
                autoplayTimeout: 6000,
                autoplayHoverPause: true,
                smartSpeed: 1000,
                navText: [
                    '<i class="bi bi-chevron-left"></i>',
                    '<i class="bi bi-chevron-right"></i>'
                ],
                responsive: {
                    0: {
                        items: 1,
                        margin: 15
                    },
                    768: {
                        items: 1,
                        margin: 30
                    },
                    992: {
                        items: 1,
                        margin: 30
                    }
                }
            });
        }
    }
    
    // =================================
    // INITIALIZATION
    // =================================
    
    /**
     * Initialize all carousels
     */
    function initializeCarousels() {
        console.log('Main Street School - Initializing carousels...');
        
        // Wait a bit for DOM to be fully ready
        setTimeout(function() {
            initializeHeaderCarousel();
            initializeTestimonialCarousel();
            console.log('Main Street School - Carousels initialized successfully');
        }, 100);
    }
    
    // Initialize carousels
    initializeCarousels();
    
    // Re-initialize carousels on window resize to handle responsive behavior
    $(window).on('resize', function() {
        setTimeout(function() {
            const headerCarousel = $('#headerCarousel');
            const testimonialCarousel = $('#testimonialCarousel');
            
            if (headerCarousel.length && headerCarousel.hasClass('owl-loaded')) {
                headerCarousel.trigger('refresh.owl.carousel');
            }
            
            if (testimonialCarousel.length && testimonialCarousel.hasClass('owl-loaded')) {
                testimonialCarousel.trigger('refresh.owl.carousel');
            }
        }, 200);
    });
});
