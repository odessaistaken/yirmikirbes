import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDocs, collection, setDoc, serverTimestamp } from "firebase/firestore";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { PDF_DEFINITIONS } from "./pdf-definitions.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

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

// Helper for Turkish uppercase
function trUpper(str) {
  return (str || '').toLocaleUpperCase('tr-TR').trim();
}

async function main() {
  console.log("Connecting to Firestore...");
  const snap = await getDocs(collection(db, "products"));
  console.log(`Loaded ${snap.docs.length} products from Firestore.`);

  // Build lookup maps for PDF definitions
  const defByName = new Map();
  const defByCode = new Map();
  const defByImage = new Map();

  for (const def of PDF_DEFINITIONS) {
    defByName.set(trUpper(def.canonicalName), def);
    for (const n of def.matchNames) {
      defByName.set(trUpper(n), def);
    }
    for (const c of def.matchCodes) {
      defByCode.set(c.toUpperCase(), def);
    }
    for (const img of def.matchImages) {
      defByImage.set(img.toLowerCase(), def);
    }
  }

  // Also read updated mock-products.json
  const mockProds = JSON.parse(fs.readFileSync(path.join(__dirname, "mock-products.json"), "utf8"));
  const mockById = new Map();
  for (const mp of mockProds) {
    mockById.set(mp.id, mp);
  }

  let updatedCount = 0;

  for (const d of snap.docs) {
    const data = d.data();
    const prodId = data.id || d.id;
    const pName = trUpper(data.name);
    const pCode = (data.code || "").toUpperCase().trim();
    const pImg = data.imageUrl ? path.basename(data.imageUrl, path.extname(data.imageUrl)).toLowerCase() : "";

    // 1. Check if it's in mockProds and mockProds was updated with PDF info
    const mockProd = mockById.get(prodId);

    // 2. Also check if this Firestore product matches any PDF definition directly
    let def = defByName.get(pName);
    if (!def) def = defByCode.get(pCode);
    if (!def && (data.categorySlug === 'donuk-pasta' || data.categorySlug === 'taze-butik-pastalar' || data.categorySlug === 'cup-tatlilar')) {
      def = defByImage.get(pImg);
    }

    // Determine what to update
    const updatePayload = {};

    if (def) {
      updatePayload.description = def.description;
      updatePayload.specs = {
        ...(data.specs || {}),
        "İçindekiler": def.ingredients.join(", "),
        "Net Miktar": def.netMiktar.toUpperCase(),
        "Porsiyon": def.porsiyon,
        "Kutu İçi Adet": String(def.kutuAdet),
        "Koli İçi Adet": String(def.koliAdet),
        "Raf Ömrü": def.rafOmru,
      };
      // If product has a placeholder or generic name, and matches a canonical definition
      if (data.name === 'İSİM EKSİK' || data.name === '"İSİM EKSİK"') {
        updatePayload.name = def.canonicalName;
      }
    } else if (mockProd && mockProd.description && mockProd.description !== data.description) {
      updatePayload.description = mockProd.description;
      if (mockProd.specs) {
        updatePayload.specs = mockProd.specs;
      }
    }

    if (Object.keys(updatePayload).length > 0) {
      updatePayload.updatedAt = serverTimestamp();
      await setDoc(doc(db, "products", d.id), updatePayload, { merge: true });
      updatedCount++;
      console.log(`✅ [${d.id}] "${data.name}" -> Updated description (${def ? def.canonicalName : 'from mock'})`);
    }
  }

  console.log(`\n🎉 Successfully updated ${updatedCount} products in Firestore!`);
}

main().catch(console.error);
