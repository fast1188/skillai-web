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

// Replace brand text
for (const fp of files) {
    let content = fs.readFileSync(fp, 'utf8');
    const orig = content;
    
    // Replace all brand name variants
    const replacements = [
        ['OpenClaw Hermes Codex \u8fdc\u7a0b\u90e8\u7f72\u5b89\u88c5', '\u{1F99E} OpenClaw \u4e00\u952e\u90e8\u7f72'],
        ['alt="OpenClaw Hermes Codex"', 'alt="\u{1F99E} OpenClaw \u4e00\u952e\u90e8\u7f72"'],
        ['alt=OpenClaw Hermes Codex', 'alt=\u{1F99E} OpenClaw \u4e00\u952e\u90e8\u7f72'],
    ];
    
    for (const [from, to] of replacements) {
        while (content.includes(from)) {
            content = content.replace(from, to);
        }
    }
    
    if (content !== orig) {
        fs.writeFileSync(fp, content, 'utf8');
        console.log('FIXED: ' + path.relative(b, fp).replace(/\\/g, '/'));
        total++;
    }
}
console.log('Total: ' + total + ' files updated');