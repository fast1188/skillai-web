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
let totalFixed = 0;

for (const fp of files) {
    let content = fs.readFileSync(fp, 'utf8');
    const orig = content;
    
    // Fix og:site_name everywhere
    content = content.split('content="SkillAI">\n').join('content="OpenClaw Hermes Codex">\n');
    content = content.split('content="SkillAI">').join('content="OpenClaw Hermes Codex">');
    
    // Fix JSON-LD Organization name
    content = content.split('"name":"SkillAI"').join('"name":"OpenClaw Hermes Codex"');
    
    // Fix blog meta-info
    content = content.split('· SkillAI\n').join('· OpenClaw Hermes Codex\n');
    
    // Fix agreement title
    content = content.split('用户协议 - SkillAI">').join('用户协议 - OpenClaw Hermes Codex">');
    
    // Fix download.html title
    content = content.split('页面已迁移 - SkillAI').join('页面已迁移 - OpenClaw Hermes Codex');
    
    // Fix homepage section title
    content = content.split('SkillAI 能帮你做什么').join('OpenClaw 能帮你做什么');
    
    // Fix footer logo
    content = content.split('>SkillAI\n      <p').join('>OpenClaw Hermes Codex\n      <p');
    
    if (content !== orig) {
        const removed = (orig.split('SkillAI').length - 1) - (content.split('SkillAI').length - 1);
        fs.writeFileSync(fp, content, 'utf8');
        console.log('FIXED: ' + path.relative(b, fp).replace(/\\\\/g, '/') + ' (-' + removed + ')');
        totalFixed += removed;
    }
}

console.log('\nTotal fixed: ' + totalFixed);

// Final remaining check
console.log('\nFinal remaining:');
let totalRemaining = 0;
for (const fp of files) {
    const content = fs.readFileSync(fp, 'utf8');
    let idx = 0;
    let refs = [];
    while (true) {
        idx = content.indexOf('SkillAI', idx);
        if (idx < 0) break;
        const start = Math.max(0, idx - 15);
        const snippet = content.substring(start, idx + 25).replace(/<[^>]+>/g, '').trim();
        const isFile = snippet.includes('.exe') || snippet.includes('.js');
        const isDomain = snippet.includes('skillai.top') || snippet.includes('SkillAI.top');
        if (!isFile && !isDomain) {
            refs.push(snippet);
        }
        idx += 7;
    }
    if (refs.length > 0) {
        const name = path.relative(b, fp).replace(/\\\\/g, '/');
        console.log('  ' + name + ': ' + refs.length + ' TEXT refs');
        refs.forEach(r => console.log('    ...' + r + '...'));
        totalRemaining += refs.length;
    }
}
console.log('Non-file/domain remaining: ' + totalRemaining);