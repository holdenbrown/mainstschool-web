# Development Guide - Main Street School Website

This guide provides best practices, coding standards, and workflow instructions for developing the Main Street School website.

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd mainstschool-web
   ```

2. **Start development server**
   ```bash
   npm start
   # or
   python -m http.server 8000
   ```

3. **Open in browser**
   ```
   http://localhost:8000
   ```

## 📁 Project Structure

```
mainstschool-web/
├── 📄 HTML Pages
│   ├── index.html              # Homepage
│   ├── about.html              # About Us page
│   ├── early-childhood.html    # Early Childhood program
│   ├── elementary.html         # Elementary program
│   ├── middle-school.html      # Middle School program
│   ├── high-school.html        # High School program
│   ├── classes.html            # Classes overview
│   ├── facility.html           # Facility information
│   ├── team.html               # Staff/Team page
│   ├── blog.html               # Blog listing
│   ├── blog-post.html          # Individual blog post
│   ├── contact.html            # Contact page
│   ├── call-to-action.html     # Call to action page
│   └── 404.html                # Error page
│
├── 🎨 Stylesheets
│   ├── css/
│   │   ├── main.css            # Main stylesheet (organized)
│   │   ├── components.css      # Component-specific styles
│   │   ├── utilities.css       # Utility classes
│   │   ├── responsive.css      # Responsive design rules
│   │   └── bootstrap.min.css   # Bootstrap framework
│   └── scss/                   # SCSS source files (if using)
│
├── ⚡ JavaScript
│   ├── js/
│   │   ├── main.js             # Main JavaScript file
│   │   ├── utils.js            # Utility functions
│   │   ├── blog.js             # Blog-specific functionality
│   │   ├── team.js             # Team page functionality
│   │   └── header-footer.js    # Header/Footer functionality
│
├── 🖼️ Assets
│   ├── img/                    # Images and graphics
│   ├── media/                  # Media files (videos, documents)
│   └── lib/                    # Third-party libraries
│
└── 📝 Content
    └── content/
        ├── blog/               # Blog content
        └── staff/              # Staff information
```

## 🎨 CSS Guidelines

### File Organization

- **`main.css`** - Core styles, variables, typography, layout
- **`components.css`** - Reusable component styles
- **`utilities.css`** - Utility classes for spacing, colors, etc.
- **`responsive.css`** - Media queries and responsive design

### CSS Custom Properties

Use CSS custom properties for consistent theming:

```css
:root {
    --primary: #fe5d37;
    --secondary: #f39c12;
    --dark: #2c3e50;
    --spacing-md: 1rem;
    --font-size-base: 1rem;
}
```

### Naming Conventions

Follow BEM methodology for component classes:

```css
.block {}
.block__element {}
.block--modifier {}
```

### Responsive Design

Use mobile-first approach with progressive enhancement:

```css
/* Mobile first */
.component {
    /* Base styles */
}

/* Tablet and up */
@media (min-width: 768px) {
    .component {
        /* Tablet styles */
    }
}

/* Desktop and up */
@media (min-width: 992px) {
    .component {
        /* Desktop styles */
    }
}
```

## ⚡ JavaScript Guidelines

### File Organization

- **`main.js`** - Core functionality and initialization
- **`utils.js`** - Utility functions and helpers
- **`components.js`** - Component-specific functionality
- **`blog.js`** - Blog page functionality
- **`team.js`** - Team page functionality

### Code Style

Use modern JavaScript with ES6+ features:

```javascript
// Use const and let instead of var
const element = document.querySelector('.component');
let isVisible = false;

// Use arrow functions
const handleClick = (event) => {
    console.log('Clicked:', event.target);
};

// Use template literals
const message = `Hello, ${name}!`;

// Use destructuring
const { title, content } = post;
```

### Error Handling

Always include proper error handling:

```javascript
function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Failed to fetch data:', error);
        return null;
    }
}
```

### Performance

- Use event delegation for dynamic content
- Debounce scroll and resize events
- Lazy load images and content
- Minimize DOM queries

## 📱 Responsive Design

### Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 991px
- **Desktop**: ≥ 992px
- **Large Desktop**: ≥ 1200px

### Testing

Test on multiple devices and browsers:
- iPhone (375px, 414px)
- iPad (768px, 1024px)
- Desktop (1200px, 1440px, 1920px)

## 🔧 Development Workflow

### 1. Feature Development

1. Create a feature branch
   ```bash
   git checkout -b feature/new-feature
   ```

2. Make changes following coding standards

3. Test thoroughly across devices

4. Commit with descriptive messages
   ```bash
   git commit -m "feat: add new component for testimonials"
   ```

5. Push and create pull request

### 2. Code Review

- Review for accessibility
- Check responsive design
- Verify performance
- Test functionality

### 3. Testing Checklist

- [ ] Cross-browser compatibility
- [ ] Mobile responsiveness
- [ ] Accessibility (WCAG 2.1)
- [ ] Performance optimization
- [ ] SEO best practices
- [ ] Content accuracy

## 🎯 Accessibility Guidelines

### WCAG 2.1 Compliance

- **Perceivable**: Provide text alternatives for non-text content
- **Operable**: Make all functionality keyboard accessible
- **Understandable**: Make text readable and predictable
- **Robust**: Maximize compatibility with assistive technologies

### Implementation

```html
<!-- Use semantic HTML -->
<nav role="navigation" aria-label="Main navigation">
    <ul>
        <li><a href="/about" aria-current="page">About</a></li>
    </ul>
</nav>

<!-- Provide alt text for images -->
<img src="hero.jpg" alt="Students learning in classroom" />

<!-- Use ARIA labels -->
<button aria-label="Close modal" aria-expanded="false">
    <span class="sr-only">Close</span>
</button>
```

```css
/* Focus indicators */
.btn:focus {
    outline: 2px solid var(--primary);
    outline-offset: 2px;
}

/* Screen reader only content */
.sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
}
```

## 🚀 Performance Optimization

### CSS Optimization

- Use CSS custom properties for theming
- Minimize specificity conflicts
- Use efficient selectors
- Optimize media queries

### JavaScript Optimization

- Use event delegation
- Debounce expensive operations
- Minimize DOM manipulation
- Use efficient algorithms

### Image Optimization

- Use appropriate formats (WebP, AVIF)
- Implement lazy loading
- Provide responsive images
- Optimize file sizes

## 🔍 SEO Best Practices

### HTML Structure

```html
<!-- Use semantic HTML5 elements -->
<header>
    <nav>
        <ul>
            <li><a href="/about">About</a></li>
        </ul>
    </nav>
</header>

<main>
    <article>
        <h1>Page Title</h1>
        <section>
            <h2>Section Title</h2>
        </section>
    </article>
</main>

<footer>
    <p>&copy; 2024 Main Street School</p>
</footer>
```

### Meta Tags

```html
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Main Street School - Personalized education in Norwalk, IA">
    <meta name="keywords" content="school, education, Norwalk, Iowa">
    <title>Main Street School - About Us</title>
    
    <!-- Open Graph -->
    <meta property="og:title" content="Main Street School - About Us">
    <meta property="og:description" content="Learn about our personalized approach to education">
    <meta property="og:image" content="/img/og-image.jpg">
    
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Main Street School - About Us">
</head>
```

## 🛠️ Tools and Resources

### Development Tools

- **VS Code** - Recommended editor
- **Chrome DevTools** - Debugging and testing
- **Lighthouse** - Performance and accessibility testing
- **WAVE** - Web accessibility evaluation

### Browser Support

- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)

### Testing Tools

- **BrowserStack** - Cross-browser testing
- **Responsive Design Checker** - Mobile testing
- **WebPageTest** - Performance testing

## 📚 Resources

- [CSS Guidelines](https://cssguidelin.es/)
- [JavaScript Best Practices](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)
- [Web Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Performance Best Practices](https://web.dev/performance/)
- [SEO Best Practices](https://developers.google.com/search/docs)

## 🤝 Contributing

1. Follow the coding standards outlined in this guide
2. Test your changes thoroughly
3. Write clear commit messages
4. Create descriptive pull requests
5. Respond to review feedback promptly

## 📞 Support

For questions or issues:
- Check the documentation
- Review existing issues
- Contact the development team

---

**Last Updated**: December 2024
**Version**: 1.0.0
