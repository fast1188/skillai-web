========================================
SKILLAI.TOP — 工作记忆（自动继承）
========================================

## 环境信息
- 工作目录：D:\skillai.top网站
- Dist 目录：D:\skillai.top网站\dist
- 备份目录：D:\skillai.top网站\dist_backup_good
- GitHub：https://github.com/fast1188/skillai-web.git
- Vercel：fast1188s-projects / openclaw-web（GitHub 自动部署）
- 域名：skillai.top（Cloudflare DNS CNAME → c7da9ced0b4689d3.vercel-dns-017.com）

## 代理配置
- Clash Verge 路径：D:\常用软件\灵魂云\Clash Verge\clash-verge.exe
- 桌面快捷方式：C:\Users\Public\Desktop\Clash Verge.lnk
- 代理地址：http://127.0.0.1:7897
- 启动等待：约 10-15 秒
- Git 推送：git -c http.proxy="http://127.0.0.1:7897" -c https.proxy="http://127.0.0.1:7897" push origin master
- 注意：Clash Verge 需 GUI 加载订阅配置后代理端口才会监听

## Cloudflare 访问授权
- Dashboard：https://dash.cloudflare.com/
- Account ID：78d7b9df6089db65652c2c4344daca4e
- 域名：skillai.top
- 已授权自动操作 DNS 记录（无需再询问用户）

## 会话历史

### 会话 1（2026-06-12 上午）
- Phase 1 修复：favicon / OG 图 / sitemap / 品牌名 / 安全头 / 301
- PWA：manifest.json + sw.js 创建并嵌入所有页面
- GitHub 推送（cbaf5ab）

### 会话 2（2026-06-12 当前会话）
- 修复 OG 图片标签（19 个 HTML 文件添加 og:image）
- 重构 sitemap（26 条无重复，中文正确编码）
- 供应链加固（替换第三方 curl|bash，创建自托管 install.sh）
- 品牌引用清理（clawhub.ai → skillai.top，clawhub install → skillai install）
- 修复 manifest.json 编码
- HSTS Preload 提交成功（Pending inclusion）
- Git 提交 76b0f56 → GitHub 推送成功

## 当前状态（2026-06-12 10:03）

### Known Issues
1. 网络：Clash Verge 进程运行中但端口 7897 未监听（需 GUI 加载订阅配置）
2. 部署：代码已推送到 GitHub（76b0f56），但无法网络验证部署状态
3. Vercel 项目：之前显示 "no projects found"（需确认自动部署是否触发）

### 待完成列表
- [ ] 网络恢复后验证部署（curl 检查所有资源 200）
- [ ] HSTS Preload 几周后检查是否已预加载
- [ ] DNS 优化（DNSSEC/SPF/DKIM/DMARC 可选）
- [ ] ICP 备案（用户自行处理）

## 验证命令（网络恢复后执行）
```powershell
curl.exe -x http://127.0.0.1:7897 -s -o NUL -w "HTTP %{http_code}" https://skillai.top/
curl.exe -x http://127.0.0.1:7897 -s -o NUL -w "HTTP %{http_code}" https://skillai.top/favicon.ico
curl.exe -x http://127.0.0.1:7897 -s -o NUL -w "HTTP %{http_code}" https://skillai.top/opengraph-image.png
curl.exe -x http://127.0.0.1:7897 -s -o NUL -w "HTTP %{http_code}" https://skillai.top/sitemap.xml
```

## Git 日志
```
76b0f56 Fix: OG image tags, sitemap cleanup, supply chain hardening, install.sh
cfaf060 Deploy to dist project with skillai.top domain
cf4e769 Fix: copy vercel.json to root for Vercel config
cbaf5ab Phase 1 complete: icons, sitemap, brand fix, security, PWA manifest+SW
f8be82a Phase 1: favicon/icons/og-image/sitemap/brand fix + security headers
```
