# SkillAI.top - 全局记忆系统（顶级指令）

## 项目概览
- **项目**：skillai.top 静态站点（Vercel 部署）
- **源码**：D:\skillai.top网站
- **Dist 目录**：D:\skillai.top网站\dist
- **GitHub**：https://github.com/fast1188/skillai-web.git（账号 fast1188）
- **Vercel**：fast1188s-projects / openclaw-web（已绑定 GitHub 自动部署）
- **自定义域名**：skillai.top（Cloudflare DNS）
- **备份**：dist_backup_good/（含可用的 vercel.json）

## 代理配置（自动执行流程）
- **Clash Verge 路径**：D:\常用软件\灵魂云\Clash Verge\clash-verge.exe
- **桌面快捷方式**：C:\Users\Public\Desktop\Clash Verge.lnk
- **代理地址**：http://127.0.0.1:7897
- **启动后等待**：约 10-15 秒代理就绪
- **Git 推送命令**：git -c http.proxy="http://127.0.0.1:7897" -c https.proxy="http://127.0.0.1:7897" push origin master
- **注意事项**：Clash Verge GUI 启动后需要确保订阅配置已加载，代理端口才会监听

## 已完成工作

### Phase 1 - 紧急修复 ✅
- 图标资源：favicon.ico / apple-touch-icon.png / favicon-192.png / favicon-512.png
- OG 社交分享图：opengraph-image.png（1200×630）
- Sitemap 重写：26 条真实 URL，无重复/无双重编码
- 品牌统一：OpenClaw → SkillAI（页面文本），clawhub install → skillai install
- 供应链加固：所有 curl|bash 改为指向 skillai.top/downloads/install.sh
- PWA：manifest.json + sw.js（嵌入所有页面）
- 安全头：Strict-Transport-Security / X-Frame-Options 等（vercel.json）
- 301 重定向：.html → 目录格式

### HSTS Preload ✅
- 2026-06-12 提交 skillai.top 到 https://hstspreload.org/
- 检查状态：Eligible（无错误/无警告）
- 提交结果：Pending inclusion（等待 Chromium 更新）

### 最新提交（76b0f56）
- OG 图片标签修复（19 个文件）
- Sitemap 重构（26 条无重复）
- 供应链加固（install.sh 自托管）
- 品牌引用清理（skills/index 页面）

## 待完成
1. **Vercel 部署验证** — 需要确认新部署是否上线（网络限制目前无法 curl 验证）
2. **DNS 可选项** — DNSSEC/SPF/DKIM/DMARC 配置
3. **ICP 备案** — 用户自己处理

## 工作记忆位置
- 完整工作记忆：scripts/WORK_MEMORY.md（含所有历史操作记录）
- 本文件：.codex/memory.md（跨会话自动读取的顶层记忆）
- AGENTS.md：项目根目录（Codex CLI 自动读取的指令文件）

## 修复验证清单
当网络恢复时执行：
1. `curl https://skillai.top/favicon.ico` → 200
2. `curl https://skillai.top/opengraph-image.png` → 200
3. `curl https://skillai.top/sitemap.xml` → 200，仅含真实 URL
4. `curl https://skillai.top/` → 200，查看页面内容
5. 全站搜索 "OpenClaw"（非图片文件名）→ 0 次出现
6. 检查 Strict-Transport-Security 响应头
