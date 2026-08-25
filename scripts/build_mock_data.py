import json

with open("products_json.json", "r", encoding="utf-8") as f:
    products = json.load(f)

# Add Kremalı Ürünler
extra_products = [
  {
    "id": "prod-krm-1",
    "name": "CALLEI Pastacı Kreması (Creme Patissiere) 1kg",
    "code": "CAL-CPM-1000",
    "codeGroup": "CALLEI",
    "categoryId": "cat-5",
    "categoryName": "Kremalı Ürünler",
    "categorySlug": "kremali-urunler",
    "description": "Ekler, profiterol ve tartlar için fırınlanmaya ve dondurulmaya uygun vanilyalı hazır pastacı kreması bazı.",
    "imageUrl": "/resimler/p9/p9_9.png",
    "isActive": True,
    "isFeatured": True,
    "price": 0,
    "vatRate": 20,
    "order": 120,
    "tags": ["CALLEI", "Pastacı Kreması", "Krema", "Ekler", "Profiterol"],
    "specs": { "Gramaj": "1 kg", "Kullanım": "Ekler, Profiterol, Pasta Dolgusu", "Menşei": "Türkiye" }
  },
  {
    "id": "prod-krm-2",
    "name": "CALLEI Chantilly Şanti Tozu 1kg",
    "code": "CAL-SNT-1000",
    "codeGroup": "CALLEI",
    "categoryId": "cat-5",
    "categoryName": "Kremalı Ürünler",
    "categorySlug": "kremali-urunler",
    "description": "Yüksek hacim alan, sıcağa dayanıklı ve parlak duruşunu kaybetmeyen profesyonel şanti tozu.",
    "imageUrl": "/resimler/p9/p9_9.png",
    "isActive": True,
    "isFeatured": False,
    "price": 0,
    "vatRate": 20,
    "order": 121,
    "tags": ["CALLEI", "Krem Şanti", "Chantilly", "Şanti Tozu", "Pasta Sıvama"],
    "specs": { "Gramaj": "1 kg", "Kullanım": "Pasta Sıvama, Süsleme, Dolgu", "Menşei": "Türkiye" }
  },
  {
    "id": "prod-krm-3",
    "name": "CALLEI Bitter Ganache Kaplama Sosu 1kg",
    "code": "CAL-BGN-1000",
    "codeGroup": "CALLEI",
    "categoryId": "cat-5",
    "categoryName": "Kremalı Ürünler",
    "categorySlug": "kremali-urunler",
    "description": "Ayna parlaklığında bitter çikolatalı ganaj kaplama ve pasta dolgu kreması.",
    "imageUrl": "/resimler/p9/p9_1.png",
    "isActive": True,
    "isFeatured": True,
    "price": 0,
    "vatRate": 20,
    "order": 122,
    "tags": ["CALLEI", "Bitter Ganaj", "Ganache", "Pasta Kaplama", "Çikolata"],
    "specs": { "Gramaj": "1 kg", "Kullanım": "Pasta Kaplama, Ganaj, Truffle", "Menşei": "Türkiye" }
  },
  {
    "id": "prod-krm-4",
    "name": "CALLEI Fildişi Beyaz Ganache Sosu 1kg",
    "code": "CAL-WGN-1000",
    "codeGroup": "CALLEI",
    "categoryId": "cat-5",
    "categoryName": "Kremalı Ürünler",
    "categorySlug": "kremali-urunler",
    "description": "İpeksi beyaz çikolata dokulu ganaj; renklendirilebilir ve kolayca şekil alır.",
    "imageUrl": "/resimler/p10/p10_3.png",
    "isActive": True,
    "isFeatured": False,
    "price": 0,
    "vatRate": 20,
    "order": 123,
    "tags": ["CALLEI", "Beyaz Ganaj", "White Ganache", "Pastacılık"],
    "specs": { "Gramaj": "1 kg", "Kullanım": "Pasta Kaplama, Şeker Hamuru Altı Sıvama", "Menşei": "Türkiye" }
  }
]

all_products = products + extra_products

# Count per category
counts = {}
for p in all_products:
    cslug = p["categorySlug"]
    counts[cslug] = counts.get(cslug, 0) + 1

print("Category counts:", counts)

categories = [
  {
    "id": "cat-1",
    "name": "Püreler & Meyve Miksleri",
    "slug": "pureler",
    "description": "Caffè NONNO Frozen püreleri, DaVinci Fruit Mix ve Krater meyve karışımlarından oluşan zengin bar ve pastacılık koleksiyonumuz.",
    "icon": "🍓",
    "productCount": counts.get("pureler", 42),
    "imageUrl": "/resimler/pt1/pt1_1.png",
    "order": 1,
    "isActive": True,
  },
  {
    "id": "cat-2",
    "name": "Şuruplar",
    "slug": "suruplar",
    "description": "DaVinci Gourmet, Caffè NONNO ve Monte Cristo aromalı kahve, kokteyl ve barista şurupları.",
    "icon": "🍯",
    "productCount": counts.get("suruplar", 36),
    "imageUrl": "/resimler/p4/p4_1.png",
    "order": 2,
    "isActive": True,
  },
  {
    "id": "cat-3",
    "name": "Waffle & Krep Çikolataları",
    "slug": "waffle-malzemeleri",
    "description": "CALLEI sürülebilir renkli kremalar, hazır waffle tozu, draje ve krokan süsleme çeşitleri.",
    "icon": "🧇",
    "productCount": counts.get("waffle-malzemeleri", 18),
    "imageUrl": "/resimler/p10/p10_1.png",
    "order": 3,
    "isActive": True,
  },
  {
    "id": "cat-4",
    "name": "Tatlı & Bar Sosları",
    "slug": "tatli-soslar",
    "description": "DaVinci 2L ve Caffè NONNO 750g karamel, çikolata, beyaz çikolata ve meyve sosları.",
    "icon": "🍫",
    "productCount": counts.get("tatli-soslar", 15),
    "imageUrl": "/resimler/p6/p6_7.png",
    "order": 4,
    "isActive": True,
  },
  {
    "id": "cat-5",
    "name": "Donuk Pasta & Unlu Mamuller",
    "slug": "donuk-pasta",
    "description": "Kafeterya ve restoranlar için pratik, lezzetli donuk tuzlu kurabiyeler, poğaçalar ve unlu mamuller.",
    "icon": "🎂",
    "productCount": counts.get("donuk-pasta", 4),
    "imageUrl": "/resimler/pt11/pt11_1.png",
    "order": 5,
    "isActive": True,
  },
  {
    "id": "cat-6",
    "name": "Kremalı Ürünler & Pastacılık",
    "slug": "kremali-urunler",
    "description": "Chantilly, ganaj ve profesyonel pastacılık krema hammaddeleri.",
    "icon": "🍰",
    "productCount": counts.get("kremali-urunler", 4),
    "imageUrl": "/resimler/p9/p9_1.png",
    "order": 6,
    "isActive": True,
  },
]

ts_content = f"""/**
 * Mock data for 20:45 Pastacılık catalog.
 * Generated with 100% accurate Turkish naming, categories, specs, and local image paths.
 * Total {len(categories)} categories and {len(all_products)} products.
 */

import type {{ Category, Product }} from "@/lib/types";
export type {{ Category, Product }};

export const CATEGORIES: Category[] = {json.dumps(categories, ensure_ascii=False, indent=2)};

const RAW_PRODUCTS = {json.dumps(all_products, ensure_ascii=False, indent=2)};

export const PRODUCTS: Product[] = RAW_PRODUCTS.map((p, i) => ({{
  id: p.id,
  name: p.name,
  code: p.code,
  codeGroup: p.codeGroup || "",
  categoryId: p.categoryId,
  categoryName: p.categoryName,
  categorySlug: p.categorySlug,
  description: p.description,
  imageUrl: p.imageUrl,
  price: p.price ?? 0,
  vatRate: p.vatRate ?? 20,
  order: p.order ?? (i + 1),
  isActive: p.isActive ?? true,
  isFeatured: p.isFeatured ?? false,
  tags: p.tags ?? [],
  specs: p.specs ?? {{}},
}}));

/* ─── Helper Functions ──────────────────────────────────────────────────────── */

export function getProductsByCategory(categorySlug: string): Product[] {{
  return PRODUCTS.filter((p) => p.categorySlug === categorySlug && p.isActive);
}}

export function getFeaturedProducts(limit = 10): Product[] {{
  return PRODUCTS.filter((p) => p.isFeatured && p.isActive).slice(0, limit);
}}

export function getProductById(id: string): Product | undefined {{
  return PRODUCTS.find((p) => p.id === id);
}}

export function getProductByCode(code: string): Product | undefined {{
  return PRODUCTS.find((p) => p.code.toLowerCase() === code.toLowerCase());
}}

export function getRelatedProducts(product: Product, limit = 5): Product[] {{
  return PRODUCTS
    .filter((p) => p.id !== product.id && p.categorySlug === product.categorySlug && p.isActive)
    .slice(0, limit);
}}

export function getCategoryBySlug(slug: string): Category | undefined {{
  return CATEGORIES.find((c) => c.slug === slug);
}}
"""

with open(r"c:\Users\Felina\Downloads\yirmikirbes\lib\mock-data.ts", "w", encoding="utf-8") as f:
    f.write(ts_content)

print("Successfully wrote lib/mock-data.ts!")
