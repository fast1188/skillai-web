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
    
    // Fix og:site_name
    content = content.replace(/content="SkillAI"><meta name="twitter:card"/g, 
        'content="OpenClaw Hermes Codex"><meta name="twitter:card"');
    
    // Fix page titles that have SkillAI
    content = content.replace(/<title[^>]*>.*?SkillAI.*?<\/title>/g, (match) => {
        return match.replace(/SkillAI\s*-\s*/g, 'OpenClaw Hermes Codex - ')
                    .replace(/SkillAI\s*\|\s*/g, 'OpenClaw Hermes Codex | ')
                    .replace(/>SkillAI</g, '>OpenClaw Hermes Codex<');
    });
    
    // Fix descriptions
    content = content.replace(/"SkillAI 用户协议/g, '"OpenClaw Hermes Codex 用户协议');
    content = content.replace(/"SkillAI 热点爆文/g, '"OpenClaw Hermes Codex 热点爆文');
    content = content.replace(/关于 SkillAI\.top/g, '关于 OpenClaw Hermes Codex');
    content = content.replace(/关于SkillAI/g, '关于 OpenClaw Hermes Codex');
    
    // Fix keywords (but not filenames)
    content = content.replace(/keywords" content="SkillAI,/g, 'keywords" content="OpenClaw Hermes Codex,');
    content = content.replace(/,SkillAI,/g, ',OpenClaw Hermes Codex,');
    content = content.replace(/服务条款,SkillAI/g, '服务条款,OpenClaw Hermes Codex');
    
    // Fix JSON-LD org name
    content = content.replace(/"name":"SkillAI"/g, '"name":"OpenClaw Hermes Codex"');
    
    // Fix footer logo text (not copyright with .top domain)
    content = content.replace(/>SkillAI\n.*?<p style/g, '>OpenClaw Hermes Codex\n      <p style');
    
    // Fix blog meta-info
    content = content.replace(/· SkillAI\n/g, '· OpenClaw Hermes Codex\n');
    
    // Fix tutorial reference
    content = content.replace(/SkillAI 一站式 Token/g, 'OpenClaw Hermes Codex 一站式 Token');
    
    if (content !== orig) {
        const count = (orig.split('SkillAI').length - 1) - (content.split('SkillAI').length - 1);
        fs.writeFileSync(fp, content, 'utf8');
        console.log('FIXED: ' + path.relative(b, fp).replace(/\\\\/g, '/') + ' (' + count + ' refs removed)');
        totalFixed += count;
    }
}

console.log('\nTotal fixed: ' + totalFixed);

// Remaining check
console.log('\nRemaining SkillAI refs:');
for (const fp of files) {
    const content = fs.readFileSync(fp, 'utf8');
    const count = content.split('SkillAI').length - 1;
    if (count > 0) {
        const name = path.relative(b, fp).replace(/\\\\/g, '/');
        console.log('  ' + name + ': ' + count);
    }
}