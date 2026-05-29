import re

with open(r"D:\Codex Main总指挥\网站管家\dist\index.html", "r", encoding="utf-8") as f:
    html = f.read()

# === FIX 1: Add spacing CSS for steps and providers ===
spacing_css = """
<style>
.steps-grid{gap:24px;display:grid;grid-template-columns:repeat(4,1fr)}
@media(max-width:768px){.steps-grid{grid-template-columns:repeat(2,1fr)}}
@media(max-width:480px){.steps-grid{grid-template-columns:1fr}}
.step-card{background:#0f1623;border:1px solid rgba(239,68,68,0.15);border-radius:16px;padding:28px 20px;text-align:center;transition:all 0.3s}
.step-card:hover{border-color:rgba(239,68,68,0.4);transform:translateY(-2px)}
.step-num{width:48px;height:48px;background:linear-gradient(135deg,#ef4444,#f97316);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;font-size:1.3rem;font-weight:800;color:#fff}
.provider-grid{gap:20px;display:grid;grid-template-columns:repeat(4,1fr)}
@media(max-width:768px){.provider-grid{grid-template-columns:repeat(2,1fr)}}
@media(max-width:480px){.provider-grid{grid-template-columns:1fr}}
.provider-card{background:#0f1623;border:1px solid rgba(239,68,68,0.1);border-radius:16px;padding:24px 16px;text-align:center;transition:all 0.3s;position:relative}
.provider-card:hover{border-color:rgba(239,68,68,0.3)}
.provider-icon{width:56px;height:56px;border-radius:14px;display:flex;align-items:center;justify-content:center;margin:0 auto 12px;font-size:1.8rem}
.provider-badge{position:absolute;top:12px;right:12px;font-size:0.7rem;padding:3px 8px;border-radius:6px;font-weight:600}
</style>
"""
html = html.replace("</head>", spacing_css + "</head>")

# === FIX 2: Replace missing provider icons with styled divs ===
# Find provider cards and replace broken img tags
# Pattern: <img alt="智谱 GLM" ... > → styled div
provider_replacements = {
    '智谱 GLM': ('Z', '#3b82f6', '#1e3a5f'),
    '通义千问': ('Q', '#8b5cf6', '#2d1b69'),
    'DeepSeek': ('D', '#10b981', '#064e3b'),
    '豆包 Doubao': ('B', '#f59e0b', '#78350f'),
    '豆包': ('B', '#f59e0b', '#78350f'),
}

for name, (letter, color, bg) in provider_replacements.items():
    # Replace img with alt=name
    pattern = f'<img[^>]*alt="{name}"[^>]*>'
    replacement = f'<div class="provider-icon" style="background:{bg};color:{color}">{letter}</div>'
    html = re.sub(pattern, replacement, html)

# Also fix any remaining data-nimg img tags that are provider logos
html = re.sub(r'<img[^>]*alt="[^"]*(?:GLM|千问|DeepSeek|豆包|Doubao)[^"]*"[^>]*>', 
    '<div class="provider-icon" style="background:#1a1a2e;color:#00d4ff">AI</div>', html)

# === FIX 3: Add section spacing ===
section_spacing = """
<style>
section{padding:60px 16px !important}
.section-title{font-size:2rem;font-weight:800;color:#f1f5f9;text-align:center;margin-bottom:12px}
.section-subtitle{color:#94a3b8;text-align:center;font-size:1rem;margin-bottom:40px;max-width:600px;margin-left:auto;margin-right:auto}
</style>
"""
html = html.replace("</head>", section_spacing + "</head>")

with open(r"D:\Codex Main总指挥\网站管家\dist\index.html", "w", encoding="utf-8") as f:
    f.write(html)

# Verify
print(f"Provider icons replaced")
print(f"CSS fixes added")
print(f"Total size: {len(html)} chars")
