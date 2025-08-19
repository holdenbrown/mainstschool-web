# Main Street School Website

A modern, responsive website for Main Street School built with HTML5, CSS3, and JavaScript.

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
│   │   ├── components.js       # Component functionality
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
├── 📝 Content
│   └── content/
│       ├── blog/               # Blog content
│       └── staff/              # Staff information
│
└── 🔧 Configuration
    ├── admin/                  # Admin panel
    └── start-cms.bat          # CMS startup script
```

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd mainstschool-web
   ```

2. **Start local server**
   ```bash
   python -m http.server 8000
   # or
   npm start
   ```

3. **Open in browser**
   ```
   http://localhost:8000
   ```

## 🎨 CSS Organization

### Main Stylesheet (`css/main.css`)
- **CSS Variables** - Colors, spacing, typography
- **Global Styles** - Resets, base styles
- **Typography** - Font families, sizes, weights
- **Layout** - Grid systems, containers
- **Components** - Buttons, cards, forms
- **Animations** - Transitions, keyframes

### Component Styles (`css/components.css`)
- **Navigation** - Header, footer, menus
- **Cards** - Feature cards, testimonial cards
- **Forms** - Contact forms, search forms
- **Modals** - Popups, overlays
- **Buttons** - All button variations

### Utility Classes (`css/utilities.css`)
- **Spacing** - Margins, padding
- **Colors** - Text colors, background colors
- **Layout** - Flexbox, grid utilities
- **Typography** - Text alignment, font weights
- **Display** - Show/hide utilities

### Responsive Design (`css/responsive.css`)
- **Mobile First** - Base styles for mobile
- **Tablet** - Medium screen adaptations
- **Desktop** - Large screen enhancements
- **Print** - Print-specific styles

## ⚡ JavaScript Organization

### Main File (`js/main.js`)
- **Initialization** - DOM ready handlers
- **Event Listeners** - Global event handling
- **Core Functions** - Essential functionality
- **Error Handling** - Global error management

### Components (`js/components.js`)
- **Read More/Less** - Collapsible content
- **Carousels** - Image sliders
- **Modals** - Popup functionality
- **Forms** - Form validation and submission

### Utilities (`js/utils.js`)
- **DOM Helpers** - Element manipulation
- **Validation** - Input validation functions
- **Animations** - Animation utilities
- **API Helpers** - Data fetching functions

## 📱 Responsive Design

The website uses a mobile-first approach with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 991px  
- **Desktop**: ≥ 992px

## 🎯 Key Features

- ✅ **Responsive Design** - Works on all devices
- ✅ **Accessibility** - WCAG 2.1 compliant
- ✅ **Performance** - Optimized loading times
- ✅ **SEO Friendly** - Proper meta tags and structure
- ✅ **Modern CSS** - CSS Grid, Flexbox, Custom Properties
- ✅ **Progressive Enhancement** - Works without JavaScript

## 🔧 Development Guidelines

### CSS Best Practices
- Use CSS custom properties for consistent theming
- Follow BEM methodology for class naming
- Mobile-first responsive design
- Minimize specificity conflicts
- Use semantic class names

### JavaScript Best Practices
- Modular function organization
- Event delegation where appropriate
- Error handling and logging
- Performance optimization
- Accessibility considerations

### HTML Best Practices
- Semantic HTML5 elements
- Proper heading hierarchy
- Alt text for images
- ARIA labels where needed
- Clean, readable markup

## 🚀 Deployment

1. **Build process** (if using build tools)
2. **Optimize assets** - Minify CSS/JS, compress images
3. **Upload to server** - FTP or Git deployment
4. **Test thoroughly** - Cross-browser and device testing

## 📞 Support

For questions or issues, contact the development team.

---

**Last Updated**: December 2024
**Version**: 1.0.0
