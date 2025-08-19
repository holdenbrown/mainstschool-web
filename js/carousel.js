/* ================================= */
/* CAROUSEL INITIALIZATION - MAIN STREET SCHOOL */
/* ================================= */

$(document).ready(function() {
    'use strict';
    
    // =================================
    // HEADER CAROUSEL INITIALIZATION
    // =================================
    
    function initializeHeaderCarousel() {
        const headerCarousel = $('#headerCarousel');
        
        if (headerCarousel.length) {
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
                    0: { items: 1 },
                    768: { items: 1 },
                    992: { items: 1 }
                }
            });
        }
    }
    
    // =================================
    // SHOWCASE CAROUSEL INITIALIZATION
    // =================================
    
    function initializeShowcaseCarousel(carouselId, slides) {
        const carousel = $(carouselId);
        
        if (carousel.length) {
            slides.forEach(function(slide) {
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
                carousel.append(slideHtml);
            });
            
            carousel.owlCarousel({
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
                    0: { items: 1, margin: 15 },
                    768: { items: 2, margin: 30 },
                    992: { items: 3, margin: 30 }
                }
            });
        }
    }
    
    // =================================
    // TESTIMONIAL CAROUSEL INITIALIZATION
    // =================================
    
    function initializeTestimonialCarousel() {
        const testimonialCarousel = $('#testimonialCarousel');
        
        if (testimonialCarousel.length) {
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
            
            testimonials.forEach(function(testimonial) {
                const testimonialHtml = `
                    <div class="testimonial-item px-3 py-4">
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
                    0: { items: 1, margin: 15 },
                    768: { items: 1, margin: 30 },
                    992: { items: 1, margin: 30 }
                }
            });
        }
    }
    
    // =================================
    // INITIALIZATION
    // =================================
    
    function initializeCarousels() {
        console.log('Initializing carousels...');
        
        // Header carousel
        initializeHeaderCarousel();
        
        // Testimonial carousel
        initializeTestimonialCarousel();
        
        // Elementary showcase
        const elementarySlides = [
            { image: 'img/carousel-6.webp', title: 'Hands-On Learning', description: 'Students engage in meaningful, project-based activities that make learning come alive.' },
            { image: 'img/carousel-7.webp', title: 'Creative Expression', description: 'Art, music, and creative projects are integral parts of our elementary curriculum.' },
            { image: 'img/carousel-8.webp', title: 'Outdoor Education', description: 'Our newly built playground provides opportunities for physical development and outdoor learning.' },
            { image: 'img/carousel-9.webp', title: 'Individualized Attention', description: 'Small class sizes allow for personalized instruction and support for each student.' },
            { image: 'img/carousel-10.webp', title: 'Community Building', description: 'Students learn to work together, share, and build meaningful relationships.' }
        ];
        initializeShowcaseCarousel('#elementaryShowcase', elementarySlides);
        
        // Early childhood showcase
        const earlyChildhoodSlides = [
            { image: 'img/carousel-11.jpeg', title: 'Play-Based Learning', description: 'Children learn through play, exploration, and hands-on activities in a nurturing environment.' },
            { image: 'img/carousel-12.webp', title: 'Mixed Age Groups', description: 'Natural leadership development and peer learning in a supportive community setting.' },
            { image: 'img/carousel-1.jpg', title: 'Individualized Attention', description: 'Each child receives personalized care and instruction tailored to their unique needs.' },
            { image: 'img/carousel-2.jpg', title: 'Creative Expression', description: 'Art, music, and creative activities encourage self-expression and imagination.' },
            { image: 'img/carousel-3.jpg', title: 'Outdoor Play', description: 'Our playground provides opportunities for physical development and outdoor exploration.' }
        ];
        initializeShowcaseCarousel('#earlyChildhoodShowcase', earlyChildhoodSlides);
        
        // Middle school showcase
        const middleSchoolSlides = [
            { image: 'img/carousel-4.webp', title: 'Project-Based Learning', description: 'Students engage in meaningful, long-term projects that connect to real-world issues.' },
            { image: 'img/carousel-5.webp', title: 'Community Histories', description: 'Multi-year storytelling projects that preserve and share local community stories.' },
            { image: 'img/carousel-6.webp', title: 'Technology Integration', description: 'Audio production, editing, and digital storytelling skills development.' },
            { image: 'img/carousel-7.webp', title: 'Critical Thinking', description: 'Students develop analytical skills through research and problem-solving.' },
            { image: 'img/carousel-8.webp', title: 'Communication Skills', description: 'Public speaking, interviewing, and presentation skills development.' }
        ];
        initializeShowcaseCarousel('#middleSchoolShowcase', middleSchoolSlides);
        
        // High school showcase
        const highSchoolSlides = [
            { image: 'img/carousel-9.webp', title: 'College Preparation', description: 'Rigorous academic curriculum designed to prepare students for higher education.' },
            { image: 'img/carousel-10.webp', title: 'Critical Thinking', description: 'Advanced analytical and problem-solving skills development.' },
            { image: 'img/carousel-11.jpeg', title: 'Independent Learning', description: 'Students develop self-motivation and autonomous learning skills.' },
            { image: 'img/carousel-12.webp', title: 'Leadership Development', description: 'Opportunities for students to take on leadership roles and responsibilities.' },
            { image: 'img/carousel-1.jpg', title: 'Future-Ready Skills', description: 'Preparation for success in college, career, and life beyond high school.' }
        ];
        initializeShowcaseCarousel('#highSchoolShowcase', highSchoolSlides);
        
        console.log('Carousels initialized successfully');
    }
    
    // Initialize carousels
    initializeCarousels();
    
    // Handle window resize
    $(window).on('resize', function() {
        setTimeout(function() {
            $('.owl-carousel').each(function() {
                if ($(this).hasClass('owl-loaded')) {
                    $(this).trigger('refresh.owl.carousel');
                }
            });
        }, 200);
    });
});
