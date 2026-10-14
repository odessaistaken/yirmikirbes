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
  const mapping = JSON.parse(fs.readFileSync("scratch/complete_cake_sync.json", "utf8"));
  const mapById = new Map();
  for (const item of mapping) {
    mapById.set(item.id, item);
  }

  console.log("Fetching products from Firestore...");
  const snap = await getDocs(collection(db, "products"));
  console.log(`Found ${snap.docs.length} products in Firestore.`);

  let updatedCount = 0;
  for (const d of snap.docs) {
    const data = d.data();
    const prodId = data.id || d.id;
    const match = mapById.get(prodId);

    if (match) {
      updatedCount++;
      await setDoc(
        doc(db, "products", d.id),
        {
          name: match.new_name,
          price: match.fiyat || data.price,
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );
      console.log(`✅ [${prodId}] "${data.name}" -> "${match.new_name}" (Fiyat: ${match.fiyat})`);
    }
  }

  console.log(`\n🎉 Toplam ${updatedCount} ürün Firestore'da başarıyla güncellendi!`);
}

main().catch(console.error);
