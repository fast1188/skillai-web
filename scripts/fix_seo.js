const fs = require('fs');
const path = require('path');
const b = 'C:\\Users\\Administrator\\Documents\\Codex\\\u7f51\u7ad9\u7ba1\u5bb6\\dist';

// Fix blog articles - add missing OG tags
const blogDir = path.join(b, 'blog', '2026-06-02');
const blogFiles = fs.readdirSync(blogDir).filter(f => f.endsWith('.html'));

for (const f of blogFiles) {
    const fp = path.join(blogDir, f);
    let content = fs.readFileSync(fp, 'utf8');
    const filename = f.replace('.html', '');
    const slug = filename;
    const canonical = 'https://skillai.top/blog/2026-06-02/' + slug;
    
    let title = '';
    const titleMatch = content.match(/<title[^>]*>([\s\S]*?)<\/title>/);
    if (titleMatch) title = titleMatch[1].split('|')[0].trim();
    
    // Add og:title, og:description, og:url if missing
    let changes = [];
    
    if (!content.includes('og:title')) {
        content = content.replace('</head>', '<meta property="og:title" content="' + title + '">\n</head>');
        changes.push('og:title');
    }
    if (!content.includes('og:description')) {
        const desc = title.substring(0, 120);
        content = content.replace('</head>', '<meta property="og:description" content="' + desc + '">\n</head>');
        changes.push('og:description');
    }
    if (!content.includes('og:url')) {
        content = content.replace('</head>', '<meta property="og:url" content="' + canonical + '">\n</head>');
        changes.push('og:url');
    }
    if (!content.includes('twitter:card')) {
        content = content.replace('</head>', '<meta name="twitter:card" content="summary">\n</head>');
        changes.push('twitter:card');
    }
    
    if (changes.length > 0) {
        fs.writeFileSync(fp, content, 'utf8');
        console.log('FIXED: ' + f + ' added: ' + changes.join(', '));
    } else {
        console.log('OK: ' + f);
    }
}

// Fix subpages missing og:url
const subpages = ['cooperation/index.html', 'download/index.html', 'news/index.html', 'tutorial/index.html'];
const urlMap = {
    'cooperation/index.html': 'https://skillai.top/cooperation/',
    'download/index.html': 'https://skillai.top/download/',
    'news/index.html': 'https://skillai.top/news/',
    'tutorial/index.html': 'https://skillai.top/tutorial/'
};

for (const sp of subpages) {
    const fp = path.join(b, sp);
    if (!fs.existsSync(fp)) continue;
    let content = fs.readFileSync(fp, 'utf8');
    if (!content.includes('og:url')) {
        content = content.replace('</head>', '<meta property="og:url" content="' + urlMap[sp] + '">\n</head>');
        fs.writeFileSync(fp, content, 'utf8');
        console.log('FIXED: ' + sp + ' added og:url');
    }
}

console.log('\nDone');