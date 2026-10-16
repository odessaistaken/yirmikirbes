import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
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

const KNOWN_COLLECTIONS = [
  "products",
  "categories",
  "sliders",
  "brands",
  "inquiries",
  "contact_messages",
  "users",
  "excel_imports",
  "site_settings",
  "settings",
];

function sanitizeTimestamp(val) {
  if (!val) return val;
  if (typeof val === "object" && typeof val.toDate === "function") {
    return {
      _type: "timestamp",
      seconds: val.seconds,
      nanoseconds: val.nanoseconds,
      iso: val.toDate().toISOString(),
    };
  }
  if (Array.isArray(val)) {
    return val.map(sanitizeTimestamp);
  }
  if (typeof val === "object") {
    const res = {};
    for (const [k, v] of Object.entries(val)) {
      res[k] = sanitizeTimestamp(v);
    }
    return res;
  }
  return val;
}

async function runBackup() {
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const backupDir = path.resolve("backups/firebase");
  const collectionsDir = path.join(backupDir, "collections");
  const archiveDir = path.join(backupDir, "history");

  fs.mkdirSync(collectionsDir, { recursive: true });
  fs.mkdirSync(archiveDir, { recursive: true });

  console.log(`\n========================================`);
  console.log(`🔥 FIREBASE FIRESTORE YEDEKLEME BAŞLADI`);
  console.log(`Proje: ${firebaseConfig.projectId}`);
  console.log(`Tarih: ${new Date().toLocaleString("tr-TR")}`);
  console.log(`========================================\n`);

  const fullBackup = {
    metadata: {
      projectId: firebaseConfig.projectId,
      timestamp: new Date().toISOString(),
      backupTimeLocal: new Date().toLocaleString("tr-TR"),
      version: "1.0",
    },
    collections: {},
    stats: {},
  };

  let totalDocs = 0;

  for (const colName of KNOWN_COLLECTIONS) {
    try {
      const snap = await getDocs(collection(db, colName));
      const docs = [];
      for (const d of snap.docs) {
        docs.push({
          _id: d.id,
          ...sanitizeTimestamp(d.data()),
        });
      }

      fullBackup.collections[colName] = docs;
      fullBackup.stats[colName] = docs.length;
      totalDocs += docs.length;

      // Also save individual collection JSON
      const colFile = path.join(collectionsDir, `${colName}.json`);
      fs.writeFileSync(colFile, JSON.stringify(docs, null, 2), "utf8");
      console.log(`✓ Koleksiyon: "${colName}" -> ${docs.length} doküman yedeklendi.`);
    } catch (err) {
      console.error(`✗ Koleksiyon "${colName}" okunurken hata:`, err.message);
      fullBackup.collections[colName] = [];
      fullBackup.stats[colName] = 0;
    }
  }

  fullBackup.stats.totalDocuments = totalDocs;

  // Save latest full backup
  const latestPath = path.join(backupDir, "firestore_backup_latest.json");
  fs.writeFileSync(latestPath, JSON.stringify(fullBackup, null, 2), "utf8");

  // Save historical timestamped backup
  const historyPath = path.join(archiveDir, `firestore_backup_${timestamp}.json`);
  fs.writeFileSync(historyPath, JSON.stringify(fullBackup, null, 2), "utf8");

  // Summary JSON
  const summary = {
    timestamp: fullBackup.metadata.timestamp,
    backupTimeLocal: fullBackup.metadata.backupTimeLocal,
    totalDocuments: totalDocs,
    collections: fullBackup.stats,
    files: {
      latestFullBackup: "backups/firebase/firestore_backup_latest.json",
      historicalBackup: `backups/firebase/history/firestore_backup_${timestamp}.json`,
      collectionsDirectory: "backups/firebase/collections/",
    },
  };
  fs.writeFileSync(path.join(backupDir, "backup_summary.json"), JSON.stringify(summary, null, 2), "utf8");

  console.log(`\n========================================`);
  console.log(`✅ FIREBASE YEDEKLEME TAMAMLANDI!`);
  console.log(`Toplam Doküman: ${totalDocs}`);
  console.log(`Ana Yedek Dosyası: ${latestPath}`);
  console.log(`Geçmiş Yedek: ${historyPath}`);
  console.log(`========================================\n`);

  return summary;
}

runBackup()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Yedekleme başarısız:", err);
    process.exit(1);
  });
