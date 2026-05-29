import re

with open(r"D:\Codex Main总指挥\网站管家\dist\index.html", "r", encoding="utf-8") as f:
    html = f.read()

# === FIX 1: Move hero-stats to the right (inside hero-visual, after terminal) ===
# Find hero-stats block
stats_start = html.find('<div class="hero-stats">')
stats_end = html.find('</div>', stats_start)
# Find the end of hero-stats (it has nested divs)
depth = 1
pos = stats_end + 6
while depth > 0 and pos < len(html):
    next_open = html.find('<div', pos)
    next_close = html.find('</div>', pos)
    if next_close < next_open or next_open == -1:
        depth -= 1
        pos = next_close + 6
    else:
        depth += 1
        pos = next_open + 1
stats_full_end = pos

if stats_start > 0:
    stats_html = html[stats_start:stats_full_end]
    print(f"Stats block: {len(stats_html)} chars")
    
    # Remove from current location
    html = html[:stats_start] + html[stats_full_end:]
    
    # Find hero-visual closing
    visual_start = html.find('<div class="hero-visual">')
    # Find the closing </div> of hero-visual (before hero-inner closing)
    after_visual = html[visual_start:]
    depth = 1
    pos = after_visual.find('<div')
    close_pos = 0
    search_pos = 0
    while depth > 0:
        open_tag = after_visual.find('<div', search_pos)
        close_tag = after_visual.find('</div>', search_pos)
        if close_tag < open_tag or open_tag == -1:
            depth -= 1
            search_pos = close_tag + 6
            close_pos = close_tag
        else:
            depth += 1
            search_pos = open_tag + 1
    visual_full = visual_start + close_pos
    
    # Insert stats before hero-visual closing
    html = html[:visual_full] + stats_html + html[visual_full:]
    print("Stats moved to hero-visual column")
else:
    print("hero-stats not found")

# === FIX 2: Add CSS for right-aligned stats ===
css_fix = '<style>.hero-stats{justify-content:flex-end;text-align:right}.hero-stats>div{margin-left:20px}@media(max-width:768px){.hero-stats{justify-content:center;text-align:center}}</style>'
html = html.replace('</head>', css_fix + '</head>')

# === FIX 3: Terminal static text ===
# The terminal text is static since we removed JS. Add a note or make it look intentional
# Replace the terminal content lines with static styled text
terminal_content = '''<div class="terminal-body" style="padding:16px 20px;font-family:monospace;font-size:0.85rem;color:#94a3b8;line-height:1.8">
<div style="color:#4ade80">$ SkillAI AI 正在工作中...</div>
<div>检测系统环境... ✓</div>
<div>安装依赖组件... 完成 ✓</div>
<div>下载 SkillAI v2.1.0... 100%</div>
<div>配置 AI 模型: 智谱 GLM-5</div>
<div style="color:#4ade80">部署完成！SkillAI 已就绪</div>
</div>'''

# Replace existing terminal body
old_terminal = re.search(r'<div class="terminal-body"[^>]*>.*?</div>\s*</div>\s*</div>', html, re.DOTALL)
if old_terminal:
    # Find the terminal-body start and end
    tb_start = html.find('<div class="terminal-body"')
    if tb_start > 0:
        # Find matching close
        depth = 1
        pos = tb_start + 1
        while depth > 0:
            n_open = html.find('<div', pos)
            n_close = html.find('</div>', pos)
            if n_close < n_open or n_open == -1:
                depth -= 1
                pos = n_close + 6
            else:
                depth += 1
                pos = n_open + 1
        tb_end = pos
        html = html[:tb_start] + terminal_content + html[tb_end:]
        print("Terminal updated to static content")
else:
    print("Terminal body not found - may need manual fix")

with open(r"D:\Codex Main总指挥\网站管家\dist\index.html", "w", encoding="utf-8") as f:
    f.write(html)

print("Done")
