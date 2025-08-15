// Blog Management System
// This file handles dynamic loading and display of blog posts from Netlify CMS

class BlogManager {
    constructor() {
        this.blogPosts = [];
        this.currentCategory = 'all';
        this.postsPerPage = 6;
        this.currentPage = 0;
        this.filteredPosts = [];
        this.init();
    }

    // Initialize the blog page
    async init() {
        await this.loadBlogPosts();
        this.renderBlogGrid();
        this.initializeEventListeners();
    }

    // Load blog posts from CMS
    async loadBlogPosts() {
        try {
            // For now, we'll use a fallback approach since we need to set up the actual CMS
            // In production, this would fetch from the CMS API
            this.blogPosts = this.getFallbackBlogPosts();
        } catch (error) {
            console.error('Error loading blog posts:', error);
            this.blogPosts = this.getFallbackBlogPosts();
        }
    }

    // Fallback blog posts for development
    getFallbackBlogPosts() {
        return [
            {
                id: 1,
                title: "Welcome to Our New Blog!",
                category: "News",
                author: "Main Street School",
                excerpt: "We're excited to launch our new blog where we'll share news, events, and insights from our school community.",
                body: "This is our first blog post. We'll be sharing regular updates about school events, student achievements, and educational insights.",
                date: "2024-01-15",
                featured_image: "img/blog/welcome-post.jpg",
                draft: false
            },
            {
                id: 2,
                title: "Science Fair Success",
                category: "Student Achievements",
                author: "Tanya Apana",
                excerpt: "Our students showcased amazing projects at this year's science fair, demonstrating creativity and scientific thinking.",
                body: "The annual science fair was a tremendous success this year. Students from all grade levels presented innovative projects that showcased their understanding of scientific principles and their creativity in problem-solving.",
                date: "2024-01-10",
                featured_image: "img/blog/science-fair.jpg",
                draft: false
            },
            {
                id: 3,
                title: "Upcoming Spring Events",
                category: "Events",
                author: "Main Street School",
                excerpt: "Mark your calendars for our exciting spring events including the annual picnic and art showcase.",
                body: "Spring is just around the corner, and we have several exciting events planned. Join us for our annual spring picnic, art showcase, and end-of-year celebration.",
                date: "2024-01-05",
                featured_image: "img/blog/spring-events.jpg",
                draft: false
            }
        ];
    }

    // Render the blog grid
    renderBlogGrid() {
        const container = document.getElementById('blog-grid');
        if (!container) return;

        // Filter posts by category
        this.filteredPosts = this.currentCategory === 'all' 
            ? this.blogPosts.filter(post => !post.draft)
            : this.blogPosts.filter(post => post.category === this.currentCategory && !post.draft);

        // Sort by date (newest first)
        this.filteredPosts.sort((a, b) => new Date(b.date) - new Date(a.date));

        // Get posts for current page
        const startIndex = this.currentPage * this.postsPerPage;
        const endIndex = startIndex + this.postsPerPage;
        const postsToShow = this.filteredPosts.slice(startIndex, endIndex);

        // Clear container if it's the first page
        if (this.currentPage === 0) {
            container.innerHTML = '';
        }

        // Render posts
        postsToShow.forEach(post => {
            const postCard = this.createBlogCard(post);
            container.appendChild(postCard);
        });

        // Show/hide load more button
        this.updateLoadMoreButton();
    }

    // Create individual blog card
    createBlogCard(post) {
        const card = document.createElement('div');
        card.className = 'col-lg-4 col-md-6 mb-4';
        card.innerHTML = `
            <div class="blog-card bg-light rounded p-4 h-100 wow fadeInUp" data-wow-delay="0.1s">
                <div class="blog-image-container mb-3">
                    <img class="img-fluid rounded blog-image" 
                         src="${this.getImageUrl(post.featured_image)}" 
                         alt="${post.title}"
                         onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjVGNUY1Ii8+Cjx0ZXh0IHg9IjE1MCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkJsb2cgSW1hZ2U8L3RleHQ+Cjwvc3ZnPg=='">
                </div>
                <div class="blog-content">
                    <div class="blog-meta mb-2">
                        <span class="badge bg-primary me-2">${post.category}</span>
                        <small class="text-muted">${this.formatDate(post.date)}</small>
                    </div>
                    <h5 class="blog-title mb-3">
                        <a href="#" class="text-decoration-none text-dark">${post.title}</a>
                    </h5>
                    <p class="blog-excerpt mb-3">${post.excerpt || this.truncateText(post.body, 120)}</p>
                    <div class="blog-footer">
                        <small class="text-muted">By ${post.author}</small>
                        <button class="btn btn-sm btn-outline-primary float-end read-more-btn" data-post-id="${post.id}">Read More</button>
                    </div>
                </div>
            </div>
        `;

        return card;
    }

    // Get image URL with fallback
    getImageUrl(imageUrl) {
        if (!imageUrl) {
            return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjVGNUY1Ii8+Cjx0ZXh0IHg9IjE1MCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkJsb2cgSW1hZ2U8L3RleHQ+Cjwvc3ZnPg==';
        }
        return imageUrl;
    }

    // Format date
    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    }

    // Truncate text
    truncateText(text, maxLength) {
        if (text.length <= maxLength) {
            return text;
        }
        return text.substring(0, maxLength) + '...';
    }

    // Update load more button visibility
    updateLoadMoreButton() {
        const loadMoreBtn = document.getElementById('load-more-btn');
        if (!loadMoreBtn) return;

        const totalPosts = this.filteredPosts.length;
        const currentPostsShown = (this.currentPage + 1) * this.postsPerPage;

        if (currentPostsShown < totalPosts) {
            loadMoreBtn.style.display = 'inline-block';
        } else {
            loadMoreBtn.style.display = 'none';
        }
    }

    // Initialize event listeners
    initializeEventListeners() {
        // Category filter buttons
        $(document).on('click', '[data-category]', (e) => {
            e.preventDefault();
            const category = $(e.target).data('category');
            this.filterByCategory(category);
        });

        // Load more button
        $(document).on('click', '#load-more-btn', (e) => {
            e.preventDefault();
            this.loadMorePosts();
        });

        // Read more buttons
        $(document).on('click', '.read-more-btn', (e) => {
            e.preventDefault();
            const postId = $(e.target).data('post-id');
            this.showPostDetail(postId);
        });
    }

    // Filter posts by category
    filterByCategory(category) {
        this.currentCategory = category;
        this.currentPage = 0;

        // Update active button
        $('[data-category]').removeClass('active');
        $(`[data-category="${category}"]`).addClass('active');

        this.renderBlogGrid();
    }

    // Load more posts
    loadMorePosts() {
        this.currentPage++;
        this.renderBlogGrid();
    }

    // Show post detail (placeholder for now)
    showPostDetail(postId) {
        const post = this.blogPosts.find(p => p.id === postId);
        if (post) {
            // For now, just show an alert. In a real implementation, this would open a modal or navigate to a detail page
            alert(`Post: ${post.title}\n\n${post.body}`);
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    new BlogManager();
});
