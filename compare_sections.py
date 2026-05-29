import re

with open(r"D:\Codex Main总指挥\网站管家\original_site\index.html", "r", encoding="utf-8") as f:
    orig = f.read()

with open(r"D:\Codex Main总指挥\网站管家\dist\index.html", "r", encoding="utf-8") as f:
    dist = f.read()

# Count sections
orig_sections = re.findall(r'<section[^>]*class="([^"]*)"', orig)
dist_sections = re.findall(r'<section[^>]*class="([^"]*)"', dist)

print("=== Original sections ===")
for s in orig_sections:
    print(f"  {s}")

print(f"\n=== Dist sections ===")
for s in dist_sections:
    print(f"  {s}")

# Check for key content
keywords = [
    "能帮你做什么", "繁琐的工作", "每日自动收集", "自动生成数据",
    "智能阅读", "自动化场景", "全天候运行", "极速部署",
    "下载安装", "配置AI模型", "启动服务", "AI 开始工作",
    "智谱 GLM", "通义千问", "DeepSeek", "豆包",
    "别犹豫了", "2920", "使用教程", "常见问题"
]
print("\n=== Content check ===")
for kw in keywords:
    in_orig = kw in orig
    in_dist = kw in dist
    status = "OK" if in_dist else ("MISSING" if in_orig else "N/A")
    print(f"  [{status}] {kw}")
