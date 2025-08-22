# Footer Configuration System Guide

## Overview
The Main Street School website now uses a centralized configuration system for all school information, making it easy to update contact details, school name, and footer sections across the entire website from one location.

## How to Update School Information

### 1. Contact Information
To update the school's contact information, edit the `getSchoolConfig()` method in `js/header-footer.js`:

```javascript
getSchoolConfig() {
    return {
        // Contact Information
        name: 'Main Street School',           // School name
        address: '925 Main St, Norwalk, IA', // Full address
        phone: '515-981-1275',               // Phone number
        email: 'office@mainstschool.org',    // Email address
        
        // Social Media & External Links
        facebookUrl: 'https://www.facebook.com/mainstreetschool.iowa',
        donationUrl: 'https://app.tuiopay.com/donation/3a8c62fc819d1f645288f6ce955bfce0',
        
        // Footer Section Titles (easily editable)
        footerSections: {
            contact: 'Get In Touch',      // Left footer section title
            quickLinks: 'Quick Links',    // Middle footer section title  
            newsletter: 'Stay Connected'  // Right footer section title
        },
        
        // Footer Styling Classes
        footerStyles: {
            sectionTitleClass: 'h4 text-white mb-4',           // Large footer headings
            quickLinkClass: 'link-light text-decoration-none quick-link mb-1',
            contactTextClass: 'text-white-50'                  // Gray text for contact info
        }
    };
}
```

### 2. Footer Section Titles
The footer section titles are now centralized and easily editable:

- **Get In Touch** - Left section with contact information
- **Quick Links** - Middle section with navigation links
- **Stay Connected** - Right section with newsletter signup

To change these titles, simply update the `footerSections` object in the configuration.

### 3. Automatic Updates
When you change the configuration, it automatically updates:

- Header school name
- All footer contact information
- Footer section titles
- Page titles across the website
- Copyright notice

## Color Consistency
All quick links now use a consistent gray color (`text-white-50`) and turn blue with an underline when hovered over. The section titles are larger and more prominent for better readability.

## CSS Classes Added
New utility classes for blue colors:
- `.text-blue`, `.text-blue-light`, `.text-blue-dark`
- `.bg-blue`, `.bg-blue-light`, `.bg-blue-dark`  
- `.border-blue`, `.border-blue-light`, `.border-blue-dark`

The `.quick-link` class provides the blue hover effect with underline for all footer links.

## Global Access
Other JavaScript files can access the school configuration using:
```javascript
const config = HeaderFooterManager.getGlobalSchoolConfig();
console.log(config.name);    // "Main Street School"
console.log(config.phone);   // "515-981-1275"
```

This ensures all school information stays consistent across the entire website.
