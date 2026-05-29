import re, os, base64

ref = r'C:\Users\Administrator\Desktop\首页.html'
with open(ref, 'r', encoding='utf-8') as f:
    html = f.read()

# Find all AVIF base64 data URIs with context
pattern = r'(data:image/avif;base64,[A-Za-z0-9+/=]+)'
matches = list(re.finditer(pattern, html))
print(f'Found {len(matches)} AVIF data URIs')

for i, m in enumerate(matches):
    uri = m.group(1)
    # Get surrounding context (200 chars before)
    ctx_start = max(0, m.start() - 300)
    ctx = html[ctx_start:m.start()]
    print(f'\n--- Image {i} (len={len(uri)} chars) ---')
    print(f'Context: ...{ctx[-200:]}')

    # Decode and save
    b64_data = uri.split(',')[1]
    img_data = base64.b64decode(b64_data)
    print(f'Decoded size: {len(img_data)} bytes')
