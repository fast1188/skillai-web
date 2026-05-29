import sys
sys.stdout.reconfigure(encoding='utf-8')
import os

ref = open("C:/Users/Administrator/Desktop/首页.html","r",encoding="utf-8").read()
cur = open("D:/Codex Main总指挥/网站管家/dist/index.html","r",encoding="utf-8").read()

# 1. Check logo
import re
logo_match = re.search(r'<img[^>]*alt=[\\"\x27]?[Oo]pen[Cc]law[^>]*>', ref)
if logo_match:
    l = logo_match.group()
    src_m = re.search(r'src=\"?([^\"\\>\s]+)', l)
    if src_m:
        print("REF logo src:", src_m.group(1)[:100])
    print("REF logo tag:", l[:200])
    
# 2. Check body overflow
for t in ['body{', 'html{']:
    idx = cur.find(t)
    if idx >= 0:
        end = cur.find('}', idx)
        print(f"Cur {t}:", cur[idx:end+1])

# 3. Check reference sections after hero
hero_end = ref.find('</section>', ref.find('<section class=hero'))
after_hero = ref[hero_end+10:hero_end+2000]
print("\n=== Content after hero in REF ===")
print(after_hero[:1500])

# 4. Check current file content after hero
cur_hero_end = cur.find('</section>')
if cur_hero_end > 0:
    after_cur = cur[cur_hero_end+10:cur_hero_end+2000]
    print("\n=== Content after hero in CUR ===")
    print(after_cur[:1500])
