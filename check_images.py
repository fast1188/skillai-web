import re, os

ref = r'C:\Users\Administrator\Desktop\首页.html'
with open(ref, 'r', encoding='utf-8') as f:
    html = f.read()

# Find image src attributes
imgs = re.findall(r'<img[^>]*src="([^"]*)"', html)
print('All img src in reference:')
for i, s in enumerate(imgs):
    print(f'  {i}: {s[:100]}')

# Check for provider icons with nested structure
provider_areas = re.findall(r'<div class="[^"]*provider-icon[^"]*"[^>]*>.*?</div>', html, re.DOTALL)
print(f'\nProvider icon divs: {len(provider_areas)}')
for pa in provider_areas[:5]:
    srcs = re.findall(r'src="([^"]*)"', pa)
    alts = re.findall(r'alt="([^"]*)"', pa)
    print(f'  alt={alts}, src={srcs}')

# Find all image URLs in the file
all_srcs = set(re.findall(r'src="([^"]*\.(?:png|jpg|jpeg|gif|svg|webp))"', html))
print(f'\nAll image file references:')
for s in sorted(all_srcs):
    print(f'  {s}')
