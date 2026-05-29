import sys, re
sys.stdout.reconfigure(encoding="utf-8")

cur = open("D:/Codex Main总指挥/网站管家/dist/index.html","r",encoding="utf-8").read()

# Fix the nav-brand span: remove inline styles that conflict with nav-brand CSS
# Original: <span style="margin-left:8px;font-weight:700;color:#f1f5f9;font-size:0.95rem">openclaw hermes</span>
# Fix: remove inline styles, let nav-brand CSS handle positioning (gap:12px, font-weight:800, font-size:1.15rem, color:#0f172a)

old_span = '<span style="margin-left:8px;font-weight:700;color:#f1f5f9;font-size:0.95rem">openclaw hermes</span>'
new_span = '<span>openclaw hermes</span>'

if old_span in cur:
    cur = cur.replace(old_span, new_span, 1)
    print("Fixed nav-brand span styles")
else:
    print("WARNING: nav-brand span not found with expected style")

open("D:/Codex Main总指挥/网站管家/dist/index.html","w",encoding="utf-8").write(cur)
print("Saved!")
