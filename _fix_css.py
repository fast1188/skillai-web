import sys
sys.stdout.reconfigure(encoding="utf-8")

cur = open("D:/Codex Main总指挥/网站管家/dist/index.html","r",encoding="utf-8").read()

# Add .nav-brand svg to the CSS alongside .nav-brand img
old = ".nav-brand img{flex-shrink:0;width:40px;height:40px}"
new = ".nav-brand img,.nav-brand svg{flex-shrink:0;width:40px;height:40px}"

if old in cur:
    cur = cur.replace(old, new, 1)
    print("Added .nav-brand svg to CSS")
else:
    print("WARNING: .nav-brand img CSS not found!")
    # Try to find similar
    idx = cur.find("nav-brand img")
    if idx > 0:
        print("Found at:", idx)

open("D:/Codex Main总指挥/网站管家/dist/index.html","w",encoding="utf-8").write(cur)
print("Saved!")
