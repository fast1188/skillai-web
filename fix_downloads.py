import re
with open(r"D:\Codex Main总指挥\网站管家\dist\index.html", "r", encoding="utf-8") as f:
    html = f.read()

# Find all href attributes with download/exe/setup
links = re.findall(r'href="([^"]*(?:download|setup|exe|\.exe|安装|下载)[^"]*)"', html, re.IGNORECASE)
print("Download links found:", len(links))
for l in links:
    print("  ", l)

# If none, add download button link
if not any("SkillAI-setup" in l for l in links):
    # Find the download button area and ensure link is correct
    # Find "立即下载" or download button
    download_btns = re.findall(r'(<a[^>]*?(?:下载|download)[^>]*?href=")[^"]*', html, re.IGNORECASE)
    print("\nDownload button href targets:", len(download_btns))
    for d in download_btns:
        print("  ", d)
    
    # Fix: replace any /download href that's not pointing to our exe
    html = re.sub(r'href="/download(?!s/SkillAI)"', 'href="/downloads/SkillAI-setup.exe"', html)
    html = re.sub(r'href="/downloads/(?!SkillAI-setup\.exe)[^"]*"', 'href="/downloads/SkillAI-setup.exe"', html)
    
    with open(r"D:\Codex Main总指挥\网站管家\dist\index.html", "w", encoding="utf-8") as f:
        f.write(html)
    print("\nFixed download links")

# Verify
if "SkillAI-setup.exe" in html:
    print("PASS: SkillAI-setup.exe link present")
else:
    print("FAIL: SkillAI-setup.exe missing - adding manually")
    # Find nav download link and replace
    html = html.replace('href="/download"', 'href="/downloads/SkillAI-setup.exe"')
    html = html.replace('href="/downloads/openclaw-setup.exe"', 'href="/downloads/SkillAI-setup.exe"')
    with open(r"D:\Codex Main总指挥\网站管家\dist\index.html", "w", encoding="utf-8") as f:
        f.write(html)
    print("Manual fix applied")
