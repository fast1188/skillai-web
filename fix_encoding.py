import re
import os

dist_dir = r"D:\Codex Main总指挥\网站管家\dist"
orig_file = r"D:\Codex Main总指挥\网站管家\original_site\index.html"
dist_file = os.path.join(dist_dir, "index.html")

# 读取原始 HTML（正确编码）
with open(orig_file, "r", encoding="utf-8") as f:
    html = f.read()

print(f"原始: {len(html)} chars")
print(f"有正常中文: {'首页' in html or '首页' in html}")

# === 替换规则 ===
# 1. 电话
html = html.replace("083227584094", "")
# 2. QQ
html = re.sub(r"QQ[：:\s]*800177160", "微信 164223412", html)
html = html.replace("800177160", "164223412")
# 3. 域名
html = html.replace("ai.160.com", "skillai.top")
html = html.replace("ai.160", "skillai.top")
# 4. OpenClaw
html = html.replace("OpenClaw", "SkillAI")
html = html.replace("openclaw", "skillai")
html = html.replace("openClaw", "skillai")
# 5. 160.com
html = html.replace("160.com", "skillai.top")
# 6. Title
html = re.sub(r"<title>[^<]+</title>", "<title>SkillAI - 您的全能AI私人助理 | skillai.top</title>", html)
# 7. 下载链接
html = re.sub(r'https?://www\.160\.com/qddownload/[^"\\s]+', "/downloads/SkillAI-setup.exe", html)
html = re.sub(r'https?://ai\.160\.com/download[^"\\s]*', "/downloads/SkillAI-setup.exe", html)

# 8. 移除 Next.js 水合脚本
html = re.sub(r'<script[^>]*_next/static/chunks/[^>]*></script>', '', html)
html = re.sub(r'<script[^>]*turbopack[^>]*></script>', '', html)
html = re.sub(r'<script id="__NEXT_DATA__"[^>]*>.*?</script>', '', html, flags=re.DOTALL)

# 9. 移除 962d.css
html = re.sub(r'<link[^>]*962d\.css[^>]*>', '', html)

# 10. 修复 Next.js 图片
html = html.replace('style="color:transparent"', 'style=""')
html = re.sub(r'srcset="[^"]*_next/image\?url=[^"]*"', '', html)
html = re.sub(r'src="/_next/image\?url=[^"]*&amp;[^"]*"', '', html)

# 11. 添加 QQ 群二维码
html = html.replace(
    '<div class="footer-bottom">',
    '<div style="text-align:center;margin-bottom:20px"><img src="/assets/qq-group-qr.jpg" alt="QQ群二维码" style="width:120px;height:120px;border-radius:8px"><p style="color:#8899aa;font-size:0.78rem;margin-top:4px">扫码加入QQ群</p></div><div class="footer-bottom">'
)

# 12. 修复 footer_bottom 版权 JSON 数据
html = html.replace("深圳市驱动人生科技股份有限公司", "SkillAI")
html = html.replace("驱动人生", "SkillAI")

# 13. 品牌名替换（JSON 数据中）
html = html.replace("OpenClaw部署助手", "SkillAI")

# 验证
print(f"处理后: {len(html)} chars")
print(f"SkillAI: {'SkillAI' in html}")
print(f"164223412: {'164223412' in html}")
print(f"skillai.top: {'skillai.top' in html}")
print(f"无 ai.160: {'ai.160' not in html}")
print(f"无 turbopack: {'turbopack' not in html}")
print(f"qq-group-qr: {'qq-group-qr' in html}")

# 保存 - 确保 UTF-8 without BOM
with open(dist_file, "w", encoding="utf-8") as f:
    f.write(html)

# 验证保存后中文
with open(dist_file, "r", encoding="utf-8") as f:
    saved = f.read()
print(f"\n保存后验证:")
print(f"正常中文: {'首页' in saved or '首页' in saved or 'AI' in saved}")
print(f"无乱码鐟: {'鐟' not in saved}")
print(f"无乱码澶: {'澶' not in saved}")
print(f"无乱码閿: {'閿' not in saved}")
print("Done!")
