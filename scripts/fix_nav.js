const fs = require('fs');
const path = require('path');
const b = 'C:\\Users\\Administrator\\Documents\\Codex\\\u7f51\u7ad9\u7ba1\u5bb6\\dist';

// Fix nav link colors on subpages that have their own styles
const subpages = ['news/index.html', 'cooperation/index.html', 'tutorial/index.html'];

for (const sp of subpages) {
    const fp = path.join(b, sp);
    let content = fs.readFileSync(fp, 'utf8');
    
    // Check if already has our fix
    if (content.includes('Nav link color fix')) {
        console.log(sp + ': already fixed');
        continue;
    }
    
    // Find last </style> before </head>
    const headIdx = content.indexOf('</head>');
    if (headIdx < 0) continue;
    
    const lastStyle = content.lastIndexOf('</style>', headIdx);
    if (lastStyle < 0) continue;
    
    const navFix = '\n/* Nav link color fix */\n' +
        '.nav-link{color:#94a3b8!important}\n' +
        '.nav-link:hover,.nav-link.active{color:#fff!important}\n' +
        '.nav-actions a{color:#94a3b8!important}\n' +
        '.nav-actions a:hover{color:#fff!important}\n' +
        '.logo-text{color:#f1f5f9!important;font-size:0.95rem!important}\n' +
        '.header{background:rgba(10,14,23,0.95)!important}\n';
    
    content = content.slice(0, lastStyle) + navFix + content.slice(lastStyle);
    fs.writeFileSync(fp, content, 'utf8');
    console.log(sp + ': nav color fix added');
}

// Also fix the news page QQ characters
const newsPath = path.join(b, 'news', 'index.html');
let news = fs.readFileSync(newsPath, 'utf8');
const qq = String.fromCharCode(0x3F) + String.fromCharCode(0x3F);
const qqCount = news.split(qq).length - 1;
if (qqCount > 0) {
    news = news.split(qq).join('');
    fs.writeFileSync(newsPath, news, 'utf8');
    console.log('news: removed ' + qqCount + ' QQ chars');
} else {
    console.log('news: no QQ chars remaining');
}

console.log('Done');