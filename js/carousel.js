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
                    quote: "We couldn't be happier with the academic preparation that Main Street gave our daughter. She has since gone on to graduate high school and college and is now a teacher herself because of the inspiration of Tanya. It also appropriately prepared our youngest daughter for her high school experience. We also appreciated the lessons in citizenship that our children received. They learned the why behind the what in all instances and that made them better critical thinkers. Most importantly, they learned to love and respect people for who they are. This fit so well with our family philosophy. It was a Godsend to have our personal philosophy and our children's educational experience so aligned.",
                    author: "M.F.",
                    role: "Parent"
                },
                {
                    quote: "We commuted from Ames to Main Street School when our son was in 7th and 8th grades. We sought individualized academics, experiential learning and a small class size. The experience was nothing short of transformative for him. He matured, he gained both study and social skills and he had the experience of teachers who would not give up on him and would not let him get away with not trying. Public school doesn't always work for all children. When a student needs an alternative, Main Street School is a shining example of what that can be. We were so relieved to find it, and so delighted with the results.",
                    author: "A.M.",
                    role: "Parent"
                },
                {
                    quote: "We have been part of Main Street for 10 years now and both girls have benefited greatly from the experience. The classes are small, sometimes one-on-one, so individual needs are recognized and met. The adult-to-student ratio is high so misbehavior is quickly seen and discussed calmly and sometimes introspectively. All ages mingle, older students read to younger ones, and students work and play together at recess. The students learn to interact with all ages from 3 to adults. I would highly recommend Main Street School to anyone who wants their child(ren) to have a personal academic and life-skills education in a rich, caring, comfortable environment.",
                    author: "S.L.S",
                    role: "Parent"
                },
                {
                    quote: "Main Street literally saved our child. He was completely disengaged in public school, truly believed that he couldn't do the work, and got in fights with his peers instead of working. The willingness of the Main Street teachers to get to know him as a person, a child, and a learner made such a difference in his life. He was challenged and succeeded for the first time in school. He was prepared for high school in a way that would have been impossible if he'd stayed in public school. And he learned how to deal with conflict and personality differences without violence.",
                    author: "B.C.",
                    role: "Parent"
                },
                {
                    quote: "I started attending Main Street School at the age of 10 and was well behind my expected academic level, not even knowing how to read or do basic math. To say the least, I didn't have much hope for an academic future. However, the teachers and culture made me feel accepted and motivated to learn. Within the first week, I learned how to read at a basic level, improving confidence in myself and the instructors' ability to teach. Now, at 23, no one's the wiser about my rough start in academics. I completed my B.S. at ISU in Software Engineering and am pursuing an M.S. in Computer Engineering with a focus on Secure and Reliable Computing.",
                    author: "H.B.",
                    role: "Alumni"
                },
                {
                    quote: "Main Street School is more than a school, it is a family. My experience at Main Street School helped me grow as a human and academically. I could not have asked for a safer or more accepting environment that also expanded my learning horizons.",
                    author: "C.B.",
                    role: "Alumni"
                },
                {
                    quote: "It is incredibly special to feel inspired, seen, supported, creative and free in a learning environment. Main Street School helped me feel all of those things every day. I am immensely grateful for that education and highly recommend this school.",
                    author: "E.W.",
                    role: "Alumni"
                },
                {
                    quote: "Looking back, I'm grateful for the unique experiences of being part of a small learning environment. It allowed for more hands-on learning with lessons tailored to the students interests and many field trips, things not possible in a large public school.",
                    author: "I.A.",
                    role: "Alumni"
                }
            ];
            
            testimonials.forEach(function(testimonial) {
                const testimonialHtml = `
                    <div class="testimonial-item px-3 py-4">
                        <div class="card bg-light border-0 shadow rounded p-4 h-100 position-relative">
                            <!-- Top-left quote -->
                            <div class="position-absolute" style="top: 15px; left: 20px;">
                                <i class="fa fa-quote-left text-primary" style="font-size: 2rem; opacity: 0.6;"></i>
                            </div>
                            
                            <!-- Bottom-right quote -->
                            <div class="position-absolute" style="bottom: 15px; right: 20px;">
                                <i class="fa fa-quote-right text-primary" style="font-size: 2rem; opacity: 0.6;"></i>
                            </div>
                            
                            <div class="testimonial-content">
                                <div class="testimonial-text mb-4" style="padding: 30px 20px 20px 20px;">
                                    <p class="mb-0 text-center">${testimonial.quote}</p>
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
