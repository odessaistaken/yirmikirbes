/**
 * Migration Script: Seed Mock Data to Firestore
 * 
 * Run this script using ts-node or similar.
 * Note: You must initialize Firebase in this script using your config.
 * Since this runs outside Next.js, make sure to set the env variables.
 */

import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
// @ts-ignore
import * as dotenv from "dotenv";

// Import mock data directly
import { CATEGORIES, PRODUCTS } from "../lib/mock-data";

dotenv.config({ path: "../.env.local" });

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function seed() {
  console.log("Seeding categories...");
  const catDocs = [];
  
  for (let i = 0; i < CATEGORIES.length; i++) {
    const cat = CATEGORIES[i];
    const docRef = await addDoc(collection(db, "categories"), {
      name: cat.name,
      slug: cat.slug,
      imageUrl: "", // Needs manual upload later
      order: i + 1,
      isActive: true,
      description: cat.description || "",
      createdAt: serverTimestamp(),
    });
    catDocs.push({ oldId: cat.id, newId: docRef.id, name: cat.name, slug: cat.slug });
    console.log(`Added category: ${cat.name}`);
  }

  console.log("\nSeeding products...");
  for (let i = 0; i < PRODUCTS.length; i++) {
    const prod = PRODUCTS[i];
    const categoryInfo = catDocs.find(c => c.oldId === prod.categoryId);
    
    await addDoc(collection(db, "products"), {
      name: prod.name,
      code: prod.code,
      codeGroup: "",
      categoryId: categoryInfo?.newId || prod.categoryId,
      categoryName: categoryInfo?.name || prod.categoryName,
      categorySlug: categoryInfo?.slug || "",
      price: 0,
      vatRate: 20,
      order: i + 1,
      description: prod.description || "",
      imageUrl: prod.imageUrl || "",
      isActive: true,
      specs: prod.specs || {},
      createdAt: serverTimestamp(),
    });
    console.log(`Added product: ${prod.name}`);
  }

  console.log("\nSeeding complete!");
  process.exit(0);
}

seed().catch(console.error);
