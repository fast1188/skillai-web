import sys, re
sys.stdout.reconfigure(encoding='utf-8')

cur = open("D:/Codex Main总指挥/网站管家/dist/index.html","r",encoding="utf-8").read()

def add_visible(match):
    content = match.group(0)
    if "visible" not in content:
        content = content.replace("fade-up", "fade-up visible", 1)
    return content

cur_fixed = re.sub(r'class="([^"]*fade-up[^"]*)"', add_visible, cur)
cur_fixed = re.sub(r"class='([^']*fade-up[^']*)'", add_visible, cur_fixed)

old_count = cur.count("fade-up")
new_count = cur_fixed.count("fade-up")
old_visible = cur.count("fade-up visible")
new_visible = cur_fixed.count("fade-up visible")

print(f"fade-up total: {old_count} -> {new_count}")
print(f"fade-up visible: {old_visible} -> {new_visible}")

open("D:/Codex Main总指挥/网站管家/dist/index.html","w",encoding="utf-8").write(cur_fixed)
print("Saved!")
