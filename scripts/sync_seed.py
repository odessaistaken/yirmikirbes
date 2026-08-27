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

match_cats = re.search(r'export const CATEGORIES: Category\[\] = (\[[\s\S]*?\n\]);', mock_content)
if not match_cats:
    print("Could not find CATEGORIES")
    exit(1)

raw_products = json.loads(match_raw.group(1))
categories = json.loads(match_cats.group(1))

seed_products = []
for p in raw_products:
    sp = {
        "id": p.get("id", ""),
        "name": p.get("name", ""),
        "code": p.get("code", ""),
        "codeGroup": p.get("codeGroup", ""),
        "categoryId": p.get("categoryId", "cat-5"),
        "categoryName": p.get("categoryName", "Donuk Pasta & Unlu Mamuller"),
        "categorySlug": p.get("categorySlug", "donuk-pasta"),
        "imageUrl": p.get("imageUrl", ""),
        "description": p.get("description", ""),
        "tags": p.get("tags", []),
        "specs": p.get("specs", {}),
        "isFeatured": p.get("isFeatured", False),
        "price": p.get("price", 0),
        "vatRate": p.get("vatRate", 20)
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

export const CATEGORIES_DATA = {json.dumps(categories, indent=2, ensure_ascii=False)};
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
  console.log("Seeding categories...");
  const catSnap = await getDocs(collection(db, "categories"));
  for (const docSnap of catSnap.docs) {{
    await deleteDoc(doc(db, "categories", docSnap.id));
  }}
  for (const c of CATEGORIES_DATA) {{
    await setDoc(doc(db, "categories", c.id), {{
      name: c.name,
      slug: c.slug,
      description: c.description || "",
      icon: c.icon || "",
      productCount: c.productCount || 0,
      imageUrl: c.imageUrl || "",
      order: c.order || 1,
      isActive: c.isActive !== false,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    }});
    console.log(`✓ Category: ${{c.name}} (${{c.slug}})`);
  }}

  console.log("\\nSeeding brands...");
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
    const id = p.id || `prod-${{p.code.toLowerCase().replace(/[^a-z0-9]+/g, "-")}}-${{i + 1}}`;

    const productDoc = {{
      name: p.name,
      code: p.code,
      codeGroup: p.codeGroup,
      categoryId: p.categoryId,
      categoryName: p.categoryName,
      categorySlug: p.categorySlug,
      price: p.price ?? 0,
      vatRate: p.vatRate ?? 20,
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
    if ((i + 1) % 25 === 0 || i === ALL_PRODUCTS.length - 1) {{
      console.log(`[${{i + 1}}/${{ALL_PRODUCTS.length}}] ✓ ${{p.name}} (${{p.categoryName}})`);
    }}
  }}

  console.log("\\n🎉 All ${{ALL_PRODUCTS.length}} products, categories and brands successfully seeded into Firestore!");
}}

seed().catch(console.error);
"""

with open(r"scripts\seed-all-products.mjs", "w", encoding="utf-8") as f:
    f.write(seed_file_content)

print(f"Updated scripts/seed-all-products.mjs with {len(raw_products)} products and {len(categories)} categories successfully!")
