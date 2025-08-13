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

    // Load staff data from JSON file
    async loadStaffData() {
        try {
            const response = await fetch('js/staff-data.json');
            const data = await response.json();
            this.staffData = data.staff;
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
                email: "tanya@mainstschool.org"
            },
            // Add more fallback data as needed
        ];
    }

    // Render the staff grid
    renderStaffGrid() {
        const container = document.getElementById('staff-grid');
        if (!container) return;

        container.innerHTML = '';

        this.staffData.forEach(staff => {
            const staffCard = this.createStaffCard(staff);
            container.appendChild(staffCard);
        });
    }

    // Create individual staff card
    createStaffCard(staff) {
        const card = document.createElement('div');
        card.className = 'col-lg-6 col-md-12 mb-5';
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

    // Truncate description to fit within limits
    truncateDescription(description) {
        if (description.length <= this.maxDescriptionLength) {
            return this.escapeHtml(description);
        }
        return this.escapeHtml(description.substring(0, this.maxDescriptionLength)) + '...';
    }

    // Check if description needs "Read More" button
    shouldShowReadMore(description) {
        return description.length > this.maxDescriptionLength;
    }

    // Escape HTML to prevent XSS
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Initialize hover effects and read more functionality
    initializeHoverEffects() {
        // Add click handlers for read more buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('read-more-btn')) {
                this.toggleReadMore(e.target);
            }
        });

        // Add hover effects for long descriptions
        document.addEventListener('mouseenter', (e) => {
            if (e.target.classList.contains('staff-description')) {
                this.showFullDescription(e.target);
            }
        }, true);

        document.addEventListener('mouseleave', (e) => {
            if (e.target.classList.contains('staff-description')) {
                this.hideFullDescription(e.target);
            }
        }, true);
    }

    // Toggle read more functionality
    toggleReadMore(button) {
        const description = button.previousElementSibling;
        const fullText = description.getAttribute('data-full-text');
        const isExpanded = description.classList.contains('expanded');

        if (isExpanded) {
            description.innerHTML = this.truncateDescription(fullText);
            description.classList.remove('expanded');
            button.textContent = 'Read More';
        } else {
            description.innerHTML = this.escapeHtml(fullText);
            description.classList.add('expanded');
            button.textContent = 'Read Less';
        }
    }

    // Show full description on hover
    showFullDescription(description) {
        const fullText = description.getAttribute('data-full-text');
        if (fullText && fullText.length > this.maxDescriptionLength) {
            description.setAttribute('title', fullText);
        }
    }

    // Hide full description on hover out
    hideFullDescription(description) {
        description.removeAttribute('title');
    }
}

// Initialize team manager when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    new TeamManager();
});
