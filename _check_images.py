import sys, re
sys.stdout.reconfigure(encoding="utf-8")

cur = open("D:/Codex Main总指挥/网站管家/dist/index.html","r",encoding="utf-8").read()

# Find all img tags
for m in re.finditer(r"<img[^>]*src=\"([^\"]+)\"[^>]*>", cur):
    src = m.group(1)
    alt_m = re.search(r"alt=\"([^\"]*)\"", m.group(0))
    alt = alt_m.group(1) if alt_m else "(no alt)"
    print(f"  src={src}  alt={alt}")
