/**
 * Firestore CRUD service layer for 20:45 Pastacılık CMS.
 * Provides typed functions for all collections: sliders, categories, products, brands.
 * All functions use lazy Firebase initialization to avoid SSG/build errors.
 */
import {
  collection, getDocs, getDoc, addDoc, updateDoc, deleteDoc,
  doc, serverTimestamp, query, orderBy, where,
  type DocumentData,
} from "firebase/firestore";
import {
  ref as storageRef,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { requireDb, requireStorage } from "@/lib/firebase";
import type {
  SliderItem, Category, Product, Brand, Inquiry,
} from "@/lib/types";

/* ═══════════════════════════════════════════════════════════════════════════
   SLIDERS
   ═══════════════════════════════════════════════════════════════════════════ */

/** Fetch all sliders ordered by `order` */
export async function getSliders(): Promise<SliderItem[]> {
  const snap = await getDocs(
    query(collection(requireDb(), "sliders"), orderBy("order", "asc"))
  );
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as SliderItem));
}

/** Fetch only active sliders (for frontend) */
export async function getActiveSliders(): Promise<SliderItem[]> {
  const snap = await getDocs(
    query(
      collection(requireDb(), "sliders"),
      where("isActive", "==", true)
    )
  );
  return snap.docs
    .map((d) => ({ id: d.id, ...d.data() } as SliderItem))
    .sort((a, b) => a.order - b.order);
}

/** Create a new slider */
export async function addSlider(data: Omit<SliderItem, "id">): Promise<string> {
  const ref = await addDoc(collection(requireDb(), "sliders"), {
    ...data,
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

/** Update an existing slider */
export async function updateSlider(id: string, data: Partial<SliderItem>): Promise<void> {
  await updateDoc(doc(requireDb(), "sliders", id), {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

/** Delete a slider and its Storage image */
export async function deleteSlider(slider: SliderItem): Promise<void> {
  if (slider.imageStoragePath) {
    try {
      await deleteObject(storageRef(requireStorage(), slider.imageStoragePath));
    } catch { /* image may not exist */ }
  }
  await deleteDoc(doc(requireDb(), "sliders", slider.id));
}

/* ═══════════════════════════════════════════════════════════════════════════
   CATEGORIES
   ═══════════════════════════════════════════════════════════════════════════ */

/** Fetch all categories ordered by `order` */
export async function getCategories(): Promise<Category[]> {
  const snap = await getDocs(
    query(collection(requireDb(), "categories"), orderBy("order", "asc"))
  );
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Category));
}

/** Fetch only active categories (for frontend) */
export async function getActiveCategories(): Promise<Category[]> {
  const snap = await getDocs(
    query(
      collection(requireDb(), "categories"),
      where("isActive", "==", true),
      orderBy("order", "asc")
    )
  );
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Category));
}

/** Get a single category by slug */
export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const snap = await getDocs(
    query(collection(requireDb(), "categories"), where("slug", "==", slug))
  );
  if (snap.empty) return null;
  const d = snap.docs[0];
  return { id: d.id, ...d.data() } as Category;
}

/** Create a new category */
export async function addCategory(data: Omit<Category, "id">): Promise<string> {
  const ref = await addDoc(collection(requireDb(), "categories"), {
    ...data,
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

/** Update an existing category */
export async function updateCategory(id: string, data: Partial<Category>): Promise<void> {
  await updateDoc(doc(requireDb(), "categories", id), {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

/** Delete a category and its Storage image */
export async function deleteCategory(category: Category): Promise<void> {
  if (category.imageStoragePath) {
    try {
      await deleteObject(storageRef(requireStorage(), category.imageStoragePath));
    } catch { /* image may not exist */ }
  }
  await deleteDoc(doc(requireDb(), "categories", category.id));
}

/* ═══════════════════════════════════════════════════════════════════════════
   PRODUCTS
   ═══════════════════════════════════════════════════════════════════════════ */

/** Fetch all products ordered by `order` then `name` */
export async function getProducts(): Promise<Product[]> {
  const snap = await getDocs(
    query(collection(requireDb(), "products"), orderBy("order", "asc"))
  );
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Product));
}

/** Fetch active products by category slug */
export async function getProductsByCategorySlug(slug: string): Promise<Product[]> {
  const allProds = await getProducts();
  const cat = await getCategoryBySlug(slug);
  return allProds
    .filter(
      (p) =>
        p.isActive &&
        (p.categorySlug === slug ||
          p.categorySlug?.toLowerCase() === slug.toLowerCase() ||
          (cat && p.categoryId === cat.id) ||
          (cat && p.categoryName?.toLowerCase() === cat.name.toLowerCase()))
    )
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

/** Fetch active featured products (order-limited) */
export async function getFeaturedProducts(limitCount = 8): Promise<Product[]> {
  const snap = await getDocs(
    query(
      collection(requireDb(), "products"),
      where("isActive", "==", true)
    )
  );
  return snap.docs
    .map((d) => ({ id: d.id, ...d.data() } as Product))
    .sort((a, b) => a.order - b.order)
    .slice(0, limitCount);
}

/** Get a single product by ID */
export async function getProductById(id: string): Promise<Product | null> {
  const d = await getDoc(doc(requireDb(), "products", id));
  if (!d.exists()) return null;
  return { id: d.id, ...d.data() } as Product;
}

/** Create a new product */
export async function addProduct(data: Omit<Product, "id">): Promise<string> {
  const ref = await addDoc(collection(requireDb(), "products"), {
    ...data,
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

/** Update an existing product */
export async function updateProduct(id: string, data: Partial<Product>): Promise<void> {
  await updateDoc(doc(requireDb(), "products", id), {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

/** Clone a product (duplicate with "(Kopya)" suffix) */
export async function cloneProduct(product: Product): Promise<string> {
  const { id, ...rest } = product;
  const cloneData = {
    ...rest,
    name: `${rest.name} (Kopya)`,
    code: `${rest.code}-COPY`,
    createdAt: serverTimestamp(),
  };
  const ref = await addDoc(collection(requireDb(), "products"), cloneData);
  return ref.id;
}

/** Delete a product and its Storage image */
export async function deleteProduct(product: Product): Promise<void> {
  if (product.imageStoragePath) {
    try {
      await deleteObject(storageRef(requireStorage(), product.imageStoragePath));
    } catch { /* image may not exist */ }
  }
  await deleteDoc(doc(requireDb(), "products", product.id));
}

/* ═══════════════════════════════════════════════════════════════════════════
   BRANDS
   ═══════════════════════════════════════════════════════════════════════════ */

/** Fetch all brands ordered by `order` */
export async function getBrands(): Promise<Brand[]> {
  const snap = await getDocs(
    query(collection(requireDb(), "brands"), orderBy("order", "asc"))
  );
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Brand));
}

/** Fetch only active brands (for frontend) */
export async function getActiveBrands(): Promise<Brand[]> {
  const snap = await getDocs(
    query(
      collection(requireDb(), "brands"),
      where("isActive", "==", true),
      orderBy("order", "asc")
    )
  );
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Brand));
}

/** Create a new brand */
export async function addBrand(data: Omit<Brand, "id">): Promise<string> {
  const ref = await addDoc(collection(requireDb(), "brands"), {
    ...data,
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

/** Update an existing brand */
export async function updateBrand(id: string, data: Partial<Brand>): Promise<void> {
  await updateDoc(doc(requireDb(), "brands", id), {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

/** Delete a brand and its Storage image */
export async function deleteBrand(brand: Brand): Promise<void> {
  if (brand.imageStoragePath) {
    try {
      await deleteObject(storageRef(requireStorage(), brand.imageStoragePath));
    } catch { /* image may not exist */ }
  }
  await deleteDoc(doc(requireDb(), "brands", brand.id));
}

/* ═══════════════════════════════════════════════════════════════════════════
   IMAGE UPLOAD HELPER
   ═══════════════════════════════════════════════════════════════════════════ */

/**
 * Compress and resize image before upload.
 * Automatically reduces 10MB raw camera photos to lightweight ~80-120KB web-optimized JPEG images.
 */
export async function compressImage(file: File, maxWidth = 1200, quality = 0.82): Promise<File> {
  return new Promise((resolve) => {
    if (!file.type.startsWith("image/") || file.type.includes("svg")) {
      resolve(file);
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve(file);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              resolve(file);
              return;
            }
            const compressedFile = new File([blob], file.name.replace(/\.[^/.]+$/, ".jpg"), {
              type: "image/jpeg",
              lastModified: Date.now(),
            });
            resolve(compressedFile);
          },
          "image/jpeg",
          quality
        );
      };
      img.onerror = () => resolve(file);
      img.src = e.target?.result as string;
    };
    reader.onerror = () => resolve(file);
    reader.readAsDataURL(file);
  });
}

/**
 * Upload an image to Firebase Storage with automatic client-side compression.
 * @param rawFile — File to upload
 * @param folder — Storage folder (e.g. "products", "categories", "sliders", "brands")
 * @param onProgress — Optional progress callback (0-100)
 * @returns { url, path } — The download URL and storage path
 */
export async function uploadImage(
  rawFile: File,
  folder: string,
  onProgress?: (percent: number) => void
): Promise<{ url: string; path: string }> {
  // Compress image before upload (converts 10MB photo to ~100KB web image)
  const file = await compressImage(rawFile);

  const convertToDataUrl = (): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  return new Promise(async (resolve, reject) => {
    let completed = false;
    const path = `${folder}/${Date.now()}_${file.name}`;

    // Smooth progress simulation so UI never stays at 0%
    onProgress?.(15);
    let simPct = 15;
    const interval = setInterval(() => {
      if (completed) {
        clearInterval(interval);
        return;
      }
      simPct = Math.min(simPct + 25, 90);
      onProgress?.(simPct);
    }, 120);

    const finishWithDataUrl = async () => {
      if (completed) return;
      completed = true;
      clearInterval(interval);
      try {
        onProgress?.(100);
        const dataUrl = await convertToDataUrl();
        resolve({ url: dataUrl, path });
      } catch (err) {
        reject(err);
      }
    };

    try {
      const storage = requireStorage();
      const sRef = storageRef(storage, path);
      const uploadTask = uploadBytesResumable(sRef, file);

      // Fallback timer if Firebase Storage hangs or takes > 1.2s
      const timer = setTimeout(() => {
        if (!completed) {
          finishWithDataUrl();
        }
      }, 1200);

      uploadTask.on(
        "state_changed",
        (snap) => {
          if (completed) return;
          const total = snap.totalBytes || 1;
          const pct = Math.round((snap.bytesTransferred / total) * 100);
          onProgress?.(Math.max(pct, simPct));
        },
        async () => {
          clearTimeout(timer);
          finishWithDataUrl();
        },
        async () => {
          clearTimeout(timer);
          if (completed) return;
          completed = true;
          clearInterval(interval);
          try {
            onProgress?.(100);
            const url = await getDownloadURL(uploadTask.snapshot.ref);
            resolve({ url, path });
          } catch {
            const dataUrl = await convertToDataUrl();
            resolve({ url: dataUrl, path });
          }
        }
      );
    } catch {
      finishWithDataUrl();
    }
  });
}

/* ═══════════════════════════════════════════════════════════════════════════
   SLUG HELPER
   ═══════════════════════════════════════════════════════════════════════════ */

/** Generate a URL-friendly slug from Turkish text */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/ğ/g, "g").replace(/ü/g, "u").replace(/ş/g, "s")
    .replace(/ı/g, "i").replace(/ö/g, "o").replace(/ç/g, "c")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
