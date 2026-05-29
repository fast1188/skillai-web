import sys
sys.stdout.reconfigure(encoding='utf-8')
cur = open("D:/Codex Main总指挥/网站管家/dist/index.html","r",encoding="utf-8").read()

import re
classes = set()
for m in re.finditer(r'class="([^"]+)"', cur):
    for c in m.group(1).split():
        classes.add(c)

for c in sorted(classes):
    if any(x in c for x in ["hero","section","use","feature","step","ai","mid-cta","download","footer","header","nav","scenario","proof","faq","cta","screenshot","blog","contact"]):
        print(c)
