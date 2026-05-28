# DEPLOY.md — SkillAI 网站部署清单
# 目标域名: skillai.top

---

## 上线前必做

### 1. 替换真实二维码
- 路径: `dist/assets/qrcode-our.png`
- 当前: 占位图片 (200x200 蓝色背景)
- 替换为: 微信 KAKA12512535 的真实二维码

### 2. 替换真实安装包
- 路径: `dist/downloads/openclaw-setup.exe`
- 当前: 0KB 占位文件
- 替换为: 审核后的真实 OpenClaw 安装包

### 3. 部署到服务器
将 `dist/` 目录内所有文件上传至 skillai.top 服务器根目录。

#### Vercel 部署 (推荐):
```bash
cd dist
vercel --prod
```

#### 手动部署:
```bash
# 使用 Vercel CLI
cd dist
vercel deploy --prod
```

---

## 注意事项
- 原站使用 Next.js SSR，静态克隆后 JS 水合可能导致显示差异
- 如页面异常，可移除 index.html 中的 Next.js <script> 标签
- CSS 动画和样式完全保留
- 所有品牌文字已替换为 SkillAI

---

## 目录结构
```
dist/
├── index.html              # 主页 (已替换)
├── _next/                  # Next.js 静态资源
│   ├── static/
│   │   ├── chunks/         # JS/CSS chunks
│   │   └── media/          # 字体文件
│   └── image               # 图片资源
├── assets/
│   └── qrcode-our.png      # ⚠️ 需替换为真实二维码
├── downloads/
│   └── openclaw-setup.exe  # ⚠️ 需替换为真实安装包
├── hm.gif                  # 百度统计
└── hm.js                   # 百度统计
```
