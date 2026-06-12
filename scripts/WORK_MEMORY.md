========================================
SKILLAI.TOP — 工作记忆（跨会话持久化）
========================================

## 环境信息
- 工作目录：D:\skillai.top网站
- Dist 目录：D:\skillai.top网站\dist
- 备份目录：D:\skillai.top网站\dist_backup_good
- GitHub：https://github.com/fast1188/skillai-web.git（fast1188 / bwin36588@gmail.com）
- Vercel 项目：fast1188s-projects / dist（projectId: prj_yIu5NlAFmcB4QmoYCbFgNKKhRPwL）
- 域名：skillai.top（Cloudflare DNS，NS: ajay.ns.cloudflare.com / nena.ns.cloudflare.com）
- API 中转站：api.skillai.top（独立，勿碰）

## 代理配置
- Clash Verge 路径：D:\常用软件\灵魂云\Clash Verge\clash-verge.exe
- 桌面快捷方式：C:\Users\Public\Desktop\Clash Verge.lnk
- 代理地址：http://127.0.0.1:7897
- Git 配置代理：http://127.0.0.1:10808（系统设置）
- 启动等待：约 10-15 秒
- 注意：Clash Verge 需 GUI 加载订阅配置后端口才会监听

## Cloudflare 访问授权（已授权，无需再问）
- Dashboard：https://dash.cloudflare.com/
- Account ID：78d7b9df6089db65652c2c4344daca4e
- 域名：skillai.top
- 已授权：自动登录和操作 DNS 记录

## 会话历史

### 会话 1（Phase 1，2026-06-12 上午）
- Phase 1 修复：favicon / OG 图 / sitemap / 品牌名 / 安全头 / 301 重定向
- PWA：manifest.json + sw.js 嵌入所有页面
- GitHub 推送（cbaf5ab）

### 会话 2（2026-06-12，核心修复）
- OG 图片标签：19 个 HTML 文件添加 og:image（博客 + 根页面）
- Sitemap 重构：26 条无重复，中文正确编码，无双重编码
- 供应链加固：替换第三方 curl|bash → skillai.top/downloads/install.sh
- 品牌引用清理：clawhub.ai → skillai.top，clawhub install → skillai install
- manifest.json 编码修复
- HSTS Preload 提交 → Pending inclusion
- 记忆体系建立（AGENTS.md / .codex/memory.md / WORK_MEMORY.md）
- Git：commit 76b0f56（修复）+ f6b3d46（记忆）
- 推送：已推送到 GitHub ✅

### 会话 2 后半段（网络恢复后）
- 发现 Vercel 项目正常（之前 "no projects found" 是 scope 问题）
- 发现 skillai.top 指向旧部署 dist-1mk3ga1pb（HTTP 404）
- 重新指向可用部署 dist-b2ijet7a2 → skillai.top 恢复 HTTP 200 ✅
- 确认 api.skillai.top 独立运行，不影响 ✅
- 尝试部署最新代码但超时（>2min），需下次继续

## 线上状态（当前）
```
skillai.top      → 200 ✅  Header: HSTS preload ✅
favicon.ico      → 200 ✅
opengraph-image  → 200 ✅
sitemap.xml      → 200 ✅
manifest.json    → 200 ✅
sw.js            → 200 ✅
apple-touch-icon → 200 ✅
robots.txt       → 200 ✅
about/           → 200 ✅
download/        → 200 ✅
blog/            → 200 ✅
```

## 待完成清单
1. **最新代码部署**：当前线上是旧部署，最新修复未上线
   - 命令：cmd /c "C:\Users\Administrator\AppData\Roaming\npm\vercel deploy --prod --scope fast1188s-projects"（在 dist 目录）
   - 预计耗时约 2 分钟
   - 备选：触发 GitHub Actions / 或缩短超时时间后重试
2. **HSTS Preload**：已提交，等待几周生效
3. **DNS 优化**：DNSSEC/SPF/DKIM/DMARC（可选）
4. **ICP 备案**：用户自行处理

## Git 日志
```
f6b3d46 Memory: AGENTS.md + .codex/memory.md + WORK_MEMORY.md
76b0f56 Fix: OG image tags, sitemap cleanup, supply chain hardening, install.sh
cfaf060 Deploy to dist project with skillai.top domain
cf4e769 Fix: copy vercel.json to root for Vercel config
cbaf5ab Phase 1 complete: icons, sitemap, brand fix, security, PWA
f8be82a Phase 1: favicon/icons/og-image/sitemap/brand fix + security headers
```

## 已知问题
1. Vercel 部署命令超时（>120s）— 可能是上传文件耗时，建议用更长 timeout 或分步执行
2. Node REPL 崩溃（CreateProcessAsUserW failed: 5）— 无法使用浏览器自动化
3. npx/npm 命令不可用（C:\Users\Administrator\AppData\Roaming\npm\node_modules 权限问题）
Vercel CLI 需用全路径：C:\Users\Administrator\AppData\Roaming\npm\vercel
