const fs = require('fs');
const path = require('path');

const contactHtml = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>联系我们 - 🦞 OpenClaw 一键部署 | skillai.top</title>
<meta name="theme-color" content="#0a0e17">
<meta name="description" content="联系 OpenClaw Hermes Codex 团队，咨询 AI 自动化助手远程部署安装服务、技术支持与合作事宜。">
<meta name="keywords" content="OpenClaw联系,AI助手咨询,远程部署服务,技术支持,AI自动化">
<link rel="canonical" href="https://skillai.top/contact/">
<meta property="og:title" content="联系我们 - OpenClaw Hermes Codex">
<meta property="og:description" content="联系 OpenClaw Hermes Codex 团队，远程部署安装服务与技术支持">
<meta property="og:url" content="https://skillai.top/contact/">
<meta property="og:type" content="website">
<meta name="twitter:card" content="summary">
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:system-ui,-apple-system,sans-serif;background:#0a0e1a;color:#e8edf5;line-height:1.7}
.page-hero{text-align:center;padding:60px 20px 40px;background:linear-gradient(180deg,#0d1220 0%,#0a0e1a 100%)}
.page-hero h1{font-size:2rem;color:#fff;margin-bottom:12px}
.page-hero p{color:#8899aa;font-size:0.95rem;max-width:500px;margin:0 auto}
.container{max-width:900px;margin:0 auto;padding:20px 20px 60px}
.section-grid{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-top:20px}
@media(max-width:640px){.section-grid{grid-template-columns:1fr}}
.card{background:#111827;border:1px solid #1e293b;border-radius:16px;padding:28px;transition:border-color .2s}
.card:hover{border-color:#2563eb}
.card h2{font-size:1.1rem;color:#60a5fa;margin-bottom:16px;display:flex;align-items:center;gap:8px}
.card h2 .icon{font-size:1.3rem}
.contact-list{display:flex;flex-direction:column;gap:14px}
.contact-item{display:flex;align-items:center;gap:12px;font-size:0.9rem}
.contact-item .label{color:#94a3b8;min-width:80px;font-weight:500}
.contact-item .value{color:#e2e8f0}
.card p{color:#94a3b8;font-size:0.9rem;line-height:1.7}
.card ul{list-style:none;padding:0}
.card ul li{padding:8px 0;border-bottom:1px solid #1e293b;font-size:0.88rem;color:#cbd5e1;display:flex;align-items:center;gap:8px}
.card ul li:last-child{border-bottom:none}
.card ul li .dot{width:6px;height:6px;border-radius:50%;background:#3b82f6;flex-shrink:0}
.faq-section{margin-top:30px}
.faq-item{background:#111827;border:1px solid #1e293b;border-radius:12px;padding:20px;margin-bottom:12px}
.faq-item h3{font-size:0.95rem;color:#60a5fa;margin-bottom:8px}
.faq-item p{color:#94a3b8;font-size:0.88rem}
.back-link{display:inline-flex;align-items:center;gap:6px;margin-top:30px;color:#3b82f6;text-decoration:none;font-size:0.9rem;transition:color .2s}
.back-link:hover{color:#60a5fa}
/* Header/Nav */
.header{position:fixed;top:0;left:0;right:0;z-index:1000;background:rgba(10,14,26,0.92);border-bottom:1px solid rgba(255,255,255,0.06);backdrop-filter:blur(12px);padding:10px 0}
.nav{max-width:1100px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;padding:0 20px}
.nav-brand{display:flex;align-items:center;gap:10px;text-decoration:none;color:#e8edf5;font-weight:600;font-size:0.88rem}
.nav-brand img{width:32px;height:32px;border-radius:6px}
.nav-links{display:flex;gap:2px;list-style:none}
.nav-links a{padding:6px 14px;border-radius:6px;color:#94a3b8;text-decoration:none;font-size:0.82rem;font-weight:500;transition:color .2s,background .2s}
.nav-links a:hover,.nav-links a.active{color:#fff;background:rgba(255,255,255,0.06)}
/* Footer */
.footer{border-top:1px solid rgba(255,255,255,0.04);padding:40px 20px 24px;margin-top:40px}
.footer-grid{max-width:1100px;margin:0 auto;display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:32px}
@media(max-width:768px){.footer-grid{grid-template-columns:1fr 1fr}}
.footer-brand p{color:#64748b;font-size:0.8rem;line-height:1.6;margin-top:8px}
.footer-brand h3{color:#fff;font-size:0.9rem;display:flex;align-items:center;gap:8px}
.footer-col h4{color:#fff;font-size:0.82rem;margin-bottom:10px}
.footer-col a{display:block;color:#64748b;font-size:0.78rem;text-decoration:none;margin-bottom:6px;transition:color .2s}
.footer-col a:hover{color:#00d4ff}
.footer-bottom{grid-column:1/-1;text-align:center;padding-top:16px;border-top:1px solid rgba(255,255,255,0.04);color:#475569;font-size:0.75rem;margin-top:16px}
</style>
</head>
<body>
<header class="header">
<nav class="nav">
<a href="/" class="nav-brand"><img src="/assets/images/openclaw-logo-nav.svg" alt="OpenClaw Logo" width="32" height="32"> 🦞 OpenClaw 一键部署</a>
<ul class="nav-links">
<li><a href="/">首页</a></li>
<li><a href="/about.html">关于我们</a></li>
<li><a href="/guide/">使用教程</a></li>
<li><a href="/skills.html">功能特色</a></li>
<li><a href="/download/">下载安装</a></li>
<li><a href="/news/">动态资讯</a></li>
<li><a href="/contact/" class="active">联系我们</a></li>
</ul>
</nav>
</header>
<div style="height:60px"></div>
<div class="page-hero">
<h1>联系我们</h1>
<p>OpenClaw Hermes Codex 团队随时为您服务，解答部署与使用问题</p>
</div>
<div class="container">
<div class="section-grid">
<div class="card">
<h2><span class="icon">💬</span> 技术支持</h2>
<div class="contact-list">
<div class="contact-item"><span class="label">微信客服:</span><span class="value">kaka12512535</span></div>
<div class="contact-item"><span class="label">QQ 群:</span><span class="value">482123078</span></div>
<div class="contact-item"><span class="label">服务时间:</span><span class="value">9:00 - 22:00</span></div>
<div class="contact-item"><span class="label">响应时间:</span><span class="value">工作日 2 小时内</span></div>
</div>
</div>
<div class="card">
<h2><span class="icon">🤝</span> 商务合作</h2>
<div class="contact-list">
<div class="contact-item"><span class="label">合作微信:</span><span class="value">kaka12512535</span></div>
<div class="contact-item"><span class="label">合作方式:</span><span class="value">代理 / 分销 / 定制开发</span></div>
<div class="contact-item"><span class="label">面向群体:</span><span class="value">个人开发者、中小企业、技术团队</span></div>
</div>
</div>
</div>
<div class="card" style="margin-top:20px">
<h2><span class="icon">🎯</span> 服务范围</h2>
<ul>
<li><span class="dot"></span>OpenClaw / Hermes AI / Codex 全平台远程部署安装</li>
<li><span class="dot"></span>Windows / macOS / Linux 跨平台支持</li>
<li><span class="dot"></span>API 密钥配置与模型对接（DeepSeek / GLM / Claude / GPT 等）</li>
<li><span class="dot"></span>Agent 自动化工作流配置与调试</li>
<li><span class="dot"></span>使用问题排查与优化建议</li>
<li><span class="dot"></span>企业私有化部署方案咨询</li>
</ul>
</div>
<div class="faq-section">
<h2 style="color:#fff;font-size:1.1rem;margin-bottom:16px">常见问题</h2>
<div class="faq-item">
<h3>部署安装需要多久？</h3>
<p>标准远程部署约 3-5 分钟即可完成，复杂定制方案视需求而定。</p>
</div>
<div class="faq-item">
<h3>支持哪些操作系统？</h3>
<p>完整支持 Windows 10/11、macOS 12+、Ubuntu/Debian/CentOS 等主流 Linux 发行版。</p>
</div>
<div class="faq-item">
<h3>是否提供售后支持？</h3>
<p>部署完成后提供 7 天免费技术支持，后续可选择续费获得持续服务。</p>
</div>
</div>
<a href="/" class="back-link">⬅ 返回首页</a>
</div>
<footer class="footer">
<div class="footer-grid">
<div class="footer-brand">
<h3>🦞 OpenClaw 一键部署</h3>
<p>您的全能AI私人助理部署工具，一键自动化部署、智能配置、数据隐私保护，让每个人都能轻松拥有本地AI助手。</p>
</div>
<div class="footer-col"><h4>产品</h4><a href="/#features">功能特性</a><a href="/download/">下载安装</a><a href="/blog/">热点爆文</a></div>
<div class="footer-col"><h4>支持</h4><a href="/guide/">使用教程</a><a href="/guide/#faq">常见问题</a></div>
<div class="footer-col"><h4>关于</h4><a href="/agreement/">会员服务协议</a><a href="/contact/">联系我们</a></div>
</div>
<div class="footer-bottom"><p>&copy; 2024-2026 SkillAI.top All Rights Reserved. | 客服微信 164223412</p></div>
</footer>
</body>
</html>`;

fs.writeFileSync(path.join(__dirname, '..' , 'dist', 'contact', 'index.html'), contactHtml, 'utf8');
console.log('contact/index.html written: ' + contactHtml.length + ' chars');