// Unified Header and Footer Management System
// This system provides consistent headers and footers across all pages

class HeaderFooterManager {
    constructor() {
        this.currentPage = this.getCurrentPage();
        this.init();
    }

    // Get current page from URL
    getCurrentPage() {
        const path = window.location.pathname;
        const filename = path.split('/').pop().replace('.html', '');
        return filename || 'index';
    }

    // Get page configuration
    getPageConfig() {
        const configs = {
            'index': {
                title: 'Main Street School - Home',
                pageType: 'home',
                activeNav: 'home',
                showCarousel: true,
                showPageHeader: false,
                pageTitle: 'Home',
                breadcrumb: ['Home']
            },
            'early-childhood': {
                title: 'Main Street School - Early Childhood',
                pageType: 'program',
                activeNav: 'early-childhood',
                showCarousel: true,
                showPageHeader: false,
                pageTitle: 'Early Childhood',
                breadcrumb: ['Home', 'Programs', 'Early Childhood']
            },
            'elementary': {
                title: 'Main Street School - Elementary',
                pageType: 'program',
                activeNav: 'elementary',
                showCarousel: true,
                showPageHeader: false,
                pageTitle: 'Elementary',
                breadcrumb: ['Home', 'Programs', 'Elementary']
            },
            'middle-school': {
                title: 'Main Street School - Middle School',
                pageType: 'program',
                activeNav: 'middle-school',
                showCarousel: true,
                showPageHeader: false,
                pageTitle: 'Middle School',
                breadcrumb: ['Home', 'Programs', 'Middle School']
            },
            'high-school': {
                title: 'Main Street School - High School',
                pageType: 'program',
                activeNav: 'high-school',
                showCarousel: true,
                showPageHeader: false,
                pageTitle: 'High School',
                breadcrumb: ['Home', 'Programs', 'High School']
            },

            'about': {
                title: 'Main Street School - About Us',
                pageType: 'standard',
                activeNav: 'about',
                showCarousel: false,
                showPageHeader: true,
                pageTitle: 'About Us',
                breadcrumb: ['Home', 'About Us']
            },
            'contact': {
                title: 'Main Street School - Contact Us',
                pageType: 'standard',
                activeNav: 'contact',
                showCarousel: false,
                showPageHeader: true,
                pageTitle: 'Contact Us',
                breadcrumb: ['Home', 'Contact Us']
            },
            'team': {
                title: 'Main Street School - Meet Our Team',
                pageType: 'standard',
                activeNav: 'team',
                showCarousel: false,
                showPageHeader: true,
                pageTitle: 'Meet Our Team',
                breadcrumb: ['Home', 'Meet Our Team']
            },
            'blog': {
                title: 'Main Street School - Blog',
                pageType: 'standard',
                activeNav: 'blog',
                showCarousel: false,
                showPageHeader: true,
                pageTitle: 'Blog',
                breadcrumb: ['Home', 'Blog']
            },
            'dei': {
                title: 'Main Street School - DEI Statement',
                pageType: 'standard',
                activeNav: 'dei',
                showCarousel: false,
                showPageHeader: true,
                pageTitle: 'DEI Statement',
                breadcrumb: ['Home', 'DEI Statement']
            }
        };
        return configs[this.currentPage] || configs['index'];
    }

    // Initialize the system
    init() {
        const config = this.getPageConfig();
        
        // Set page title
        document.title = config.title;
        
        // Replace header content
        this.replaceHeaderContent(config);
        
        // Replace footer content
        this.replaceFooterContent();
    }

    // Generate header HTML
// Generate header HTML
generateHeaderHTML(config) {
    const isActive = (navItem) => config.activeNav === navItem ? 'active' : '';
    const isProgramActive = config.pageType === 'program' ? 'active' : '';
    
    let headerHTML = `
        <!-- Navbar Start -->
        <nav class="navbar navbar-expand-sm bg-white navbar-light sticky-top px-4 px-sm-5 py-sm-0">
            <div class="container-fluid d-flex flex-column d-sm-block">
                
                <!-- Top row: Logo and Mobile Toggle -->
                <div class="d-flex justify-content-between align-items-center w-100">
                    <a href="index.html" class="navbar-brand">
                        <h1 class="m-0 text-primary">
                            <i class="fa fa-book-reader me-3"></i>Main Street School
                        </h1>
                    </a>
                    
                    <!-- Mobile Nav Toggle - positioned on the right -->
                    <button type="button" class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                </div>
                
                <!-- Nav Row - Desktop: centered below logo, Mobile: full width dropdown -->
                <div class="collapse navbar-collapse" id="navbarCollapse">
                    <div class="navbar-nav mx-auto mt-2 mt-sm-0">
                        <a href="index.html" class="nav-item nav-link ${isActive('home')}">Home</a>
                        <a href="about.html" class="nav-item nav-link ${isActive('about')}">About Us</a>
                        <div class="nav-item dropdown">
                            <a href="#" class="nav-link dropdown-toggle ${isProgramActive}" data-bs-toggle="dropdown">Programs</a>
                            <div class="dropdown-menu rounded-0 rounded-bottom border-0 m-0">
                                <a href="early-childhood.html" class="dropdown-item ${isActive('early-childhood')}">Early Childhood</a>
                                <a href="elementary.html" class="dropdown-item ${isActive('elementary')}">Elementary</a>
                                <a href="middle-school.html" class="dropdown-item ${isActive('middle-school')}">Middle School</a>
                                <a href="high-school.html" class="dropdown-item ${isActive('high-school')}">High School</a>
                            </div>
                        </div>
                        <div class="nav-item dropdown">
                            <a href="#" class="nav-link dropdown-toggle" data-bs-toggle="dropdown">Pages</a>
                            <div class="dropdown-menu rounded-0 rounded-bottom border-0 m-0">
                                <a href="facility.html" class="dropdown-item">School Facilities</a>
                                <a href="team.html" class="dropdown-item ${isActive('team')}">Meet Our Team</a>
                                <a href="about.html#dei-statement" class="dropdown-item ${isActive('dei')}">DEI Statement</a>
                                <a href="call-to-action.html" class="dropdown-item">Become A Teacher</a>
                                <a href="appointment.html" class="dropdown-item">Make Appointment</a>
                                <a href="testimonial.html" class="dropdown-item">Testimonial</a>
                                <a href="404.html" class="dropdown-item">404 Error</a>
                            </div>
                        </div>
                        <a href="contact.html" class="nav-item nav-link ${isActive('contact')}">Contact Us</a>
                        <a href="blog.html" class="nav-item nav-link ${isActive('blog')}">Blog</a>
                                                 <div class="navbar-nav d-flex align-items-center">
                             <a href="https://app.tuiopay.com/donation/3a8c62fc819d1f645288f6ce955bfce0" class="btn btn-primary rounded-3 px-3 py-2">
                                 Donate
                             </a>
                         </div>
                    </div>
                </div>
            </div>
        </nav>
        <!-- Navbar End -->`;

    // Carousel for home page
    if (config.showCarousel) {
        headerHTML += `
        <!-- Header Carousel Start -->
        <div class="container-fluid p-0 mb-5">
            <div class="owl-carousel header-carousel position-relative">
                <!-- Carousel items dynamically generated -->
            </div>
        </div>
        <!-- Header Carousel End -->`;
    }

    // Page header for other pages
    if (config.showPageHeader) {
        headerHTML += `
        <!-- Page Header Start -->
        <div class="container-xxl py-5 page-header position-relative mb-5">
            <div class="container py-5">
                <h1 class="display-2 text-white animated slideInDown mb-4">${config.pageTitle}</h1>
                <nav aria-label="breadcrumb animated slideInDown">
                    <ol class="breadcrumb">
                        ${config.breadcrumb.map((item, index) => {
                            if (index === config.breadcrumb.length - 1) {
                                return `<li class="breadcrumb-item text-white active" aria-current="page">${item}</li>`;
                            } else {
                                const href = index === 0 ? 'index.html' : '#';
                                return `<li class="breadcrumb-item"><a href="${href}">${item}</a></li>`;
                            }
                        }).join('')}
                    </ol>
                </nav>
            </div>
        </div>
        <!-- Page Header End -->`;
    }

    return headerHTML;
}

    // Replace header content
    replaceHeaderContent(config) {
        const headerPlaceholder = document.getElementById('header-placeholder');
        if (headerPlaceholder) {
            headerPlaceholder.innerHTML = this.generateHeaderHTML(config);
        } else {
            // If no placeholder, replace existing navbar
            const existingNav = document.querySelector('nav.navbar');
            if (existingNav) {
                const newHeaderHTML = this.generateHeaderHTML(config);
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = newHeaderHTML;
                
                // Replace navbar
                const newNavbar = tempDiv.querySelector('nav.navbar');
                if (newNavbar) {
                    existingNav.replaceWith(newNavbar);
                }
                
                // Add carousel or page header if needed
                const carouselContainer = document.querySelector('.container-fluid.p-0.mb-5');
                const pageHeaderContainer = document.querySelector('.container-xxl.py-5.page-header');
                
                if (config.showCarousel && !carouselContainer) {
                    const carouselHTML = tempDiv.querySelector('.container-fluid.p-0.mb-5');
                    if (carouselHTML) {
                        document.body.insertBefore(carouselHTML, document.querySelector('.container-xxl.py-5'));
                    }
                }
                
                if (config.showPageHeader && !pageHeaderContainer) {
                    const pageHeaderHTML = tempDiv.querySelector('.container-xxl.py-5.page-header');
                    if (pageHeaderHTML) {
                        document.body.insertBefore(pageHeaderHTML, document.querySelector('.container-xxl.py-5'));
                    }
                }
            }
        }
    }

    // Generate footer HTML
    generateFooterHTML() {
        return `
        <!-- Footer Start -->
        <div class="container-fluid bg-dark text-white-50 footer pt-5 mt-5 wow fadeIn" data-wow-delay="0.1s">
            <div class="container py-5">
                <div class="row g-5">
                    <!-- Get In Touch and Quick Links - Side by side on small screens -->
                    <div class="col-lg-4 col-md-6 col-6">
                        <h3 class="text-white mb-4">Get In Touch</h3>
                        <div class="d-flex align-items-start mb-2">
                            <i class="fa fa-map-marker-alt me-3 mt-1" style="width: 16px;"></i>
                            <span>925 Main St, Norwalk, IA</span>
                        </div>
                        <div class="d-flex align-items-start mb-2">
                            <i class="fa fa-phone-alt me-3 mt-1" style="width: 16px;"></i>
                            <span>515-981-1275</span>
                        </div>
                        <div class="d-flex align-items-start mb-2">
                            <i class="fa fa-envelope me-3 mt-1" style="width: 16px;"></i>
                            <span class="text-break">office@mainstschool.org</span>
                        </div>
                        <div class="d-flex pt-2">
                            <a class="btn btn-outline-light btn-social" href="https://www.facebook.com/mainstreetschool.iowa" target="_blank"><i class="fab fa-facebook-f"></i></a>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-6 col-6">
                        <h3 class="text-white mb-4">Quick Links</h3>
                        <div class="d-flex flex-column">
                            <a class="btn btn-link text-white-50 text-start p-0 mb-1" href="https://app.tuiopay.com/donation/3a8c62fc819d1f645288f6ce955bfce0" target="_blank"></i>Donate Now</a>
                            <a class="btn btn-link text-white-50 text-start p-0 mb-1" href="about.html"></i>About Us</a>
                            <a class="btn btn-link text-white-50 text-start p-0 mb-1" href="contact.html"></i>Contact Us</a>
                            <a class="btn btn-link text-white-50 text-start p-0 mb-1" href="early-childhood.html"></i>Early Childhood</a>
                            <a class="btn btn-link text-white-50 text-start p-0 mb-1" href="elementary.html"></i>Elementary</a>
                            <a class="btn btn-link text-white-50 text-start p-0 mb-1" href="middle-school.html"></i>Middle School</a>
                            <a class="btn btn-link text-white-50 text-start p-0 mb-1" href="high-school.html"></i>High School</a>
                        </div>
                    </div>
                    <!-- Stay Connected - Below on smaller screens, third column on larger screens -->
                    <div class="col-lg-4 col-12">
                        <h3 class="text-white mb-4">Stay Connected</h3>
                        <p>Subscribe to our newsletter for updates on school events, student achievements, and educational insights.</p>
                        <div class="position-relative" style="max-width: 400px;">
                            <style>
                                #newsletterEmail::placeholder {
                                    color: rgba(255, 255, 255, 0.7) !important;
                                }
                                #newsletterEmail::-webkit-input-placeholder {
                                    color: rgba(255, 255, 255, 0.7) !important;
                                }
                                #newsletterEmail::-moz-placeholder {
                                    color: rgba(255, 255, 255, 0.7) !important;
                                }
                            </style>
                            <input id="newsletterEmail" class="form-control bg-transparent w-100 py-3 ps-4 pe-5 text-white" type="email" placeholder="Your Email" style="color: white !important; border-color: rgba(255,255,255,0.3);">
                            <button type="button" class="btn btn-primary py-2 px-3 position-absolute top-50 end-0 translate-middle-y me-2">Subscribe</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container">
                <div class="copyright">
                    <div class="row">
                        <div class="col-md-6 text-center text-md-start mb-3 mb-md-0">
                            &copy; <a class="border-bottom" href="#">Main Street School</a>, All Right Reserved. 
                            
                            <!--/*** This template is free as long as you keep the footer author's credit link/attribution link/backlink. If you'd like to use the template without the footer author's credit link/attribution link/backlink, you can purchase the Credit Removal License from "https://htmlcodex.com/credit-removal". Thank you for your support. ***/-->
                            Designed By <a class="border-bottom" href="https://htmlcodex.com">HTML Codex</a>
                            <br>Distributed By: <a class="border-bottom" href="https://themewagon.com" target="_blank">ThemeWagon</a>
                        </div>
                        <div class="col-md-6 text-center text-md-end">
                            <!-- Footer menu removed as requested -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Footer End -->`;
    }

    // Replace footer content
    replaceFooterContent() {
        const footerPlaceholder = document.getElementById('footer-placeholder');
        if (footerPlaceholder) {
            footerPlaceholder.innerHTML = this.generateFooterHTML();
        } else {
            // If no placeholder, replace existing footer
            const existingFooter = document.querySelector('.footer');
            if (existingFooter) {
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = this.generateFooterHTML();
                const newFooter = tempDiv.querySelector('.footer');
                if (newFooter) {
                    existingFooter.replaceWith(newFooter);
                }
            }
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    new HeaderFooterManager();
});
