import re
ref = open("C:/Users/Administrator/Desktop/首页.html","r",encoding="utf-8").read()
cur = open("D:/Codex Main总指挥/网站管家/dist/index.html","r",encoding="utf-8").read()

# Check structural elements in both
print("=== STRUCTURAL COMPARISON ===")
for term in ['id="usecases"', 'id="features"', 'id="download"', 'id="faq"', 'id="blog"', 'id="contact"',
             'class="usecases"', 'class="features"', 'class="download-section"', 'class="faq"',
             '<footer', '</footer>', 'hero-inner', 'hero-visual', 'steps-grid', 'mid-cta']:
    in_ref = term in ref
    in_cur = term in cur
    status = "OK" if in_ref == in_cur else "DIFF"
    print(f"{status}: {term} -> ref={'Y' if in_ref else 'N'}, cur={'Y' if in_cur else 'N'}")

print()
print("=== BODY CONTENT AFTER HERO IN REF ===")
hero_idx = ref.find('<section class=hero')
after_hero = ref[hero_idx:]
# Find next major section after hero end
sec_start = after_hero.find('<section', 1)
if sec_start > 0:
    print(after_hero[sec_start:sec_start+300])
else:
    # Look for div with id/class
    for pattern in ['<div class="container"', '<div id=', '<div class=']:
        p = after_hero.find(pattern, 200)
        if p > 0:
            snip = after_hero[p:p+300]
            print(f"Found div at {p}: {snip[:300]}")
            break
    else:
        # Just show around hero area
        print("No sections after hero. Showing hero end + 500 chars:")
        hero_close = after_hero.find('</section>')
        if hero_close > 0:
            print(after_hero[hero_close:hero_close+1000])
