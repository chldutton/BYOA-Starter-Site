// Simple Markdown to HTML converter
class MarkdownConverter {
    constructor() {
        this.rules = [
            // Headers
            { pattern: /^### (.*$)/gim, replacement: '<h3>$1</h3>' },
            { pattern: /^## (.*$)/gim, replacement: '<h2>$1</h2>' },
            { pattern: /^# (.*$)/gim, replacement: '<h1>$1</h1>' },
            
            // Bold and italic
            { pattern: /\*\*(.*?)\*\*/g, replacement: '<strong>$1</strong>' },
            { pattern: /\*(.*?)\*/g, replacement: '<em>$1</em>' },
            
            // Code blocks
            { pattern: /```([\s\S]*?)```/g, replacement: '<pre><code>$1</code></pre>' },
            { pattern: /`(.*?)`/g, replacement: '<code>$1</code>' },
            
            // Links
            { pattern: /\[([^\]]+)\]\(([^)]+)\)/g, replacement: '<a href="$2">$1</a>' },
            
            // Images
            { pattern: /!\[([^\]]*)\]\(([^)]+)\)/g, replacement: '<img src="$2" alt="$1">' },
            
            // Blockquotes
            { pattern: /^> (.*$)/gim, replacement: '<blockquote>$1</blockquote>' },
            
            // Lists
            { pattern: /^\* (.*$)/gim, replacement: '<li>$1</li>' },
            { pattern: /^- (.*$)/gim, replacement: '<li>$1</li>' },
            { pattern: /^\d+\. (.*$)/gim, replacement: '<li>$1</li>' },
            
            // Line breaks
            { pattern: /\n\n/g, replacement: '</p><p>' },
        ];
    }

    convert(markdown) {
        if (!markdown) return '';
        
        // Wrap in paragraph tags
        let html = '<p>' + markdown + '</p>';
        
        // Apply conversion rules
        this.rules.forEach(rule => {
            html = html.replace(rule.pattern, rule.replacement);
        });
        
        // Clean up empty paragraphs
        html = html.replace(/<p><\/p>/g, '');
        html = html.replace(/<p><\/p>/g, '');
        
        // Handle lists properly
        html = this.processLists(html);
        
        return html;
    }

    processLists(html) {
        // Find consecutive <li> elements and wrap them in <ul>
        const lines = html.split('\n');
        let inList = false;
        let processedLines = [];
        
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            
            if (line.includes('<li>')) {
                if (!inList) {
                    processedLines.push('<ul>');
                    inList = true;
                }
                processedLines.push(line);
            } else {
                if (inList) {
                    processedLines.push('</ul>');
                    inList = false;
                }
                processedLines.push(line);
            }
        }
        
        if (inList) {
            processedLines.push('</ul>');
        }
        
        return processedLines.join('\n');
    }

    // Extract metadata from markdown frontmatter
    extractMetadata(markdown) {
        const metadata = {};
        
        // Look for YAML-style frontmatter
        const frontmatterMatch = markdown.match(/^---\n([\s\S]*?)\n---\n/);
        if (frontmatterMatch) {
            const frontmatter = frontmatterMatch[1];
            const lines = frontmatter.split('\n');
            
            lines.forEach(line => {
                const [key, ...valueParts] = line.split(':');
                if (key && valueParts.length > 0) {
                    metadata[key.trim()] = valueParts.join(':').trim();
                }
            });
            
            // Remove frontmatter from markdown
            markdown = markdown.replace(/^---\n[\s\S]*?\n---\n/, '');
        }
        
        return { metadata, content: markdown };
    }
}

// Global instance
window.markdownConverter = new MarkdownConverter(); 