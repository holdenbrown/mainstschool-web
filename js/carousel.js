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
            // Carousel content data
            const carouselSlides = [
                {
                    image: 'img/carousel-1.jpg',
                    title: 'Welcome to Main Street School',
                    subtitle: 'Nurturing Excellence, Building Character',
                    description: 'Where every child\'s unique potential is discovered and developed through personalized learning experiences.'
                },
                {
                    image: 'img/carousel-2.jpg',
                    title: 'Individualized Learning',
                    subtitle: 'Every Child is Unique',
                    description: 'Our personalized curriculum adapts to each student\'s learning style, pace, and interests.'
                },
                {
                    image: 'img/carousel-3.jpg',
                    title: 'Whole Child Development',
                    subtitle: 'Academic Excellence & Character Building',
                    description: 'We focus on developing not just academic skills, but also social, emotional, and character development.'
                },
                {
                    image: 'img/carousel-4.webp',
                    title: 'Project-Based Learning',
                    subtitle: 'Hands-On Education',
                    description: 'Students learn through engaging, real-world projects that make education meaningful and memorable.'
                },
                {
                    image: 'img/carousel-5.webp',
                    title: 'Preschool to 12th Grade',
                    subtitle: 'Complete Educational Journey',
                    description: 'From early childhood through high school graduation, we provide a continuous, supportive learning environment.'
                }
            ];
            
            // Populate carousel with slides
            carouselSlides.forEach(function(slide) {
                const slideHtml = `
                    <div class="owl-carousel-item position-relative overflow-hidden">
                        <div class="carousel-image-container">
                            <img class="carousel-image" src="${slide.image}" alt="${slide.title}">
                        </div>
                        <div class="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center" style="background: rgba(0, 0, 0, .4);">
                            <div class="container">
                                <div class="row justify-content-start">
                                    <div class="col-11 col-sm-10 col-lg-8">
                                        <h1 class="display-4 display-sm-2 text-white animated slideInDown mb-3 mb-sm-4" style="font-size: clamp(1.5rem, 5vw, 3.5rem);">${slide.title}</h1>
                                        <h2 class="text-white animated slideInDown mb-3 mb-sm-4" style="font-size: clamp(1rem, 3vw, 2rem);">${slide.subtitle}</h2>
                                        <p class="fs-6 fs-sm-5 fw-medium text-white mb-3 mb-sm-4 pb-2 animated slideInDown" style="font-size: clamp(0.875rem, 2.5vw, 1.25rem);">${slide.description}</p>
                                        <div class="dropdown animated slideInDown">
                                            <button class="btn btn-primary py-2 py-sm-3 px-4 px-sm-5 dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" style="font-size: clamp(0.875rem, 2vw, 1rem);">
                                                Enroll Now
                                            </button>
                                            <ul class="dropdown-menu rounded text-center">
                                                <li><a class="dropdown-item rounded text-center" href="contact.html#re-enroll">Re-enroll</a></li>
                                                <li><a class="dropdown-item rounded text-center" href="contact.html#new-students">New Students</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                headerCarousel.append(slideHtml);
            });
            
            // Initialize Owl Carousel
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
    // CAROUSEL ARROW POSITIONING UTILITY
    // =================================
    
    /**
     * Position carousel navigation arrows at screen edges
     */
    function positionCarouselArrows(carousel, name) {
        const navContainer = carousel.find('.owl-nav');
        console.log(name + ' - Nav container found:', navContainer.length);
        
        if (navContainer.length === 0) {
            console.log(name + ' - No nav container found, retrying...');
            setTimeout(function() {
                positionCarouselArrows(carousel, name);
            }, 500);
            return;
        }
        
        navContainer.addClass('position-absolute w-100 d-flex justify-content-between align-items-center');
        navContainer.css({
            'top': '50%',
            'transform': 'translateY(-50%)',
            'pointer-events': 'none',
            'z-index': '1000'
        });
        
        const prevBtn = navContainer.find('.owl-prev');
        const nextBtn = navContainer.find('.owl-next');
        
        console.log(name + ' - Prev button found:', prevBtn.length);
        console.log(name + ' - Next button found:', nextBtn.length);
        
        if (prevBtn.length === 0 || nextBtn.length === 0) {
            console.log(name + ' - Navigation buttons not found, retrying...');
            setTimeout(function() {
                positionCarouselArrows(carousel, name);
            }, 500);
            return;
        }
        
        prevBtn.addClass('position-absolute start-0 ms-3 ms-md-4');
        nextBtn.addClass('position-absolute end-0 me-3 me-md-4');
        
        prevBtn.css({
            'pointer-events': 'auto',
            'background': 'rgba(0,0,0,0.7)',
            'border-radius': '50%',
            'width': '50px',
            'height': '50px',
            'display': 'flex',
            'align-items': 'center',
            'justify-content': 'center',
            'color': 'white',
            'font-size': '1.5rem'
        });
        
        nextBtn.css({
            'pointer-events': 'auto',
            'background': 'rgba(0,0,0,0.7)',
            'border-radius': '50%',
            'width': '50px',
            'height': '50px',
            'display': 'flex',
            'align-items': 'center',
            'justify-content': 'center',
            'color': 'white',
            'font-size': '1.5rem'
        });
        
        console.log(name + ' - Navigation arrows positioned successfully');
    }
    
    // =================================
    // EARLY CHILDHOOD SHOWCASE INITIALIZATION
    // =================================
    
    /**
     * Initialize the early childhood showcase carousel
     */
    function initializeEarlyChildhoodShowcase() {
        const earlyChildhoodShowcase = $('#earlyChildhoodShowcase');
        console.log('Early Childhood Showcase element found:', earlyChildhoodShowcase.length);
        
        if (earlyChildhoodShowcase.length) {
            // Early childhood showcase data
            const showcaseSlides = [
                {
                    image: 'img/carousel-11.jpeg',
                    title: 'Play-Based Learning',
                    description: 'Children learn through play, exploration, and hands-on activities in a nurturing environment.'
                },
                {
                    image: 'img/carousel-12.webp',
                    title: 'Mixed Age Groups',
                    description: 'Natural leadership development and peer learning in a supportive community setting.'
                },
                {
                    image: 'img/carousel-1.jpg',
                    title: 'Individualized Attention',
                    description: 'Each child receives personalized care and instruction tailored to their unique needs.'
                },
                {
                    image: 'img/carousel-2.jpg',
                    title: 'Creative Expression',
                    description: 'Art, music, and creative activities encourage self-expression and imagination.'
                },
                {
                    image: 'img/carousel-3.jpg',
                    title: 'Outdoor Play',
                    description: 'Our playground provides opportunities for physical development and outdoor exploration.'
                }
            ];
            
            // Populate early childhood showcase carousel
            showcaseSlides.forEach(function(slide) {
                const slideHtml = `
                    <div class="showcase-item">
                        <div class="showcase-image-container position-relative overflow-hidden rounded">
                            <div class="carousel-image-container">
                                <img class="carousel-image" src="${slide.image}" alt="${slide.title}">
                            </div>
                            <div class="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-end" style="background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));">
                                <div class="p-4 w-100">
                                    <h5 class="text-white mb-2">${slide.title}</h5>
                                    <p class="text-white-50 mb-0">${slide.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                earlyChildhoodShowcase.append(slideHtml);
            });
            
            // Initialize Owl Carousel
            console.log('Initializing Early Childhood Owl Carousel...');
            earlyChildhoodShowcase.owlCarousel({
                items: 1,
                loop: true,
                margin: 30,
                nav: true,
                dots: true,
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
                        items: 1,
                        margin: 15
                    },
                    768: {
                        items: 2,
                        margin: 30
                    },
                    992: {
                        items: 3,
                        margin: 30
                    }
                }
            });
            console.log('Early Childhood Owl Carousel initialized');
            
            // Position navigation arrows at screen edges
            earlyChildhoodShowcase.on('initialized.owl.carousel', function() {
                console.log('Early Childhood Showcase initialized');
                positionCarouselArrows(earlyChildhoodShowcase, 'Early Childhood');
            });
            
            // Fallback positioning if event doesn't fire
            setTimeout(function() {
                if (earlyChildhoodShowcase.hasClass('owl-loaded')) {
                    console.log('Fallback positioning for Early Childhood Showcase');
                    positionCarouselArrows(earlyChildhoodShowcase, 'Early Childhood');
                }
            }, 1000);
        }
    }

    // =================================
    // MIDDLE SCHOOL SHOWCASE INITIALIZATION
    // =================================
    
    /**
     * Initialize the middle school showcase carousel
     */
    function initializeMiddleSchoolShowcase() {
        const middleSchoolShowcase = $('#middleSchoolShowcase');
        console.log('Middle School Showcase element found:', middleSchoolShowcase.length);
        
        if (middleSchoolShowcase.length) {
            // Middle school showcase data
            const showcaseSlides = [
                {
                    image: 'img/carousel-4.webp',
                    title: 'Project-Based Learning',
                    description: 'Students engage in meaningful, long-term projects that connect to real-world issues.'
                },
                {
                    image: 'img/carousel-5.webp',
                    title: 'Community Histories',
                    description: 'Multi-year storytelling projects that preserve and share local community stories.'
                },
                {
                    image: 'img/carousel-6.webp',
                    title: 'Technology Integration',
                    description: 'Audio production, editing, and digital storytelling skills development.'
                },
                {
                    image: 'img/carousel-7.webp',
                    title: 'Critical Thinking',
                    description: 'Students develop analytical skills through research and problem-solving.'
                },
                {
                    image: 'img/carousel-8.webp',
                    title: 'Communication Skills',
                    description: 'Public speaking, interviewing, and presentation skills development.'
                }
            ];
            
            // Populate middle school showcase carousel
            showcaseSlides.forEach(function(slide) {
                const slideHtml = `
                    <div class="showcase-item">
                        <div class="showcase-image-container position-relative overflow-hidden rounded">
                            <div class="carousel-image-container">
                                <img class="carousel-image" src="${slide.image}" alt="${slide.title}">
                            </div>
                            <div class="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-end" style="background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));">
                                <div class="p-4 w-100">
                                    <h5 class="text-white mb-2">${slide.title}</h5>
                                    <p class="text-white-50 mb-0">${slide.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                middleSchoolShowcase.append(slideHtml);
            });
            
            // Initialize Owl Carousel
            middleSchoolShowcase.owlCarousel({
                items: 1,
                loop: true,
                margin: 30,
                nav: true,
                dots: true,
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
                        items: 1,
                        margin: 15
                    },
                    768: {
                        items: 2,
                        margin: 30
                    },
                    992: {
                        items: 3,
                        margin: 30
                    }
                }
            });
            
            // Position navigation arrows at screen edges
            middleSchoolShowcase.on('initialized.owl.carousel', function() {
                console.log('Middle School Showcase initialized');
                positionCarouselArrows(middleSchoolShowcase, 'Middle School');
            });
            
            // Fallback positioning if event doesn't fire
            setTimeout(function() {
                if (middleSchoolShowcase.hasClass('owl-loaded')) {
                    console.log('Fallback positioning for Middle School Showcase');
                    positionCarouselArrows(middleSchoolShowcase, 'Middle School');
                }
            }, 1000);
        }
    }

    // =================================
    // HIGH SCHOOL SHOWCASE INITIALIZATION
    // =================================
    
    /**
     * Initialize the high school showcase carousel
     */
    function initializeHighSchoolShowcase() {
        const highSchoolShowcase = $('#highSchoolShowcase');
        console.log('High School Showcase element found:', highSchoolShowcase.length);
        
        if (highSchoolShowcase.length) {
            // High school showcase data
            const showcaseSlides = [
                {
                    image: 'img/carousel-9.webp',
                    title: 'College Preparation',
                    description: 'Rigorous academic curriculum designed to prepare students for higher education.'
                },
                {
                    image: 'img/carousel-10.webp',
                    title: 'Critical Thinking',
                    description: 'Advanced analytical and problem-solving skills development.'
                },
                {
                    image: 'img/carousel-11.jpeg',
                    title: 'Independent Learning',
                    description: 'Students develop self-motivation and autonomous learning skills.'
                },
                {
                    image: 'img/carousel-12.webp',
                    title: 'Leadership Development',
                    description: 'Opportunities for students to take on leadership roles and responsibilities.'
                },
                {
                    image: 'img/carousel-1.jpg',
                    title: 'Future-Ready Skills',
                    description: 'Preparation for success in college, career, and life beyond high school.'
                }
            ];
            
            // Populate high school showcase carousel
            showcaseSlides.forEach(function(slide) {
                const slideHtml = `
                    <div class="showcase-item">
                        <div class="showcase-image-container position-relative overflow-hidden rounded">
                            <div class="carousel-image-container">
                                <img class="carousel-image" src="${slide.image}" alt="${slide.title}">
                            </div>
                            <div class="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-end" style="background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));">
                                <div class="p-4 w-100">
                                    <h5 class="text-white mb-2">${slide.title}</h5>
                                    <p class="text-white-50 mb-0">${slide.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                highSchoolShowcase.append(slideHtml);
            });
            
            // Initialize Owl Carousel
            highSchoolShowcase.owlCarousel({
                items: 1,
                loop: true,
                margin: 30,
                nav: true,
                dots: true,
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
                        items: 1,
                        margin: 15
                    },
                    768: {
                        items: 2,
                        margin: 30
                    },
                    992: {
                        items: 3,
                        margin: 30
                    }
                }
            });
            
            // Position navigation arrows at screen edges
            highSchoolShowcase.on('initialized.owl.carousel', function() {
                console.log('High School Showcase initialized');
                positionCarouselArrows(highSchoolShowcase, 'High School');
            });
            
            // Fallback positioning if event doesn't fire
            setTimeout(function() {
                if (highSchoolShowcase.hasClass('owl-loaded')) {
                    console.log('Fallback positioning for High School Showcase');
                    positionCarouselArrows(highSchoolShowcase, 'High School');
                }
            }, 1000);
        }
    }

    // =================================
    // ELEMENTARY SCHOOL SHOWCASE INITIALIZATION
    // =================================
    
    /**
     * Initialize the elementary school showcase carousel
     */
    function initializeElementaryShowcase() {
        const elementaryShowcase = $('#elementaryShowcase');
        console.log('Elementary Showcase element found:', elementaryShowcase.length);
        
        if (elementaryShowcase.length) {
            // Elementary showcase data
            const showcaseSlides = [
                {
                    image: 'img/carousel-6.webp',
                    title: 'Hands-On Learning',
                    description: 'Students engage in meaningful, project-based activities that make learning come alive.'
                },
                {
                    image: 'img/carousel-7.webp',
                    title: 'Creative Expression',
                    description: 'Art, music, and creative projects are integral parts of our elementary curriculum.'
                },
                {
                    image: 'img/carousel-8.webp',
                    title: 'Outdoor Education',
                    description: 'Our newly built playground provides opportunities for physical development and outdoor learning.'
                },
                {
                    image: 'img/carousel-9.webp',
                    title: 'Individualized Attention',
                    description: 'Small class sizes allow for personalized instruction and support for each student.'
                },
                {
                    image: 'img/carousel-10.webp',
                    title: 'Community Building',
                    description: 'Students learn to work together, share, and build meaningful relationships.'
                }
            ];
            
            // Populate elementary showcase carousel
            showcaseSlides.forEach(function(slide) {
                const slideHtml = `
                    <div class="showcase-item">
                        <div class="showcase-image-container position-relative overflow-hidden rounded">
                            <div class="carousel-image-container">
                                <img class="carousel-image" src="${slide.image}" alt="${slide.title}">
                            </div>
                            <div class="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-end" style="background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));">
                                <div class="p-4 w-100">
                                    <h5 class="text-white mb-2">${slide.title}</h5>
                                    <p class="text-white-50 mb-0">${slide.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                elementaryShowcase.append(slideHtml);
            });
            
            // Initialize Owl Carousel
            elementaryShowcase.owlCarousel({
                items: 1,
                loop: true,
                margin: 30,
                nav: true,
                dots: true,
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
                        items: 1,
                        margin: 15
                    },
                    768: {
                        items: 2,
                        margin: 30
                    },
                    992: {
                        items: 3,
                        margin: 30
                    }
                }
            });
            
            // Position navigation arrows at screen edges
            elementaryShowcase.on('initialized.owl.carousel', function() {
                console.log('Elementary Showcase initialized');
                positionCarouselArrows(elementaryShowcase, 'Elementary');
            });
            
            // Fallback positioning if event doesn't fire
            setTimeout(function() {
                if (elementaryShowcase.hasClass('owl-loaded')) {
                    console.log('Fallback positioning for Elementary Showcase');
                    positionCarouselArrows(elementaryShowcase, 'Elementary');
                }
            }, 1000);
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
                    <div class="testimonial-item px-3">
                        <div class="card bg-light border-0 shadow rounded p-4 h-100 position-relative">
                            <div class="testimonial-content">
                                <div class="testimonial-quote-icon position-absolute" style="top: 10px; left: 15px;">
                                    <i class="fa fa-quote-left text-primary" style="font-size: 1.5rem;"></i>
                                </div>
                                <div class="testimonial-text text-center mb-4" style="padding-top: 20px;">
                                    <p class="mb-0">${testimonial.quote}</p>
                                </div>
                                <hr class="mx-auto mb-3" style="width: 60px; height: 2px; background-color: #dee2e6; border: none;">
                            </div>
                            <div class="testimonial-author text-center">
                                <h5 class="mb-1 text-primary">${testimonial.author}</h5>
                                <span class="text-muted">${testimonial.role}</span>
                            </div>
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
            console.log('Starting carousel initialization...');
            initializeHeaderCarousel();
            initializeTestimonialCarousel();
            initializeElementaryShowcase();
            initializeEarlyChildhoodShowcase();
            initializeMiddleSchoolShowcase();
            initializeHighSchoolShowcase();
            console.log('Main Street School - Carousels initialized successfully');
        }, 500);
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
