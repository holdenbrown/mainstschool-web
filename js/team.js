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
                type: "teacher",
                order: 1
            },
            {
                id: 2,
                name: "Claire Bennett",
                position: "Elementary Teacher",
                description: "I graduated from Simpson College with my degree in Elementary Education and endorsements in Special Education and Reading. I taught in the public school setting for two years before returning to Main Street as a teacher. I say returning because I was a student at Main Street School through my middle school years.",
                photo_url: "img/staff/claire-bennett.jpg",
                email: "claire@mainstschool.org",
                type: "teacher",
                order: 2
            },
            {
                id: 10,
                name: "Amy Desenberg-Wines",
                position: "Board Chair",
                description: "Amy is a self-employed consultant with expertise in disability inclusion. Amy's daughters attended Main Street School and the school made a significant difference in their lives.",
                photo_url: "img/staff/amy-desenberg-wines.jpg",
                type: "board",
                order: 1
            }
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

        // Sort by ID field (lower numbers first)
        const sortStaff = (staffList) => {
            return staffList.sort((a, b) => {
                // Sort by ID number (ascending order)
                return a.id - b.id;
            });
        };

        const sortedTeachers = sortStaff(teachers);
        const sortedBoardMembers = sortStaff(boardMembers);

        // Render Teachers Section
        this.renderSection(container, sortedTeachers, 'Our Dedicated Teachers', 'Meet the passionate educators who bring learning to life at Main Street School. Each teacher brings unique expertise and dedication to creating an exceptional educational experience for every student.');

        // Add spacing between sections
        const spacingDiv = document.createElement('div');
        spacingDiv.className = 'col-12 mb-5';
        container.appendChild(spacingDiv);

        // Render Board Members Section
        this.renderSection(container, sortedBoardMembers, 'Board of Directors', 'Our board members provide strategic leadership and governance, ensuring Main Street School continues to fulfill its mission of providing exceptional, individualized education for all students.');
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

        // Staff cards with tighter spacing
        staffList.forEach(staff => {
            const staffCard = this.createStaffCard(staff);
            container.appendChild(staffCard);
        });
    }

    // Create individual staff card
    createStaffCard(staff) {
        const card = document.createElement('div');
        // Mobile: side-by-side (col-6), Tablet+: half width (col-lg-6), responsive margins
        card.className = 'col-6 col-lg-6 mb-2 mb-sm-4 staff-card-wrapper';
        card.setAttribute('data-staff-id', staff.id);
        
        const uniqueId = `staff-${staff.id}`;
        const descriptionId = `desc-${staff.id}`;
        const hasLongDescription = staff.description && staff.description.length > this.maxDescriptionLength;
        const hasAdditionalImages = staff.additional_photos && Array.isArray(staff.additional_photos) && staff.additional_photos.length > 0;
        const hasVideo = staff.video_url;
        const hasAdditionalContent = hasAdditionalImages || hasVideo;
        
        card.innerHTML = `
            <div class="staff-card bg-light rounded p-2 p-sm-4 h-100 wow fadeInUp" data-wow-delay="0.1s">
                <div class="row g-2 g-sm-4">
                    <div class="col-12 col-md-4">
                        <div class="staff-photo-container text-center">
                            <img class="img-fluid rounded-circle staff-photo" 
                                 src="${this.getPhotoUrl(staff.photo_url)}" 
                                 alt="${staff.name}"
                                 onerror="this.src='${this.getPlaceholderImage()}'">
                        </div>
                    </div>
                    <div class="col-12 col-md-8">
                        <div class="staff-info">
                            <h4 class="text-primary mb-2 fs-6 fs-sm-5 fs-md-4">${this.escapeHtml(staff.name)}</h4>
                            <h6 class="text-success mb-2 fs-7 fs-sm-6">${this.escapeHtml(staff.position)}</h6>
                            
                            <!-- Description that expands in place -->
                            <div class="staff-description" id="${descriptionId}" 
                                 data-full-text="${this.escapeHtml(staff.description || '')}"
                                 data-truncated="true">
                                <span class="description-text">
                                    ${hasLongDescription ? 
                                        this.truncateDescription(staff.description) : 
                                        this.escapeHtml(staff.description || '')
                                    }
                                </span>
                            </div>
                            
                            ${hasLongDescription ? `
                                <!-- Read More Button for Description -->
                                <button class="btn btn-sm btn-outline-primary mt-2 read-more-desc-btn" 
                                        type="button" 
                                        data-target="${descriptionId}">
                                    <span class="when-collapsed">Read More</span>
                                    <span class="when-expanded d-none">Read Less</span>
                                </button>
                            ` : ''}
                            
                            ${hasAdditionalContent ? `
                                <!-- Additional Content Toggle (only shows after description is expanded) -->
                                <button class="btn btn-sm btn-outline-secondary mt-2 d-none additional-content-btn" 
                                        type="button" 
                                        data-bs-toggle="collapse" 
                                        data-bs-target="#${uniqueId}" 
                                        aria-expanded="false" 
                                        aria-controls="${uniqueId}">
                                    <span class="when-collapsed">Show Photos & Media</span>
                                    <span class="when-expanded d-none">Hide Photos & Media</span>
                                </button>
                                
                                <!-- Collapsible Additional Content -->
                                <div class="collapse mt-3" id="${uniqueId}">
                                    <div class="additional-content p-3 bg-white rounded border">
                                        ${hasVideo ? `
                                            <div class="staff-video mb-3">
                                                <h6 class="text-primary mb-2">Video</h6>
                                                <video controls class="img-fluid rounded w-100">
                                                    <source src="${staff.video_url}" type="video/mp4">
                                                    <source src="${staff.video_url}" type="video/webm">
                                                    <source src="${staff.video_url}" type="video/ogg">
                                                    Your browser does not support the video tag.
                                                </video>
                                            </div>
                                        ` : ''}
                                        
                                        ${hasAdditionalImages ? `
                                            <div class="additional-photos">
                                                <h6 class="text-primary mb-3">More Photos</h6>
                                                <div class="row g-2">
                                                    ${staff.additional_photos.map(photo => `
                                                        <div class="col-6 col-sm-4">
                                                            <img src="${this.getPhotoUrl(photo)}" 
                                                                 class="img-fluid rounded" 
                                                                 alt="${this.escapeHtml(staff.name)}"
                                                                 onerror="this.src='${this.getPlaceholderImage()}'">
                                                        </div>
                                                    `).join('')}
                                                </div>
                                            </div>
                                        ` : ''}
                                    </div>
                                </div>
                            ` : ''}
                        </div>
                    </div>
                </div>
            </div>
        `;

        return card;
    }

    // Get photo URL with fallback to placeholder
    getPhotoUrl(photoUrl) {
        if (!photoUrl) {
            return this.getPlaceholderImage();
        }
        
        // If it's already a full URL, return as is
        if (photoUrl.startsWith('http://') || photoUrl.startsWith('https://')) {
            return photoUrl;
        }
        
        // Normalize accidental repo-root prefixes
        if (photoUrl.includes('mainstschool-website/')) {
            photoUrl = photoUrl.replace('mainstschool-website/', '');
        }
        // Collapse duplicate segments like "content/staff/../media/staff" that may come from CMS
        photoUrl = photoUrl.replace(/content\/(staff|blog)\//, '');
        photoUrl = photoUrl.replace(/^(\.\.\/)+/, '');

        // Handle new CMS media paths (with or without leading slash)
        if (photoUrl.startsWith('media/staff/')) {
            return photoUrl;
        }
        if (photoUrl.startsWith('/media/staff/')) {
            return photoUrl;
        }
        
        // Handle legacy paths
        if (photoUrl.startsWith('img/staff/') || photoUrl.startsWith('/img/staff/')) {
            return photoUrl;
        }
        
        // If it's a relative path, return it (the onerror handler will show placeholder if image doesn't exist)
        return photoUrl;
    }

    // Get placeholder image SVG
    getPlaceholderImage() {
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
        // Handle description Read More buttons
        document.addEventListener('click', (event) => {
            if (event.target.closest('.read-more-desc-btn')) {
                const button = event.target.closest('.read-more-desc-btn');
                const targetId = button.getAttribute('data-target');
                const descriptionDiv = document.getElementById(targetId);
                const cardWrapper = button.closest('.staff-card-wrapper');
                const staffGrid = cardWrapper.parentNode;
                
                if (descriptionDiv) {
                    const isTruncated = descriptionDiv.getAttribute('data-truncated') === 'true';
                    const fullText = descriptionDiv.getAttribute('data-full-text');
                    const descriptionText = descriptionDiv.querySelector('.description-text');
                    const whenCollapsed = button.querySelector('.when-collapsed');
                    const whenExpanded = button.querySelector('.when-expanded');
                    const additionalContentBtn = button.parentNode.querySelector('.additional-content-btn');
                    
                    if (isTruncated) {
                        // Expand description
                        descriptionText.innerHTML = this.escapeHtml(fullText);
                        descriptionDiv.setAttribute('data-truncated', 'false');
                        
                        // Update button text
                        if (whenCollapsed) whenCollapsed.classList.add('d-none');
                        if (whenExpanded) whenExpanded.classList.remove('d-none');
                        
                        // Show additional content button if it exists
                        if (additionalContentBtn) additionalContentBtn.classList.remove('d-none');
                        
                        // Expand card to full width on all screen sizes
                        cardWrapper.classList.remove('col-6', 'col-lg-6');
                        cardWrapper.classList.add('col-12');
                        
                        // Collapse other expanded cards
                        const otherCards = staffGrid.querySelectorAll('.staff-card-wrapper.col-12');
                        otherCards.forEach(otherCard => {
                            if (otherCard !== cardWrapper) {
                                this.collapseCard(otherCard);
                            }
                        });
                    } else {
                        // Collapse description
                        descriptionText.innerHTML = this.truncateDescription(fullText);
                        descriptionDiv.setAttribute('data-truncated', 'true');
                        
                        // Update button text
                        if (whenCollapsed) whenCollapsed.classList.remove('d-none');
                        if (whenExpanded) whenExpanded.classList.add('d-none');
                        
                        // Hide additional content button
                        if (additionalContentBtn) additionalContentBtn.classList.add('d-none');
                        
                        // Return to normal width
                        cardWrapper.classList.remove('col-12');
                        cardWrapper.classList.add('col-6', 'col-lg-6');
                        
                        // Close any additional content that might be open
                        const additionalContent = button.parentNode.querySelector('.collapse');
                        if (additionalContent && additionalContent.classList.contains('show')) {
                            const bsCollapse = new bootstrap.Collapse(additionalContent);
                            bsCollapse.hide();
                        }
                    }
                }
            }
        });

        // Handle window resize to ensure proper layout
        window.addEventListener('resize', () => {
            // No longer needed - expansion works on all screen sizes
        });

        // Bootstrap collapse event handlers for additional content
        document.addEventListener('show.bs.collapse', function(event) {
            if (event.target.id.startsWith('staff-')) {
                const button = document.querySelector(`[data-bs-target="#${event.target.id}"]`);
                if (button) {
                    const whenCollapsed = button.querySelector('.when-collapsed');
                    const whenExpanded = button.querySelector('.when-expanded');
                    if (whenCollapsed) whenCollapsed.classList.add('d-none');
                    if (whenExpanded) whenExpanded.classList.remove('d-none');
                }
            }
        });

        document.addEventListener('hide.bs.collapse', function(event) {
            if (event.target.id.startsWith('staff-')) {
                const button = document.querySelector(`[data-bs-target="#${event.target.id}"]`);
                if (button) {
                    const whenCollapsed = button.querySelector('.when-collapsed');
                    const whenExpanded = button.querySelector('.when-expanded');
                    if (whenCollapsed) whenCollapsed.classList.remove('d-none');
                    if (whenExpanded) whenExpanded.classList.add('d-none');
                }
            }
        });


    }

    // Helper method to collapse a card
    collapseCard(cardWrapper) {
        const readMoreBtn = cardWrapper.querySelector('.read-more-desc-btn');
        if (readMoreBtn) {
            const targetId = readMoreBtn.getAttribute('data-target');
            const descriptionDiv = document.getElementById(targetId);
            
            if (descriptionDiv && descriptionDiv.getAttribute('data-truncated') === 'false') {
                // Trigger the collapse
                readMoreBtn.click();
            }
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    new TeamManager();
});
