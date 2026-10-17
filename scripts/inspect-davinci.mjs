import fs from 'fs';
import path from 'path';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

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
  const snap = await getDocs(collection(db, "products"));
  const products = [];
  snap.forEach(d => products.push({ id: d.id, ...d.data() }));

  console.log("Total products in Firestore:", products.length);

  const davinci = products.filter(p => 
    (p.brand && /davinci/i.test(p.brand)) || 
    (p.categoryName && /davinci/i.test(p.categoryName)) ||
    (p.name && /davinci/i.test(p.name))
  );

  console.log("Total DaVinci in Firestore:", davinci.length);
  davinci.forEach(p => {
    console.log(`[${p.categoryName || p.categoryId}] | id: ${p.id} | ${p.name} | ${p.price} TL | img: ${p.image}`);
  });

  // Also check existing images in public
  function getFiles(dir) {
    let res = [];
    if (!fs.existsSync(dir)) return res;
    fs.readdirSync(dir).forEach(f => {
      const p = path.join(dir, f);
      if (fs.statSync(p).isDirectory()) res = res.concat(getFiles(p));
      else res.push(p);
    });
    return res;
  }
  const publicFiles = getFiles('./public');
  console.log('\nTotal files in public:', publicFiles.length);
  const sampleImages = publicFiles.slice(0, 30);
  console.log('Sample public files:\n', sampleImages.join('\n'));

  process.exit(0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
