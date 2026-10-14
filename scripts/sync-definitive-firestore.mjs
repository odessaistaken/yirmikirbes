import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, setDoc, serverTimestamp } from "firebase/firestore";
import fs from "fs";

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

async function main() {
  const products = JSON.parse(fs.readFileSync("scratch/products_to_sync_firestore.json", "utf8"));
  const mapping = JSON.parse(fs.readFileSync("scratch/definitive_mapping.json", "utf8"));

  // Build a lookup map by imageUrl
  const prodsByImage = new Map();
  for (const p of products) {
    if (p.imageUrl && mapping[p.imageUrl]) {
      prodsByImage.set(p.imageUrl, p);
    }
  }

  // Also lookup by id
  const prodsById = new Map();
  for (const p of products) {
    if (p.id) {
      prodsById.set(p.id, p);
    }
  }

  console.log(`Connecting to Firestore, searching 'products' collection...`);
  const snap = await getDocs(collection(db, "products"));
  console.log(`Found ${snap.docs.length} existing products in Firestore.`);

  let updatedCount = 0;
  for (const d of snap.docs) {
    const data = d.data();
    const prodId = data.id || d.id;
    const prodImg = data.imageUrl;

    const matchedProd = (prodImg && prodsByImage.get(prodImg)) || prodsById.get(prodId);

    if (matchedProd && mapping[matchedProd.imageUrl]) {
      const m = mapping[matchedProd.imageUrl];
      updatedCount++;

      const updateData = {
        name: matchedProd.name,
        price: matchedProd.price,
        categoryId: matchedProd.categoryId,
        categorySlug: matchedProd.categorySlug,
        categoryName: matchedProd.categoryName,
        description: matchedProd.description,
        tags: matchedProd.tags,
        specs: matchedProd.specs,
        updatedAt: serverTimestamp(),
      };

      await setDoc(doc(db, "products", d.id), updateData, { merge: true });
      console.log(`✅ [${prodId}] "${data.name}" -> "${matchedProd.name}" (₺${matchedProd.price}, ${matchedProd.specs?.Porsiyon})`);
    }
  }

  console.log(`\n🎉 Toplam ${updatedCount} ürün Firestore veritabanında kesinleşen Excel verileriyle güncellendi!`);
}

main().catch(console.error);
