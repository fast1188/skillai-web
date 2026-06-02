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
for (const fp of files) {
    let content = fs.readFileSync(fp, 'utf8');
    const name = path.relative(b, fp).replace(/\\\\/g, '/');
    
    let idx = 0;
    let shown = 0;
    while (shown < 5) {
        idx = content.indexOf('SkillAI', idx);
        if (idx < 0) break;
        const start = Math.max(0, idx - 30);
        const snippet = content.substring(start, idx + 40).replace(/<[^>]+>/g, '').trim();
        const isFilename = snippet.includes('.exe') || snippet.includes('.js') || snippet.includes('.sh');
        const isDomain = snippet.includes('skillai.top') || snippet.includes('SkillAI.top');
        const tag = isFilename ? '[FILE]' : isDomain ? '[DOMAIN]' : '[TEXT]';
        console.log(name + ' ' + tag + ': ...' + snippet + '...');
        idx += 7;
        shown++;
    }
}