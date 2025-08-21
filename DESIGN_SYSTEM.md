# Design System Documentation

## Overview
This design system provides a consistent foundation for the Main Street School website. All colors, typography, spacing, and other design tokens are defined as CSS custom properties (variables) in the `:root` selector, making it easy to maintain consistency and make global changes.

## Quick Start Guide

### Making Global Changes

#### Change Primary Color
To change the primary color across the entire website, edit this line in `css/main.css`:
```css
:root {
    --primary: #YOUR_NEW_COLOR;
}
```

#### Change Font Family
To change the main font family, edit this line:
```css
:root {
    --font-family-primary: 'Your Font', sans-serif;
}
```

#### Change Heading Font
To change the heading font family, edit this line:
```css
:root {
    --font-family-headings: 'Your Heading Font', cursive;
}
```

## Color System

### Primary Colors
- `--primary`: Main brand color (#FE5D37)
- `--primary-light`: Lighter variant (#ff7a5a)
- `--primary-dark`: Darker variant (#e54a2b)

### Secondary Colors
- `--secondary`: Secondary brand color (#f39c12)
- `--secondary-light`: Lighter variant (#f4b350)
- `--secondary-dark`: Darker variant (#d68910)

### Semantic Colors
- `--success`: Success states (#198754)
- `--info`: Information states (#0dcaf0)
- `--warning`: Warning states (#ffc107)
- `--danger`: Error states (#dc3545)

### Neutral Colors
- `--light`: Light background (#FFF5F3)
- `--dark`: Dark text (#103741)
- `--white`: Pure white (#ffffff)
- `--gray-100` through `--gray-900`: Gray scale

### Text Colors
- `--text-primary`: Main text color
- `--text-secondary`: Secondary text color
- `--text-muted`: Muted text color
- `--text-light`: Light text color

## Typography System

### Font Families
- `--font-family-primary`: Main body font ('Heebo', sans-serif)
- `--font-family-headings`: Heading font ('Lobster Two', cursive)
- `--font-family-secondary`: Secondary font ('Inter', sans-serif)

### Font Sizes
- `--font-size-xs`: 0.75rem (12px)
- `--font-size-sm`: 0.875rem (14px)
- `--font-size-base`: 1rem (16px)
- `--font-size-lg`: 1.125rem (18px)
- `--font-size-xl`: 1.25rem (20px)
- `--font-size-2xl`: 1.5rem (24px)
- `--font-size-3xl`: 1.875rem (30px)
- `--font-size-4xl`: 2.25rem (36px)
- `--font-size-5xl`: 3rem (48px)
- `--font-size-6xl`: 3.75rem (60px)

### Font Weights
- `--font-weight-light`: 300
- `--font-weight-normal`: 400
- `--font-weight-medium`: 500
- `--font-weight-semibold`: 600
- `--font-weight-bold`: 700

### Line Heights
- `--line-height-tight`: 1.25
- `--line-height-normal`: 1.5
- `--line-height-relaxed`: 1.75

## Spacing System

### Spacing Scale
- `--spacing-xs`: 0.25rem (4px)
- `--spacing-sm`: 0.5rem (8px)
- `--spacing-md`: 1rem (16px)
- `--spacing-lg`: 1.5rem (24px)
- `--spacing-xl`: 2rem (32px)
- `--spacing-2xl`: 3rem (48px)
- `--spacing-3xl`: 4rem (64px)
- `--spacing-4xl`: 6rem (96px)

## Border System

### Border Radius
- `--border-radius-sm`: 0.25rem
- `--border-radius`: 0.5rem
- `--border-radius-lg`: 1rem
- `--border-radius-xl`: 1.5rem
- `--border-radius-pill`: 50rem

### Border Widths
- `--border-width`: 1px
- `--border-width-thick`: 2px

## Shadow System

### Shadow Scale
- `--shadow-sm`: Subtle shadow
- `--shadow`: Default shadow
- `--shadow-md`: Medium shadow
- `--shadow-lg`: Large shadow
- `--shadow-xl`: Extra large shadow

## Transition System

### Transition Durations
- `--transition-fast`: 0.15s ease-in-out
- `--transition-normal`: 0.3s ease-in-out
- `--transition-slow`: 0.5s ease-in-out

## Z-Index System

### Z-Index Scale
- `--z-dropdown`: 1000
- `--z-sticky`: 1020
- `--z-fixed`: 1030
- `--z-modal-backdrop`: 1040
- `--z-modal`: 1050
- `--z-popover`: 1060
- `--z-tooltip`: 1070
- `--z-toast`: 1080

## Usage Examples

### In HTML
```html
<!-- Using utility classes -->
<h1 class="text-primary font-headings">Main Heading</h1>
<p class="text-secondary font-primary">Body text</p>
<button class="btn btn-primary">Primary Button</button>
```

### In CSS
```css
.my-component {
    background-color: var(--bg-primary);
    color: var(--text-primary);
    padding: var(--spacing-lg);
    border-radius: var(--border-radius);
    box-shadow: var(--shadow-md);
    transition: var(--transition-normal);
}

.my-component h2 {
    font-family: var(--font-family-headings);
    font-size: var(--font-size-3xl);
    color: var(--primary);
}
```

## Best Practices

### 1. Always Use Variables
Instead of hardcoding values, always use the CSS variables:
```css
/* ❌ Don't do this */
.my-element {
    color: #FE5D37;
    font-size: 16px;
    padding: 20px;
}

/* ✅ Do this instead */
.my-element {
    color: var(--primary);
    font-size: var(--font-size-base);
    padding: var(--spacing-xl);
}
```

### 2. Use Semantic Color Names
Use semantic color variables instead of specific colors:
```css
/* ❌ Don't do this */
.error-message {
    color: #dc3545;
}

/* ✅ Do this instead */
.error-message {
    color: var(--danger);
}
```

### 3. Use Consistent Spacing
Always use the spacing scale for margins and padding:
```css
/* ❌ Don't do this */
.section {
    margin: 25px 0;
    padding: 15px;
}

/* ✅ Do this instead */
.section {
    margin: var(--spacing-2xl) 0;
    padding: var(--spacing-lg);
}
```

### 4. Use Typography Scale
Use the defined font sizes for consistent typography:
```css
/* ❌ Don't do this */
.small-text {
    font-size: 13px;
}

/* ✅ Do this instead */
.small-text {
    font-size: var(--font-size-sm);
}
```

## Maintenance

### Adding New Colors
1. Add the color variable to the `:root` selector
2. Document it in this file
3. Use it consistently across components

### Adding New Font Sizes
1. Add the font size variable to the `:root` selector
2. Add corresponding utility classes in the CSS
3. Document it in this file

### Updating the Design System
1. Make changes to the `:root` variables
2. Test across all pages
3. Update this documentation
4. Communicate changes to the team

## Browser Support
CSS custom properties are supported in all modern browsers:
- Chrome 49+
- Firefox 31+
- Safari 9.1+
- Edge 15+

For older browsers, consider using a CSS preprocessor like Sass or providing fallback values.
