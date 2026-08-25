import { initializeApp } from "firebase/app";
import { getFirestore, setDoc, doc, serverTimestamp, collection, getDocs, deleteDoc } from "firebase/firestore";
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

const BRANDS = [
  { id: "brand-1", name: "DaVinci Gourmet", slug: "davinci-gourmet", logo: "☕", order: 1, isActive: true },
  { id: "brand-2", name: "Caffè NONNO", slug: "caffe-nonno", logo: "🍹", order: 2, isActive: true },
  { id: "brand-3", name: "CALLEI", slug: "callei", logo: "🍫", order: 3, isActive: true },
  { id: "brand-4", name: "EASY MIX", slug: "easy-mix", logo: "🍸", order: 4, isActive: true },
  { id: "brand-5", name: "Krater", slug: "krater", logo: "🍧", order: 5, isActive: true },
  { id: "brand-6", name: "Monte Cristo", slug: "monte-cristo", logo: "🦜", order: 6, isActive: true },
];

const CATEGORIES = [
  {
    id: "cat-1",
    name: "Püreler & Meyve Miksleri",
    slug: "pureler",
    description: "Caffè NONNO Frozen püreleri, DaVinci Fruit Mix ve Krater meyve karışımlarından oluşan zengin bar ve pastacılık koleksiyonumuz.",
    icon: "🍓",
    imageUrl: "/resimler/pt1/pt1_1.png",
    order: 1,
    isActive: true,
  },
  {
    id: "cat-2",
    name: "Şuruplar",
    slug: "suruplar",
    description: "DaVinci Gourmet, Caffè NONNO ve Monte Cristo aromalı kahve, kokteyl ve barista şurupları.",
    icon: "🍯",
    imageUrl: "/resimler/p4/p4_1.png",
    order: 2,
    isActive: true,
  },
  {
    id: "cat-3",
    name: "Waffle & Krep Çikolataları",
    slug: "waffle-malzemeleri",
    description: "CALLEI sürülebilir renkli kremalar, hazır waffle tozu, draje ve krokan süsleme çeşitleri.",
    icon: "🧇",
    imageUrl: "/resimler/p10/p10_1.png",
    order: 3,
    isActive: true,
  },
  {
    id: "cat-4",
    name: "Tatlı & Bar Sosları",
    slug: "tatli-soslar",
    description: "DaVinci 2L ve Caffè NONNO 750g karamel, çikolata, beyaz çikolata ve meyve sosları.",
    icon: "🍫",
    imageUrl: "/resimler/p6/p6_7.png",
    order: 4,
    isActive: true,
  },
  {
    id: "cat-5",
    name: "Donuk Pasta & Unlu Mamuller",
    slug: "donuk-pasta",
    description: "Kafeterya ve restoranlar için pratik, lezzetli donuk tuzlu kurabiyeler, poğaçalar ve unlu mamuller.",
    icon: "🎂",
    imageUrl: "/resimler/pt11/pt11_1.png",
    order: 5,
    isActive: true,
  },
  {
    id: "cat-6",
    name: "Kremalı Ürünler & Pastacılık",
    slug: "kremali-urunler",
    description: "Chantilly, ganaj ve profesyonel pastacılık krema hammaddeleri.",
    icon: "🍰",
    imageUrl: "/resimler/p9/p9_1.png",
    order: 6,
    isActive: true,
  },
];

async function seed() {
  console.log("Seeding categories...");
  for (const cat of CATEGORIES) {
    await setDoc(doc(db, "categories", cat.id), {
      ...cat,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    }, { merge: true });
    console.log(`✓ Category: ${cat.name}`);
  }

  console.log("\nSeeding brands...");
  for (const b of BRANDS) {
    await setDoc(doc(db, "brands", b.id), {
      ...b,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    }, { merge: true });
    console.log(`✓ Brand: ${b.name}`);
  }

  const raw = JSON.parse(fs.readFileSync("products_json.json", "utf-8"));
  console.log(`\nSeeding ${raw.length} products...`);
  
  for (let i = 0; i < raw.length; i++) {
    const p = raw[i];
    await setDoc(doc(db, "products", p.id), {
      ...p,
      order: i + 1,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    }, { merge: true });
    if ((i + 1) % 20 === 0 || i === raw.length - 1) {
      console.log(`✓ Seeded ${i + 1}/${raw.length} products`);
    }
  }

  console.log("\nSeeding complete!");
}

seed().then(() => process.exit(0)).catch((err) => {
  console.error("Seed error:", err);
  process.exit(1);
});
