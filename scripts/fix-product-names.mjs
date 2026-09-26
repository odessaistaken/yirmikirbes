/**
 * fix-product-names.mjs
 *
 * Firestore'daki tüm ürünleri tarar.
 * Eğer bir ürünün adı, ait olduğu markanın adıyla başlıyorsa,
 * bu marka önekini ürün adının başından siler.
 *
 * Çalıştır:
 *   node scripts/fix-product-names.mjs
 *
 * Güvenli önizleme modu (değişiklikleri göster, kaydetme):
 *   node scripts/fix-product-names.mjs --dry-run
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

/* ── Firebase yapılandırması ─────────────────────────────────────────────── */
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

/* ── Marka önekleri (büyük/küçük harf bağımsız karşılaştırma) ───────────── */
// Hem kategori listesindeki resmi adlar hem de ürün adlarında
// görülebilecek varyantlar buraya eklenir.
const BRAND_PREFIXES = [
  // Resmi kategori/marka adları
  "DAVİNCİ GOURMET",
  "CAFFÈ NONNO",
  "CALLEİ",
  "EASY MIX",
  "KRATER",
  "MONTE CRİSTO",

  // Ürün adlarında görülen yazım varyantları
  "DaVinci Gourmet",
  "Davinci Gourmet",
  "davinci gourmet",
  "Caffè NONNO",
  "Caffe NONNO",
  "Caffe Nonno",
  "caffè nonno",
  "caffe nonno",
  "Callei",
  "CALLEI",
  "Easy Mix",
  "EasyMix",
  "easy mix",
  "Krater",
  "krater",
  "Monte Cristo",
  "Monte Christo",
  "monte cristo",
];

const DRY_RUN = process.argv.includes("--dry-run");

/**
 * Ürün adının başındaki marka önekini kaldırır.
 * En uzun eşleşeni önce dener (alt string çakışmalarını önler).
 * @returns {string|null} Yeni ad ya da değişiklik yoksa null
 */
function stripBrandPrefix(productName) {
  const nameLower = productName.toLowerCase();

  // Uzunluğa göre azalan sırada dene
  const sorted = [...BRAND_PREFIXES].sort((a, b) => b.length - a.length);

  for (const prefix of sorted) {
    const prefixLower = prefix.toLowerCase();
    if (nameLower.startsWith(prefixLower)) {
      const stripped = productName.slice(prefix.length).trimStart();
      if (stripped.length > 0) {
        return stripped;
      }
    }
  }

  return null; // Değişiklik yok
}

async function main() {
  console.log(`\n${DRY_RUN ? "👁️  [DRY-RUN] " : "🚀  "}Firestore ürünleri okunuyor...\n`);

  const snap = await getDocs(collection(db, "products"));
  const products = snap.docs.map((d) => ({ _docId: d.id, ...d.data() }));

  console.log(`📦  Toplam ${products.length} ürün bulundu.\n`);

  let changed = 0;
  let skipped = 0;

  for (const product of products) {
    const originalName = product.name ?? "";
    const newName = stripBrandPrefix(originalName);

    if (newName === null) {
      skipped++;
      continue;
    }

    console.log(`✏️   [${product._docId}]`);
    console.log(`     Önce : ${originalName}`);
    console.log(`     Sonra: ${newName}`);
    console.log();

    if (!DRY_RUN) {
      await setDoc(
        doc(db, "products", product._docId),
        { name: newName, updatedAt: serverTimestamp() },
        { merge: true }
      );
    }

    changed++;
  }

  console.log("─".repeat(60));
  console.log(`✅  Güncellenen : ${changed} ürün`);
  console.log(`⏭️   Değişmeyen  : ${skipped} ürün`);

  if (DRY_RUN) {
    console.log(`\n⚠️  DRY-RUN modu — hiçbir değişiklik kaydedilmedi.`);
    console.log(
      `    Değişiklikleri uygulamak için:\n    node scripts/fix-product-names.mjs\n`
    );
  } else {
    console.log(`\n🎉  Tüm güncellemeler Firestore'a yazıldı.\n`);
  }
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("❌  Hata:", err);
    process.exit(1);
  });
