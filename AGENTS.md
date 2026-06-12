# SkillAI.top AGENTS.md — 全局指令（自动读取）

## 新会话启动流程
1. 读取 .codex/memory.md 了解完整项目状态
2. 读取 scripts/WORK_MEMORY.md 了解详细操作记录
3. 如需网络操作，自动启动代理：
   - C:\Users\Public\Desktop\Clash Verge.lnk
   - 等待 12-15 秒
4. Git 推送必须带代理：
   `git -c http.proxy="http://127.0.0.1:7897" -c https.proxy="http://127.0.0.1:7897" push origin master`
5. Vercel 部署（在 dist 目录）：
   `cmd /c "C:\Users\Administrator\AppData\Roaming\npm\vercel deploy --prod --scope fast1188s-projects"`

## 代码规范
- 工作目录：D:\skillai.top网站
- 所有修改在 dist/ 目录中进行
- 修改后提交：`git add -A && git commit -m "描述"`
- 推送前确认代理已启动

## 关键约定
- **绝不动 api.skillai.top**（Token 中转站，与 Vercel 无关）
- 每次会话结束时更新 WORK_MEMORY.md
- 保持 AGENTS.md / .codex/memory.md / WORK_MEMORY.md 三份文件同步

## 目录结构
- dist/ — 发布目录（直接部署到 Vercel）
- scripts/ — 辅助脚本
- downloads/ — install.sh 等资源
- dist_backup_good/ — 备份
- original_site/ — 原始站点源码
