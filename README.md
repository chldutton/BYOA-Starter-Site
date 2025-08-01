# Simple Static Website

A clean, fast, and simple website built with HTML, CSS, and JavaScript. Features a Node.js build process for Markdown content management.

## Features

- ✅ **Landing page** with hero section and features
- ✅ **Blog system** with Markdown support and Node.js build process
- ✅ **About page** with information about the project
- ✅ **FAQ page** with common questions
- ✅ **Responsive design** that works on all devices
- ✅ **Markdown to HTML converter** with Node.js processing
- ✅ **Fast loading** - minimal external dependencies
- ✅ **SEO friendly** - semantic HTML structure
- ✅ **Build process** - converts Markdown files to JSON for the blog

## Project Structure

```
├── index.html              # Landing page
├── blog.html               # Blog listing page
├── about.html              # About page
├── faq.html                # FAQ page
├── build.js                # Node.js build script
├── package.json            # Node.js dependencies
├── .gitignore              # Git ignore rules
├── src/
│   ├── css/
│   │   └── style.css       # Main stylesheet
│   ├── js/
│   │   ├── markdown.js     # Client-side Markdown converter
│   │   ├── blog.js         # Blog functionality
│   │   └── blog-data.json  # Generated blog data (auto-created)
│   ├── blog/               # Markdown blog posts
│   │   ├── getting-started.md
│   │   └── markdown-power.md
│   └── pages/              # Additional pages (future)
└── README.md
```

## Prerequisites

- **Node.js** (version 14 or higher)
- **npm** (comes with Node.js)

### Installing Node.js

**On Windows:**
1. Download from [nodejs.org](https://nodejs.org/)
2. Run the installer and follow the prompts

**On macOS (with Homebrew):**
```bash
brew install node
```

**On Linux:**
```bash
sudo apt update
sudo apt install nodejs npm
```

## Getting Started

1. **Clone or download** this repository
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Build the blog:**
   ```bash
   npm run build
   ```
4. **Start the development server:**
   ```bash
   npm start
   ```
5. **Open your browser** to `http://localhost:8000`

## Development Workflow

### Adding Blog Posts

1. Create a new `.md` file in the `src/blog/` directory
2. Use this format:

```markdown
---
title: Your Post Title
date: 2024-01-20
excerpt: A brief description of your post
---

# Your Post Title

Your content here...
```

3. **Build the blog** to process the new post:
   ```bash
   npm run build
   ```
4. **Or use watch mode** to automatically rebuild on changes:
   ```bash
   npm run watch
   ```

### Available Scripts

- `npm start` - Build and start development server
- `npm run build` - Build the blog from Markdown files
- `npm run watch` - Watch for changes and rebuild automatically
- `npm run serve` - Start server without building (for testing)

## How the Build Process Works

1. **Node.js reads** all `.md` files from `src/blog/`
2. **Parses frontmatter** (metadata at the top of each file)
3. **Converts Markdown** to HTML using the `marked` library
4. **Generates** `src/js/blog-data.json` with all posts
5. **Website loads** the JSON file and displays posts

### Benefits of This Approach

- ✅ **Better Markdown support** - Uses professional `marked` library
- ✅ **File-based content** - Each post is a separate file
- ✅ **Build-time processing** - Faster website loading
- ✅ **Version control friendly** - Track content changes in Git
- ✅ **Easy to manage** - Add/remove posts by adding/removing files

## Customization

### Styling

- Edit `src/css/style.css` to change colors, fonts, and layout
- The CSS uses CSS Grid and Flexbox for modern layouts
- All styles are responsive by default

### Content

- Update the hero section in `index.html`
- Modify the About page content in `about.html`
- Add/remove FAQ items in `faq.html`

### Blog

- Add new posts by creating `.md` files in `src/blog/`
- The build process automatically processes new files
- Use `npm run watch` for automatic rebuilding during development

## Deployment

This website can be deployed to any static hosting service:

1. **Build the site:**
   ```bash
   npm run build
   ```
2. **Upload all files** (except `node_modules/` and `.git/`)
3. **Deploy to:**
   - **GitHub Pages** - Push to repository and enable Pages
   - **Netlify** - Drag and drop the folder
   - **Vercel** - Connect your repository
   - **Any web server** - Upload the files

## Dependencies

- **marked** - Professional Markdown to HTML converter
- **fs-extra** - Enhanced file system operations
- **gray-matter** - Parse frontmatter from Markdown files

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers
- No IE11 support (uses modern CSS features)

## Future Enhancements

- [ ] Contact form integration
- [ ] Search functionality
- [ ] Categories and tags for blog posts
- [ ] RSS feed
- [ ] Dark mode toggle
- [ ] Image optimization
- [ ] Analytics integration

## License

MIT License - feel free to use this for your own projects!

## Contributing

This is a simple project, but if you find bugs or have suggestions, feel free to open an issue or submit a pull request. 