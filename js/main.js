(function ($) {
    "use strict";

    // Initiate the wowjs
    new WOW().init();


    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').addClass('shadow-sm').css('top', '0px');
        } else {
            $('.sticky-top').removeClass('shadow-sm').css('top', '-100px');
        }
    });
    
    
    // Back to top button - always visible and positioned within content column
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });

    // Read More button functionality
    $(document).ready(function() {
        $('[data-bs-toggle="collapse"]').on('click', function() {
            const target = $(this).attr('data-bs-target');
            const isExpanded = $(this).attr('aria-expanded') === 'true';
            
            // Toggle the collapse
            $(target).collapse('toggle');
            
            // Update aria-expanded attribute
            $(this).attr('aria-expanded', !isExpanded);
        });
    });


    // Carousel data configuration system
    const carouselConfigurations = {
        'home': [
            {
                image: "img/carousel-1.jpg",
                title: "Feeding Curiosity Since 2006",
                description: "",
                showButtons: true
            },
            {
                image: "img/carousel-2.jpg",
                title: "Feeding Curiosity Since 2006",
                description: "",
                showButtons: true
            },
            {
                image: "img/carousel-3.jpg",
                title: "Feeding Curiosity Since 2006",
                description: "",
                showButtons: true
            },
        ],
        'programs': [
            {
                image: "img/carousel-1.jpg",
                title: "Personalized Learning Journey",
                description: "Every student receives individualized attention in our small, nurturing classroom environment",
                showButtons: false
            },
            {
                image: "img/carousel-2.jpg",
                title: "Project-Based Discovery",
                description: "Students learn through meaningful, hands-on projects that integrate multiple subjects and real-world applications",
                showButtons: false
            },
            {
                image: "img/carousel-3.jpg",
                title: "Community & Character",
                description: "Building lifelong friendships while developing empathy, kindness, and strong character in a supportive learning community",
                showButtons: false
            }
        ]
    };

    // Reusable carousel generator function
    function generateCarouselSlides(pageType = 'home', carouselId = 'headerCarousel') {
        const carouselContainer = document.getElementById(carouselId);
        if (!carouselContainer) {
            console.log('Carousel container not found:', carouselId);
            return;
        }
        
        console.log('Initializing carousel for pageType:', pageType);

        const carouselData = carouselConfigurations[pageType] || carouselConfigurations['home'];

        carouselData.forEach(slide => {
            const slideElement = document.createElement('div');
            slideElement.className = 'owl-carousel-item position-relative';
            
            const buttonSection = slide.showButtons ? `
                <div class="d-flex flex-column flex-sm-row gap-3 align-items-start carousel-buttons">
                    <a href="" class="btn btn-dark rounded-pill py-sm-3 px-sm-5 animated slideInLeft">Schedule A Tour</a>
                    <div class="dropdown animated slideInRight">
                        <button class="btn btn-primary rounded-pill py-sm-3 px-sm-5 dropdown-toggle" type="button" id="enrollDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                            Enroll Now
                        </button>
                        <ul class="dropdown-menu" aria-labelledby="enrollDropdown">
                            <li><a class="dropdown-item" href=https://app.tuiopay.com/registration/t6ff7e6>New Students</a></li>
                            <li><a class="dropdown-item" href=https://app.tuiopay.com/registration/z9884b8>Returning Students</a></li>
                        </ul>
                    </div>
                </div>
            ` : '';

            slideElement.innerHTML = `
                <div class="carousel-image-container">
                    <img class="carousel-image" src="${slide.image}" alt="">
                </div>
                <div class="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center" style="background: rgba(0, 0, 0, .2);">
                    <div class="container">
                        <div class="row justify-content-start">
                            <div class="col-10 col-lg-8 carousel-content-mobile">
                                <h1 class="display-2 text-white animated slideInDown mb-4">${slide.title}</h1>
                                <p class="fs-5 fw-medium text-white mb-4 pb-2">${slide.description}</p>
                                ${buttonSection}
                            </div>
                        </div>
                    </div>
                </div>
            `;
            carouselContainer.appendChild(slideElement);
        });
    }

    // Global function to initialize carousel for any page
    window.initializeCarousel = function(pageType = null, carouselId = 'headerCarousel') {
        // Auto-detect page type if not provided
        if (!pageType) {
            const path = window.location.pathname;
            if (path.includes('early-childhood') || path.includes('elementary') || 
                path.includes('middle-school') || path.includes('high-school')) {
                pageType = 'programs';
            } else {
                pageType = 'home';
            }
        }
        generateCarouselSlides(pageType, carouselId);
    };

    // Initialize carousel after generating slides - auto-detect page type
    window.initializeCarousel();

    // Header carousel
    let headerCarousel = $(".header-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        items: 1,
        dots: true,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ]
    });

    // Stop carousel when dropdown is opened, resume when closed
    $(document).on('show.bs.dropdown', function (e) {
        // Check if the dropdown is within the carousel
        if ($(e.target).closest('.header-carousel').length) {
            headerCarousel.trigger('stop.owl.autoplay');
        }
    });

    $(document).on('hide.bs.dropdown', function (e) {
        // Check if the dropdown is within the carousel
        if ($(e.target).closest('.header-carousel').length) {
            headerCarousel.trigger('play.owl.autoplay');
        }
    });

    // Alternative approach: Stop on hover, resume on mouse leave
    $(document).on('mouseenter', '.header-carousel .dropdown', function() {
        headerCarousel.trigger('stop.owl.autoplay');
    });

    $(document).on('mouseleave', '.header-carousel .dropdown', function() {
        // Only resume if dropdown is not open
        if (!$(this).hasClass('show')) {
            headerCarousel.trigger('play.owl.autoplay');
        }
    });


    // Testimonial data
    const testimonialData = [
        {
            text: "We couldn’t be happier with the academic preparation that Main Street gave our daughter.  She has since gone on to graduate high school and college and is now a teacher herself because of the inspiration of Tanya.  It also appropriately prepared our youngest daughter for her high school experience.  We also appreciated the lessons in citizenship that our children received.  They learned the why behind the what in all instances and that made them better critical thinkers.  Most importantly, they learned to love and respect people for who they are.  This fit so well with our family philosophy.  It was a Godsend to have our personal philosophy and our children’s educational experience so aligned.",
            author: "M.F.",
            relationship: "Parent"
        },
        {
            text: "We commuted from Ames to Main Street School when our son was in 7th and 8th grades. We sought individualized academics, experiential learning and a small class size. The experience was nothing short of transformative for him. He matured, he gained both study and social skills and he had the experience of teachers who would not give up on him and would not let him get away with not trying. Public school doesn't always work for all children. When a student needs an alternative, Main Street School is a shining example of what that can be. We were so relieved to find it, and so delighted with the results. We feel so strongly that Main Street School has the power to improve lives that we continue to give a small monthly donation even though we now live out of state.",
            author: "A.M.",
            relationship: "Parent"
        },
        {
            text: "We have been part of Main Street for 10 years now and both girls have benefited greatly from the experience.  The classes are small, sometimes one-on-one, so individual needs are recognized and met.  The adult-to-student ratio is high so misbehavior is quickly seen and discussed calmly and sometimes introspectively (can we talk about why you said/did that?)  All ages mingle, older students read to younger ones, and students work and play together at recess. The students learn to interact with all ages from 3 to adults.I would highly recommend Main Street School to anyone who wants their child(ren) to have a personal academic and life-skills education in a rich, caring, comfortable environment.",
            author: "S.L.S",
            relationship: "Parent"
        },
        {
            text: "Main Street literally saved our child. He was completely disengaged in public school, truly believed that he couldn’t do the work, and got in fights with his peers instead of working. The willingness of the Main Street teachers to get to know him as a person, a child, and a learner made such a difference in his life. He was challenged and succeeded for the first time in school. He was prepared for high school in a way that would have been impossible if he’d stayed in public school. And he learned how to deal with conflict and personality differences without violence. We will forever be grateful that we spent a couple of years driving an hour each way to get our child engaged in learning.",
            author: "B.C.",
            relationship: "Parent"
        },
        {
            text: "I started attending Main Street School at the age of 11 and was well behind my expected academic level not even knowing how to read or do basic math. To say the least, I didn't have much hope for an academic future. However, the teachers and culture made me feel accepted and motivated to learn. Within the first week, I learned how to read at a basic level, improving my confidence in myself and the instructors' ability to teach. Now, at 23, no one’s the wiser about my rough start in academics. I completed my B.S. at ISU in Software Engineering and am pursuing an M.S. in Computer Engineering with a focus on Secure and Reliable Computing. I can confidently say I couldn't have done it without the help of Main Street School.",            author: "H.B.",
            relationship: "Alumni"
        },
        {
            text: "Main Street School is more than a school, it is a family. My experience at Main Street School helped me grow as a human and academically. I could not have asked for a safer or more accepting environment that also expanded my learning horizons.",
            author: "C.B.",
            relationship: "Alumni"
        },
        {
            text: "It is incredibly special to feel inspired, seen, supported, creative and free in a learning environment. Main Street School helped me feel all of those things every day. I am immensely grateful for that education and highly recommend this school.",
            author: "E.W.",
            relationship: "Alumni"
        },
        {
            text: "Looking back, I’m grateful for the unique experiences of being part of a small learning environment. It allowed for more hands-on learning with lessons tailored to the students interests and many field trips, things not possible in a large public school.",
            author: "I.A.",
            relationship: "Alumni"
        }
    ];

    // Generate testimonials dynamically
    function generateTestimonials() {
        const testimonialContainer = document.getElementById('testimonialCarousel');
        if (!testimonialContainer) return;

        testimonialData.forEach(testimonial => {
            const testimonialElement = document.createElement('div');
            testimonialElement.className = 'testimonial-item bg-light rounded p-5';
            testimonialElement.innerHTML = `
                <div class="testimonial-content">
                    <i class="fa fa-quote-left fa-2x text-primary mb-2 testimonial-quote-icon"></i>
                    <p class="testimonial-text mb-4">"${testimonial.text}"</p>
                    <div class="testimonial-author">
                        <h5 class="mb-1">${testimonial.author}</h5>
                        <span class="text-muted">${testimonial.relationship}</span>
                    </div>
                </div>
            `;
            testimonialContainer.appendChild(testimonialElement);
        });
    }

    // Initialize testimonials after generating content
    generateTestimonials();

    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        margin: 0,
        dots: true,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsive: {
            0:{
                items:1
            },
            768:{
                items:1
            },
            992:{
                items:1
            }
        }
    });
    
})(jQuery);

