import { initializeApp } from "firebase/app";
import { getFirestore, doc, updateDoc } from "firebase/firestore";

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

const updates = [
  { id: "cat-kasa-onu", imageUrl: "/resimler/kategoriler/kasa-onu-urunler.jpg" },
  { id: "cat-ekipmanlar", imageUrl: "/resimler/kategoriler/ekipmanlar.jpg" },
  { id: "cat-kruvasan", imageUrl: "/resimler/kategoriler/kruvasan.jpg" },
];

async function run() {
  console.log("Kategori görselleri güncelleniyor...");
  for (const { id, imageUrl } of updates) {
    await updateDoc(doc(db, "categories", id), { imageUrl });
    console.log(`✓ ${id} → ${imageUrl}`);
  }
  console.log("\n🎉 Tüm kategori görselleri güncellendi!");
  process.exit(0);
}

run().catch((err) => {
  console.error("Hata:", err);
  process.exit(1);
});
