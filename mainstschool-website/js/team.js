// Team Page Management System
// This file handles dynamic loading and display of staff information

class TeamManager {
    constructor() {
        this.staffData = [];
        this.maxDescriptionLength = 200; // Character limit for descriptions
        this.maxDescriptionHeight = 120; // Pixel height limit for descriptions
        this.init();
    }

    // Initialize the team page
    async init() {
        await this.loadStaffData();
        this.renderStaffGrid();
        this.initializeHoverEffects();
    }

    // Load staff data from CMS
    async loadStaffData() {
        try {
            // First try to load from the new CMS structure
            const response = await fetch('content/staff/staff-data.json');
            if (response.ok) {
                const data = await response.json();
                this.staffData = data.staff;
            } else {
                // Fallback to old location
                const oldResponse = await fetch('js/staff-data.json');
                if (oldResponse.ok) {
                    const data = await oldResponse.json();
                    this.staffData = data.staff;
                } else {
                    throw new Error('No staff data found');
                }
            }
        } catch (error) {
            console.error('Error loading staff data:', error);
            // Fallback to hardcoded data if JSON fails to load
            this.loadFallbackData();
        }
    }

    // Fallback data in case JSON loading fails
    loadFallbackData() {
        this.staffData = [
            {
                id: 1,
                name: "Tanya Apana",
                position: "Founder, Director, Science Teacher",
                description: "I received my BS in Biology, science teaching certification and Masters in Education for Transformative School Leadership from Iowa State University. I started my teaching career as a high school science teacher but finally found my niche creating an independent learning community. I have been leading Main Street School since its inception in 2006. Apart from a passion for teaching, I enjoy spending time with my 3 kids and 2 dogs, travelling, digging in the dirt and playing in nature.",
                photo_url: "img/staff/tanya-apana.jpg",
                email: "tanya@mainstschool.org",
                type: "teacher"
            },
            // Add more fallback data as needed
        ];
    }

    // Render the staff grid with separate sections
    renderStaffGrid() {
        const container = document.getElementById('staff-grid');
        if (!container) return;

        container.innerHTML = '';

        // Separate teachers and board members
        const teachers = this.staffData.filter(staff => staff.type === 'teacher');
        const boardMembers = this.staffData.filter(staff => staff.type === 'board');

        // Render Teachers Section
        this.renderSection(container, teachers, 'Our Dedicated Teachers', 'Meet the passionate educators who bring learning to life at Main Street School. Each teacher brings unique expertise and dedication to creating an exceptional educational experience for every student.');

        // Add spacing between sections
        const spacingDiv = document.createElement('div');
        spacingDiv.className = 'col-12 mb-5';
        container.appendChild(spacingDiv);

        // Render Board Members Section
        this.renderSection(container, boardMembers, 'Board of Directors', 'Our board members provide strategic leadership and governance, ensuring Main Street School continues to fulfill its mission of providing exceptional, individualized education for all students.');
    }

    // Render a section with title and description
    renderSection(container, staffList, title, description) {
        // Section header
        const headerDiv = document.createElement('div');
        headerDiv.className = 'col-12 mb-4';
        headerDiv.innerHTML = `
            <div class="text-center wow fadeInUp" data-wow-delay="0.1s">
                <h2 class="mb-3">${title}</h2>
                <p class="mb-4">${description}</p>
            </div>
        `;
        container.appendChild(headerDiv);

        // Staff cards
        staffList.forEach(staff => {
            const staffCard = this.createStaffCard(staff);
            container.appendChild(staffCard);
        });
    }

    // Create individual staff card
    createStaffCard(staff) {
        const card = document.createElement('div');
        card.className = 'col-lg-6 col-md-12 mb-4';
        card.innerHTML = `
            <div class="staff-card bg-light rounded p-4 h-100 wow fadeInUp" data-wow-delay="0.1s">
                <div class="row g-4">
                    <div class="col-md-4 col-sm-5">
                        <div class="staff-photo-container text-center">
                            <img class="img-fluid rounded-circle staff-photo" 
                                 src="${this.getPhotoUrl(staff.photo_url)}" 
                                 alt="${staff.name}"
                                 onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDE1MCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxNTAiIGhlaWdodD0iMTUwIiBmaWxsPSIjRjVGNUY1Ii8+CjxjaXJjbGUgY3g9Ijc1IiBjeT0iNjAiIHI9IjI1IiBmaWxsPSIjQ0NDIi8+CjxwYXRoIGQ9Ik0yNSA5NUMzNSA4NSAzNSA3NSA0NSA2NUM1NSA1NSA3NSA1NSA4NSA2NUM5NSA3NSA5NSA4NSA5NSA5NUgyNVoiIGZpbGw9IiNDQ0MiLz4KPC9zdmc+'">
                        </div>
                    </div>
                    <div class="col-md-8 col-sm-7">
                        <div class="staff-info">
                            <h4 class="text-primary mb-2">${staff.name}</h4>
                            <h6 class="text-success mb-3">${staff.position}</h6>
                            <div class="staff-description" data-full-text="${this.escapeHtml(staff.description)}">
                                ${this.truncateDescription(staff.description)}
                            </div>
                            ${this.shouldShowReadMore(staff.description) ? 
                                '<button class="btn btn-sm btn-outline-primary mt-2 read-more-btn">Read More</button>' : 
                                ''
                            }
                        </div>
                    </div>
                </div>
            </div>
        `;

        return card;
    }

    // Get photo URL with fallback to placeholder
    getPhotoUrl(photoUrl) {
        // For now, return a data URI placeholder
        // When real photos are added, this will use the actual photoUrl
        return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDE1MCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxNTAiIGhlaWdodD0iMTUwIiBmaWxsPSIjRjVGNUY1Ii8+CjxjaXJjbGUgY3g9Ijc1IiBjeT0iNjAiIHI9IjI1IiBmaWxsPSIjQ0NDIi8+CjxwYXRoIGQ9Ik0yNSA5NUMzNSA4NSAzNSA3NSA0NSA2NUM1NSA1NSA3NSA1NSA4NSA2NUM5NSA3NSA5NSA4NSA5NSA5NUgyNVoiIGZpbGw9IiNDQ0MiLz4KPC9zdmc+';
    }

    // Truncate description text
    truncateDescription(text) {
        if (text.length <= this.maxDescriptionLength) {
            return this.escapeHtml(text);
        }
        return this.escapeHtml(text.substring(0, this.maxDescriptionLength)) + '...';
    }

    // Check if read more button should be shown
    shouldShowReadMore(text) {
        return text.length > this.maxDescriptionLength;
    }

    // Escape HTML to prevent XSS
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Initialize hover effects and read more functionality
    initializeHoverEffects() {
        // Read more button functionality
        $(document).on('click', '.read-more-btn', function() {
            const card = $(this).closest('.staff-card');
            const description = card.find('.staff-description');
            const button = $(this);
            
            if (description.hasClass('expanded')) {
                description.removeClass('expanded');
                button.text('Read More');
            } else {
                description.addClass('expanded');
                button.text('Read Less');
            }
        });

        // Tooltip functionality for truncated descriptions
        $(document).on('mouseenter', '.staff-description:not(.expanded)', function() {
            const fullText = $(this).data('full-text');
            const truncatedText = $(this).text();
            
            if (fullText && fullText.length > truncatedText.length) {
                $(this).attr('title', fullText);
            }
        });

        $(document).on('mouseleave', '.staff-description', function() {
            $(this).removeAttr('title');
        });
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    new TeamManager();
});
