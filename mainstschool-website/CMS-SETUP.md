# Main Street School - Netlify CMS Setup Guide

## Overview

This website has been configured to work with Netlify CMS, allowing content editors to manage staff information and blog posts through a user-friendly interface.

## What's Been Set Up

### 1. CMS Configuration
- **Admin Interface**: Located at `/admin/index.html`
- **Configuration**: Located at `/admin/config.yml`
- **Content Storage**: 
  - Staff data: `/content/staff/`
  - Blog posts: `/content/blog/`
  - Images: `/img/uploads/`

### 2. Content Types

#### Staff Members
- **Fields**: Name, Position, Description, Email, Photo, Type (teacher/board), Order
- **File Format**: JSON (automatically managed by CMS)
- **Image Upload**: Supported for staff photos

#### Blog Posts
- **Fields**: Title, Category, Author, Featured Image, Excerpt, Content, Publish Date, Draft Status
- **File Format**: Markdown with frontmatter
- **Categories**: News, Events, Student Achievements, Educational Insights, Community Updates
- **Image Upload**: Supported for featured images

### 3. New Features Added
- **Blog Page**: New `/blog.html` page with category filtering
- **Navigation**: Added "Blog" tab to main navigation
- **Responsive Design**: Blog cards with hover effects and modern styling

## Setup Instructions

### For Development (Local Testing)

1. **Install Netlify CMS locally**:
   ```bash
   npm install -g netlify-cms-proxy-server
   ```

2. **Start the proxy server**:
   ```bash
   netlify-cms-proxy-server
   ```

3. **Access the admin panel**:
   - Navigate to `http://localhost:8080/admin/`
   - You can now create and edit content locally

### For Production (Netlify Deployment)

1. **Deploy to Netlify**:
   - Connect your repository to Netlify
   - Deploy the site

2. **Configure Identity**:
   - In Netlify dashboard, go to Site Settings > Identity
   - Enable Identity service
   - Configure registration (invite-only recommended)

3. **Set up Git Gateway**:
   - In Netlify dashboard, go to Site Settings > Identity > Services
   - Enable Git Gateway

4. **Access the admin panel**:
   - Navigate to `https://yoursite.netlify.app/admin/`
   - Sign in with your Netlify Identity credentials

## Content Management

### Adding Staff Members
1. Go to `/admin/`
2. Click on "Staff Members"
3. Click "New Staff Member"
4. Fill in the required fields
5. Upload a photo (optional)
6. Click "Publish"

### Creating Blog Posts
1. Go to `/admin/`
2. Click on "Blog Posts"
3. Click "New Blog Post"
4. Fill in the required fields:
   - **Title**: The post title
   - **Category**: Select from predefined categories
   - **Author**: Who wrote the post
   - **Featured Image**: Upload an image (optional)
   - **Excerpt**: Brief summary (optional)
   - **Content**: Write your post in markdown
   - **Publish Date**: When to publish
   - **Draft**: Check if it's a draft
5. Click "Publish"

### Managing Images
- Images uploaded through the CMS are stored in `/img/uploads/`
- Staff photos are stored in `/img/staff/`
- Blog featured images are stored in `/img/uploads/`

## File Structure

```
mainstschool-website/
├── admin/
│   ├── index.html          # CMS admin interface
│   └── config.yml          # CMS configuration
├── content/
│   ├── staff/              # Staff member files
│   └── blog/               # Blog post files
├── img/
│   ├── uploads/            # CMS uploaded images
│   └── staff/              # Staff photos
├── js/
│   ├── team.js             # Staff display logic
│   ├── blog.js             # Blog display logic
│   └── header-footer.js    # Navigation management
├── blog.html               # Blog page
└── team.html               # Team page
```

## Customization

### Adding New Content Types
To add new content types (e.g., events, announcements):

1. **Update CMS config** (`/admin/config.yml`):
   ```yaml
   - name: "events"
     label: "Events"
     folder: "content/events"
     create: true
     fields:
       - {label: "Title", name: "title", widget: "string"}
       - {label: "Date", name: "date", widget: "datetime"}
       # Add more fields as needed
   ```

2. **Create display logic** (new JavaScript file)
3. **Create display page** (new HTML file)
4. **Update navigation** (in `header-footer.js`)

### Modifying Blog Categories
Edit the category options in `/admin/config.yml`:
```yaml
- {label: "Category", name: "category", widget: "select", options: ["News", "Events", "Your New Category"]}
```

## Troubleshooting

### Common Issues

1. **CMS not loading**:
   - Check that `/admin/index.html` exists
   - Verify `config.yml` is properly formatted
   - Ensure all required scripts are loading

2. **Images not displaying**:
   - Check file paths in `config.yml`
   - Verify image files exist in the correct directories
   - Check browser console for 404 errors

3. **Content not updating**:
   - Clear browser cache
   - Check that files are being saved to the correct locations
   - Verify JavaScript is loading the correct data sources

### Development Tips

- Use browser developer tools to debug JavaScript
- Check the browser console for error messages
- Test the CMS locally before deploying
- Keep backups of your content files

## Support

For technical issues with the CMS setup, refer to:
- [Netlify CMS Documentation](https://www.netlifycms.org/docs/)
- [Netlify Identity Documentation](https://docs.netlify.com/visitor-access/identity/)
- [Markdown Guide](https://www.markdownguide.org/) (for blog post formatting)
