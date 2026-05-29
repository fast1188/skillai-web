import re, sys
sys.stdout.reconfigure(encoding='utf-8')

with open(r"D:\Codex Main总指挥\网站管家\dist\index.html", "r", encoding="utf-8") as f:
    html = f.read()

# Fix ALL download links to point to our local file
html = re.sub(r'href="https?://(?:www\.)?skillai\.top/qddownload/[^"]*"', 'href="/downloads/SkillAI-setup.exe"', html)
html = re.sub(r'href="https?://(?:www\.)?160\.com/qddownload/[^"]*"', 'href="/downloads/SkillAI-setup.exe"', html)
html = html.replace('href="/download"', 'href="/downloads/SkillAI-setup.exe"')

# Fix any "点击下载" button without proper href
html = re.sub(
    r'(<a[^>]*?)(点击下载|立即下载|下载)',
    lambda m: m.group(0) if 'href="/downloads/SkillAI-setup.exe"' in m.group(0) 
    else re.sub(r'(<a[^>]*?)>', r'\1 href="/downloads/SkillAI-setup.exe">', m.group(0), count=1),
    html
)

with open(r"D:\Codex Main总指挥\网站管家\dist\index.html", "w", encoding="utf-8") as f:
    f.write(html)

# Verify
links = re.findall(r'href="([^"]*(?:download|setup|exe)[^"]*)"', html, re.IGNORECASE)
print("Final download links:")
good = 0
bad = 0
for l in links:
    if 'SkillAI-setup.exe' in l:
        good += 1
        print(f"  OK: {l}")
    else:
        bad += 1
        print(f"  BAD: {l}")
print(f"\nGood: {good}, Bad: {bad}, Total: {len(links)}")
print(f"SkillAI-setup.exe occurrences: {html.count('SkillAI-setup.exe')}")
