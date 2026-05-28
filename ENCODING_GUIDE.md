# ENCODING_GUIDE.md — SkillAI 网站防乱码规范
# 生成: 2026-05-29

---

## 1. 文件编码铁律
- 所有 HTML/CSS/JS 文件必须使用 **UTF-8 无 BOM** 格式
- 禁止用 PowerShell `Get-Content` + `Set-Content` 处理中文文件
- 文本替换用 Python: `open(file, 'r', encoding='utf-8')` / `open(file, 'w', encoding='utf-8')`
- 或 Node.js: `fs.readFileSync(file, 'utf8')` / `fs.writeFileSync(file, content, 'utf8')`

## 2. HTML 头部配置
```html
<meta charset="UTF-8">
<style>
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, "Noto Sans", "PingFang SC",
    "Microsoft YaHei", sans-serif;
}
</style>
```

## 3. 禁止事项
- 禁止引入第三方 SVG 字体文件做反爬映射
- 禁止用 `document.write` 输出中文
- 禁止 Unicode 转义 (`\uXXXX`) 代替真实中文
- 禁止从不明来源下载 .woff/.ttf 字体

## 4. 服务器配置
### Nginx
```nginx
charset utf-8;
```
### Apache
```apache
AddDefaultCharset UTF-8
```
### Vercel
在 `vercel.json` 添加:
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "Content-Type", "value": "text/html; charset=utf-8" }
      ]
    }
  ]
}
```

## 5. 验证清单
- [ ] `index.html` 无 鐟澶閿鏍 等生僻字
- [ ] 导航/按钮/标题 均为可读中文
- [ ] `<meta charset="UTF-8">` 存在
- [ ] 无 `document.write` 输出中文
- [ ] 无 `\uXXXX` 转义字符

## 6. 本项目已修复记录
- 2026-05-29: PowerShell 替换导致全站 UTF-8 乱码 → 改用 Python 重新处理
- 2026-05-29: 添加 body font-family 系统字体栈
- 2026-05-29: 移除 Next.js 水合脚本，解决 client-side exception
- 2026-05-29: 移除死链 962d.css
- 2026-05-29: 替换品牌: OpenClaw → SkillAI, 800177160 → 164223412
