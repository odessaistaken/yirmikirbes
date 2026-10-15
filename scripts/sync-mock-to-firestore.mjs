/**
 * sync-mock-to-firestore.mjs
 *
 * Reads current product definitions from scripts/mock-products.json
 * and upserts every product into Firestore (products collection).
 *
 * Usage:
 *   node scripts/generate-mock-json.mjs   # first: export mock-data → JSON
 *   node scripts/sync-mock-to-firestore.mjs
 */

import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

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

async function main() {
  const jsonPath = path.join(__dirname, "mock-products.json");
  if (!fs.existsSync(jsonPath)) {
    console.error(
      "❌  mock-products.json not found! Run generate-mock-json.mjs first."
    );
    process.exit(1);
  }

  const products = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
  console.log(`📦  Syncing ${products.length} products to Firestore...`);

  let ok = 0;
  let fail = 0;
  for (const prod of products) {
    try {
      await setDoc(
        doc(db, "products", prod.id),
        { ...prod, updatedAt: serverTimestamp() },
        { merge: true }
      );
      console.log(`  ✅  [${prod.id}] ${prod.name}`);
      ok++;
    } catch (err) {
      console.error(`  ❌  [${prod.id}] ${prod.name} — ${err.message}`);
      fail++;
    }
  }

  console.log(`\n🎉  Done: ${ok} updated, ${fail} failed.`);
  process.exit(fail > 0 ? 1 : 0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
