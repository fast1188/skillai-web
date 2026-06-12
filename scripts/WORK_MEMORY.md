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
当检测到代理不可用时（Git/Vercel/curl 等连接失败），自动执行：
1. 启动 Clash Verge: Start-Process "D:\常用软件\灵魂云\Clash Verge\clash-verge.exe"
2. 等待 12 秒
3. 所有 git/vercel 命令加 -c http.proxy="http://127.0.0.1:7897" 参数
4. 此流程已写入记忆，无需再询问用户

【项目信息】
- 工作目录: D:\skillai.top网站
- Dist 目录: D:\skillai.top网站\dist
- GitHub: https://github.com/fast1188/skillai-web.git
- Vercel: fast1188s-projects / openclaw-web
- Vercel Production: https://openclaw-web-ten.vercel.app
- Custom domain: skillai.top (Cloudflare DNS)

【Cloudflare 访问授权】（已授权自动执行）
- Dashboard: https://dash.cloudflare.com/
- Account ID: 78d7b9df6089db65652c2c4344daca4e
- 域名: skillai.top
- 已授权自动登录和操作 DNS 记录
- 无需再询问用户

【已完成修复】
- P1: favicon/OG/sitemap/brand/security/301
- P2: robots.txt/security.txt/vercel.json headers
- PWA: manifest.json/sw.js 已创建并嵌入所有页面
- GitHub: commit + force push 完成 (cfaf060)
- Vercel: 已触发自动部署，域名 skillai.top 指向 vercel
- DNS: Cloudflare CNAME -> c7da9ced0b4689d3.vercel-dns-017.com
- HSTS 头: Strict-Transport-Security: max-age=63072000; includeSubDomains; preload ✅

【HSTS Preload 状态】（2026-06-12）
- 已在 https://hstspreload.org/ 提交 skillai.top
- 检查状态: Eligible（符合资格，无错误/警告）
- 提交结果: "Pending inclusion in the HSTS preload list"
- 浏览器当前在 hstspreload.org 的提交成功页面
- 等待 Chromium 下次更新（约几周）才会正式生效

【待完成】
- DNS: DNSSEC/SPF/DKIM/DMARC（可选优化）
- ICP备案等法律事项（用户自己处理）
- 几周后回 hstspreload.org 检查是否已预加载
