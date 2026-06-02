const fs = require('fs');
const path = require('path');
const b = 'C:\\Users\\Administrator\\Documents\\Codex\\\u7f51\u7ad9\u7ba1\u5bb6\\dist';

function walk(dir) {
    const results = [];
    const files = fs.readdirSync(dir);
    for (const f of files) {
        const fp = path.join(dir, f);
        if (fs.statSync(fp).isDirectory()) results.push(...walk(fp));
        else if (f.endsWith('.html') && !f.startsWith('_')) results.push(fp);
    }
    return results;
}

const htmlFiles = walk(b);
for (const fp of htmlFiles) {
    const content = fs.readFileSync(fp, 'utf8');
    const name = path.relative(b, fp).replace(/\\/g, '/');
    const checks = {};
    const titleMatch = content.match(/<title[^>]*>([\s\S]*?)<\/title>/);
    checks.title = titleMatch ? 'OK' : 'MISSING';
    checks.charset = /charset/i.test(content) ? 'OK' : 'MISSING';
    checks.viewport = /name="viewport"/.test(content) ? 'OK' : 'MISSING';
    checks.desc = /name="description"/.test(content) ? 'OK' : 'MISSING';
    checks.canonical = /rel="canonical"/.test(content) ? 'OK' : 'MISSING';
    checks.themeColor = /theme-color/.test(content) ? 'OK' : 'MISSING';
    checks.ogTitle = /og:title/.test(content) ? 'OK' : 'MISSING';
    checks.ogDesc = /og:description/.test(content) ? 'OK' : 'MISSING';
    checks.ogUrl = /og:url/.test(content) ? 'OK' : 'MISSING';
    checks.twitter = /twitter:card/.test(content) ? 'OK' : 'MISSING';
    const missing = Object.entries(checks).filter(([k,v]) => v === 'MISSING').map(([k]) => k);
    if (missing.length > 0) {
        console.log('[WARN] ' + name + ' missing: ' + missing.join(', '));
    } else {
        console.log('[PASS] ' + name);
    }
}