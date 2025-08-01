// Blog functionality
class BlogManager {
    constructor() {
        this.blogList = document.getElementById('blog-list');
        this.posts = [];
        this.init();
    }

    async init() {
        await this.loadBlogPosts();
        this.displayBlogPosts();
    }

    async loadBlogPosts() {
        try {
            // Load posts from the generated JSON file
            const response = await fetch('src/js/blog-data.json');
            if (!response.ok) {
                throw new Error('Failed to load blog data');
            }
            this.posts = await response.json();
            console.log(`📝 Loaded ${this.posts.length} blog posts`);
        } catch (error) {
            console.error('❌ Error loading blog posts:', error);
            // Fallback to sample posts if JSON file doesn't exist
            this.loadSamplePosts();
        }
    }

    loadSamplePosts() {
        console.log('📝 Loading sample posts...');
        this.posts = [
            {
                title: 'Getting Started with Simple Web Development',
                date: '2024-01-15',
                excerpt: 'Learn how to build fast, simple websites using just HTML, CSS, and JavaScript. No frameworks required!',
                content: `# Getting Started with Simple Web Development

In today's world of complex frameworks and build tools, it's easy to forget that the web was built on simple technologies. HTML, CSS, and JavaScript are still powerful tools that can create amazing websites.

## Why Simple is Better

When you use basic web technologies, you get several advantages:

* **Faster loading times** - No framework overhead
* **Better performance** - Smaller bundle sizes
* **Easier maintenance** - Less complexity to manage
* **Better SEO** - Search engines love simple HTML

## Getting Started

Here's a simple example of a responsive website structure:

\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Simple Website</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header>
        <h1>Welcome</h1>
    </header>
    <main>
        <p>Hello, world!</p>
    </main>
</body>
</html>
\`\`\`

## Next Steps

Start with the basics and add complexity only when needed. Your users will thank you for the fast, reliable experience!`
            }
        ];
    }

    displayBlogPosts() {
        if (!this.blogList) return;

        this.blogList.innerHTML = '';

        if (this.posts.length === 0) {
            this.blogList.innerHTML = '<p>No blog posts found. Add some Markdown files to the <code>src/blog/</code> directory!</p>';
            return;
        }

        this.posts.forEach((post, index) => {
            const postElement = document.createElement('article');
            postElement.className = 'blog-post';
            
            const title = document.createElement('h2');
            const titleLink = document.createElement('a');
            titleLink.href = `#post-${index}`;
            titleLink.textContent = post.title;
            titleLink.onclick = (e) => {
                e.preventDefault();
                this.showFullPost(post, index);
            };
            title.appendChild(titleLink);
            
            const date = document.createElement('div');
            date.className = 'date';
            date.textContent = new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            
            const excerpt = document.createElement('div');
            excerpt.className = 'excerpt';
            excerpt.textContent = post.excerpt;
            
            postElement.appendChild(title);
            postElement.appendChild(date);
            postElement.appendChild(excerpt);
            
            this.blogList.appendChild(postElement);
        });
    }

    showFullPost(post, index) {
        // Use the pre-rendered HTML if available, otherwise convert Markdown
        const html = post.html || markdownConverter.convert(post.content);
        
        // Replace the blog list with the full post
        this.blogList.innerHTML = `
            <div class="blog-post-full">
                <a href="#" onclick="location.reload()" style="display: inline-block; margin-bottom: 20px; color: #007bff; text-decoration: none;">← Back to Blog</a>
                <h1>${post.title}</h1>
                <div class="date">${new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                })}</div>
                <div class="page-content">
                    ${html}
                </div>
            </div>
        `;
    }
}

// Initialize blog when page loads
document.addEventListener('DOMContentLoaded', () => {
    new BlogManager();
}); 