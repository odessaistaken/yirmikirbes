import json
import os
import subprocess
import re
from PIL import Image

print("--- 1. Loading 849eb51 Mock Data for Pasta Products ---")
proc = subprocess.run(['git', 'show', '849eb51:lib/mock-data.ts'], capture_output=True, text=True, encoding='utf-8')
lines = proc.stdout.splitlines()

raw_prod_text = '\n'.join(lines[182:7714])
raw_prod_text = re.sub(r'^\s*const RAW_PRODUCTS\s*=\s*', '', raw_prod_text).strip()
if raw_prod_text.endswith(';'):
    raw_prod_text = raw_prod_text[:-1].strip()

all_849_prods = json.loads(raw_prod_text)

# Filter the 121 white pasta products
pasta_prods_849 = [
    p for p in all_849_prods
    if p.get('categoryId') in ['cat-8', 'cat-9', 'cat-5', 'cat-butik-cup', 'cat-organizasyon']
    or p.get('categorySlug') in ['pastalar', 'taze-butik-pastalar', 'donuk-pasta', 'butik-cup', 'organizasyon-pastalari']
]
print(f"Total pasta products in 849eb51: {len(pasta_prods_849)}")

# Verify all images exist
valid_pasta_prods = []
for p in pasta_prods_849:
    img_p = "public" + p['imageUrl']
    if os.path.exists(img_p):
        valid_pasta_prods.append(p)
    else:
        print("Missing pasta image:", img_p)

print(f"Valid pasta products with existing images: {len(valid_pasta_prods)}")

print("\n--- 2. Loading 139 Karisik Products ---")
with open('products_json.json', encoding='utf-8') as f:
    raw_json = json.load(f)
    karisik_prods = [p for p in raw_json if '/beyazresimler/karisik/' in p.get('imageUrl', '')]


# Re-map categories for karisik products to canonical category taxonomy
remap_karisik = []
for p in karisik_prods:
    item = dict(p)
    old_slug = item.get('categorySlug', '')
    
    if old_slug == 'pasta-susleme-draje':
        item['categoryId'] = 'cat-3'
        item['categoryName'] = 'Waffle Çikolataları'
        item['categorySlug'] = 'waffle-malzemeleri'
    elif old_slug == 'waffle-malzemeleri':
        item['categoryId'] = 'cat-3'
        item['categoryName'] = 'Waffle Çikolataları'
        item['categorySlug'] = 'waffle-malzemeleri'
    elif old_slug == 'donuk-unlu-mamuller':
        item['categoryId'] = 'cat-5'
        item['categoryName'] = 'Pastalar'
        item['categorySlug'] = 'donuk-pasta'
    elif old_slug == 'kokteyller':
        item['categoryId'] = 'cat-7'
        item['categoryName'] = 'Kokteyller'
        item['categorySlug'] = 'kokteyller'
    elif old_slug == 'suruplar':
        item['categoryId'] = 'cat-2'
        item['categoryName'] = 'Şuruplar'
        item['categorySlug'] = 'suruplar'
    elif old_slug == 'pureler':
        item['categoryId'] = 'cat-1'
        item['categoryName'] = 'Püreler'
        item['categorySlug'] = 'pureler'
    elif old_slug == 'bar-sos':
        item['categoryId'] = 'cat-4'
        item['categoryName'] = 'Bar Sos'
        item['categorySlug'] = 'bar-sos'
    
    remap_karisik.append(item)

print(f"Total remapped karisik products: {len(remap_karisik)}")

# Combine all products
combined_products = []
order_counter = 1

# First add Pasta products (1. Pastalar in category-order)
for p in valid_pasta_prods:
    p_copy = dict(p)
    p_copy['order'] = order_counter
    order_counter += 1
    combined_products.append(p_copy)

# Then add Karisik products
for p in remap_karisik:
    p_copy = dict(p)
    p_copy['order'] = order_counter
    order_counter += 1
    combined_products.append(p_copy)

print(f"\nTotal Combined Products: {len(combined_products)}")

# Calculate exact product counts per category
counts = {}
for p in combined_products:
    cid = p.get('categoryId')
    cslug = p.get('categorySlug')
    counts[cid] = counts.get(cid, 0) + 1
    counts[cslug] = counts.get(cslug, 0) + 1

# Calculate parent category counts
pasta_total = counts.get('cat-9', 0) + counts.get('cat-5', 0) + counts.get('cat-butik-cup', 0) + counts.get('cat-organizasyon', 0)
surup_total = counts.get('cat-2', 0) + counts.get('cat-7', 0)

print(f"Product Counts: Pastalar={pasta_total}, Taze Butik={counts.get('cat-9', 0)}, Donuk Pasta={counts.get('cat-5', 0)}")
print(f"Suruplar Total={surup_total}, Surup={counts.get('cat-2', 0)}, Kokteyller={counts.get('cat-7', 0)}")
print(f"Pureler={counts.get('cat-1', 0)}, Bar Sos={counts.get('cat-4', 0)}, Waffle={counts.get('cat-3', 0)}")

# Canonical CATEGORIES array
CATEGORIES = [
    {
        "id": "cat-8",
        "name": "Pastalar",
        "slug": "pastalar",
        "description": "Özenle seçilmiş malzemelerle hazırlanan el yapımı butik pastalar, donuk cheesecake'ler ve tek porsiyonluk gurme lezzetler.",
        "icon": "🎂",
        "productCount": pasta_total,
        "imageUrl": "/resimler/pt13/pt13_1.png",
        "order": 1,
        "isActive": True
    },
    {
        "id": "cat-9",
        "name": "Butik Pastalar",
        "slug": "taze-butik-pastalar",
        "description": "Günlük taze üretim, el yapımı mono ve dilimli butik pasta ve tatlı çeşitleri.",
        "icon": "🍰",
        "productCount": counts.get('cat-9', 0),
        "imageUrl": "/resimler/pt14/pt14_2.png",
        "order": 2,
        "isActive": True,
        "parentId": "cat-8"
    },
    {
        "id": "cat-5",
        "name": "Donuk Pastalar",
        "slug": "donuk-pasta",
        "description": "Kafeterya ve restoranlar için pratik, lezzetli donuk cheesecake'ler, tiramisu, mono kutu pastalar, dilimli pastalar ve unlu mamuller.",
        "icon": "❄️",
        "productCount": counts.get('cat-5', 0),
        "imageUrl": "/resimler/pt12/pt12_13.png",
        "order": 3,
        "isActive": True,
        "parentId": "cat-8"
    },
    {
        "id": "cat-butik-cup",
        "name": "Butik Cup",
        "slug": "butik-cup",
        "description": "Bireysel servis ve sunumlar için özel tasarlanmış butik cup tatlı ve magnolia çeşitleri.",
        "icon": "🧁",
        "productCount": counts.get('cat-butik-cup', 0),
        "imageUrl": "/resimler/pt15/pt15_1.png",
        "order": 4,
        "isActive": True,
        "parentId": "cat-8"
    },
    {
        "id": "cat-organizasyon",
        "name": "Organizasyon Pastaları",
        "slug": "organizasyon-pastalari",
        "description": "Düğün, nişan, kutlama ve kurumsal etkinlikler için özel tasarım organizasyon pastaları.",
        "icon": "🎊",
        "productCount": counts.get('cat-organizasyon', 0),
        "imageUrl": "/resimler/pt13/pt13_2.png",
        "order": 5,
        "isActive": True,
        "parentId": "cat-8"
    },
    {
        "id": "cat-3",
        "name": "Waffle Çikolataları",
        "slug": "waffle-malzemeleri",
        "description": "CALLEI sürülebilir renkli aromalı kremalar, çıtır pirinç patlakları, drajeler ve fındık krokan süsleme çeşitleri.",
        "icon": "🧇",
        "productCount": counts.get('cat-3', 0),
        "imageUrl": "/beyazresimler/karisik/karisik_081.png",
        "order": 6,
        "isActive": True
    },
    {
        "id": "cat-kruvasan",
        "name": "Kruvasan",
        "slug": "kruvasan",
        "description": "Taze ve donuk kruvasan çeşitleri, Fransız usulü tereyağlı hamur işleri ve New York roll.",
        "icon": "🥐",
        "productCount": counts.get('cat-kruvasan', 0),
        "imageUrl": "/resimler/pt18/pt18_7.png",
        "order": 7,
        "isActive": True
    },
    {
        "id": "cat-6",
        "name": "Kremalı Ürünler & Pastacılık",
        "slug": "kremali-urunler",
        "description": "Chantilly, ganaj ve profesyonel pastacılık krema hammaddeleri.",
        "icon": "🍦",
        "productCount": counts.get('cat-6', 0),
        "imageUrl": "/beyazresimler/karisik/karisik_021.png",
        "order": 8,
        "isActive": True
    },
    {
        "id": "cat-2",
        "name": "Şuruplar",
        "slug": "suruplar",
        "description": "DaVinci Gourmet, Caffè NONNO ve Monte Cristo aromalı kahve, kokteyl ve barista şurupları.",
        "icon": "🍯",
        "productCount": counts.get('cat-2', 0),
        "imageUrl": "/beyazresimler/karisik/karisik_021.png",
        "order": 9,
        "isActive": True
    },
    {
        "id": "cat-7",
        "name": "Kokteyller",
        "slug": "kokteyller",
        "description": "EASY MIX doğal meyve ve botanik kokteyl premiksleri, bar kokteylleri ve mocktailler için profesyonel karışımlar.",
        "icon": "🍹",
        "productCount": counts.get('cat-7', 0),
        "imageUrl": "/beyazresimler/karisik/karisik_052.png",
        "order": 10,
        "isActive": True,
        "parentId": "cat-2"
    },
    {
        "id": "cat-4",
        "name": "Bar Sos",
        "slug": "bar-sos",
        "description": "DaVinci Gourmet ve Caffè NONNO karamel, çikolata, beyaz çikolata ve condensed milk gurme bar sosları.",
        "icon": "🍫",
        "productCount": counts.get('cat-4', 0),
        "imageUrl": "/beyazresimler/karisik/karisik_004.png",
        "order": 11,
        "isActive": True
    },
    {
        "id": "cat-1",
        "name": "Püreler",
        "slug": "pureler",
        "description": "DaVinci Fruit Mix ve Krater zengin meyve püreleri ile bar ve pastacılık meyve karışımları.",
        "icon": "🍓",
        "productCount": counts.get('cat-1', 0),
        "imageUrl": "/beyazresimler/karisik/karisik_001.png",
        "order": 12,
        "isActive": True
    },
    {
        "id": "cat-kasa-onu",
        "name": "Kasa Önü Ürünler",
        "slug": "kasa-onu-urunler",
        "description": "Kasa önü atıştırmalıklar, ikramlık ve impuls ürün seçenekleri.",
        "icon": "🍬",
        "productCount": counts.get('cat-kasa-onu', 0),
        "imageUrl": "/beyazresimler/karisik/karisik_081.png",
        "order": 13,
        "isActive": True
    },
    {
        "id": "cat-kremalar",
        "name": "Kremalar",
        "slug": "kremalar",
        "description": "Özel pastacılık, waffle ve tatlı kremaları, dolgu ve kaplama krema çeşitleri.",
        "icon": "🧁",
        "productCount": counts.get('cat-kremalar', 0),
        "imageUrl": "/beyazresimler/karisik/karisik_081.png",
        "order": 14,
        "isActive": True
    },
    {
        "id": "cat-ekipmanlar",
        "name": "Ekipmanlar",
        "slug": "ekipmanlar",
        "description": "Profesyonel pastacılık ve barista ekipmanları, servis ve mutfak araç gereçleri.",
        "icon": "🔧",
        "productCount": 0,
        "imageUrl": "/resimler/kategoriler/ekipmanlar.jpg",
        "order": 15,
        "isActive": False
    }
]

# Write products_json.json
with open('products_json.json', 'w', encoding='utf-8') as f:
    json.dump(combined_products, f, ensure_ascii=False, indent=2)
print("Updated products_json.json successfully!")

# Write lib/mock-data.ts
mock_data_ts_content = f'''/**
 * Mock data for 20:45 Pastacılık catalog.
 * Generated with 100% accurate Turkish naming, canonical categories, specs, and local image paths.
 * Total {len(CATEGORIES)} categories and {len(combined_products)} products.
 */

import type {{ Category, Product }} from "@/lib/types";
export type {{ Category, Product }};

export const CATEGORIES: Category[] = {json.dumps(CATEGORIES, ensure_ascii=False, indent=2)};

const RAW_PRODUCTS = {json.dumps(combined_products, ensure_ascii=False, indent=2)};

export const PRODUCTS: Product[] = (RAW_PRODUCTS as any[]).map((p: any, index: number) => ({{
  ...p,
  order: p.order ?? index + 1,
  isActive: p.isActive !== false,
  isFeatured: p.isFeatured === true,
  rating: p.rating ?? 4.8,
  reviewCount: p.reviewCount ?? 12,
  price: typeof p.price === "number" ? p.price : 0,
  vatRate: p.vatRate ?? 20,
  tags: Array.isArray(p.tags) ? p.tags : [],
  specs: typeof p.specs === "object" && p.specs !== null ? p.specs : {{}},
}}));

export function getProductById(id: string): Product | undefined {{
  return PRODUCTS.find((p) => p.id === id);
}}

export function getProductByCode(code: string): Product | undefined {{
  return PRODUCTS.find((p) => p.code.toLowerCase() === code.toLowerCase());
}}

export function getProductsByCategory(categorySlug: string): Product[] {{
  return PRODUCTS.filter((p) => p.categorySlug === categorySlug && p.isActive);
}}

export function getRelatedProducts(productOrId: string | Product, limit = 4): Product[] {{
  const current = typeof productOrId === "string" ? getProductById(productOrId) : productOrId;
  if (!current) return PRODUCTS.slice(0, limit);
  return PRODUCTS.filter(
    (p) =>
      p.id !== current.id &&
      p.isActive &&
      (p.categoryId === current.categoryId || p.categorySlug === current.categorySlug)
  ).slice(0, limit);
}}

export function getFeaturedProducts(): Product[] {{
  return PRODUCTS.filter((p) => p.isFeatured && p.isActive);
}}

export function getCategoryBySlug(slug: string): Category | undefined {{
  return CATEGORIES.find((c) => c.slug === slug);
}}

export function searchProducts(query: string): Product[] {{
  const q = query.toLowerCase().trim();
  if (!q) return PRODUCTS.filter((p) => p.isActive);
  return PRODUCTS.filter(
    (p) =>
      p.isActive &&
      (p.name.toLowerCase().includes(q) ||
        p.code.toLowerCase().includes(q) ||
        (p.codeGroup && p.codeGroup.toLowerCase().includes(q)) ||
        p.categoryName.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q)))
  );
}}

/** Returns products from the same brand (codeGroup), excluding the current product */
export function getBrandProducts(productOrId: string | Product, limit = 8): Product[] {{
  const current = typeof productOrId === "string" ? getProductById(productOrId) : productOrId;
  if (!current || !current.codeGroup) return [];
  return PRODUCTS.filter(
    (p) =>
      p.id !== current.id &&
      p.isActive &&
      p.codeGroup &&
      p.codeGroup.toLowerCase() === current.codeGroup.toLowerCase()
  ).slice(0, limit);
}}


'''

with open('lib/mock-data.ts', 'w', encoding='utf-8') as f:
    f.write(mock_data_ts_content)
print("Updated lib/mock-data.ts successfully!")

# Write scripts/seed-all-products.mjs
seed_script_content = f'''import {{ initializeApp }} from "firebase/app";
import {{ getFirestore, doc, setDoc, serverTimestamp }} from "firebase/firestore";

const firebaseConfig = {{
  apiKey: "AIzaSyARd2f0Fea3_3Rie1BdNqg-oiFDUnMQP7Y",
  authDomain: "project-6884460393570611503.firebaseapp.com",
  projectId: "project-6884460393570611503",
  storageBucket: "project-6884460393570611503.firebasestorage.app",
  messagingSenderId: "897409225916",
  appId: "1:897409225916:web:a982cd3bb5733befb22cb9"
}};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const CATEGORIES = {json.dumps(CATEGORIES, ensure_ascii=False, indent=2)};
const PRODUCTS = {json.dumps(combined_products, ensure_ascii=False, indent=2)};

async function seed() {{
  console.log("Seeding", CATEGORIES.length, "categories and", PRODUCTS.length, "products...");
  for (const cat of CATEGORIES) {{
    await setDoc(doc(db, "categories", cat.id), {{
      ...cat,
      updatedAt: serverTimestamp()
    }});
  }}
  console.log("Categories seeded!");

  for (const prod of PRODUCTS) {{
    await setDoc(doc(db, "products", prod.id), {{
      ...prod,
      updatedAt: serverTimestamp()
    }});
  }}
  console.log("Products seeded successfully!");
  process.exit(0);
}}

seed().catch(err => {{
  console.error("Seeding error:", err);
  process.exit(1);
}});
'''

with open('scripts/seed-all-products.mjs', 'w', encoding='utf-8') as f:
    f.write(seed_script_content)
print("Updated scripts/seed-all-products.mjs successfully!")
