import json, re

with open('lib/mock-data.ts', 'r', encoding='utf-8') as f:
    text = f.read()

pattern = r'\{\s*"id":\s*"([^"]+)",\s*"name":\s*"([^"]+)"[\s\S]*?"imageUrl":\s*"([^"]+)"'
matches = re.findall(pattern, text)
print(f"Total products found: {len(matches)}")

pastas = [m for m in matches if 'pt12' in m[2] or 'pt11' in m[2] or 'pt13' in m[2] or 'pt14' in m[2]]
print(f"Products with pt11/pt12/pt13/pt14 images: {len(pastas)}")
for p in pastas[:35]:
    print(f"ID: {p[0]:<15} | Img: {p[2]:<28} | Name: {p[1]}")
