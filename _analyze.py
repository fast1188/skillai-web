import re
ref = open("C:/Users/Administrator/Desktop/首页.html","r",encoding="utf-8").read()
cur = open("D:/Codex Main总指挥/网站管家/dist/index.html","r",encoding="utf-8").read()

# Find hero CSS in reference
hstart = ref.find(".hero{")
hend = ref.find("}", hstart) + 1
print("=== Reference .hero CSS ===")
print(ref[hstart:hend])
print()

if ".hero{" in cur:
    s = cur.find(".hero{")
    e = cur.find("}", s) + 1
    print("=== Current .hero CSS ===")
    print(cur[s:e])
else:
    print("CURRENT FILE IS MISSING .hero{ CSS!")
print()

# Check key hero classes
for cls in [".hero-grid",".hero-particles",".hero-inner",".hero-content",".hero-badge",".hero-buttons",".hero-visual",".hero-terminal",".hero-orb"]:
    if cls in ref:
        idx = ref.find(cls)
        print(f"Ref HAS {cls} at pos {idx}")
    else:
        print(f"Ref does NOT have {cls}")

print()
for cls in [".hero-grid",".hero-particles",".hero-inner",".hero-content",".hero-badge",".hero-buttons",".hero-visual",".hero-terminal",".hero-orb"]:
    if cls in cur:
        print(f"Cur HAS {cls}")
    else:
        print(f"Cur does NOT have {cls}")
