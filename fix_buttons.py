import re
with open(r"D:\Codex Main总指挥\网站管家\dist\index.html", "r", encoding="utf-8") as f:
    html = f.read()

# Find all download-related links
links = re.findall(r'href="([^"]*(?:download|setup|exe|安装|下载)[^"]*)"', html, re.IGNORECASE)
print("=== Download links ===")
for l in links:
    print(f"  {l}")

# Find CTA section
idx = html.find("别犹豫了")
if idx > 0:
    ctx = html[max(0,idx-200):min(len(html),idx+500)]
    print("\n=== CTA section ===")
    print(ctx[:600])

# Fix empty download links
empty_downloads = html.count('href=""')
empty_dl = html.count('href="/download"')
print(f"\nhref=\"\" count: {empty_downloads}")
print(f'href="/download" count: {empty_dl}')

# Fix: replace empty hrefs or /download with actual download link
html = html.replace('href=""', 'href="/downloads/SkillAI-setup.exe"')
html = html.replace('href="/download"', 'href="/downloads/SkillAI-setup.exe"')

# Also fix any button without href
html = re.sub(r'(<a[^>]*?class="[^"]*btn[^"]*"[^>]*?)(?<!href="[^"]*")>', 
    r'\1 href="/downloads/SkillAI-setup.exe">', html)

with open(r"D:\Codex Main总指挥\网站管家\dist\index.html", "w", encoding="utf-8") as f:
    f.write(html)

print("\nFixed. Verifying...")
print(f"SkillAI-setup.exe links: {html.count('SkillAI-setup.exe')}")
