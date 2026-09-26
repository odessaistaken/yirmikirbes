/**
 * clean-all-product-names.mjs
 *
 * 1. Marka Adı Temizliği:
 *    Ürün adı ait olduğu markanın adıyla başlıyorsa (DAVİNCİ GOURMET, CAFFÈ NONNO,
 *    CALLEİ, EASY MIX, KRATER, MONTE CRİSTO vb.) bu marka ön eki silinir.
 *
 * 2. Pasta / Donuk / Butik Kategorisi Temizliği:
 *    "Taze Butik ve Donuk Pastalar" (veya pasta/donuk unlu mamuller) kategorilerindeki
 *    ürünlerin adında geçen "taze", "butik", "donuk" kelimeleri temizlenir.
 *
 * Kullanım:
 *   node scripts/clean-all-product-names.mjs --dry-run   (Önizleme modu)
 *   node scripts/clean-all-product-names.mjs             (Firestore & JSON dosyalarını güncelle)
 */

import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  setDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import fs from "fs";
import path from "path";

/* ── Firebase Bağlantısı ─────────────────────────────────────────────────── */
const firebaseConfig = {
  apiKey: "AIzaSyARd2f0Fea3_3Rie1BdNqg-oiFDUnMQP7Y",
  authDomain: "project-6884460393570611503.firebaseapp.com",
  projectId: "project-6884460393570611503",
  storageBucket: "project-6884460393570611503.firebasestorage.app",
  messagingSenderId: "897409225916",
  appId: "1:897409225916:web:a982cd3bb5733befb22cb9",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const DRY_RUN = process.argv.includes("--dry-run");

/* ── Marka Ön Ekleri (Büyükten küçüğe sıralanacak) ───────────────────────── */
const BRAND_PREFIXES = [
  "DAVİNCİ GOURMET",
  "DAVINCI GOURMET",
  "DaVinci Gourmet",
  "Davinci Gourmet",
  "davinci gourmet",
  "DaVinci",
  "Davinci",

  "CAFFÈ NONNO",
  "CAFFE NONNO",
  "Caffè NONNO",
  "Caffe NONNO",
  "Caffe Nonno",
  "caffè nonno",
  "caffe nonno",
  "NONNO",
  "Nonno",

  "CALLEİ",
  "CALLEI",
  "Callei",
  "Calle",
  "callei",

  "EASY MIX",
  "Easy Mix",
  "EasyMix",
  "easymix",
  "easy mix",

  "KRATER",
  "Krater",
  "krater",

  "MONTE CRİSTO",
  "MONTE CRISTO",
  "Monte Cristo",
  "Monte Christo",
  "monte cristo",
  "Monte",
];

/**
 * Ürünün pasta / unlu mamul kategorisinde olup olmadığını belirler
 */
function isPastaOrBakery(product) {
  const catName = (product.categoryName || "").toLocaleLowerCase("tr-TR");
  const catSlug = (product.categorySlug || "").toLocaleLowerCase("tr-TR");
  const codeGroup = (product.codeGroup || "").toLocaleLowerCase("tr-TR");
  const prodId = (product.id || "");

  return (
    catName.includes("pasta") ||
    catSlug.includes("pasta") ||
    codeGroup.includes("pasta") ||
    catName.includes("donuk") ||
    catSlug.includes("donuk") ||
    catName.includes("butik") ||
    catSlug.includes("butik") ||
    prodId.startsWith("prod-pt11-") ||
    prodId === "prod-pt18-12"
  );
}

/**
 * Ürün adını temizleme kuralı
 */
function cleanProductName(product) {
  let name = (product.name || "").trim();
  const original = name;

  // 1. Marka ön eki temizleme
  const sortedBrands = [...BRAND_PREFIXES].sort((a, b) => b.length - a.length);
  for (const b of sortedBrands) {
    const bLower = b.toLocaleLowerCase("tr-TR");
    const nameLower = name.toLocaleLowerCase("tr-TR");
    if (nameLower.startsWith(bLower)) {
      const remainder = name.slice(b.length).replace(/^[\s\-–—/]+/, "").trim();
      if (remainder.length > 0) {
        name = remainder;
        break;
      }
    }
  }

  // 2. Pasta / donuk / butik kategorilerinde "taze", "butik", "donuk" kelimelerini temizle
  if (isPastaOrBakery(product)) {
    // Turkish case-insensitive whole word regex for: taze, butik, donuk
    const pattern = /(?:^|(?<=[\s\-–—/]))(?:taze|but[iİıI]k|donuk)(?=[\s\-–—/]|$)/gi;
    name = name.replace(pattern, "");

    // Boşluk ve tire temizliği
    name = name
      .replace(/\s+/g, " ")
      .replace(/^[\s\-–—/]+/, "")
      .replace(/[\s\-–—/]+$/, "")
      .trim();
  }

  // İlk harfi Türkçe kurallarına göre büyüt
  if (name.length > 0) {
    name = name.charAt(0).toLocaleUpperCase("tr-TR") + name.slice(1);
  }

  return {
    isChanged: name !== original,
    oldName: original,
    newName: name,
  };
}

async function main() {
  console.log(`\n======================================================`);
  console.log(`🧹  ÜRÜN İSİMLERİ TEMİZLEME ARACI ${DRY_RUN ? "[DRY-RUN]" : "[CANLI GÜNCELLEME]"}`);
  console.log(`======================================================\n`);

  console.log("Firestore'dan ürünler çekiliyor...");
  const snap = await getDocs(collection(db, "products"));
  const products = snap.docs.map((d) => ({ _docId: d.id, ...d.data() }));

  console.log(`Toplam ${products.length} ürün bulundu.\n`);

  let updateCount = 0;
  let unchangedCount = 0;
  const idToNewNameMap = new Map();

  for (const p of products) {
    const result = cleanProductName(p);

    if (result.isChanged) {
      updateCount++;
      idToNewNameMap.set(p.id, result.newName);

      console.log(`✏️  [${p.id}] (${p.categoryName || "Kategori Belirtilmemiş"})`);
      console.log(`    Önce : ${result.oldName}`);
      console.log(`    Sonra: ${result.newName}\n`);

      if (!DRY_RUN) {
        await setDoc(
          doc(db, "products", p._docId),
          {
            name: result.newName,
            updatedAt: serverTimestamp(),
          },
          { merge: true }
        );
      }
    } else {
      unchangedCount++;
    }
  }

  console.log(`------------------------------------------------------`);
  console.log(`✅  Değişen Ürün Sayısı   : ${updateCount}`);
  console.log(`⏭️   Değişmeyen Ürün Sayısı: ${unchangedCount}`);
  console.log(`📦  Toplam Ürün Sayısı    : ${products.length}`);
  console.log(`------------------------------------------------------\n`);

  if (!DRY_RUN) {
    // Yerel products_json.json dosyasını da senkronize edelim
    const jsonPath = path.resolve("products_json.json");
    if (fs.existsSync(jsonPath)) {
      try {
        const rawJson = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
        let localUpdated = 0;
        const updatedJson = rawJson.map((item) => {
          if (idToNewNameMap.has(item.id)) {
            localUpdated++;
            return { ...item, name: idToNewNameMap.get(item.id) };
          }
          return item;
        });
        fs.writeFileSync(jsonPath, JSON.stringify(updatedJson, null, 2), "utf-8");
        console.log(`💾  'products_json.json' senkronize edildi (${localUpdated} ürün güncellendi).`);
      } catch (err) {
        console.warn("products_json.json güncellenirken hata:", err.message);
      }
    }

    // Yerel lib/mock-data.ts dosyasını da senkronize edelim
    const mockDataPath = path.resolve("lib/mock-data.ts");
    if (fs.existsSync(mockDataPath)) {
      try {
        let mockContent = fs.readFileSync(mockDataPath, "utf-8");
        let mockUpdated = 0;
        for (const [id, newName] of idToNewNameMap.entries()) {
          // name: "old" pattern in mock-data
          // let's do a safe string replacement for the product object
          const idRegex = new RegExp(`(id:\\s*["']${id}["'][\\s\\S]*?name:\\s*["'])([^"']+)(["'])`);
          if (idRegex.test(mockContent)) {
            mockContent = mockContent.replace(idRegex, `$1${newName}$3`);
            mockUpdated++;
          }
        }
        fs.writeFileSync(mockDataPath, mockContent, "utf-8");
        console.log(`💾  'lib/mock-data.ts' senkronize edildi (${mockUpdated} ürün güncellendi).`);
      } catch (err) {
        console.warn("lib/mock-data.ts güncellenirken hata:", err.message);
      }
    }

    console.log(`\n🎉  Tüm veritabanı başarıyla güncellendi!`);
  } else {
    console.log(`ℹ️   Bu bir önizlemedir. Değişiklikleri kaydetmek için '--dry-run' olmadan çalıştırın.`);
  }
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("❌  Hata:", err);
    process.exit(1);
  });
