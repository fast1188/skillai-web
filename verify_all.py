import urllib.request, re

h = urllib.request.urlopen("https://www.skillai.top").read().decode("utf-8")

# 1. Nav-brand
nav = re.search(r'<a class="nav-brand"[^>]*>(.*?)</a>', h)
if nav:
    content = nav.group(1)
    imgs = re.findall(r'<img[^>]*>', content)
    print("=== 1. Nav-brand ===")
    for i in imgs:
        src = re.search(r'src="([^"]*)"', i)
        print(f"  src={src.group(1) if src else 'MISSING'}")
    if not imgs:
        print("  No img tags - clean")

# 2. Download buttons
links = re.findall(r'href="([^"]*(?:download|setup|exe)[^"]*)"', h, re.IGNORECASE)
empty_hrefs = re.findall(r'<a[^>]*href=""[^>]*>', h)
print(f"\n=== 2. Download links ===")
print(f"  Total: {len(links)}")
print(f"  Empty href: {len(empty_hrefs)}")
for l in links:
    ok = "OK" if "SkillAI-setup.exe" in l else "BAD"
    print(f"  [{ok}] {l}")

# 3. Provider icons
provider_imgs = re.findall(r'<img[^>]*alt="[^"]*(?:GLM|千问|DeepSeek|豆包|Doubao)[^"]*"[^>]*>', h)
provider_divs = re.findall(r'provider-icon', h)
print(f"\n=== 3. Provider icons ===")
print(f"  Broken img tags: {len(provider_imgs)}")
print(f"  Replacement divs: {len(provider_divs)}")

# 4. Hero-stats position
stats_pos = h.find("hero-stats")
visual_pos = h.find("hero-visual")
print(f"\n=== 4. Stats position ===")
print(f"  hero-stats at: {stats_pos}")
print(f"  hero-visual at: {visual_pos}")
print(f"  Stats in visual: {'OK' if stats_pos > visual_pos else 'MOVE RIGHT'}")

# 5. Garbled chars
garbled = re.findall(r'[\u945F\u6FB6\u95BF\u93E0\u69B4\u695A\u93C1\u9474]', h)
print(f"\n=== 5. Garbled chars: {len(garbled)} ===")

print(f"\nTotal HTML: {len(h)} chars")
