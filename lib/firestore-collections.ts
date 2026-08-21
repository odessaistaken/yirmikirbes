import {
  collection, getDocs, getDoc, addDoc, updateDoc, deleteDoc, setDoc,
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
import type { SliderItem, Category, Product, Brand, Inquiry } from "@/lib/types";


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

/** Fetch all categories ordered by `order` — Firestore is the single source of truth */
export async function getCategories(): Promise<Category[]> {
  const snap = await getDocs(
    query(collection(requireDb(), "categories"), orderBy("order", "asc"))
  );
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Category));
}

/** Fetch only active categories (for frontend) */
export async function getActiveCategories(): Promise<Category[]> {
  const cats = await getCategories();
  return cats.filter((c) => c.isActive).sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

/** Get a single category by slug */
export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const cats = await getCategories();
  const found = cats.find((c) => c.slug === slug || c.slug?.toLowerCase() === slug.toLowerCase());
  return found ?? null;
}

/** Create a new category */
export async function addCategory(data: Omit<Category, "id">): Promise<string> {
  const id = `cat-${Date.now()}`;
  await setDoc(doc(requireDb(), "categories", id), {
    ...data,
    id,
    createdAt: serverTimestamp(),
  }, { merge: true });
  return id;
}

/** Update an existing category */
export async function updateCategory(id: string, data: Partial<Category>): Promise<void> {
  await setDoc(doc(requireDb(), "categories", id), {
    ...data,
    updatedAt: serverTimestamp(),
  }, { merge: true });
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

/** Fetch all products ordered by `order` — Firestore is the single source of truth */
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
  const allProds = await getProducts();
  return allProds
    .filter((p) => p.isActive)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .slice(0, limitCount);
}

/** Get a single product by ID */
export async function getProductById(id: string): Promise<Product | null> {
  const allProds = await getProducts();
  const found = allProds.find((p) => p.id === id);
  return found ?? null;
}

/** Create a new product */
export async function addProduct(data: Omit<Product, "id">): Promise<string> {
  const id = `prod-${Date.now()}`;
  await setDoc(doc(requireDb(), "products", id), {
    ...data,
    id,
    createdAt: serverTimestamp(),
  }, { merge: true });
  return id;
}

/** Update an existing product */
export async function updateProduct(id: string, data: Partial<Product>): Promise<void> {
  await setDoc(doc(requireDb(), "products", id), {
    ...data,
    updatedAt: serverTimestamp(),
  }, { merge: true });
}

/** Clone a product (duplicate with "(Kopya)" suffix) */
export async function cloneProduct(product: Product): Promise<string> {
  const { id, ...rest } = product;
  const cloneData = {
    ...rest,
    name: `${rest.name} (Kopya)`,
    code: `${rest.code}-COPY`,
  };
  return addProduct(cloneData);
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
 * Keeps ultra high HD quality (1600px width, 92% JPEG quality).
 */
export async function compressImage(file: File, maxWidth = 1600, quality = 0.92): Promise<File> {
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

        // High quality image smoothing
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
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
 * Upload an image with client-side compression.
 * Uses strict timeout wrappers so upload never hangs or gets stuck at 30%.
 * Priority: 1) ImgBB CDN (fast & direct) 2) Firebase Storage 3) High-compression Web URL
 */
export async function uploadImage(
  rawFile: File,
  folder: string,
  onProgress?: (percent: number) => void
): Promise<{ url: string; path: string }> {
  // 1. Compress image to HD Ultra Clear JPEG
  onProgress?.(15);
  const file = await compressImage(rawFile, 1600, 0.92);
  onProgress?.(35);

  const path = `${folder}/${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;

  // Helper for fetch with timeout
  const fetchWithTimeout = (url: string, options: RequestInit, timeoutMs = 6000) => {
    return Promise.race([
      fetch(url, options),
      new Promise<Response>((_, reject) =>
        setTimeout(() => reject(new Error("Zaman aşımı (Timeout)")), timeoutMs)
      ),
    ]);
  };

  // 2. Try ImgBB CDN (Direct & Fast)
  try {
    onProgress?.(50);
    const formData = new FormData();
    formData.append("image", file);

    const res = await fetchWithTimeout(
      "https://api.imgbb.com/1/upload?key=6d257f6977e3292f5b356a1175329544",
      { method: "POST", body: formData },
      7000
    );

    if (res.ok) {
      const data = await res.json();
      if (data?.data?.url) {
        onProgress?.(100);
        return { url: data.data.url, path };
      }
    }
  } catch (err) {
    console.warn("ImgBB yükleme yanıt vermedi veya başarısız:", err);
  }

  // 3. Try Firebase Storage with 6s timeout
  try {
    onProgress?.(75);
    const storage = requireStorage();
    const fileRef = storageRef(storage, path);
    const uploadTask = uploadBytesResumable(fileRef, file);

    const storagePromise = new Promise<{ url: string; path: string }>((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const pct = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 20) + 75;
          onProgress?.(pct);
        },
        (err) => reject(err),
        async () => {
          try {
            const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
            resolve({ url: downloadUrl, path });
          } catch (e) {
            reject(e);
          }
        }
      );
    });

    const timeoutPromise = new Promise<{ url: string; path: string }>((_, reject) =>
      setTimeout(() => {
        try { uploadTask.cancel(); } catch {}
        reject(new Error("Firebase Storage zaman aşımına uğradı"));
      }, 6000)
    );

    const res = await Promise.race([storagePromise, timeoutPromise]);
    onProgress?.(100);
    return res;
  } catch (err) {
    console.warn("Firebase Storage yüklemesi de zaman aşımına uğradı:", err);
  }

  // 4. Final Fallback: Super compressed Data URL (~25KB max) to guarantee system never blocks
  try {
    onProgress?.(90);
    const tinyFile = await compressImage(rawFile, 600, 0.65);
    const dataUrl = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(tinyFile);
    });

    if (dataUrl && dataUrl.length < 150000) { // Safety check < 150KB for Firestore
      onProgress?.(100);
      return { url: dataUrl, path };
    }
  } catch (e) {
    console.error("DataURL sıkıştırma hatası:", e);
  }

  throw new Error("Resim yüklenemedi. İnternet bağlantınızı kontrol edin veya 'Görsel URL' alanına doğrudan resim linki girin.");
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
