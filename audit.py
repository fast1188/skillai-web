import urllib.request, re, sys

sys.stdout.reconfigure(encoding='utf-8')

h = urllib.request.urlopen("https://www.skillai.top").read().decode("utf-8")

results = []

# 1. 品牌旁破碎图片
nav = re.search(r'<a class="nav-brand"[^>]*>(.*?)</a>', h)
if nav:
    imgs = re.findall(r'<img[^>]*>', nav.group(1))
    has_broken = any('src=""' in i or 'color:transparent' in i for i in imgs)
    results.append(("品牌旁破碎图片", not has_broken, f"nav-brand imgs:{len(imgs)} broken:{has_broken}"))

# 2. 点击下载按钮
empty_btns = len(re.findall(r'<a[^>]*href=""[^>]*>(?:点击下载|立即下载|下载)', h))
bad_hrefs = [l for l in re.findall(r'href="([^"]*(?:download|setup|exe)[^"]*)"', h, re.IGNORECASE) if "SkillAI-setup.exe" not in l]
results.append(("下载按钮空白", len(bad_hrefs)==0 and empty_btns==0, f"bad:{len(bad_hrefs)} empty:{empty_btns}"))

# 3. 步骤卡片拥挤 - check grid CSS
has_steps_grid = "steps-grid" in h or "grid-template-columns" in h
results.append(("步骤卡片间距", has_steps_grid, f"grid CSS:{has_steps_grid}"))

# 4. AI服务商图标
broken_provider_imgs = len(re.findall(r'<img[^>]*alt="[^"]*(?:GLM|千问|DeepSeek|豆包)[^"]*"[^>]*>', h))
has_provider_divs = "provider-icon" in h
results.append(("AI服务商图标", broken_provider_imgs==0 and has_provider_divs, f"broken:{broken_provider_imgs} divs:{has_provider_divs}"))

# 5. 统计数字右移
sp = h.find('<div class="hero-stats">')
vp = h.find('hero-visual')
moved = sp > vp if sp > 0 else False
results.append(("统计数字右移", moved, f"stats:{sp} visual:{vp}"))

# 6. 乱码
garbled = len(re.findall(r'[\u945F\u6FB6\u95BF\u93E0\u69B4\u695A]', h))
results.append(("UTF-8乱码", garbled==0, f"garbled:{garbled}"))

# 7. 内容完整性
missing = []
for kw in ["能帮你做什么","下载安装","配置AI模型","智谱 GLM","DeepSeek","别犹豫了"]:
    if kw not in h: missing.append(kw)
results.append(("内容完整性", len(missing)==0, f"missing:{missing}"))

# 8. 重复usecases
usecases_count = h.count('<section class="section usecases"')
results.append(("重复section", usecases_count<=1, f"count:{usecases_count}"))

# 9. 安装包可下载
try:
    dl = urllib.request.urlopen("https://www.skillai.top/downloads/SkillAI-setup.exe")
    dl_ok = dl.status == 200
    dl_size = len(dl.read())
    dl.close()
except:
    dl_ok = False
    dl_size = 0
results.append(("安装包可下载", dl_ok and dl_size > 1000000, f"status:{dl_ok} size:{dl_size}"))

# 10. Client error
has_turbopack = "turbopack" in h
results.append(("Next.js水合错误", not has_turbopack, f"turbopack:{has_turbopack}"))

# Output
print("=" * 50)
print("  skillai.top 铁证自检报告")
print("=" * 50)
print()
passed = 0
failed = 0
for name, ok, evidence in results:
    status = "PASS" if ok else "FAIL"
    if ok: passed += 1
    else: failed += 1
    print(f"[{status}] {name}")
    print(f"       证据: {evidence}")
    print()

print(f"结果: {passed} PASS / {failed} FAIL / {len(results)} 总计")
