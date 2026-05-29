import sys, re
sys.stdout.reconfigure(encoding="utf-8")

cur = open("D:/Codex Main总指挥/网站管家/dist/index.html","r",encoding="utf-8").read()

# Show all body{ CSS rules with their positions
for m in re.finditer(r'body\{[^}]*\}', cur):
    print(f"Pos {m.start()}: {m.group()[:120]}")
