import re

with open(r"D:\Codex Main总指挥\网站管家\original_site\index.html", "r", encoding="utf-8") as f:
    orig = f.read()

with open(r"D:\Codex Main总指挥\网站管家\dist\index.html", "r", encoding="utf-8") as f:
    dist = f.read()

# Find "steps" section in original
idx = orig.find("下载安装")
if idx > 0:
    # Find surrounding section
    section_start = orig.rfind("<section", 0, idx)
    # Find closing
    depth = 1
    pos = section_start + 1
    while depth > 0:
        no = orig.find("<section", pos)
        nc = orig.find("</section>", pos)
        if nc < no or no == -1:
            depth -= 1
            pos = nc + 10
        else:
            depth += 1
            pos = no + 1
    steps_html = orig[section_start:pos]
    print(f"Steps section: {len(steps_html)} chars")
    
    # Find same section in dist
    if "下载安装" in dist:
        dist_idx = dist.find("下载安装")
        dist_section_start = dist.rfind("<section", 0, dist_idx)
        depth2 = 1
        pos2 = dist_section_start + 1
        while depth2 > 0:
            no2 = dist.find("<section", pos2)
            nc2 = dist.find("</section>", pos2)
            if nc2 < no2 or no2 == -1:
                depth2 -= 1
                pos2 = nc2 + 10
            else:
                depth2 += 1
                pos2 = no2 + 1
        dist_steps = dist[dist_section_start:pos2]
        print(f"Dist steps section: {len(dist_steps)} chars")
        
        # Extract original CSS classes for steps
        steps_classes = re.findall(r'class="([^"]*step[^"]*)"', orig[section_start:pos])
        print(f"\nStep classes in original: {steps_classes}")
        
        # Check for images in original steps
        orig_imgs = re.findall(r'<img[^>]*>', orig[section_start:pos])
        print(f"Images in original steps: {len(orig_imgs)}")
        for img in orig_imgs[:5]:
            print(f"  {img[:120]}")
        
        # Check dist steps
        dist_imgs = re.findall(r'<img[^>]*>', dist[dist_section_start:pos2])
        print(f"\nImages in dist steps: {len(dist_imgs)}")
        for img in dist_imgs[:5]:
            print(f"  {img[:120]}")

# Find AI providers section
idx2 = orig.find("智谱 GLM")
if idx2 > 0:
    section_start2 = orig.rfind("<section", 0, idx2)
    depth3 = 1
    pos3 = section_start2 + 1
    while depth3 > 0:
        no3 = orig.find("<section", pos3)
        nc3 = orig.find("</section>", pos3)
        if nc3 < no3 or no3 == -1:
            depth3 -= 1
            pos3 = nc3 + 10
        else:
            depth3 += 1
            pos3 = no3 + 1
    
    # Get provider images
    provider_imgs = re.findall(r'<img[^>]*>', orig[section_start2:pos3])
    print(f"\nProvider images in original: {len(provider_imgs)}")
    for img in provider_imgs:
        src = re.search(r'src="([^"]*)"', img)
        alt = re.search(r'alt="([^"]*)"', img)
        print(f"  src={src.group(1) if src else 'N/A'} | alt={alt.group(1) if alt else 'N/A'}")
