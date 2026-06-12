========================================
SKILLAI.TOP - 工作记忆（自动继承）
========================================

【代理配置】
- Clash Verge 路径: D:\常用软件\灵魂云\Clash Verge\clash-verge.exe
- 桌面快捷方式: C:\Users\Public\Desktop\Clash Verge.lnk
- 代理地址: http://127.0.0.1:7897
- 启动后需等待约 10-12s 代理就绪
- Git push 需要用: git -c http.proxy="http://127.0.0.1:7897" -c https.proxy="http://127.0.0.1:7897" push origin master

【工作流：代理不可用时的处理】
当需要访问 GitHub/Vercel/deploy 但连接失败时：
1. 启动 Clash Verge: Start-Process "D:\常用软件\灵魂云\Clash Verge\clash-verge.exe"
2. 等待 12 秒
3. 所有 git/vercel 命令加 -c http.proxy="http://127.0.0.1:7897" 参数

【项目信息】
- 工作目录: D:\skillai.top网站
- Dist 目录: D:\skillai.top网站\dist
- GitHub: https://github.com/fast1188/skillai-web.git
- Vercel: fast1188s-projects / openclaw-web
- Vercel Production: https://openclaw-web-ten.vercel.app
- Custom domain: skillai.top (Cloudflare DNS)

【已完成修复】
- P1: favicon/OG/sitemap/brand/security/301
- P2: robots.txt/security.txt/vercel.json headers
- PWA: manifest.json/sw.js 已创建并嵌入所有页面
- GitHub: commit + force push 完成 (cbaf5ab)
- Vercel: 已触发自动部署

【待完成】
- HSTS Preload: 部署稳定后提交 https://hstspreload.org/
- DNS: DNSSEC/SPF/DKIM/DMARC
- ICP备案等法律事项
