import { initializeApp } from "firebase/app";
import { getFirestore, collection, setDoc, doc, serverTimestamp, getDocs } from "firebase/firestore";

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

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/\u011f/g, "g").replace(/\u00fc/g, "u").replace(/\u015f/g, "s")
    .replace(/\u0131/g, "i").replace(/\u00f6/g, "o").replace(/\u00e7/g, "c")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const CATEGORIES = [
  "Donuk Pasta",
  "Taze Pasta",
  "Cup Pastalar",
  "Organizasyon Pastas\u0131",
  "Kek - Brownie",
  "Cookies - Kurabiye",
  "Waffle",
  "Waffle Kek",
  "Waffle Sos",
  "Waffle S\u00fcsleme",
  "Kuruvasan",
  "Bar Sos",
  "\u015euruplar",
  "P\u00fcreler",
  "Kahveler",
  "Bitki \u00c7aylar\u0131",
];

async function main() {
  const snap = await getDocs(collection(db, "categories"));
  const existing = snap.docs.map(d => d.data());
  const maxOrder = existing.reduce((max, c) => Math.max(max, c.order ?? 0), 0);

  console.log(`Mevcut ${existing.length} kategori. Yeni kategoriler ${maxOrder + 1}. siradan baslar.\n`);

  for (let i = 0; i < CATEGORIES.length; i++) {
    const name = CATEGORIES[i];
    const slug = slugify(name);
    const order = maxOrder + i + 1;
    const id = "cat-" + Date.now() + "-" + i;

    const slugExists = existing.some(c => c.slug === slug);
    if (slugExists) {
      console.log(`Atlandi (mevcut): ${name}`);
      continue;
    }

    await setDoc(doc(db, "categories", id), {
      id,
      name,
      slug,
      imageUrl: "",
      imageStoragePath: "",
      order,
      isActive: true,
      description: "",
      createdAt: serverTimestamp(),
    });

    console.log(`Eklendi: ${name} -> /katalog/${slug} (sira: ${order})`);
    await new Promise(r => setTimeout(r, 150));
  }

  console.log("\nTamamlandi!");
  process.exit(0);
}

main().catch(err => {
  console.error("Hata:", err);
  process.exit(1);
});