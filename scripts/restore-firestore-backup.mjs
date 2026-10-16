import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, serverTimestamp, Timestamp } from "firebase/firestore";
import fs from "fs";
import path from "path";

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

function restoreTimestamps(val) {
  if (!val) return val;
  if (typeof val === "object" && val._type === "timestamp" && typeof val.seconds === "number") {
    return new Timestamp(val.seconds, val.nanoseconds || 0);
  }
  if (Array.isArray(val)) {
    return val.map(restoreTimestamps);
  }
  if (typeof val === "object") {
    const res = {};
    for (const [k, v] of Object.entries(val)) {
      res[k] = restoreTimestamps(v);
    }
    return res;
  }
  return val;
}

async function runRestore() {
  const backupFile = process.argv[2] || "backups/firebase/firestore_backup_latest.json";
  const resolvedPath = path.resolve(backupFile);

  if (!fs.existsSync(resolvedPath)) {
    console.error(`❌ Yedek dosyası bulunamadı: ${resolvedPath}`);
    process.exit(1);
  }

  const backupData = JSON.parse(fs.readFileSync(resolvedPath, "utf8"));
  console.log(`\n========================================`);
  console.log(`🔄 FIREBASE FIRESTORE GERİ YÜKLEME`);
  console.log(`Dosya: ${resolvedPath}`);
  console.log(`Yedekleme Zamanı: ${backupData.metadata?.backupTimeLocal || backupData.metadata?.timestamp}`);
  console.log(`Hedef Proje: ${firebaseConfig.projectId}`);
  console.log(`========================================\n`);

  let restoredTotal = 0;

  for (const [colName, docs] of Object.entries(backupData.collections || {})) {
    if (!Array.isArray(docs) || docs.length === 0) continue;
    console.log(`Koleksiyon geri yükleniyor: "${colName}" (${docs.length} doküman)...`);

    for (const docItem of docs) {
      const docId = docItem._id || docItem.id;
      if (!docId) continue;

      const dataToSave = { ...docItem };
      delete dataToSave._id;

      const parsedData = restoreTimestamps(dataToSave);
      await setDoc(doc(db, colName, docId), parsedData, { merge: true });
      restoredTotal++;
    }
    console.log(`✓ "${colName}" tamamlandı.`);
  }

  console.log(`\n========================================`);
  console.log(`✅ GERİ YÜKLEME TAMAMLANDI!`);
  console.log(`Toplam ${restoredTotal} doküman başarıyla geri yüklendi.`);
  console.log(`========================================\n`);
}

runRestore()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Geri yükleme başarısız:", err);
    process.exit(1);
  });
