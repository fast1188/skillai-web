with open(r"D:\Codex Main总指挥\网站管家\dist\index.html", "r", encoding="utf-8") as f:
    html = f.read()

# 1. Remove duplicate usecases (keep only one)
import re
usecases_sections = list(re.finditer(r'<section class="section usecases"', html))
print(f"Usecases sections: {len(usecases_sections)}")
if len(usecases_sections) > 1:
    # Remove the first one (keep the second which should be the complete one)
    first_start = usecases_sections[0].start()
    # Find its closing </section>
    depth = 1
    pos = first_start + 1
    while depth > 0:
        no = html.find("<section", pos)
        nc = html.find("</section>", pos)
        if nc < no or no == -1:
            depth -= 1
            pos = nc + 10
        else:
            depth += 1
            pos = no + 1
    html = html[:first_start] + html[pos:]
    print("Removed duplicate usecases")
else:
    print("No duplicate found")

# 2. Add blinking cursor effect to terminal
terminal_css = """
<style>
.terminal-body{position:relative}
.terminal-body::after{content:"|";animation:blink 1s infinite;color:#4ade80;font-weight:bold}
@keyframes blink{0%,50%{opacity:1}51%,100%{opacity:0}}
</style>
"""
html = html.replace("</head>", terminal_css + "</head>")

# 3. Verify terminal text is present and styled
if "SkillAI AI" in html and "4ade80" in html:
    print("Terminal text OK with cursor animation")

with open(r"D:\Codex Main总指挥\网站管家\dist\index.html", "w", encoding="utf-8") as f:
    f.write(html)
print(f"Final size: {len(html)} chars")
