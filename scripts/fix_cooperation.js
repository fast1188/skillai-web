const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, '..', 'dist');

const cooperationHtml = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>商务合作 - OpenClaw Hermes Codex 携手共赢 AI 新赛道</title>
<meta name="theme-color" content="#0a0e17">
<meta name="description" content="与 OpenClaw Hermes Codex 合作，共享 AI 自动化万亿市场。提供 Token 代理、代理分销、技术合作等多种合作模式。">
<meta name="keywords" content="OpenClaw合作,AI代理,Token代理,商务合作,分销,AI自动化">
<link rel="canonical" href="https://skillai.top/cooperation/">
<meta property="og:title" content="商务合作 - OpenClaw Hermes Codex">
<meta property="og:description" content="携手共赢 AI 新赛道，多种合作模式等你来">
<meta property="og:url" content="https://skillai.top/cooperation/">
<meta property="og:type" content="website">
<meta name="twitter:card" content="summary">
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:system-ui,-apple-system,sans-serif;background:#0a0e1a;color:#e8edf5;line-height:1.7}
/* Hero */
.coop-hero{text-align:center;padding:80px 20px 60px;background:linear-gradient(180deg,#0d1525 0%,#0a0e1a 100%);position:relative;overflow:hidden}
.coop-hero::before{content:'';position:absolute;top:-200px;left:50%;transform:translateX(-50%);width:600px;height:600px;background:radial-gradient(circle,rgba(59,130,246,0.08) 0%,transparent 70%);pointer-events:none}
.hero-badge{display:inline-flex;align-items:center;gap:6px;background:rgba(16,185,129,0.12);color:#34d399;font-size:0.78rem;padding:6px 16px;border-radius:20px;margin-bottom:20px;border:1px solid rgba(16,185,129,0.2)}
.hero-badge .dot{width:6px;height:6px;border-radius:50%;background:#34d399;animation:pulse 2s infinite}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}
.coop-hero h1{font-size:2.4rem;color:#fff;font-weight:800;margin-bottom:16px;letter-spacing:-0.02em}
.coop-hero h1 span{background:linear-gradient(135deg,#60a5fa,#a78bfa);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.coop-hero p{color:#8899aa;font-size:1rem;max-width:560px;margin:0 auto 30px}
.hero-stats{display:flex;justify-content:center;gap:40px;flex-wrap:wrap}
.hero-stat{text-align:center}
.hero-stat .num{font-size:1.8rem;font-weight:800;background:linear-gradient(135deg,#3b82f6,#8b5cf6);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.hero-stat .label{font-size:0.78rem;color:#64748b;margin-top:4px}
/* Container */
.container{max-width:1000px;margin:0 auto;padding:20px 20px 60px}
/* Section title */
.section-title{text-align:center;margin:50px 0 30px}
.section-title h2{font-size:1.5rem;color:#fff;font-weight:700;margin-bottom:8px}
.section-title p{color:#64748b;font-size:0.9rem}
/* Cards grid */
.cards-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:20px}
.coop-card{background:#111827;border:1px solid #1e293b;border-radius:16px;padding:28px;transition:all .3s;position:relative;overflow:hidden}
.coop-card:hover{border-color:#3b82f6;transform:translateY(-4px);box-shadow:0 12px 40px rgba(59,130,246,0.15)}
.coop-card .card-icon{font-size:2.2rem;margin-bottom:12px}
.coop-card h3{font-size:1.15rem;color:#fff;margin-bottom:10px;font-weight:700}
.coop-card p{color:#94a3b8;font-size:0.88rem;line-height:1.7;margin-bottom:16px}
.coop-card ul{list-style:none;padding:0}
.coop-card li{padding:6px 0;font-size:0.85rem;color:#cbd5e1;display:flex;align-items:center;gap:8px}
.coop-card li::before{content:'';width:5px;height:5px;border-radius:50%;background:#3b82f6;flex-shrink:0}
.coop-card .badge{display:inline-block;background:rgba(59,130,246,0.15);color:#60a5fa;font-size:0.72rem;padding:3px 10px;border-radius:50px;margin-bottom:12px}
/* Model list */
.model-list{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px;margin-top:20px}
.model-item{background:#0f1623;border:1px solid rgba(59,130,246,0.15);border-radius:12px;padding:16px;text-align:center;transition:all .3s}
.model-item:hover{border-color:#3b82f6;transform:translateY(-2px)}
.model-item .m-icon{font-size:1.5rem;margin-bottom:6px}
.model-item .m-name{font-size:0.88rem;color:#fff;font-weight:600}
.model-item .m-desc{font-size:0.75rem;color:#64748b;margin-top:4px}
/* Process */
.process{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:16px;margin-top:20px}
.process-step{background:#111827;border:1px solid #1e293b;border-radius:12px;padding:24px 16px;text-align:center;position:relative}
.process-step .step-num{font-size:0.7rem;color:#3b82f6;background:rgba(59,130,246,0.15);padding:2px 10px;border-radius:50px;margin-bottom:12px;display:inline-block}
.process-step h4{font-size:0.95rem;color:#fff;margin-bottom:6px}
.process-step p{font-size:0.82rem;color:#94a3b8}
/* CTA */
.cta{text-align:center;padding:60px 20px;background:linear-gradient(180deg,transparent,rgba(59,130,246,0.05))}
.cta h2{font-size:1.8rem;color:#fff;margin-bottom:12px}
.cta p{color:#94a3b8;margin-bottom:24px}
.cta .btn-cta{display:inline-flex;align-items:center;gap:8px;background:linear-gradient(135deg,#3b82f6,#8b5cf6);color:#fff;padding:14px 32px;border-radius:12px;text-decoration:none;font-size:1rem;font-weight:600;transition:all .3s}
.cta .btn-cta:hover{transform:translateY(-2px);box-shadow:0 8px 30px rgba(59,130,246,0.3)}
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
<li><a href="/cooperation/" class="active">商务合作</a></li>
<li><a href="/contact/">联系我们</a></li>
</ul>
</nav>
</header>
<div style="height:60px"></div>

<div class="coop-hero">
<div class="hero-badge"><span class="dot"></span> 合作招募中</div>
<h1>携手共赢 <span>AI 新赛道</span></h1>
<p>与 OpenClaw Hermes Codex 深度合作，共享 AI 自动化万亿市场机遇。多种合作模式，总有一款适合你。</p>
<div class="hero-stats">
<div class="hero-stat"><div class="num">50+</div><div class="label">合作伙伴</div></div>
<div class="hero-stat"><div class="num">10000+</div><div class="label">服务用户</div></div>
<div class="hero-stat"><div class="num">98%</div><div class="label">满意度</div></div>
</div>
</div>

<div class="container">
<div class="section-title">
<h2>合作模式</h2>
<p>灵活多样的合作方式，满足不同角色的商业需求</p>
</div>
<div class="cards-grid">
<div class="coop-card">
<div class="card-icon">🔑</div>
<span class="badge">推荐</span>
<h3>Token 代理</h3>
<p>批量采购 Token，享受阶梯折扣价格，面向终端用户销售或自用。</p>
<ul>
<li>阶梯折扣：量越大价越优</li>
<li>独立管理后台</li>
<li>7×24 技术支持</li>
<li>灵活的结算周期</li>
</ul>
</div>
<div class="coop-card">
<div class="card-icon">🏪</div>
<span class="badge">热门</span>
<h3>代理分销</h3>
<p>成为区域或行业独家代理，享受丰厚分润，零门槛快速启动。</p>
<ul>
<li>区域/行业独家代理权</li>
<li>高达 40% 分润比例</li>
<li>营销物料全方位支持</li>
<li>定期培训与赋能</li>
</ul>
</div>
<div class="coop-card">
<div class="card-icon">⚙️</div>
<span class="badge">专业</span>
<h3>技术合作</h3>
<p>深度技术对接，联合开发定制化 AI 解决方案，共同服务大型客户。</p>
<ul>
<li>API 深度集成支持</li>
<li>定制化部署方案</li>
<li>联合技术方案设计</li>
<li>专属技术对接团队</li>
</ul>
</div>
<div class="coop-card">
<div class="card-icon">🎯</div>
<span class="badge">灵活</span>
<h3>内容合作</h3>
<p>如果你擅长内容创作、技术博客或社群运营，欢迎以内容合作方式加入。</p>
<ul>
<li>优质内容联合发布</li>
<li>社群运营支持</li>
<li>流量互换与推广</li>
<li>品牌联名活动</li>
</ul>
</div>
</div>

<div class="section-title">
<h2>支持模型</h2>
<p>OpenClaw Hermes Codex 支持以下主流 AI 模型</p>
</div>
<div class="model-list">
<div class="model-item"><div class="m-icon">🧠</div><div class="m-name">DeepSeek</div><div class="m-desc">国产高性能推理模型</div></div>
<div class="model-item"><div class="m-icon">🔮</div><div class="m-name">GLM / ChatGLM</div><div class="m-desc">智谱 AI 通用大模型</div></div>
<div class="model-item"><div class="m-icon">✨</div><div class="m-name">Claude</div><div class="m-desc">Anthropic 对话模型</div></div>
<div class="model-item"><div class="m-icon">🚀</div><div class="m-name">GPT-4o</div><div class="m-desc">OpenAI 旗舰模型</div></div>
<div class="model-item"><div class="m-icon">🌐</div><div class="m-name">通义千问</div><div class="m-desc">阿里云大语言模型</div></div>
<div class="model-item"><div class="m-icon">🐂</div><div class="m-name">豆包</div><div class="m-desc">字节跳动 AI 助手</div></div>
</div>

<div class="section-title">
<h2>合作流程</h2>
<p>简单四步，快速开启合作之旅</p>
</div>
<div class="process">
<div class="process-step">
<div class="step-num">Step 1</div>
<h4>咨询对接</h4>
<p>联系商务微信，了解合作详情与政策</p>
</div>
<div class="process-step">
<div class="step-num">Step 2</div>
<h4>方案定制</h4>
<p>根据需求量身定制合作方案与定价</p>
</div>
<div class="process-step">
<div class="step-num">Step 3</div>
<h4>签约启动</h4>
<p>签订合作协议，开通专属权限</p>
</div>
<div class="process-step">
<div class="step-num">Step 4</div>
<h4>持续运营</h4>
<p>提供全程技术支持与运营指导</p>
</div>
</div>
</div>

<div class="cta">
<h2>开启合作之旅</h2>
<p>立即联系我们，了解最适合你的合作模式</p>
<a href="/contact/" class="btn-cta">💬 联系我们</a>
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

fs.writeFileSync(path.join(dir, 'cooperation', 'index.html'), cooperationHtml, 'utf8');
console.log('cooperation/index.html written: ' + cooperationHtml.length + ' chars');