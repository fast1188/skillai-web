# SkillAI 网站项目文档
# 部署地址: https://skillai.top
# GitHub: https://github.com/fast1188/skillai-web

---

## 项目信息
- 源站克隆: https://ai.160.com/
- 技术栈: Next.js SSR → 静态 HTML
- 部署: Vercel (fast1188s-projects)

## 替换内容
| 原文 | 替换 |
|------|------|
| ai.160.com | skillai.top |
| OpenClaw | SkillAI |
| QQ 800177160 | 164223412 |
| 电话 083227584094 | (移除) |

## 资源清单
| 文件 | 说明 |
|------|------|
| dist/index.html | 主页 (64KB, UTF-8) |
| dist/assets/qrcode-our.png | 微信二维码 |
| dist/assets/qq-group-qr.jpg | QQ群二维码 |
| dist/assets/logo-192.png | Logo |
| dist/downloads/SkillAI-setup.exe | 安装包 6.91MB |
| dist/_next/static/ | CSS/字体文件 |

## 联系方式
- QQ客服: 164223412
- QQ群: 482123078 (SkillAI 一站式 Token 官方服务群)
- QQ群二维码: /assets/qq-group-qr.jpg

## 关键修复历史
1. Section 标签粘连 → 分批修复
2. Next.js 水合 client-side error → 移除 turbopack 脚本
3. UTF-8 乱码 → Python 重处理
4. skillai.top 域名绑定 → Vercel alias
5. 962d.css 死链 → 移除
6. body font-family → 添加系统字体栈

## 操作陷阱
- 绝对不要用 PowerShell 处理中文 HTML
- Vercel 部署后必须 re-alias skillai.top 域名
- 网络不通时先启动 v2rayN: `C:\Users\Administrator\Desktop\v2rayN.lnk`
- 每次 push 后必须全量验证
