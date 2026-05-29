import re
with open(r"D:\Codex Main总指挥\网站管家\dist\index.html", "r", encoding="utf-8") as f:
    html = f.read()

# 1. Replace brand name
html = html.replace("SkillAI部署助手", "openclaw hermes 小龙虾 爱马仕远程安装部署")
html = html.replace('"brand":"SkillAI部署助手"', '"brand":"openclaw hermes 小龙虾 爱马仕远程安装部署"')
print("Brand replaced")

# 2. Fix broken image in nav-brand
# Find nav-brand area
nav_match = re.search(r'<a class="nav-brand"[^>]*>(.*?)</a>', html)
if nav_match:
    nav_content = nav_match.group(0)
    print(f"\nNav brand current: {nav_content[:200]}")
    
    # Replace broken img + text with clean logo
    new_nav = '<a class="nav-brand" href="/"><img alt="openclaw hermes" src="/assets/logo-192.png" width="40" height="40" style="border-radius:10px"><span style="margin-left:8px;font-weight:700;color:#f1f5f9;font-size:0.95rem">openclaw hermes</span></a>'
    html = html.replace(nav_match.group(0), new_nav)
    print("Nav brand fixed")

# 3. Also check for any other logo img in the header
logo_imgs = re.findall(r'<img[^>]*logo[^>]*>', html, re.IGNORECASE)
print(f"\nLogo images found: {len(logo_imgs)}")
for img in logo_imgs:
    print(f"  {img[:100]}")

# 4. Clean up any broken/empty img tags
html = re.sub(r'<img[^>]*src=""[^>]*>', '', html)

with open(r"D:\Codex Main总指挥\网站管家\dist\index.html", "w", encoding="utf-8") as f:
    f.write(html)
print("\nSaved")
