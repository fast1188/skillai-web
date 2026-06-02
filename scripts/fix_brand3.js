const fs = require('fs');
const path = require('path');
const b = 'C:\\Users\\Administrator\\Documents\\Codex\\\u7f51\u7ad9\u7ba1\u5bb6\\dist';

function walk(dir) {
    const results = [];
    for (const f of fs.readdirSync(dir)) {
        const fp = path.join(dir, f);
        if (fs.statSync(fp).isDirectory()) results.push(...walk(fp));
        else if (f.endsWith('.html')) results.push(fp);
    }
    return results;
}

const files = walk(b);
let total = 0;

for (const fp of files) {
    let content = fs.readFileSync(fp, 'utf8');
    const orig = content;
    
    // Fix remaining JSON-LD
    content = content.split('"name": "SkillAI"').join('"name": "OpenClaw Hermes Codex"');
    
    // Fix blog meta-info (different format)
    content = content.split('>SkillAI\n').join('>OpenClaw Hermes Codex\n');
    content = content.split('>SkillAI\r\n').join('>OpenClaw Hermes Codex\r\n');
    
    // Fix index.html content text
    content = content.split('部署 SkillAI 后').join('部署 OpenClaw 后');
    content = content.split('SkillAI 支持').join('OpenClaw 支持');
    content = content.split('大家都在用 SkillAI<').join('大家都在用 OpenClaw<');
    content = content.split('选择 SkillAI 作为').join('选择 OpenClaw 作为');
    
    // Fix keywords
    content = content.split('content="SkillAI, AI').join('content="OpenClaw Hermes Codex, AI');
    
    // Fix footer logo
    content = content.split('class="footer-logo">SkillAI\n').join('class="footer-logo">OpenClaw Hermes Codex\n');
    
    if (content !== orig) {
        const removed = (orig.split('SkillAI').length - 1) - (content.split('SkillAI').length - 1);
        fs.writeFileSync(fp, content, 'utf8');
        console.log('FIXED: ' + path.relative(b, fp).replace(/\\\\/g, '/') + ' (-' + removed + ')');
        total += removed;
    }
}

console.log('Total: ' + total);

// Final check
console.log('\nFinal non-file/domain refs:');
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
            console.log('  ' + path.relative(b, fp).replace(/\\\\/g, '/') + ': ...' + snippet + '...');
            remaining++;
        }
        idx += 7;
    }
}
console.log('Remaining: ' + remaining);