// Blog Post Detail Renderer

class BlogPostPage {
    constructor() {
        this.posts = [];
        this.post = null;
        this.init();
    }

    async init() {
        try {
            await this.loadPosts();
            const slug = this.getParam('slug');
            if (!slug) {
                this.renderError('Missing post identifier.');
                return;
            }
            this.post = this.findPostBySlug(slug);
            if (!this.post) {
                this.renderError('Post not found.');
                return;
            }
            this.renderPost();
            this.setupBackButton();
        } catch (e) {
            console.error('Error rendering post:', e);
            this.renderError('An unexpected error occurred.');
        }
    }

    async loadPosts() {
        const response = await fetch('content/blog/posts.json', { cache: 'no-store' });
        if (!response.ok) throw new Error('Failed to load posts');
        const data = await response.json();
        this.posts = Array.isArray(data.posts) ? data.posts : [];
    }

    getParam(name) {
        const params = new URLSearchParams(window.location.search);
        return params.get(name);
    }

    slugify(text) {
        return String(text)
            .toLowerCase()
            .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');
    }

    createSlugFor(post) {
        const datePart = (post.date || '').toString();
        const titlePart = (post.title || '').toString();
        return this.slugify(`${datePart}-${titlePart}`);
    }

    findPostBySlug(slug) {
        return this.posts.find(p => this.createSlugFor(p) === slug);
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric', month: 'long', day: 'numeric'
        });
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    formatBody(text) {
        if (!text) return '';
        const escaped = this.escapeHtml(String(text));
        return escaped
            .split(/\n{2,}/)
            .map(par => `<p>${par.replace(/\n/g, '<br>')}</p>`)
            .join('');
    }

    getMedia(post) {
        if (post.featured_video) {
            return `
                <video controls class="img-fluid rounded mb-3" style="object-fit: cover; max-height: 480px;">
                    <source src="${post.featured_video}" type="video/mp4">
                </video>`;
        }
        if (post.featured_image) {
            return `<img class="img-fluid rounded mb-3" src="${post.featured_image}" alt="${post.title}">`;
        }
        return '';
    }

    renderPost() {
        const container = document.getElementById('post-container');
        if (!container) return;
        const post = this.post;
        container.innerHTML = `
            <div class="col-lg-10">
                <article class="bg-light rounded p-4 wow fadeInUp" data-wow-delay="0.1s">
                    <header class="mb-3">
                        <div class="d-flex align-items-center justify-content-between">
                            <h1 class="h3 mb-0">${post.title}</h1>
                        </div>
                        <div class="text-muted mt-1">
                            <span class="badge bg-primary me-2">${post.category || 'News'}</span>
                            <small>${this.formatDate(post.date)} • By ${post.author || 'Main Street School'}</small>
                        </div>
                    </header>
                    ${this.getMedia(post)}
                    <section class="post-body">
                        ${this.formatBody(post.body)}
                    </section>
                </article>
            </div>
        `;
    }

    setupBackButton() {
        const back = document.getElementById('back-button');
        if (!back) return;
        const ref = document.referrer || '';
        // If user came from blog page on same origin, go back there
        try {
            const refUrl = new URL(ref);
            const sameOrigin = refUrl.origin === window.location.origin;
            if (sameOrigin && /blog\.html$/i.test(refUrl.pathname)) {
                back.addEventListener('click', (e) => {
                    e.preventDefault();
                    window.history.back();
                });
                return;
            }
        } catch {}
        // Otherwise keep href to blog.html
    }
}

document.addEventListener('DOMContentLoaded', () => new BlogPostPage());


