import re

with open(r"D:\Codex Main总指挥\网站管家\original_site\index.html", "r", encoding="utf-8") as f:
    orig = f.read()

with open(r"D:\Codex Main总指挥\网站管家\dist\index.html", "r", encoding="utf-8") as f:
    dist = f.read()

# Extract usecases section from original
start = orig.find('<section class="usecases"')
if start < 0:
    start = orig.find('id="usecases"')
    if start > 0:
        start = orig.rfind('<section', 0, start)

if start > 0:
    # Find matching closing </section>
    depth = 1
    pos = start + 1
    while depth > 0 and pos < len(orig):
        n_open = orig.find('<section', pos)
        n_close = orig.find('</section>', pos)
        if n_close < n_open or n_open == -1:
            depth -= 1
            pos = n_close + 10
        else:
            depth += 1
            pos = n_open + 1
    
    usecases_html = orig[start:pos]
    print(f"Extracted usecases: {len(usecases_html)} chars")
    
    # Replace brand name
    usecases_html = usecases_html.replace("OpenClaw", "OpenClaw")
    usecases_html = usecases_html.replace("openclaw", "openclaw")
    
    # Find where to insert in dist - after hero section
    hero_end = dist.find('</section>')
    if hero_end > 0:
        # Find second </section> (after hero closes)
        hero_end2 = dist.find('</section>', hero_end + 10)
        if hero_end2 > 0:
            dist = dist[:hero_end2+10] + "\n" + usecases_html + "\n" + dist[hero_end2+10:]
            print(f"Inserted usecases section")
    
    with open(r"D:\Codex Main总指挥\网站管家\dist\index.html", "w", encoding="utf-8") as f:
        f.write(dist)
    print("Saved")
else:
    print("usecases section not found in original")
