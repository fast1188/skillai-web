# SkillAI.top AGENTS.md — 全局指令（自动读取）

## 自动执行规则

### 每次新建会话必须执行
1. 首先读取 .codex/memory.md 了解完整项目状态
2. 读取 scripts/WORK_MEMORY.md 了解详细操作记录
3. 如任务涉及网络访问且失败，自动启动 Clash Verge 代理：
   - 路径：D:\常用软件\灵魂云\Clash Verge\clash-verge.exe
   - 或桌面快捷方式：C:\Users\Public\Desktop\Clash Verge.lnk
   - 等待 12-15 秒
4. Git 操作必须带代理参数：
   - `git -c http.proxy="http://127.0.0.1:7897" -c https.proxy="http://127.0.0.1:7897"`

### 记忆保存规则
- 每次会话结束时更新 scripts/WORK_MEMORY.md
- 关键节点同步更新 .codex/memory.md
- 保持两份文件一致

### 代码规范
- 工作目录：D:\skillai.top网站
- 所有修改在 dist/ 目录中进行
- 修改后执行：`git add -A && git commit -m "描述"`
- 推送：`git -c http.proxy="http://127.0.0.1:7897" -c https.proxy="http://127.0.0.1:7897" push origin master`
- Vercel 自动从 GitHub 部署

### 部署配置
- vercel.json 在项目根目录
- outputDirectory: "dist"
- 项目名称：openclaw-web
- 自定义域名：skillai.top（Cloudflare CNAME → vercel-dns-017.com）
