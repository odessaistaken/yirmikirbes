import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, updateDoc, serverTimestamp } from "firebase/firestore";
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

const mapping = JSON.parse(fs.readFileSync("scripts/brand-canonical-mapping.json", "utf8"));

const catUpdates = {
  "cat-brand-davinci": "/beyazresimler/karisik/karisik_041.png",
  "cat-1792159145530": "/beyazresimler/karisik/karisik_041.png",
  "cat-1792159702988": "/beyazresimler/karisik/karisik_006.png",
  "cat-1792159660497": "/beyazresimler/karisik/karisik_004.png",
  "cat-brand-nonno": "/beyazresimler/karisik/karisik_021.png",
  "cat-1792159460097": "/beyazresimler/karisik/karisik_021.png",
  "cat-1792159899479": "/beyazresimler/karisik/karisik_011.png",
  "cat-caffe-nonno-bar-soslar": "/beyazresimler/karisik/karisik_051.png",
  "cat-brand-montecristo": "/beyazresimler/karisik/karisik_114.png",
  "cat-1792159526675": "/beyazresimler/karisik/karisik_114.png",
};

async function main() {
  console.log("=== 1. UPDATING FIRESTORE CATEGORIES ===");
  for (const [id, imageUrl] of Object.entries(catUpdates)) {
    try {
      await updateDoc(doc(db, "categories", id), {
        imageUrl,
        updatedAt: serverTimestamp(),
      });
      console.log(`✓ Category ${id} -> imageUrl: ${imageUrl}`);
    } catch (err) {
      console.error(`✗ Error updating category ${id}:`, err.message);
    }
  }

  console.log("\n=== 2. UPDATING FIRESTORE PRODUCTS ===");
  const snap = await getDocs(collection(db, "products"));
  let updatedProducts = 0;

  for (const docSnap of snap.docs) {
    const data = docSnap.data();
    const code = data.code;
    if (code && mapping[code]) {
      const canonicalName = mapping[code];
      let brand = data.brand;
      let codeGroup = data.codeGroup;
      if (code.startsWith("DVG")) {
        brand = "DaVinci Gourmet";
        codeGroup = "DaVinci Gourmet";
      } else if (code.startsWith("NON")) {
        brand = "Caffè NONNO";
        codeGroup = "Caffè NONNO";
      } else if (code.startsWith("MCR")) {
        brand = "Monte Cristo";
        codeGroup = "Monte Cristo";
      }

      await updateDoc(doc(db, "products", docSnap.id), {
        name: canonicalName,
        brand,
        codeGroup,
        updatedAt: serverTimestamp(),
      });
      console.log(`✓ Product [${docSnap.id}] ${code} -> "${canonicalName}"`);
      updatedProducts++;
    }
  }

  console.log(`\n🎉 Successfully updated ${updatedProducts} products in Firestore!`);
  process.exit(0);
}

main().catch(err => {
  console.error("Fatal error:", err);
  process.exit(1);
});
