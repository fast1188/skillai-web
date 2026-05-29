import sys, re
sys.stdout.reconfigure(encoding="utf-8")

cur = open("D:/Codex Main总指挥/网站管家/dist/index.html","r",encoding="utf-8").read()

# Create a nice inline SVG logo (blue rounded square with "S" like the original)
svg_logo = '<svg width="40" height="40" viewBox="0 0 40 40" style="border-radius:10px;flex-shrink:0"><rect width="40" height="40" rx="10" fill="#3b82f6"/><text x="20" y="26" text-anchor="middle" fill="white" font-size="22" font-weight="bold" font-family="Arial,sans-serif">S</text></svg>'

# Replace the nav-brand img tag with inline SVG
# Current: <img alt="openclaw hermes" src="assets/logo-192.png" width="40" height="40" style="border-radius:10px">
pattern = r'<img[^>]*alt="openclaw hermes"[^>]*>'

def replace_logo(match):
    return svg_logo

cur_fixed = re.sub(pattern, replace_logo, cur, count=1)

# Check if replaced
old_count = cur.count('<img alt="openclaw hermes"')
new_count = cur_fixed.count('<img alt="openclaw hermes"')
print(f"Logo img tags: {old_count} -> {new_count}")

open("D:/Codex Main总指挥/网站管家/dist/index.html","w",encoding="utf-8").write(cur_fixed)
print("Saved!")
