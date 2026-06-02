const fs = require('fs');
const path = require('path');
const b = 'C:\\Users\\Administrator\\Documents\\Codex\\\u7f51\u7ad9\u7ba1\u5bb6\\dist';

// Read news page
let news = fs.readFileSync(path.join(b, 'news', 'index.html'), 'utf8');
const qq = String.fromCharCode(0x3F) + String.fromCharCode(0x3F);

// Count before
const beforeCount = news.split(qq).length - 1;
console.log('QQ before:', beforeCount);

// Replace category filters
news = news.split(qq + ' \u66f4\u65b0').join('\u{1F504} \u66f4\u65b0');
news = news.split(qq + ' \u6559\u7a0b').join('\u{1F4D6} \u6559\u7a0b');
news = news.split(qq + ' \u6280\u5de7').join('\u{1F4A1} \u6280\u5de7');
news = news.split(qq + ' \u884c\u4e1a').join('\u{1F4CA} \u884c\u4e1a');
news = news.split(qq + ' \u70ed\u95e8\u8bdd\u9898').join('\u{1F525} \u70ed\u95e8\u8bdd\u9898');

// Remove all remaining QQ
news = news.split(qq).join('');

const afterCount = news.split(qq).length - 1;
console.log('QQ after:', afterCount);

fs.writeFileSync(path.join(b, 'news', 'index.html'), news, 'utf8');
console.log('News page saved:', news.length, 'bytes');

// Deploy
console.log('Deploying...');