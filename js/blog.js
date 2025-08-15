// Blog Management System
// This file handles dynamic loading and display of blog posts from Netlify CMS

class BlogManager {
    constructor() {
        this.blogPosts = [];
        this.currentCategory = 'all';
        this.postsPerPage = 6;
        this.currentPage = 0;
        this.filteredPosts = [];
        this.expandedPostIds = new Set();
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
            const response = await fetch('content/blog/posts.json', { cache: 'no-store' });
            if (response.ok) {
                const data = await response.json();
                if (data && Array.isArray(data.posts)) {
                    this.blogPosts = data.posts.map((post, index) => ({
                        id: post.id ?? index + 1,
                        title: post.title,
                        category: post.category || 'News',
                        author: post.author || 'Main Street School',
                        excerpt: post.excerpt || '',
                        body: post.body || '',
                        date: post.date || new Date().toISOString().slice(0,10),
                        featured_image: post.featured_image || null,
                        featured_video: post.featured_video || null,
                        draft: post.draft === true,
                    }));
                    return;
                }
            }
            // fallback
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
            <div class="blog-card bg-light rounded p-4 h-100 wow fadeInUp" data-wow-delay="0.1s" data-post-id="${post.id}">
                <div class="blog-image-container mb-3">
                    ${this.getMediaContent(post)}
                </div>
                <div class="blog-content">
                    <div class="blog-meta mb-2">
                        <span class="badge bg-primary me-2">${post.category}</span>
                        <small class="text-muted">${this.formatDate(post.date)}</small>
                    </div>
                    <h5 class="blog-title mb-3">
                        <a href="blog-post.html?slug=${this.createPostSlug(post)}" class="text-decoration-none text-dark" data-post-id="${post.id}" data-slug="${this.createPostSlug(post)}">${post.title}</a>
                    </h5>
                    <p class="blog-excerpt mb-3">${post.excerpt || this.truncateText(post.body, 120)}</p>
                    <div class="blog-footer">
                        <small class="text-muted">By ${post.author}</small>
                        <button class="btn btn-sm btn-outline-primary float-end read-more-btn" data-post-id="${post.id}" data-slug="${this.createPostSlug(post)}">Read More</button>
                    </div>
                    
                </div>
            </div>
        `;

        return card;
    }

    // Get media content (image or video) for blog cards
    getMediaContent(post) {
        if (post.featured_video) {
            return `
                <video controls class="img-fluid rounded blog-image" style="object-fit: cover;">
                    <source src="${post.featured_video}" type="video/mp4">
                    <source src="${post.featured_video}" type="video/webm">
                    <source src="${post.featured_video}" type="video/ogg">
                    Your browser does not support the video tag.
                </video>
            `;
        } else if (post.featured_image) {
            return `
                <img class="img-fluid rounded blog-image" 
                     src="${this.getImageUrl(post.featured_image)}" 
                     alt="${post.title}"
                     onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjVGNUY1Ii8+Cjx0ZXh0IHg9IjE1MCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkJsb2cgSW1hZ2U8L3RleHQ+Cjwvc3ZnPg=='">
            `;
        } else {
            return `
                <img class="img-fluid rounded blog-image" 
                     src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjVGNUY1Ii8+Cjx0ZXh0IHg9IjE1MCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l5ZT0iMTQiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkJsb2cgSW1hZ2U8L3RleHQ+Cjwvc3ZnPg==" 
                     alt="${post.title}">
            `;
        }
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

        // Read more buttons -> navigate to detail page
        $(document).on('click', '.read-more-btn', (e) => {
            e.preventDefault();
            const slug = String($(e.currentTarget).data('slug') || '');
            if (slug) {
                window.location.href = `blog-post.html?slug=${slug}`;
            }
        });
        // Let title anchor use default navigation via href
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

    // Render body text safely with basic formatting
    formatBody(text) {
        if (!text) return '';
        const escaped = this.escapeHtml(String(text));
        // Convert double newlines to paragraphs and single newlines to <br>
        return escaped
            .split(/\n{2,}/)
            .map(par => `<p>${par.replace(/\n/g, '<br>')}</p>`)
            .join('');
    }

    // Escape HTML to avoid XSS
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Create a stable slug from date + title
    createPostSlug(post) {
        const datePart = (post.date || '').toString();
        const titlePart = (post.title || '').toString();
        return this.slugify(`${datePart}-${titlePart}`);
    }

    slugify(text) {
        return String(text)
            .toLowerCase()
            .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    new BlogManager();
});
