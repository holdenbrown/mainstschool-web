// Team Page Management System
// This file handles dynamic loading and display of staff information

class TeamManager {
    constructor() {
        this.staffData = [];
        this.maxDescriptionLength = 150; // Character limit for descriptions (desktop)
        this.maxDescriptionHeight = 50; // Pixel height limit for descriptions
        this.init();
    }

    // Initialize the team page
    async init() {
        await this.loadStaffData();
        this.renderStaffGrid();
        this.initializeHoverEffects();
    }

    // Get responsive character limit based on screen size
    getResponsiveDescriptionLength() {
        const screenWidth = window.innerWidth;
        
        if (screenWidth < 576) {
            // Extra small screens (phones) - much shorter
            return 30;
        } else if (screenWidth < 768) {
            // Small screens (large phones) - shorter
            return 160;
        } else if (screenWidth < 992) {
            // Medium screens (tablets) - medium length
            return 180;
        } else {
            // Large screens (desktop) - full length
            return this.maxDescriptionLength;
        }
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
        // Check if we're on the main team page
        const teamContainer = document.getElementById('staff-grid');
        if (teamContainer) {
            this.renderMainTeamPage(teamContainer);
            return;
        }

        // Check for program-specific containers
        this.renderProgramPages();
    }

    // Render main team page with full staff
    renderMainTeamPage(container) {
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

    // Render program-specific teacher pages
    renderProgramPages() {
        // Define teacher assignments for each program
        const programAssignments = {
            'early-childhood-teachers': [3, 4, 5], // Lori Wiedmaier, Isaac Anderson, Kelly Donnelly
            'elementary-teachers': [7], // Susan Chronister
            'middle-school-teachers': [1], // Tanya Apana
            'high-school-teachers': [1, 2], // Tanya Apana
            'home-music-teachers': [6] // Sarah Jorgenson (for home page)
        };

        // Check each program container and render appropriate teachers
        Object.keys(programAssignments).forEach(containerId => {
            const container = document.getElementById(containerId);
            if (container) {
                const teacherIds = programAssignments[containerId];
                const programTeachers = this.staffData
                    .filter(staff => teacherIds.includes(staff.id))
                    .sort((a, b) => teacherIds.indexOf(a.id) - teacherIds.indexOf(b.id));
                
                container.innerHTML = '';
                programTeachers.forEach(teacher => {
                    const teacherCard = this.createStaffCard(teacher);
                    container.appendChild(teacherCard);
                });
            }
        });
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
        
        // Handle multiple descriptions (array or single string)
        const descriptions = Array.isArray(staff.description) ? staff.description : [staff.description || ''];
        const firstDescription = descriptions[0] || '';
        const hasMultipleDescriptions = descriptions.length > 1;
        
        // Use responsive character limit based on screen size
        const responsiveLimit = this.getResponsiveDescriptionLength();
        const hasLongDescription = firstDescription.length > responsiveLimit;
        
        const hasAdditionalImages = staff.additional_photos && Array.isArray(staff.additional_photos) && staff.additional_photos.length > 0;
        const hasVideo = staff.video_url;
        const hasAdditionalContent = hasAdditionalImages || hasVideo || hasMultipleDescriptions;
        
        // Show Read More if description is long OR if there's additional content
        const shouldShowReadMore = hasLongDescription || hasAdditionalContent;
        
        const cardHTML = `
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
                            <h2 class="mb-2 fs-2 fs-md-4">${this.escapeHtml(staff.name)}</h4>
                            <h6 class="">${this.escapeHtml(staff.position)}</h6>
                            
                            <!-- Description that expands in place -->
                            <div class="staff-description" id="${descriptionId}" 
                                 data-full-text="${this.escapeHtml(firstDescription)}"
                                 data-all-descriptions='${JSON.stringify(descriptions)}'
                                 data-truncated="true">
                                <span class="description-text small">
                                    ${hasLongDescription ? 
                                        this.truncateDescription(firstDescription, responsiveLimit) : 
                                        this.escapeHtml(firstDescription)
                                    }
                                </span>
                                
                                <!-- Additional content (photos, videos, extra descriptions) -->
                                ${hasAdditionalContent ? `
                                    <div class="additional-content-container" style="display: none;">
                                        ${hasMultipleDescriptions && descriptions.length > 1 ? 
                                            descriptions.slice(1).map(desc => `<p class="mt-3 mb-0">${this.escapeHtml(desc)}</p>`).join('')
                                            : ''
                                        }
                                        
                                        ${hasAdditionalImages ? `
                                            <div class="additional-photos mt-3">
                                                <div class="row g-2">
                                                    ${staff.additional_photos.map(photo => {
                                                        // Handle both string URLs and objects with src/caption
                                                        const photoSrc = typeof photo === 'string' ? photo : photo.src;
                                                        const photoCaption = typeof photo === 'object' && photo.caption ? photo.caption : '';
                                                        
                                                        return `
                                                            <div class="col-6 col-sm-4 mb-3">
                                                                <div class="text-center">
                                                                    <img src="${this.getPhotoUrl(photoSrc)}" 
                                                                         class="img-fluid rounded mb-2" 
                                                                         alt="${this.escapeHtml(staff.name)}"
                                                                         onerror="this.src='${this.getPlaceholderImage()}'">
                                                                    ${photoCaption ? `
                                                                        <p class="small text-muted mb-0">${this.escapeHtml(photoCaption)}</p>
                                                                    ` : ''}
                                                                </div>
                                                            </div>
                                                        `;
                                                    }).join('')}
                                                </div>
                                            </div>
                                        ` : ''}
                                        
                                        ${hasVideo ? `
                                            <div class="staff-video mt-3">
                                                <h6 class="text-primary mb-2">Video</h6>
                                                <video controls class="img-fluid rounded w-100">
                                                    <source src="${staff.video_url}" type="video/mp4">
                                                    <source src="${staff.video_url}" type="video/webm">
                                                    <source src="${staff.video_url}" type="video/ogg">
                                                    Your browser does not support the video tag.
                                                </video>
                                            </div>
                                        ` : ''}
                                    </div>
                                ` : ''}
                            </div>
                            
                            ${shouldShowReadMore ? `
                                <!-- Read More Button -->
                                <button class="btn btn-sm btn-outline-primary mt-2 read-more-desc-btn" 
                                        type="button" 
                                        data-target="${descriptionId}">
                                    <span class="when-collapsed">Read More</span>
                                    <span class="when-expanded d-none">Read Less</span>
                                </button>
                            ` : ''}
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        card.innerHTML = cardHTML;

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

    // Truncate description text with optional custom limit
    truncateDescription(text, customLimit = null) {
        const limit = customLimit || this.maxDescriptionLength;
        if (text.length <= limit) {
            return this.escapeHtml(text);
        }
        return this.escapeHtml(text.substring(0, limit)) + '...';
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
                const card = cardWrapper.querySelector('.staff-card');
                
                if (descriptionDiv) {
                    const isTruncated = descriptionDiv.getAttribute('data-truncated') === 'true';
                    const fullText = descriptionDiv.getAttribute('data-full-text');
                    const descriptionText = descriptionDiv.querySelector('.description-text');
                    const whenCollapsed = button.querySelector('.when-collapsed');
                    const whenExpanded = button.querySelector('.when-expanded');
                    const additionalContentContainer = descriptionDiv.querySelector('.additional-content-container');
                    
                    // Store card position before expansion for smooth scrolling
                    const cardRect = card.getBoundingClientRect();
                    const cardTopOffset = cardRect.top + window.pageYOffset;
                    
                    if (isTruncated) {
                        // EXPAND: Show full description and additional content
                        descriptionText.innerHTML = this.escapeHtml(fullText);
                        descriptionDiv.setAttribute('data-truncated', 'false');
                        
                        // Show additional content (photos, videos, etc.)
                        if (additionalContentContainer) {
                            additionalContentContainer.style.display = 'block';
                        }
                        
                        // Update button text
                        if (whenCollapsed) whenCollapsed.classList.add('d-none');
                        if (whenExpanded) whenExpanded.classList.remove('d-none');
                        
                        // Handle card expansion behavior
                        this.expandCard(cardWrapper);
                        
                        // Smooth scroll to keep card top visible
                        setTimeout(() => {
                            window.scrollTo({
                                top: Math.max(0, cardTopOffset - 30),
                                behavior: 'smooth'
                            });
                        }, 100);
                        
                    } else {
                        // COLLAPSE: Hide additional content and truncate description if needed
                        const responsiveLimit = this.getResponsiveDescriptionLength();
                        if (fullText.length > responsiveLimit) {
                            descriptionText.innerHTML = this.truncateDescription(fullText, responsiveLimit);
                        } else {
                            descriptionText.innerHTML = this.escapeHtml(fullText);
                        }
                        descriptionDiv.setAttribute('data-truncated', 'true');
                        
                        // Hide additional content
                        if (additionalContentContainer) {
                            additionalContentContainer.style.display = 'none';
                        }
                        
                        // Update button text
                        if (whenCollapsed) whenCollapsed.classList.remove('d-none');
                        if (whenExpanded) whenExpanded.classList.add('d-none');
                        
                        // Handle card collapse behavior
                        this.collapseCard(cardWrapper);
                    }
                }
            }
        });

        // Handle window resize to update responsive character limits
        window.addEventListener('resize', () => {
            // Debounce resize events to avoid too many re-renders
            clearTimeout(this.resizeTimeout);
            this.resizeTimeout = setTimeout(() => {
                this.updateResponsiveDescriptions();
            }, 250);
        });
    }

    // Update description truncation when screen size changes
    updateResponsiveDescriptions() {
        const responsiveLimit = this.getResponsiveDescriptionLength();
        
        // Find all collapsed description elements
        const allDescriptions = document.querySelectorAll('.staff-description[data-truncated="true"]');
        
        allDescriptions.forEach(descriptionDiv => {
            const fullText = descriptionDiv.getAttribute('data-full-text');
            const descriptionText = descriptionDiv.querySelector('.description-text');
            
            if (fullText && descriptionText) {
                // Update the truncated text with the new responsive limit
                if (fullText.length > responsiveLimit) {
                    descriptionText.innerHTML = this.truncateDescription(fullText, responsiveLimit);
                } else {
                    descriptionText.innerHTML = this.escapeHtml(fullText);
                }
            }
        });
    }

    // Expand a card to full width and find its row partner to temporarily hide
    expandCard(cardWrapper) {
        const container = cardWrapper.parentNode;
        
        // Get only the staff cards in the same logical section
        const sectionCards = this.getSectionCards(cardWrapper, container);
        
        // Find which row this card is in within its section
        const cardIndex = sectionCards.indexOf(cardWrapper);
        const cardsPerRow = 2; // Since we use col-6 col-lg-6, there are 2 cards per row
        const rowStartIndex = Math.floor(cardIndex / cardsPerRow) * cardsPerRow;
        const rowEndIndex = rowStartIndex + cardsPerRow - 1;
        
        // Only hide the other card(s) in the same row within the same section
        sectionCards.forEach((otherCard, index) => {
            if (otherCard !== cardWrapper && index >= rowStartIndex && index <= rowEndIndex) {
                // Store original display state and hide only row partners
                otherCard.setAttribute('data-original-display', otherCard.style.display || '');
                otherCard.style.display = 'none';
            }
        });
        
        // Expand current card to full width
        cardWrapper.classList.remove('col-6', 'col-lg-6');
        cardWrapper.classList.add('col-12');
        cardWrapper.setAttribute('data-expanded', 'true');
        
        // Collapse any other expanded cards in different containers
        const allContainers = document.querySelectorAll('.row');
        allContainers.forEach(otherContainer => {
            if (otherContainer !== container) {
                const expandedCards = otherContainer.querySelectorAll('.staff-card-wrapper[data-expanded="true"]');
                expandedCards.forEach(expandedCard => {
                    const readMoreBtn = expandedCard.querySelector('.read-more-desc-btn');
                    if (readMoreBtn) {
                        const targetId = readMoreBtn.getAttribute('data-target');
                        const descriptionDiv = document.getElementById(targetId);
                        if (descriptionDiv && descriptionDiv.getAttribute('data-truncated') === 'false') {
                            readMoreBtn.click(); // Trigger collapse
                        }
                    }
                });
            }
        });
    }

    // Get staff cards that are in the same logical section (teachers vs board members)
    getSectionCards(targetCard, container) {
        const allElements = Array.from(container.children);
        const targetIndex = allElements.indexOf(targetCard);
        
        // Find the section boundaries by looking for dividers (col-12 elements)
        let sectionStart = 0;
        let sectionEnd = allElements.length - 1;
        
        // Look backwards for the start of this section
        for (let i = targetIndex - 1; i >= 0; i--) {
            const element = allElements[i];
            if (element.classList.contains('col-12')) {
                sectionStart = i + 1;
                break;
            }
        }
        
        // Look forwards for the end of this section  
        for (let i = targetIndex + 1; i < allElements.length; i++) {
            const element = allElements[i];
            if (element.classList.contains('col-12')) {
                sectionEnd = i - 1;
                break;
            }
        }
        
        // Return only the staff cards within this section
        return allElements
            .slice(sectionStart, sectionEnd + 1)
            .filter(element => element.classList.contains('staff-card-wrapper'));
    }

    // Collapse a card and restore its row partners
    collapseCard(cardWrapper) {
        const container = cardWrapper.parentNode;
        
        // Get only the staff cards in the same logical section
        const sectionCards = this.getSectionCards(cardWrapper, container);
        
        // Find which row this card is in within its section
        const cardIndex = sectionCards.indexOf(cardWrapper);
        const cardsPerRow = 2;
        const rowStartIndex = Math.floor(cardIndex / cardsPerRow) * cardsPerRow;
        const rowEndIndex = rowStartIndex + cardsPerRow - 1;
        
        // Restore only the cards in the same row within the same section
        sectionCards.forEach((otherCard, index) => {
            if (otherCard !== cardWrapper && index >= rowStartIndex && index <= rowEndIndex) {
                // Restore original display state
                const originalDisplay = otherCard.getAttribute('data-original-display');
                if (originalDisplay !== null) {
                    otherCard.style.display = originalDisplay;
                    otherCard.removeAttribute('data-original-display');
                }
            }
        });
        
        // Return current card to normal width
        cardWrapper.classList.remove('col-12');
        cardWrapper.classList.add('col-6', 'col-lg-6');
        cardWrapper.removeAttribute('data-expanded');
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    new TeamManager();
});
