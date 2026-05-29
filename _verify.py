import sys
sys.stdout.reconfigure(encoding="utf-8")

cur = open("D:/Codex Main总指挥/网站管家/dist/index.html","r",encoding="utf-8").read()

print("=== 文件状态检查 ===")
print(f"文件大小: {len(cur)} bytes")

# 1. Logo check
has_svg_logo = '<svg width="40" height="40" viewBox="0 0 40 40"' in cur
has_img_logo = '<img alt="openclaw hermes"' in cur
print(f"Logo: SVG内联={'OK' if has_svg_logo else 'NO'} 图片引用={'WARN' if has_img_logo else 'OK'}")

# 2. Path check
has_abs = '/assets/' in cur or '/downloads/' in cur
print(f"路径: 相对路径={'OK' if not has_abs else '有绝对路径残留'}")

# 3. Fade-up visibility
fade_visible = cur.count("fade-up visible")
fade_total = cur.count("fade-up")
print(f"Fade-up可见性: {fade_visible}/{fade_total} 已加visible类")

# 4. Body CSS check (no max-height limit)
has_body_limit = "max-height:360px" in cur
print(f"Body高度限制: {'WARN - 有max-height:360px残留' if has_body_limit else 'OK'}")

# 5. Brand text
brand_text = "margin-left:8px" in cur[:cur.find("</header>")]
print(f"Brand内联样式: {'WARN - 有margin-left残留' if brand_text else 'OK - 已清理'}")

# 6. Nav-brand CSS
nav_css = ".nav-brand svg" in cur
print(f"SVG CSS支持: {'OK' if nav_css else 'MISSING'}")
