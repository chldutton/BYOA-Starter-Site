const fs = require('fs-extra');
const path = require('path');
const { marked } = require('marked');
const matter = require('gray-matter');

// Configuration
const BLOG_DIR = 'src/blog';
const OUTPUT_FILE = 'src/js/blog-data.json';

async function buildBlog() {
    console.log('🔄 Building blog...');
    
    try {
        // Ensure the blog directory exists
        if (!await fs.pathExists(BLOG_DIR)) {
            console.log('📁 Creating blog directory...');
            await fs.ensureDir(BLOG_DIR);
        }
        
        // Read all markdown files from the blog directory
        const files = await fs.readdir(BLOG_DIR);
        const markdownFiles = files.filter(file => file.endsWith('.md'));
        
        console.log(`📝 Found ${markdownFiles.length} blog posts`);
        
        const posts = [];
        
        for (const file of markdownFiles) {
            const filePath = path.join(BLOG_DIR, file);
            const content = await fs.readFile(filePath, 'utf8');
            
            // Parse frontmatter and content
            const { data: metadata, content: markdownContent } = matter(content);
            
            // Convert markdown to HTML
            const htmlContent = marked(markdownContent);
            
            // Create post object
            const post = {
                title: metadata.title || file.replace('.md', ''),
                date: metadata.date || new Date().toISOString().split('T')[0],
                excerpt: metadata.excerpt || '',
                content: markdownContent,
                html: htmlContent,
                slug: file.replace('.md', '')
            };
            
            posts.push(post);
            console.log(`✅ Processed: ${post.title}`);
        }
        
        // Sort posts by date (newest first)
        posts.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        // Write the JSON file
        await fs.ensureDir(path.dirname(OUTPUT_FILE));
        await fs.writeJson(OUTPUT_FILE, posts, { spaces: 2 });
        
        console.log(`🎉 Blog built successfully! Generated ${posts.length} posts`);
        console.log(`📄 Output: ${OUTPUT_FILE}`);
        
    } catch (error) {
        console.error('❌ Error building blog:', error);
        process.exit(1);
    }
}

// Check if --watch flag is provided
const isWatchMode = process.argv.includes('--watch');

if (isWatchMode) {
    console.log('👀 Watch mode enabled - rebuilding on file changes...');
    
    // Watch for changes in the blog directory
    fs.watch(BLOG_DIR, { recursive: true }, (eventType, filename) => {
        if (filename && filename.endsWith('.md')) {
            console.log(`📝 File changed: ${filename}`);
            buildBlog();
        }
    });
    
    // Initial build
    buildBlog();
} else {
    // Single build
    buildBlog();
} 