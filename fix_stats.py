with open(r"D:\Codex Main总指挥\网站管家\dist\index.html", "r", encoding="utf-8") as f:
    html = f.read()

# Find hero-stats block
stats_start = html.find('<div class="hero-stats">')
if stats_start > 0:
    # Find end of hero-stats
    depth = 1
    pos = stats_start + 1
    while depth > 0 and pos < len(html):
        no = html.find("<div", pos)
        nc = html.find("</div>", pos)
        if nc < no or no == -1:
            depth -= 1
            pos = nc + 6
        else:
            depth += 1
            pos = no + 1
    stats_html = html[stats_start:pos]
    
    # Remove from current position
    html = html[:stats_start] + html[pos:]
    
    # Find hero-terminal closing and insert after it
    term_start = html.find('<div class="hero-terminal"')
    if term_start > 0:
        # Find terminal closing
        depth = 1
        pos = term_start + 1
        while depth > 0 and pos < len(html):
            no = html.find("<div", pos)
            nc = html.find("</div>", pos)
            if nc < no or no == -1:
                depth -= 1
                pos = nc + 6
            else:
                depth += 1
                pos = no + 1
        
        # Insert stats with styling after terminal
        styled_stats = '<div style="margin-top:20px;text-align:right">' + stats_html + '</div>'
        html = html[:pos] + styled_stats + html[pos:]
        print(f"Stats moved after terminal at pos {pos}")
    else:
        print("Terminal not found")

with open(r"D:\Codex Main总指挥\网站管家\dist\index.html", "w", encoding="utf-8") as f:
    f.write(html)
print("Saved")
