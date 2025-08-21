# Quick Reference Guide - Design System

## 🎨 Most Common Changes

### Change Primary Color
**File:** `css/main.css` (line ~3)
```css
:root {
    --primary: #YOUR_NEW_COLOR;
}
```

### Change Main Font
**File:** `css/main.css` (line ~40)
```css
:root {
    --font-family-primary: 'Your Font', sans-serif;
}
```

### Change Heading Font
**File:** `css/main.css` (line ~42)
```css
:root {
    --font-family-headings: 'Your Heading Font', cursive;
}
```

### Change Secondary Color
**File:** `css/main.css` (line ~10)
```css
:root {
    --secondary: #YOUR_NEW_COLOR;
}
```

## 🎯 Common HTML Patterns

### Buttons
```html
<!-- Primary Button -->
<button class="btn btn-primary">Click Me</button>

<!-- Secondary Button -->
<button class="btn btn-secondary">Click Me</button>

<!-- Outline Button -->
<button class="btn btn-outline-primary">Click Me</button>

<!-- Large Button -->
<button class="btn btn-primary btn-lg">Large Button</button>

<!-- Rounded Button -->
<button class="btn btn-primary btn-rounded">Rounded</button>
```

### Text Styling
```html
<!-- Primary Color Text -->
<p class="text-primary">This text is primary color</p>

<!-- Secondary Color Text -->
<p class="text-secondary">This text is secondary color</p>

<!-- Muted Text -->
<p class="text-muted">This text is muted</p>

<!-- Large Text -->
<p class="text-lg">Large text</p>

<!-- Bold Text -->
<p class="font-bold">Bold text</p>

<!-- Heading Font -->
<p class="font-headings">This uses heading font</p>
```

### Spacing
```html
<!-- Add margin -->
<div class="mt-lg mb-xl">Top and bottom margin</div>

<!-- Add padding -->
<div class="p-lg">Large padding all around</div>

<!-- Horizontal spacing -->
<div class="px-xl">Horizontal padding</div>

<!-- Vertical spacing -->
<div class="py-2xl">Vertical padding</div>
```

### Cards
```html
<!-- Hoverable Card -->
<div class="card card-hover p-lg">
    <h3 class="text-primary">Card Title</h3>
    <p class="text-secondary">Card content</p>
</div>
```

## 🔧 CSS Variables Reference

### Colors
- `var(--primary)` - Main brand color
- `var(--secondary)` - Secondary brand color
- `var(--success)` - Success green
- `var(--danger)` - Error red
- `var(--warning)` - Warning yellow
- `var(--info)` - Info blue
- `var(--light)` - Light background
- `var(--dark)` - Dark text
- `var(--white)` - Pure white

### Typography
- `var(--font-family-primary)` - Main font
- `var(--font-family-headings)` - Heading font
- `var(--font-size-base)` - Base font size (16px)
- `var(--font-size-lg)` - Large text (18px)
- `var(--font-size-xl)` - Extra large (20px)
- `var(--font-size-2xl)` - 2X large (24px)
- `var(--font-size-3xl)` - 3X large (30px)

### Spacing
- `var(--spacing-xs)` - Extra small (4px)
- `var(--spacing-sm)` - Small (8px)
- `var(--spacing-md)` - Medium (16px)
- `var(--spacing-lg)` - Large (24px)
- `var(--spacing-xl)` - Extra large (32px)
- `var(--spacing-2xl)` - 2X large (48px)
- `var(--spacing-3xl)` - 3X large (64px)

### Shadows
- `var(--shadow-sm)` - Small shadow
- `var(--shadow)` - Default shadow
- `var(--shadow-md)` - Medium shadow
- `var(--shadow-lg)` - Large shadow
- `var(--shadow-xl)` - Extra large shadow

### Transitions
- `var(--transition-fast)` - Fast transition (0.15s)
- `var(--transition-normal)` - Normal transition (0.3s)
- `var(--transition-slow)` - Slow transition (0.5s)

## 🚀 Quick Tips

### 1. Always Use Variables
```css
/* ❌ Don't do this */
.my-element {
    color: #FE5D37;
    padding: 20px;
}

/* ✅ Do this instead */
.my-element {
    color: var(--primary);
    padding: var(--spacing-xl);
}
```

### 2. Use Utility Classes
```html
<!-- Instead of inline styles, use utility classes -->
<div class="text-primary p-lg mt-xl shadow-md">
    Content here
</div>
```

### 3. Consistent Spacing
```css
/* Use the spacing scale for consistent layouts */
.section {
    margin: var(--spacing-2xl) 0;
    padding: var(--spacing-lg);
}
```

### 4. Semantic Colors
```css
/* Use semantic color names */
.error { color: var(--danger); }
.success { color: var(--success); }
.info { color: var(--info); }
```

## 📁 File Structure
- `css/main.css` - Main stylesheet with variables and core styles
- `css/utilities.css` - Utility classes for quick styling
- `DESIGN_SYSTEM.md` - Complete documentation
- `QUICK_REFERENCE.md` - This file

## 🔄 Making Global Changes

1. **Edit the variable** in `css/main.css` under `:root`
2. **Test the change** across your pages
3. **Update documentation** if needed

That's it! The change will apply everywhere the variable is used.
