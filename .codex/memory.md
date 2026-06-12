# SkillAI.top - 全局记忆系统（顶级指令）
# 每次新会话先从本文件读取完整上下文

## 项目概览
- **项目**：skillai.top 静态站点（Vercel 部署）
- **源码**：D:\skillai.top网站
- **Dist 目录**：D:\skillai.top网站\dist
- **GitHub**：https://github.com/fast1188/skillai-web.git
- **Vercel 项目**：fast1188s-projects / dist（projectId: prj_yIu5NlAFmcB4QmoYCbFgNKKhRPwL）
- **自定义域名**：skillai.top（Cloudflare DNS）
- **API 中转站**：api.skillai.top（独立，不归 Vercel 管，勿碰）

## 代理配置（自动执行）
- Clash Verge：D:\常用软件\灵魂云\Clash Verge\clash-verge.exe
- 桌面快捷方式：C:\Users\Public\Desktop\Clash Verge.lnk
- 代理地址：http://127.0.0.1:7897
- Git 推送：git -c http.proxy="http://127.0.0.1:7897" -c https.proxy="http://127.0.0.1:7897" push origin master
- Vercel 部署：cmd /c "C:\Users\Administrator\AppData\Roaming\npm\vercel deploy --prod --scope fast1188s-projects"（需在 dist 目录执行）

## 已完成工作

### Phase 1 修复 ✅
- favicon.ico / apple-touch-icon.png / favicon-192.png / favicon-512.png
- opengraph-image.png（1200×630，社交分享图）
- Sitemap 重构（26 条真实 URL，无双重编码，无重复）
- 品牌统一：OpenClaw → SkillAI，clawhub install → skillai install
- 供应链加固：curl|bash 全部指向 skillai.top/downloads/install.sh
- PWA：manifest.json + sw.js 嵌入所有 32 个页面
- 安全头：HSTS / X-Frame-Options / Referrer-Policy 等（vercel.json）
- 301 重定向：.html → 目录格式

### 本次会话（2026-06-12）完成 ✅
- OG 图片标签修复：19 个 HTML 文件添加 og:image
- Sitemap 重构：26 条无重复，中文正确编码
- 品牌引用清理：skills/index 页面 clawhub 引用
- 供应链加固：创建自托管 install.sh
- manifest.json 编码修复
- HSTS Preload 提交：https://hstspreload.org/ → Pending inclusion
- 记忆体系建立：AGENTS.md + .codex/memory.md + WORK_MEMORY.md
- **站点恢复**：skillai.top 别名重新指向可用部署，现已 HTTP 200

## 当前状态（2026-06-12）

### 线上状态 ✅
- skillai.top → HTTP 200（部署：dist-b2ijet7a2-fast1188s-projects.vercel.app）
- favicon.ico → 200
- opengraph-image.png → 200
- sitemap.xml → 200
- manifest.json → 200
- sw.js → 200
- apple-touch-icon.png → 200
- robots.txt → 200
- all pages → 200
- 安全头全部就位（HSTS preload / X-Frame-Options 等）

### 待完成
- [ ] **最新代码部署**：当前线上用的是旧部署（dist-b2ijet7a2），最新修复的 OG/sitemap/品牌内容未上线
  - 方法：cd dist → cmd /c "C:\Users\Administrator\AppData\Roaming\npm\vercel deploy --prod --scope fast1188s-projects"
  - 注意：命令约需 2 分钟，之前测试中超时，可能需要更长等待
- [ ] HSTS Preload 几周后检查是否已预加载
- [ ] DNS 优化（DNSSEC/SPF/DKIM/DMARC 可选）
- [ ] ICP 备案（用户自行处理）

## Git 日志
```
f6b3d46 Memory: AGENTS.md + .codex/memory.md + WORK_MEMORY.md
76b0f56 Fix: OG image tags, sitemap cleanup, supply chain hardening, install.sh
cfaf060 Deploy to dist project with skillai.top domain
cbaf5ab Phase 1 complete: icons, sitemap, brand fix, security, PWA
f8be82a Phase 1: favicon/icons/og-image/sitemap/brand fix + security headers
```

## 重要提醒
- **不要动 api.skillai.top** — 独立的 Token 中转站，不在 Vercel
- 部署超时（>2min）是已知问题，可以尝试：
  1. 先 vercel deploy（不 --prod）看是否更快
  2. 或直接从 GitHub 触发 CI 部署
- Clash Verge 代理启动后需在 GUI 中加载订阅配置，端口才能用
