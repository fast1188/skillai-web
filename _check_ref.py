import sys, re
sys.stdout.reconfigure(encoding="utf-8")

ref = open("C:/Users/Administrator/Desktop/首页.html","r",encoding="utf-8").read()

# Find nav-brand in reference
idx = ref.find("nav-brand")
if idx > 0:
    # Get the surrounding 500 chars
    ctx = ref[idx:idx+500]
    print("REF nav-brand context:")
    print(ctx[:400])
    
# Check header CSS in reference
h_idx = ref.find(".header{")
if h_idx > 0:
    h_end = ref.find("}", h_idx)
    print("\nREF .header CSS:")
    print(ref[h_idx:h_end+1])
    
# Check header background specifically
for m in re.finditer(r'\.header[^}]*background[^}]*}', ref):
    print("\nREF .header background rules:")
    print(m.group())
