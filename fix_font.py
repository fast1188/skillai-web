import re

with open(r'D:\Codex Main总指挥\网站管家\dist\index.html', 'r', encoding='utf-8') as f:
    html = f.read()

print(f'Size: {len(html)} chars')

# 1. Check charset
has_charset = 'charset' in html[:500]
print(f'<meta charset>: {has_charset}')

# 2. Add body font-family
new_style = '<style>body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans","PingFang SC","Microsoft YaHei",sans-serif}</style>'
if 'font-family:-apple-system' not in html:
    html = html.replace('</head>', new_style + '</head>')
    print('Added body font-family')
else:
    print('font-family ok')

# 3. Scan garbled characters
garbled_chars = set()
for c in html:
    cp = ord(c)
    if cp in [0x945F, 0x6FB6, 0x95BF, 0x93E0, 0x69B4, 0x695A, 0x93C1, 0x9474]:
        garbled_chars.add(c)
print(f'Garbled chars found: {len(garbled_chars)}')

# 4. Scan unicode escapes
escapes = re.findall(r'\\\\u[0-9a-fA-F]{4}', html)
print(f'Unicode escapes: {len(escapes)}')

# 5. document.write
dw = re.findall(r'document\.write', html)
print(f'document.write: {len(dw)}')

# 6. Verify readable Chinese
cn_texts = re.findall(r'>([\u4e00-\u9fff]{2,20})<', html)
print(f'Chinese text blocks: {len(cn_texts)}')
for t in cn_texts[:10]:
    print(f'  {t}')

# Save
with open(r'D:\Codex Main总指挥\网站管家\dist\index.html', 'w', encoding='utf-8', newline='') as f:
    f.write(html)

print('Saved.')
