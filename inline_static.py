import re, os, urllib.parse

dist_dir = "D:\\Codex Main总指挥\\网站管家\\dist"
html_path = os.path.join(dist_dir, "index.html")
chunks_dir = os.path.join(dist_dir, "_next", "static", "chunks")
media_dir = os.path.join(dist_dir, "_next", "static", "media")

with open(html_path, "r", encoding="utf-8") as f:
    html = f.read()

print(f"Original HTML size: {len(html)} chars")

# Remove external CSS links
html = re.sub(r'<link rel="stylesheet"[^>]*>', '', html)

# Read and combine all CSS files
all_css = []
css_order = [
    "41bf2784a1c76b70.css",
    "3575aa8845f3b71c.css",
    "ef95d182cfe1424e.css",
    "36097ec47320c4d9.css",
    "4643a2a7f1d3710a.css",
    "908322758409462d.css",
    "068876f07a4f5938.css",
]
for css_file in css_order:
    path = os.path.join(chunks_dir, css_file)
    if os.path.exists(path):
        with open(path, "r", encoding="utf-8") as f:
            css = f.read()
        css = css.replace('../media/', '_next/static/media/')
        all_css.append(css)

combined_css = '\n'.join(all_css)

extra_css = """
.mobile-nav { display: none; position: fixed; top: 70px; left: 0; width: 100%; background: #fff; z-index: 999; box-shadow: 0 10px 30px rgba(0,0,0,0.1); padding: 20px; }
.mobile-nav.active { display: flex; flex-direction: column; gap: 15px; }
.mobile-nav a { padding: 10px 0; font-size: 1.1rem; color: #333; text-decoration: none; border-bottom: 1px solid #f0f0f0; }
.mid-cta { text-align: center; padding: 80px 20px; background: linear-gradient(135deg, #1e3a5f, #2563eb); color: white; }
.scenario-scroll-wrapper { overflow-x: auto; display: flex; gap: 12px; padding: 10px 0; }
.scenario-chip { display: inline-block; padding: 8px 20px; background: #f0f7ff; border-radius: 20px; white-space: nowrap; font-size: 0.9rem; color: #1e40af; }
.scenario-banner { display: inline-block; padding: 6px 16px; background: linear-gradient(135deg, #3b82f6, #8b5cf6); border-radius: 20px; color: white; font-size: 0.8rem; }
.platform-indicator { display: inline-flex; align-items: center; gap: 6px; padding: 6px 14px; background: rgba(255,255,255,0.15); border-radius: 20px; color: white; font-size: 0.85rem; }
.live-dot { width: 8px; height: 8px; background: #22c55e; border-radius: 50%; display: inline-block; }
.hero-badge { display: inline-flex; align-items: center; gap: 8px; padding: 8px 20px; background: rgba(255,255,255,0.1); border-radius: 20px; color: white; font-size: 0.85rem; backdrop-filter: blur(10px); }
"""

style_tag = f'<style id="inlined-styles">{combined_css}{extra_css}</style>'
html = html.replace('</head>', f'{style_tag}\n</head>')

# Fix Next.js image URLs to direct paths
def fix_next_image(match):
    url = match.group(1)
    parsed = urllib.parse.urlparse(url)
    params = urllib.parse.parse_qs(parsed.query)
    if 'url' in params:
        real_path = urllib.parse.unquote(params['url'][0])
        return f'src="{real_path}"'
    return match.group(0)

html = re.sub(r'src="/_next/image\?url=([^"]*)"', fix_next_image, html)
html = re.sub(r'imagesrcset="/_next/image\?url=([^"]*)"', '', html)
html = re.sub(r'srcset="[^"]*"', '', html)

# Remove Next.js RSC data blobs
html = re.sub(r'<script>self\.__next_f\.push\(\[.*?</script>', '', html, flags=re.DOTALL)

# Remove specific next.js scripts
scripts_to_remove = [
    'chunks/71486dabebc4fe73.js', 'chunks/6927b3a8d75d6599.js',
    'chunks/117ee1a4324520a8.js', 'chunks/6d3b1a76c95954bd.js',
    'chunks/407aa4994a6f376c.js', 'chunks/44125be043505e2f.js',
    'chunks/527ebd69667cdac0.js', 'chunks/ad8e010034f9e510.js',
    'chunks/e890f9fcd933d6f9.js', 'chunks/6b83c351619bfd32.js',
    'chunks/cf55a0f4453b7aaf.js', 'chunks/5b499d5783a6091c.js',
    'chunks/b42b8782f0cec5db.js',
]
for script_src in scripts_to_remove:
    html = re.sub(f'<script src="/_next/static/{re.escape(script_src)}"[^>]*></script>', '', html)
html = re.sub(r'<script src="/_next/static/chunks/turbopack[^"]*"[^>]*></script>', '', html)
html = re.sub(r'<script src="/_next/static/chunks/[^"]*" nomodule[^>]*></script>', '', html)

# Remove preload links
html = re.sub(r'<link rel="preload"[^>]*>', '', html)

# Remove next-size-adjust
html = re.sub(r'<meta name="next-size-adjust"[^>]*>', '', html)

# Remove route announcer
html = re.sub(r'<next-route-announcer.*?</next-route-announcer>', '', html, flags=re.DOTALL)
html = html.replace('<div hidden=""><!--$--><!--/$--></div>', '')

html = html.strip()

with open(html_path, "w", encoding="utf-8") as f:
    f.write(html)

print(f"Final HTML size: {len(html)} chars")
print("Done! dist/index.html optimized for static hosting.")
