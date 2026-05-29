import re, os, base64, sys
sys.stdout.reconfigure(encoding='utf-8')

ref = r'C:\Users\Administrator\Desktop\首页.html'
with open(ref, 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Extract all AVIF images from img tags
img_pattern = r'<img[^>]*src="data:image/avif;base64,([^"]+)"[^>]*>'
matches = list(re.finditer(img_pattern, html))

# Create output directory
out_dir = r'D:\Codex Main总指挥\网站管家\dist\assets\ai-logos'
os.makedirs(out_dir, exist_ok=True)

images = []
for i, m in enumerate(matches):
    b64 = m.group(1)
    img_tag = m.group(0)
    alt_m = re.search(r'alt="([^"]*)"', img_tag)
    alt = alt_m.group(1) if alt_m else ''
    
    # Get context to determine what this image is
    ctx_start = max(0, m.start() - 80)
    ctx = html[ctx_start:m.start()]
    
    decoded = base64.b64decode(b64)
    images.append((alt, ctx, decoded, i))
    
    print(f'Image {i}: alt="{alt[:20]}", size={len(decoded)} bytes')
    print(f'  ctx: ...{ctx[-50:]}')

# Determine names from context
# Image 0: after ai-card-icon, alt="智谱 GLM" => zhipu.png
# Image 1-3: other AI providers
# Image 4: in footer => logo

# Save them with determined names
for idx, (alt, ctx, data, orig_idx) in enumerate(images):
    # Determine filename
    if '智谱' in alt or 'GLM' in alt:
        fname = 'zhipu.png'
    elif '豆包' in alt or 'Doubao' in alt:
        fname = 'doubao.png'
    elif 'deep' in ctx.lower() or 'seek' in ctx.lower():
        fname = 'deepseek.png'
    elif 'tongyi' in ctx.lower() or '千问' in ctx.lower():
        fname = 'tongyiqianwen.png'
    elif 'footer' in ctx or 'brand' in ctx:
        fname = 'logo-192.png'
    else:
        # Check position - first one after zhipu is tongyi, second is deepseek
        fname = f'ai_logo_{orig_idx}.png'
    
    path = os.path.join(out_dir, fname)
    if 'footer' not in ctx and 'brand' not in ctx:
        path = os.path.join(out_dir, fname)
    else:
        path = os.path.join(r'D:\Codex Main总指挥\网站管家\dist\assets', fname)
    
    with open(path, 'wb') as f:
        f.write(data)
    print(f'Saved: {path} ({len(data)} bytes)')

# 2. Extract base64 font data
font_matches = re.findall(
    r'@font-face\{font-family:([^;]+);[^}]*src:url\(data:font/woff2;base64,([^)]+)\)[^}]*\}',
    html
)
print(f'\nExtracted fonts: {len(font_matches)}')
for name, b64 in font_matches:
    print(f'  Font: {name.strip()}, base64 length: {len(b64)}')
