const fs = require('fs');
const path = require('path');
const b = 'C:\\Users\\Administrator\\Documents\\Codex\\\u7f51\u7ad9\u7ba1\u5bb6\\dist';

// Fix blog articles
const blogDir = path.join(b, 'blog', '2026-06-02');
for (const f of fs.readdirSync(blogDir)) {
    if (!f.endsWith('.html')) continue;
    const fp = path.join(blogDir, f);
    let content = fs.readFileSync(fp, 'utf8');
    // The meta-info div has: 2026-06-02 · SkillAI
    content = content.split('\u00b7 SkillAI').join('\u00b7 OpenClaw Hermes Codex');
    fs.writeFileSync(fp, content, 'utf8');
    console.log('FIXED blog: ' + f);
}

// Fix top-agents footer
const topAgents = fs.readFileSync(path.join(b, 'top-agents.html'), 'utf8');
const fixed = topAgents.split('class="footer-logo">SkillAI\n').join('class="footer-logo">OpenClaw Hermes Codex\n');
if (fixed !== topAgents) {
    fs.writeFileSync(path.join(b, 'top-agents.html'), fixed, 'utf8');
    console.log('FIXED top-agents.html');
}

// Final check
const files = [];
function walk(dir) {
    for (const f of fs.readdirSync(dir)) {
        const fp = path.join(dir, f);
        if (fs.statSync(fp).isDirectory()) walk(fp);
        else if (f.endsWith('.html')) files.push(fp);
    }
}
walk(b);
let remaining = 0;
for (const fp of files) {
    const content = fs.readFileSync(fp, 'utf8');
    let idx = 0;
    while (true) {
        idx = content.indexOf('SkillAI', idx);
        if (idx < 0) break;
        const start = Math.max(0, idx - 15);
        const snippet = content.substring(start, idx + 25).replace(/<[^>]+>/g, '').trim();
        const isFile = snippet.includes('.exe') || snippet.includes('.js') || snippet.includes('.sh');
        const isDomain = snippet.includes('skillai.top') || snippet.includes('SkillAI.top');
        if (!isFile && !isDomain) {
            console.log('REMAINING: ' + path.relative(b, fp).replace(/\\\\/g, '/') + ': ' + snippet);
            remaining++;
        }
        idx += 7;
    }
}
console.log('\nTotal remaining non-file/domain: ' + remaining);