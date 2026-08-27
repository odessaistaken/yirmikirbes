import os
import re
import json

# Read lib/mock-data.ts
with open(r"lib\mock-data.ts", "r", encoding="utf-8") as f:
    mock_content = f.read()

match_raw = re.search(r'const RAW_PRODUCTS = (\[[\s\S]*?\n\]);', mock_content)
if not match_raw:
    print("Could not find RAW_PRODUCTS")
    exit(1)

raw_products = json.loads(match_raw.group(1))

# Convert to ALL_PRODUCTS format for seed-all-products.mjs
# Mapping category slugs to keys:
slug_to_key = {
    "pureler": "pureler",
    "suruplar": "suruplar",
    "waffle-malzemeleri": "waffle-sos",
    "tatli-soslar": "bar-sos",
    "donuk-pasta": "donuk-pasta",
    "kremali-urunler": "waffle-sos",
    "cookies-kurabiye": "cookies-kurabiye",
    "waffle-kek": "waffle-kek",
    "waffle": "waffle",
    "waffle-sos": "waffle-sos",
    "waffle-susleme": "waffle-susleme",
    "bar-sos": "bar-sos",
    "taze-pasta": "taze-pasta",
    "kahveler": "kahveler",
    "bitki-caylari": "bitki-caylari"
}

seed_products = []
for p in raw_products:
    cslug = p.get("categorySlug", "donuk-pasta")
    ckey = slug_to_key.get(cslug, "donuk-pasta")
    sp = {
        "name": p.get("name", ""),
        "code": p.get("code", ""),
        "codeGroup": p.get("codeGroup", ""),
        "categoryKey": ckey,
        "imageUrl": p.get("imageUrl", ""),
        "description": p.get("description", ""),
        "tags": p.get("tags", []),
        "specs": p.get("specs", {}),
        "isFeatured": p.get("isFeatured", False)
    }
    seed_products.append(sp)

seed_file_content = f"""import {{ initializeApp }} from "firebase/app";
import {{ getFirestore, setDoc, doc, serverTimestamp, getDocs, collection, deleteDoc }} from "firebase/firestore";

const firebaseConfig = {{
  apiKey: "AIzaSyARd2f0Fea3_3Rie1BdNqg-oiFDUnMQP7Y",
  authDomain: "project-6884460393570611503.firebaseapp.com",
  projectId: "project-6884460393570611503",
  storageBucket: "project-6884460393570611503.firebasestorage.app",
  messagingSenderId: "897409225916",
  appId: "1:897409225916:web:a982cd3bb5733befb22cb9",
}};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Category mapping matching seeded categories in Firestore
const CATEGORIES_MAP = {{
  "suruplar": {{ id: "cat-1787620072902-12", name: "Şuruplar", slug: "suruplar" }},
  "pureler": {{ id: "cat-1787620073244-13", name: "Püreler", slug: "pureler" }},
  "waffle": {{ id: "cat-1787620070903-6", name: "Waffle", slug: "waffle" }},
  "waffle-kek": {{ id: "cat-1787620071247-7", name: "Waffle Kek", slug: "waffle-kek" }},
  "waffle-sos": {{ id: "cat-1787620071578-8", name: "Waffle Sos", slug: "waffle-sos" }},
  "waffle-susleme": {{ id: "cat-1787620071918-9", name: "Waffle Süsleme", slug: "waffle-susleme" }},
  "bar-sos": {{ id: "cat-1787620072589-11", name: "Bar Sos", slug: "bar-sos" }},
  "cookies-kurabiye": {{ id: "cat-1787620070579-5", name: "Cookies - Kurabiye", slug: "cookies-kurabiye" }},
  "donuk-pasta": {{ id: "cat-1787620068687-0", name: "Donuk Pasta", slug: "donuk-pasta" }},
  "taze-pasta": {{ id: "cat-1787620069218-1", name: "Taze Pasta", slug: "taze-pasta" }},
  "kahveler": {{ id: "cat-1787620073556-14", name: "Kahveler", slug: "kahveler" }},
  "bitki-caylari": {{ id: "cat-1787620073977-15", name: "Bitki Çayları", slug: "bitki-caylari" }},
}};

export const ALL_PRODUCTS = {json.dumps(seed_products, indent=2, ensure_ascii=False)};

export const BRANDS_DATA = [
  {{ name: "DaVinci Gourmet", subtitle: "Dünya Standartlarında Barista Şurupları & Püreler", order: 1, targetUrl: "/katalog?search=davinci", imageUrl: "", isActive: true }},
  {{ name: "Caffè NONNO", subtitle: "İtalyan Reçeteli Kahve Şurupları & Frozen Püreleri", order: 2, targetUrl: "/katalog?search=nonno", imageUrl: "", isActive: true }},
  {{ name: "Monte Cristo", subtitle: "Gurme Bar Şurupları & Profesyonel Dekor Sosları", order: 3, targetUrl: "/katalog?search=monte-cristo", imageUrl: "", isActive: true }},
  {{ name: "CALLEI Chocolate", subtitle: "Waffle, Krep & Dondurma Çikolata Kremaları & Waffle Mix", order: 4, targetUrl: "/katalog?search=callei", imageUrl: "", isActive: true }},
  {{ name: "EASY MIX Premixes", subtitle: "Doğal Meyve & Botanik Kokteyl Premiksleri", order: 5, targetUrl: "/katalog?search=easy%20mix", imageUrl: "", isActive: true }},
  {{ name: "Krater", subtitle: "Maestro del Gelato Pastacılık & Dondurma Meyve Karışımları", order: 6, targetUrl: "/katalog?search=krater", imageUrl: "", isActive: true }}
];

async function seed() {{
  console.log("Seeding brands...");
  const brandSnap = await getDocs(collection(db, "brands"));
  for (const docSnap of brandSnap.docs) {{
    await deleteDoc(doc(db, "brands", docSnap.id));
  }}
  for (let i = 0; i < BRANDS_DATA.length; i++) {{
    const b = BRANDS_DATA[i];
    const id = `brand-${{i + 1}}`;
    await setDoc(doc(db, "brands", id), {{
      ...b,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    }});
    console.log(`✓ Brand: ${{b.name}}`);
  }}

  console.log(`\\nSeeding ${{ALL_PRODUCTS.length}} products...`);
  const prodSnap = await getDocs(collection(db, "products"));
  for (const docSnap of prodSnap.docs) {{
    await deleteDoc(doc(db, "products", docSnap.id));
  }}

  for (let i = 0; i < ALL_PRODUCTS.length; i++) {{
    const p = ALL_PRODUCTS[i];
    const cat = CATEGORIES_MAP[p.categoryKey] || CATEGORIES_MAP["donuk-pasta"];
    const id = `prod-${{p.code.toLowerCase().replace(/[^a-z0-9]+/g, "-")}}-${{i + 1}}`;

    const productDoc = {{
      name: p.name,
      code: p.code,
      codeGroup: p.codeGroup,
      categoryId: cat.id,
      categoryName: cat.name,
      categorySlug: cat.slug,
      price: 0,
      vatRate: 20,
      order: i + 1,
      description: p.description,
      imageUrl: p.imageUrl,
      isActive: true,
      isFeatured: p.isFeatured || false,
      tags: p.tags,
      specs: p.specs || {{}},
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    }};

    await setDoc(doc(db, "products", id), productDoc);
    console.log(`[${{i + 1}}/${{ALL_PRODUCTS.length}}] ✓ ${{p.name}} (${{cat.name}})`);
  }}

  console.log("\\n🎉 All products and brands successfully seeded into Firestore!");
}}

seed().catch(console.error);
"""

with open(r"scripts\seed-all-products.mjs", "w", encoding="utf-8") as f:
    f.write(seed_file_content)

print(f"Updated scripts/seed-all-products.mjs with {len(raw_products)} products successfully!")
